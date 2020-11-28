import { TheZoneView } from "../view/theZone/theZoneView";
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TheZoneContentView} from './../view/theZone/theZoneView';
import {CreatePost} from './../controller/CreatePostController';
import {FullPost} from './../controller/FullPostController';
import PostModel from './../model/PostModel';
import UserModel from './../model/UserModel';
import {AuthContext} from '../navigation/AuthNavigator';
import {useContext} from 'react';

const Stack = createStackNavigator();

const TheZoneContent = ({route, navigation}) => {
    const user = useContext(AuthContext);

    const goToFullPost = (postId) => {
        navigation.navigate('Full Post', {postId});
    }

    const castUpvote = (postId) => {
        // TODO: mark the post as upvoted by user
        PostModel.updateUpVotes(postId, user.uid);
    }

    const castDownvote = (postId) => {
        // TODO: mark the post as downvoted by user
        PostModel.updateDownVotes(postId, user.uid);
    }

  /**
   *
   * @param {string} postId: post id
   * @param {int} which: 0 if checking upVotes, 1 if checking downVotes
   *
   * @return {bool} true if user is found, false if user not found
   */
    const checkIfUserVoted = (postId, which) => {
        // TODO: returns true if user upvoted post with postId
        // false, otherwise
        return PostModel.checkIfVoted(postId, user.uid, which);
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

    return TheZoneContentView({navigation, getPostIds, goToFullPost, getPostData, castDownvote, castUpvote, checkIfUserVoted});
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
