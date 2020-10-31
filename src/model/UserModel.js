import { auth, firestore, storage } from '../firebase.js';
import React from 'react';
import RNFS from 'react-native-fs';

export default class UserModel {
  static userDocObj = {
    is_active: true,
    last_login: Date.now(),
    profile: {
      first_name: "",
      middle_name: "",
      last_name: "",
      displayName: "",
      about: ""
    },
    profile_completed: false,
    questionnaire_completed: false,
    questionnaire_responses: {}
  };
  static userCollection = firestore().collection('users');

  static async updateLoginTime(uid: string) {
    await this.userCollection.doc(uid).update({last_login: Date.now()});
  }

  static async updateProfilePicture(filepath: string, uid: string, success, failure) {
    let reference = storage().ref(`profile_pictures/${uid}`);
    const data = await RNFS.readFile(filepath, 'base64');
    await reference.putString(data, 'base64').catch((error) => failure(error));
    const url = await reference.getDownloadURL().catch((error) => failure(error));

    auth().currentUser.updateProfile({
      photoURL: url
    }).then(success()).catch((error) => failure(error));
  }

  /**
   *  Returns user object. Refer to firebase for schema
   *
   * @param uid
   * @returns {{}} userobject
   */
  static async getUserDoc(uid: string) {
    return this._fetchUserDoc(uid).then(() => this.userDocObj).catch();
  }

  static async _fetchUserDoc(uid: string) {
    await this.userCollection.doc(uid).get().then(
        (doc) => {
          this.userDocObj = doc.data();
        }
    );
  }


  /**
   * Which first time tasks are required to be complete.
   * 2 = questionnaire and profile biography
   * 1 = profile biography
   * 0 = user is ready
   *
   * @param uid
   * @returns {number}
   */
  static async firstTimeLoginChecks(uid: string) {

    await this.userCollection.doc(uid).get().then(
        (docSnapshot) => {
          if (!docSnapshot.exists) {
            UserModel.createNewUserDoc(uid);
          }
        }
    );

    await this._fetchUserDoc(uid);
    console.log("User doc obj:\n" + JSON.stringify(this.userDocObj, null, 2));
    let stack = [];

    if (!this.userDocObj.questionnaire_completed)
      stack.push("Questionnaire");
    if (!this.userDocObj.profile_completed)
      stack.push("ProfileSetup");

    stack.push("TheZoneView");

    return stack
  }

  static createNewUserDoc(uid: string, callback = () => {}) {
    this.userCollection.doc(uid).set(this.userDocObj).then(callback());
  }

  static updateProfile(uid: string, profile, callback = (doc) => {}) {
    this.userCollection.doc(uid).update({profile: profile}).then(() => {
      this.userCollection.doc(uid).update({profile_completed: true}).then(async () => {
        await this._fetchUserDoc(uid).then(
            callback(this.userDocObj)
        );
      });
    });
  }

  static updateQuestionnaire(uid: string, questionnaire, callback = () => {}) {
    this.userCollection.doc(uid).update({questionnaire_responses: questionnaire}).then(() => {
      this.userCollection.doc(uid).update({questionnaire_completed: true}).then(async () => {
        await this._fetchUserDoc(uid).then(
            callback()
        );
      })
    });
  }

  /**
   * Register a user with email/password.
   *
   * @param email         {string}    User email
   * @param password      {string}    User password (safe to use plaintext)
   * @param success     {function}    Success callback (should be no params)
   * @param failure     {function}    Failure callback (single param). Format should be failure(error: Object). Error object contains a "code" field of type String. e.g. error.code may return 'auth/invalid-email'
   */
  static createUserWithEmailAndPassword(email, password, success, failure) {
    auth()
      .createUserWithEmailAndPassword(email, password, success, failure)
      .then(() => {
        success();
      })
      .catch((error) => {
        failure(error);
      });
  }

  /**
   * Once successfully created and/or signed in, any onAuthStateChanged listeners will trigger an event with the user parameter being a null value.
   *
   * @param {function}    success    Optional callback function (no params).
   */
  static signOut(success = null) {
    auth()
      .signOut()
      .then(() => {
        typeof success === 'function' && success(); // optional callback
      });
  }

  /**
   * WIP____________ [Sign a user in with email/password.].
   *
   * @param email         {string}    User email
   * @param password      {string}    User password (safe to use plaintext)
   * @param success     {function}    Success callback (should be no params)
   * @param failure     {function}    Failure callback (single param). Format should be failure(error: Object). Use "error.code" and "error.message"
   */
  static signInWithEmailAndPassword(email, password, success, failure) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        success();
      })
      .catch((error) => {
        failure(error);
      });
  }

  static getAuthSubscriber(onAuthStateChanged) {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }

  static async getRegisteredUsers(offset: number, limit: number) {
    return await this.userCollection
        .where("profile_completed", "==", true)
        .where("questionnaire_completed", "==", true)
        .orderBy('last_login')
        .startAfter(offset)
        .limit(limit)
        .get();
  }
}
