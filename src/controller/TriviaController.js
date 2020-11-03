import TriviaLandingView from '../view/trivia/TriviaLandingView';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {TriviaChallenge} from '../model/TriviaChallengeModel';

export const TriviaLanding = ({route, navigation}) => {
  const {msg} = route.params === undefined ? {} : route.params;

  const goToTriviaStartGame = () => {
    navigation.navigate('TriviaStartGameController');
  };

  return TriviaLandingView({goToTriviaStartGame});
};

export function getChallenges() {
  const user = useContext(AuthContext);
  const challenges = TriviaChallenge.getChallenges(user.uid);
  console.log(challenges);
  return challenges;
}

export function acceptChallenge() {}
export function declineChallenge() {}
