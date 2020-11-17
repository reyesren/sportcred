import React, {useContext} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import PostModel from '../../model/PostModel';
import UserModel from '../../model/UserModel';
import {AuthContext} from '../../navigation/AuthNavigator';

const PostSummary = (props) => {
  const [pid, updatePid] = React.useState("");
  const [title, updateTitle] = React.useState("");
  const [content, updateContent] = React.useState("");
  const [posterId, updatePosterId] = React.useState("");
  const [upVotes, updateUpvotes] = React.useState([]);
  const [downVotes, updateDownvotes] = React.useState([]);

  if(pid === '') {
    PostModel.getPostDoc(props.postId).then(post => {
        console.log(post);
        updatePid(post.pid);
        updateTitle(post.title);
        updateContent(post.content);
        updatePosterId(post.poster);
        UserModel.getUserDoc(post.poster).then(doc => {
            updatePosterId(doc.profile.displayName);
        })
        updateUpvotes(post.upVotes);
        updateDownvotes(post.downVotes);
    })
  }
  const getPostData = (postId) => {
    // TODO: should get the post with corresponding postId
    return PostModel.getPostDoc(postId);
  };

  const seeFullPost = () => {
      props.navigation.navigate('Full Post', {postId: props.postId});
  }

  const castUpvote = () => {
    // TODO: mark the post as upvoted by user
//    const user = useContext(AuthContext);
//    PostModel.updateUpVotes(pid, user.uid);
  };

  const castDownvote = () => {
    // TODO: mark the post as downvoted by user
//    const user = useContext(AuthContext);
//    PostModel.updateDownVotes(pid, user.uid);
  };
  const styles = StyleSheet.create({
    postContainer: {
      marginVertical: 10,
      padding: 20,
      backgroundColor: '#ddd',
      borderRadius: 10,
    },
    postTitleText: {
      fontWeight: '700',
      fontSize: 30,
    },
    posterText: {
      color: '#555',
      fontStyle: 'italic',
    },
    postContentText: {
      marginVertical: 10,
      fontSize: 20,
    },
    utilsContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    voteText: {
      fontSize: 17,
      paddingHorizontal: 10,
    },
    voteImage: {
      height: 30,
      width: 30,
      resizeMode: 'contain',
    },
  });

  return (
    <>
    <TouchableOpacity onPress={seeFullPost}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitleText}>{title} </Text>
        <Text>
          <Text style={styles.posterText}>by {posterId}</Text>
        </Text>
        <Text style={styles.postContentText}>
          {content.substring(0, 60)}...
        </Text>
        <View style={styles.utilsContainer}>
          <View>
            <TouchableOpacity onPress={castUpvote}>
              <Image
                source={require('./../../../assets/redditUpvote.png')}
                style={styles.voteImage}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.voteText}>
            {upVotes.length - downVotes.length}
          </Text>
          <View style={{transform: [{rotate: '180deg'}]}}>
            <TouchableOpacity onPress={castDownvote}>
              <Image
                source={require('./../../../assets/redditUpvote.png')}
                style={styles.voteImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    </>
  );
};

export default PostSummary;
