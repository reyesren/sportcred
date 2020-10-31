import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { HelperText, TextInput} from 'react-native-paper';


const PostSummary = (props) => {
    const getPostData = (postId) => {
        // TODO: should get the post with corresponding postId
        return {title:'Generic Post Title',
            posterId: 'posterId1',
            content: 'Lorem ipsum consectiture di amet lorem ipsum consectiture di amet',
            upvotes: 20,
            downvotes: 10};
    };
    const postData = getPostData(props.postId);

    const seeFullPost = () => {
        // TODO: launch full post page and send postData
    }

    const castUpvote = () => {
        // TODO: mark the post as upvoted by user
    }

    const castDownvote = () => {
        // TODO: mark the post as downvoted by user
    }
    const styles = StyleSheet.create({
        postContainer: {
            margin: 10,
            padding: 20,
            marginVertical: 10,
            backgroundColor: '#ddd',
            borderRadius: 10
        },
        postTitleText: {
            fontWeight: '700',
            fontSize: 30
        },
        posterText: {
            color: '#555',
            fontStyle: 'italic',
        },
        postContentText: {
            marginVertical: 10,
            fontSize: 20
        },
        utilsContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },
        voteText: {
            fontSize: 17,
            paddingHorizontal:10
        },
        voteImage: {
            height: 30,
            width: 30,
            resizeMode: 'contain',
        },
    });

    return (
    <TouchableOpacity onPress={seeFullPost}>
        <View style={styles.postContainer}>
            <Text style={styles.postTitleText}>{postData.title} </Text>
            <Text>
                <Text style={styles.posterText}>by {postData.posterId}</Text>
            </Text>
            <Text style={styles.postContentText}>{postData.content.substring(0, 60)}...</Text>
            <View style={styles.utilsContainer}>
                <View>
                    <TouchableOpacity onPress={castUpvote}>
                        <Image source={require('./../../../assets/redditUpvote.png')} style={styles.voteImage}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.voteText}>{postData.upvotes - postData.downvotes}</Text>
                <View style={{transform: [{ rotate: "180deg" }]}}>
                    <TouchableOpacity onPress={castDownvote}>
                        <Image source={require('./../../../assets/redditUpvote.png')} style={styles.voteImage}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableOpacity>
    );
};

export default PostSummary;
