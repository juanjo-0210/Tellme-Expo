import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

// Función para solicitar permiso de grabación de audio
export const requestAudioPermission = async () => {
  try {
    const { status } = await Audio.requestPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Permiso de audio denegado');
      return false; // El permiso no fue otorgado
    }

    console.log('Permiso de audio concedido');
    return true; // El permiso fue otorgado
  } catch (error) {
    console.error('Error al solicitar permiso de audio:', error);
    return false;
  }
};