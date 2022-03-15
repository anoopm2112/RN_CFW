import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';

const { SafeAreaView, Card, Header, Text, FontelloIcon } = components;
const { dimensionUtils: { convertWidth, convertHeight }, locationUtils: { hasLocationAccess } } = utils;

const ChildProtectionCategoryDetailView = (props) => {
    const { data: { data } } = props.route.params;
    console.tron.log(data);
    const theme = useTheme();

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(13),
            paddingVertical: convertHeight(7),
            backgroundColor: theme['color-basic-1008']
        },
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: theme['color-basic-1008']
        },
        descCard: {
            borderRadius: convertHeight(10),
            backgroundColor: theme['color-basic-600'],
            padding: convertHeight(15),
            paddingTop: convertHeight(10),
            marginBottom: convertHeight(10)
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

    const phoneCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    }

    const locationMap = (location) => {
        hasLocationAccess(location.latitude, location.longitude);
    };

    return (
        <SafeAreaView>
            <Header title={data.label} />
            <View style={styles.container}>
                <Card shadow style={styles.descCard}>
                    <Text category="h5" style={{ lineHeight: convertHeight(22), color: theme['color-basic-1002'], textAlign: 'justify' }}>{data.desc}</Text>
                </Card>
                {data.address &&
                    <Card shadow style={styles.descCard}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontelloIcon name="location" size={convertHeight(15)} color={theme['color-basic-1002']} style={{ paddingTop: convertHeight(3) }} />
                            <View style={{ marginHorizontal: 7 }}>
                                <Text category="h5" style={{ fontWeight: 'bold', color: theme['color-basic-1002'] }}>{data.label}</Text>
                                <Text category="h5" numberOfLines={2} style={{ width: convertWidth(265), color: theme['color-basic-1002'] }}>{data.address}</Text>
                                <Text category="h5" numberOfLines={2} style={{ width: convertWidth(265), color: theme['color-basic-1002'] }}>{data.phoneNumber}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => phoneCall(data.phoneNumber)} style={[styles.bottomButtons, { backgroundColor: theme['color-basic-600'], borderWidth: 1, borderColor: theme['color-basic-1002'] }]}>
                                <FontelloIcon name={'call'} size={convertHeight(17)} color={theme['color-basic-1002']} style={{ paddingRight: 5 }} />
                                <Text category="h5" style={{ fontSize: convertWidth(15), color: theme['color-basic-1002'] }}>{I18n.t('call')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => locationMap(data.location)} style={[styles.bottomButtons, { backgroundColor: theme['color-primary-500'], marginLeft: convertWidth(10) }]}>
                                <FontelloIcon name={'get_direction'} size={convertHeight(18)} color={theme['color-basic-100']} style={{ paddingRight: 5 }} />
                                <Text category="h5" style={{ fontSize: convertWidth(15), color: theme['color-basic-100'] }}>{I18n.t('get_direction')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>}
            </View>
            {data.id === 5 &&
                <TouchableOpacity style={styles.appointmentBtn}>
                    <Text category="h5" style={{ color: theme['color-basic-100'] }}>{I18n.t('book_appointment')}</Text>
                </TouchableOpacity>}
        </SafeAreaView>
    );
}

export default ChildProtectionCategoryDetailView;