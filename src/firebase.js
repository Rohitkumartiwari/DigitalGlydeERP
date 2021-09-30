import firebase from "firebase/compat"
import "firebase/auth"
import "firebase/firestore"


var firebaseConfig = {
    apiKey: "AIzaSyBhZi1YCf7LfGQEIzFvP5OFThgbqJXfv7s",
    authDomain: "first-dig-project.firebaseapp.com",
    projectId: "first-dig-project",
    storageBucket: "first-dig-project.appspot.com",
    messagingSenderId: "140027518141", 
    appId: "1:140027518141:web:28a650aceef61c26e66bd4"
  };
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
   const auth=firebase.auth();
 export{db,auth};
 export default firebase;