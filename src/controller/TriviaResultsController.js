import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaResultView from '../view/trivia/TriviaResultsView';
import TriviaChallengeModel from '../model/TriviaChallengeModel';
import UserModel from '../model/UserModel';

const TriviaResultsController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;

  const goToTriviaLanding = () => {
    navigation.navigate('TriviaLandingController');
  };

  {
    /*
  const processResults = () => {
    if (route.params.mode === 'solo') {
      // todo
    }
    if (route.params.mode === 'head') {
      TriviaChallengeModel.sendChallenge(
        user.uid,
        {
          opAnswers: {},
          // opDisplayName: UserModel.getUserDoc(user.uid).profile.displayName,
          opDisplayName: 'test display name',
          opUid: 'test uid',
          questions: route.params.questionIds,
          score: route.params.score,
        },
        Date.now().toString(),
        () => {},
      );
    }
  };
  */
  }

  return TriviaResultView({
    score: route.params.score,
    goToTriviaLanding,
  });
};

export default TriviaResultsController;
