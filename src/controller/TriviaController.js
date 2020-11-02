import TriviaLandingView from '../view/trivia/TriviaLandingView';

export const TriviaLanding = ({route, navigation}) => {

  const goToTriviaStartGame = () => {
    navigation.navigate('TriviaStartGameController');
  };

  const goToHeadToHead = () => {
    navigation.navigate('TriviaHeadToHead');
  }

  return TriviaLandingView({goToTriviaStartGame, goToHeadToHead});
};
