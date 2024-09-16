import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../api/firebase"

const collectionName = "User"

export interface LastMessageResponse {
  id?: string;
  senderId: string;
  reciverId: string;
  idConversation: string;
  isWriting: boolean;
  whoIsWriting: string
  date: {nanoseconds: string, seconds:string}; 
  lastMessage: string;
  isRead: boolean;
  countNoRead: number;
}

export const getLastMessage = ( userId: string, chatId: string, calback: any) =>  {
  const docRef = doc(db, collectionName,  userId, "chat", chatId)
  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      const data = docSnapshot.data()
       calback(data)
  })
  return unsubscribe
}

export const setLastMessage = async ( userId: string, chatId: string, text: string, whoIsWriting: string) => {
  const docRef = doc(db, collectionName,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {lastMessage: text, whoIsWriting: userId})
}