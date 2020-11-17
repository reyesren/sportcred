import * as React from 'react';
import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {TheZoneView} from '../view/theZone/theZoneView.js';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {TriviaLanding} from './TriviaController';
import {PicksAndPredictionsTabs} from "./picksAndPredictions/PicksAndPredictionsTabsController";
import PostModel from '../model/PostModel';
import {ZoneTabs} from "./ZoneTabsController";

const Drawer = createDrawerNavigator();

export const TheZone = ({route, navigation}) => {
  const user = useContext(AuthContext);
  console.log('user uid', user.uid);

  function onSubmit(profileObj) {
    UserModel.getUserDoc(user.uid, profileObj, (doc) => {
      navigation.navigate('TheZoneView', doc);
    });
  }

  return (
    <>
      <Drawer.Navigator initialRouteName="The Zone">
        <Drawer.Screen name="The Zone" component={ZoneTabs} />
        <Drawer.Screen name="Trivia" component={TriviaLanding} />
        <Drawer.Screen name="Picks and Predictions" component={PicksAndPredictionsTabs} />
      </Drawer.Navigator>
    </>
  );
};

export function getPostIds() {
    return PostModel.getAllPostIds(false).then(async (allIds) => {
        console.log("allIds[0] is: " + allIds[0]);
        return allIds;
    })
};
