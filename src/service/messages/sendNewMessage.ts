import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase";

type Rute = {
  
  object: Record<any, any>
}
const collectionName = "User"

//aqui se pasara la ruta del sender
export const sendNewMessage = async (reciverId: string, chatId: string, object: any) => {
  const colRef = collection(db,collectionName, reciverId,"chat", chatId, "messages")
  const res = await addDoc(colRef, object)
  return res.id
}