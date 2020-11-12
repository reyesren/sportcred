import React, {useContext, useEffect, useState} from "react";
import {PlayoffView} from "../../view/picksAndPredictions/PlayoffView";
import UnavailableView from "../../view/picksAndPredictions/UnavailableView";
import {AuthContext} from "../../navigation/AuthNavigator";
import PlayoffPicks from "../../model/PicksAndPredictions/PlayoffPicksModel";

export const Playoff = ({navigation}) => {
    const user = useContext(AuthContext)
    const pickType = 'Playoff';

    // TODO replace teamData with queries
    const eastTeams = {e1name: "Boston Celtics", e2name: "New York Knicks", e3name: "Toronto Raptors", e4name: "Chicago Bulls", e5name: "Milwaukee Bucks", e6name: "Miami Heat", e7name: "Brooklyn Nets", e8name: "Philadelphia 76ers"}
    const westTeams = {w1name: "Denver Nuggets", w2name: "Golden State Warriors", w3name: "LA Clippers", w4name: "Los Angeles Lakers", w5name: "Sacramento Kings", w6name: "Houston Rockets", w7name: "New Orleans Pelicans", w8name: "San Antonio Spurs"}
    const locked = false;
    const picksCurrentlyOpen = true;

    const [picks, setPicks] = useState({});
    const [fetched, setFetched] = useState(false)

    if (!fetched) {
        PlayoffPicks.getUserPicks(user.uid, 2020).then((doc) => {
            setPicks(doc)
            console.log("Fetched from firebase")
            setFetched(true)
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