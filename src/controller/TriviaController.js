import TriviaLandingView from '../view/trivia/TriviaLandingView';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';

export const TriviaLanding = ({route, navigation}) => {
  const user = useContext(AuthContext);

  const {msg} = route.params === undefined ? {} : route.params;
  return TriviaLandingView({navigation});
  // const goToTriviaStartGame = () => {
  //   navigation.navigate('TriviaStartGameController');
  // };
  //
  // return TriviaLandingView({goToTriviaStartGame});
};
