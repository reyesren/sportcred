import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Button} from "react-native-paper";
import React from "react";
import {
    StyleSheet,
    Image
  } from 'react-native';
import {Profile} from './ProfileController';
import {Radar} from './RadarController';

const Tab = createMaterialTopTabNavigator();

export const ProfileTabs = ({route, navigation}) => {
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
                <Tab.Screen name={'Profile'} component={Profile}/>
                <Tab.Screen name={'Radar'} component={Radar}/>
            </Tab.Navigator>
        </>
    );
}