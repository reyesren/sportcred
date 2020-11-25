import {DebateQuestionsView} from "../../view/debate/DebateQuestionsView";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../navigation/AuthNavigator";
import DebateModel from "../../model/DebateModel";
import ACSModel from "../../model/ACSModel";

export const DebateQuestions = ({navigation}) => {
    const user = useContext(AuthContext)

    const [fetched, setFetched] = useState(false)
    const [questions, setQuestions] = useState({})
    const [acs, setAcs] = useState(0)

    const userLabel = ACSModel.getLabelFromAcs(acs)

    // const d = new Date(Date.now()); TODO use this in prod
    // d.setHours(0,0,0,0)

    const d = new Date(1606003200000);

    if (!fetched) {
        DebateModel.getQuestions(d.getTime().toString()).then(docs => {

            setQuestions(Object.entries(docs))
            ACSModel.getACS(user.uid).then(
                acsDoc => {
                    const m = acsDoc['acsHistory']
                    let array = Object.keys(m).map(k => m[k])
                    let sum = array.reduce((a,b) => a+b, 100)
                    setAcs(sum)
                    setFetched(true)
                }
            )
        })
    }

    /**
     *
     * @param args  (questionString, response, callback)
     */
    function saveResponse(...args) {
        DebateModel.saveResponse(user.uid, d.getTime().toString(), ...args);
    }

    return DebateQuestionsView({acs, questions, saveResponse, userLabel});
}