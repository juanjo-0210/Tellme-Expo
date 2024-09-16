import { collection, getDocs } from "firebase/firestore"
import { db } from "../api/firebase"
import { getArrayFromCollection } from "../../util/getArrayFromCollectionFirebase"

const collectioName = "User"

export const getAllConversation = async (docName: string) => {
  const colRef = collection(db, collectioName, docName, "chat")
  const res = getDocs(colRef)
  return getArrayFromCollection(res)
}