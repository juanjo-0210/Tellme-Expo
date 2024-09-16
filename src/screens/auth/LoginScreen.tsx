import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-international-phone-number';
import { useUserStore } from '../../context/useUserStore';
import {type RootStackParamsList } from '../../routes/StackNavigation';
import { type StackNavigationProp } from '@react-navigation/stack';
import { setLoginPhoneNumberError } from '../../service/error/setLoginPhoneNumberError';

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>()
  const {setPhoneNumber, setUserId, phoneNumber, setRegion, region} = useUserStore((state) => ({
    setPhoneNumber: state.setPhoneNumber,
    setUserId: state.setUserId,
    phoneNumber: state.phoneNumber,
    setRegion: state.setRegion,
    region: state.region
  }))
  
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null >(null);
  const [letRender,setLetRender] = useState(false)
  const [error, setError] = useState("")
  const [code,setCode] = useState("")
  // Función para solicitar verificación de número de teléfono
  const signInWithPhoneNumber = async () => {
    const phone = (region?.callingCode+phoneNumber).replaceAll(" ","")
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert("Error solicitando el código")
      console.error("Error solicitando el código:", error);
    }
  };

  // Función para confirmar el código
  const confirmCode = async () => {
    try {
      await confirm?.confirm(code);
      navigation.replace("register")
    } catch (error) {
      setError("Error en el código de verificación:");

    }
  };

  const handleInputValue = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  }

  useEffect(() => {

    if (auth().currentUser) {
      
      setUserId(auth().currentUser?.uid as string)
      navigation.replace("home")
    }else{
      setLetRender(true)
    }
    
  },[])

  if (letRender) {
    return (
      <View style={styles.container}>
        {!confirm ? (
          <View style={styles.inputsSection}>
            <Text style={styles.title}>Bienvenido a Tellme </Text>
            <PhoneInput 
              value={phoneNumber}
              onChangePhoneNumber={handleInputValue}
              selectedCountry={region}
              onChangeSelectedCountry={setRegion}
              placeholder='Número de teléfono'
              modalSearchInputPlaceholder="Seleccione su ciudad"
              language='es'
              defaultCountry='ES'
            />
            <Pressable onPress={signInWithPhoneNumber} style={styles.button}>
              <Text style={styles.textButton}>Enviar Código</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.inputsSection}>
            <Text style={styles.error}>{error}</Text>
            <TextInput
              placeholder="Código de verificación"
              onChangeText={setCode}
              keyboardType="number-pad"
            />
            <Pressable onPress={confirmCode} style={styles.button}>
              <Text style={styles.textButton}>Confirmar Código</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputsSection: {
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    borderRadius: 20,
  },
  textButton: {
    color: "white",
    textAlign: "center",
  },
  error: {
    color: "red",
  },
});

