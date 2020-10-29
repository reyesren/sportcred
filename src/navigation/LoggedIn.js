import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Profile } from '../controller/ProfileController';
import {ProfileSetup, Questionnaire, StartupCheck}  from "../controller/FirstTimeLoginController";
import {TheZone}  from "../controller/TheZoneController.js";

const Stack = createStackNavigator();

export default function LoggedInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName={"StartupCheck"}>
        <Stack.Screen name="StartupCheck" component={StartupCheck} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="ProfileView" component={Profile} />
        <Stack.Screen name="TheZoneView" component={TheZone} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
