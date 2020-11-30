import ProfileView from '../view/ProfileView';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../navigation/AuthNavigator';
import {useContext, useState} from 'react';
import UserModel from '../model/UserModel';
import ACSModel from '../model/ACSModel';

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

  const getACSScore = () => {
    return ACSModel.getACS(user.uid).then(
      acsDoc => {
          const m = acsDoc['acsHistory']
          let array = Object.keys(m).map(k => m[k])
          let sum = array.reduce((a,b) => a+b, 100)
          console.log(sum);
          return sum;
      }
    );
  }

  const getACSHistory = () => {
    return ACSModel.getACS(user.uid).then(
        async acsDoc => {
          const m = acsDoc['acsHistory']
          let dataObj = {};
          let acsArray = Object.values(m);
          let timeArray = Object.keys(m);
          for(let i = 1; i < acsArray.length; i++) {
            acsArray[i] = acsArray[i - 1] + acsArray[i];
          }
          dataObj['datasets'] = [{'data': acsArray}];
          dataObj['labels'] = timeArray;
          return dataObj;
        }
    )
  }

  if (!fetched) {
    UserModel.getUserDoc(user.uid).then((doc) => {
      setUserDoc(doc)
      setFetched(true)
    });
  }

  return ProfileView({profilePicChange, user, signOut, userDoc, setAboutMe, getACSScore, getACSHistory});
};
// make sure to put all your business logic in the controller. Your view may contain callback functions as props
