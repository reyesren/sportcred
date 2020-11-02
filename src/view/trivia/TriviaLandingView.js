import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from 'react-native-paper/src/components/Typography/Text';
import {Button, TextInput, Title} from 'react-native-paper';
import {getChallenges} from './../../controller/TriviaController';

const ChallengeNotification = (props) => {
  const styles = StyleSheet.create({
    notificationContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20,
      paddingTop: 20,
      borderTopWidth: 3
    },
    challengeTextContainer: {
      flex: 2,
      flexDirection:'column'
    },
    challengeText: {
      fontSize: 17
    },
    buttonContainer: {
      flex:1,
      flexDirection: 'column'
    }
  });

  return (
    <>
    <View style={styles.notificationContainer}>
      <View style={styles.challengeTextContainer}>
        <Text style={styles.challengeText}>
          {props.challengerId} is challenging you to a trivia contest!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => {}}>Accept</Button>
          <Button mode="contained" onPress={() => {}}>Decline</Button>
      </View>
    </View>
    </>
  );
}


const TriviaLandingView = (props) => {
  //const challenges = getChallenges();
  const challenges = [{challengerId: 'challenger1', time: '82358267'}];

  function renderChallengeNotifications() {
    return challenges.map((challenge) => {
      return <ChallengeNotification 
              challengerId={challenge.challengerId} 
              key={challenge.challengerId} />;
      });
  }

  return (
    <View>
      <Image
        style={styles.logo}
        source={require('./../../../assets/logo.png')}
      />
      <Title style={{padding: 50, alignSelf: 'center'}}>TRIVIA</Title>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => console.log('SOLO')}>
        HEAD-TO-HEAD
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => props.goToTriviaStartGame()}>
        SOLO
      </Button>
      {renderChallengeNotifications()}
    </View>
  );
};

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
});

export default TriviaLandingView;
