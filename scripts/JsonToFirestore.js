const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyD7szggBjT7Pmx6TiiKq3CFJcrFlenYwSQ",
    authDomain: "347123575456-0b1vchah3lgs789tfkil9l86m3avekh6.apps.googleusercontent.com",
    projectId: "sportcred-1ee0b"
  });
  
var db = firebase.firestore();

var data = require('../data/coaches.json');


db.collection("picks_predictions").doc("preseason").update({2020: {coaches: data, players: []}}).then(() => {
    console.log("Document created");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});