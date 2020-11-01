import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';
import TriviaModel from '../model/TriviaModel';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import View from 'react-native';
import TriviaStartGameView from '../view/trivia/TriviaStartGameView';

const TriviaMainGameController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;
  const numOfQuestions = route.params.numOfQuestions;

  return TriviaMainGameView({
    questions: route.params.questions,
    numOfQuestions: route.params.numOfQuestions,
  });
};

export default TriviaMainGameController;
