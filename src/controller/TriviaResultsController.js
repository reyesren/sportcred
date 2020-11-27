import React, {useContext, useState} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaResultView from '../view/trivia/TriviaResultsView';
import ACSModel from '../model/ACSModel';
import {useFocusEffect} from '@react-navigation/core';

const TriviaResultsController = ({route, navigation}) => {
  const [acs, setAcs] = useState();

  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;

  useFocusEffect(
    React.useCallback(() => {
      ACSModel.getACS(user.uid).then((acsDoc) => {
        const m = acsDoc.acsHistory;
        let array = Object.keys(m).map((k) => m[k]);
        let sum = array.reduce((a, b) => a + b, 100);
        setAcs(sum);
        console.log(sum);
      });
    }, []),
  );

  const addToAcs = (score) => {
    if (score > 0) {
      console.log('Adding to ACS...', score);
      ACSModel.addToACS(user.uid, score, () => {});
    }
  };

  const goToTriviaLanding = () => {
    navigation.navigate('TriviaLandingController');
  };

  return TriviaResultView({
    score: route.params.score,
    goToTriviaLanding,
    acs: acs,
    addToAcs,
  });
};

export default TriviaResultsController;
