import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaResultView from '../view/trivia/TriviaResultsView';

const TriviaResultsController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;

  return TriviaResultView({score: route.params.score});
};

export default TriviaResultsController;
