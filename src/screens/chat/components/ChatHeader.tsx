import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  username: string;
  status: string;
  profileImage: string | undefined;
}
export const ChatHeader = ({ username, status, profileImage }:Props) => {

  const navigation = useNavigation()
  
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => {
        navigation.goBack()
      }}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <View style={styles.profileContainer}>
        <Image source={profileImage ? { uri: profileImage } : require("../../../assets/default-profile.jpg")} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f1f1', // Color de fondo para cuando no haya imagen
  },
  textContainer: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: 12,
    color: 'green',  // Color para el estado "Online"
  },
});

