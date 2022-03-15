import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Alert, Text, PermissionsAndroid, Linking, Platform, AppState } from 'react-native';
import { dimensionUtils } from '../utils';
import { useTheme } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from './Modal';
import I18n from '../i18n';
const { convertHeight, convertWidth } = dimensionUtils;

import { useDispatch, useSelector } from 'react-redux';

import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
var RNFS = require('react-native-fs');

const IMG_SIZE = 200000;

const ImageView = (props) => {
    const [showModalVisibility, toggleModalVisibility] = useState(false);
    const [orgUriSize, setOrgUriSize] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [quality, setQuality] = useState(100);
    const [permissionStatus, setPermissionStatus] = useState('');
    const [appState, setAppState] = useState(AppState.currentState);
    const theme = useTheme();

    const dispatch = useDispatch();

    const styles = StyleSheet.create({
        preview: {
            alignSelf: 'center',
            height: convertHeight(250),
            width: convertWidth(320),
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: theme['color-basic-600'],
            borderRadius: convertWidth(10)
        },
    });

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
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
                        props.onImageTaken(res);
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

    const baseImage = '';

    return (
        <>

            <ImageBackground style={styles.preview}
                source={{ uri: `data:image/gif;base64,${props.source}` }}
            >
                {
                    props.source === undefined &&
                    <MaterialCommunityIcons name="image" color={theme['color-basic-1002']} size={convertHeight(100)} style={{ marginVertical: convertHeight(80) }} />
                }
                <View style={{
                    position: 'absolute',
                    top: convertWidth(-5),
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: convertWidth(300),
                    alignItems: 'flex-end',
                    left: convertWidth(22)
                }}>
                    <TouchableOpacity onPress={() => {
                        props.onImageCancel(false)
                    }}
                        style={{
                            backgroundColor: theme['color-basic-100'],
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: convertWidth(30),
                            height: convertWidth(30),
                            borderRadius: convertWidth(30)
                        }}>
                        <FontelloIcon name='cross' size={convertWidth(28)} style={{ color: theme['color-basic-1006'] }} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Modal visible={showModalVisibility}
                message={I18n.t('do_you_want_to_delete_image')}
                type='confirm'
                onCancel={() => toggleModalVisibility(false)}
                onOk={() => {
                    props.deleteImg()
                    toggleModalVisibility(false)
                }}
            />
        </>
    );
};

export default ImageView;
