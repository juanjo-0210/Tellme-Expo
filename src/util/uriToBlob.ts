// Función para convertir la imagen en Blob
export const uriToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};
