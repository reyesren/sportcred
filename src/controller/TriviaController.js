import TriviaLandingView from '../view/trivia/TriviaLandingView';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {TriviaChallenge} from '../model/TriviaChallengeModel';
import {TriviaModel} from '../model/TriviaModel';

export const TriviaLanding = ({route, navigation}) => {
  const {msg} = route.params === undefined ? {} : route.params;

  const goToTriviaStartGame = () => {
    navigation.navigate('TriviaStartGameController');
  };

  return TriviaLandingView({goToTriviaStartGame});
};

export function getChallenges() {
  const user = useContext(AuthContext);
  const challenges = [];
  console.log(user.uid);
  // TriviaChallenge.getIncomingChallenges(user.uid).then((challenge) => {
  //   console.log(challenge);
  // });
  console.log(challenges);
  return [{challengeId: 'ajhfadljhfafj', 
           challengerId: 'challenger1', 
           time: '82358267'},
          {challengeId: 'ajhfadljhfafk', 
           challengerId: 'challenger2', 
           time: '82358267'}];
}

export function acceptChallenge(challengeId) {
  // TODO: accept trivia challenge
}
export function declineChallenge(challengeId) {
  // TODO: decline trivia challenge
}
