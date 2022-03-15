import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, PermissionsAndroid, Alert, Platform, AppState, Image, ScrollView } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useIsFocused } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var RNFS = require('react-native-fs');
const IMG_SIZE = 200000;

const { SafeAreaView, Content, Header, Icon, Input, Text, ImageView } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;
const AddComplaintView = (props) => {
    const { navigation, complaintImage, complaintLocation, userType: { assetIcons }, saveNewComplaint } = props;
    const { configId } = props.route.params.data;
    const theme = useTheme();
    const isFocused = useIsFocused();
    const [optionType, setOptionType] = useState();
    const [orgUriSize, setOrgUriSize] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [quality, setQuality] = useState(100);
    const [permissionStatus, setPermissionStatus] = useState('');
    const [appState, setAppState] = useState(AppState.currentState);
    const [imageVal, setImageVal] = useState(false);
    const [locationVal, setLocationVal] = useState(false);
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme['color-basic-1008'],
            flex: 1,
            padding: convertHeight(15)
        },
        submitButton: {
            borderRadius: convertWidth(25),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['color-basic-1002'],
            paddingVertical: convertHeight(5),
            paddingHorizontal: convertWidth(10)
        },
        label: {
            color: theme['color-basic-1002'],
            marginVertical: convertHeight(10),
            fontSize:convertWidth(15)
        },
        imgView: {
            paddingVertical: convertWidth(12),
            flexDirection: 'row',
            borderRadius: convertWidth(10),
            backgroundColor: theme['color-basic-600']
        },
        iconView: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        changeBtn: {
            borderRadius: convertWidth(15),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['color-basic-1002'],
            paddingVertical: convertHeight(5),
            paddingHorizontal: convertWidth(10)
        },
        locationInitialBtn: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: theme['color-basic-600'],
            borderRadius: convertHeight(10)
        },
        imgViewStyle: {
            padding: convertWidth(5),
            height: convertWidth(100),
            width: convertWidth(100),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgcontent: {
            height: '100%',
            width: '100%'
        }
    });

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
            props.newComplaintImage(undefined);
        }
    }, []);
    const _handleAppStateChange = async () => {
        await permissionCheck();
    };

    const permissionCheck = async () => {
        let checkStatus;
        if (Platform.OS === 'android') {
            checkStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        }
        if (checkStatus) {
            setPermissionStatus('granted');
        }
        return checkStatus;
    }

    const permissionRequest = async () => {
        const checkStatus = await permissionCheck();
        if (checkStatus) {
            setPermissionStatus('granted');
            return;
        }
        let requestStatus;
        if (Platform.OS === 'android') {
            requestStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (requestStatus === PermissionsAndroid.RESULTS.GRANTED) {
                setPermissionStatus('granted');
                imagePickData();
            } else if (requestStatus === PermissionsAndroid.RESULTS.DENIED) {
                setPermissionStatus('denied');
            } else if (requestStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                setPermissionStatus('blocked');
            }
        }
    }

    const renderPickImage = async () => {
        const checkStatus = await permissionCheck();
        if (checkStatus) {
            await imagePickData();
        } else {
            await permissionRequest();
        }
    }

    const imagePickData = async () => {
        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            RNFS.stat(image.path).then((stats) => {
                setImageUrl(image.path);
                setOrgUriSize(stats.size)
                getResizedImage(image.path, quality, stats.size)
            }).catch((err) => {
                return Alert.alert(
                    I18n.t('something_wrong')
                );
            });
        }).catch((error) => {
            if (error.code === 'E_PICKER_CANCELLED') {
                return false;
            }
        });
    }

    const getResizedImage = (uri, quality, orgUriSize) => {
        if (orgUriSize <= IMG_SIZE) {
            //check image original size < 200 kb then do not compress
            imageConvertion(uri, null);
        } else {
            ImageResizer.createResizedImage(uri, 1280, 720, "JPEG", quality, 0) //HxW
                .then(response => {
                    if (quality < 75) { //throw error
                        removeCacheImage(imageUrl);
                        return Alert.alert(
                            I18n.t('something_wrong')
                        );
                    }
                    if (response.size >= IMG_SIZE) { //if size is greater than 200kb, then reduce quality
                        setQuality(...quality, quality--);
                        getResizedImage(uri, quality, orgUriSize);
                    } else {
                        imageConvertion(response.uri, uri);
                    }
                })
                .catch(err => {
                    return Alert.alert(
                        I18n.t('something_wrong')
                    );
                });
        }
    }

    const imageConvertion = (compressUri, uri) => {
        RNFS.readFile(compressUri, 'base64').then(res => {
            RNFS.exists(compressUri).then((result) => {
                if (result) {
                    return RNFS.unlink(compressUri).then(() => {
                        uri && RNFS.unlink(uri).then(() => {
                        });
                        props.newComplaintImage(res);
                    }).catch((err) => { });
                }
            }).catch((err) => { });
        })
    }

    const removeCacheImage = (uri) => {
        setImageUrl('');
        RNFS.exists(uri).then((result) => {
            if (result) {
                return RNFS.unlink(uri).then(() => {
                    setImageUrl('');
                }).catch((err) => {
                });
            }
        }).catch((err) => { });
    }

    const complaintValidationSchema = yup.object().shape({
        comment: yup
            .string()
            .required(I18n.t('please_enter_comment')),
    });

    const AlertIcon = (props) => (
        <Icon {...props} name='alert-circle-outline' />
    );

    return (
        <>
            <Header title={I18n.t('complaints')} navigation={navigation} />
            <Formik
                validationSchema={complaintValidationSchema}
                initialValues={{ comment: '' }}
                onSubmit={(values) => {
                    if (complaintImage === undefined) {
                        setImageVal(true);
                    } else if (complaintLocation === undefined) {
                        setLocationVal(true);
                    } else {
                        let submitDdata = {
                            complaintConfigId: configId,
                            location: complaintLocation,
                            comment: values.comment,
                            photo: complaintImage
                        }
                        saveNewComplaint(submitDdata);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <SafeAreaView>
                            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.mainContainer} showsVerticalScrollIndicator={false}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                        <Text style={{ fontSize: convertWidth(17), color: theme['color-basic-600'] }}>{I18n.t('submit')}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text category='h5' style={styles.label}>{I18n.t('upload_image')}</Text>
                                    {!complaintImage &&
                                        <>
                                            <View style={styles.imgView}>
                                                <TouchableOpacity onPress={() => { renderPickImage() }} style={styles.iconView}>
                                                    {
                                                        assetIcons !== undefined && assetIcons !== null &&
                                                        <View style={styles.imgViewStyle}>
                                                            <Image resizeMode='contain' style={styles.imgcontent} source={assetIcons.icons.uploadImage} />
                                                        </View>
                                                    }
                                                    <Text category='h5' style={[styles.label, { textAlign: 'center' }]}>{I18n.t('upload_image')}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { props.navigateToComplaintImage() }} style={styles.iconView}>
                                                    {
                                                        assetIcons !== undefined && assetIcons !== null &&
                                                        <View style={styles.imgViewStyle}>
                                                            <Image resizeMode='contain' style={styles.imgcontent} source={assetIcons.icons.camera} />
                                                        </View>
                                                    }
                                                    <Text category='h5' style={[styles.label, { textAlign: 'center' }]}>{I18n.t('camera')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    }
                                    {imageVal && !complaintImage &&
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name='alert-circle-outline' pack="material-community" style={{ color: theme['color-danger-500'] }} />
                                            <Text category="h5" style={{ paddingLeft: convertWidth(5), color: theme['color-danger-500'] }}>{I18n.t('select_picture')}</Text>
                                        </View>}
                                </View>
                                {
                                    complaintImage &&
                                    <ImageView
                                        type={optionType}
                                        source={complaintImage}
                                        onImageTaken={(base64) => {
                                            props.newComplaintImage(base64);
                                            setOptionType('');
                                        }}
                                        onImageCancel={() => { props.newComplaintImage(); }} />
                                }
                                <View>
                                    <Text category='h5' style={[styles.label, { marginBottom: convertWidth(10), marginTop: convertWidth(15) }]} >{I18n.t('remarks')}</Text>
                                    <Input
                                        size='large'
                                        status={(errors.comment && touched.comment) ? 'danger' : 'basic'}
                                        onChangeText={handleChange('comment')}
                                        value={values.comment}
                                        multiline={true}
                                        placeholder={I18n.t('type_here')}
                                        placeholderTextColor={theme['color-basic-1002']}
                                        style={{ backgroundColor: theme['color-basic-400'] }}
                                        caption={(errors.comment && touched.comment) ? errors.comment : ''}
                                        captionIcon={(errors.comment && touched.comment) ? AlertIcon : () => (<></>)}
                                        onBlur={handleBlur('comment')}
                                    />
                                </View>
                                <View style={{ marginBottom: convertHeight(30) }}>
                                    <Text category='h5' style={styles.label}>{I18n.t('location')}</Text>
                                    {
                                        complaintLocation === undefined ?
                                            <TouchableOpacity onPress={() => props.navigateToComplaintLocation()} style={styles.locationInitialBtn}>
                                                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                    <FontelloIcon name='location' size={convertWidth(20)} style={{ color: theme['color-basic-1002'] }} />
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text category='h5' style={[styles.label, { height: convertHeight(35), paddingTop: convertHeight(8) }]}>{I18n.t('find_incident_location')}</Text>
                                                </View>
                                                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                    <FontelloIcon name='forward-arrow' size={convertWidth(20)} style={{ color: theme['color-basic-1002'] }} />
                                                </View>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => props.navigateToComplaintLocation()} style={styles.locationInitialBtn}>
                                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                                    <FontelloIcon name='location' size={convertWidth(20)} style={{ color: theme['color-basic-1002'] }} />
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text category='h5' style={[styles.label, { paddingTop: convertHeight(3) }]}>{complaintLocation.formattedAddress}</Text>
                                                </View>
                                                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        onPress={() => props.navigateToComplaintLocation()}
                                                        style={styles.changeBtn}>
                                                        <Text style={{ fontSize: convertWidth(15), color: theme['color-basic-600'] }}>{I18n.t('change')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>
                                    }
                                    {locationVal && !complaintLocation &&
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name='alert-circle-outline' pack="material-community" style={{ color: theme['color-danger-500'] }} />
                                            <Text category="h5" style={{ paddingLeft: convertWidth(5), color: theme['color-danger-500'] }}>{I18n.t('location_request_denied')}</Text>
                                        </View>}
                                </View>
                            </KeyboardAwareScrollView>
                        </SafeAreaView>
                    </>
                )}
            </Formik>
        </>
    );
}
export default AddComplaintView;