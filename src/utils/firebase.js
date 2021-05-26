import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBluLFe7O2tZYfpgH4wwJ2pfThkWC64_fU",
    authDomain: "insta-clone-6e4ba.firebaseapp.com",
    databaseURL: "https://insta-clone-6e4ba-default-rtdb.firebaseio.com",
    projectId: "insta-clone-6e4ba",
    storageBucket: "insta-clone-6e4ba.appspot.com",
    messagingSenderId: "1034399655720",
    appId: "1:1034399655720:web:e637f0b55659b73d34921d",
    measurementId: "G-2Z5N7LDR6D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
