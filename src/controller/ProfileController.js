import ProfileView from '../view/ProfileView';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../navigation/AuthNavigator';
import {useContext, useState} from 'react';
import UserModel from '../model/UserModel';

export const Profile = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(UserModel.userDocObj)
  const [fetched, setFetched] = useState(false)

  function profilePicChange(setProfilePic, setPictureChange) {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        UserModel.updateProfilePicture(
          response.uri,
          user.uid,
          () => {
            console.log('success');
          },
          console.log,
        ).then(()=>{});
        setProfilePic(source);
        setPictureChange(true);
      }
    });
  }

  function signOut() {
    UserModel.signOut();
  }

  const setAboutMe = (text) => {
    console.log('sending about to backend');
    UserModel.getUserDoc(user.uid).then((doc) => {
      //console.log('.then reached');
      var profile = doc.profile;
      profile.about = text;
      console.log(profile);
      UserModel.updateProfile(user.uid, profile);
    })
  }

  if (!fetched) {
    UserModel.getUserDoc(user.uid).then((doc) => {
      setUserDoc(doc)
      setFetched(true)
    });
  }

  return ProfileView({profilePicChange, user, signOut, userDoc, setAboutMe});
};
// make sure to put all your business logic in the controller. Your view may contain callback functions as props
