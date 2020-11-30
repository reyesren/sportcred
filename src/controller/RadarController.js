import React, {useState} from 'react';
import {RadarView} from '../view/Radar/RadarView';
import UserModel from './../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import {useFocusEffect} from '@react-navigation/core';

export const Radar = ({route, navigation}) => {
  const user = useContext(AuthContext);
  const [docList, setDocList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setDocList([]);
      UserModel.getUserDoc(user.uid).then((doc) => {
        let tempDoc = [];
        doc.radar_list.map((id) => {
          UserModel.getUserDoc(id).then((radarDoc) => {
            setDocList((prevState) => prevState.concat(radarDoc));
          });
        });
      });
    }, []),
  );

  const goToAddUser = () => {
    navigation.navigate('Radar Add User');
  };

  return RadarView({docList, goToAddUser});
};
