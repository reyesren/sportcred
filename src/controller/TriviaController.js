import React from 'react';
import TriviaLandingView from '../view/trivia/TriviaLandingView';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaChallenge from '../model/TriviaChallengeModel';
import {TriviaModel} from '../model/TriviaModel';

export const TriviaLanding = ({route, navigation}) => {
  const {msg} = route.params === undefined ? {} : route.params;

  const goToTriviaStartGame = () => {
    navigation.navigate('TriviaStartGameController');
  };

  const goToHeadToHead = () => {
    navigation.navigate('TriviaHeadToHead');
  }

  return TriviaLandingView({goToTriviaStartGame, goToHeadToHead});
};

export function getChallenges() {
  const user = useContext(AuthContext);
  const [challenges, setChallenges] = React.useState([]);
  TriviaChallenge.getIncomingChallenges(user.uid).then((challenge) => {
    setChallenges(Object.keys(challenge._data).map((element) => {
      return ({challengeId: element,
                       challengerId: challenge._data[element].opDisplayName});
    }));
  });
  return challenges;
}

export function acceptChallenge(challengeId) {
  // TODO: accept trivia challenge
}
export function declineChallenge(challengeId) {
  // TODO: decline trivia challenge
}
