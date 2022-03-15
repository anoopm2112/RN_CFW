import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList,  Image, TouchableOpacity } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';

const { SafeAreaView, Card,Text, Icon } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const MyEventsListView = (props) => {
    const {
        loadMyEvents, myEvents: { data, refreshing }, userType: { assetIcons }
    } = props;
    const theme = useTheme();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadMyEvents();
        }
    }, [isFocused]);

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(15),
            flex: 1,
            backgroundColor: theme['color-basic-1008']
        },
        cardStyle: {
            marginVertical: convertHeight(5),
            borderRadius: convertHeight(4),
            backgroundColor: theme['color-basic-600']
        },
        viewStyle: {
            flexDirection: 'row',
            marginBottom: convertWidth(5),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgView: {
            justifyContent: 'center',
            alignItems: 'center',
            height: convertHeight(60),
            width: convertHeight(60),
            marginLeft: convertWidth(7)
        },
        titleText: {
            width: convertWidth(250),
            fontSize: convertHeight(14),
            color: theme['color-basic-1002'],
            paddingRight: convertWidth(15)
        },
        subTitleText: {
            width: convertWidth(160),
            fontSize: convertHeight(12),
            color: theme['color-basic-1002'],
            paddingRight: convertWidth(30)
        },
        image: {
            height: convertHeight(65),
            width: convertHeight(65),
            borderRadius: convertHeight(10),
            resizeMode: 'contain'
        },
        label: {
            color: theme['color-basic-1002'],
            fontSize: convertWidth(14),
            width: convertWidth(180),
        },
        buttonContainer: {
            padding: convertWidth(15),
            alignItems: 'center',
            justifyContent: 'center',
            height: convertHeight(40),
            borderRadius: convertWidth(10),
            backgroundColor: theme['color-basic-1006']
        },
        textStyle: {
            color: theme['color-basic-100'],
            fontWeight: 'bold',
            fontSize: convertWidth(16)
        },
        emptyList: {
            alignItems: 'center',
            paddingTop: convertHeight(10),
            color: theme['color-basic-1002']
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: convertWidth(15),
            width: convertWidth(280)
        }
    });

    const FlatListComponent = props => {
        const [isError, setError] = useState(false);
        const suffix = Math.floor(Math.random() * 100) + 1;
        const imageUrl = `${props.image}&time=${suffix}`;
        return (
            <Image source={isError ? assetIcons?.icons?.brokenImage : { uri: imageUrl }} style={styles.image} onError={(e) => setError(true)} />
        );
    }

    const renderItem = ({ item }) => {
        return (
            <Card shadow style={styles.cardStyle}>
                <TouchableOpacity
                    onPress={() => props.navigateToEventDetails({ data: item, screen: 'myEvents' })}
                    style={styles.viewStyle}>
                    <View style={styles.imgView}>
                        <FlatListComponent image={item.photoId} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text category="h4" numberOfLines={1} style={{ color: theme['color-basic-1003'] }}>{item.name}</Text>
                        <Text category="h5" style={{ color: theme['color-basic-1003'] }}>{item.eventType?.name}</Text>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    };
    const emptyList = () => (
        !refreshing ?
            <View style={styles.emptyList}>
                <Text category="h5" style={{ color: theme['color-basi-1002'] }}>{I18n.t('no_data_available')}</Text>
            </View> : <View />
    );
    return (
        <>
            <SafeAreaView>
                <View style={styles.mainContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        onRefresh={() => { loadMyEvents() }}
                        refreshing={refreshing}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={() => <View style={{ height: convertHeight(80) }} />}
                        ListEmptyComponent={emptyList}
                    />
                </View>
            </SafeAreaView>
        </>
    );
}

export default MyEventsListView;