import {firestore} from '../../firebase.js';
import React from 'react';

export default class PreseasonPicksModel {
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
            .doc('preseasonPicks')
            .get()
            .then(docSs => {
                if (docSs.exists) {
                    return docSs.data()[year] === undefined ? {} : docSs.data()[year];
                } else {
                    // create preseason doc
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
     * @param callback optional
     */
    static submitUserPicks(uid: string, year: string, picks: Object,
                           callback: Function = () => {console.log('Preseason picks submitted for user: ', uid)})
    {
        this.userDataDocument
            .collection(uid)
            .doc('preseasonPicks')
            .update({[year]: picks})
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
                        .doc('preseasonPicks')
                        .set({})
                }
            })
    }

}