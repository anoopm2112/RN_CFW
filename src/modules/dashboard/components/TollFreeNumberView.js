import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { components, I18n, utils } from '../../../common';
import { useIsFocused } from '@react-navigation/native';

const { SafeAreaView, Text, Card, FontelloIcon, Header } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;

const TollFreeNumberView = (props) => {
    const { tollFreeNumber } = props;
    // console.tron.log(tollFreeNumber);
    const theme = useTheme();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            props.loadTollFreeNumbers();
        }
    }, [isFocused]);

    const dashboardItems = [];
    dashboardItems.push(
        {
            id: '1',
            icon: 'police',
            title: I18n.t('police'),
            number: '1101'
        },
        {
            id: '2',
            icon: 'legal-office',
            title: I18n.t('legal_office'),
            number: '1102'
        },
        {
            id: '3',
            icon: 'labour-office',
            title: I18n.t('labour_office'),
            number: '1103'
        },
        {
            id: '4',
            icon: 'parent',
            title: I18n.t('parent_clinic'),
            number: '1104'
        },
    );

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme['color-basic-1008']
        },
        card: {
            margin: convertHeight(7),
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-600'],
            padding: convertHeight(7),
            flex: 2.5
        },
        iconStyle: {
            width: convertWidth(40),
            height: convertHeight(40)
        },
        iconContainer: {
            height: convertHeight(65),
            width: convertHeight(65),
            borderRadius: convertHeight(10),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['color-primary-600'],
            elevation: 15,
            borderRightWidth: 2,
            borderBottomWidth: 1,
            borderColor: theme['color-basic-1008']
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: convertWidth(15)
        },
        callRoundContainer: {
            height: convertHeight(75),
            width: convertHeight(75),
            borderRadius: convertHeight(75 / 2),
            backgroundColor: theme['color-basic-1000'],
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconStyle: {
            width: convertHeight(22),
            height: convertHeight(22),
            color: theme['color-basic-1000']
        },
        emergencyBtn: {
            height: convertHeight(55),
            backgroundColor: theme['color-basic-1000'],
            margin: convertHeight(20),
            borderRadius: convertHeight(100),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        emergencyIcnContainer: {
            height: convertHeight(45),
            width: convertHeight(45),
            borderRadius: convertHeight(40),
            backgroundColor: theme['color-basic-100'],
            marginRight: convertWidth(5),
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    const _renderItems = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Card shadow style={styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconContainer}>
                            <FontelloIcon name={item.icon} size={convertHeight(38)} style={{ color: theme['color-primary-200'] }} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text category="h4" style={{ color: theme['color-basic-1003'] }}>{I18n.t(item.title)}</Text>
                            <Text category="h5" style={{ color: theme['color-basic-1003'] }}>{item.number}</Text>
                        </View>
                    </View>
                </Card>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => tollFreeCall(item.number)} style={styles.callRoundContainer}>
                        <FontelloIcon name={'emergency-call'} size={convertHeight(38)} style={{ color: theme['color-basic-100'] }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const tollFreeCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    }

    return (
        <>
            <SafeAreaView>
                <Header title={I18n.t('emergency_contact')} />
                <View style={{ backgroundColor: theme['color-basic-1008'], flex: 1 }}>
                    <View style={styles.mainContainer}>
                        <FlatList
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={tollFreeNumber}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item) => _renderItems(item)} />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.emergencyBtn} onPress={() => { }}>
                        <Text style={{ color: theme['color-basic-100'], paddingLeft: convertWidth(30) }} category='h3'>{I18n.t('emergency_call')}</Text>
                        <View style={styles.emergencyIcnContainer}>
                            <FontelloIcon name={'emergency-call'} size={convertHeight(38)} style={{ color: theme['text-black-color'] }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

export default TollFreeNumberView;
