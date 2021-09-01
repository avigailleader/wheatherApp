import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAMoPftEJUOnX_jcWBXh0eszPkksWs28rA",
    authDomain: "weather-app11.firebaseapp.com",
    projectId: "weather-app11",
    storageBucket: "weather-app11.appspot.com",
    messagingSenderId: "838545975580",
    appId: "1:838545975580:web:7280c246e3a73113dcf2d9",
    measurementId: "G-XPZ8VFY562"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            return userCredential.user;
        });
    doSignInWithGoogle = () => {
        return new Promise((resolve, reject) => {
        let provider = new app.auth.GoogleAuthProvider();
        // provider.setCustomParameters({ prompt: "select_account" });
        this.auth.signInWithPopup(provider)
            .then((result) => {
                resolve (result.user);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                reject(error)
                // ...
              });
            })
    }

}

export default Firebase;