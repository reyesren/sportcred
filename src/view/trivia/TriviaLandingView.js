import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import Text from 'react-native-paper/src/components/Typography/Text';
import {Button, TextInput, Title} from 'react-native-paper';
import {getChallenges, acceptChallenge, declineChallenge} from './../../controller/TriviaController';

const ChallengeNotification = (props) => {
  const styles = StyleSheet.create({
    notificationContainer: {
      marginHorizontal: 20,
      paddingVertical: 20,
      paddingHorizontal: 10, 
      backgroundColor: '#ddd',
      borderRadius: 15,
      marginVertical: 10,
      flex: 1,
      flexDirection: 'row'
    },
    challengeTextContainer: {
      flex: 2,
      margin: 10
    },
    challengeText: {
      fontSize: 17
    },
    buttonContainer: {
      flex: 1
    },
    opName: {
      fontWeight: 'bold'
    }
  });

  return (
    <>
    <View style={styles.notificationContainer}>
      <View style={styles.challengeTextContainer}>
        <Text style={styles.challengeText}>
          <Text style={styles.opName}>{props.challengerId}</Text> is challenging you to a trivia contest!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => {acceptChallenge(props.challengeId)}}>Accept</Button>
        <Button mode="contained" onPress={() => {declineChallenge(props.challengeId)}}>Decline</Button>
      </View>
    </View>
    </>
  );
};

const TriviaLandingView = (props) => {
  const styles = StyleSheet.create({
    button: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      marginBottom: 20,
    },
    logo: {
      width: '100%',
      height: 100,
      resizeMode: 'contain',
    },
    pad: {
      padding: 10,
      borderTopWidth: 3,
      margin: 20,
      marginBottom: 0,
    },
  });

  const challenges = getChallenges();

  function renderChallengeNotifications() {
    return challenges.map((challenge) => {
      return <ChallengeNotification 
              challengerId={challenge.challengerId} 
              challengeId={challenge.challengeId}
              key={challenge.challengeId} />;
      });
  }

  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Button onPress={() => props.goToTheZone()}>Back</Button>
          <Image
            style={styles.logo}
            source={require('./../../../assets/logo.png')}
          />
          <Title style={{padding: 50, alignSelf: 'center'}}>TRIVIA</Title>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() =>
              props.goToHeadToHead()
            }>
            HEAD-TO-HEAD
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => props.goToTriviaStartGame()}>
            SOLO
          </Button>
          <View style={styles.pad}></View>
          {renderChallengeNotifications()}
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default TriviaLandingView;
