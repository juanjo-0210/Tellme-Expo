import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { UserData } from "./createConversation";

const collectionName = "User"



export const getUserData = async (user: string) => {
  const docRef = doc(db, collectionName , user)
  const result = await getDoc(docRef);
  console.log("123456789",user)
  return {...result.data(), id: result.id }
}