import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Platform, StyleSheet, Button, Alert } from 'react-native';


export default function HomeScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>WELCOME</Text>
        <Image source={require('../../assets/eat-well-logo.png')} />
        <Button
          title="Log in"
          onPress={() => Alert.alert("you have clicked btn", "there is no more to do")}
          color="green"
        />
        <View style={{ marginTop: 10 }}></View>
        <Button 
          title="Sign up"
          onPress={() => Alert.alert("you have clicked btn", "there is no more to do")}
          color="green"
        />

        <StatusBar style="auto" />
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
  },

  Imcontainer: {
    flex: 1,
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});