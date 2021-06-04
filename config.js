import firebase from 'firebase';
require('@firebase/firestore');
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC4OBN2r8L0Mlcptj1CgC1C-JjQD8YiE5I",
    authDomain: "cycle-tracking-app.firebaseapp.com",
    projectId: "cycle-tracking-app",
    storageBucket: "cycle-tracking-app.appspot.com",
    messagingSenderId: "378088207764",
    appId: "1:378088207764:web:b2074a06c9932bcb3c8b81"
  };

   firebase.initializeApp(firebaseConfig);
export default firebase.firestore()
