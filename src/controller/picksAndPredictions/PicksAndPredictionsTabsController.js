import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button} from 'react-native-paper';
import React from 'react';
import {Daily} from './DailyController';
import {PreSeason} from './PreSeasonController';
import {Playoff} from './PlayoffController';
import {createStackNavigator} from '@react-navigation/stack';
import PlayerChooserController from './PlayerChooserController';

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const PreSeasonNavigator = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name={'PreSeason'} component={PreSeason} />
      <Stack.Screen
        name={'PlayerChooser'}
        component={PlayerChooserController}
      />
    </Stack.Navigator>
  );
};

export const PicksAndPredictionsTabs = ({navigation, route}) => {
  return (
    <>
      <Button onPress={() => navigation.navigate('The Zone')}>Back</Button>
      <Tab.Navigator>
        <Tab.Screen name={'Daily'} component={Daily} />
        <Tab.Screen name={'PreSeason'} component={PreSeasonNavigator} />
        <Tab.Screen name={'Playoff'} component={Playoff} />
      </Tab.Navigator>
    </>
  );
};
