import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js'

// Add Firebase products that you want to use
import { getDatabase, ref, update, onValue, query, orderByChild , limitToLast } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

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

// control : {get,set}
// limit : {get,set}
// plot : {get}
export function firebase_init({username,pass,control, current, limit, plot}) {
    signInWithEmailAndPassword(auth, "vuonuom@gmail.com", "123456")
        .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;

            var db = getDatabase(app);

            // control
            var controlRef = ref(db,'giatri/control');

            onValue(controlRef, (snapshot) => {
                const data = snapshot.val();
                control.get(data);
            });
            control.set.f = ((key,value)=>{
                update(controlRef,{ [key]:value });
            });
            control.set.excute();

            // limit
            var limitRef = ref(db,'giatri/limit');

            onValue(limitRef, (snapshot) => {
                const data = snapshot.val();
                limit.get(data);
            });
            limit.set.f = ((key,value)=>{
                update(limitRef,{ [key]:value });
            });
            limit.set.excute();

            // current
            var currentRef = ref(db,'giatri/set/data');

            onValue(currentRef, (snapshot) => {
                const data = snapshot.val();
                current.get(data);
            });

            // plot
            const metricRef = query(ref(db, '/giatri/push/data'), orderByChild ('Ts'), limitToLast(100));
            onValue(metricRef,(snapshot) => {
                const data = [];
                snapshot.forEach((child) => {
                    data.push(child.val());
                });
                plot.get(data)
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Login error please try again");
        });
}
