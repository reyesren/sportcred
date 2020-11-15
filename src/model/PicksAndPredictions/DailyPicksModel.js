import {firestore} from '../../firebase.js';
import React from 'react';

export default class DailyPicks {
    static userDataDocument = firestore()
        .collection('picks_predictions')
        .doc('userData')

    /**
     *
     * @param uid
     * @param date
     * @returns {Promise<Object>}
     */
    static getUserDailyPicks(uid: string, date: string) {
        return this.userDataDocument
            .collection(uid)
            .doc('dailyPicks')
            .collection('dates')
            .doc([date])
            .collection('games')
            .get()
            .then(gamesSs => {
                if (gamesSs.exists) {
                    return gamesSs.data()[date] === undefined ? {} : gamesSs.data()[date];
                } else {
                    // create dailyPicks doc
                    this.createDocuments(uid).then(this.getUserPicks(uid, year))
                }
                return {};
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
    static submitUserDailyPicks(uid: string, date: string, picks: Object,
                           callback: Function = () => {console.log('Daily picks submitted for user: ', uid)})
    {
        for (game in picks) {
            this.userDataDocument
                .collection(uid)
                .doc('dailyPicks')
                .collection('dates')
                .doc([date])
                .collection('games')
                .doc([`${game}`])
                .set({loserSelected: picks[loserSelected], winnerSelected: picks[winnerSelected]})
                .then(callback)
                .catch(error => {
                    console.log(error)
                })
        }
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