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
   * @params postData           [Object]
   *
   * format of postData parameter:
   * postData = {
   *    postTitle: "dafda"
   *    postContent: "adfdasf"
   *    posterId: (current uid of user on the app)
   * }
   *
   */
  static createNewPostDoc(postData) {
    postData.pid = (Date.now()).toString();
    this.setPostDocObj(postData);
    this.postCollection.doc(postData.pid).set(this.postDocObj).then((doc) => {
        console.log(this.postDocObj);
        console.log("Created new post!");
    })
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

  static async getUserRadarPosts(user) {
    return await this.postCollection
        .where('poster', '==', user)
        .get()
        .then();
  }

  static async getIdsHelper(radarList) {
    let radarPosts = [];
    for (let i = 0; i < radarList.length; i++) {
      let snapshot = await this.getUserRadarPosts(radarList[i]);
      snapshot.forEach((doc) => {
        radarPosts.push(doc.data()['pid']);
      })
    }
    console.log("getRPosts");
    console.log(radarPosts);
    return radarPosts;
  }


    /**
     * @params isRadar      [boolean] true if retrieving radar posts, false if retrieving
     *                                all posts
     *
     * @returns array of postDocObj
     */
  static async getAllPostIds() {
    const allPosts = await this.getAllPosts();
    const allPostIds = [];
    allPosts.forEach(post => {
        allPostIds.push(post.get("pid"));
    });
    return allPostIds;
  }

  static async getRadarPostIds(radarList) {
    const allPostIds = await this.getIdsHelper(radarList);
    return allPostIds;
  }

  static setPostDocObj(postData) {
    this.postDocObj.pid = postData.pid;
    this.postDocObj.title = postData.title;
    this.postDocObj.content = postData.content;
    this.postDocObj.poster = postData.poster;
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
  static async updateUpVotes(pid: string, uid) {
    const hasUpVoted = await this.checkIfVoted(pid, uid, 0);
    const hasDownVoted = await this.checkIfVoted(pid, uid, 1);
    if (!hasUpVoted && !hasDownVoted) {
      await this.addUpVote(pid, uid);
    } else if (!hasUpVoted && hasDownVoted) {
      await this.removeDownVote(pid, uid);
      await this.addUpVote(pid, uid);
    } else if (hasUpVoted && !hasDownVoted) {
        await this.removeUpVote(pid, uid);
    }
  }

  /**
   * Increases or decreases downvotes depending if a user has already downvoted or not
   *
   * @param pid       {string}       post uid
   * @param uid       {string}       post uid
   */
  static async updateDownVotes(pid: string, uid: string) {
    const hasUpVoted = await this.checkIfVoted(pid, uid, 0);
    const hasDownVoted = await this.checkIfVoted(pid, uid, 1);
    if (!hasDownVoted && !hasUpVoted) {
      await this.addDownVote(pid, uid);
    } else if (!hasDownVoted && hasUpVoted) {
      await this.removeUpVote(pid, uid);
      await this.addDownVote(pid, uid);
    } else if (hasDownVoted && !hasUpVoted) {
        await this.removeDownVote(pid, uid);
    }
  }

  static async addUpVote(pid, uid) {
    await this.postCollection.doc(pid).update(
            { upVotes: firestore.FieldValue.arrayUnion(uid) })
            .then(() => console.log("Upvote added!"))
            .catch();
  }

  static async removeUpVote(pid, uid) {
      await this.postCollection.doc(pid).update(
              { upVotes: firestore.FieldValue.arrayRemove(uid) })
              .then(() => console.log("Upvote removed!"))
              .catch();
  }

  static async addDownVote(pid, uid) {
    await this.postCollection.doc(pid).update(
        { downVotes: firestore.FieldValue.arrayUnion(uid) })
            .then(() => console.log("Downvote added!"))
            .catch();
    }

  static async removeDownVote(pid, uid) {
    await this.postCollection.doc(pid).update(
        { downVotes: firestore.FieldValue.arrayRemove(uid) })
            .then(() => console.log("Downvote added!"))
            .catch();
    }

  /**
   *
   * @param {string} pid: post id
   * @param {string} uid: user id to check
   * @param {int} which: 0 if checking upVotes, 1 if checking downVotes
   *
   * @return {bool} check: true if user is found, false if user not found
   */

  static async checkIfVoted(pid: string, uid: string, which) {
    let check = false;
    const post = await this.getPostDoc(pid);
    let votesArr;
    if (which === 0) {
      votesArr = post.upVotes;
    } else {
      votesArr = post.downVotes;
    }
    if (votesArr.includes(uid)) {
      check = true;
    }

    return check;
  }

}
