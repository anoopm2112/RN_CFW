import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import DashboardHeader from '../../dashboard/components/DashboardHeader';
import { ROLE_TYPES } from '../../../common/constants';

const { SafeAreaView, FloatingAction, Card, Icon } = components;
const { userUtils, dimensionUtils: { convertWidth, convertHeight } } = utils;

const ServiceTypeView = (props) => {
    const { navigation, userType } = props;
    const theme = useTheme();
    const isFocuesd = useIsFocused();
    const data = [
        // {
        //     id: 1,
        //     name: I18n.t("subscription"),
        //     icon: '',
        //     onPress: !userUtils.hasChildRole(props.userInfo) && userType.roleType === ROLE_TYPES.ROLE_CHILD ? props.showInfoToast : props.navigateToServicesListScreen
        // },
        // {
        //     id: 2,
        //     name: I18n.t("balanidhi"),
        //     icon: 'https://rozgarpatrika.com/wp-content/uploads/2019/07/icds-logo.jpg',
        //     onPress: () => props.navigateToBalanidhiViewScreen()
        // },
    ]
    useEffect(() => {
        function handleBackButton() {
            props.navigateToDashboardSummary();
            return true;
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            backHandler.remove();
        }
    }, []);

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(15),
            flex: 1,
            backgroundColor: theme['color-basic-1008']
        },
        cardStyle: {
            marginVertical: convertHeight(10),
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-600']
        },
        viewStyle: {
            padding: convertHeight(8),
            flexDirection: 'row',
            marginBottom: convertWidth(5),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgView: {
            justifyContent: 'center',
            alignItems: 'center',
            height: convertHeight(65),
            width: convertHeight(65),
            borderRadius: convertHeight(10),
            marginLeft: convertWidth(15),
            borderRightWidth: 3,
            borderWidth: 1.5,
            borderColor: theme['color-basic-1008']
        },
        titleText: {
            width: convertWidth(250),
            fontSize: convertHeight(14),
            color: theme['color-basic-1002'],
            paddingRight: convertWidth(15)
        },
        roundIcon: {
            width: convertWidth(45),
            height: convertWidth(45),
            borderRadius: convertWidth(45),
            borderWidth: 3,
            borderColor: theme['color-primary-200'],
            alignItems: "center",
            justifyContent: 'center',
        },
        userIcon: {
            width: convertWidth(45),
            height: convertWidth(45),
            borderRadius: convertWidth(45 / 2)
        },
    });

    const renderItem = ({ item }) => {
        return (
            <Card shadow style={styles.cardStyle}>
                <TouchableOpacity onPress={() => { item.onPress !== '' ? item.onPress() : '' }} style={styles.viewStyle}>
                    <View style={styles.imgView}>
                        {item.icon ?
                            <Image resizeMode="contain" source={{ uri: item.icon }} style={styles.userIcon} /> :
                            <View style={styles.roundIcon}>
                                <Icon pack="material-community" name={'image'} style={{ height: convertHeight(35), color: theme['color-primary-200'] }} />
                            </View>
                        }
                    </View>
                    <View style={{ marginLeft: convertWidth(10) }}>
                        <Text style={styles.titleText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    };
    return (
        <>
            <SafeAreaView>
                <DashboardHeader title={I18n.t('service')} navigation={navigation} />
                <View style={styles.mainContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        // onRefresh={() => { }}
                        // refreshing={refreshing}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={() => <View style={{ height: convertHeight(80) }} />}
                    // ListEmptyComponent={emptyList}
                    />
                    <FloatingAction color={theme['color-basic-800']} />
                </View>
            </SafeAreaView>
        </>
    );
}

export default ServiceTypeView;