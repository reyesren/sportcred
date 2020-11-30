import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '../controller/ProfileController';
import {ProfileTabs} from '../controller/ProfileTabsController';
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
import {HeadToHeadTabs} from '../controller/TriviaHeadToHeadController';
import TriviaMainGameController from '../controller/TriviaMainGameController';
import TriviaLoadingScreenController from '../controller/TriviaLoadingScreenController';
import TriviaStartGameController from '../controller/TriviaStartGameController';
import TriviaResultsController from '../controller/TriviaResultsController';
import HeaderBackButton from '@react-navigation/stack';
import PlayerChooser from '../view/picksAndPredictions/PlayerChooserView';
import PlayerChooserController from '../controller/picksAndPredictions/PlayerChooserController';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// TODO: ADD LIVEVIEW AND SETTINGS VIEW INTO TAB

function FullySignedUp() {
  return (
    <Tab.Navigator
      initialRouteName={'The Zone'}
      tabBarOptions={{
        style: {
          activeTintColor: '#fff',
          inactiveTintColor: 'lightgray',
          activeBackgroundColor: '#c4461c',
          inactiveBackgroundColor: '#b55031',
          backgroundColor: '#1F6521',
        },
        showLabel: false,
      }}>
      <Tab.Screen
        name="The Zone"
        component={TheZone}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="stadium-variant"
              color="#FFFFFF"
              size={focused ? 30 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTabs}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="face-profile"
              color="#FFFFFF"
              size={focused ? 30 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="cog"
              color="#FFFFFF"
              size={focused ? 30 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={Live}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="youtube-tv"
              color="#FFFFFF"
              size={focused ? 30 : 20}
            />
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
          name="TriviaLandingController"
          component={TriviaLanding}
        />
        <Stack.Screen
          name="TriviaStartGameController"
          component={TriviaStartGameController}
        />
        <Stack.Screen
          name="TriviaMainGameController"
          component={TriviaMainGameController}
          options={{
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => {
                  console.log('go back');
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="TriviaLoadingScreenController"
          component={TriviaLoadingScreenController}
        />
        <Stack.Screen
          name="TriviaResultsController"
          component={TriviaResultsController}
        />
        <Stack.Screen name="TriviaHeadToHead" component={HeadToHeadTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
