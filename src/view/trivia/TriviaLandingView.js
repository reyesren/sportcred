import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Title} from 'react-native-paper';

const TriviaLandingView = (props) => {
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
        onPress={() => props.goToHeadToHead()}>
        HEAD-TO-HEAD
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => props.goToTriviaStartGame()}>
        SOLO
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
});

export default TriviaLandingView;
