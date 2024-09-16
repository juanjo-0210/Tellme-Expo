import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../api/firebase"


const collectionName = "User"

export const updateIsRead = async ( userId: string, chatId: string) => {
  const docRef = await doc(db, collectionName,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {isRead: false, countNoRead: 0})
}


export const createNoRead = async ( userId: string, chatId: string) => {
  const docRef = await doc(db, collectionName,  userId, "chat", chatId)
  const respDoc = (await getDoc(docRef)).data()
  const currenCount = Number(respDoc?.countNoRead) || 0
  await updateDoc(docRef, {isRead: true, countNoRead: Number(currenCount + 1), date: serverTimestamp()})
}


export const updateDateLasMessage = async ( userId: string, chatId: string) => {
  const docRef = doc(db, collectionName,  userId, "chat", chatId)
  const respDoc = (await getDoc(docRef)).data()
  await updateDoc(docRef, {date: serverTimestamp()})
}