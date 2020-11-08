import {firestore} from '../firebase.js';

export default class TriviaChallenge {
    static triviaUserDataDocument = firestore()
        .collection('trivia')
        .doc('userData');

    /**
     * The schema of a TriviaChallenge document is as follows:
     *
     * {
     *     opAnswers:       a Map<questionId: int, answer: String>,
     *     opDisplayName:   a String,
     *     opUid:           a String,
     *     questions:       an Array of questionIds: int
     * }
     *
     * example:
     * {
     *      opAnswers: {
     *             0: "Michael Jordan",
     *             14: "Lebron James",
     *             23: "Michael Jordan",
     *             ...
     *      },
     *      opDisplayName: "Greg123",
     *      opUid: "opponentUid",
     *      questions: [0, 14, 23, 3, 6, 99, ...]
     * }
     *
     */

    /**
     * Retrieve a user's incoming challenges, where key = epoch timestamp
     *
     * Example:
     *
     * incoming_challenges = {
     *     1603746692: {
     *         opAnswers: {
     *             0: "Michael Jordan",
     *             99: "Lebron James",
     *             ...
     *         },
     *         opDisplayName: "Greg123",
     *         opUid: "opponentUid",
     *         questions: [0, 14, 23, 3, 6, 99, ...]
     *     }
     * }
     *
     * @param uid   String  Use user.uid
     * @returns  A user's incoming challenges.
     */
    static async getIncomingChallenges(uid: String) {
        return await this.triviaUserDataDocument
            .collection(uid)
            .doc('incoming_challenges')
            .get()
            .then((doc) => doc);
    }

    static async getPendingChallenges(uid: String) {
        return await this.triviaUserDataDocument
            .collection(uid)
            .doc('outgoing_challenges')
            .get()
            .then((doc) => doc);
    }

    /**
     * Send a head-to-head challenge to a user with challengeeUid.
     *
     * @param challengeeUid     String      use the uid of the user being challenged.
     * @param challengeObj      Object      The challenge object. Should contain fields "opAnswers": object, "opDisplayName": String, "opUid": String, "questions": array of ints
     * @param timestamp         String      epoch timestamp of when the challenge was sent
     * @param successCallback   function    callback function for when challenge is sent
     */
    static sendChallenge(challengeeUid: String, challengeObj: Object, timestamp: String, successCallback = () => {}) {
        this.triviaUserDataDocument
            .collection(challengeeUid)
            .doc('incoming_challenges')
            .update({
                [timestamp]: challengeObj,
            })
            .then(successCallback);
    }

    /**
     * Set pending challenge OBJ for user with challengerUid.
     *
     * @param challengerUid     String      use the uid of the user being challenged.
     * @param pendingObj        Object      The pending object. Should contain fields "opDisplayName": String, "opUid": String
     * @param timestamp         String      epoch timestamp of when the challenge was sent
     * @param successCallback   function    callback function for when challenge is sent
     */
    static setOutgoing(challengerUid: String, pendingObj: Object, timestamp: String, successCallback = () => {}) {
        this.triviaUserDataDocument
            .collection(challengerUid)
            .doc('outgoing_challenges')
            .update({
                [timestamp]: pendingObj,
            })
            .then(successCallback);
    }

    static closeChallenge(challengerUid: String, challengeeUid: String, docId: String, successCallback = () => {}) {
        this.triviaUserDataDocument
            .collection(challengeeUid)
            .doc('incoming_challenges')
            .update({
            [docId]: firestore.FieldValue.delete()
        }).then(
            this.triviaUserDataDocument.collection(challengerUid).doc('outgoing_challenges').update({
                [docId]: firestore.FieldValue.delete()
            }).then(successCallback)
        );
    }
}
