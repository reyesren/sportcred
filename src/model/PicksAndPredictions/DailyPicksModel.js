import {firestore} from '../../firebase.js';
import React from 'react';

export default class DailyPicksModel {
    static picksCollection = firestore()
        .collection('picks_predictions');

    static getGamesToday(today) {
         return this.picksCollection
            .doc('daily')
            .get()
            .then(gamesTodaySs => {
                let gamesArr = gamesTodaySs.get(today);
                let id = 0;
                for(let i = 0; i < gamesArr.length; i++) {
                    gamesArr[i]['id'] = id.toString();
                    gamesArr[i]['date'] = new Date();
                    gamesArr[i]['result'] = 0;
                    gamesArr[i]['userPick'] = 0;
                    id++;
                }
                return gamesArr;
            })
    }

    static isDailyPicksEmpty(uid, date) {
        return this.picksCollection
            .doc('userData')
            .collection(uid)
            .doc('dailyPicks')
            .get()
            .then(submittedPicksSs => {
                if(submittedPicksSs.get(date) == null) {
                    return true;
                }
                return false;
            })
    }

//    /**
//     *
//     * @param uid
//     * @param date
//     * @returns {Promise<Object>}
//     */
    static getPicksForToday(uid: string, date: string) {
        return this.picksCollection
            .doc('userData')
            .collection(uid)
            .doc('dailyPicks')
            .get()
            .then(gamesSs => {
                return gamesSs.get(date);
            })
    }

    /**
     * Submit user's daily pick predictions for a given date
     * structure of picks object to pass looks like:
     * examplePicks = {
     *  gameId1: {
     *      loserSelected: String
     *      winnerSelected: String
     *  }
     *  gameId2: {
     *      loserSelected: String
     *      winnerSelected: String
     *  }
     * }
     * where gameId1/gameId2 are ids of game docs
     * use findGamesForDay to find game ids
     *
     * @param uid
     * @param date
     * @param picks
     * @param callback
     */
    static setupUserDailyPicks(uid, date, picks,
                           callback: Function = () => {console.log('Daily picks submitted for user: ', uid)})
    {
        this.picksCollection
            .doc('userData')
            .collection(uid)
            .doc('dailyPicks')
            .set({[date]: picks})
            .then(callback)
            .catch(reason => {
                console.log(reason)
            })
    }

    /**
     *
     * @param uid
     * @returns {Promise<void>}
     */
    static createDocuments(uid: string) {
        return this.userDataDocument
            .collection(uid)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return this.userDataDocument
                        .collection(uid)
                        .doc('dailyPicks')
                        .set({})
                }
            })
    }

}