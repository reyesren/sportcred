import * as React from 'react';
import UserModel from '../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';

export const TheZone = ({route, navigation}) => {
    const user = useContext(AuthContext);
  
    function onSubmit(profileObj) {
      UserModel.getUserDoc(user.uid, profileObj, (doc) => {
          navigation.navigate('TheZoneView', doc);
      });
    }
  
    return (
        <>
        </>
    );
};
