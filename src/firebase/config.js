import * as firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
import Cradentials from "../fireBaseCradentials"
console.log(Cradentials())

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: Cradentials().apiKey,
  authDomain: Cradentials().authDomain,
  databaseURL: Cradentials().databaseURL,
  projectId: Cradentials().projectID,
  storageBucket: Cradentials().storageBucked,
  messagingSenderId: Cradentials().messagingSenderID,
  appId: Cradentials().appID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialise firebase storage
const projectStorage = firebase.storage();
// initialise firebase ds
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp }