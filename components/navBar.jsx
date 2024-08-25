import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';

const NavBar = () => {
  const navigation = useNavigation();


  async function openCamera() {
    const permissions = await ImagePicker.getCameraPermissionsAsync();
    if (!permissions.granted) {
      requestMediaPermissions();
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Image selected from camera:', uri);
      navigateToPictureMeal(uri);
      
    }
  }

  async function openGallery() {
    const permissions = await ImagePicker.getMediaLibraryPermissionsAsync();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        console.log('Image selected from gallery:', uri);
        navigateToPictureMeal(uri);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function requestMediaPermissions() {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

  const navigateToPictureMeal = (uri) => {
    navigation.navigate('PictureMeal', { image: uri });
  };

  const analyze = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    try {
      console.log('Uploading image:', image);
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

      const { data } = await axios.post(`${process.env.API_URL}/middleware/process`, [payload], {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Analysis data received:', data);

      // Ensure data is correctly passed to the next screen
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
        Alert.alert('No Food Detected in Image', 'Please try again with a different image.');
      } else if (e.request) {
        console.error('No Food Detected in Image', 'Please try again with a different image.', e.request);
        Alert.alert('No Food Detected in Image', 'Please try again with a different image.');
      } else {
        console.error('Error setting up request:', e.message);
        Alert.alert('Error', e.message);
      }
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Select Image Source',
      'Choose an option to select an image:',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };
  
  return (
    <View style={styles.navBar}>
      <View style={styles.navButtonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('TrackCalories')}>
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={showImagePickerOptions}>
          <Ionicons name="camera-outline" size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Recipes')}>
          <Ionicons name="fast-food-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MyLastMeals')}>
          <Ionicons name="restaurant-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#161E21',
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  navButton: {
    padding: 10,
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavBar;

// async function getRecentMeals(req: Request, res: Response) {
//     try {
//       const today = new Date();
//       const threeDaysAgo = new Date();
//       threeDaysAgo.setDate(today.getDate() - 3);
  
//       // Fetch meals created in the last 3 days
//       const meals = await FoodModel.find({
//         createdAt: { $gte: threeDaysAgo, $lte: today }
//       }).sort({ createdAt: -1 }); // Sort by date descending
  
//       res.status(200).json({ meals });
//     } catch (error) {
//       console.error('Error fetching recent meals:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
  
//   export { getRecentMeals };


// import { getRecentMeals } from '../controllers/meals_controller';
// router.get('/get-recent-meals', getRecentMeals);