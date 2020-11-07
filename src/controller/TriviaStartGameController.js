import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';
import TriviaModel from '../model/TriviaModel';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import View from 'react-native';
import TriviaStartGameView from '../view/trivia/TriviaStartGameView';

const TriviaStartGameController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;

  const goToTriviaLoadingScreen = () => {
    navigation.navigate('TriviaLoadingScreenController', {
      mode: route.params.mode,
      userToChallengeUid: route.params.userToChallengeUid,
      challengerUid: route.params.challengerUid,
      questions: route.params.questions,
      challengerScore: route.params.challengerScore,
      challengeID: route.params.challengeID,
    });
  };

  return TriviaStartGameView({goToTriviaLoadingScreen});
};

export default TriviaStartGameController;
