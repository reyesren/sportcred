import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {Loading} from '../view/Buffer';
import {QuestionnaireView} from '../view/firstTimeLogin/QuestionnaireView';
import {ProfileSetupView} from '../view/firstTimeLogin/ProfileSetupView';
import {TheZoneView} from '../view/theZone/theZoneView.js';

export const StartupCheck = ({route, navigation}) => {
    const user = useContext(AuthContext);


    // UserModel.signOut();
    UserModel.firstTimeLoginChecks(user.uid).then((stack) => {
        console.log(stack);
        UserModel.getUserDoc(user.uid).then((doc) => {
            // console.log("DOC: --------- : ", JSON.stringify(doc));
            navigation.navigate(stack[0], {userDoc: doc});
        });
    });
    // navigation.navigate("ProfileView");
    return Loading();
};

export const Questionnaire = ({route, navigation}) => {
  const user = useContext(AuthContext);

  function onSubmit(responses) {
    const {q1, q2, q3, q4, q5, q6} = responses;
    UserModel.updateQuestionnaire(user.uid, responses, () => {
        navigation.navigate('ProfileSetup');
    });
  }

  return QuestionnaireView({onSubmit});
};

export const ProfileSetup = ({route, navigation}) => {
    const user = useContext(AuthContext);

    function onSubmit(profileObj) {
    UserModel.updateProfile(user.uid, profileObj, (doc) => {
        navigation.navigate('ProfileView', doc);
    });
  }

  return ProfileSetupView({onSubmit});
};

export const TheZone = ({route, navigation}) => {
  const user = useContext(AuthContext);

  function onSubmit(profileObj) {
  UserModel.updateProfile(user.uid, profileObj, (doc) => {
      navigation.navigate('TheZoneView', doc);
  });
}

return TheZoneView({onSubmit});
};