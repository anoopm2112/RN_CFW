import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { components, I18n, utils } from '../../../common';
import { Datepicker, useTheme } from '@ui-kitten/components';
import { Radio } from '@ui-kitten/components';
import { COMMON_SIGNUP_LABELS, PARENT_SIGNUP_LABELS, CHILD_SIGNUP_LABELS, USER_TYPE, GENDER_DATA } from '../constants';
import { useIsFocused } from '@react-navigation/native';

const { RadioGroup, SafeAreaView, Content, Icon, Text, Button, useStyleSheet, Toggle, StyleService, Input, Header, Card, Dropdown, Picker } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;
const { Item } = Picker;
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

export default EditProfileView = (props) => {
    const { info: { id, username, firstName = '', middleName = '', dob, dateOfBirth, schoolName = '', noOfChildren = '', lastName = '',
        contact: { email = '' }, classResponse: { id: classId }, district: { id: districtId }, lsgi: { id: lsgiId },
        lsgiType, genderResponse: { id: genderSelected }, userTypeResponse: { typeId: userTypeId } = {} } = {}
    } = props.user;
    const { userType, dropdownData = [], loadLsgiType, lsgiTypeData = [] } = props;
    const [isDateBirth, setDate] = useState();
    const [gender, setGender] = useState(false);
    const [selectedIndexGender, setSelectedIndex] = useState(genderSelected - 1);
    const isFocused = useIsFocused();

    let dateBirth = dateOfBirth ? dateOfBirth?.split('/') : dob?.split('/');
    let birthDate = `${dateBirth[2]}-${dateBirth[1]}-${dateBirth[0]}`

    const editProfileValidationSchema = yup.object().shape({
        firstName: yup
            .string()
            .required(I18n.t('please_enter_first_name')),
        lastName: yup
            .string()
            .required(I18n.t('please_enter_last_name')),
    });
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const middleNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const updateProfileButtonRef = useRef();

    useEffect(() => {
        if (isFocused) {
            if (districtId && lsgiType.id ? lsgiType.id : lsgiType) {
                loadLsgiType({ districtId: districtId, lsgiTypeId: lsgiType.id ? lsgiType.id : lsgiType });
            }
        }
    }, [isFocused]);

    return (
        <Formik
            validationSchema={editProfileValidationSchema}
            initialValues={{
                id, username, firstName, middleName,
                lastName, email, userTypeId,
                district: districtId,
                lsgi: lsgiType.id ? lsgiType.id : lsgiType,
                lsgiId: lsgiId,
                gender: '',
                schoolName,
                class: classId,
                noOfChildren: noOfChildren.toString(),
                dob: new Date(birthDate)
            }}
            // onSubmit={props.updateProfile}
            onSubmit={(values) => {
                let data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    districtId: values.district,
                    lsgiType: values.lsgi,
                    lsgiId: values.lsgiId,
                    // gender: gender === false ? 2 : values.gender,
                    gender: selectedIndexGender + 1,
                    dateOfBirth: moment(values.dob).format("DD/MM/YYYY"),
                    emailId: values.email,
                    userTypeId,
                    id,
                    username
                }
                if (userType.name === USER_TYPE.PARENT) {
                    data = { ...data, noOfChildren: values.noOfChildren }
                } else if (userType.name === USER_TYPE.CHILD) {
                    data = { ...data, schoolName: values.schoolName, classId: values.class }
                } else if (userType.name === USER_TYPE.TEACHER) {
                    data = { ...data, schoolName: values.schoolName }
                }
                props.updateProfile(data);
            }}
        >
            {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, errors, touched }) => (
                <>
                    <SafeAreaView>
                        <Header title={I18n.t('edit_profile')} />
                        <Content style={styles.content} >
                            <Card shadow style={styles.card}>
                                <View style={{ padding: convertWidth(10) }}>
                                    <Input
                                        label={<Text category='h5' style={styles.label} >{I18n.t('first_name')}</Text>}
                                        size='medium'
                                        status={(errors.firstName && touched.firstName) ? 'danger' : 'basic'}
                                        value={values.firstName}
                                        caption={(errors.firstName && touched.firstName) ? errors.firstName : ''}
                                        captionIcon={(errors.firstName && touched.firstName) ? AlertIcon : () => (<></>)}
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                        returnKeyType='next'
                                        onSubmitEditing={() => middleNameInputRef.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                    <Input
                                        label={<Text category='h5' style={styles.label} >{I18n.t('last_name')}</Text>}
                                        size='medium'
                                        status={(errors.lastName && touched.lastName) ? 'danger' : 'basic'}
                                        value={values.lastName}
                                        caption={(errors.lastName && touched.lastName) ? errors.lastName : ''}
                                        captionIcon={(errors.lastName && touched.lastName) ? AlertIcon : () => (<></>)}
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        ref={lastNameInputRef}
                                        returnKeyType='next'
                                        onSubmitEditing={() => updateProfileButtonRef.current.props.onPress()}
                                    />
                                    <Text category='h5' style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.DISTRICT)}</Text>
                                    <View style={styles.usernameInput}>
                                        <Dropdown
                                            picker={
                                                <Picker
                                                    selectedValue={values.district}
                                                    onValueChange={(itemValue) => {
                                                        setFieldValue('district', itemValue)
                                                    }}
                                                    mode="dropdown">
                                                    {
                                                        [
                                                            <Picker.Item key={0} label={I18n.t('select_your_option')} value={undefined} />,
                                                            ...dropdownData?.district?.map(option => <Item key={option.id} label={option.label} value={option.id} />)
                                                        ]
                                                    }
                                                </Picker>
                                            }
                                            status={(errors.district && touched.district) ? 'danger' : 'basic'}
                                            caption={(errors.district && touched.district) ? <Text style={styles.errorText} category='c1' status='danger'>{errors.district}</Text> : null}
                                            captionIcon={(errors.district && touched.district) ? <Icon fill={theme['color-danger-500']} style={styles.alertIcon} name='alert-circle-outline' /> : null}
                                        />
                                    </View>
                                    <Text category='h5' style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.LOCAL_BODY_TYPE)}</Text>
                                    <View style={styles.usernameInput}>
                                        <Dropdown
                                            picker={
                                                <Picker
                                                    selectedValue={values.lsgi}
                                                    onValueChange={(itemValue) => {
                                                        setFieldValue('lsgi', itemValue);
                                                        if (values.district && itemValue) {
                                                            loadLsgiType({ districtId: values.district, lsgiTypeId: itemValue });
                                                        }
                                                    }}
                                                    mode="dropdown">
                                                    {
                                                        [
                                                            <Picker.Item key={0} style={{ color: theme['color-basic-1011'], fontSize: convertWidth(14) }} label={I18n.t(COMMON_SIGNUP_LABELS.LOCAL_BODY_TYPE)} value={undefined} />,
                                                            ...dropdownData?.lsgiType?.map(option => <Item key={option.id} label={option.label} value={option.id} />)
                                                        ]
                                                    }
                                                </Picker>
                                            }
                                        />
                                    </View>
                                    <Text category='h5' style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.LOCAL_BODY_NAME)}</Text>
                                    <View style={styles.usernameInput}>
                                        <Dropdown
                                            picker={
                                                <Picker
                                                    selectedValue={values.lsgiId}
                                                    onValueChange={(itemValue) => {
                                                        setFieldValue('lsgiId', itemValue)
                                                    }}
                                                    mode="dropdown">
                                                    {
                                                        [
                                                            <Picker.Item key={0} style={{ color: theme['color-basic-1011'], fontSize: convertWidth(14) }} label={I18n.t(COMMON_SIGNUP_LABELS.LOCAL_BODY_NAME)} value="" />,
                                                            ...lsgiTypeData.map(option => <Item key={option.id} label={option.name} value={option.id} />)
                                                        ]
                                                    }
                                                </Picker>
                                            }
                                        />
                                    </View>
                                    <View style={{ marginVertical: convertHeight(10) }}>
                                        <Text category='h5' style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.DOB)}</Text>
                                        <View style={{ marginTop: convertHeight(8) }}>
                                            <Datepicker
                                                min={new Date(1700, 0, 0)}
                                                max={new Date()}
                                                controlStyle={{ backgroundColor: theme['color-basic-400'] }}
                                                date={values.dob}
                                                onSelect={nextDate => { console.tron.log(nextDate); setDate(nextDate); setFieldValue('dob', nextDate) }}
                                            />
                                        </View>
                                    </View>
                                    <Text style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.EMAIL)}</Text>
                                    <Input
                                        size='large'
                                        value={values.email}
                                        placeholder={I18n.t(COMMON_SIGNUP_LABELS.EMAIL)}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        style={styles.usernameInput}
                                        returnKeyType='next'
                                        blurOnSubmit={false}
                                        autoCapitalize='none'
                                    />
                                    <Text category='h5' style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.GENDER)}</Text>
                                    <View style={{ flexWrap: 'wrap', marginTop: convertHeight(10), marginBottom: convertHeight(10) }}>
                                        {GENDER_DATA.map((option, index) => {
                                            const isActive = selectedIndexGender === index;
                                            return (
                                                <View key={option.id} style={{ flexDirection: 'row', marginBottom: convertHeight(7), alignItems: 'center' }}>
                                                    <Radio checked={isActive} status={userType.name === USER_TYPE.CHILD ? 'white' : 'black'}
                                                        onChange={() => { setSelectedIndex(index) }} />
                                                    <Text onPress={() => { setSelectedIndex(index) }} style={{ paddingHorizontal: convertWidth(7) }} category='h5' numberOfLines={2}>
                                                        {I18n.t(option.name)}
                                                    </Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    {
                                        userType.name === USER_TYPE.PARENT &&
                                        <View style={{ justifyContent: 'space-between', marginTop: convertHeight(15) }}>
                                            <Text category='h5' style={styles.label}>{I18n.t(PARENT_SIGNUP_LABELS.NUM_OF_CHILDRENS)}</Text>
                                            <Input
                                                size='large'
                                                status={(errors.noOfChildren && touched.noOfChildren) ? 'danger' : 'basic'}
                                                value={values.noOfChildren}
                                                placeholder={I18n.t(PARENT_SIGNUP_LABELS.NUM_OF_CHILDRENS)}
                                                onChangeText={handleChange('noOfChildren')}
                                                onBlur={handleBlur('noOfChildren')}
                                                style={styles.usernameInput}
                                                blurOnSubmit={false}
                                                autoCapitalize='none'
                                            />
                                        </View>
                                    }
                                    {
                                        userType.name === USER_TYPE.CHILD &&
                                        <View style={{ justifyContent: 'space-between', marginTop: convertHeight(15) }}>
                                            <Text category='h5' style={styles.label}>{I18n.t(CHILD_SIGNUP_LABELS.CLASS)}</Text>
                                            <View style={{ marginVertical: convertHeight(8) }}>
                                                <Dropdown
                                                    picker={
                                                        <Picker
                                                            selectedValue={values.class}
                                                            onValueChange={(itemValue) => {
                                                                setFieldValue('class', itemValue)
                                                            }}
                                                            mode="dropdown">
                                                            {
                                                                [
                                                                    <Picker.Item key={0} style={{ fontSize: convertWidth(14) }} label={I18n.t(CHILD_SIGNUP_LABELS.CLASS)} value={undefined} />,
                                                                    ...dropdownData?.class?.map(option => <Item key={option.id} label={option.label} value={option.id} />)
                                                                ]
                                                            }
                                                        </Picker>
                                                    }
                                                />
                                            </View>
                                        </View>}
                                    {userType.name === USER_TYPE.CHILD || userType.name === USER_TYPE.TEACHER ?
                                        <View style={{ marginTop: convertHeight(15) }}>
                                            <Text style={styles.label}>{I18n.t(CHILD_SIGNUP_LABELS.SCHOOL_NAME)}</Text>
                                            <Input
                                                size='large'
                                                status={(errors.schoolName && touched.schoolName) ? 'danger' : 'basic'}
                                                value={values.schoolName}
                                                placeholder={I18n.t(CHILD_SIGNUP_LABELS.SCHOOL_NAME)}
                                                onChangeText={handleChange('schoolName')}
                                                onBlur={handleBlur('schoolName')}
                                                style={styles.usernameInput}
                                                blurOnSubmit={false}
                                                autoCapitalize='none'
                                            />
                                        </View> : <View></View>
                                    }
                                </View>
                            </Card>
                            <View style={styles.buttonView}>
                                <Button
                                    appearance='filled'
                                    size='large'
                                    disabled={props.user.updateProfile.requestInProgress}
                                    ref={updateProfileButtonRef}
                                    onPress={handleSubmit}
                                >
                                    <Text appearance='alternative' category='h3'>{I18n.t('save')}</Text>
                                </Button>
                            </View>
                        </Content>
                    </SafeAreaView>
                </>
            )}
        </Formik>
    );
}

const themedStyles = StyleService.create({
    content: {
        paddingHorizontal: convertWidth(13),
        paddingVertical: convertHeight(7),
        justifyContent: 'space-between',
        backgroundColor: 'color-basic-1008',
    },
    card: {
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
        // height: convertHeight(300),
        backgroundColor: 'color-basic-600'
    },
    label: {
        color: 'color-basic-1003',
    },
    buttonView: {
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        height: convertHeight(150),
        paddingBottom: convertHeight(43),
        paddingHorizontal: convertWidth(13)
    },
    usernameInput: {
        marginVertical: convertHeight(10)
    },
    toggle: {
        margin: 2
    },
    genderBox: {
        height: convertWidth(100),
        width: convertWidth(100),
        borderRadius: convertWidth(5),
        // backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: convertWidth(10)
    },
});