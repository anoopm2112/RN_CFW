import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from '@react-navigation/native';

const { SafeAreaView, FontelloIcon, Input, Card, Icon, Text, FloatingAction } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const MyServicesView = (props) => {
    const {
        loadMyService, myServices: { data, refreshing }, unSubscribeServices
    } = props;
    const theme = useTheme();
    const isFocused = useIsFocused();
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (isFocused) {
            loadMyService();
        }
    }, [isFocused]);

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
            height: convertHeight(60),
            width: convertHeight(60),
            borderRadius: convertHeight(5),
            marginLeft: convertWidth(30)
        },
        titleText: {
            width: convertWidth(250),
            fontSize: convertHeight(14),
            color: theme['color-basic-1002'],
            paddingRight: convertWidth(15)
        },
        subTitleText: {
            width: convertWidth(200),
            fontSize: convertHeight(12),
            color: theme['color-basic-1002'],
            paddingRight: convertWidth(30)
        },
        image: {
            height: convertHeight(65),
            width: convertWidth(70),
            borderRadius: convertHeight(10)
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
            height: convertHeight(45),
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
        closeBtnBSheet: {
            backgroundColor: theme['color-basic-100'],
            justifyContent: 'center',
            alignItems: 'center',
            width: convertWidth(30),
            height: convertWidth(30),
            borderRadius: convertWidth(30)
        }
    });
    const RBSheetRef = useRef([]);

    const renderItem = ({ item, index }) => {
        return (
            <Card shadow style={styles.cardStyle}>
                <TouchableOpacity onPress={() => RBSheetRef.current[item.topicId].open()} style={styles.viewStyle}>
                    <View style={styles.imgView}>
                        {item.icon != null ?
                            <Image source={{ uri: `data:image/*;base64,${item.icon}` }} style={styles.image} />
                            :
                            <Icon pack="material-community" name={'image'} style={{ height: convertHeight(65), color: theme['color-primary-200'] }} />}
                    </View>
                    <View style={{ marginLeft: convertWidth(15) }}>
                        <Text style={styles.titleText}>{item.title}</Text>
                    </View>
                </TouchableOpacity>

                <RBSheet
                    ref={ref => {
                        if (!ref) return;
                        RBSheetRef.current[item.topicId] = ref;
                    }}
                    height={convertHeight(280)}
                    openDuration={250}
                    customStyles={{ container: { backgroundColor: theme['color-basic-700'] } }}>
                    <View style={{ padding: convertWidth(15) }}>
                        <View style={{ alignItems: 'flex-end', }}>
                            <TouchableOpacity onPress={() => { RBSheetRef.current[item.topicId].close() }} style={styles.closeBtnBSheet}>
                                <FontelloIcon name='cross' size={convertWidth(28)} style={{ color: theme['color-basic-1006'] }} />
                            </TouchableOpacity>
                        </View>
                        <Text category="h3" style={{ color: theme['color-basic-1002'], }}>{I18n.t('request_service')}</Text>
                        <View style={{ marginTop: convertHeight(15) }}>
                            <Text category='h5' style={[styles.label, { marginBottom: convertHeight(15) }]} >{I18n.t('remarks')}</Text>
                            <Input
                                size='large'
                                onChangeText={(text) => setRemarks(text)}
                                value={remarks}
                                multiline={true}
                                placeholder={I18n.t('type_here')}
                                placeholderTextColor={theme['color-basic-1002']}
                                style={{ backgroundColor: theme['color-basic-1009'], borderColor: theme['color-basic-1009'] }}
                            />
                        </View>
                        <View style={{ marginBottom: convertWidth(20), marginTop: convertHeight(20) }}>
                            <TouchableOpacity onPress={() => {
                                RBSheetRef.current[item.topicId].close()
                                unSubscribeServices({ remarks: remarks, serviceId: item.topicId })
                            }} style={styles.buttonContainer}>
                                <Text category="h5" style={styles.textStyle}>{I18n.t('unsubscribe')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
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
                <View style={styles.mainContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        onRefresh={() => { loadMyService() }}
                        refreshing={refreshing}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={() => <View style={{ height: convertHeight(80) }} />}
                        ListEmptyComponent={emptyList} />
                    <FloatingAction color={theme['color-basic-800']} />
                </View>
            </SafeAreaView>
        </>
    );
}

export default MyServicesView;