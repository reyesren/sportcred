import React, {useContext, useState} from 'react';
import {PreSeasonView} from '../../view/picksAndPredictions/PreSeasonView';
import {AuthContext} from '../../navigation/AuthNavigator';
import PreseasonPicksModel from '../../model/PicksAndPredictions/PreseasonPicksModel';
import {useFocusEffect} from '@react-navigation/core';

export const PreSeason = ({route, navigation}) => {
  const [awards, setAwards] = useState({});
  const [fetched, setFetched] = useState(false);

  const user = useContext(AuthContext);

  const goToPlayerChooser = (whichAward, whichTeam) => {
    navigation.navigate('PlayerChooser', {whichAward, whichTeam});
  };
  /*if (!fetched) {
    PreseasonPicksModel.getUserPicks(user.uid, 2020).then((result) => {
      console.log('getting awards...', result);
      setAwards(result);
      setFetched(true);
    });
  }*/

  useFocusEffect(
    React.useCallback(() => {
      PreseasonPicksModel.getUserPicks(user.uid, 2020).then((result) => {
        console.log('getting awards...', result);
        setAwards(result);
      });
    }, []),
  );

  return PreSeasonView({goToPlayerChooser, awards});
};
