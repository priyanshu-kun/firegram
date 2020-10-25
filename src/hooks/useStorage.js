import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';


const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

// this function run when it's file value is become true
  useEffect(() => {
    // take references of file
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');
    
    // put file on storage and listen state change event
    storageRef.put(file).on('state_changed', (snap) => {
      // track percentage of file uplodad
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      //if an error occur so the err
      setError(err);
    }, async () => {
      // if everything is file then download url
      const url = await storageRef.getDownloadURL();
      // set time stamp
      const createdAt = timestamp();
      // add url and timestame to the collection
      await collectionRef.add({ url, createdAt });
      // set url to url
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;