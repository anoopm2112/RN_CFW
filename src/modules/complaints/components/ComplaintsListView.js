import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { components, utils, I18n } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import DashboardHeader from '../../dashboard/components/DashboardHeader';

const { SafeAreaView, FloatingAction, Card, Icon } = components;
const { dimensionUtils: { convertWidth, convertHeight } } = utils;

const ComplaintsListView = (props) => {
    const { navigation, loadComplaintList, complaintListData: { data, refreshing } } = props;
    const theme = useTheme();
    const isFocuesd = useIsFocused();

    useEffect(() => {
        if (isFocuesd) {
            loadComplaintList();
        }
    }, [isFocuesd]);

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
            height: convertHeight(65),
            width: convertHeight(65),
            borderRadius: convertHeight(10),
            backgroundColor: theme['color-primary-600'],
            marginLeft: convertWidth(15),
            elevation: 15,
            borderRightWidth: 2,
            borderBottomWidth: 1,
            borderColor: theme['color-basic-1008']
        },
        titleText: {
            width: convertWidth(250),
            fontSize: convertHeight(16),
            color: theme['color-basic-1002'],
            paddingRight: convertWidth(15)
        },
        roundIcon: {
            width: convertWidth(45),
            height: convertWidth(45),
            borderRadius: convertWidth(45),
            borderWidth: 3,
            borderColor: theme['color-primary-200'],
            alignItems: "center",
            justifyContent: 'center',
        },
        userIcon: {
            width: convertWidth(55),
            height: convertWidth(55),
            borderRadius: convertHeight(10)
        },
        emptyList: {
            alignItems: 'center',
            paddingTop: convertHeight(10)
        }
    });

    const renderItem = ({ item }) => {
        return (
            <Card shadow style={styles.cardStyle}>
                <TouchableOpacity onPress={() => props.navigateToAddComplaint({ configId: item.id })} style={styles.viewStyle}>
                    <View style={styles.imgView}>
                        {item.icon ?
                            <Image source={{ uri: `data:image/*;base64,${item.icon}` }} style={styles.userIcon} /> :
                            <View style={styles.roundIcon}>
                                <Icon pack="material-community" name={'image'} style={{ height: convertHeight(35), color: theme['color-primary-200'] }} />
                            </View>
                        }
                    </View>
                    <View style={{ marginLeft: convertWidth(10) }}>
                        <Text style={styles.titleText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
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
                <DashboardHeader title={I18n.t('complaints')} navigation={navigation} />
                <View style={styles.mainContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        onRefresh={() => { loadComplaintList() }}
                        refreshing={refreshing}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={() => <View style={{ height: convertHeight(80) }} />}
                        ListEmptyComponent={emptyList} />
                    <FloatingAction color={theme['color-basic-800']} />
                </View>
            </SafeAreaView>
        </>
    );
}

export default ComplaintsListView;