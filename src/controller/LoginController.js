import UserModel from '../model/UserModel';
import LoginView from '../view/login/LoginView';

// this function should return your view. make sure you pass all callbacks / props to your view constructor.
export default function Login({navigation}) {
  function onUserLogin(credentials) {
    const {email, password} = credentials;
    UserModel.signInWithEmailAndPassword(
      email,
      password,
      () => {},
      console.log,
    );
  }

  function register() {
    navigation.navigate('Register');
  }

  return LoginView({onUserLogin, register});
}
