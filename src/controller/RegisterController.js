//TODO fix register duplicate info bug.
//      Steps to reproduce: logout of a user with setup complete. Then register a new user. This new user will have the same userDoc as the old user.

import RegisterView from '../view/register/RegisterView';
import RegisterSuccessView from '../view/register/RegisterSuccessView';
import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';

export const Register = ({route, navigation}) => {
  const user = useContext(AuthContext);

  const {msg} = route.params === undefined ? {} : route.params;

  function onRegisterPress(userInfo) {
    const {name, username, email, password} = userInfo;
    UserModel.createUserWithEmailAndPassword(
      email,
      password,
      () => {},
      (error) => {
        navigation.navigate('Register', {msg: error.message});
      },
    );
  }

  return RegisterView({onUserRegistered: onRegisterPress, msg: msg});
};

export const RegisterSuccess = ({route, navigation}) => {
  function onWelcomePressed() {
    // navigation.navigate('Questionnaire', {name: 'Jane'})
    console.log('welcome pressed');
  }

  const {name, username, email} = route.params;

  return RegisterSuccessView({onWelcomePressed});
};

// make sure to put all your business logic in the controller. Your view may contain callback functions as props
