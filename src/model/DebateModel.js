import {firestore} from "../firebase.js";


export default class DebateModel {
    static questionsDoc = firestore().collection('debate').doc('questions')
    static personalResponseCollection = firestore().collection('debate').doc('userData').collection('responses')
    static allResponsesCollection = firestore().collection('debate').doc('responses')


    /**
     *
     * @param date  number  The date in epoch ms at 00:00
     */
    static getQuestions(date: number) {
        return this.questionsDoc
            .get()
            .then(docSS => {
                return docSS.data()[date] === undefined ? {} : docSS.data()[date]
            })
    }

    static saveResponse(uid: string, questionId: string, questionString: string, response: string, callback = () => {}) {
        this.personalResponseCollection
            .doc(uid)
            .set({
                [questionId]: {
                    question: questionString,
                    ratings: {},
                    response: response
                }
            }, {merge: true})
            .then(() => {
                this.allResponsesCollection
                    .collection(questionId)
                    .doc(uid)
                    .set({response: response, question: questionString}, {merge: true})
                    .then(callback());

            })

    }

    static addRating(opUid: string, raterUid: string, rating: number, questionId: string, callback = () => {}) {

        const key = questionId + ".ratings." + raterUid
        this.personalResponseCollection
            .doc(opUid)
            .update(
                {
                    [key]: rating
                }
            ).then(callback())
    }

    static async getAllResponses(questionId: string) {
        const snapshot = await this.allResponsesCollection.collection(questionId).get()
        return snapshot.docs.map(doc => doc.data())
    }



}