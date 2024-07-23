import React from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const EditProfile = () => {
  const navigation = useNavigation(); // Initialize useNavigation

  const handleSave = () => {
    // Add any save logic here if needed
    navigation.navigate('Recipes'); // Navigate to the Recipes page
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={{ uri: 'https://i.ibb.co/pvY7xcx/Default-Create-a-background-image-similar-to-the-image-you-mad-3.jpg' }} 
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://i.ibb.co/3Yv3Hq8/Screenshot-2024-07-20-185504.png' }} 
              style={styles.logo} 
            />
            <Text style={styles.title}>Edit Your Profile</Text>
          </View>
          <TextInput style={styles.input} placeholder="First Name: " />
          <TextInput style={styles.input} placeholder="Last Name: " />
          <TextInput style={styles.input} placeholder="Email: " keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Date of Birth: " />
          <TextInput style={styles.input} placeholder="Weight: " keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Height: " keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Gender: " />
          <TextInput style={styles.input} placeholder="Activity Level: " />
          <TextInput style={styles.input} placeholder="Goals: " />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    alignItems: 'center',  // Center content horizontally
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#f8b049',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
