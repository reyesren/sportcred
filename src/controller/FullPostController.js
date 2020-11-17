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
    return PostModel.getPostDoc(postId);
}

export const castUpvote = () => {
    // TODO: mark the post as upvoted by user
//    const user = useContext(AuthContext);
//    PostModel.updateUpVotes(pid, user.uid);
}

export const castDownvote = () => {
    // TODO: mark the post as downvoted by user
//    const user = useContext(AuthContext);
//    PostModel.updateDownVotes(pid, user.uid);
}

export function backtoZone(nav) {
    nav.pop();
}

export function addUserToRadar(userData) {
    // TODO: add user to the RADAR
}