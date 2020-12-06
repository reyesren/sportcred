import {firestore} from '../../firebase.js';
import React from 'react';

export default class PlayoffPicks {
    static userDataDocument = firestore()
        .collection('picks_predictions')
        .doc('userData')

    /**
     *
     * @param uid
     * @param year
     * @returns {Promise<Object>}
     */
    static getUserPicks(uid: string, year: string) {
        return this.userDataDocument
            .collection(uid)
            .doc('playoffPicks')
            .get()
            .then(docSs => {
                if (docSs.exists) {
                    return docSs.data()[year] === undefined ? {} : docSs.data()[year];
                } else {
                    // create playoffPicks doc
                    this.createDocuments(uid).then(this.getUserPicks(uid, year))
                }
                return {};
            })
    }

    /**
     *
     * @param uid
     * @param year
     * @param picks
     * @param callback
     */
    static submitUserPicks(uid: string, year: string, picks: Object,
                           callback: Function = () => {console.log('Playoff picks submitted for user: ', uid)})
    {
        this.userDataDocument
            .collection(uid)
            .doc('playoffPicks')
            .set({[year]: picks})
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
                        .doc('playoffPicks')
                        .set({})
                }
            })
    }

}