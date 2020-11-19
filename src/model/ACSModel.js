import {firestore} from '../firebase.js';
import React from 'react';

export default class ACSModel {
  acsDocObj = {
    acsHistory = {};     // object is map of key: value pairs where key is string, value is integer
  };
  static acsCollection = firestore().collection('acs');

  /**
   * Adds acsChange value to the current ACS score.
   * NOTE: does not return ACS Value; use getACSValue to get updated value.
   *
   * @params uid           [string]
   * @params acsChange     [number]
   *
   */
  static addToACS(uid: string, acsChange) {
    const dateKeyValue = _createKeyValueUsingDate();
    setACSDocObj(dateKeyValue, acsChange, uid);
    this.acsCollection.doc(uid).set(this.acsDocObj).then((doc) => {
        console.log(this.acsDocObj);
        console.log("Added to ACS!");
    })
  }

  /**
   *  Returns the ACS score of user uid
   *  Note: ACS cannot be under 100.
   * @params uid                [string] uid of user
   * @returns                   [number] acs score
   */
  static async getACSValue(uid: string) {
    const acsDoc = await this.acsCollection.doc(uid).get();
    const acsMap = acsDoc.data().acsHistory;
    const result = 100;

    for(const date in acsMap) {
        result += acsMap[date];
    }
    if(result < 100) {
        result = 100;
    }
    return result;
  }


  /**
   * Set the ACSDocObj by adding new entry {dateKeyValue: acsChange} to the current
   * map in firebase
   *
   * @params dateKeyValue    [number] date in milliseconds
   * @params acsChange       [number] delta acs change
   * @params uid             [string] uid of user updating acs
   *
   */
  static setACSDocObj(dateKeyValue, acsChange, uid) {
    this.acsCollection
        .doc(uid)
        .get()
        .then(doc => {
            this.acsDocObj = doc.data();
            this.acsDocObj.acsHistory[dateKeyValue] = acsChange;
        }
  }

   /**
    *  returns a value representing the current Date in milliseconds
    *
    *
    */
  static _createKeyValueUsingDate() {
    const dateAsId = Date.now();
    return dateAsKey;
  }
}
