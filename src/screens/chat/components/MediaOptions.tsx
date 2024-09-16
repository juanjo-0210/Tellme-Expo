import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import { requestAudioPermission } from '../../../permissions/audioPermission';

interface MediaOptionsProps {
  visible: boolean;
  onClose: () => void;
  onMediaSelected: (type: string, uri: string, fileName: string) => void;
}

export const MediaOptions: React.FC<MediaOptionsProps> = ({ visible, onClose, onMediaSelected }) => {

  // Función para abrir la cámara
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.canceled) {
      onMediaSelected('image', result.assets[0].uri, result.assets[0].fileName as string);
      onClose();
    }
  };

  // Función para seleccionar imágenes de la galería
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.canceled) {
      if(result.assets) {
        const doc = result.assets[0]
        onMediaSelected(doc.type as string, result.assets[0].uri, doc.fileName as string);
        onClose();
      }
    }
  };

  // Función para seleccionar un documento
  const openDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled) {
      onMediaSelected('document', result.assets[0].uri, result.assets[0].name);
      onClose();
    }
  };

 

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.optionContainer}>
          <Pressable onPress={openCamera} style={styles.option}>
            <AntDesign name="camera" size={24} color="black" />
            <Text style={styles.optionText}>Cámara</Text>
          </Pressable>
          
          <Pressable onPress={openGallery} style={styles.option}>
            <MaterialIcons name="photo-library" size={24} color="black" />
            <Text style={styles.optionText}>Galería</Text>
          </Pressable>
          
          <Pressable onPress={openDocumentPicker} style={styles.option}>
            <MaterialIcons name="insert-drive-file" size={24} color="black" />
            <Text style={styles.optionText}>Documentos</Text>
          </Pressable>

          {/* <Pressable onPress={() => recordAudio(onMediaSelected, onClose)} style={styles.option}>
            <FontAwesome name="microphone" size={24} color="black" />
            <Text style={styles.optionText}>Audio</Text>
          </Pressable> */}
          
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// Estilos
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#d32f2f',
  },
});
