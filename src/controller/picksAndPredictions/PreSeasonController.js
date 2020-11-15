import React from 'react';
import {PreSeasonView} from '../../view/picksAndPredictions/PreSeasonView';

export const PreSeason = ({route, navigation}) => {
  const goToPlayerChooser = (whichAward) => {
    navigation.navigate('PlayerChooser', {whichAward});
  };

  return PreSeasonView({goToPlayerChooser});
};
