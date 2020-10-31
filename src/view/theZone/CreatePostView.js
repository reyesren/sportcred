import * as React from 'react';
import { SafeAreaView, 
    StyleSheet, 
    ScrollView, 
    View, 
    Text, 
    StatusBar, 
    TextInput, 
    Button,
    KeyboardAvoidingView} from 'react-native';

import { Colors,} from 'react-native/Libraries/NewAppScreen';

export function CreatePostView({navigation}) {
    const [postTitle, setPostTitle] = React.useState('');
    const [postText, setPostText] = React.useState('');

    return (
        <>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView>
              <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                <KeyboardAvoidingView>
                    <View style={styles.postContainer}>
                        <View style={styles.postTitle}>
                            <TextInput defaultValue='Post Title' value={postTitle} onChangeText={setPostTitle} />
                        </View>
                        <View style={styles.postContent}>
                            <TextInput defaultValue='Post Title' value={postText} onChangeText={setPostText} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.submitButton}>
                            <Button title='Submit' onPress={() => {}} />
                        </View>
                        <View style={styles.submitButton}>
                            <Button title='Cancel' onPress={() => {navigation.pop()}} />
                        </View>
                    </View>
                </KeyboardAvoidingView>            
              </ScrollView>
          </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    postTitle: {
        backgroundColor: '#ccc',
        margin: 10,
        padding: 10,
        flex: 1,
    },
    postContent: {
        backgroundColor: '#ddd',
        margin: 10,
        padding: 10,
        flex: 3,
        minHeight: 200,
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    submitButton: {
        flex: 1,
        margin: 10,
        marginHorizontal: 50
    }
});