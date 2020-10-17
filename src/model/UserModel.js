import {auth} from "../firebase.js";
import React from 'react';


class UserModel {

    // TODO add user properties and mutators/accessors from firestore (not auth props)

    /**
     * Register a user with email/password.
     *
     * @param email         {string}    User email
     * @param password      {string}    User password (safe to use plaintext)
     * @param success     {function}    Success callback (should be no params)
     * @param failure     {function}    Failure callback (single param). Format should be failure(error: Object). Error object contains a "code" field of type String. e.g. error.code may return 'auth/invalid-email'
     */
    createUserWithEmailAndPassword(email, password, success, failure) {
        auth()
            .createUserWithEmailAndPassword(email, password, success, failure)
            .then(() => {
                success();
            })
            .catch(error => {
                failure(error);
            });
    }

    /**
     * Once successfully created and/or signed in, any onAuthStateChanged listeners will trigger an event with the user parameter being a null value.
     *
     * @param {function}    success    Optional callback function (no params).
     */
    signOut(success = null) {
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
    signInWithEmailAndPassword(email, password, success, failure) {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                success()
            })
            .catch((error) => {
                failure(error);
            })
    }


}
