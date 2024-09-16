import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import ChatTabScreen from '../screens/ChatTabScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/profile/RegisterScreen';
import { TextingScreen } from '../screens/chat/TextingScreen';
import withSafeArea from '../util/withSafeArea';


export interface UsersProfile{
  id: string
  name: string;
  userId: string;
  photoUrl?: string;
  phoneNumber: string;
  region: any;
  token: string;
}



export type RootStackParamsList = {
  home: undefined;
  login: undefined;
  register: undefined;
  texting: {chatId: string, reciveData: UsersProfile};
}

const Stack = createStackNavigator<RootStackParamsList>()

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='login' component={withSafeArea(LoginScreen)}/>
      <Stack.Screen name='home' options={{title:"Chats"}} component={withSafeArea(ChatTabScreen)}/>
      <Stack.Screen name='register' component={withSafeArea(RegisterScreen)}/>
      <Stack.Screen name='texting' component={withSafeArea(TextingScreen)}/>
    </Stack.Navigator>
  );
};
