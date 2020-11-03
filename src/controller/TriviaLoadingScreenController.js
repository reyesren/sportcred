import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaLoadingScreenView from '../view/trivia/TriviaLoadingScreenView';
import TriviaModel from '../model/TriviaModel';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';

const TriviaLoadingScreenController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;

  const whichQuestionsToGet = ['0', '1', '2'];
  TriviaModel.getTriviaQuestions(whichQuestionsToGet).then((results) => {
    console.log('results', results);
    results.forEach((element) => {
      delete element._ref;
    });
    route.questions = results;
    navigation.navigate('TriviaMainGameController', {
      questions: results,
      numOfQuestions: 3,
      mode: route.params.mode,
      questionIds: whichQuestionsToGet,
      userToChallengeUid: route.params.userToChallengeUid,
    });
  });

  return TriviaLoadingScreenView();
};

export default TriviaLoadingScreenController;
