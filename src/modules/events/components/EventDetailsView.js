import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, BackHandler, Linking } from 'react-native';
import { components, utils, I18n, constants } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import Share from 'react-native-share';
import RBSheet from "react-native-raw-bottom-sheet";
import ViewShot, { captureRef } from 'react-native-view-shot';
import { EVENT_TYPE } from '../constants';

const { SafeAreaView, Card, Text, Content, Header, FontelloIcon, Input, Icon } = components;
const { dimensionUtils: { convertWidth, convertHeight }, dateUtils } = utils;
const { SHARE_ITEMS, SOCIAL_APP_ID } = constants;

const EventDetailsView = (props) => {
    const { registerEvent, cancelRegisterEvent, userType: { assetIcons }, eventShare } = props;
    const { data: { data, screen } } = props.route.params;
    const theme = useTheme();
    const [remark, setRemark] = useState();

    const RBSheetRef = useRef();
    const ShareAppRef = useRef();

    useEffect(() => {
        function handleBackButton() {
            props.navigateToEventsListScreen();
            return true;
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            backHandler.remove();
        }
    }, []);

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(13),
            paddingVertical: convertHeight(7),
            backgroundColor: theme['color-basic-1008'],
        },
        card: {
            marginVertical: convertHeight(10),
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-600'],
        },
        image: {
            width: convertWidth(400),
            height: convertHeight(400),
            resizeMode: "contain"
        },
        titleContainer: {
            padding: convertHeight(15),
            width: convertWidth(320),
        },
        card1: {
            marginVertical: convertHeight(10),
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-600'],
            flexDirection: 'row',
        },
        iconview: {
            alignItems: 'center',
            justifyContent: 'center',
            width: convertWidth(50),
            height: convertWidth(50),
            borderRadius: convertWidth(10),
            backgroundColor: theme['color-basic-1008']
        },
        detailView: {
            alignItems: 'center',
            flexDirection: 'row',
            width: convertWidth(320),
            padding: convertWidth(10),
        },
        bottomBtn: {
            width: '100%',
            height: convertWidth(50),
            backgroundColor: theme['color-basic-700'],
            position: 'absolute',
            bottom: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonContainer: {
            padding: convertWidth(15),
            alignItems: 'center',
            justifyContent: 'center',
            height: convertHeight(45),
            borderRadius: convertWidth(10),
            backgroundColor: theme['color-basic-1003']
        },
        textStyle: {
            color: theme['color-basic-1008'],
            fontWeight: 'bold'
        },
        label: {
            color: theme['color-basic-1002'],
            width: convertWidth(180),
        },
        btnCross: {
            justifyContent: 'center',
            alignItems: 'center',
            width: convertWidth(30),
            height: convertWidth(30),
            borderRadius: convertWidth(30)
        },
        closeBtnBSheet: {
            backgroundColor: theme['color-basic-100'],
            justifyContent: 'center',
            alignItems: 'center',
            width: convertWidth(30),
            height: convertWidth(30),
            borderRadius: convertWidth(30)
        },
        shareAppContainer: {
            height: convertHeight(102),
            width: convertWidth(102),
            backgroundColor: theme['color-basic-1004'],
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: convertHeight(10),
            marginRight: convertWidth(10)
        },
        shareAppIconContainer: {
            height: convertHeight(50),
            width: convertHeight(50),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50 / 2
        },
        linkView: {
            marginLeft: convertWidth(10),
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        platformText: {
            width: convertWidth(60),
            color: theme['color-basic-1003']
        },
        colonStyle: {
            paddingHorizontal: convertWidth(5),
            color: theme['color-basic-1003']
        },
        linkText: {
            width: convertWidth(150),
            color: theme['color-basic-1003']
        }
    });

    const shareContent = async (id) => {
        try {
            const shareOptions = {
                message: `${data.name} ${I18n.t('app_download_desc')} ${SHARE_ITEMS.APP_LINK}`
            }
            const snapshot = await captureRef(cardRefs.current, {
                result: 'data-uri',
            });
            shareOptions.url = snapshot
            if (id === SOCIAL_APP_ID.FACEBOOK) {
                shareOptions.social = Share.Social.FACEBOOK
            } else if (id === SOCIAL_APP_ID.WHATSAPP) {
                shareOptions.social = Share.Social.WHATSAPP
            } else if (id === SOCIAL_APP_ID.INSTAGRAM) {
                shareOptions.social = Share.Social.INSTAGRAM
            } else if (id === SOCIAL_APP_ID.LINKEDIN) {
                shareOptions.social = Share.Social.LINKEDIN
            } else if (id === SOCIAL_APP_ID.TWITTER) {
                shareOptions.social = Share.Social.TWITTER
            }
            const shareResponse = await Share.shareSingle(shareOptions);
            if (shareResponse.success) {
                eventShare({ eventId: data.id, appId: id })
            }
        } catch (error) {
            // NOOP
        }
    }

    const FlatListComponent = props => {
        const [isError, setError] = useState(false)
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMethod={"resize"} source={isError ? assetIcons.icons.brokenImage : { uri: props.image }} style={styles.image} onError={(e) => setError(true)} />
            </View>
        );
    }

    const cardRefs = useRef();

    return (
        <>
            <SafeAreaView>
                <Header title={I18n.t('events')} onBackPress={props.navigateToEventsListScreen} />
                <Content style={styles.mainContainer}>
                    <ViewShot style={{ flex: 1 }} options={{ format: 'jpg', quality: 1.0 }}
                        ref={ref => {
                            if (!ref) return;
                            cardRefs.current = ref;
                        }}>
                        {data.photoId === null ?
                            <Image style={styles.image} source={assetIcons?.icons?.brokenImage} />
                            :
                            <FlatListComponent image={data.photoId} />}
                    </ViewShot>
                    <Card shadow style={styles.card1}>
                        <TouchableOpacity onPress={() => ShareAppRef.current.open()} style={{ padding: convertWidth(15), flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text category="h5" style={{ width: convertWidth(200), color: theme['color-basic-1003'], paddingBottom: 10 }}>{data.name}</Text>
                            <FontelloIcon name="share-now-icon" size={convertWidth(22)} style={{ color: theme['color-basic-1002'] }} />
                        </TouchableOpacity>
                    </Card>
                    <Card shadow style={styles.card}>
                        <View style={styles.detailView}>
                            <View style={styles.iconview}>
                                <FontelloIcon name="calender" size={convertWidth(30)} style={{ color: theme['color-basic-1002'] }} />
                            </View>
                            <View style={{ marginHorizontal: convertWidth(10) }}>
                                <Text category="h5" style={{ width: convertWidth(200), color: theme['color-basic-1003'] }}>{dateUtils.convertToLocal(data.startTime)} - {dateUtils.convertToLocal(data.endTime)}</Text>
                            </View>
                        </View>
                        {
                            data.eventType?.name === EVENT_TYPE.OFFLINE &&
                            <View style={styles.detailView}>
                                <View style={styles.iconview}>
                                    <FontelloIcon name="location" size={convertWidth(30)} style={{ color: theme['color-basic-1002'] }} />
                                </View>
                                <View style={{ marginLeft: convertWidth(10) }} >
                                    <Text category="h5" style={{ width: convertWidth(200), color: theme['color-basic-1003'] }}>{data.location}</Text>
                                    <Text category="h5" style={{ width: convertWidth(200), color: theme['color-basic-1003'] }}>{data.district?.name}</Text>
                                </View>
                            </View>
                        }
                        {
                            data.eventType?.name === EVENT_TYPE.ONLINE &&
                            <View style={styles.detailView}>
                                <View style={styles.iconview}>
                                    <FontelloIcon name="location" size={convertWidth(30)} style={{ color: theme['color-basic-1002'] }} />
                                </View>
                                <View style={{}}>
                                    <View style={styles.linkView}>
                                        <Text category="h5" style={styles.platformText}>{I18n.t('platform')}</Text>
                                        <Text category="h5" style={styles.colonStyle}>:</Text>
                                        <Text category="h5" style={styles.linkText}>{data.onlinePlatform?.name}</Text>
                                    </View>
                                    <View style={styles.linkView}>
                                        <Text category="h5" style={{ paddingVertical: convertHeight(5), color: theme['color-basic-1003'], width: convertHeight(230) }} onPress={() => Linking.openURL(data.onlineMeetLink)}>{data.onlineMeetLink}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    </Card>
                    <View style={{ marginBottom: convertWidth(60) }}>
                        <Card shadow style={styles.card}>
                            <View style={styles.titleContainer}>
                                <Text category="h4" style={{ color: theme['color-basic-1003'], paddingBottom: 10 }}>{I18n.t('about')}</Text>
                                <Text category="h5" style={{ color: theme['color-basic-1003'], textAlign: 'justify' }}>{data.body}</Text>
                            </View>
                        </Card>
                    </View>
                </Content>
                {screen === 'upcomingEvents' && !data.isRegistered && <TouchableOpacity onPress={() => RBSheetRef.current.open()} style={styles.bottomBtn}>
                    <Text category="h4" style={{ color: theme['color-basic-1003'] }}>{I18n.t('register_event')}</Text>
                </TouchableOpacity>}
                {screen != 'upcomingEvents' && data.isRegistered && <TouchableOpacity onPress={() => RBSheetRef.current.open()} style={styles.bottomBtn}>
                    <Text category="h4" style={{ color: theme['color-basic-1003'] }}>{I18n.t('cancel_event')}</Text>
                </TouchableOpacity>}

                <RBSheet
                    ref={RBSheetRef}
                    height={convertHeight(280)}
                    openDuration={250}
                    customStyles={{ container: { backgroundColor: theme['color-basic-700'] } }}>
                    <View style={{ padding: convertWidth(15) }}>
                        <View style={{ alignItems: 'flex-end', }}>
                            <TouchableOpacity onPress={() => { RBSheetRef.current.close() }} style={styles.closeBtnBSheet}>
                                <FontelloIcon name='cross' size={convertWidth(28)} style={{ color: theme['color-basic-1006'] }} />
                            </TouchableOpacity>
                        </View>
                        <Text category="h3" style={{  color: theme['color-basic-1002'], }}>{I18n.t('register_event')}</Text>
                        <View style={{ marginTop: convertHeight(15) }}>
                            <Text category='h5' style={[styles.label, { marginBottom: convertWidth(15) }]} >{I18n.t('remarks')}</Text>
                            <Input
                                size='large'
                                onChangeText={(text) => setRemark(text)}
                                value={remark}
                                multiline={true}
                                placeholder={I18n.t('type_here')}
                                placeholderTextColor={theme['color-basic-1002']}
                                style={{ backgroundColor: theme['color-basic-1009'], borderColor: theme['color-basic-1009'] }}
                            />
                        </View>
                        <View style={{ marginBottom: convertWidth(20), marginTop: convertHeight(20) }}>
                            {screen === 'upcomingEvents' ?
                                <TouchableOpacity onPress={() => registerEvent({ eventId: data.id, remark: remark })} style={styles.buttonContainer}>
                                    <Text category="h4" style={styles.textStyle}>{I18n.t('register_event')}</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => cancelRegisterEvent({ eventId: data.id, remark: remark })} style={styles.buttonContainer}>
                                    <Text category="h4" style={styles.textStyle}>{I18n.t('cancel_event')}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </RBSheet>

                <RBSheet
                    ref={ShareAppRef}
                    height={convertHeight(295)}
                    openDuration={250}
                    customStyles={{ container: { backgroundColor: theme['color-basic-700'] } }}>

                    <View style={{ padding: convertWidth(15) }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 9 }}>
                            <Text category="h3" style={{ color: theme['color-basic-1002'], }}>{I18n.t('share_to')}</Text>
                            <TouchableOpacity onPress={() => { ShareAppRef.current.close() }}>
                                <FontelloIcon name='cross' size={convertWidth(28)} style={{ color: theme['color-basic-1006'] }} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => shareContent(SOCIAL_APP_ID.WHATSAPP)} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#128C7E' }]}>
                                        <Icon pack="material-community" name={'whatsapp'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text category="h5" style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('whatsapp')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => shareContent(SOCIAL_APP_ID.FACEBOOK)} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#4C69BA' }]}>
                                        <Icon pack="material-community" name={'facebook'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text category="h5" style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('facebook')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => shareContent(SOCIAL_APP_ID.INSTAGRAM)} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#FF0099' }]}>
                                        <Icon pack="material-community" name={'instagram'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text category="h5" style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('instagram')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => shareContent(SOCIAL_APP_ID.TWITTER)} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#1DA1F2' }]}>
                                        <Icon pack="material-community" name={'twitter'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text category="h5" style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('twitter')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => shareContent(SOCIAL_APP_ID.LINKEDIN)} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#0e76a8' }]}>
                                        <Icon pack="material-community" name={'linkedin'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text category="h5" style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('linkedin')}</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </RBSheet>
            </SafeAreaView>
        </>
    );
}

export default EventDetailsView;