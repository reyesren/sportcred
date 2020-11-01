import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaLoadingScreenView from '../view/trivia/TriviaLoadingScreenView';
import TriviaModel from '../model/TriviaModel';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';

const TriviaLoadingScreenController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;

  const numOfQuestions = [0, 1];
  TriviaModel.getTriviaQuestions(numOfQuestions).then((results) => {
    console.log('results', results);
    results.forEach((element) => {
      delete element._ref;
    });
    route.questions = results;
    navigation.navigate('TriviaMainGameController', {
      questions: results,
      numOfQuestions: numOfQuestions.pop() + 1,
    });
  });

  return TriviaLoadingScreenView();
};

export default TriviaLoadingScreenController;
