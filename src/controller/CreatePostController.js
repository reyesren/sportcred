import * as React from 'react';
import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import { CreatePostView } from '../view/theZone/CreatePostView';

export const CreatePost = ({route, navigation}) => {

  const submitPost = (title, postText) => {
    // TODO: submit post data to firestore
    navigation.pop() // THIS NEEDS TO BE HERE, DO NOT REMOVE PLEZ
  };

  return CreatePostView({navigation, submitPost});
}
