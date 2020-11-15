import PlayerChooserView from '../../view/picksAndPredictions/PlayerChooserView';

const PlayerChooserController = ({route, navigation}) => {
  const goToPreSeasonController = () => {
    navigation.navigate('PreSeason');
  };

  return PlayerChooserView({goBack: goToPreSeasonController});
};

export default PlayerChooserController;
