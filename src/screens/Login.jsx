import { useState } from 'react';
import { View, Text, Button, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import MyTextInput from '../components/MyTextInput';

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
    <SafeAreaView style={styles.container}>
        <Text>Login Screen</Text>

        <MyTextInput
            value= {email} 
            onChange= {(e)=> {
                setEmail(e);
            }}
        />

        <MyTextInput
            value= {password} 
            onChange= {(e)=> {
                setPassword(e);
            }}
        />

        <Button
        title = "Sign Up"
        onPress={()=>{
            console.log("signing up");
        }}
        />

      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight :0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  });