import React, {useState} from 'react';
import UserModel from './../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {useFocusEffect} from '@react-navigation/core';
import RadarAddUser from '../view/Radar/RadarAddUser';

const RadarAddToUserController = ({route, navigation}) => {
  const thisUser = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setUsers([]);
      UserModel.getRegisteredUsers(0, 9999).then((result) => {
        UserModel.getUserDoc(thisUser.uid).then((doc) => {
          result.docs.forEach((user) => {
            if (!doc.radar_list.includes(user.id) && user.id !== thisUser.uid) {
              setUsers((prevState) => prevState.concat(user));
            }
            console.log('doc', doc);
          });
        });

        /*console.log('result', result);
        setUsers(result.docs);

        console.log('docs', result.docs);*/
      });
    }, []),
  );

  const addUser = (uid) => {
    UserModel.updateRadarList(thisUser.uid, uid, () => {
      navigation.goBack();
    });
  };

  return RadarAddUser({users, addUser});
};

export default RadarAddToUserController;
