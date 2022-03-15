import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { components, I18n, utils } from '../../../common';
import DashboardHeader from './DashboardHeader';

const { SafeAreaView, StyleService, useStyleSheet, Text, Modal } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;

const CustomerSummaryView = (props) => {
    let { navigation } = props;
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();
    const dashboardItems = [];
    dashboardItems.push({ id: 1 });

    const _renderItems = ({ item, index }) => {
        return (
            <Text>Customer Summary</Text>
        )
    }
    return (
        <>
            <SafeAreaView>
                <DashboardHeader navigation={navigation} />
                <View style={styles.flatListContainer}>
                    <FlatList
                        numColumns={2}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={dashboardItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(item) => _renderItems(item)} />
                </View>
            </SafeAreaView>
        </>
    );
}

const themedStyles = StyleService.create({
    mainContainer: {
        backgroundColor: '#F7F9FC',
        bottom: 0
    },
    flatListContainer: {
        position: 'absolute',
        bottom: convertWidth(10),
        height: convertHeight(570),
        justifyContent: 'center',
        alignItems: 'center',
        padding: convertWidth(12)
    },
    label: {
        color: 'text-black-color',
        padding: convertWidth(10),
        fontSize: convertWidth(12),
        textAlign: 'center'
    },
    preview: {
        alignSelf: 'center',
        height: convertHeight(400),
        width: '100%',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    preview1: {
        alignSelf: 'center',
        height: convertHeight(380),
        width: '100%',
        alignItems: 'center',
    },
    viewContainer: {
        padding: convertWidth(20),
        width: '100%',
        marginTop: convertWidth(13)
    },
    card: {
        alignSelf: 'stretch',
        height: convertHeight(140),
        width: convertWidth(140),
        margin: convertWidth(13),
        borderRadius: convertWidth(15),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3

    },
    iconStyle: {
        width: convertWidth(40),
        height: convertHeight(40)
    }
});

export default CustomerSummaryView;
