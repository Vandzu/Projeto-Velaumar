export default class Firebase {
    constructor(){
        this.connectFirebase();
    }

    connectFirebase() {
        const firebaseConfig = {

        };
        
        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        }
}

window.app = new Firebase()