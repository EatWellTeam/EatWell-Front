import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import imageUpload from '../../../services/imageUpload'; // Adjust the import path as necessary

export default function DashboardScreen() {
  const [caloriesConsumed, setCaloriesConsumed] = useState(1183);
  const [caloriesLeft, setCaloriesLeft] = useState(998);
  const [image, setImage] = useState(null);
  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (caloriesConsumed / 2000) * circumference;

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
      setImage(uri);
    }
    else {
      console.log("Result cancled?")
    }
  }

  async function openGallery() {
    const permissions = await ImagePicker.getMediaLibraryPermissionsAsync();
    try {
      console.log("openGallery 1")
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("openGallery 2")

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        console.log('Image selected from gallery:', uri);
        setImage(uri);
      }
      else {
        console.log("Result cancled?")
      }
    }catch(e) {console.log(e)}
  }
  

  async function requestMediaPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

  useEffect(() => {
   // requestMediaPermissions();
  }, []);

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
  
      const { data } = await axios.post('http://172.27.240.1:3000/middleware/process', [payload], {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Analysis data received:', data);
      // Ensure data is correctly passed to the next screen
      navigation.navigate('AnalysisResult', { results: { results: data, image: url } });
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} style={styles.logo} />
        </View>
        <View style={styles.statsContainer}>
          <Svg height="120" width="120" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r={circleRadius} stroke="#eee" strokeWidth="10" fill="none" />
            <Circle
              cx="50"
              cy="50"
              r={circleRadius}
              stroke="#1E9947"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </Svg>
          <View style={styles.statsTextContainer}>
            <Text style={styles.caloriesConsumedText}>{caloriesConsumed}</Text>
            <Text style={styles.labelText}>Calories consumed</Text>
            <Text style={styles.caloriesLeftText}>{caloriesLeft}</Text>
            <Text style={styles.labelText}>Calories left to daily goal</Text>
          </View>
        </View>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Track Your Weight Over Time</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={300}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#161E21',
              backgroundGradientFrom: '#161E21',
              backgroundGradientTo: '#161E21',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#1E9947',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        {image && (
          <TouchableOpacity style={styles.button} onPress={analyze}>
            <Text style={styles.buttonText}>Analyze</Text>
          </TouchableOpacity>
        )}
        <View style={styles.lastMealContainer}>
          <Text style={styles.lastMealTitle}>My Last Meal</Text>
          <Text style={styles.lastMealText}>CheeseBurger with Bacon and Fries</Text>
          <Text style={styles.lastMealText}>Calories: 460-600</Text>
          <Image source={{ uri: 'https://example.com/last_meal_image.png' }} style={styles.lastMealImage} />
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <View style={styles.navButtonContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
            <Ionicons name="home-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('TrackCalories')}>
            <Ionicons name="create-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={showImagePickerOptions}>
            <Ionicons name="camera-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Recipes')}>
            <Ionicons name="restaurant-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161E21',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 80, // Add padding to avoid overlap with the navbar
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statsTextContainer: {
    marginLeft: 20,
    alignItems: 'center',
  },
  caloriesConsumedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E9947',
  },
  caloriesLeftText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
  },
  graphContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  graphTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  lastMealContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  lastMealTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  lastMealText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  lastMealImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#1E9947',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#161E21', // Add background color
    paddingVertical: 10,
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', // Adjust this value to control the spacing and centering
    paddingHorizontal: 10, // Add padding to create space between buttons
  },
  navButton: {
    alignItems: 'center',
    padding: 10,
  },
});