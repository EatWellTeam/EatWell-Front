import React from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const EditProfile = () => {
  const navigation = useNavigation(); // Initialize useNavigation

  const handleSave = () => {
    // Add any save logic here if needed
    navigation.navigate('Recipes'); // Navigate to the Recipes page
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={{ uri: 'https://i.ibb.co/pvY7xcx/Default-Create-a-background-image-similar-to-the-image-you-mad-3.jpg' }} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Edit Your Profile</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
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
