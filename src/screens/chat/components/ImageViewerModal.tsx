import React from 'react';
import { Modal, View, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Componente para mostrar el modal con la imagen
export const ImageViewerModal = ({
  uri,
  visible,
  onClose,
}: {
  uri: string;
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose} // Manejo del cierre en Android
    >
      <View style={styles.modalContainer}>
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="contain" // Ajusta la imagen para que se ajuste al contenedor
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
  image: {
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