import { getStorage, ref, deleteObject } from "firebase/storage";

export function deleteFileInFirebaseDb(imageRef){

  return new Promise((resolve, reject)=>{
    const storage = getStorage();
    // console.log(imageRef)
    // Create a reference to the file to delete
    const desertRef = ref(storage, imageRef);
    console.log(desertRef);
    
    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
      // cb('file deleted')
      resolve('file deleted');
    }).catch((error) => {
      // Uh-oh, an error occurred!
      // cb('file error');
      if(error.code === "storage/object-not-found"){
        resolve('')
      }
      reject(new Error(error.message));
    });

  })

}