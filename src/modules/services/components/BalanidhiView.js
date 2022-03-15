import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';

const { SafeAreaView, Card, Header, Text, Icon, FontelloIcon, Content } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const BalanidhiView = (props) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(13),
            paddingVertical: convertHeight(7),
            backgroundColor: theme['color-basic-1008']
        },
        container: {
            padding: 10,
            backgroundColor: theme['color-basic-1008']
        },
        descCard: {
            flex: 1,
            borderRadius: convertHeight(10),
            backgroundColor: theme['color-basic-600'],
            padding: convertHeight(15),
            paddingTop: convertHeight(10)
        },
        bottomButtons: {
            borderRadius: convertWidth(10),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: convertHeight(5),
            paddingHorizontal: convertWidth(10),
            flex: 1,
            flexDirection: 'row'
        },
        appointmentBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: theme['color-primary-500']
        }
    });

    return (
        <SafeAreaView>
            <Header title={I18n.t('donate_now')} />
            <Content style={styles.container}>
                <Card shadow style={styles.descCard}>
                    <Text category="h5" style={{ lineHeight: convertWidth(22), color: theme['color-basic-1002'], textAlign: 'justify' }}>{I18n.t('balanidhi_desc')} {I18n.t('balanidhi_desc')}</Text>
                </Card>
            </Content>
            <TouchableOpacity onPress={() => Linking.openURL('https://balanidhi.kerala.gov.in/')} style={styles.appointmentBtn}>
                <Text category="h4" style={{ color: theme['color-basic-100'] }}>{I18n.t('web_portal')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default BalanidhiView;