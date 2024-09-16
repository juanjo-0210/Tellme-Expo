import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {Text, View, StyleSheet, TextInput, Pressable, FlatList, ImageBackground} from 'react-native';
import { RootStackParamsList } from '../../routes/StackNavigation';
import { getNewMessage } from '../../service/messages/onSnapShot';
import { useUserStore } from '../../context/useUserStore';
import { serverTimestamp } from 'firebase/firestore';
import { setNewMessage } from '../../service/messages/setNewMessage';
import { sendNewMessage } from '../../service/messages/sendNewMessage';
import { setLastMessage } from '../../service/messages/lastMessage';
import { cleanWriting, setWriting } from '../../service/messages/isWriting';
import { createNoRead, updateDateLasMessage, updateIsRead } from '../../service/messages/readMessage';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ChatHeader } from './components/ChatHeader';
import { sendNotification } from '../../service/notification/sendNotification';
import background from "../../assets/background-light.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RenderItem } from './components/RenderItem';
import { MediaOptions } from './components/MediaOptions';
import { uploadFile } from '../../service/messages/uploadFile';
import { FirebaseStorage } from 'firebase/storage';
import { generateThumbnail } from '../../util/generateThumbnail';

export const TextingScreen = () => {
  const { chatId, reciveData} = useRoute<RouteProp<RootStackParamsList, "texting">>().params
  const {userId} = useUserStore()
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>()
  const flatListRef = useRef<FlatList>(null);
  const [showMediaOptions, setShowMediaOptions] = useState(false);

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {

    if (userId && chatId) {
      const unsub = getNewMessage(setMessages, userId, chatId) 
    }   
    loadText()
  },[])

  useEffect(() => {

    if (messages.length > 0) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: 0
      });
    }
    confirmRecipe()
    return () => confirmRecipe()
  }, [messages]);


   useEffect(() => {
    const saveText = async () => {
      await AsyncStorage.setItem(reciveData.id, text);
    };
    return () => {
      saveText();
    };
  }, [text]);


  const confirmRecipe = () => {
    if (userId && reciveData && chatId) updateIsRead( userId, chatId)
  }

  const loadText = async () => {
      const savedText = await AsyncStorage.getItem(reciveData.id);
      if (savedText) {
        setText(savedText);
      }
  };

  const handleMediaSelected = async (type: string, uri: string, fileName: string) => {
    // Aquí puedes manejar el archivo seleccionado
    const resUrl = await uploadFile(uri, chatId, fileName)
    let thumbnail = "";
    if (type == "video") {
      thumbnail = await generateThumbnail(resUrl) as string
    }
    const sms = {
      message: text,
      date: serverTimestamp(),
      sender: userId,
      type: type,
      uri: resUrl,
      thumbnail
    };
    
    setNewMessage(userId, chatId, {...sms, uri: resUrl})
    sendNewMessage(reciveData?.id, chatId, {...sms, uri: resUrl})
    console.log(`Tipo de archivo: ${type}, URI: ${uri}`);
  };


  return (
    <>
    <ChatHeader
      profileImage={reciveData.photoUrl}
      username={reciveData?.name}
      status={"online"}
    />
      <View style={styles().chatContainer}>
        <ImageBackground
          source={background}
          resizeMode='cover'
          style={{flex: 1}}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            inverted={true}
            keyExtractor={item => item.id}
            
            renderItem={({item}) =>  (
              
              <RenderItem item={item} />
            )}
          />
        </ImageBackground>
      </View>
      <View style={styles().writeBox}>
        <Pressable 
          onPress={() => {
            setShowMediaOptions(true)
          }}
          style={styles().addButton}
        >
          <AntDesign name="plus" size={24} color="black" />
        </Pressable>
        
        <TextInput
          style={styles().input}
          placeholder="Text Message"
          onChangeText={(e) => {
            setText(e);
            if (userId && reciveData && chatId)
              setWriting(reciveData?.id, chatId);
          }}
          value={text}
          
        />
      
        <Pressable 
          style={styles().sendButton}
          onPress={async () => {
            const sms = {
              message: text,
              date: serverTimestamp(),
              sender: userId,
              type: "text"
            };
            if (userId && reciveData && chatId && text.trim()) {
              Promise.all(
                [setNewMessage(userId, chatId, sms),
                sendNotification(reciveData.token, text,"Juanjo"),
                setLastMessage(userId, chatId, text, userId),
                sendNewMessage(reciveData?.id, chatId, sms),
                setLastMessage(reciveData?.id, chatId, text, userId),
                cleanWriting(reciveData?.id, chatId),
                createNoRead(reciveData?.id, chatId),
                updateDateLasMessage(userId, chatId,)]
              )
              setText(""); 
            }
          }}
        >
          <MaterialIcons name="send" size={24} color="black" />
        </Pressable>
        <MediaOptions
          visible={showMediaOptions}
          onClose={() => setShowMediaOptions(false)}
          onMediaSelected={handleMediaSelected}
        />
    </View>
    </>
  );
};

const styles = (isUser?: boolean) => (
  StyleSheet.create({
    chatContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
      alignContent: 'flex-end',
    },
     writeBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      marginVertical: 8,
    },
    addButton: {
      padding: 5,
    },
    cloudStyle: {
      maxWidth: '75%',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      paddingVertical: 5,
      paddingHorizontal: 8,
      backgroundColor: isUser ? '#d1f5d3' : '#f0f0f0',
      color: '#333',
      marginHorizontal: 5,
      marginVertical: 5,
      borderRadius: 20,
      borderBottomLeftRadius: isUser ? 20 : 4,
      borderBottomRightRadius: isUser ? 4 : 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    input: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#fff',
      borderColor: '#f1f1f1',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginHorizontal: 10,
    },
    sendButton: {
      padding: 5,
    },
  })
);