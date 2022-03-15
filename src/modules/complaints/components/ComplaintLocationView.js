import React from 'react';
import { View, StyleSheet } from 'react-native';
import { components, I18n, utils, } from '../../../common';

const { Header, Location, SafeAreaView } = components;
const { dimensionUtils: { convertHeight } } = utils;

const ComplaintLocationView = (props) => {
    const { navigation } = props;

    const styles = StyleSheet.create({
        cameraView: {
            marginTop: convertHeight(80),
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    return (
        <SafeAreaView>
            <Header title={I18n.t('location')} />
            <View style={styles.cameraView}>
                <Location navigation={navigation} onGetLocation={(response) => {
                    props.newComplaintLocation(response);
                }} />
            </View>
        </SafeAreaView>
    );
};

export default ComplaintLocationView;
