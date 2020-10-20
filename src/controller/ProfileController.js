// todo delete ExampleController

import ProfileView from '../view/ProfileView';

// this function should return your view. make sure you pass all callbacks / props to your view constructor.
const DisplayExample = ({navigation}) => {
  return ProfileView();
  //    pass the navigation param to your view, so your view can navigate to different views.
  //    e.g.
  //    navigation.navigate('Profile', { name: 'Jane' })
  //
  //    for more info see https://reactnative.dev/docs/navigation
};

function onTapProfilePicture() {}

// make sure to put all your business logic in the controller. Your view may contain callback functions as props

export default Profile;
