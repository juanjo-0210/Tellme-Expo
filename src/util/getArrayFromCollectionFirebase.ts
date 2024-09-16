import type { DocumentData, QuerySnapshot } from "firebase/firestore/lite";





export const getArrayFromCollection = async (collectionRes: Promise<QuerySnapshot<DocumentData, DocumentData>>)=> {
    return (await collectionRes).docs.map(doc => {
        return { ...doc.data(), id: doc.id};
    });
}

