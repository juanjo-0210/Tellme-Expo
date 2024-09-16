import { createThumbnail } from "react-native-create-thumbnail";

export const generateThumbnail = async (url: string) => {
      try {
        const response = await createThumbnail({
          url,  // La URL del video
          timeStamp: 5000,  // Captura la miniatura en el primer segundo
        });
        return response.path
      } catch (error) {
        console.log('Error extrayendo thumbnail:', error);
      }
    };