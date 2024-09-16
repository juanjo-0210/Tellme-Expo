import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { db } from "../api/firebase"

const collectionName = "User"
let writingTimeOut: string | number | NodeJS.Timeout | undefined;
export const isWriting = (userId: string, chatId: string, calback: any) =>  {
  const docRef = doc(db, collectionName,  userId, "chat", chatId)
  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      const data = docSnapshot.data()
       calback(data?.isWriting)
  })
  return unsubscribe
}

export const setWriting = async (userId: string, chatId: string) => {
  const docRef = await doc(db, collectionName,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {isWriting: true})

  if (writingTimeOut) {
    clearTimeout(writingTimeOut)
  }
  writingTimeOut = setTimeout(() => {
    cleanWriting( userId, chatId)
  }, 3000)
  
}


export const cleanWriting = async (userId: string, chatId: string) => {
  const docRef = await doc(db, collectionName,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {isWriting: false})
}