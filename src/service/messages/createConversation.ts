import { addDoc, collection, doc, FieldValue, setDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { Dispatch, SetStateAction } from "react";

export interface ConversationData {
  id?: string;
  senderId: string;
  reciverId: string;
  idConversation: string;
  isWriting: boolean;
  whoIsWriting: string
  date: FieldValue; 
  lastMessage: string;
  isRead: boolean;
  countNoRead: number;
}

// export interface ConversationData {
//   id?: string;
//   senderId: string;
//   reciverId: string;
//   idConversation: string;
//   isWriting: boolean;
//   whoIsWriting: string
//   date: {nanoseconds: string, seconds:string}; 
//   lastMessage: string;
//   isRead: boolean;
//   countNoRead: number;
// }


export interface UserData {
  id: string;
  rollNameCollection: string;
}

const collectionName = "User" 

export const createConversation = async (userId: string, obj: ConversationData) => {
    const userData = [process.env.EXPO_PUBLIC_ADMIN_ID, userId]
    const chatName = userData.join("")
   try {
     await Promise.all(userData.map(async (data) => {
      const reciverId = userData.filter((tech) =>  tech != data)

      const docRef = doc(db, collectionName, data, "chat", chatName);
      await setDoc(docRef, {...obj, senderId: data, reciverId: reciverId[0]});
      const colRef = collection(db, collectionName, data, "chat", chatName, "messages")
      await addDoc(colRef, {welcomeMessage: "Gracias por utilizar nuestra plataforma para comunicarte"})
    }))
   } catch (error) {
    console.log("line 28 doc createConversation",error)
   }
    return chatName
}