import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import imageUpload from '../../../services/imageUpload'; 
import { API_URL } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PictureMeal() {
  const navigation = useNavigation();
  const route = useRoute();
  const [image, setImage] = useState(route.params?.image || null);
  const [caloriesConsumed, setCaloriesConsumed] = useState(route.params?.caloriesConsumed || 0);
  const [caloriesLeft, setCaloriesLeft] = useState(route.params?.caloriesLeft || 0);
  const [initialCaloriesLeft, setInitialCaloriesLeft] = useState(route.params?.initialCaloriesLeft || 0);

  const analyze = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    try {
      const url = await imageUpload(image);
      console.log('Image uploaded, URL:', url);

      const payload = {
        content: [
          {
            type: 'image_url',
            image_url: {
              url,
            },
          },
        ],
        role: 'user',
      };

      const { data } = await axios.post("http://10.0.0.6:3000/middleware/process", [payload], {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Analysis data received:', data);
      navigation.navigate('AnalysisResult', {
        results: data,
        image: url,
        caloriesConsumed: caloriesConsumed,
        caloriesLeft: caloriesLeft,
        initialCaloriesLeft: initialCaloriesLeft,
      });
    } catch (e) {
      console.error('Error during analysis:', e.message);
      if (e.response) {
        console.error('Server responded with:', e.response.data);
        Alert.alert('Server Error', JSON.stringify(e.response.data));
      } else if (e.request) {
        console.error('Request made but no response received:', e.request);
        Alert.alert('Network Error', 'Request was made but no response received.');
      } else {
        console.error('Error setting up request:', e.message);
        Alert.alert('Error', e.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.clearButton} onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={analyze}>
        <Text style={styles.buttonText}>Analyze</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161E21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#1E9947',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
