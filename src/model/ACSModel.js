import {firestore} from '../firebase.js';

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
        const key = "acsHistory." + Date.now()

        this.acsCollection
            .doc(uid)
            .update({[key]: delta})
            .then(callback)
            .catch(reason => {
                console.log(reason)
            })
    }

    /**
     *  Returns the ACS history of user uid
     *
     *  ex: acsHistory: {
     *          1606245184000: 50,
     *          1606245184001: -17
     *          }
     */
    static getACS(uid: string) {
        return this.acsCollection
            .doc(uid)
            .get()
            .then((ss) => {
                if (ss.exists) {
                    return ss.data()
                } else {
                    this._createAcsModel(uid).then()
                }

                return {acsHistory: {}};
            })
    }

    /**
     * private function
     */
    static _createAcsModel(uid: string) {
        return this.acsCollection
            .doc(uid)
            .set({acsHistory: {[Date.now()]: 0}}, {merge: true})
    }

    /**
     * Calculate user label
     *
     * @param acs number    elo
     *
     */
    static getLabelFromAcs(acs: number) {
        if (acs > 900)
            return 'expert'
        else if (acs > 600)
            return 'pro'
        else if (acs > 300)
            return 'analyst'
        else if (acs >= 100)
            return 'fanalyst'
        else
            return ''
    }
}
