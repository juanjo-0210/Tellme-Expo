import { addDoc, collection } from "firebase/firestore"
import { db } from "../api/firebase"



export const setLoginPhoneNumberError = async (err: unknown) => {
  const colRef = collection(db, "Error")
  await addDoc(colRef, {error: err})
}