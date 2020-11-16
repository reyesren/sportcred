import {firestore} from '../../firebase.js';
import React from 'react';

export default class PicksAndPredictionsGlobal {
    static collection = firestore()
        .collection('picks_predictions');

    /**
     * @returns {Promise<Object>}
     */
    static getDailyPredictions() {
        let dateObj = new Date();
        let date = dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getUTCDate();
        return this.collection
            .doc("daily")
            .get()
            .then(response => {
                return response.data()[date] === undefined ? {} : response.data()[date];
            })
    }

    /**
     * @returns {Promise<Object>}
     */
    static getPreseasonPredictions() {
        let dateObj = new Date();
        let year = dateObj.getUTCFullYear();
        return this.collection
            .doc("preseason")
            .get()
            .then(response => {
                return response.data()[year] === undefined ? {} : response.data()[year];
            })
    }

    /**
     * @returns {Promise<Object>}
     */
    static getPlayoffPredictions() {
        let dateObj = new Date();
        let year = dateObj.getUTCFullYear();
        return this.collection
            .doc("playoffs")
            .get()
            .then(response => {
                return response.data()[year] === undefined ? {} : response.data()[year];
            })
    }

}