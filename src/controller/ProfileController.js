import ProfileView from '../view/ProfileView';
import ImagePicker from 'react-native-image-picker';

export const Profile = ({route, navigation}) => {

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

        setProfilePic(source);
        setPictureChange(true);
      }
    });
  }

  return ProfileView({profilePicChange});
};
// make sure to put all your business logic in the controller. Your view may contain callback functions as props
