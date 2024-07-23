import React from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const EditProfile = () => {
  return (
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
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
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
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
