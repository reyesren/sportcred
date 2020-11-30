import React from "react";
import {DailyView} from "../../view/picksAndPredictions/DailyView";
import DailyPicksModel from '../../model/PicksAndPredictions/DailyPicksModel';
import {useContext} from 'react';
import {AuthContext} from '../../navigation/AuthNavigator';

export const Daily = () => {
    const user = useContext(AuthContext);

    const getTodayMatchData = () => {
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
        let today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        today = `${year}-${month}-${day}`;

//        DailyPicksModel.isDailyPicksEmpty(user.uid, today).then(isEmpty => {
//            if(isEmpty) {
//                return DailyPicksModel.getGamesToday(today).then(gamesToday => {
//                    return DailyPicksModel.setupUserDailyPicks(user.uid, today, gamesToday).then(success => {
//                        console.log("THIS WORKED SUCCESSFULLY");
//                        console.log(gamesToday);
////                        return games;
//                    });
//                });
//            }

        DailyPicksModel.isDailyPicksEmpty(user.uid, today).then(async (isEmpty) => {
            if(isEmpty) {
                let gamesToday = await DailyPicksModel.getGamesToday(today);
                console.log(gamesToday);
                await DailyPicksModel.setupUserDailyPicks(user.uid, today, gamesToday);
            }
            else {
                DailyPicksModel.getPicksForToday(user.uid, today).then(games => {
                    console.log("THIS ALSO WORKED SUCCESSFULLY");
                    console.log(games);
//                    return games;
                })
            }
        })

        return [{
            id: '0',
            team1: 'Los Angeles Lakers',
            team2: 'Miami Heat',
            date: new Date(2020, 10, 18, 12, 0, 0, 0),
            result: 0,
            userPick: 0
        }];
    };

    const getPreviousMatchData = () => {
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

    const updateMatchDataDatabase = (matchData) => {
        // TODO: takes input matchData (see above for structure) and updates firestore
    }
    
    
    // NOTE: SHOULD ALWAYS STORE ALL LOGOS POSSIBLE
    const teamLogos = {
        'Los Angeles Lakers': require('./../../../assets/teamLogos/los_angeles_lakers.png'),
        'Miami Heat': require('./../../../assets/teamLogos/miami_heat.png'),
        'unknown': require ('./../../../assets/teamLogos/unknown.png')
    }

    return DailyView({getPreviousMatchData, getTodayMatchData, updateMatchDataDatabase, teamLogos});
}
