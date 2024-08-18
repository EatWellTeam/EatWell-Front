import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import { useRoute, useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/navBar';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function DashboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const initialCaloriesLeft = route.params?.initialCaloriesLeft;
  const [caloriesLeft, setCaloriesLeft] = useState(route.params?.caloriesLeft || initialCaloriesLeft);
  const [caloriesConsumed, setCaloriesConsumed] = useState(route.params?.caloriesConsumed || 0);
  const [image, setImage] = useState(null);

  // Determine circle color based on navigation source
  const circleStroke = route.params?.fromRegister6 ? '#fff' : '#eee';

  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
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

  const analyze = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    try {
      // Assuming imageUpload function exists and works as intended
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

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile'); // Navigate to the Edit Profile screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} style={styles.logo} />
          <TouchableOpacity style={styles.profileButton} onPress={navigateToEditProfile}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </TouchableOpacity>
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
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161E21',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    margin: 20,
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 100,
  },
  profileButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  circle: {
    margin: 10,
  },
  statsTextContainer: {
    justifyContent: 'center',
  },
  calorieTextWrapper: {
    alignItems: 'center',
    marginVertical: 5,
  },
  caloriesConsumedText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  caloriesLeftText: {
    fontSize: 24,
  },
  labelText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  graphContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  graphTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E9947',
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  lastMealContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  lastMealTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  lastMealText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  lastMealImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});