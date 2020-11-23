import {DebateListView} from "../../view/debate/DebateListView";
import {AuthContext} from "../../navigation/AuthNavigator";
import React, {useContext, useEffect, useState} from "react";


export const DebateList = ({navigation}) => {
    const user = useContext(AuthContext)

    return DebateListView({});
}