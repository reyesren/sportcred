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

        let today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        today = `${year}-${month}-${day}`;

        return DailyPicksModel.getUserDailyPicks(user.uid, today).then(async (gamesArr) => {
            if(gamesArr.length === 0) {
                let gamesToday = await DailyPicksModel.getGamesToday(today);
                console.log(gamesToday);
                await DailyPicksModel.updateUserDailyPicks(user.uid, today, gamesToday);
               return(gamesToday);
            }
            else {
               return gamesArr;
            }
        })
        // TODO: comment out this return statement for the real one
        // return [{
        //     id: '0',
        //     team1: 'Los Angeles Lakers',
        //     team2: 'Miami Heat',
        //     date: new Date(2020, 10, 18, 12, 0, 0, 0),
        //     result: 0,
        //     userPick: 0
        // }];
    };

    const getPreviousMatchData = () => {
        // TODO: return a list of previous days matches
        // structure similar to getTodayMatchData

        let dateToPass = new Date();
        const day = dateToPass.getDate() - 1;
        const month = dateToPass.getMonth() + 1;
        const year = dateToPass.getFullYear();

        dateToPass = `${year}-${month}-${day}`;

        return DailyPicksModel.getUserDailyPicks(user.uid, dateToPass).then(gamesArr => {
            console.log(gamesArr);
           return gamesArr;
        })
        // TODO: comment out this return statement for the real one
        // return [{
        //     id: '0',
        //     team1: 'Los Angeles Lakers',                         
        //     team2: 'Miami Heat',
        //     date: new Date(2020, 10, 18, 12, 0, 0, 0),
        //     result: 1,    
        //     userPick: 1
        // },
        // {
        //     id: '1',
        //     team1: 'Los Angeles Lakers',                         
        //     team2: 'Miami Heat',
        //     date: new Date(2020, 10, 18, 12, 0, 0, 0),
        //     result: 2,    
        //     userPick: 1
        // }];
    }

    const updateMatchDataDatabase = (matchData) => {
        // TODO: takes input matchData (see above for structure) and updates firestore
        let dateToPass = new Date();
        const day = dateToPass.getDate();
        const month = dateToPass.getMonth() + 1;
        const year = dateToPass.getFullYear();

        dateToPass = `${year}-${month}-${day}`;

        const gameID = matchData.id;
        DailyPicksModel.getUserDailyPicks(user.uid, dateToPass).then(async (gamesArr) => {
            gamesArr[gameID] = matchData;
            await DailyPicksModel.updateUserDailyPicks(user.uid, dateToPass, gamesArr);
        });
    }
    
    
    // NOTE: SHOULD ALWAYS STORE ALL LOGOS POSSIBLE
    const teamLogos = {
        'Los Angeles Lakers': require('./../../../assets/teamLogos/los_angeles_lakers.png'),
        'Miami Heat': require('./../../../assets/teamLogos/miami_heat.png'),
        /*
        'Atlanta Hawks': require('./../../../assets/teamLogos/atlanta_hawks.png'),
        'Boston Celtics': require('./../../../assets/teamLogos/boston_celtics.png'),
        'Brooklyn Nets': require('./../../../assets/teamLogos/brooklyn_nets.png'),
        'Charlotte Hornets': require('./../../../assets/teamLogos/charlotte_hornets.png'),
        'Chicago Bulls': require('./../../../assets/teamLogos/chicago_bulls.png'),
        'Cleveland Cavaliers': require('./../../../assets/teamLogos/cleveland_cavaliers.png'),
        'Dallas Mavericks': require('./../../../assets/teamLogos/dallas_mavericks.png'),
        'Denver Nuggets': require('./../../../assets/teamLogos/denver_nuggets.png'),
        'Detroit Pistons': require('./../../../assets/teamLogos/detroit_pistons.png'),
        'Golden State Warriors': require('./../../../assets/teamLogos/golden_state_warriors.png'),
        'Houston Rockets': require('./../../../assets/teamLogos/houston_rockets.png'),
        'Indiana Pacers': require('./../../../assets/teamLogos/indiana_pacers.png'),
        */
        'unknown': require ('./../../../assets/teamLogos/unknown.png')
    }

    return DailyView({getPreviousMatchData, getTodayMatchData, updateMatchDataDatabase, teamLogos});
}
