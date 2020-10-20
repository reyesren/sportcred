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
    console.log('name is', name);
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
