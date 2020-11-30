import React, {useState} from 'react';
import {RadarView} from '../view/Radar/RadarView';
import UserModel from './../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {useFocusEffect} from '@react-navigation/core';
import RadarAddUser from '../view/Radar/RadarAddUser';

const RadarAddToUserController = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const [users, setUsers] = useState({});

  const DATA = {
    0: {profile: {displayName: 'Kevin'}},
    1: {profile: {displayName: 'Renzo'}},
    2: {profile: {displayName: 'Ian'}},
    3: {profile: {displayName: 'Victor'}},
    4: {profile: {displayName: 'Farhan'}},
  };

  useFocusEffect(
    React.useCallback(() => {
      UserModel.getRegisteredUsers(0, 9999).then((result) => {
        console.log('result', result);
        setUsers(result.docs);

        console.log('docs', result.docs);
      });
    }, []),
  );

  const goBack = () => {
    navigation.back();
  };

  const addUser = (uid) => {
    UserModel.updateRadarList(user.uid, uid);
  };

  return RadarAddUser({users, addUser});
};

export default RadarAddToUserController;
