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
  Image
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  CMTextfield,
  EditableText
} from './../components/index.js';

const ProfileView = () => {
    
  const styles = StyleSheet.create({
    introBody: {
      backgroundColor: Colors.white,
      flexDirection: 'row',
      alignItems: 'center',
    },
    profilePic: {
      alignSelf: 'flex-start',    
    },
    profileDescription: {
      paddingHorizontal: 24,
      marginTop: 32,
      marginBottom: 32,
      alignSelf: 'flex-end',
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

          <View style={styles.introBody}>
            <View>
              <Image style={styles.profilePic} source={require('./../../assets/defaultProfilePic.jpg')} />
            </View>
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

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Status</Text>
              <Text style={styles.sectionDescription}>
                Analyzing
              </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.sectionDescription}>
                I like baskets, I like balls, so here I am.
              </Text>
            </View>
          </View>

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
