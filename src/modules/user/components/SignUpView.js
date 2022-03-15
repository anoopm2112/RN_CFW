import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { components, I18n, utils } from '../../../common';
import moment from 'moment';
import { Datepicker } from '@ui-kitten/components';
import { COMMON_SIGNUP_LABELS, PARENT_SIGNUP_LABELS, CHILD_SIGNUP_LABELS, USER_TYPE, GENDER_DATA } from '../constants';

const { RadioGroup, Radio, SafeAreaView, Content, Icon, Text, Button, Dropdown, Picker, Toggle, useStyleSheet, StyleService, CalenderPicker, Input, Card } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;
const { Item } = Picker;

export default SignUpView = (props) => {
    const { route: { params: { data: { requestId = '', phoneNumber } } = {} } = {} } = props;
    const { userType, dropdownData = [], loadLsgiType, lsgiTypeData = [] } = props;
    const theme = useTheme();
    const [gender, setGender] = useState(false);
    const [dob, setDate] = useState('');
    const [selectedIndexGender, setSelectedIndex] = useState(0);
    const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState(true);

    const AlertIcon = (props) => (
        <Icon {...props} name='alert-circle-outline' />
    );

    const styles = useStyleSheet(themedStyles);

    let validationShape = {
        firstName: yup
            .string()
            .required(I18n.t('please_enter_first_name')),
        lastName: yup
            .string()
            .required(I18n.t('please_enter_last_name')),
        dob: yup
            .string()
            .required(I18n.t('please_enter_dob')),
        district: yup
            .string()
            .required(I18n.t('select_your_option')),
        lsgi: yup
            .string()
            .required(I18n.t('select_your_option')),
        lsgiId: yup
            .string()
            .required(I18n.t('select_your_option')),
        phoneNumber: yup
            .string()
            .required(I18n.t('please_enter_phone_number'))
            .min(10, I18n.t('please_enter_valid_phone_number')),
        emailId: yup
            .string()
            .email(I18n.t('please_enter_valid_email_addr'))
            .max(255)
            .required(I18n.t('please_enter_email_addr')),
        password: yup
            .string()
            .required(I18n.t('please_enter_new_password'))
            .min(8, I18n.t('password_should_be_atleast_8_chars')),
        confirmPassword: yup
            .string()
            .required(I18n.t('please_enter_new_password'))
            .oneOf([yup.ref('password'), null], I18n.t('passwords_do_not_match'))
    };

    if (userType.name === USER_TYPE.CHILD) {
        validationShape.class = yup
            .string()
            .required(I18n.t('select_your_option'))
    } else if (userType.name === USER_TYPE.PARENT) {
        validationShape.noOfChildren = yup
            .string()
            .required(I18n.t('please_enter_no_of_children'))
    } else if (userType.name === USER_TYPE.TEACHER) {
        validationShape.schoolName = yup
            .string()
            .required(I18n.t('please_enter_school_name'))
    }

    const signUpValidationSchema = yup.object().shape(validationShape);

    const lastNameInputRef = useRef();
    const phoneNumberRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const signupButtonRef = useRef();

    const toggleSecureEntryPassword = () => {
        setSecureTextEntryPassword(!secureTextEntryPassword);
    };

    const toggleSecureEntryConfirmPassword = () => {
        setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword);
    };

    const renderIconPassword = (props) => (
        <TouchableOpacity onPress={toggleSecureEntryPassword}>
            <Icon {...props} name={secureTextEntryPassword ? 'eye' : 'eye-off'} />
        </TouchableOpacity>
    );

    const renderIconConfirmPassword = (props) => (
        <TouchableOpacity onPress={toggleSecureEntryConfirmPassword}>
            <Icon {...props} name={secureTextEntryConfirmPassword ? 'eye' : 'eye-off'} />
        </TouchableOpacity>
    );

    return (
        <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
                firstName: '', lastName: '', district: '', dob: '', gender: '', phoneNumber: phoneNumber, lsgi: '',
                lsgiId: '', schoolName: '', class: '', noOfChildren: '', password: '', confirmPassword: '',
                emailId: ''
            }}
            onSubmit={(values) => {
                let data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    districtId: values.district,
                    lsgiType: values.lsgi,
                    lsgiId: values.lsgiId,
                    gender: selectedIndexGender + 1,
                    dateOfBirth: moment(values.dob).format("DD/MM/YYYY"),
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    emailId: values.emailId,
                    requestId
                }
                if (userType.name === USER_TYPE.PARENT) {
                    data = { ...data, noOfChildren: values.noOfChildren }
                } else if (userType.name === USER_TYPE.CHILD) {
                    data = { ...data, schoolName: values.schoolName, classId: values.class }
                } else if (userType.name === USER_TYPE.TEACHER) {
                    data = { ...data, schoolName: values.schoolName }
                }
                props.addUser(data);
            }}
        >
            {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                    <SafeAreaView>
                        <Content style={{ backgroundColor: theme['color-basic-1008'] }}>
                            <View style={{ marginVertical: convertWidth(20) }}>
                                <Card shadow style={{ backgroundColor: theme['color-basic-600'] }}>
                                    <Text category="h3" style={styles.signUpText}>{I18n.t('sign_up')}</Text>
                                    <View style={{ padding: convertWidth(10) }}>
                                        <Text style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.FIRST_NAME)}</Text>
                                        <Input
                                            size='large'
                                            status={(errors.firstName && touched.firstName) ? 'danger' : 'basic'}
                                            value={values.firstName}
                                            placeholder={I18n.t(COMMON_SIGNUP_LABELS.FIRST_NAME)}
                                            caption={(errors.firstName && touched.firstName) ? errors.firstName : ''}
                                            captionIcon={(errors.firstName && touched.firstName) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}
                                            style={styles.usernameInput}
                                            returnKeyType='next'
                                            onSubmitEditing={() => lastNameInputRef.current.focus()}
                                            blurOnSubmit={false}
                                            autoCapitalize='none' />
                                        <Text style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.LAST_NAME)}</Text>
                                        <Input
                                            ref={lastNameInputRef}
                                            size='large'
                                            status={(errors.lastName && touched.lastName) ? 'danger' : 'basic'}
                                            value={values.lastName}
                                            placeholder={I18n.t(COMMON_SIGNUP_LABELS.LAST_NAME)}
                                            caption={(errors.lastName && touched.lastName) ? errors.lastName : ''}
                                            captionIcon={(errors.lastName && touched.lastName) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                            style={styles.usernameInput}
                                            returnKeyType='next'
                                            onSubmitEditing={() => phoneNumberRef.current.focus()}
                                            blurOnSubmit={false}
                                            autoCapitalize='none'
                                        />
                                        <Text category='h5' style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.DISTRICT)}</Text>
                                        <View style={styles.usernameInput}>
                                            <Dropdown
                                                picker={
                                                    <Picker
                                                        selectedValue={values.district}
                                                        onValueChange={(itemValue) => {
                                                            setFieldValue('district', itemValue)
                                                            if (values.lsgi) {
                                                                loadLsgiType({ districtId: itemValue, lsgiTypeId: values.lsgi });
                                                            }
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
                                                status={(errors.lsgi && touched.lsgi) ? 'danger' : 'basic'}
                                                caption={(errors.lsgi && touched.lsgi) ? <Text style={styles.errorText} category='c1' status='danger'>{errors.lsgi}</Text> : null}
                                                captionIcon={(errors.lsgi && touched.lsgi) ? <Icon fill={theme['color-danger-500']} style={styles.alertIcon} name='alert-circle-outline' /> : null}
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
                                                status={(errors.lsgiId && touched.lsgiId) ? 'danger' : 'basic'}
                                                caption={(errors.lsgiId && touched.lsgiId) ? <Text style={styles.errorText} category='c1' status='danger'>{errors.lsgiId}</Text> : null}
                                                captionIcon={(errors.lsgiId && touched.lsgiId) ? <Icon fill={theme['color-danger-500']} style={styles.alertIcon} name='alert-circle-outline' /> : null}
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
                                                    onSelect={nextDate => { setDate(nextDate); setFieldValue('dob', nextDate) }}
                                                    status={(errors.dob && touched.dob) ? 'danger' : 'basic'}
                                                    caption={(errors.dob && touched.dob) ? <Text style={styles.errorText} category='c1' status='danger'>{errors.dob}</Text> : null}
                                                />
                                            </View>
                                        </View>

                                        <Text style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.PHONE)}</Text>
                                        <Input
                                            ref={phoneNumberRef}
                                            size='large'
                                            status={(errors.phoneNumber && touched.phoneNumber) ? 'danger' : 'basic'}
                                            value={values.phoneNumber}
                                            placeholder={I18n.t(COMMON_SIGNUP_LABELS.PHONE)}
                                            caption={(errors.phoneNumber && touched.phoneNumber) ? errors.phoneNumber : ''}
                                            captionIcon={(errors.phoneNumber && touched.phoneNumber) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('phoneNumber')}
                                            onBlur={handleBlur('phoneNumber')}
                                            style={styles.usernameInput}
                                            returnKeyType='next'
                                            onSubmitEditing={() => passwordInputRef.current.focus()}
                                            blurOnSubmit={false}
                                            autoCapitalize='none'
                                            maxLength={10}
                                            disabled={true}
                                            keyboardType='phone-pad'
                                        />
                                        <Text style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.EMAIL)}</Text>
                                        <Input
                                            size='large'
                                            status={(errors.emailId && touched.emailId) ? 'danger' : 'basic'}
                                            value={values.emailId}
                                            placeholder={I18n.t(COMMON_SIGNUP_LABELS.EMAIL)}
                                            caption={(errors.emailId && touched.emailId) ? errors.emailId : ''}
                                            captionIcon={(errors.emailId && touched.emailId) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('emailId')}
                                            onBlur={handleBlur('emailId')}
                                            style={styles.usernameInput}
                                            returnKeyType='next'
                                            blurOnSubmit={false}
                                            autoCapitalize='none'
                                        />
                                        <Text category='h5' style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.GENDER)}</Text>
                                        <View style={{ flexWrap: 'wrap', marginTop: convertHeight(10), marginBottom: convertHeight(10), }}>
                                            {GENDER_DATA.map((option, index) => {
                                                const isActive = selectedIndexGender === index;
                                                return (
                                                    <View key={option.id} style={{ flexDirection: 'row', marginBottom: convertHeight(7), alignItems: 'center' }}>
                                                        <Radio checked={isActive} status={userType.name === USER_TYPE.CHILD ? 'white' : 'black'}
                                                            onChange={() => { setSelectedIndex(index) }} />
                                                        <Text onPress={() => { setSelectedIndex(index) }} style={{ paddingHorizontal: convertWidth(7), color: theme['color-basic-1002'] }} category='h5' numberOfLines={2}>
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
                                                    keyboardType='number-pad'
                                                    caption={(errors.noOfChildren && touched.noOfChildren) ? errors.noOfChildren : ''}
                                                    captionIcon={(errors.noOfChildren && touched.noOfChildren) ? AlertIcon : () => (<></>)}
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
                                                                        <Picker.Item key={0} style={{ color: theme['color-basic-1011'], fontSize: convertWidth(14) }} label={I18n.t(CHILD_SIGNUP_LABELS.CLASS)} value={undefined} />,
                                                                        ...dropdownData?.class?.map(option => <Item key={option.id} label={option.label} value={option.id} />)
                                                                    ]
                                                                }
                                                            </Picker>
                                                        }
                                                        status={(errors.class && touched.class) ? 'danger' : 'basic'}
                                                        caption={(errors.class && touched.class) ? <Text style={styles.errorText} category='c1' status='danger'>{errors.class}</Text> : null}
                                                        captionIcon={(errors.class && touched.class) ? <Icon fill={theme['color-danger-500']} style={styles.alertIcon} name='alert-circle-outline' /> : null}
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

                                        <Text style={[styles.label, { marginTop: convertHeight(15) }]}>{I18n.t(COMMON_SIGNUP_LABELS.PASSWORD)}</Text>
                                        <Input
                                            ref={passwordInputRef}
                                            size='large'
                                            status={(errors.password && touched.password) ? 'danger' : 'basic'}
                                            value={values.password}
                                            maxLength={16}
                                            accessoryRight={renderIconPassword}
                                            placeholder={I18n.t('password')}
                                            caption={(errors.password && touched.password) ? errors.password : ''}
                                            captionIcon={(errors.password && touched.password) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            style={styles.usernameInput}
                                            returnKeyType='next'
                                            onSubmitEditing={() => { confirmPasswordInputRef.current.focus() }}
                                            blurOnSubmit={false}
                                            secureTextEntry={secureTextEntryPassword}
                                        />
                                        <Text style={styles.label}>{I18n.t(COMMON_SIGNUP_LABELS.CONFIRM_PASSWORD)}</Text>
                                        <Input
                                            size='large'
                                            status={(errors.confirmPassword && touched.confirmPassword) ? 'danger' : 'basic'}
                                            value={values.confirmPassword}
                                            maxLength={16}
                                            accessoryRight={renderIconConfirmPassword}
                                            placeholder={I18n.t('confirm_new_password')}
                                            caption={(errors.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ''}
                                            captionIcon={(errors.confirmPassword && touched.confirmPassword) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            style={styles.usernameInput}
                                            ref={confirmPasswordInputRef}
                                            returnKeyType='next'
                                            onSubmitEditing={() => { signupButtonRef.current.props.onPress() }}
                                            secureTextEntry={secureTextEntryConfirmPassword}
                                        />
                                        <View style={{ marginBottom: convertWidth(10) }}>
                                            <Button
                                                ref={signupButtonRef}
                                                style={styles.loginButton}
                                                appearance='filled'
                                                size='large'
                                                onPress={handleSubmit}>
                                                <Text appearance='alternative' category='h4'>{I18n.t('sign_up')}</Text>
                                            </Button>
                                        </View>

                                        <View style={styles.bottomLink}>
                                            <Text style={{ width: convertWidth(150), textAlign: 'center', color: theme['color-basic-1002'] }}>{I18n.t('already_have_an_account')}</Text>
                                            <Text onPress={() => props.navigateToLogin(userType.name)} style={{ textAlign: 'center', width: convertWidth(150), color: theme['color-basic-1002'], fontWeight: 'bold', fontSize: convertWidth(15) }}> {I18n.t('login')}</Text>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        </Content>
                    </SafeAreaView>
                </>
            )}
        </Formik>
    );
}

