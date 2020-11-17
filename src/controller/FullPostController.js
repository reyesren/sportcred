import * as React from 'react';
import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {TheZoneView} from '../view/theZone/theZoneView.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TriviaLanding } from './TriviaController';

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
        </>
    );
};

export function getPostData(postId) {
    return {title:'Generic Post Title',
    posterId: 'posterId1',
    content: 'Lorem ipsum consectiture di amet lorem ipsum consectiture di amet',
    upvotes: 20,
    downvotes: 10};
}

export function getUserFromPosterId(posterId) {
    // TODO: get actual post data
    return {username: 'Username1', 
    pic: './../../../assets/defaultProfilePic.jpg'};
}

export const castUpvote = () => {
    // TODO: mark the post as upvoted by user
}

export const castDownvote = () => {
    // TODO: mark the post as downvoted by user
}

export function backtoZone(nav) {
    nav.pop();
}

export function addUserToRadar(userData) {
    // TODO: add user to the RADAR
    const user = useContext(AuthContext);
    
}