import UserModel from '../model/UserModel';
import {AuthContext} from '../navigation/AuthNavigator';
import {TheZoneView} from '../view/theZone/theZoneView.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TriviaLanding } from './TriviaController';
import { FullPostView } from '../view/theZone/FullPostView';
import PostModel from './../model/PostModel';

export const FullPost = ({route, navigation}) => {

    const castUpvote = () => {
        // TODO: mark the post as upvoted by user
    //    const user = useContext(AuthContext);
    //    PostModel.updateUpVotes(pid, user.uid);
    }

    const castDownvote = () => {
        // TODO: mark the post as downvoted by user
    //    const user = useContext(AuthContext);
    //    PostModel.updateDownVotes(pid, user.uid);
    }

    const backtoZone = () => {
        navigation.pop();
    }

    const getPostScore = () => {
        // TODO: Get a numerical score for the post, score = # of Upvotes - # of downvotes
        return 0
    }

    const addUserToRadar = (userData) => {
        // TODO: add user to the RADAR
        console.log("REACHED CONTROLLER");
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

    const checkIfUserUpvoted = (postId) => {
        // TODO: returns true if user upvoted post with postId
        // false, otherwise
    }
  
    return FullPostView({getPostData, addUserToRadar, backtoZone, castDownvote, castUpvote, getPostScore, checkIfUserUpvoted});
};