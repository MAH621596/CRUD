import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD_RPnU1bkBD2VBYX2xj9ppDFsEq5eFZBw",
    authDomain: "fir-crud-f81ea.firebaseapp.com",
    databaseURL: "https://fir-crud-f81ea-default-rtdb.firebaseio.com",
    projectId: "fir-crud-f81ea",
    storageBucket: "fir-crud-f81ea.appspot.com",
    messagingSenderId: "856883388937",
    appId: "1:856883388937:web:172573e3bb9a5ead890ed8",
    measurementId: "G-D8KJLHDKT0"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;