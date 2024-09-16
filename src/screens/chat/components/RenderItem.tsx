import React, { useEffect, useState } from 'react';
import { Audio, Video } from 'expo-av';
import { Image, TouchableOpacity, View, StyleSheet, Linking, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserStore } from '../../../context/useUserStore';
import { VideoPlayerModal } from './VideoPlayerModal';
import { ImageViewerModal } from './ImageViewerModal';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { createThumbnail } from 'react-native-create-thumbnail';


export const RenderItem = ({ item }: { item: any }) => {
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const {userId} = useUserStore()
  const [isVisible, setVisible] = useState(false);
 

  const playAudio = async (uri: string) => {

    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error reproduciendo el audio:', error);
    }

    // Liberar recursos cuando termines
    sound?.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound?.unloadAsync();
      }
    });
  };
  
  const playVideo = async (uri: string) => {
    try {
      // Aquí podrías navegar a una nueva pantalla donde reproduzcas el video o mostrar una vista emergente
      // Ejemplo: abrir un modal para reproducir el video
      console.log('Reproduciendo video:', uri);
      // Implementar la reproducción en el frontend (pantalla o modal)
    } catch (error) {
      console.log('Error reproduciendo el video:', error);
    }
  };

  const openDocument = async (uri: string) => {
    try {
      // Abrir documento con la aplicación predeterminada
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        console.log("No se puede abrir este archivo:", uri);
      }
    } catch (error) {
      console.log('Error abriendo el documento:', error);
    }
  };





  switch (item.type) {
    case 'text':
      return (
        <View>
          <Text style={styles(item.sender === userId).cloudStyle}>{item.message}</Text>
        </View>
      );

    case 'image':
      return (
        <>
          <TouchableOpacity
            onPress={ async () => setVisible(true)}
          >
            <Image
              source={{ uri: item.uri}}
              style={styles(item.sender === userId).imageStyle}
            />
          </TouchableOpacity>
          <ImageViewerModal
            uri={item.uri}
            visible={isVisible}
            onClose={() => setVisible(false)}
          />
        </>
      );

    case 'video': 
      return (
        <>
          <TouchableOpacity onPress={async () => {
              playVideo(item.uri)
              setVisible(true)
            }}>
            <Image
              source={{ uri: item.thumbnail || "string"}}
              style={styles(item.sender === userId).videoStyle}
            />
          </TouchableOpacity>
          <VideoPlayerModal
            uri={item.uri}
            visible={isVisible}
            onClose={() => setVisible(false)}
          />
        </>
      );

    case 'audio':
      return (
        <TouchableOpacity onPress={() => playAudio(item.uri)} style={styles().audioContainer}>
          <MaterialIcons name="play-circle-fill" size={40} color="black" />
          <Text style={styles(item.sender === userId).audioText}>Audio Message</Text>
        </TouchableOpacity>
      );

    case 'document':
      return (
        <TouchableOpacity onPress={() => openDocument(item.uri)} style={styles().documentContainer}>
          <MaterialIcons name="description" size={40} color="black" />
          <Text style={styles().documentText}>View Document</Text>
        </TouchableOpacity>
      );

    default:
      return null;
  }
};

const styles = (isUser?: boolean) =>
  StyleSheet.create({
    chatContainer: {
      flex: 1,
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
      alignContent: 'flex-end',
    },
    cloudStyle: {
      maxWidth: '75%',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      paddingVertical: 5,
      paddingHorizontal: 8,
      backgroundColor: isUser ? '#d1f5d3' : '#f0f0f0',
      marginHorizontal: 5,
      marginVertical: 5,
      borderRadius: 20,
      borderBottomLeftRadius: isUser ? 20 : 4,
      borderBottomRightRadius: isUser ? 4 : 20,
      elevation: 5,
    },

    // Estilo para imágenes
    imageStyle: {
      width: 220,
      height: 300,
      borderRadius: 10,
      borderWidth: 5,
      marginVertical: 5,
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      borderColor: isUser ? '#d1f5d3' : '#f0f0f0',
    },

    // Estilo para videos (miniatura)
    videoStyle: {
      width: 220,
      height: 300,
      borderRadius: 10,
      marginVertical: 5,
      borderWidth: 5,
      borderColor: isUser ? '#d1f5d3' : '#f0f0f0',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      backgroundColor: '#000',
      marginHorizontal: 5,
      borderBottomLeftRadius: isUser ? 10 : 4,
      borderBottomRightRadius: isUser ? 4 : 10
    },

    // Estilo para audios
    audioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e6f7ff',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      alignSelf: isUser ? 'flex-end' : 'flex-start',
    },
    audioText: {
      marginLeft: 10,
      color: '#333',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      backgroundColor: isUser ? '#d1f5d3' : '#f0f0f0',
    },

    // Estilo para documentos
    documentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffefd5',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      alignSelf: isUser ? 'flex-end' : 'flex-start',
    },
    documentText: {
      marginLeft: 10,
      color: '#333',
    },
  });