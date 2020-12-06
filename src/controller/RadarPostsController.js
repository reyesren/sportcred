import React, {useState} from 'react';
import {RadarView} from './../view/Radar/RadarView';
import UserModel from './../model/UserModel';
import PostModel from './../model/PostModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {useFocusEffect} from '@react-navigation/core';
import {RadarPostsView} from './../view/Radar/RadarPostsView'

export const RadarPosts = ({route, navigation}) => {
    const user = useContext(AuthContext);
    const [docList, setDocList] = useState([]);

    useFocusEffect(
    React.useCallback(() => {
        setDocList([]);
        UserModel.getUserDoc(user.uid).then((doc) => {
        let tempDoc = [];
        doc.radar_list.map((id) => {
            UserModel.getUserDoc(id).then((radarDoc) => {
            setDocList((prevState) => prevState.concat(radarDoc));
            });
        });
        });
    }, []),
    );

    // get radar post ids
    const getPostIds = () => {
        return UserModel.getUserDoc(user.uid).then((userObj) => {
            let userRadarList = userObj.radar_list;
            return PostModel.getRadarPostIds(userRadarList).then(async (allIds) => {
                console.log("allIds[0] is: " + allIds[0]);
                return allIds;
            })
        })
    };

    const getPostData = (postId) => {
        return PostModel.getPostDoc(postId).then(async (post) => {
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
        //console.log('reached 2');
        return PostModel.checkIfVoted(postId, user.uid, which).then(async (val) => {return await val});
    }

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

    const shouldRefresh = () => {
        return route.refresh !== undefined;
    }

    return RadarPostsView({docList, getPostIds, getPostData, checkIfUserVoted, goToFullPost, castDownvote, castUpvote, shouldRefresh});
};
