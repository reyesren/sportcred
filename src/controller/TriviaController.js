import React from 'react';
import TriviaLandingView from '../view/trivia/TriviaLandingView';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaChallenge from '../model/TriviaChallengeModel';
import {TriviaModel} from '../model/TriviaModel';

export const TriviaLanding = ({route, navigation}) => {
  const [userId, setUserId] = React.useState('');

  const goToTheZone = () => {
    navigation.navigate('The Zone');
  };

  const goToTriviaStartGameSolo = () => {
    navigation.navigate('TriviaStartGameController', {mode: 'solo'});
  };

  const goToHeadToHead = () => {
    navigation.navigate('TriviaHeadToHead');
  };

  const acceptChallenge = (challengerId, questions, challengerScore, challengeId) => {
    navigation.navigate('TriviaStartGameController', {
      mode: 'headIncoming',
      challengerId,
      questions,
      challengerScore,
      challengeId,
    });
  }

  const declineChallenge = (challengerId, questions, challengerScore, challengeId) => {
    TriviaChallenge.closeChallenge(challengerId, userId, challengeId)
  }

  const getChallenges = () => {
    const user = useContext(AuthContext);
    setUserId(user.uid);
    return TriviaChallenge.getIncomingChallenges(user.uid).then(async (challenge) => {
      //console.log(challenge._data);
      return await Object.keys(challenge._data).map(async (element) => {
        return {
          challengeId: element,
          challengerId: challenge._data[element].opDisplayName,
          questions: challenge._data[element].questions,
          challengerScore: challenge._data[element].score
        };
      });
    });
  }

  return TriviaLandingView({
    goToTriviaStartGame: goToTriviaStartGameSolo,
    goToHeadToHead,
    goToTheZone,
    acceptChallenge,
    declineChallenge,
    getChallenges
  });
};
