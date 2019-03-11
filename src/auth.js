import { auth } from './firebase.js';

const ui = new firebaseui.auth.AuthUI(auth);

// First Param is ID of element that will host the sign UI
// Second Param is the Object of Options
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    //where do we go on success
    signInSuccessUrl: './',
    //don't show google account chooser
    credentialHelper: firebaseui.auth.credentialHelper.NONE
});
