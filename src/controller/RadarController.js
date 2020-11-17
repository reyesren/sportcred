import React from "react";
import {RadarView} from "./../view/RadarView";
import UserModel from './../model/UserModel';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';

export const Radar = () => {

    return RadarView();
}

// async function printFiles () {
//     const files = await getFilePaths();
  
//     await Promise.all(files.map(async (file) => {
//       const contents = await fs.readFile(file, 'utf8')
//       console.log(contents)
//     }));
//   }

export function getRadarList() {
    const user = useContext(AuthContext);
    var idList = UserModel.userDocObj.radar_list;
    
    console.log('ID: ');
    console.log(UserModel.userDocObj.radar_list);
    return UserModel.getUserDoc(user.uid).then(async (doc) => {
        var docList = [];
        return await Promise.all(doc['radar_list'].map(async (id) => {
            const radarDoc = await UserModel.getUserDoc(id);
            docList.push(radarDoc);
        })).then(() => {
            return docList;
        });
    });
}