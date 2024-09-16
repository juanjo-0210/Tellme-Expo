import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Button, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // Para los iconos
import { createUser } from '../../service/auth/createUser';
import { useUserStore } from '../../context/useUserStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../routes/StackNavigation';
import auth from '@react-native-firebase/auth';
import { setLoginPhoneNumberError } from '../../service/error/setLoginPhoneNumberError';
import { createConversation } from '../../service/messages/createConversation';
import { serverTimestamp } from 'firebase/firestore';
//import * as Notifications from 'expo-notifications';
import  messaging  from "@react-native-firebase/messaging";


const chatdesc = {
        senderId: "",
        reciverId: "",
        idConversation: "",
        isWriting: false,
        whoIsWriting: "",
        date: serverTimestamp(),
        lastMessage: "",
        isRead: true,
        countNoRead: 0,
        
    }

    
export const RegisterScreen = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);
  const [name, setName] = useState('');
  const {userId, region, phoneNumber, setUserId, setToken, token, userName, setUserName} = useUserStore((state) => ({
    userId: state.userId,
    region: state.region,
    phoneNumber: state.phoneNumber,
    setUserId: state.setUserId,
    setToken: state.setToken,
    token: state.token,
    userName: state.userName,
    setUserName: state.setUserName,
  }))
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>()
  const [error, setError] = useState("")

 const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }
    const getToken = async() => {
        const token = await messaging().getToken()
        console.log("token = ", token)
        return token
    }

  // const registerForPushNotificationsAsync = async () => {
  //       let token;
  //       if (Platform.OS === 'android') {
  //           await Notifications.setNotificationChannelAsync('default', {
  //           name: 'default',
  //           importance: Notifications.AndroidImportance.MAX,   

  //           vibrationPattern: [0, 250, 250, 250],
  //           lightColor: '#FF231F7C',
  //           });
  //       }

  //       const   
  //       { status: existingStatus } = await Notifications.getPermissionsAsync();
  //       let finalStatus = existingStatus;
  //       if (existingStatus !== 'granted') {
  //           const { status } = await Notifications.requestPermissionsAsync();
  //           finalStatus = status;
  //       }
  //       if (finalStatus !== 'granted') {
  //           alert('Failed to get push token for push notification!');
  //           return;
  //       }
  //       token = (await Notifications.getExpoPushTokenAsync()).data; 
  //       setToken(token)
  //       console.log(token);
  //       return token
  //   };

  useEffect(() => {
    requestUserPermission()
    getToken()
    initExecuton()
    
  },[])


  const initExecuton = async() => {
    if (auth().currentUser) {
      
      setUserId(auth().currentUser?.uid as string)
      const uid = auth().currentUser?.uid as string
      createConversation(uid,chatdesc)
    }
  }

  const pickImage = async () => {
    try {
      // Solicitar permiso para acceder a la galería
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la galería');
        return;
      }

      // Abrir el selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],  // Ajusta las proporciones si es necesario
        quality: 1,  // Calidad de la imagen (0 - 1)
      });

      // Verificar si el usuario canceló la operación
      if (!result.canceled) {
        setImage(result);
      } else {
        Alert.alert('Cancelado', 'No se seleccionó ninguna imagen');
      }
    } catch (error) {
      setLoginPhoneNumberError(error)
      Alert.alert('Error', 'Ocurrió un problema al seleccionar la imagen');
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    const userprofile = {
      name: name,
      userId: userId,
      photoUrl: "null",
      phoneNumber: phoneNumber,
      region: region?.callingCode,
      token: token as string,
    }
    try {
       const res = await createUser(userId, userprofile, image)
      if(res) {
        navigation.replace('home')
      }else{
        throw new Error("No se pudo añadir los datos")
      }
    } catch (error) {
      setError("No se pudo añadir los datos")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tellme</Text>

      <View style={styles.imagePickerContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imagePicker}>
            <Image 
              source={image?.assets ? { uri: image.assets[0].uri } : require('../../assets/default-profile.jpg')} 
              style={styles.image} 
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.instructionText}>
        Por favor, selecciona una imagen de perfil y tu nombre para continuar.
      </Text>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2a1c66',
  },
  imagePickerContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: 10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 8,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
   imagePlaceholder: {
    color: '#666',
    textAlign: 'center',
  },
  error: {
    color: "red"
  }
});


