import { TheZoneView } from "../view/theZone/theZoneView";
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TheZoneContentView} from './../view/theZone/theZoneView';
import {CreatePost} from './../controller/CreatePostController';
import {FullPost} from './../controller/FullPostController';
import PostModel from './../model/PostModel';
import UserModel from './../model/UserModel';

const Stack = createStackNavigator();

const TheZoneContent = ({route, navigation}) => {

    const goToFullPost = (postId) => {
        navigation.navigate('Full Post', {postId});
    }

    const getPostIds = () => {
        return PostModel.getAllPostIds(false).then(async (allIds) => {
            console.log("allIds[0] is: " + allIds[0]);
            return allIds;
        })
    };

    const getPostData = (postId) => {
        var postData = {};
        return PostModel.getPostDoc(postId).then(async (post) => {
            //console.log(post);
            return await UserModel.getUserDoc(post.poster).then(async (doc) => {
                return {pid: post.pid,
                    title: post.title,
                    content: post.content,
                    poster: post.poster,
                    upVotes: post.upVotes,
                    downVotes: post.downVotes,
                    displayName: doc.profile.displayName};
            });
        });
        //console.log(postData);
    }

    return TheZoneContentView({navigation, getPostIds, goToFullPost, getPostData});
}

export const TheZonePages = ({route, navigation}) => {
    return (
        <>
          <Stack.Navigator headerMode={'none'} initialRouteName={'The Zone'}>
            <Stack.Screen name="The Zone" component={TheZoneContent} />
            <Stack.Screen name="Create Post" component={CreatePost} />
            <Stack.Screen name='Full Post' component={FullPost} />
          </Stack.Navigator>
        </>
      );
}