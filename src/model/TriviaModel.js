import { firestore } from '../firebase.js';
import React from 'react';

export default class TriviaModel {
    static triviaCollection = firestore().collection('trivia');
    static questionsCollection = this.triviaCollection.doc('questions').collection('01');
    static triviaUserDataDocument = this.triviaCollection.doc('userData');


    /**
     * Retrieve trivia questions from the database
     *
     * @param questionsToRetrieve   []      Example: [0,1,2,3,4,5,6,7,8,9,10]. (this will return 11 trivia questions with id 0 to 10.)
     * @returns {Promise<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]>} Array of trivia questions.
     */
    static getTriviaQuestions(questionsToRetrieve: []) {
        return this.questionsCollection.where("id", "in", questionsToRetrieve).get().then( ss => ss.docs );
    }

    /**
     *  Retrieve a user's trivia history
     *  The structure of this object is
     *  exampleHistory = {
     *      1603745609: {
     *          acs: -2,
     *          mode: "head-to-head",
     *          opponent: "opponentUid",
     *          win: false
     *      },
     *      160374888: {
     *          acs: 2,
     *          mode: "solo"
     *      }
     *  }
     *
     *  The "1603745609" numbers are UNIX timestamps. They represent a date and time.
     *
     * @param uid   string  use user.uid for this field.
     * @returns {Promise<FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>>} User history object.
     */
    static getUserHistory(uid: String) {
        return this.triviaUserDataDocument.collection(uid).doc('history').get().then(doc => doc);
    }

    /**
     * Add a game to the user's history.
     *
     * @param uid               String          use user.uid
     * @param historyObj        Object          Should include fields "acs", "mode", optionally ["opponent"], ["win"]
     * @param epochTimeStamp    String          The timestamp of the game in epoch form
     */
    static addToUserHistory(uid: String, historyObj: {}, epochTimeStamp: String) {
        this.triviaUserDataDocument.collection(uid).doc('history').update({[epochTimeStamp]: historyObj}).then(console.log);
    }

}