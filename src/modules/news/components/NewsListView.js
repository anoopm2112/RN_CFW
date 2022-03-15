import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';

const { SafeAreaView, Card, Text, Header, Icon } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const NewsListView = (props) => {
    const {
        navigation, navigateToNewsDetailsScreen, loadNewsList,
        newsList: { data, refreshing }, userType: { assetIcons }
    } = props;

    const theme = useTheme();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadNewsList();
        }
    }, [isFocused]);

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(15),
            flex: 1,
            backgroundColor: theme['color-basic-1008']
        },
        emptyList: {
            alignItems: 'center',
            paddingTop: convertHeight(10)
        },
        card: {
            marginVertical: convertHeight(7),
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-600'],
            padding: convertHeight(7)
        },
        image: {
            paddingVertical: convertHeight(3),
            height: convertHeight(65),
            width: convertHeight(65),
            resizeMode: 'contain'
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: convertWidth(15)
        }
    });

    const ImageComponent = props => {
        const [isError, setError] = useState(false);
        const suffix = Math.floor(Math.random() * 100) + 1 ;
        const imageUrl = `${props.image}&time=${suffix}`;
        return (
            <Image source={isError ? assetIcons?.icons?.brokenImage : { uri: imageUrl }} style={styles.image} onError={(e) => setError(true)} />
        );
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateToNewsDetailsScreen(item)} activeOpacity={0.9}>
                <Card shadow style={styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        {item.photoId === null ?
                            <Image style={styles.image} source={assetIcons?.icons?.brokenImage} />
                            :
                            <ImageComponent image={item.photoId} />}
                        <View style={styles.titleContainer}>
                            <Text category="h4" numberOfLines={1} style={{ color: theme['color-basic-1003'] }}>{item.name}</Text>
                            <Text category="h5" style={{ color: theme['color-basic-1003'] }}>{item.author}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }

    const emptyList = () => (
        !refreshing ?
            <View style={styles.emptyList}>
                <Text category="h5" style={{ color: theme['color-basic-1002'] }}>{I18n.t('no_data_available')}</Text>
            </View> : <View />
    );

    return (
        <>
            <SafeAreaView>
                <Header title={I18n.t('news')} navigation={navigation} />
                <View style={styles.mainContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        onRefresh={() => { loadNewsList() }}
                        refreshing={refreshing}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={() => <View style={{ height: convertHeight(80) }} />}
                        ListEmptyComponent={emptyList} />
                </View>
            </SafeAreaView>
        </>
    );
}

export default NewsListView;