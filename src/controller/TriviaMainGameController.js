import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';
import TriviaChallengeModel from '../model/TriviaChallengeModel';
import UserModel from '../model/UserModel';

const TriviaMainGameController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;
  const numOfQuestions = route.params.numOfQuestions;

  const processResults = (score) => {
    console.log('user being challenged UID: ', route.params.userToChallengeUid);
    UserModel.getUserDoc(user.uid).then(
      (currUserDoc) => {
        console.log('user doc', currUserDoc);
        if (route.params.mode === 'solo') {
          // todo
        }
        if (route.params.mode === 'head') {
          TriviaChallengeModel.sendChallenge(
            route.params.userToChallengeUid,
            {
              opAnswers: {},
              opDisplayName: currUserDoc.profile.displayName,
              // opDisplayName: 'test display name',
              opUid: user.uid,
              questions: route.params.questionIds,
              score: score,
            },
            Date.now().toString(),
            () => {},
          );
        }
      },
      (error) => {
        console.log(
          'Firestore error: Does the challenged UID exist in trivia > userData?',
          error,
        );
      },
    );
  };

  const goToResults = (score) => {
    navigation.navigate('TriviaResultsController', {
      score,
      mode: route.params.mode,
      questionIds: route.params.questionIds,
    });
  };

  return TriviaMainGameView({
    questions: route.params.questions,
    numOfQuestions: route.params.numOfQuestions,
    goToResults,
    processResults,
  });
};

export default TriviaMainGameController;
