import { type FirebaseStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { uriToBlob } from "../../util/uriToBlob"
import { storage } from "../api/firebase"

export const uploadFile= async (uri: string, chatId: string, name: string) => {

  const chatStorage = ref(storage, `${chatId}/`)
    
      try {
        const image = await uriToBlob(uri)
        const storageRef = ref(chatStorage, name)
        await uploadBytes(storageRef, image)
        const response = await getDownloadURL(storageRef)
        return response
      } catch (error) {
        console.log(error)
        return "null"
      }
   
}