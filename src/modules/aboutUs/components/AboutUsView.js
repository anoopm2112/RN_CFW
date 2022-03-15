import React from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import RNConfigReader from 'rn-config-reader';
import { components, I18n, utils } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { convertWidth } from '../../../common/utils/dimensionUtil';

const { dimensionUtils: { convertHeight } } = utils
const { Icon, Content, Text, Card, SafeAreaView, Header } = components;

const AboutUsView = () => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        mainContainer: {
            margin: 7,
        },
        heading: {
            paddingVertical: convertHeight(12),
            fontWeight: 'bold',
            color: theme['color-basic-1003']
        },
        card: {
            alignSelf: 'stretch',
            flex: 1,
            margin: 7,
            marginBottom: 25,
            backgroundColor: theme['color-basic-600'],
            borderRadius: convertHeight(5)
        }
    });

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ backgroundColor: theme['color-basic-1008'] }}>
                <Header title={I18n.t('about_us')} />
                <Content style={styles.mainContainer}>
                    <Card shadow style={styles.card}>
                        <View style={styles.container}>
                            <Icon resizeMode='contain' style={{ height: convertHeight(150), width: convertWidth(320) }} name={'about-us'} pack="assets" />
                        </View>
                        <View style={{ padding: convertHeight(10) }}>
                            <Text category="h3" style={styles.heading}>{I18n.t('aboutus_title')}</Text>
                            <Text category="h5" style={{ lineHeight: convertWidth(22), textAlign: 'justify', paddingBottom: 10, color: theme['color-basic-1003'] }}>{I18n.t('aboutus_content')}</Text>
                            <View style={{ flexDirection: 'row', marginVertical: convertHeight(7), justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => RNConfigReader.app_term_condition === '' ? '' : Linking.openURL(`${RNConfigReader.app_term_condition}`)}>
                                    <Text category="h5" style={{ lineHeight: convertWidth(22), color: theme['color-basic-1003'], textDecorationLine: 'underline' }}>{I18n.t('terms_of_service')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => RNConfigReader.app_policy_privacy === '' ? '' : Linking.openURL(`${RNConfigReader.app_policy_privacy}`)}>
                                    <Text category="h5" style={{ lineHeight: convertWidth(22), color: theme['color-basic-1003'], textDecorationLine: 'underline' }}>{I18n.t('privacy_policy')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </Content>
            </SafeAreaView>
        </>
    );
}

export default AboutUsView;
