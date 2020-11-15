import PlayerChooserView from '../../view/picksAndPredictions/PlayerChooserView';

const PlayerChooserController = ({route, navigation}) => {
  const goToPreSeasonController = () => {
    navigation.navigate('PreSeason');
  };

  const playerList = require('../../../assets/players.json');

  return PlayerChooserView({goBack: goToPreSeasonController, playerList});
};

export default PlayerChooserController;
