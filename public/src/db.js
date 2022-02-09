export default class Firebase {
    constructor(){
        this.connectFirebase();
    }

    connectFirebase() {
        const firebaseConfig = {
            apiKey: "AIzaSyBtJ3R8DWl26qtCXDQvCO0TU3dC5FRjj8s",
            authDomain: "velaumar-c0b81.firebaseapp.com",
            databaseURL: "https://velaumar-c0b81-default-rtdb.firebaseio.com",
            projectId: "velaumar-c0b81",
            storageBucket: "velaumar-c0b81.appspot.com",
            messagingSenderId: "12998876707",
            appId: "1:12998876707:web:c1de580b4006454ecc5b96"
        };
        
        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        }
}

window.app = new Firebase()