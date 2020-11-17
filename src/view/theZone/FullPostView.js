import * as React from 'react';
import { SafeAreaView, 
    StyleSheet, 
    ScrollView, 
    View, 
    Text, 
    StatusBar, 
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image} from 'react-native';
import { Button, Title } from 'react-native-paper';
import { getPostData, getUserFromPosterId, castDownvote, castUpvote, backtoZone } from './../../controller/FullPostController';
import PostModel from '../../model/PostModel'
import UserModel from '../../model/UserModel'

export function FullPostView({route, navigation}) {
    const [pid, updatePid] = React.useState("");
      const [title, updateTitle] = React.useState("");
      const [content, updateContent] = React.useState("");
      const [posterId, updatePosterId] = React.useState("");
      const [upVotes, updateUpvotes] = React.useState([]);
      const [downVotes, updateDownvotes] = React.useState([]);

      if(pid === '') {
        PostModel.getPostDoc(route.params.postId).then(post => {
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

    return (
        <>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView>
              <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                <KeyboardAvoidingView>
                    <View style={styles.postContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                        <View style={styles.posterContainer}>
                            <Text style={styles.posterText}>by {posterId}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>{content}</Text>
                        </View>
                        <View style={styles.utilsContainer}>
                            <View>
                                <TouchableOpacity onPress={castUpvote}>
                                    <Image source={require('./../../../assets/redditUpvote.png')} style={styles.voteImage}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.voteText}>{upVotes.length - downVotes.length}</Text>
                            <View style={{transform: [{ rotate: "180deg" }]}}>
                                <TouchableOpacity onPress={castDownvote}>
                                    <Image source={require('./../../../assets/redditUpvote.png')} style={styles.voteImage}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button mode='contained' onPress={() => {backtoZone(navigation)}}>Back</Button>
                    </View>
                </KeyboardAvoidingView>            
              </ScrollView>
          </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        padding: 10,
        paddingHorizontal: 15,
        margin: 5
    },
    titleContainer: {
        paddingVertical: 5
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1f6521',
        fontFamily: 'Arial'
    },
    posterContainer: {
        paddingVertical: 3,
    },
    posterText: {
        color: '#474b4f',
        fontStyle: 'italic',
        fontSize: 17,
    },
    contentContainer: {
        paddingVertical: 3,
    },
    contentText: {
        fontSize: 20
    },
    utilsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
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