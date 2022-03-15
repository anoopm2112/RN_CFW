import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@ui-kitten/components';
import RNConfigReader from 'rn-config-reader';
import { components, utils, I18n } from '../../../common';
import types from '../../../common/eva/mapping';

const { dimensionUtils: { convertHeight, convertWidth } } = utils;
const { SafeAreaView, Layout, Icon, Text, Input, Button, Content, Card } = components;

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

export default ResetPasswordView = (props) => {
    const resetPasswordValidationSchema = yup.object().shape({
        password: yup
            .string()
            .required(I18n.t('please_enter_new_password'))
            .min(8, I18n.t('password_should_be_atleast_8_chars')),
        confirmPassword: yup
            .string()
            .required(I18n.t('please_enter_new_password'))
            .oneOf([yup.ref('password'), null], I18n.t('passwords_do_not_match'))
    });

    const confirmPasswordInputRef = useRef();
    const resetPasswordButtonRef = useRef();

    const { route: { params: { data: requestId = '' } = {} } = {}, user: { resetPassword } } = props;

    const theme = useTheme();

    const styles = StyleSheet.create({
        topLayout: {
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            backgroundColor: theme['color-basic-1000'],
            height: convertHeight(162)
        },
        bottomLayout: {
            backgroundColor: theme['color-basic-1000'],
            height: convertHeight(478),
            alignSelf: 'stretch'
        },
        layout: {
            flex: 1,
            paddingHorizontal: convertWidth(30),
            borderTopLeftRadius: convertWidth(60)
        },
        circle: {
            height: convertHeight(58),
            width: convertHeight(58),
            borderRadius: convertWidth(30),
        },
        nameText: {
            fontFamily: types.strict['text-font-family'],
            fontSize: convertHeight(20),
            lineHeight: convertHeight(23),
            color: theme['color-basic-100'],
            paddingTop: convertHeight(6)
        },
        passwordText: {
            color: theme['color-basic-1002'],
            fontWeight: 'bold'
        },
        passwordInput: {
            marginTop: convertHeight(19)
        },
        resetPasswordButton: {
            marginTop: convertHeight(30)
        },
        resetPasswordButtonTextView: {
            width: convertWidth(250),
            alignItems: 'center'
        },
        iconStyle: {
            width: convertWidth(62),
            height: convertHeight(62),
            top: convertWidth(10),
            left: convertWidth(10),
            resizeMode: 'contain'
        },
        cardStyle: {
            backgroundColor: theme['color-basic-600']
        },
        nameWrapperView: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: convertWidth(30)
        },
        iconStyle: {
            width: convertHeight(50),
            height: convertHeight(50)
        },
        logoRound: {
            width: convertHeight(90),
            height: convertHeight(90),
            borderRadius: convertHeight(90 / 2),
            backgroundColor: theme['color-basic-1012'],
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: convertHeight(5)
        }
    });

    return (
        <Formik
            validationSchema={resetPasswordValidationSchema}
            initialValues={{ password: '', confirmPassword: '', requestId }}
            onSubmit={props.resetPassword}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                    <SafeAreaView>
                        <Content style={{ backgroundColor: theme['color-basic-1008'] }}>
                            <View style={styles.nameWrapperView}>
                                <View style={styles.logoRound}>
                                    <Icon name={RNConfigReader.app_login_icon} pack="assets" style={styles.iconStyle} />
                                </View>
                                <Text category="h3" style={{ color: theme['color-basic-1002'], fontWeight: 'bold', marginTop: convertHeight(10) }} >{I18n.t(RNConfigReader.app_name_key)}</Text>
                            </View>
                            <Card style={styles.cardStyle} shadow>
                                <View style={{ padding: convertWidth(10) }}>
                                    <Text style={styles.passwordText} category='h3'>{I18n.t('reset_password')}</Text>
                                    <Input
                                        size='large'
                                        status={(errors.password && touched.password) ? 'danger' : 'basic'}
                                        value={values.password}
                                        maxLength={16}
                                        placeholder={I18n.t('new_password')}
                                        caption={(errors.password && touched.password) ? errors.password : ''}
                                        captionIcon={(errors.password && touched.password) ? AlertIcon : () => (<></>)}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        style={styles.passwordInput}
                                        returnKeyType='next'
                                        onSubmitEditing={() => { confirmPasswordInputRef.current.focus() }}
                                        blurOnSubmit={false}
                                        secureTextEntry
                                    />
                                    <Input
                                        size='large'
                                        status={(errors.confirmPassword && touched.confirmPassword) ? 'danger' : 'basic'}
                                        value={values.confirmPassword}
                                        maxLength={16}
                                        placeholder={I18n.t('confirm_new_password')}
                                        caption={(errors.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ''}
                                        captionIcon={(errors.confirmPassword && touched.confirmPassword) ? AlertIcon : () => (<></>)}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        style={styles.passwordInput}
                                        ref={confirmPasswordInputRef}
                                        returnKeyType='next'
                                        onSubmitEditing={() => { resetPasswordButtonRef.current.props.onPress() }}
                                        secureTextEntry
                                    />
                                    <Button
                                        style={styles.resetPasswordButton}
                                        appearance='filled'
                                        disabled={resetPassword.requestInProgress}
                                        size='large'
                                        onPress={handleSubmit}
                                        ref={resetPasswordButtonRef}
                                    >
                                        <View style={styles.resetPasswordButtonTextView}>
                                            <Text numberOfLines={1} appearance='alternative' category='h3'>{I18n.t('reset_password')}</Text>
                                        </View>
                                    </Button>
                                </View>
                            </Card>
                        </Content>
                    </SafeAreaView>
                </>
            )}
        </Formik>
    );
};
