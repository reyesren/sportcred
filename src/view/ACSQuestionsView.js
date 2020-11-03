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
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  CMTextfield,
  EditableText,
} from './../components/index.js';

const ACSQuestionsView = () => {

  const goToInfo = () => {};

  const styles = StyleSheet.create({
    selectedNavText: {
      fontSize: 24,
    },
    selectedNavButton: {
      padding: 5,
      flex: 1,
      backgroundColor: 'rgb(200,200,200)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navButton: {
      padding: 5,
      flex: 1,
      backgroundColor: 'rgb(34,150,243)',
    },
    navBarContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    introBody: {
      backgroundColor: Colors.white,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 80,
    },
    logo: {
      width: '100%',
      height: 100,
      resizeMode: 'contain',
    },
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    body: {
      backgroundColor: Colors.white,
      flex: 1,
      flexDirection: 'row',
    },
    textContainer: {
      paddingHorizontal: 24,
      marginTop: 32,
      marginBottom: 32,
      flex: 2,
    },
    questionInfoContainer: {
      paddingHorizontal: 24,
      marginTop: 32,
      marginBottom: 32,
      flex: 1,
      justifyContent: 'center',
    },
    isCorrectText: {
      color: '#0C7C0D',
      padding: 12,
      paddingBottom: 0,
      fontSize: 18,
    },
    pointsChangeText: {
      color: '#0C7C0D',
      padding: 12,
      paddingTop: 0,
      fontSize: 18,
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
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <Image style={styles.logo} source={require('./../../assets/logo.png')}/>
          <View>
            <Text style={styles.titleText}>Profile</Text>
          </View>

          <View style={styles.navBarContainer}>
            <View style={styles.navButton}>
              <Button title="INFO" onPress={goToInfo}/>
            </View>
            <View style={styles.selectedNavButton}>
              <Text style={styles.selectedNavText}>ACS Questions</Text>
            </View>
          </View>

          <View style={styles.body}>
              <View style={styles.textContainer}>
                <Text style={styles.sectionTitle}>Question One</Text>
                <Text style={styles.sectionDescription}>
                  Answer one
                </Text>
              </View>
              <View style={styles.questionInfoContainer}>
                <Text style={styles.isCorrectText}>Correct</Text>
                <Text style={styles.pointsChangeText}>
                  +50
                </Text>
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ACSQuestionsView;
