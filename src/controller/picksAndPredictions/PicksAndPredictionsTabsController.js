import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Button} from "react-native-paper";
import React from "react";
import {Daily} from "./DailyController";
import {PreSeason} from "./PreSeasonController";
import {Playoff} from "./PlayoffController";

const Tab = createMaterialTopTabNavigator();


export const PicksAndPredictionsTabs = ({navigation, route}) => {
    return (
        <>
            <Button onPress={() => navigation.navigate('The Zone')}>Back</Button>
            <Tab.Navigator>
                <Tab.Screen name={'Daily'} component={Daily}/>
                <Tab.Screen name={'PreSeason'} component={PreSeason}/>
                <Tab.Screen name={'Playoff'} component={Playoff}/>
            </Tab.Navigator>
        </>
    );
}