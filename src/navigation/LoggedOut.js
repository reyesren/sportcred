import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DisplayExample from '../controller/LoginController';
import {Register} from '../controller/RegisterController';
import Profile from '../controller/ProfileController';

const Stack = createStackNavigator();

// todo replace screens with user registration / login controllers

export default function LoggedOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Login" component={DisplayExample} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
