import React, { useRef } from 'react';
import { View } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import RNConfigReader from 'rn-config-reader';
import { components, I18n, utils } from '../../../common';

const { SafeAreaView, Content, Icon, FontelloIcon, Text, Button, useStyleSheet, StyleService, Input, Card } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;

export default MobileOtpView = (props) => {
    const { forgetPassword } = props.route.params.data;
    const theme = useTheme();

    const AlertIcon = (props) => (
        <Icon {...props} name='alert-circle-outline' />
    );
    const UserIcon = () => (
        <FontelloIcon name="user" size={convertHeight(20)} color={theme['color-basic-800']} />
    );

    const styles = useStyleSheet(themedStyles);
    const forgotPasswordValidationSchema = yup.object().shape({
        phoneNumber: yup
            .string()
            .required(I18n.t('please_enter_phone_number'))
            .matches(new RegExp('[0-9]{10}'), I18n.t('please_enter_valid_phone_number'))
    });

    const otpButtonRef = useRef();

    return (
        <Formik
            validationSchema={forgotPasswordValidationSchema}
            initialValues={{ phoneNumber: '', forgetPassword }}
            onSubmit={(values) => { props.sendOtp(values); }}
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
                                    <Text category="h3" style={styles.signUpText}>{forgetPassword ? I18n.t('forgot_password') : I18n.t('sign_up')}</Text>
                                    <Input
                                        size='large'
                                        status={(errors.phoneNumber && touched.phoneNumber) ? 'danger' : 'basic'}
                                        value={values.phoneNumber}
                                        maxLength={10}
                                        placeholder={I18n.t('phone_number')}
                                        caption={(errors.phoneNumber && touched.phoneNumber) ? errors.phoneNumber : ''}
                                        accessoryLeft={UserIcon}
                                        captionIcon={(errors.phoneNumber && touched.phoneNumber) ? AlertIcon : () => (<></>)}
                                        onChangeText={(text) => {
                                            text = text.replace(/[^0-9]/g, '');
                                            handleChange('phoneNumber')(text);
                                        }}
                                        onBlur={handleBlur('phoneNumber')}
                                        style={styles.phoneNumberInput}
                                        keyboardType='numeric'
                                        returnKeyType='next'
                                        onSubmitEditing={() => { otpButtonRef.current.props.onPress() }}
                                    />
                                    <View style={{ marginBottom: convertWidth(20), marginTop: convertHeight(10) }}>
                                        <Button
                                            style={styles.otpButton}
                                            appearance='filled'
                                            disabled={props.user.forgotPassword.requestInProgress}
                                            size='large'
                                            onPress={handleSubmit}
                                            ref={otpButtonRef}>
                                            <Text appearance='alternative' category='h3'>{I18n.t('send_otp')}</Text>
                                        </Button>
                                    </View>
                                </View>
                            </Card>
                        </Content>
                    </SafeAreaView>
                </>
            )}
        </Formik>
    );
}

const themedStyles = StyleService.create({
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
        backgroundColor: 'color-primary-500',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: convertHeight(5)
    },
    cardStyle: {
        width: convertWidth(330),
        backgroundColor: 'color-basic-600'
    },
    signUpText: {
        color: 'color-basic-1002',
        fontWeight: 'bold',
        marginBottom: convertHeight(20)
    }
});
