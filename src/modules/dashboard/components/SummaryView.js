import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import SeeMore from 'react-native-see-more-inline';
import StarRating from 'react-native-star-rating';
import DashboardHeader from './DashboardHeader';
import { components, I18n, utils, constants } from '../../../common';
import YoutubePlayer from "react-native-youtube-iframe";
import RBSheet from "react-native-raw-bottom-sheet";
import _ from "lodash";
import YouTubePlayer from "react-native-youtube-sdk";
import { ROLE_TYPES } from '../../../common/constants';
import PlayButtonIcon from 'react-native-vector-icons/FontAwesome';

const { SafeAreaView, Text, FontelloIcon, Card, FloatingAction, Button, Modal, Icon } = components;
const { dimensionUtils: { convertWidth, convertHeight }, userUtils } = utils;
const { SHARE_ITEMS, VALIDATION_RULES, SOCIAL_APP_ID } = constants;

const SummaryView = (props) => {
    const {
        navigation, homeFeed: { data, refreshing }, loadHomeFeed, likePost, ratePost, appShare,
        userType, userInfo, showInfoToast, getService, allServices: { allSubscriptionData }
    } = props;
    const { assetIcons } = userType;
    const theme = useTheme();
    const isFocused = useIsFocused();
    const [exitApp, setExitApp] = useState(false);
    const [callBackRefersh, setCallBackRefersh] = useState(false);
    const [subscriptionCard, setSubscriptionCard] = useState();

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme['color-basic-1008']
        },
        emptyList: {
            alignItems: 'center',
            paddingTop: convertHeight(10)
        },
        loginButton: {
            width: convertWidth(310),
            backgroundColor: theme['color-basic-800']
        },
        bottomSheetElementContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
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
        image: {
            height: convertHeight(400),
            width: convertWidth(400),
            resizeMode: "contain"
        },
        playIconContainer: {
            zIndex: 1,
            position: 'absolute',
            alignSelf: 'center',
            top: convertHeight(77)
        },
        subscriptionIconContainer: {
            height: convertHeight(60),
            width: convertHeight(60),
            marginLeft: convertWidth(10),
            borderRadius: convertWidth(5),
            justifyContent: 'center',
            alignItems: 'center',
        },
        subscriptionImage: {
            height: convertHeight(30),
            width: convertWidth(30),
        },
        titleText: {
            fontSize: convertHeight(14),
            textAlign: 'center',
            width: convertWidth(55),
            color: theme['color-basic-1002']
        },
        textContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: convertHeight(60),
            marginLeft: convertWidth(10),
            marginTop: convertHeight(4),
        }
    });

    useEffect(() => {
        if (isFocused) {
            loadHomeFeed({ reset: true });
            setCallBackRefersh(true)
            getService();
        }
    }, [isFocused]);

    useEffect(() => {
        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
            };
        }
    }, [isFocused]);

    const backButtonHandler = () => {
        setExitApp(true);
        return true;
    }

    const emptyList = () => (
        !refreshing ?
            <View style={styles.emptyList}>
                <Text category="h5" style={{ color: theme['color-basic-1002'] }}>{I18n.t('no_data_available')}</Text>
            </View> : <View />
    );

    const cardRefs = useRef([]);
    const RBSheetRef = useRef([]);
    const ShareAppRef = useRef([]);
    const youtubeRefs = useRef([]);

    const FlatListComponent = props => {
        const [isError, setError] = useState(false);
        const suffix = Math.floor(Math.random() * 100) + 1;
        const imageUrl = `${props.image}&time=${suffix}`;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={isError ? assetIcons?.icons?.brokenImage : { uri: imageUrl }} style={styles.image} resizeMethod={"resize"} onError={(e) => setError(true)} />
            </View>
        );
    }

    const onRefresh = () => { loadHomeFeed({ reset: true }); }
    const onEndReached = () => { loadHomeFeed({ reset: false }); };

    const SocialPostBody = React.memo(({ item, index }) => {
        const [fullscreen, setFullscreen] = useState(false);
        var match = item.video_link?.match(VALIDATION_RULES.YOUTUBE_REG_EXP);
        var videoId = (match && match[7].length == 11) ? match[7] : null;
        return (
            <>
                {item.type === 'image' ?
                    <FlatListComponent image={item.image} />
                    :
                    <View>
                        {!fullscreen ?
                            <TouchableOpacity onPress={() => { setFullscreen(true) }}>
                                <Image source={{ uri: `${'https://img.youtube.com/vi/'}${videoId}${'/hqdefault.jpg'}` }} style={{ width: '100%', height: 215 }} />
                                <PlayButtonIcon name="youtube-play" size={convertHeight(70)} color={'#404040'} style={styles.playIconContainer} />
                            </TouchableOpacity>
                            :
                            <YouTubePlayer
                                key={item.id}
                                ref={ref => {
                                    if (!ref) return;
                                    youtubeRefs.current[item.id] = ref;
                                }}
                                autoPlay={true}
                                videoId={videoId}
                                fullscreen={true}
                                showFullScreenButton={true}
                                showSeekBar={true}
                                showPlayPauseButton={true}
                                startTime={0}
                                style={{ width: "100%", height: convertHeight(215) }}
                                onError={e => console.log(e)}
                                onChangeState={e => console.log(e)}
                                onChangeFullscreen={e => {
                                    !e.isFullscreen ?
                                        youtubeRefs.current[item.id].pause()
                                        :
                                        youtubeRefs.current[item.id].play()
                                    setFullscreen(e.isFullscreen)
                                }}
                                onReady={e => {
                                    !fullscreen ?
                                        youtubeRefs.current[item.id].pause()
                                        :
                                        youtubeRefs.current[item.id].play()
                                }}
                            />}
                    </View>
                }
                <View style={{ padding: convertHeight(7) }}>
                    <Text category='h5' style={{ color: theme['color-basic-1003'] }}>{item.label}</Text>
                    <View>
                        {item.desc != null && <SeeMore numberOfLines={2} linkColor={theme['color-basic-1003']} style={{ fontSize: convertHeight(14), color: theme['color-basic-1003'] }} >{item.desc}</SeeMore>}
                    </View>
                </View>
            </>
        )
    });

    const SocialPostFooter = useCallback((props) => {
        const [postLikeStatus, setPostLikeStatus] = useState(props.item.liked);
        const [postCount, setPostCount] = useState(props.item.like);
        const [ratingCount, setRatingCount] = useState(props.item.ratingCount);
        const [rating, setRating] = useState(props.item.rating);
        const [shareCount, setShareCount] = useState(props.item.shareCount);

        const [starCount, setStarCount] = useState(props.item.rating);

        const socialLike = () => {
            setPostLikeStatus(!postLikeStatus);
            if (postLikeStatus) { setPostCount(postCount - 1) }
            else { setPostCount(postCount + 1) }
            likePost(props.item.id);
        }

        const calculateRating = () => {
            let total = props.item.rating * props.item.ratingCount; // get Total
            let rating, userRatingCount;
            if (props.item.userCurrentRating === 0 && props.item.ratingCount === 0) {
                // User Rating for first time
                rating = starCount;
                userRatingCount = props.item.ratingCount + 1;
            } else if (props.item.userCurrentRating === 0 && props.item.ratingCount > 0) {
                // User Rating other users rate post for first time 
                rating = (total + starCount) / (props.item.ratingCount + 1);
                userRatingCount = props.item.ratingCount + 1;
            } else if (props.item.userCurrentRating != 0) {
                // User rating same post for second time
                rating = (total - props.item.userCurrentRating + starCount) / props.item.ratingCount;
                userRatingCount = props.item.ratingCount;
            }
            setRating(parseFloat(rating.toFixed(1)));
            setRatingCount(userRatingCount);
            ratePost({ postId: props.item.id, starCount });
            RBSheetRef.current[props.item.id].close()
        }

        const captureSnapShot = async ({ item, appId }) => {
            try {
                const shareOptions = {
                    message: `${item.desc} ${I18n.t('app_download_desc')} ${SHARE_ITEMS.APP_LINK}`
                }
                if (appId === SOCIAL_APP_ID.FACEBOOK) {
                    shareOptions.social = Share.Social.FACEBOOK
                } else if (appId === SOCIAL_APP_ID.WHATSAPP) {
                    shareOptions.social = Share.Social.WHATSAPP
                } else if (appId === SOCIAL_APP_ID.INSTAGRAM) {
                    shareOptions.social = Share.Social.INSTAGRAM
                } else if (appId === SOCIAL_APP_ID.LINKEDIN) {
                    shareOptions.social = Share.Social.LINKEDIN
                } else if (appId === SOCIAL_APP_ID.TWITTER) {
                    shareOptions.social = Share.Social.TWITTER
                }
                if (item.type === 'video') {
                    shareOptions.url = `${I18n.t('app_youtube_link')} ${item.video_link}`
                } else {
                    if (cardRefs.current[item.id]) {
                        const snapshot = await captureRef(cardRefs.current[item.id], {
                            result: 'data-uri',
                        });
                        shareOptions.url = snapshot
                    }
                }
                const shareResponse = await Share.shareSingle(shareOptions);
                if (shareResponse.success) {
                    setShareCount(shareCount + 1)
                    appShare({ postId: item.id, appId: appId })
                }
            } catch (error) {
                // NOOP
            }
        }

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: convertHeight(10), marginTop: convertHeight(4) }}>
                <TouchableOpacity onPress={() => {
                    if (!userUtils.hasChildRole(userInfo) && userType.roleType === ROLE_TYPES.ROLE_CHILD) {
                        showInfoToast();
                    } else {
                        socialLike();
                    }
                }} style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: convertWidth(12), color: theme['color-basic-1002'], paddingRight: 5 }}> {postCount} {I18n.t('likes')}</Text>
                    <FontelloIcon name="like-now-icon" size={convertWidth(14)} style={{ color: postLikeStatus ? theme['color-basic-1002'] : theme['color-basic-1007'] }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (!userUtils.hasChildRole(userInfo) && userType.roleType === ROLE_TYPES.ROLE_CHILD) {
                            showInfoToast();
                        } else {
                            RBSheetRef.current[props.item.id].open()
                        }
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 5 }}>
                        <Text style={{ fontSize: convertHeight(12), paddingRight: convertWidth(3), color: theme['color-basic-1002'] }}>{rating}</Text>
                        <StarRating
                            disabled
                            halfStarEnabled
                            maxStars={5}
                            rating={rating}
                            starSize={convertHeight(12)}
                            halfStarEnabled
                            starStyle={{ paddingHorizontal: convertWidth(2) }}
                            halfStarColor={theme['color-basic-1001']}
                            fullStarColor={theme['color-basic-1001']}
                            halfStar={'star-half-o'}
                            emptyStarColor={theme['color-basic-1001']} />
                    </View>
                    <Text style={{ fontSize: convertHeight(12), color: theme['color-basic-1002'] }}>({ratingCount})</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    if (!userUtils.hasChildRole(userInfo) && userType.roleType === ROLE_TYPES.ROLE_CHILD) {
                        showInfoToast();
                    } else {
                        ShareAppRef.current[props.item.id].open()
                    }
                }} style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: convertHeight(12), paddingRight: convertWidth(5), color: theme['color-basic-1002'] }}>{shareCount} {I18n.t('share')}</Text>
                        <FontelloIcon name="share-now-icon" size={convertWidth(14)} style={{ color: theme['color-basic-1007'] }} />
                    </View>
                </TouchableOpacity>

                <RBSheet
                    ref={ref => {
                        if (!ref) return;
                        RBSheetRef.current[props.item.id] = ref;
                    }}
                    height={convertHeight(250)}
                    openDuration={250}
                    customStyles={{ container: { justifyContent: "center", alignItems: "center", backgroundColor: theme['color-basic-700'] } }}>
                    <View style={[styles.bottomSheetElementContainer, { paddingHorizontal: convertWidth(40) }]}>
                        <Text category="h3" style={{ textAlign: 'center', color: theme['color-basic-1003'] }}>{I18n.t('rate_content')}</Text>
                    </View>
                    <View style={styles.bottomSheetElementContainer}>
                        <StarRating
                            starStyle={{ padding: convertWidth(10) }}
                            disabled={false}
                            maxStars={5}
                            rating={starCount}
                            starSize={convertHeight(44)}
                            selectedStar={(rating) => setStarCount(rating)}
                            animation={'flash'}
                            fullStarColor={theme['color-basic-1004']}
                            emptyStarColor={theme['color-basic-1003']}
                            emptyStar={'star'}
                        />
                    </View>
                    <View style={styles.bottomSheetElementContainer}>
                        <Button style={styles.loginButton} appearance='filled' size='large'
                            onPress={() => { calculateRating() }}>
                            <Text appearance='alternative' category='h3'>{I18n.t('submit')}</Text>
                        </Button>
                    </View>
                </RBSheet>

                <RBSheet
                    ref={ref => {
                        if (!ref) return;
                        ShareAppRef.current[props.item.id] = ref;
                    }}
                    height={convertHeight(295)}
                    openDuration={250}
                    customStyles={{ container: { backgroundColor: theme['color-basic-700'] } }}>

                    <View style={{ padding: convertWidth(15) }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 9 }}>
                            <Text category="h3" style={{ color: theme['color-basic-1002'], }}>{I18n.t('share_to')}</Text>
                            <TouchableOpacity onPress={() => { ShareAppRef.current[props.item.id].close() }}>
                                <FontelloIcon name='cross' size={convertWidth(28)} style={{ color: theme['color-basic-1006'] }} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => captureSnapShot({ item: props.item, appId: SOCIAL_APP_ID.WHATSAPP })} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#128C7E' }]}>
                                        <Icon pack="material-community" name={'whatsapp'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('whatsapp')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => captureSnapShot({ item: props.item, appId: SOCIAL_APP_ID.FACEBOOK })} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#4C69BA' }]}>
                                        <Icon pack="material-community" name={'facebook'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('facebook')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => captureSnapShot({ item: props.item, appId: SOCIAL_APP_ID.INSTAGRAM })} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#FF0099' }]}>
                                        <Icon pack="material-community" name={'instagram'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('instagram')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => captureSnapShot({ item: props.item, appId: SOCIAL_APP_ID.TWITTER })} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#1DA1F2' }]}>
                                        <Icon pack="material-community" name={'twitter'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('twitter')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => captureSnapShot({ item: props.item, appId: SOCIAL_APP_ID.LINKEDIN })} style={styles.shareAppContainer}>
                                    <View style={[styles.shareAppIconContainer, { backgroundColor: '#0e76a8' }]}>
                                        <Icon pack="material-community" name={'linkedin'} style={{ height: convertHeight(40), color: theme['color-basic-100'] }} />
                                    </View>
                                    <Text style={{ paddingVertical: 5, color: theme['color-basic-1002'] }}>{I18n.t('linkedin')}</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </RBSheet>

            </View>
        );
    }, [callBackRefersh]);

    const TotalRoundItem = React.memo(({ item, index, onPress }) => {
        return (
            <View style={{ marginBottom: convertHeight(5), backgroundColor: theme['color-basic-600'] }}>
                <ViewShot style={{ flex: 1 }} options={{ format: 'jpg', quality: 1.0 }}
                    ref={ref => {
                        if (!ref) return;
                        cardRefs.current[item.id] = ref;
                    }}>
                    <SocialPostBody item={item} index={index} />
                </ViewShot>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E2E2E2' }} />
                <SocialPostFooter onPress={onPress} item={item} index={index} />
            </View>
        );
    });

    const RenderItem = ({ item, index }) => {
        return <TotalRoundItem item={item} index={index} />;
    };

    const SubScriptionRenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ marginBottom: convertHeight(5) }}
                onPress={() => {
                    loadHomeFeed({ reset: true, filterId: item.id });
                    setSubscriptionCard(index)
                }}>
                <Card shadow style={{
                    height: convertHeight(60), width: convertHeight(60), marginLeft: convertWidth(10),
                    borderRadius: convertWidth(5), justifyContent: 'center', alignItems: 'center',
                    backgroundColor: subscriptionCard === index ? theme['color-basic-1000'] : theme['color-basic-100']
                }}>
                    {item.icon != null ?
                        <Image source={{ uri: `data:image/*;base64,${item.icon}` }} style={styles.subscriptionImage} /> :
                        <Icon pack="material-community" name={'image'} style={{ height: convertHeight(50), color: theme['color-basic-100'] }} />
                    }
                </Card>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <>
            <SafeAreaView>
                <DashboardHeader title={I18n.t('home')} navigation={navigation} />
                <View style={styles.mainContainer}>
                    <View>
                        {allSubscriptionData &&
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={allSubscriptionData}
                                renderItem={SubScriptionRenderItem}
                                keyExtractor={(item, index) => item.id.toString()} />}
                    </View>

                    <FlatList
                        removeClippedSubviews={false}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        onRefresh={() => onRefresh()}
                        refreshing={refreshing}
                        renderItem={RenderItem}
                        keyExtractor={(item, index) => item.id.toString()}
                        ListFooterComponent={() => <View style={{ height: convertHeight(80) }} />}
                        ListEmptyComponent={emptyList}
                        onEndReached={() => onEndReached()}
                        onEndReachedThreshold={0.1} />

                    <FloatingAction color={theme['color-basic-800']} />
                </View>
                {
                    <Modal visible={exitApp}
                        type={'confirm'}
                        message={I18n.t('exit_app')}
                        okText={I18n.t('exit')}
                        onOk={() => { BackHandler.exitApp() }}
                        onCancel={() => { setExitApp(false) }}
                    />
                }
            </SafeAreaView>
        </>
    );
};

export default SummaryView;