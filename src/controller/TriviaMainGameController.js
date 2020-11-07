import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaMainGameView from '../view/trivia/TriviaMainGameView';
import TriviaChallengeModel from '../model/TriviaChallengeModel';
import UserModel from '../model/UserModel';
import TriviaModel from '../model/TriviaModel';

const TriviaMainGameController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;
  const numOfQuestions = route.params.numOfQuestions;

  const processResults = (score) => {
    if (route.params.mode === 'head') {
      console.log(
        'user being challenged UID: ',
        route.params.userToChallengeUid,
      );
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
    }

    if (route.params.mode === 'headIncoming') {
      // TODO
      console.log('Do something with the results of the incoming challenge');
      const date = Date.now();
      console.log('adding history for user ', user.uid);
      TriviaModel.addToUserHistory(
        user.uid,
        {
          acs: '?',
          mode: 'head to head',
          opponent: route.params.challengerUid,
          win: score > route.params.challengerScore,
        },
        date,
      );
      console.log('adding history for user ', route.params.challengerUid);
      TriviaModel.addToUserHistory(
        route.params.challengerUid,
        {
          acs: '?',
          mode: 'head to head',
          opponent: user.uid,
          win: route.params.challengerScore > score,
        },
        date,
      );
      console.log('deleting incoming and outgoing challenges');
      TriviaChallengeModel.closeChallenge(route.params.challengerUid, user.uid, route.params.challengeID,
          () => {});
    }
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
