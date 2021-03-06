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
    Image,
    RefreshControl
} from 'react-native';
import { Button, Title } from 'react-native-paper';


export function FullPostView(props) {
    const [pid, updatePid] = React.useState("");
    const [title, updateTitle] = React.useState("");
    const [content, updateContent] = React.useState("");
    const [posterId, updatePosterId] = React.useState("");
    const [posterUid, updatePosterUid] = React.useState("");
    const [upVotes, updateUpvotes] = React.useState([]);
    const [downVotes, updateDownvotes] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    if(pid === '') {
        props.getPostData().then(postData => {
            console.log('IN FullPost')
            //console.log(postData);
            updatePid(postData.pid);
            if (pid === undefined) updatePid('');
            updateTitle(postData.title);
            updateContent(postData.content);
            updatePosterUid(postData.poster);
            updatePosterId(postData.displayName);
            updateUpvotes(postData.upVotes);
            updateDownvotes(postData.downVotes);
            //if (!(upVotes)) setUpvotes([]);
            //if (!(downVotes)) setDownvotes([]);
        });
    }

    if (refresh) {
        props.getPostData().then(postData => {
            console.log('IN FullPost')
            //console.log(postData);
            updatePid(postData.pid);
            if (pid === undefined) updatePid('');
            updateTitle(postData.title);
            updateContent(postData.content);
            updatePosterUid(postData.poster);
            updatePosterId(postData.displayName);
            updateUpvotes(postData.upVotes);
            updateDownvotes(postData.downVotes);
            setRefresh(false);
            //if (!(upVotes)) setUpvotes([]);
            //if (!(downVotes)) setDownvotes([]);
        });
    }

    const [modalVisible, setModalVisible] = React.useState(false);
    const openModal = () => {
        setModalVisible(true);
    }

    const castUpvote = () => {
        if (!(pid === undefined)) {
            setRefresh(true);
            props.castUpvote(pid);
        }
      };
    
      const castDownvote = () => {
        if (!(pid === undefined)) {
            setRefresh(true);
            props.castDownvote(pid);
        }
      };

    const getPostScore = () => {
        if (upVotes === undefined || downVotes === undefined) return 0;
        return upVotes.length - downVotes.length;
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        //console.log('Fetching posts in THE ZONE (Refresh)');
        props.getPostData().then(postData => {
            //console.log('IN FullPost')
            //console.log(postData);
            updatePid(postData.pid);
            if (pid === undefined) updatePid('');
            updateTitle(postData.title);
            updateContent(postData.content);
            updatePosterUid(postData.poster);
            updatePosterId(postData.displayName);
            updateUpvotes(postData.upVotes);
            updateDownvotes(postData.downVotes);
            if (!(upVotes)) setUpvotes([]);
            if (!(downVotes)) setDownvotes([]);
            setRefreshing(false);
        });
      }, []);

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
                            props.addUserToRadar(posterUid);
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
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    >
                <KeyboardAvoidingView>
                    <View style={styles.postContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                        <TouchableOpacity style={styles.posterContainer} onPress={openModal}>
                            <Text style={styles.posterText}>by {posterId}</Text>
                        </TouchableOpacity>
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>{content}</Text>
                        </View>
                        <View style={styles.utilsContainer}>
                            <View>
                                <TouchableOpacity onPress={() => {castUpvote()}}>
                                    <Image source={require('./../../../assets/redditUpvote.png')} style={styles.upVoteImage}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.voteText}>{getPostScore()}</Text>
                            <View style={{transform: [{ rotate: "180deg" }]}}>
                                <TouchableOpacity onPress={() => {castDownvote()}}>
                                    <Image source={require('./../../../assets/redditUpvote.png')} style={styles.downVoteImage}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button mode='contained' onPress={() => {props.backtoZone()}}>Back</Button>
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
    upVoteImage: {
        tintColor: "#1F6521",
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    downVoteImage: {
    tintColor: "#FF652F",
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
        width: 150,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
});