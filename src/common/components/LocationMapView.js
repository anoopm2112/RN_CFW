import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import { convertHeight, convertWidth } from '../utils/dimensionUtil';
import { useTheme } from '@ui-kitten/components';
import I18n from '../i18n';
import { useNetInfo } from "@react-native-community/netinfo";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";

const LocationMapView = (props) => {
    const [latitude, setLatitude] = useState(props.myLocation.coords.latitude);
    const [longitude, setLongitude] = useState(props.myLocation.coords.longitude);
    const [marginBottom, setMarginBottom] = useState(1);
    const [locality, setLocality] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [getCoordButtonDisable, setGetCoordButtonDisable] = useState(false);
    const [previousLocation, setPreviousLocation] = useState(undefined);
    const mapViewRef = useRef();
    const dispatch = useDispatch();
    const DashboardActions = require('../../modules/dashboard/actions');

    function setGeocoder() {
        setGetCoordButtonDisable(false);
        var NY = { lat: latitude, lng: longitude };

        Geocoder.geocodePosition(NY).then(res => {
            setLocality(res[0].locality);
            setFormattedAddress(res[0].formattedAddress);
            RBSheetRef.current.open();
        }).catch((err) => {
            setGeocoder();
        });
    }

    function getCoordinates() {
        setGetCoordButtonDisable(true);
        props.onGetLocation && props.onGetLocation({ latitude, longitude, formattedAddress });
    }

    function getCoordinatesOffline() {
        setGetCoordButtonDisable(true);
        const latitude = props.myLocation.coords.latitude;
        const longitude = props.myLocation.coords.longitude
        props.onGetLocation && props.onGetLocation({ latitude, longitude });
    }

    const netInfo = useNetInfo();

    const gotToMyLocation = () => {
        Geolocation.getCurrentPosition((coords) => {
            setLatitude(coords.coords.latitude);
            setLongitude(coords.coords.longitude);
            setGeocoder();
            setGetCoordButtonDisable(false);
            mapViewRef.current.animateCamera({ center: { latitude: coords.coords.latitude, longitude: coords.coords.longitude } });
        }, (error) => {
        }, { enableHighAccuracy: true, maximumAge: 0 });
    };

    const theme = useTheme();
    const RBSheetRef = useRef();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
        },
        map: {
            width: '100%',
            height: '127%'
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
        },
        myLocationIcon: {
            width: convertWidth(42),
            height: convertHeight(40),
            backgroundColor: theme['color-basic-1008'],
            position: "absolute",
            justifyContent: 'center',
            alignItems: 'center',
            top: convertHeight(450),
            right: convertWidth(10),
            borderRadius: 5,
        },
        label: {
            color: theme['color-basic-1002'],
            fontSize: convertWidth(15),
            fontWeight: 'bold'
        },
        subLabel: {
            color: theme['color-basic-1002'],
            fontSize: convertWidth(13),
            marginTop: convertWidth(5)
        },
        locationText: {
            color: theme['color-basic-1002'],
            fontSize: convertWidth(14),
            marginLeft: convertHeight(20),
            width: convertWidth(250)
        },
        customView: {
            margin: convertHeight(15),
        },
        arrow: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: 'transparent',
            borderWidth: convertWidth(15),
            alignSelf: 'center',
            marginTop: -convertWidth(10)
        },
        arrowBorder: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: theme['color-basic-900'],
            borderWidth: convertWidth(15),
            alignSelf: 'center',
            marginTop: -convertWidth(0.5)
        },
        buble: {
            // flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            backgroundColor: theme['color-basic-900'],
            borderRadius: convertWidth(6),
            borderColor: '#ccc',
            borderWidth: convertWidth(0.5),
            padding: convertWidth(15),
            width: convertWidth(300),
        }
    });

    useEffect(() => {
        RBSheetRef.current.open();
        props.values && setPreviousLocation({ latitude: props.values.latitude, longitude: props.values.longitude });
    }, []);

    return (
        <View style={styles.container}>
            {netInfo && netInfo.isInternetReachable ?
                <View>
                    {/* <View style={{ paddingTop: statusBarHeight }}> */}
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={ref => mapViewRef.current = ref}
                        style={[styles.map, { paddingBottom: marginBottom }]}
                        initialCamera={{
                            center: { latitude, longitude },
                            heading: 0,
                            pitch: 0,
                            zoom: 16,
                            altitude: 0
                        }}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        onPress={(e) => {
                            setLatitude(e.nativeEvent.coordinate.latitude);
                            setLongitude(e.nativeEvent.coordinate.longitude);
                            setGeocoder();
                            setGetCoordButtonDisable(false);
                        }}
                        onMapReady={() => {
                            setMarginBottom(0);
                            setGeocoder();
                            setGetCoordButtonDisable(false);
                        }}
                    >
                        {/* <Marker
                                coordinate={{
                                    latitude: latitude,
                                    longitude: longitude,
                                }}
                                title={locality}
                                description={formattedAddress}
                            /> */}
                        {/* <Marker
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                            }}
                            title={I18n.t('your_location_will_be_here')}
                            description={I18n.t('please_place_pin_caauracy')}
                        >
                            <MapView.Callout tooltip style={styles.customView}
                            >
                                <View style={styles.buble}>
                                     <Text tyle={{ color: '#000', fontSize: convertWidth(12) }}>{I18n.t('your_location_will_be_here')}</Text>
                                    <Text style={{ color: '#000', fontSize: convertWidth(12) }}>{I18n.t('please_place_pin_caauracy')}</Text>
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />
                            </MapView.Callout>
                        </Marker> */}
                        <Marker
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                            }}
                        >
                            <View style={styles.buble}>
                                <Text tyle={{ color: theme['color-basic-1002'], fontSize: convertWidth(12) }}>{I18n.t('your_location_will_be_here')}</Text>
                                <Text style={{ color: theme['color-basic-1002'], fontSize: convertWidth(12) }}>{I18n.t('please_place_pin_caauracy')}</Text>
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: convertWidth(80),
                                width: convertWidth(80),
                                borderRadius: convertWidth(80),
                                backgroundColor: theme['color-basic-1008'],
                                left: convertWidth(110)
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: convertWidth(30),
                                    width: convertWidth(30),
                                    borderRadius: convertWidth(80),
                                    backgroundColor: theme['color-basic-1002'],
                                }}
                                >

                                </View>

                            </View>
                        </Marker>
                    </MapView>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => gotToMyLocation()} style={styles.myLocationIcon}>
                        <MaterialIcons name="my-location" size={convertHeight(24)} color="black" />
                    </TouchableOpacity>
                    {/* </View> */}
                    {/* <View>
                        <TouchableOpacity
                            disabled={getCoordButtonDisable} activeOpacity={0.5} onPress={() => { getCoordinates() }}>
                            <View style={[styles.buttonContainer, getCoordButtonDisable ? { backgroundColor: theme['text-disabled-color'] } : { backgroundColor: theme['color-basic-600'] }]}>
                                <Text category="h5" style={styles.textStyle}>{getCoordButtonDisable ? I18n.t('location_received') : I18n.t('get_location')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                </View> :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    {previousLocation && <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text category="h3" style={{ fontWeight: 'bold', paddingVertical: convertHeight(20), textAlign: 'center' }}>{I18n.t('previous_location_show')}</Text>
                        <Text category="h5" >{I18n.t('latitude')}: {previousLocation.latitude}</Text>
                        <Text category="h5" style={{ paddingBottom: convertHeight(20) }}>{I18n.t('longitude')}: {previousLocation.longitude}</Text>
                        <Text category="h4" style={{ fontWeight: 'bold', paddingVertical: convertHeight(25), textAlign: 'center' }}>{I18n.t('previous_loc_info')}</Text>
                    </View>}
                    <Text category="h3" style={{ fontWeight: 'bold', paddingVertical: convertHeight(20) }}>{I18n.t('you_are_here')}</Text>
                    <Text category="h5" >{I18n.t('latitude')}: {props.myLocation.coords.latitude}</Text>
                    <Text category="h5" style={{ paddingBottom: convertHeight(20) }}>{I18n.t('longitude')}: {props.myLocation.coords.longitude}</Text>

                </View>}
            <RBSheet
                ref={RBSheetRef}
                height={convertHeight(250)}
                openDuration={250}
                customStyles={{ container: { justifyContent: "center", alignItems: "center", backgroundColor: theme['color-basic-700'] } }}>
                <View
                    style={{
                        paddingTop: convertWidth(20),
                        // backgroundColor: theme['color-basic-600'],
                        paddingLeft: convertHeight(15)
                    }}>
                    <Text category='h5' style={styles.label}>{I18n.t('select_current_location')}</Text>
                    <Text category='h5' style={styles.subLabel}>{I18n.t('your_location')}</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: convertHeight(10) }}>
                        <FontelloIcon name='location' size={convertWidth(20)} style={{ color: theme['color-basic-1002'] }} />
                        <Text category='h5' style={styles.locationText}>{formattedAddress}</Text>
                    </View>
                    <View style={{ marginBottom: convertWidth(20), marginTop: convertHeight(20) }}>
                        <TouchableOpacity
                            onPress={() => {
                                getCoordinatesOffline()
                                props.onGetLocation({ latitude: latitude, longitude: longitude, formattedAddress: formattedAddress })
                                props.navigation.goBack();
                            }}
                            style={styles.buttonContainer}>
                            <Text category="h5" style={styles.textStyle}>{I18n.t('confirm_location')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </View>
    );
};

export default LocationMapView;
