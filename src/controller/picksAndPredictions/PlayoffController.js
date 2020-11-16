import React, {useContext, useEffect, useState} from "react";
import {PlayoffView} from "../../view/picksAndPredictions/PlayoffView";
import UnavailableView from "../../view/picksAndPredictions/UnavailableView";
import {AuthContext} from "../../navigation/AuthNavigator";
import PlayoffPicks from "../../model/PicksAndPredictions/PlayoffPicksModel";
import PicksAndPredictionsModel from "../../model/PicksAndPredictions/PicksAndPredictionsModel";

export const Playoff = ({navigation}) => {
    const user = useContext(AuthContext)
    const pickType = 'Playoff';

    // TODO replace teamData with queries
    // const eastTeams = {e1name: "Boston Celtics", e2name: "New York Knicks", e3name: "Toronto Raptors", e4name: "Chicago Bulls", e5name: "Milwaukee Bucks", e6name: "Miami Heat", e7name: "Brooklyn Nets", e8name: "Philadelphia 76ers"}
    // const westTeams = {w1name: "Denver Nuggets", w2name: "Golden State Warriors", w3name: "LA Clippers", w4name: "Los Angeles Lakers", w5name: "Sacramento Kings", w6name: "Houston Rockets", w7name: "New Orleans Pelicans", w8name: "San Antonio Spurs"}
    const locked = false;
    const picksCurrentlyOpen = true;

    const [picks, setPicks] = useState({});
    const [eastTeams, setEastTeams] = useState({})
    const [westTeams, setWestTeams] = useState({})
    const [fetched, setFetched] = useState(false)

    if (!fetched) {
        PlayoffPicks.getUserPicks(user.uid, 2020).then((doc) => {
            setPicks(doc)
            console.log("User picks fetched")
            PicksAndPredictionsModel.getPlayoffPredictions().then(doc => {
                const e = doc.east
                const w = doc.west
                console.log(doc)

                setEastTeams({e1name: e.team1, e2name: e.team2, e3name: e.team3, e4name: e.team4, e5name: e.team5, e6name: e.team6, e7name: e.team7, e8name: e.team8})
                setWestTeams({w1name: w.team1, w2name: w.team2, w3name: w.team3, w4name: w.team4, w5name: w.team5, w6name: w.team6, w7name: w.team7, w8name: w.team8})
                setFetched(true)
            })
        })
    }

    useEffect(() => {

    }, [picks])

    function submitPicksCallback(doc: Object) {
        PlayoffPicks.submitUserPicks(user.uid, 2020, doc)
    }


    if (picksCurrentlyOpen)
        return PlayoffView({locked, picks, teams: {eastTeams, westTeams}, submitPicksCallback});
    else
        return UnavailableView({pickType});
}