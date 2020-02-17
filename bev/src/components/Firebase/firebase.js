import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyCVKmDgAcXiqv1GXtU-ZHIeoGTNqbzuXbk",
    authDomain: "fir-a1979.firebaseapp.com",
    databaseURL: "https://fir-a1979.firebaseio.com",
    projectId: "fir-a1979",
    storageBucket: "fir-a1979.appspot.com",
    messagingSenderId: "456958979479",
    appId: "1:456958979479:web:6ed3835deae0ae465728d2",
    measurementId: "G-0NFNB1W8R1"
};

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth();
        this.db = app.database();
    }
    // **** Auth API ****

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();
                        // default empty roles 
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }
                        // merge auth and db user 
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        })

    // **** User API ****

    user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref('users')
}

export default Firebase;