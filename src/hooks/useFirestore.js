import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

// create hook for getting documnet from firebase db
const useFirestore = (collection) => {
  // setting state that document we recive for db
  const [docs, setDocs] = useState([]);

  // create a useEffect hook (this callback will fire whenever collection is change)
  useEffect(() => {

    // use projectfirestore to reach into the collection
    const unsub = projectFirestore.collection(collection)
      // here I'll do that all data is shorted by it's data in decending order
      .orderBy('createdAt', 'desc')
      // .onSnapshot function will fire when anytime change into the collection is happen or it will fire initially
      .onSnapshot(snap => {
        // this "snap" is a object is it is represented that moment of time of database collection mean it look all document in collection that moment in time (this mean we listen realtime database )
        let documents = [];
        // this forEach loop run every documnet in the db array
        snap.forEach(doc => {
          // doc.data() mean we get data and it 's id in firebase db  and push to the documents array
          documents.push({ ...doc.data(), id: doc.id });
        });
        // set docs to document array
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { docs };
}

export default useFirestore;