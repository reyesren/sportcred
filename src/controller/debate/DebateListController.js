import {DebateListView} from "../../view/debate/DebateListView";
import {AuthContext} from "../../navigation/AuthNavigator";
import React, {useContext, useEffect, useState} from "react";
import DebateModel from "../../model/DebateModel";


export const DebateList = ({navigation}) => {
    const user = useContext(AuthContext)
    const [fetched, setFetched] = useState(false)
    const [list, setList] = useState([])


    // const d = new Date(Date.now()); TODO use this in prod
    // d.setHours(0,0,0,0)

    const d = new Date(1606003200000);




    if (!fetched) {
        console.log(d.getTime().toString())
        DebateModel.getAllResponses(d.getTime().toString()).then(docs => {
            setList(docs)
            setFetched(true)
        })
    }

    function addRating(opUid: string, raterUid: string, rating: number, questionId: string, callback = () => {}) {
        DebateModel.addRating(opUid, raterUid, rating, questionId, callback)
    }

    return DebateListView({list, addRating, user});
}