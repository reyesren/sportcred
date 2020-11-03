import TriviaLandingView from '../view/trivia/TriviaLandingView';

export const TriviaLanding = ({route, navigation}) => {
  const goToTriviaStartGameSolo = () => {
    navigation.navigate('TriviaStartGameController', {mode: 'solo'});
  };

  const goToHeadToHead = () => {
    navigation.navigate('TriviaHeadToHead');
  };

  return TriviaLandingView({
    goToTriviaStartGame: goToTriviaStartGameSolo,
    goToHeadToHead,
  });
};
