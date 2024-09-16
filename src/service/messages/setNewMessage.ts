import { addDoc, collection } from "firebase/firestore"
import { db } from "../api/firebase"

interface Rute {
  object: Record<string, string | boolean | number >
}

const collectionName = "User"

//aqui se pasara la ruta del remitente
export const setNewMessage = async (userUid:string, chatId:string, object:any)=> {
  try {

    // if (!object.message) {
    //   throw new Error("Receiver field is undefined");
    // }

    const colRef = collection(db, collectionName, userUid, "chat", chatId, "messages")
    const res = await addDoc(colRef, object)
    console.log("el mensaje",res.id)
    return res.id
  } catch (error) {
    console.log("error line 23,setNewMessage",error)
  }
}