import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Image } from 'react-native';
import { components, I18n, utils } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import _ from 'lodash';
import { useIsFocused } from '@react-navigation/native';

const { SafeAreaView, Text, CustomIcon, Header, Icon, OverflowMenu, MenuItem, CheckBox, Card } = components;
const { window, dimensionUtils: { convertWidth, convertHeight }, dateUtils } = utils;

const NotificationView = (props) => {
    const [switchBtnChange, setSwitchBtnChange] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [visible, setVisible] = useState(false);
    const [checkSelected, setCheckSelected] = useState(false);
    const { notificationData: { data, refreshing }, navigation } = props;
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            props.loadNotification({ reset: true });
        }
    }, [isFocused]);

      
    const onItemSelect = (index) => {
        setSelectedIndex(index);
        setVisible(false);
    };

    const renderToggleButton = () => (
        <TouchableOpacity style={styles.notificationMenuIcon} activeOpacity={0.5} onPress={() => setVisible(true)}>
            <Icon style={{ height: convertHeight(22.22), color: theme['color-basic-1003'] }} name="dots-vertical" pack="material-community" />
        </TouchableOpacity>
    );

    const renderCheckboxButton = () => (
        <CheckBox checked={switchBtnChange} onChange={(checked) => { setSwitchBtnChange(checked) }} />
    );

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => {
            let data = JSON.parse(item.additionalData);
            props.readNotification({ notificationId: [item.notificationId], additionalData: data })
        }}
            style={{ marginHorizontal: convertWidth(10), marginVertical: convertHeight(3) }} activeOpacity={0.9}>

            <Card shadow style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                    <View style={styles.titleContainer}>
                        <Text category="h5" style={{ color: theme['color-basic-1003'] }}>{item.header}</Text>
                        <Text category="h5" style={{lineHeight:convertWidth(20), color: theme['color-basic-1003'] }}>{item.message}</Text>
                    </View>
                </View>
                {!item.read && <View style={styles.notifyRound} />}
            </Card>
            <Text category="h5" style={{ textAlign: 'right', color: theme['color-basic-1003'] }}>{dateUtils.convertToLocal(item.createdAt)}</Text>

        </TouchableOpacity>
    );

    const _emptyList = () => (
        !refreshing ?
            <View style={{ height: (window.height - window.height / 3), alignItems: 'center', justifyContent: 'center' }}>
                <Text category="s1" style={{ color: theme['color-basic-1002'] }}>{I18n.t('no_notification_available')}</Text>
                <CustomIcon fill={theme['color-basic-1002']} name="bell-off" />
            </View> : <View />
    );

    const theme = useTheme();

    const styles = StyleSheet.create({
        mainContainer: {
            paddingTop: convertHeight(7),
            flex: 1
        },
        readAllMsg: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: convertWidth(7),
            paddingTop: convertHeight(7)
        },
        notificationMenuIcon: {
            width: convertWidth(30),
            height: convertWidth(30),
            borderRadius: convertWidth(30),
            justifyContent: 'center',
            alignItems: 'center'
        },
        notificationSubHeading: {
            paddingLeft: convertHeight(9),
            paddingTop: convertHeight(7),
            color: theme['color-basic-1003']
        },
        card: {
            marginVertical: convertHeight(7),
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-600'],
            padding: convertHeight(7)
        },
        image: {
            height: convertHeight(65),
            width: convertWidth(70),
            borderRadius: convertHeight(10)
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: convertWidth(12)
        },
        notifyRound: {
            width: convertWidth(20),
            height: convertWidth(20),
            borderRadius: convertWidth(20),
            backgroundColor: theme['color-basic-1003'],
            position: 'absolute',
            right: 0,
            top: convertWidth(-7)
        }
    });

    const readAllMsg = () => {
        let idArr = [];
        data.map(obj => {
            if (!obj.read) { idArr.push(obj.notificationId) };
        });
        props.readNotification({ notificationId: idArr });
        props.loadNotification({ reset: true });
        setVisible(false);
    }

    const showUnread = () => {
        props.filterUnreadNotifications(switchBtnChange);
    }

    const onEndReached = () => { props.loadNotification({ reset: false }); };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme['color-basic-1008'] }}>
                <Header title={I18n.t('notifications')} accessoryRight={() => (<Text></Text>)} />
                {!_.isEmpty(data) &&
                    <View style={styles.readAllMsg}>
                        <View style={{ flexDirection: 'row', paddingLeft: convertWidth(5), width: convertWidth(160) }}>
                            <Text category="h5" style={styles.notificationSubHeading} numberOfLines={3}>{I18n.t('notifications')} ( {data.length} )</Text>
                        </View>
                        <OverflowMenu
                            style={{ width: convertWidth(200) }}
                            anchor={renderToggleButton}
                            visible={visible}
                            selectedIndex={selectedIndex}
                            onSelect={onItemSelect}
                            onBackdropPress={() => setVisible(false)}>
                            <MenuItem onPress={() => readAllMsg()} title={I18n.t('read_all_msg')} />
                            {/* <MenuItem accessoryRight={renderCheckboxButton} title={I18n.t('only_show_unread')} /> */}
                        </OverflowMenu>
                    </View>}
                <View style={styles.mainContainer}>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item) => item.notificationId.toString()}
                        onRefresh={() => props.loadNotification({ reset: true })}
                        refreshing={refreshing}
                        ListEmptyComponent={_emptyList}
                        onEndReached={() => onEndReached()}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

export default NotificationView;
