import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import {Button} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {EditableText} from './../components/index.js';

const ProfileView = (props) => {
  const [promptingPictureChange, setPromptingPictureChange] = React.useState(
    true,
  );
  const [profilePic, setProfilePic] = React.useState({
    uri: props.user.photoURL,
  });

  const goToACSQuestions = () => {};

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.introBody}>
            {promptingPictureChange ? (
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setPromptingPictureChange(false)}>
                  <View style={styles.absoluteView} />
                  <Image source={profilePic} style={styles.profilePic} />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Button mode='contained' onPress={() =>
                    props.profilePicChange(
                      setProfilePic,
                      setPromptingPictureChange,
                    )
                  }>Change Profile Picture</Button>
                  <Button mode='contained' onPress={() => setPromptingPictureChange(true)}>Cancel</Button>
              </View>
            )}
            <View style={styles.profileDescription}>
              <Text style={styles.displayNameText}>
                {props.userDoc.profile.displayName}
              </Text>
              <Text style={styles.sectionDescription}>
                <Text style={styles.highlight}>ACS: </Text>
                500
              </Text>
            </View>
          </View>
          {/*<EditableText textTitle='Status' presetText{props.userDoc.profile.}/>*/}
          <EditableText
            textTitle="About Me"
            presetText={props.userDoc.profile.about}
          />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>ACS History</Text>
              <Text style={styles.sectionDescription}>
                Someone should replace me with a graph at some point.
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
            <Button mode='contained' onPress={() => props.signOut()}>Logout</Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  absoluteView: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  introBody: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50
  },
  profilePic: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  profileDescription: {
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 32,
    alignItems: 'center'
  },
  titleText: {
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 40,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  displayNameText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default ProfileView;
