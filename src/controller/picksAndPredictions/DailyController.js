import React from "react";
import {DailyView} from "../../view/picksAndPredictions/DailyView";

export const Daily = () => {

    return DailyView();
}

export const getTodayMatchData = () => {
    /*  TODO: should return a list of matches today
        
        Each element of the list should be of the following format:
            {
                id: 'id'       // match object id
                team1: 'team1' // string with space separation between words
                team2: 'team2' // ditto
                date: Date     // should be a date for the match
                
                result: 0      // an int, 0 for undecided, 1 for team1, 1 for team2
                userPick: 0    // ditto
            }
    */
    //return [];
    return [{
        id: '0',
        team1: 'Los Angeles Lakers',                         
        team2: 'Miami Heat',
        date: new Date(2020, 10, 18, 12, 0, 0, 0),
        result: 0,    
        userPick: 0
    }];
  };

  export const getPreviousMatchData = () => {
    // TODO: return a list of previous days matches
    // structure similar to getTodayMatchData
    return [{
        id: '0',
        team1: 'los angeles lakers',                         
        team2: 'miami heat',
        date: new Date(2020, 10, 18, 12, 0, 0, 0),
        result: 1,    
        userPick: 1
    },
    {
        id: '1',
        team1: 'los angeles lakers',                         
        team2: 'miami heat',
        date: new Date(2020, 10, 18, 12, 0, 0, 0),
        result: 2,    
        userPick: 1
    }];
  }

  export const updateMatchDataDatabase = (matchData) => {
      // TODO: takes input matchData (see above for structure) and updates firestore
  }