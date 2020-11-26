import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export function CreatePostView(props) {
  const [postTitle, setPostTitle] = React.useState('');
  const [postText, setPostText] = React.useState('');

  function submitPost() {
    props.submitPost(postTitle, postText);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <KeyboardAvoidingView>
            <View style={styles.postContainer}>
              <View style={styles.postTitle}>
                <TextInput
                  placeholder="Post Title"
                  value={postTitle}
                  onChangeText={setPostTitle}
                />
              </View>
              <View style={styles.postContent}>
                <TextInput
                  placeholder="Post content"
                  value={postText}
                  onChangeText={setPostText}
                  style={{minHeight: 200}}
                  multiline={true}
                  textAlignVertical="top"
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.submitButton}>
                <Button mode="contained" onPress={submitPost}>
                  Submit
                </Button>
              </View>
              <View style={styles.submitButton}>
                <Button
                  mode="contained"
                  onPress={() => {
                    props.navigation.pop();
                  }}>
                  Cancel
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  postTitle: {
    backgroundColor: '#ddd',
    margin: 10,
    marginBottom: 0,
    padding: 10,
    flex: 1,
    borderWidth: 3,
    borderColor: '#222629',
  },
  postContent: {
    backgroundColor: '#ddd',
    margin: 10,
    marginTop: 0,
    padding: 10,
    flex: 3,
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: '#222629',
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
    marginHorizontal: 50,
  },
});
