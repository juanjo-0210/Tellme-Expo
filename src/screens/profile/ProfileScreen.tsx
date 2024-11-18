import {Text, View, StyleSheet, Image} from 'react-native';
import defaultBack from '../../assets/default-profile.jpg'
export const ProfileScreen = () => {
  return (
    <View style={Style.container}>
      <Image 
        style={Style.profileImage}
        source={defaultBack}
      />
      <Text>Juan Jose Mateo </Text>
    </View>
  );
};



const Style = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#f1f1f1f1',
  }
})