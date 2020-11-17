import { auth, firestore, storage } from '../firebase.js';
import React from 'react';

export default class PostModel {
  postDocObj = {
    pid: "",        // pid = Date in milliseconds
    title: "",
    content: "",
    upVotes: [],
    downVotes: [],
    poster: ""
  };
  static postCollection = firestore().collection('posts');

  /**
   * Creates a new post. Used for adding posts into database.
   * Refer to firebase for schema.
   */
  createNewPostDoc(pid: string) {
    this.postCollection.doc(pid).set(this.postDocObj).then();
  }

  /**
   *  Returns array of post objects. Refer to firebase for schema
   *
   * @returns array of postDocObj
   */
  static async getAllPosts(callback = () => { }) {
    return await this.postCollection
      .orderBy('pid')
      .get()
      .then();
  }

  static async getAllPostIds(isRadar) {
    if(isRadar) {
        const allPosts = await this.getRadarPosts();
    } else {
        const allPosts = await this.getAllPosts();
    }
    const allPosts = await this.getAllPosts();
    const allPostIds = [];
    allPosts.forEach(post => {
        allPostIds.push(post.get("pid"));
    });
    return allPostIds;
  }

  /**
  * @param radarUsers: list of uids from radar list
  *
  * Returns Array<QueryDocumentSnapshot<T>>
  */

  static async getRadarPosts(radarUsers) {
    const radarPosts = [];
    for(user in radarUsers) {
        const radarPostsSS = await this.postCollection.where('poster', '==', user).get();
        radarPostsSS.forEach(doc => {
            radarPosts.push(doc);
        })
    }
    return radarPosts;
  }

//  /**
//   * Returns the current working postDocObj in PostModel.
//   *
//   */
//  static getPostDocObj() {
//    return this.postDocObj;
//  }

  static setPostDocObj({pid, title, content, poster}) {
    this.postDocObj.pid = pid;
    this.postDocObj.title = title;
    this.postDocObj.content = content;
    this.postDocObj.poster = poster;
  }

  /**
   *  Returns post object. Refer to firebase for schema
   *
   * @param pid
   * @returns {{}} userobject
   */
  static getPostDoc(pid: string) {
    return this.postCollection
        .doc(pid)
        .get()
        .then((doc) => {
            this.postDocObj = doc.data();
            return this.postDocObj;
        });
  }

  static async getRadarPosts(radarList) {
    const allRadarPosts = [];
    for(const user in radarList) {
        const radarPosts = await this.postCollection
                                    .where('poster', '==', user)
                                    .get();
        allRadarPosts.push(radarPosts);
    }
    return allRadarPosts;
  }

  /**
   * Updates the title of a post in database. Used on a postDocObj's pid.
   *
   * @param {string} pid
   * @param {string} title
   * @param {} callback
   */
   static updateTitle(pid, title) {
    this.postCollection.doc(pid).update({title: title})
        .then(() => console.log("UPDATED TITLE"))
        .catch();
  }

  /**
   * Updates the content of a post in database. Used on a postDocObj's pid .
   *
   * @param {string} pid
   * @param {string} content
   * @param {} callback
   */
  static updateContent(pid: string, content) {
    this.postCollection.doc(pid).update({content: content})
        .then(() => console.log("UPDATED CONTENT"))
        .catch();
  }

  /**
   * Adds user to post's upvotes array if they have not already upvoted before.
   * Removes user from upvotes array if they have and wish to remove upvote.
   * Used on a postDocObj's pid.
   *
   * @param pid       {string}       post uid
   * @param uid       {string}       user uid
   */
  static updateUpVotes(pid: string, uid) {
    const check = checkIfVoted(pid, uid, 0);
    if (check) {
      this.postCollection.doc(pid).update(
        { upVotes: admin.firestore.FieldValue.arrayUnion(uid) })
        .then(() => console.log("Upvote added!"))
        .catch();
    } else {
      this.postCollection.doc(pid).update(
        { upVotes: admin.firestore.FieldValue.arrayRemove(uid) })
        .then(() => console.log("Upvote removed!"))
        .catch();
    }
  }

  /**
   * Increases or decreases downvotes depending if a user has already downvoted or not
   *
   * @param pid       {string}       post uid
   * @param uid       {string}       post uid
   */
  static updateDownVotes(pid: string, uid: string) {
    const check = this._checkIfVoted(pid, uid, 1);
    if (check) {
      this.postCollection.doc(pid).update(
        { downVotes: admin.firestore.FieldValue.arrayUnion(uid) })
        .then(() => console.log("Downvote added!"))
        .catch();
    } else {
      this.postCollection.doc(pid).update(
        { downVotes: admin.firestore.FieldValue.arrayRemove(uid) })
        .then(() => console.log("Downvote removed!"))
        .catch();
    }
  }

  /**
   *
   * @param {string} pid: post id
   * @param {string} uid: user id to check
   * @param {int} which: 0 if checking upVotes, 1 if checking downVotes
   *
   * @return {bool} check: true if user is found, false if user not found
   */

  static _checkIfVoted(pid: string, uid: string, which) {
    let check = false;
    let votesArr = null;
    if (which === 0) {
      votesArr = getPostDoc(pid).upVotes;
    } else {
      votesArr = getPostDoc(pid).downVotes;
    }

    if (votesArr.find(uid)) {
      check = true;
    }

    return check;
  }

}
