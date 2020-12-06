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
          const m = await acsDoc['acsHistory'];
          let dataObj = {};
          let acsArray = [];
          let timeArray = Object.keys(m).sort();
          let acsFinal;

          if(timeArray.length === 0) {
              acsFinal = [100];
              let date = new Date();
              let day = date.getDate();
              let month = date.getMonth() + 1;
              date = `${month}/${day}`;
              timeArray = [date];
          }
          else {
              acsArray.push(m[timeArray[0]]);
              for(let i = 1; i < timeArray.length; i++) {
                  acsArray[i] = acsArray[i - 1] + m[timeArray[i]];
              }

              acsFinal = acsArray.map(i => i + 100);

              for(let j = 0; j < timeArray.length; j++) {
                  let date = new Date(parseInt(timeArray[j]));
                  let day = date.getDate();
                  let month = date.getMonth() + 1;
                  date = `${month}/${day}`;
                  timeArray[j] = date;
              }
          }
          dataObj['datasets'] = [{'data': acsFinal}];
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
