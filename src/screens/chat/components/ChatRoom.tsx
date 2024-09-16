import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../../service/messages/getUserData'
import { ConversationData } from '../../../service/messages/createConversation'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {useUserStore } from '../../../context/useUserStore';
import { isWriting } from '../../../service/messages/isWriting';
import { getLastMessage, LastMessageResponse } from '../../../service/messages/lastMessage';
import { format } from '@formkit/tempo';
import { RootStackParamsList } from '../../../routes/StackNavigation';

interface Props {
  conversation: ConversationData;
}

export const ChatRoom = ({conversation}: Props) =>  {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>()
  const [reciver, setReciver] = useState<Record<string, string>>({})
  const { userName, userId } = useUserStore()
  const [ writing, setWriting ] = useState(false)
  const [messageData, setMessageData] = useState<LastMessageResponse>()
  const [date, setDate] = useState<Date>(new Date())

 


  useEffect(() => {
    getUserData(conversation.reciverId).then(setReciver)
  },[])

  useEffect(() => {
    if (conversation.id !== undefined) {
      const unsub = isWriting(conversation.senderId, conversation.id,setWriting)
      return unsub
    }
  },[])

  useEffect(() => {
    if (conversation.id !== undefined) {
      const unsub = getLastMessage( conversation.senderId, conversation.id,setMessageData)
      return unsub
    }

    
  },[])

  useEffect(() => {
    try {
      if (messageData?.date.seconds) {
      const date = new Date( Number(messageData?.date.seconds) * 1000)
      setDate(date)
    }
    } catch (error) {
      console.log(error)
    }
  },[messageData])

  const profileImage = "https://image.api.playstation.com/vulcan/img/rnd/202011/0714/Cu9fyu6DM41JPekXLf1neF9r.png"
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('texting', { chatId: conversation.id as string, reciveData: reciver})
      }}
    >
      <View style={styled({}).chatContainer}>
        <Image source={ reciver.photoUrl ? { uri: reciver.photoUrl } : require("../../../assets/default-profile.jpg")} style={styled({}).profileImage} />
        <View style={styled({}).textRow}>
          <Text style={styled({}).title}>{reciver.name}</Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styled({writing}).subTitle}>{writing ? "escribiendo..." : messageData?.lastMessage}</Text>
        </View>
        <View style={styled({}).rightContainer}>
          <Text style={styled({noRead: Number(messageData?.countNoRead) > 0 }).date}>{format(date, {time: "short"})}</Text>
          {Number(messageData?.countNoRead) > 0 && 
            <View style={styled({}).countNoReadContainer}>
              <Text style={styled({}).countNoRead}>{messageData?.whoIsWriting !== userId && "you"}{messageData?.countNoRead}</Text>
            </View>
          }
        </View>
      </View>
    </Pressable>
  )
}

interface Style {
  writing?: boolean;
  noRead?: boolean;
} 

const styled = ({writing, noRead}:Style) => (StyleSheet.create({ 
    chatContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribuye los elementos horizontalmente
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  userimageChat: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: "#f1f1f1",
    borderRadius: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  subTitle : {
    color: writing ? "green" : "black",
    fontSize: 14,
  },
  textRow: {
    paddingHorizontal: 10,
    flex: 1, // Permite que este contenedor ocupe todo el espacio restante
  },
  rightContainer: {
    alignItems: "flex-end", // Alineamos los elementos dentro de este contenedor a la derecha
  },
  countNoReadContainer: {
    backgroundColor: "green",
    borderRadius: 100,
    paddingHorizontal: 8, // Ajusta el padding horizontal para el ancho del texto
    paddingVertical: 2, // Ajusta el padding vertical para el alto del texto
    marginTop: 4, // Separación entre la fecha y el contador
  },
  countNoRead: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    color: noRead ? "green" : "black",
    fontWeight: noRead ? "bold" : "normal",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: '#f1f1f1', // Color de fondo para cuando no haya imagen
  }
}))