import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const TrackCalories = ({ navigation }) => {
  const [mealDescription, setMealDescription] = useState('');

  const handleCalculate = () => {
    // Add your calculation logic here
    console.log('Calculating calories for:', mealDescription);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image 
          source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
          style={styles.logo} 
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.instructions}>Manually type in your last meal, to calculate the caloric worth</Text>
        <TextInput
          value={mealDescription}
          onChangeText={setMealDescription}
          placeholder="Enter meal description"
          style={styles.input}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#161E21',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    paddingTop: 20,
    backgroundColor: '#161E21',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
  },
  content: {
    width: '80%',
    alignItems: 'center',
    marginTop: 150, // Adjusted to account for the header
  },
  instructions: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
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

export default TrackCalories;
