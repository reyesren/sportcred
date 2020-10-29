//TODO fix react hooks bug
// >>>
// Warning: React has detected a change in the order of Hooks called by Profile. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://fb.me/rules-of-hooks

import ProfileView from '../view/ProfileView';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../navigation/AuthNavigator'
import {useContext} from 'react';
import UserModel from '../model/UserModel';
import {Loading} from "../view/Buffer";

export const Profile = ({route, navigation}) => {

  const user = useContext(AuthContext);
  const {userDoc} = typeof route.params === "undefined" ? {} : route.params;

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
        UserModel.updateProfilePicture(response.uri, user.uid, () => {
          console.log("success")
        }, console.log);
        setProfilePic(source);
        setPictureChange(true);
      }
    });
  }

  function signOut() {
    UserModel.signOut();
  }

  if (userDoc === undefined) {
    UserModel.getUserDoc(user.uid).then((doc) => {
      navigation.navigate("Profile", {userDoc: doc});
    });
    return Loading();
  }

  return ProfileView({profilePicChange, user, signOut, userDoc});
};
// make sure to put all your business logic in the controller. Your view may contain callback functions as props
