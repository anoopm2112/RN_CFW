import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';

const { SafeAreaView, Card, FontelloIcon, Text, Header } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const ChildProtectionCategoryListView = (props) => {
    const { navigation } = props;
    const { data: { data, headerTitle } } = props.route.params;
    const theme = useTheme();

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(15),
            flex: 1,
            backgroundColor: theme['color-basic-1008']
        },
        cardStyle: {
            marginVertical: convertHeight(10),
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-1000']
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
            backgroundColor: theme['color-primary-600'],
            marginLeft: convertWidth(15),
            elevation: 15,
            borderRightWidth: 2,
            borderBottomWidth: 1,
            borderColor: theme['color-basic-1008']
        },
        titleText: {
            width: convertWidth(250),
            color: theme['color-basic-100'],
            paddingRight: convertWidth(15)
        },
        roundIcon: {
            width: convertWidth(45),
            height: convertWidth(45),
            borderRadius: convertWidth(45),
            alignItems: "center",
            justifyContent: 'center',
        },
        userIcon: {
            width: convertWidth(55),
            height: convertWidth(55),
            borderRadius: convertHeight(10)
        },
        emptyList: {
            alignItems: 'center',
            paddingTop: convertHeight(10)
        }
    });

    const renderItem = ({ item }) => {
        return (
            <Card shadow style={styles.cardStyle}>
                <TouchableOpacity onPress={() => props.loadCategoryDetails(item)} style={styles.viewStyle}>
                    <View style={styles.roundIcon}>
                        <FontelloIcon name={item.icon} size={convertHeight(35)} color={theme['color-basic-100']} />
                    </View>
                    <View style={{ marginLeft: convertWidth(10) }}>
                        <Text category="h5" numberOfLines={3} style={styles.titleText}>{item.label}</Text>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    };
    const emptyList = () => (
        !refreshing ?
            <View style={styles.emptyList}>
                <Text category="h5" style={{ color: theme['color-basic-1002'] }}>{I18n.t('no_data_available')}</Text>
            </View> : <View />
    );

    return (
        <>
            <SafeAreaView>
                <Header title={headerTitle} navigation={navigation} />
                <View style={styles.mainContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={emptyList} />
                </View>
            </SafeAreaView>
        </>
    );
}

export default ChildProtectionCategoryListView;