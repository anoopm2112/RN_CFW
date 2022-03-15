import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { components, I18n, utils } from '../../../common';
import { Svg, Circle } from 'react-native-svg';
import { useTheme } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { SafeAreaView, Content, Icon, FontelloIcon, Text, Button, useStyleSheet, StyleService, Input, Header, Card } = components;
const { dimensionUtils: { convertHeight, convertWidth }, userUtils: { getFullName } } = utils;

export default MyProfile = (props) => {
    const { info: { contact: { email = I18n.t('no_data_available'), mobile = I18n.t('no_data_available'), country: { code } = {} } = {} } = {} } = props.user;
    const { info: { defaultOrganization: { name: defaultOrganizationName } = {}, additionalInfo: { customerNumber, qrCode, residenceCategory: { name: residenceCategoryName } = {},
        serviceWroker: { name: serviceWrokerName } = {},
        customerLocation: { value = '' } = {},
        serviceProvider: { name: serviceProviderName } = {},
        ward: { name: wardName } = {},
        serviceWorkerSupervisor: { name: serviceWorkerSupervisorName } = {} } = {} } } = props.user;
    const values = value ? JSON.parse(value) : '';
    const formattedAddress = values ? values.formattedAddress : '';
    // const styles = useStyleSheet(themedStyles);
    const theme = useTheme();

    const AlertIcon = (props) => (
        <Icon {...props} name='alert-circle-outline' />
    );
    const CallIcon = () => (
        <Icon
            name='phone'
            pack='material-community'
            style={
                {
                    width: convertHeight(22),
                    height: convertHeight(22),
                    color: theme['color-basic-1003']
                }
            } />
    );
    const MailIcon = () => (
        <Icon
            name='email'
            pack='material-community'
            style={
                {
                    width: convertHeight(22),
                    height: convertHeight(22),
                    color: theme['color-basic-1003']
                }
            } />
    );

    const LanguageIcon = () => (
        <FontelloIcon
            name='language'
            size={convertHeight(22)}
            style={
                {
                    color: theme['color-basic-1003']
                }
            } />
    );


    const CustomerNumberIcon = () => (
        <Icon
            name='numeric-0-box-multiple'
            pack='material-community'
            style={
                {
                    width: convertHeight(22),
                    height: convertHeight(22),
                    color: theme['color-basic-1003']
                }
            } />
    );

    const FormattedAddressIcon = () => (
        <Icon
            name='home'
            pack='material-community'
            style={
                {
                    width: convertHeight(22),
                    height: convertHeight(22),
                    color: theme['color-basic-1000']
                }
            } />
    );

    const styles = StyleSheet.create({
        content: {
            backgroundColor: theme['color-basic-1008'],
            paddingHorizontal: convertWidth(13),
            paddingVertical: convertHeight(7)
        },
        languageIconWrapper: {
            position: 'absolute',
            top: convertHeight(35.82)
        },
        profileIcon: {
            width: convertHeight(91),
            height: convertHeight(91),
        },
        userNameText: {
            marginTop: convertHeight(14.61),
            color: theme['color-basic-1003'],
        },
        nameWrapperView: {
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            height: convertHeight(150)
        },
        cardStyle: {
            backgroundColor: theme['color-basic-600'],
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            padding: convertHeight(10),
            borderRadius: convertHeight(5)
        },
        textInput: {
            borderColor: 'transparent',
            backgroundColor: theme['color-basic-400']
        },
        textInputText: {
            fontFamily: 'Roboto-Medium',
            fontSize: convertHeight(16),
            fontWeight: '500',
            textAlign: 'center',
            color: theme['color-basic-1003']
        },
        editProfileButton: {
            borderWidth: convertWidth(1),
            backgroundColor: theme['color-primary-500'],
            marginBottom: convertHeight(22)
        },
        iconStyle: {
            width: convertWidth(80),
            height: convertHeight(80),
            borderRadius: convertHeight(80 / 2)
        }
    });



    return (
        <SafeAreaView>
            <Header title={I18n.t('my_profile')} />
            <Content style={styles.content}>
                <Card shadow style={styles.cardStyle}>
                    <View style={styles.nameWrapperView}>
                        {props?.user?.info?.additionalInfo?.photo ?
                            <Image style={styles.iconStyle} source={{ uri: `data:image/*;base64,${props.user.info.additionalInfo.photo}` }} />
                            :
                            <Icon name={'account-circle'} pack="material-community" style={[styles.iconStyle, { color: theme['color-basic-1008'] }]} />
                        }
                        {/* <Icon name="account-circle" pack="material-community" style={[ styles.profileIcon ,{ color: theme['color-basic-1000'] }]} /> */}
                        <Text style={styles.userNameText} category='h4'>{getFullName(props.user)}</Text>
                    </View>

                    <Input
                        size='large'
                        value={code && code + ' ' + mobile || mobile}
                        disabled
                        style={styles.textInput}
                        textStyle={styles.textInputText}
                        accessoryLeft={CallIcon}
                    />
                    <Input
                        size='large'
                        value={email}
                        disabled
                        style={styles.textInput}
                        textStyle={styles.textInputText}
                        accessoryLeft={MailIcon}
                    />
                    <Input
                        size='large'
                        value={props.language.label}
                        disabled
                        style={styles.textInput}
                        textStyle={styles.textInputText}
                        accessoryLeft={LanguageIcon}
                    />
                    <View style={{ padding: convertWidth(10) }}>
                        <Button
                            style={styles.editProfileButton}
                            // appearance="outline"
                            // status="primary"
                            size='large'
                            onPress={props.navigateToEditProfile}
                        >
                            <Text style={{ color: theme['color-basic-100'] }} category='h3'>{I18n.t('edit_profile')}</Text>
                        </Button>
                    </View>
                </Card>
            </Content>
        </SafeAreaView>

    );
}

