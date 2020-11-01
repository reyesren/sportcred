import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '../controller/ProfileController';
import {
  ProfileSetup,
  Questionnaire,
  StartupCheck,
} from '../controller/FirstTimeLoginController';
import {TheZone} from '../controller/TheZoneController.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Settings} from '../controller/SettingsController.js';
import {Live} from '../controller/LiveController.js';
import {TriviaLanding} from '../controller/TriviaController.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TriviaMainGameController from '../controller/TriviaMainGameController';
import TriviaLoadingScreenController from '../controller/TriviaLoadingScreenController';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// TODO: ADD LIVEVIEW AND SETTINGS VIEW INTO TAB

function FullySignedUp() {
  return (
    <Tab.Navigator initialRouteName={'The Zone'}>
      <Tab.Screen
        name="The Zone"
        component={TheZone}
        options={{
          tabBarLabel: 'The Zone',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="stadium-variant"
              color="#900"
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="face-profile"
              color="#900"
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="cog" color="#900" size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={Live}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="youtube-tv" color="#900" size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function LoggedInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName={'StartupCheck'}>
        <Stack.Screen name="StartupCheck" component={StartupCheck} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="TheZoneView" component={FullySignedUp} />
        <Stack.Screen
          name="TriviaMainGameController"
          component={TriviaMainGameController}
        />
        <Stack.Screen
          name="TriviaLoadingScreenController"
          component={TriviaLoadingScreenController}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
