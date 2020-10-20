import ProfileView from '../view/ProfileView';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../navigation/AuthNavigator'
import {useContext} from 'react';
import UserModel from '../model/UserModel';

export const Profile = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  function profilePicChange(setProfilePic, setPictureChange) {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        UserModel.updateProfilePicture(response.uri, user.uid, () => {console.log("success")}, console.log);
        setProfilePic(source);
        setPictureChange(true);
      }
    });
  }

  function signOut() {
    UserModel.signOut();
  }

  const userDoc = UserModel.getUserDoc(user.uid);

  return ProfileView({profilePicChange, user, signOut, userDoc});
};
// make sure to put all your business logic in the controller. Your view may contain callback functions as props
