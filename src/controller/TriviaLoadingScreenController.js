import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaLoadingScreenView from '../view/trivia/TriviaLoadingScreenView';
import TriviaModel from '../model/TriviaModel';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';

const TriviaLoadingScreenController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;
  const mode = route.params.mode;

  const generateTriviaQuestion = (numOfQuestions) => {
    let questions = [];
    for (let i = 0; i < numOfQuestions; i++) {
      while (true) {
        let genNumber = Math.floor(Math.random() * 48).toString();
        if (!questions.includes(genNumber)) {
          questions.push(genNumber);
          break;
        }
      }
    }
    return questions;
  };

  // let whichQuestionsToGet = ['0', '1', '2'];
  let whichQuestionsToGet = generateTriviaQuestion(3);
  if (mode === 'headIncoming') {
    console.log('questions ', route.params.questions);
    whichQuestionsToGet = route.params.questions;
  }

  TriviaModel.getTriviaQuestions(whichQuestionsToGet).then((results) => {
    console.log('results', results);
    results.forEach((element) => {
      delete element._ref;
    });
    navigation.navigate('TriviaMainGameController', {
      questions: results,
      numOfQuestions: whichQuestionsToGet.length,
      mode: route.params.mode,
      questionIds: whichQuestionsToGet,
      userToChallengeUid: route.params.userToChallengeUid,
      challengerUid: route.params.challengerUid,
      challengerScore: route.params.challengerScore,
      challengeID: route.params.challengeID,
    });
  });

  return TriviaLoadingScreenView();
};

export default TriviaLoadingScreenController;
