import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { components, I18n, utils } from '../../../common';
import { ThemeContext } from '../../../common/eva/theme-context';
import { USER_TYPE, ROLE_TYPE } from '../constants';
import { useIsFocused } from '@react-navigation/native';

const { SafeAreaView, Card, Text, FontelloIcon, Icon } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;

const UserTypeSelectionView = (props) => {
    const isFocused = useIsFocused();
    const themeContext = React.useContext(ThemeContext);
    const { userTypeThemeSelection } = props;
    const userTypeData = [];
    userTypeData.push(
        { "id": 1, "name": USER_TYPE.CHILD, "iconName": "child", "roleType": ROLE_TYPE.CHILD },
        { "id": 2, "name": USER_TYPE.PARENT, "iconName": "parent", "roleType": ROLE_TYPE.PARENT },
        { "id": 3, "name": USER_TYPE.TEACHER, "iconName": "teacher", "roleType": ROLE_TYPE.TEACHER },
        { "id": 4, "name": USER_TYPE.GENERAL_PUBLIC, "iconName": "general-public", "roleType": ROLE_TYPE.GENERAL_PUBLIC },
        { "id": 5, "name": USER_TYPE.OFFICIAL, "iconName": "account-tie", "roleType": ROLE_TYPE.OFFICIAL }
    );

    useEffect(() => {
        if (isFocused) {
            themeContext.toggleTheme();
        }
    }, [isFocused]);

    const theme = useTheme();

    const styles = StyleSheet.create({
        card: {
            justifyContent: 'space-evenly',
            height: convertWidth(155),
            margin: convertHeight(7),
            width: convertWidth(155),
            borderRadius: convertWidth(10)
        },
        mainContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: convertHeight(15)
        },
        viewContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        textStyle: {
            paddingVertical: convertHeight(10),
            fontWeight: 'bold'
        },
        squareIcon: {
            height: convertHeight(70),
            width: convertHeight(70),
            borderRadius: convertHeight(15),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['color-background-basic']
        },
        emergencyBtn: {
            height: convertHeight(55),
            backgroundColor: theme['text-black-color'],
            margin: convertHeight(20),
            borderRadius: convertHeight(100),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        emergencyIcnContainer: {
            height: convertHeight(45),
            width: convertHeight(45),
            borderRadius: convertHeight(40),
            backgroundColor: theme['color-basic-100'],
            marginRight: convertWidth(5),
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    const renderItem = ({ item, index }) => {
        return (
            <Card key={index} shadow style={styles.card}>
                <TouchableOpacity style={styles.viewContainer} onPress={() => userTypeThemeSelection({ 'name': item.name, 'themeContext': themeContext, 'roleType': item.roleType })}>
                    <View style={styles.squareIcon}>
                        {item.name === USER_TYPE.OFFICIAL ?
                            <Icon pack="material-community" name={item.iconName} style={{ height: convertHeight(35), color: theme['text-black-color'] }} /> :
                            <FontelloIcon name={item.iconName} size={convertHeight(25)} style={{ color: theme['text-black-color'] }} />}
                    </View>
                    <Text style={styles.textStyle} category='h5'>{I18n.t(item.name.toString())}</Text>
                </TouchableOpacity>
            </Card>
        );
    }

    return (
        <>
            <SafeAreaView>
                <View style={{ backgroundColor: theme['color-background-basic'], flex: 1 }}>
                    <View style={styles.mainContainer}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={userTypeData}
                            renderItem={(item) => renderItem(item)}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.emergencyBtn} onPress={() => { }}>
                        <Text style={{ color: theme['color-basic-100'], paddingLeft: convertWidth(30) }} category='h3'>{I18n.t('emergency_call')}</Text>
                        <View style={styles.emergencyIcnContainer}>
                            <FontelloIcon name={'emergency-call'} size={convertHeight(38)} style={{ color: theme['text-black-color'] }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

export default UserTypeSelectionView;