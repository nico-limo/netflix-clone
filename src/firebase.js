import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_G8mASBo3h3aOmBJvHtELaFjYZlkTwHQ",
    authDomain: "netflix-clone-7dd2f.firebaseapp.com",
    projectId: "netflix-clone-7dd2f",
    storageBucket: "netflix-clone-7dd2f.appspot.com",
    messagingSenderId: "260468108452",
    appId: "1:260468108452:web:3388be63f78606f8e44a31"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth, db };
