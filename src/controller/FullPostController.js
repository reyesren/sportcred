import UserModel from '../model/UserModel';
import {AuthContext} from '../navigation/AuthNavigator';
import {TheZoneView} from '../view/theZone/theZoneView.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TriviaLanding } from './TriviaController';
import { FullPostView } from '../view/theZone/FullPostView';
import PostModel from './../model/PostModel';
import {useContext} from 'react';

export const FullPost = ({route, navigation}) => {
    const user = useContext(AuthContext);

    const castUpvote = (postId) => {
        // TODO: mark the post as upvoted by user
        PostModel.updateUpVotes(postId, user.uid);
    }

    const castDownvote = (postId) => {
        // TODO: mark the post as downvoted by user
        PostModel.updateDownVotes(postId, user.uid);
    }

    const backtoZone = () => {
        navigation.navigate('The Zone', {refresh: true});
    }

    const getPostScore = (postId) => {
        // TODO: Get a numerical score for the post, score = # of Upvotes - # of downvotes
        return PostModel.getPostDoc(postId).then(async (post) => {
            return await (post.upVotes.length - post.downVotes.length);
        });
    }

    const addUserToRadar = (posterId) => {
        // TODO: add user to the RADAR
        console.log("REACHED CONTROLLER");
        UserModel.updateRadarList(user.uid, posterId);
    }

    const getPostData = () => {
        var postData = {};
        return PostModel.getPostDoc(route.params.postId).then(async (post) => {
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
  
    return FullPostView({getPostData, addUserToRadar, backtoZone, castDownvote, castUpvote, getPostScore, checkIfUserVoted});
};
