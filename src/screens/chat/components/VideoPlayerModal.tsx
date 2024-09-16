import React, { useState } from 'react';
import { Modal, View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Componente para mostrar el modal con el video
export const VideoPlayerModal = ({ uri, visible, onClose }: { uri: string, visible: boolean, onClose: () => void }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <Video
          source={{ uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          style={styles.video}
        />
        <Pressable onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={30} color="#fff" />
        </Pressable>
      </View>
    </Modal>
  );
};



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
});