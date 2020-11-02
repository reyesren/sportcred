import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';

const TriviaMainGameController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;
  const numOfQuestions = route.params.numOfQuestions;

  const goToResults = (score) => {
    navigation.navigate('TriviaResultsController', {score});
  };

  return TriviaMainGameView({
    questions: route.params.questions,
    numOfQuestions: route.params.numOfQuestions,
    goToResults,
  });
};

export default TriviaMainGameController;
