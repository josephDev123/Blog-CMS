import { getStorage, ref, deleteObject } from "firebase/storage";

export async function deleteFileInFirebaseDb(imageRef, cb){

const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, imageRef);

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
  cb('file success')
}).catch((error) => {
  // Uh-oh, an error occurred!
  cb('file error');
  throw new Error(error);
});
}