import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../api/firebase"
import { ImagePickerResult } from "expo-image-picker"
import { doc, setDoc } from "firebase/firestore"
import { uriToBlob } from "../../util/uriToBlob"

const collectionName = "User"
const sliderStorage = ref(storage, 'profileImages/')

interface UsersProfile{
  name: string;
  userId: string;
  photoUrl?: string;
  phoneNumber: string;
  region: any;
  token: string;
}

export const createUser = async (userId: string, obj: UsersProfile, file: ImagePickerResult | null) => {
  try {
    const docRef = doc(db, collectionName, userId)
    const res = await setDoc(docRef, {...obj, photoUrl: await UploadProfileImage(file)})
    return true
  } catch (error) {
    return false
  }
}

export const UploadProfileImage = async (file: ImagePickerResult | null) => {
    if (file?.assets) {
      try {
        const image = await uriToBlob(file.assets[0].uri)
        const storageRef = ref(sliderStorage, file.assets[0].fileName as string)
        await uploadBytes(storageRef, image)
        const response = await getDownloadURL(storageRef)
        return response
      } catch (error) {
        console.log(error)
        return "null"
      }
    } 
    return "null"
}

