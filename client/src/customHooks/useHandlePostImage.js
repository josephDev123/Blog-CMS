import React from 'react'
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function useHandlePostImage(file) {
  const [originalImage, setOriginalImage] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [imgstatus, setStatus] = useState('');
    const [progress, setProgress] = useState(0);
    const [successMessage, errorSuccessMessage] = useState('');

    console.log(file.name);
    // const uploadedImage = file
    useEffect(()=>{
        const storage = getStorage();
       

        // Create the file metadata
        /** @type {any} */
        const metadata = {
          contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'post_image/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                setStatus('error')
                errorSuccessMessage("User does not have permission to access the object")
                break;
              case 'storage/canceled':
                setStatus('error')
                errorSuccessMessage("User canceled the upload")
                break;

              // ...

              case 'storage/unknown':
                setStatus('error')
                errorSuccessMessage("Unknown error occurred, inspect error.serverResponse")
                break;
            }
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageLink(downloadURL);
              setStatus('success')
                errorSuccessMessage("Upload completed successfully");
            });
          }
        );


    },[file]);

    return {imageLink, progress, imgstatus, successMessage}

}
