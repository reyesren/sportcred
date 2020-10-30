import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {TheZoneView} from '../view/theZone/theZoneView.js';

export const TheZone = ({route, navigation}) => {
    const user = useContext(AuthContext);
  
    function onSubmit(profileObj) {
      UserModel.getUserDoc(user.uid, profileObj, (doc) => {
          navigation.navigate('TheZoneView', doc);
      });
    }
  
    return TheZoneView({onSubmit});
};

export const getPostIds = () => {
  // TODO: should return a list of valid post ids
  return ['1'];
}