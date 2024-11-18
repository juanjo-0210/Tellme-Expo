import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/routes/StackNavigation';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import {RegisterScreen} from './src/screens/profile/RegisterScreen';
import { ProfileScreen } from './src/screens/profile/ProfileScreen';

export default function App() {
  return (
    <NavigationContainer>
      
      {/* <StackNavigation /> */}
      <ProfileScreen />
   
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
