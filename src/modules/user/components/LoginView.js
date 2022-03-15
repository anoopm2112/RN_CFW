import React, { useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Svg, Circle } from 'react-native-svg';
import RNConfigReader from 'rn-config-reader';
import { components, I18n, utils } from '../../../common';
import { USER_TYPE } from '../constants';

const { SafeAreaView, Content, Icon, FontelloIcon, Text, Button, useStyleSheet, StyleService, Input, Card } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;

export default LoginView = (props) => {
    const { userType } = props;
    const theme = useTheme();
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const AlertIcon = (props) => (
        <Icon {...props} name='alert-circle-outline' />
    );
    const UserIcon = () => (
        <FontelloIcon name="user" size={convertHeight(20)} color={theme['color-basic-1006']} />
    );
    const PasswordIcon = () => (
        <FontelloIcon name="password" size={convertHeight(20)} color={theme['color-basic-1006']} />
    );

    const {
        user: { login },
        authenticate,
        navigateToForgotPassword,
        navigateToSignUp,
        navigateToMobileOtp
    } = props;
    const styles = useStyleSheet(themedStyles);
    const loginValidationSchema = yup.object().shape({
        username: yup
            .string()
            .required(I18n.t('please_enter_username_customerid_phone')),
        password: yup
            .string()
            .required(I18n.t('please_enter_password')),
    });

    const passwordInputRef = useRef();
    const loginButtonRef = useRef();

    const getUserTypeName = () => {
        if (userType.name === USER_TYPE.CHILD) {
            return I18n.t('child');
        } else if (userType.name === USER_TYPE.PARENT) {
            return I18n.t('parent');
        } else if (userType.name === USER_TYPE.TEACHER) {
            return I18n.t('teacher');
        } else if (userType.name === USER_TYPE.GENERAL_PUBLIC) {
            return I18n.t('general_public');
        } else if (userType.name === USER_TYPE.OFFICIAL) {
            return I18n.t('official');
        }
    }

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableOpacity onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye' : 'eye-off'} />
        </TouchableOpacity>
    );

    return (
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ username: '', password: '' }}
            onSubmit={authenticate}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                    <SafeAreaView>
                        <Content style={{ backgroundColor: theme['color-basic-1008'] }}>
                            <View style={styles.nameWrapperView}>
                                <View style={styles.logoRound}>
                                    <Svg height={convertHeight(80)} width={convertWidth(80)}>
                                        <Icon name={RNConfigReader.app_login_icon} pack="assets" style={styles.iconStyle} />
                                    </Svg>
                                </View>
                                <Text style={{ color: theme['color-basic-1002'], fontSize: convertWidth(18), fontWeight: 'bold', marginTop: convertHeight(10) }} >{I18n.t(RNConfigReader.app_name_key)}</Text>
                            </View>
                            <View style={{ marginTop: convertWidth(50) }}>
                                <Card style={styles.cardStyle} shadow>
                                    <View style={{ padding: convertWidth(10) }}>
                                        <Text style={{ color: theme['color-basic-1002'], fontSize: convertWidth(23), fontWeight: 'bold' }}>{I18n.t('login')}</Text>
                                        <Input
                                            size='large'
                                            status={(errors.username && touched.username) ? 'danger' : 'basic'}
                                            value={values.username}
                                            placeholder={I18n.t('username_customerid_phone')}
                                            caption={(errors.username && touched.username) ? errors.username : ''}
                                            accessoryLeft={UserIcon}
                                            captionIcon={(errors.username && touched.username) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            style={styles.usernameInput}
                                            returnKeyType='next'
                                            onSubmitEditing={() => passwordInputRef.current.focus()}
                                            blurOnSubmit={false}
                                            autoCapitalize='none'
                                        />
                                        <Input
                                            size='large'
                                            status={(errors.password && touched.password) ? 'danger' : 'basic'}
                                            value={values.password}
                                            placeholder={I18n.t('password')}
                                            caption={(errors.password && touched.password) ? errors.password : ''}
                                            accessoryLeft={PasswordIcon}
                                            accessoryRight={renderIcon}
                                            captionIcon={(errors.password && touched.password) ? AlertIcon : () => (<></>)}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            secureTextEntry={secureTextEntry}
                                            style={styles.passwordInput}
                                            ref={passwordInputRef}
                                            returnKeyType='next'
                                            onSubmitEditing={() => { loginButtonRef.current.props.onPress() }}
                                        />
                                        <Button
                                            style={styles.loginButton}
                                            appearance='filled'
                                            disabled={login.isAuthenticating}
                                            size='large'
                                            onPress={handleSubmit}
                                            ref={loginButtonRef}
                                        >
                                            <Text appearance='alternative' category='h3'>{I18n.t('login')}</Text>
                                        </Button>
                                        <TouchableOpacity style={styles.forgotPasswordLink} disabled={login.isAuthenticating}>
                                            <Text category="h5" onPress={() => navigateToMobileOtp({ forgetPassword: true })} style={{ color: theme['color-basic-1002'] }}>{I18n.t('forgot_your_password')}</Text>
                                            {
                                                userType.name != USER_TYPE.OFFICIAL &&
                                                <Text category="h5" onPress={() => navigateToMobileOtp({ forgetPassword: false })} style={{ color: theme['color-basic-1002'], fontWeight: 'bold', width: convertWidth(140), textAlign: 'center' }}> {getUserTypeName()} {I18n.t('sign_up')}</Text>
                                            }
                                        </TouchableOpacity>
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
    nameWrapperView: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        top: convertWidth(30)
    },
    usernameInput: {
        marginTop: convertHeight(50)
    },
    passwordInput: {
        marginTop: convertHeight(15)
    },
    loginButton: {
        marginTop: convertHeight(15)
    },
    forgotPasswordLink: {
        marginVertical: convertHeight(18),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconStyle: {
        width: convertWidth(62),
        height: convertHeight(62),
        top: convertWidth(10),
        left: convertWidth(10),
        resizeMode: 'contain',
    },
    logoRound: {
        width: convertHeight(120),
        height: convertHeight(120),
        borderRadius: convertHeight(120),
        backgroundColor: 'color-primary-500',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardStyle: {
        width: convertWidth(330),
        backgroundColor: 'color-basic-600'
    }
});
