import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { HelperText, TextInput, Text } from 'react-native-paper';

const PostSummary = (props) => {
    const getPostData = (postId) => {
        return {title:'Generic Post Title',
            posterId: 'posterId1',
            content: 'Lorem ipsum consectiture di amet lorem ipsum consectiture di amet',
            upvotes: 20,
            downvotes: 10};
    };
    const postData = getPostData(props.postId);

    const seeFullPost = () => {
        // should launch full post page and send postData
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
        }
    });

    return (
    <View style={styles.postContainer}>
        <Text style={styles.postTitleText}>{postData.title} </Text>
        <Text>
            <Text style={styles.posterText}>by {postData.posterId}</Text>
        </Text>
        <Text style={styles.postContentText}>{postData.content.substring(0, 60)}...</Text>
        <View style={styles.utilsContainer}>
            <Button title='upvote' />
            <Text style={styles.voteText}>{postData.upvotes - postData.downvotes}</Text>
            <Button title='downvote' />
        </View>
    </View>
    );
};

export default PostSummary;
