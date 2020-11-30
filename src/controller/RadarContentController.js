import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FullPost} from './../controller/FullPostController';
import { RadarPosts } from './RadarPostsController';

const Stack = createStackNavigator();

export const RadarContent = ({route, navigation}) => {
    return (
        <>
        <Stack.Navigator headerMode={'none'} initialRouteName={'Radar Posts'}>
            <Stack.Screen name="Radar Posts" component={RadarPosts} />
            <Stack.Screen name='Full Post' component={FullPost} />
        </Stack.Navigator>
        </>
    );
}