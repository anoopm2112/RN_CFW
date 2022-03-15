import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';

const { SafeAreaView, Card, Header } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const NewsDetailsView = (props) => {
    const { userType: { assetIcons } } = props;
    const { data } = props.route.params;
    const theme = useTheme();
    const [hideHeaderHeight, setHideHeaderHeight] = useState(-15);

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

    let jsCode = `document.querySelector("div[role='toolbar']") !== null && document.querySelector("div[role='toolbar']").remove();`;

    return (
        <SafeAreaView>
            <Header title={I18n.t('news')} />
            <View style={styles.container}>
                {data.photoId === null ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image resizeMethod={"resize"} style={styles.image} source={assetIcons?.icons?.brokenImage} />
                    </View>
                    :
                    <ImageComponent image={data.photoId} />}
                <Card shadow style={styles.card}>
                    <WebView
                        onLoadStart={() => setHideHeaderHeight(-15)}
                        onLoadEnd={() => setHideHeaderHeight(0)}
                        showsHorizontalScrollIndicator={false}
                        injectedJavaScript={jsCode}
                        userAgent={'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}
                        showsVerticalScrollIndicator={false}
                        originWhitelist={['*']}
                        source={{ uri: data.body }}
                        containerStyle={{ borderRadius: 15 }}
                        style={{ backgroundColor: theme['color-basic-600'], height: 100, top: hideHeaderHeight }}
                    />
                </Card>
            </View>
        </SafeAreaView>
    );
}

export default NewsDetailsView;