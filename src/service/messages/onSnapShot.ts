import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../api/firebase";

const collectionName = "User"

export const getNewMessage = (calback: any, userUid: string, chatId: string) => {
  try {
    const colRef = query(collection(db,  collectionName, userUid, "chat",chatId, "messages"), orderBy('date',"desc")); 
    const unsubscribe = onSnapshot(colRef, (snapshot) => {

      calback(snapshot.docs.map( doc => {
        return {
          ...doc.data(),
          id: doc.id,
      }}));

    });
    
    return unsubscribe;
  } catch (error) {
    console.log(error)
  }
};


const sendNotification = () => {
  
}