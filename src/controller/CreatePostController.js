import * as React from 'react';
import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import { CreatePostView } from '../view/theZone/CreatePostView';
import PostModel from '../model/PostModel';

export const CreatePost = ({route, navigation}) => {
  const user = useContext(AuthContext);

  const submitPost = (title, postText) => {
    // TODO: submit post data to firestore
    if(title === '' || postText === '') {
        return false;
    }
    const postData = {title: title, content: postText, poster: user.uid};
    PostModel.createNewPostDoc(postData);
    navigation.pop() // THIS NEEDS TO BE HERE, DO NOT REMOVE PLEZ
    return true;
  };

  return CreatePostView({navigation, submitPost});
}
