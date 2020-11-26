import { TheZoneView } from "../view/theZone/theZoneView";
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TheZoneContentView} from './../view/theZone/theZoneView';
import {CreatePostView} from './../view/theZone/CreatePostView';
import {FullPostView} from './../view/theZone/FullPostView';

const Stack = createStackNavigator();

const TheZoneContent = ({route, navigation}) => {
    return TheZoneContentView({navigation});
}

export const TheZonePages = ({route, navigation}) => {
    return (
        <>
          <Stack.Navigator headerMode={'none'} initialRouteName={'The Zone'}>
            <Stack.Screen name="The Zone" component={TheZoneContent} />
            <Stack.Screen name="Create Post" component={CreatePostView} />
            <Stack.Screen name='Full Post' component={FullPostView} />
          </Stack.Navigator>
        </>
      );
}