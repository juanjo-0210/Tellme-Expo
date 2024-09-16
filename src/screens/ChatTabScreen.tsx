import { View, FlatList, AppState, Pressable, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllConversation } from "../service/messages/ChatList";
import { ChatRoom } from "./chat/components/ChatRoom";
import auth, { signOut } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../routes/StackNavigation";
import { Header } from "./components/Header";
import { sendNotification } from "../service/notification/sendNotification";
import * as Notifications from 'expo-notifications';
import { useUserStore } from "../context/useUserStore";

 Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowAlert: true,
        shouldSetBadge: true,
    }) 
 })



const ChatTabScreen = () => {
    const [conversation, setConversation] = useState<any>([])
    const [appState, setAppState] = useState(AppState.currentState)

    
   console.log(appState)

    
   
    
    useEffect(() => {
        try {
            if (auth().currentUser) {
                const uid = auth().currentUser?.uid as string
                
                getAllConversation(uid).then(setConversation)
            }else{
                throw new Error("No se ha podido obtener las conversaciones")
        }
        } catch (error) {
            console.log(error)
        }
        
        AppState.addEventListener("change", e => setAppState(e))
        
    }, [])

    return (
        <View>
            <Header />            
            <FlatList
                data={conversation}
                renderItem={({item}) => <ChatRoom conversation={item} />}
            /> 
            
        </View>
    );
};

export default ChatTabScreen;
