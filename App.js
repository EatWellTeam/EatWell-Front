// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;









// import { StatusBar } from 'expo-status-bar';
// import React, {useState} from 'react';
// import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Platform, Alert, Button } from 'react-native';

// export default function App() {


 
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>Welcome to Applaudit!</Text>
//       <Image source={{
//         width: 200,
//         height: 300,
//         uri: "https://picsum.photos/200/300"}}/>
//         <Button title="click me" onPress={()=>Alert.alert("you have clicked btn", "there is no more to do")}/>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );


// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android'? StatusBar.currentHeight :0,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   Imcontainer: {
//     flex: 1,
//     backgroundColor: '#bbb',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
