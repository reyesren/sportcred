import PlayerChooserView from '../../view/picksAndPredictions/PlayerChooserView';
import PreseasonPicksModel from '../../model/PicksAndPredictions/PreseasonPicksModel';
import {AuthContext} from '../../navigation/AuthNavigator';
import {useContext} from 'react';

const PlayerChooserController = ({route, navigation}) => {
  const user = useContext(AuthContext);

  const goToPreSeasonController = () => {
    navigation.navigate('PreSeason');
  };

  const playerList = require('../../../assets/players.json');

  const submitPicks = (whichAward, player, whichTeam) => {
    PreseasonPicksModel.getUserPicks(user.uid, 2020).then((result) => {
      console.log('result', result);
      console.log('result whichTeam', result[whichTeam]);
      if (result[whichTeam] === undefined) {
        console.log('setting whichTeam...', whichTeam);
        let award = {};
        award[whichAward] = player;
        result[whichTeam] = award;
      } else {
        let team = result[whichTeam];
        team[whichAward] = player;
        result[whichTeam] = team;
      }
      PreseasonPicksModel.submitUserPicks(user.uid, 2020, result, () => {});
    });
  };

  return PlayerChooserView({
    goBack: goToPreSeasonController,
    playerList,
    whichAward: route.params.whichAward,
    whichTeam: route.params.whichTeam,
    submitPicks,
  });
};

export default PlayerChooserController;
