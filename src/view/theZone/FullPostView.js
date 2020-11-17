import * as React from 'react';
import { SafeAreaView, 
    StyleSheet, 
    ScrollView, 
    View, 
    Text, 
    StatusBar, 
    Modal,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableHighlight,
    Image} from 'react-native';
import { Button, Title } from 'react-native-paper';
import { getPostData, getUserFromPosterId, castDownvote, castUpvote, backtoZone, addUserToRadar } from './../../controller/FullPostController';
import PostModel from '../../model/PostModel'
import UserModel from '../../model/UserModel'


export function FullPostView({route, navigation}) {
    const [pid, updatePid] = React.useState("");
      const [title, updateTitle] = React.useState("");
      const [content, updateContent] = React.useState("");
      const [posterId, updatePosterId] = React.useState("");
      const [upVotes, updateUpvotes] = React.useState([]);
      const [downVotes, updateDownvotes] = React.useState([]);

<<<<<<< HEAD
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
=======
    const postData = getPostData(route.params.postId);
    const userData = getUserFromPosterId(postData.posterId);
    const [modalVisible, setModalVisible] = React.useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
>>>>>>> 979b1b8a5b548055184c6ea61860e0e742239ef1

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#1F6521" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            addUserToRadar(userData);
                        }}
                        >
                            <Text style={styles.modalTextStyle}>Add user to Radar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#1F6521" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                            <Text style={styles.modalTextStyle}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

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
<<<<<<< HEAD
                        <View style={styles.posterContainer}>
                            <Text style={styles.posterText}>by {posterId}</Text>
                        </View>
=======
                        <TouchableOpacity style={styles.posterContainer} onPress={openModal}>
                            <Text style={styles.posterText}>by {userData.username}</Text>
                        </TouchableOpacity>
>>>>>>> 979b1b8a5b548055184c6ea61860e0e742239ef1
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 10
      },
      modalTextStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
});