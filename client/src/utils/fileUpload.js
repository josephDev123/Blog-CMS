import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


export const fileUpload = (file, cb, storage_ref)=>{
  return new Promise((resolve, reject)=>{

              
        const storage = getStorage();

        // Create the file metadata
        /** @type {any} */
        const metadata = {
          contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const fileDestination = `${storage_ref}/`+uuidv4()+`${file.name}`;
        const storageRef = ref(storage, fileDestination);
        console.log(fileDestination)
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                cb('paused');
                break;
              case 'running':
                cb('loading');
                break;
                default:
                  cb('uploaded');
            }
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                reject(new Error("User doesn't have permission to access the object"))
                break;
              case 'storage/canceled':
                reject(new Error(" User canceled the upload"))
                break;

              // ...

              case 'storage/unknown':
                reject(new Error("Unknown error occurred, inspect error.serverResponse"))
                break;
            }
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              cb('uploaded')
              resolve([downloadURL, fileDestination]);
            });
          }
        );


  })

}