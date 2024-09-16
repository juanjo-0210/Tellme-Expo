import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: `${process.env.EXPO_PUBLIC_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: `${process.env.EXPO_PUBLIC_PROJECT_ID}.appspot.com`,
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };
