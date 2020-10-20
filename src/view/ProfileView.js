/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  CMTextfield,
  EditableText
} from './../components/index.js';

const ProfileView = () => {

  const [promptingPictureChange, setPromptingPictureChange] = React.useState(true);

  const onProfilePicClick = () => {
    setPromptingPictureChange(false);
  }

  const cancelProfilePicChange = () => {
    setPromptingPictureChange(true);
  }

  const goToACSQuestions = () => {}
    
  const styles = StyleSheet.create({
    selectedNavText: {
      fontSize: 24
    },
    selectedNavButton: {
      padding: 5,
      flex: 1,
      backgroundColor: 'rgb(200,200,200)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    navButton: {
      padding: 5,
      flex: 1,
      backgroundColor: 'rgb(34,150,243)'
    },
    navBarContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    absoluteView: {
      flex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      zIndex: 10
    },
    introBody: {
      backgroundColor: Colors.white,
      flexDirection: 'row',
      alignItems: 'center',
    },
    profilePic: {
    },
    profileDescription: {
      paddingHorizontal: 24,
      marginTop: 32,
      marginBottom: 32,
    },
    titleText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 80
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
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
       
          <Image style={styles.logo} source={require('./../../assets/logo.png')} />
          <View>
            <Text style={styles.titleText}>Profile</Text>
          </View>

          <View style={styles.navBarContainer}>
            <View style={styles.selectedNavButton}>
              <Text style={styles.selectedNavText}>Info</Text>
            </View>
            <View style={styles.navButton}>
              <Button title='ACS QUESTIONS' onPress={goToACSQuestions}/>
            </View>
          </View>

          <View style={styles.introBody}>
          {promptingPictureChange ?          
            <View>
              <TouchableOpacity style={styles.btn} onPress={onProfilePicClick}>
                <View style={styles.absoluteView}>
                </View>
                <Image source={require('./../../assets/defaultProfilePic.jpg')}  style={styles.profilePic}/>
              </TouchableOpacity>
            </View>
            :
            <View>
              <Button title='CHANGE PROFILE PICTURE' />
              <Button title='CANCEL' onPress={cancelProfilePicChange}/>              
            </View>}
            <View style={styles.profileDescription}>
              <Text style={styles.sectionDescription}>
                <Text style={styles.highlight}>Username: </Text>
                greg123
              </Text>
              <Text style={styles.sectionDescription}>
                <Text style={styles.highlight}>ACS: </Text>
                500
              </Text>
            </View>
          </View>
          <EditableText textTitle='Status' />
          <EditableText textTitle='About Me' />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>ACS History</Text>
              <Text style={styles.sectionDescription}>
                Someone should replace me with a graph at some point.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileView;

