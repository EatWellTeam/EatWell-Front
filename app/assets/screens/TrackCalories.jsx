import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Platform, StatusBar, Image, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import { API_URL } from '@env';
import NavBar from '../../../components/navBar'; 


const TrackCalories = () => {
  const [mealDescription, setMealDescription] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleCalculate = async () => {
    try {
      const response = await axios.post(`${process.env.API_URL}/nutrition/get-nutrition`, {
        ingredients: mealDescription.split('\n'),
      });
      
      const nutritionData = response.data.nutritionData;
      const ingredients = mealDescription.split('\n');
      navigation.navigate('AnalysisResult', { results: { nutritionData, ingredients } });

    } catch (error) {
      console.error('Error calculating calories:', error);
      Alert.alert('Error', 'Failed to calculate calories.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <Text style={styles.instructions}>Manually type in your meal, to calculate the nutritions worth</Text>
          <TextInput
            value={mealDescription}
            onChangeText={setMealDescription}
            placeholder="Enter meal description"
            style={styles.input}
            multiline
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss} 
          />
          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Modal */}
        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Your data was entered into your last meals!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
  },
  content: {
    width: '80%',
    alignItems: 'center',
    marginTop: 150, 
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#161E21',
    paddingVertical: 10,
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#161E21',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#1E9947',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nutritionDataContainer: {
    marginBottom: 20,
  },
});

export default TrackCalories;