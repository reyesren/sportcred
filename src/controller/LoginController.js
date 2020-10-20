// todo delete ExampleController

import UserModel from '../model/UserModel';
import LoginView from '../view/login/LoginView';

// this function should return your view. make sure you pass all callbacks / props to your view constructor.
const DisplayExample = ({navigation}) => {
  onSubmit = (credentials) => {
    const {email, password} = credentials;
    UserModel.signInWithEmailAndPassword(email, password, () => {navigation.navigate('Profile')}, console.log);
  }
  register = () => {
    navigation.navigate('Register')
  }
  return LoginView({onUserLogin: onSubmit, register});
  //    pass the navigation param to your view, so your view can navigate to different views.
  //    e.g.
  //    navigation.navigate('Profile', { name: 'Jane' })
  //
  //    for more info see https://reactnative.dev/docs/navigation
};

function onTapProfilePicture() {}

// make sure to put all your business logic in the controller. Your view may contain callback functions as props

export default DisplayExample;
