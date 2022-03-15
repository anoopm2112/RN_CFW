import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';

const { SafeAreaView, Card, Icon, Text, Header, FontelloIcon } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const ChildProtectionSystemListView = (props) => {
    const { navigation } = props;
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
        titleText: {
            width: convertWidth(250),
            color: theme['color-basic-100'],
            paddingRight: convertWidth(15)
        },
        roundIcon: {
            width: convertWidth(45),
            height: convertWidth(45),
            alignItems: "center",
            justifyContent: 'center',
        },
        emptyList: {
            alignItems: 'center',
            paddingTop: convertHeight(10)
        }
    });

    const renderItem = ({ item }) => {
        return (
            <Card shadow style={styles.cardStyle}>
                <TouchableOpacity onPress={() => props.loadChildProtectionCategory({ id: item.id, title: item.title })} style={styles.viewStyle}>
                    <View style={styles.roundIcon}>
                        <FontelloIcon name={item.icon} size={convertHeight(35)} color={theme['color-basic-100']} />
                    </View>
                    <View style={{ marginLeft: convertWidth(10) }}>
                        <Text category="h5" numberOfLines={3} style={styles.titleText}>{item.title}</Text>
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

    const data = [
        {
            'id': 1,
            'title': I18n.t('statutory_bodies'),
            'icon': 'statutory_bodies'
        },
        {
            'id': 2,
            'title': I18n.t('district_child_protection_unit'),
            'icon': 'service_mechanism'
        },
        {
            'id': 3,
            'title': I18n.t('child_care'),
            'icon': 'child_care'
        }
    ]

    return (
        <>
            <SafeAreaView>
                <Header title={I18n.t('child_protection_systems')} navigation={navigation} />
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

export default ChildProtectionSystemListView;