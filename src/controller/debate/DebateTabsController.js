import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Button} from "react-native-paper";
import React from "react";
import {DebateQuestions} from "./DebateQuestionsController";
import {DebateList} from "./DebateListController";


const Tab = createMaterialTopTabNavigator();

export const DebateTabs = ({navigation, route}) => {
    return (
        <>
            <Button onPress={() => navigation.navigate('The Zone')}>Back</Button>
            <Tab.Navigator>
                <Tab.Screen name={"All"} component={DebateList}/>
                <Tab.Screen name={"My debate"} component={DebateQuestions}/>
            </Tab.Navigator>
        </>
    );
}