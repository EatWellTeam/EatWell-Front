import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';

export default function EmailSent({ navigation }) {
  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
          style={styles.logo} 
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>An Email has been sent to you.</Text>
        <Text style={styles.subtitle}>Please follow the instructions in order to change your password</Text>
        <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#161E21',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 55,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 45,
  },
  content: {
    width: '80%',
    alignItems: 'center',
    marginTop: 100, // Adjust this value as needed to ensure the content is properly spaced below the logo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E9947',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
