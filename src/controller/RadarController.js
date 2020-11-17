import React from "react";
import {RadarView} from "./../view/RadarView";
import UserModel from './../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';

export const Radar = () => {

    return RadarView();
}

export function getRadarList() {
    const user = useContext(AuthContext);
    var idList = UserModel.userDocObj.radar_list;
    

    console.log('ID: ');
    console.log(UserModel.userDocObj.radar_list);
    var docList = [];
    UserModel.userDocObj.radar_list.forEach((id) => {
        UserModel.getUserDoc(id).then((doc) => {
            docList.push(doc);
        });
    });
    console.log(docList);
    return docList;
    // console.log(UserModel.userDocObj.radar_list)
    // return UserModel.userDocObj.radar_list;
}