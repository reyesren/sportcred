import * as React from 'react';
import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {TheZoneView} from '../view/theZone/theZoneView.js';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {TriviaLanding} from './TriviaController';

const Drawer = createDrawerNavigator();

export const TheZone = ({route, navigation}) => {
  const user = useContext(AuthContext);

  function onSubmit(profileObj) {
    UserModel.getUserDoc(user.uid, profileObj, (doc) => {
      navigation.navigate('TheZoneView', doc);
    });
  }

  return (
    <>
      <Drawer.Navigator initialRouteName="The Zone">
        <Drawer.Screen name="The Zone" component={TheZoneView} />
        <Drawer.Screen name="Trivia" component={TriviaLanding} />
      </Drawer.Navigator>
    </>
  );
};

export const getPostIds = () => {
  // TODO: should return a list of valid post ids
  return ['1'];
};
