import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button} from 'react-native-paper';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {TheZonePages} from '../controller/TheZoneContentController';
import {RadarContent} from './RadarContentController';
import {Radar} from './RadarController';
import {createStackNavigator} from '@react-navigation/stack';
import RadarAddToUserController from './RadarAddUserController';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const ZoneTabs = ({route, navigation}) => {
    const styles = StyleSheet.create({
        logo: {
            width: '100%',
            height: 100,
            resizeMode: 'contain',
        }
    });
    return (
        <>
            <Image
                style={styles.logo}
                source={require('./../../assets/logo.png')}
            />
            <Tab.Navigator>
                <Tab.Screen name={'The Zone'} component={TheZonePages}/>
                <Tab.Screen name={'My Radar'} component={RadarContent}/>
            </Tab.Navigator>
        </>
    );
}
