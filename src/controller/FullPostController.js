import UserModel from '../model/UserModel';
import {AuthContext} from '../navigation/AuthNavigator';
import {TheZoneView} from '../view/theZone/theZoneView.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TriviaLanding } from './TriviaController';
import { FullPostView } from '../view/theZone/FullPostView';
import PostModel from './../model/PostModel';
import UserModel from './../model/UserModel';

export const FullPost = ({routes, navigation}) => {

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

    const backtoZone = (nav) => {
        nav.pop();
    }

    const addUserToRadar = (userData) => {
        // TODO: add user to the RADAR
        console.log("REACHED CONTROLLER");
    }

    const getPostData = () => {
        return PostModel.getPostDoc(route.params.postId).then(post => {
            console.log(post);
            return UserModel.getUserDoc(post.poster).then(doc => {
                return {pid: post.pid,
                    title: post.title,
                    content: post.content,
                    poster: post.poster,
                    upVotes: post.upVotes,
                    downVotes: post.downVotes,
                    displayName: doc.profile.displayName};
            });
        });
    }
  
    return FullPostView({getPostData, addUserToRadar, backtoZone, castDownvote, castUpvote});
};