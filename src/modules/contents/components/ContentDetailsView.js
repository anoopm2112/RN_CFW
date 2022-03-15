import React, { useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';

const { SafeAreaView, Card, Header } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const ContentDetailsView = (props) => {
    const { userType: { assetIcons } } = props;
    const { data } = props.route.params;
    const theme = useTheme();
    const [hideHeaderHeight, setHideHeaderHeight] = useState(0);
    const [opacity, setOpacity] = useState(0);

    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: convertWidth(13),
            paddingVertical: convertHeight(7),
            backgroundColor: theme['color-basic-1008']
        },
        card: {
            flex: 1,
            borderRadius: convertHeight(15),
            backgroundColor: theme['color-basic-600'],
            marginTop: convertHeight(10)
        },
        image: {
            width: convertWidth(500),
            height: convertHeight(100),
            resizeMode: "contain"
        },
        titleContainer: {
            padding: convertHeight(15)
        },
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: theme['color-basic-1008']
        },
        webview: {
            backgroundColor: theme['color-basic-1008']
        }
    });

    const ImageComponent = props => {
        const [isError, setError] = useState(false)
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMethod={"resize"} source={isError ? assetIcons.icons.brokenImage : { uri: props.image }} style={styles.image} onError={(e) => setError(true)} />
            </View>
        );
    }

    let jsCode = `document.querySelector("div[class^='toolbar_']").remove();
      document.querySelector(".auto__embeds_new_show .document_scroller").style.marginTop="0px";`;

    const renderLoading = () => {
        return (
            <ActivityIndicator
                color="#eee"
                size="large"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center', top: 0, bottom: 0,
                    left: 0, right: 0, position: 'absolute'
                }}
            />
        )
    }

    return (
        <SafeAreaView>
            <Header title={I18n.t('contents')} />
            <View style={styles.container}>
                {data.photoId === null ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image resizeMethod={"resize"} style={styles.image} source={assetIcons?.icons?.brokenImage} />
                    </View>
                    :
                    <ImageComponent image={data.photoId} />}
                <Card shadow style={styles.card}>
                    <WebView
                        renderLoading={renderLoading}
                        startInLoadingState={true}
                        onLoadProgress={e => {
                            if (e.nativeEvent.progress === 1) {
                                setTimeout(() => {
                                    setOpacity(1)
                                }, 50)
                            }
                        }}
                        showsHorizontalScrollIndicator={false}
                        injectedJavaScript={jsCode}
                        userAgent={'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}
                        showsVerticalScrollIndicator={false}
                        originWhitelist={['*']}
                        source={{ uri: data.body }}
                        containerStyle={{ borderRadius: 15 }}
                        style={{ backgroundColor: theme['color-basic-600'], height: 100, top: hideHeaderHeight, opacity: opacity }}
                    />
                </Card>
            </View>
        </SafeAreaView>
    );
}

export default ContentDetailsView;