const themedStyles = StyleService.create({
    bottomLink: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: convertWidth(20),
        justifyContent: 'space-between'
    },
    nameWrapperView: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        top: convertWidth(30)
    },
    cardStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F4F4',
        paddingHorizontal: convertWidth(30),
    },
    usernameInput: {
        marginVertical: convertHeight(10)
    },
    passwordInput: {
        marginTop: convertHeight(7)
    },
    loginButton: {
        marginTop: convertHeight(10)
    },
    forgotPasswordLink: {
        marginTop: convertHeight(18),
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: convertWidth(20),
    },
    iconStyle: {
        width: convertWidth(30),
        height: convertHeight(30),
        color: 'color-basic-1002'
    },
    subHead: {
        color: 'color-basic-400',
        fontSize: convertWidth(23),
        fontWeight: 'bold'
    },
    label: {
        color: 'color-basic-1002',
        fontSize: convertWidth(14)
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
    signUpText: {
        padding: convertWidth(10),
        color: 'color-basic-1002',
        fontWeight: 'bold'
    },
    errorText: {
        marginTop: convertHeight(4)
    },
    alertIcon: {
        width: convertWidth(10),
        height: convertHeight(10),
        marginRight: convertWidth(8),
        marginTop: convertHeight(8)
    }
});
