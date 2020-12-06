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
                    gamesArr[i]['date'] = today;
                    gamesArr[i]['time'] = '7:00 PM'
                    gamesArr[i]['result'] = 0;
                    gamesArr[i]['userPick'] = 0;
                    id++;
                }
                return gamesArr;
            })
    }

    static getUserDailyPicks(uid, date) {
        return this.picksCollection
            .doc('userData')
            .collection(uid)
            .doc('dailyPicks')
            .get()
            .then(submittedPicksSs => {
                if(submittedPicksSs.get(date) == undefined) {
                    return this.createDocuments(uid).then(() => {
                        return [];
                    });
                }
                return submittedPicksSs.get(date);
            })
    }

    static updateUserDailyPicks(uid, date, picks,
                           callback = () => {console.log('Daily picks submitted for user: ', uid)})
    {
        this.picksCollection
            .doc('userData')
            .collection(uid)
            .doc('dailyPicks')
            .update({[date]: picks})
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
    static createDocuments(uid) {
        return this.picksCollection
            .doc('userData')
            .collection(uid)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log("I AM CREATING DOCS");
                    return this.picksCollection
                        .doc('userData')
                        .collection(uid)
                        .doc('dailyPicks')
                        .set({})
                }
            })
    }
}