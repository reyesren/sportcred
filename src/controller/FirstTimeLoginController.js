import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {Loading} from '../view/firstTimeLogin/Buffer';
import {QuestionnaireView} from '../view/firstTimeLogin/QuestionnaireView';
import {ProfileSetupView} from '../view/firstTimeLogin/ProfileSetupView';

export const StartupCheck = ({route, navigation}) => {
  const user = useContext(AuthContext);
  // UserModel.signOut();
  check = UserModel.firstTimeLoginChecks(user.uid);
  // if (check === 2)
  navigation.navigate('Questionnaire');
  // else if (check === 1)
  //     navigation.navigate('ProfileSetup');
  // else
  //     navigation.navigate('ProfileView');

  return Loading();
};

export const Questionnaire = ({route, navigation}) => {
  const user = useContext(AuthContext);

  function onSubmit(responses) {
    const {q1, q2, q3, q4, q5, q6} = responses;
    UserModel.updateQuestionnaire(user.uid, responses);
    navigation.navigate('ProfileSetup');
  }

  return QuestionnaireView({onSubmit});
};

export const ProfileSetup = ({route, navigation}) => {
    const user = useContext(AuthContext);

    function onSubmit(profileObj) {
    UserModel.updateProfile(user.uid, profileObj);
    navigation.navigate('ProfileView');
  }

  return ProfileSetupView({onSubmit});
};
