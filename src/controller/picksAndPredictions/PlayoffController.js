import React from "react";
import {PlayoffView} from "../../view/picksAndPredictions/PlayoffView";
import UnavailableView from "../../view/picksAndPredictions/UnavailableView";

export const Playoff = () => {
    const pickType = 'Playoff';

    // TODO replace testData with queries
    const testData = {
        "firstRound": {
            "eg1": "New York Knicks",
            "eg2": "Toronto Raptors",
            "eg3": "Milwaukee Bucks",
            "eg4": "Brooklyn Nets",
            "wg1": "Denver Nuggets",
            "wg2": "LA Clippers",
            "wg3": "Houston Rockets",
            "wg4": "New Orleans Pelicans"
        },
        "confSemis": {
            "eg1": "Toronto Raptors",
            "eg2": "Brooklyn Nets",
            "wg1": "LA Clippers",
            "wg2": "New Orleans Pelicans"
        },
        "confFinals": {
            "eg1": "Toronto Raptors",
            "wg1": "LA Clippers"
        },
        "nbaFinals": {
            "champion": "Toronto Raptors"
        }
    }
    const locked = false;
    const picksCurrentlyOpen = false;

    if (picksCurrentlyOpen)
        return PlayoffView({locked, picks: testData});
    else
        return UnavailableView({pickType});
}