import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import imageUpload from '../../../services/imageUpload'; // Adjust the import path as necessary
import { API_URL } from '@env';

export default function DashboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Extract parameters from route
  const initialCaloriesLeft = route.params?.initialCaloriesLeft; // Use the initial value passed from Register6Screen
  const [caloriesLeft, setCaloriesLeft] = useState(route.params?.caloriesLeft || initialCaloriesLeft);
  const [caloriesConsumed, setCaloriesConsumed] = useState(route.params?.caloriesConsumed || 0);
  const [image, setImage] = useState(null);

  // Determine circle color based on navigation source
  const circleStroke = route.params?.fromRegister6 ? '#fff' : '#eee';

  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;

  // Calculate strokeDashoffset using initialCaloriesLeft
  const strokeDashoffset = 
    caloriesConsumed >= initialCaloriesLeft ? 0 : circumference - (caloriesConsumed / initialCaloriesLeft) * circumference;

  useEffect(() => {
    if (route.params?.updatedCaloriesConsumed !== undefined) {
      setCaloriesConsumed(route.params.updatedCaloriesConsumed);
    }
    if (route.params?.updatedCaloriesLeft !== undefined) {
      setCaloriesLeft(route.params.updatedCaloriesLeft);
    }
  }, [route.params]);

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
        setImage(uri);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function requestMediaPermissions() {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

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
          <Svg height="120" width="120" viewBox="0 0 100 100" style={styles.circle}>
            <Circle cx="50" cy="50" r={circleRadius} stroke={circleStroke} strokeWidth="10" fill="none" />
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
            <View style={styles.calorieTextWrapper}>
              <Text style={styles.caloriesConsumedText}>{caloriesConsumed}</Text>
              <Text style={styles.labelText}>Calories consumed</Text>
            </View>
            <View style={styles.calorieTextWrapper}>
              <Text style={[styles.caloriesLeftText, { color: caloriesLeft < 0 ? 'orange' : '#FFFFFF' }]}>
                {Math.abs(caloriesLeft)}
              </Text>
              <Text style={styles.labelText}>
                {caloriesLeft < 0 ? 'Calories exceeded\nthe daily amount' : 'Calories left to daily goal'}
              </Text>
            </View>
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
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  circle: {
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 25,
  },
  statsTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieTextWrapper: {
    alignItems: 'center',
    marginVertical: 5,
  },
  caloriesConsumedText: {
    fontSize: 36,
    color: '#1E9947',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  caloriesLeftText: {
    fontSize: 36,
    textAlign: 'center',
  },
  graphContainer: {
    marginVertical: 20,
  },
  graphTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E9947',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  lastMealContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  lastMealTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  lastMealText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  lastMealImage: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
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
});
