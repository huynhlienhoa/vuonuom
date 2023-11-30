import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js'

// Add Firebase products that you want to use
import { getDatabase, ref, get, set, child, onValue } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyA_IAI09FS2BUJ6Q_LJ_eK_Ue0PcJsds-A",
    authDomain: "vuonuom-53903.firebaseapp.com",
    databaseURL: "https://vuonuom-53903-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vuonuom-53903",
    storageBucket: "vuonuom-53903.appspot.com",
    messagingSenderId: "119014886509",
    appId: "1:119014886509:web:fd3224fa6371612818c364",
    measurementId: "G-2BB6PYB54Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
signInWithEmailAndPassword(auth, "huynhlienhoa2005@gmail.com", "123456")
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        var db = getDatabase(app);
        var controlRef = ref(db,'giatri/control');

        onValue(controlRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Login error please try again");
    });