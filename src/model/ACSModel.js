import {firestore} from '../firebase.js';
import React from 'react';

export default class ACSModel {
    static acsCollection = firestore().collection('acs');

    /**
     * Adds acsChange value to the current ACS score.
     * NOTE: does not return ACS Value; use getACSValue to get updated value.
     *
     * @params uid        string
     * @params delta      number
     *
     */
    static addToACS(uid: string, delta: number, callback = () => {}) {
        const key = Date.now()

        this.acsCollection
            .doc(uid)
            .update({[key]: delta})
            .then(callback)
            .catch(reason => {
                console.log(reason)
            })
    }

    /**
     *  Returns the ACS score of user uid
     *  Note: ACS cannot be under 100.
     */
    static getACS(uid: string) {
        return this.acsCollection
            .doc(uid)
            .get()
            .then((ss) => {
                if (ss.exists) {
                    return ss.data()
                } else {
                    this.createAcsModel(uid).then()
                }

                return {};
            })
    }

    static createAcsModel(uid: string) {
        return this.acsCollection
            .doc(uid)
            .set({}, {merge: true})
    }
}
