import {View} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';

const TriviaStartGameView = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 100,
      }}>
      <Button mode="contained" onPress={() => props.goToTriviaLoadingScreen()}>
        Start Trivia!
      </Button>
    </View>
  );
};

export default TriviaStartGameView;
