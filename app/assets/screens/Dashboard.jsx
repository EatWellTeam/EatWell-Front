import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Alert, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LineChart, } from 'react-native-chart-kit';
import { useRoute, useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/navBar';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import axios from 'axios';
import { useSignUpContext } from "../context/SignUpContext";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useRef } from 'react';
import { BarChart } from 'react-native-chart-kit';


export default function DashboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { signUpData } = useSignUpContext();
  const [recommendedCalories, setRecommendedCalories] = useState(0);
  const [eatenCalories, setEatenCalories] = useState(0);
  const [caloriesLeft, setCaloriesLeft] = useState(0);
  const [eatenPercentage, setEatenPercentage] = useState(0);
  const [weightHistory, setWeightHistory] = useState([]);
  const [weightGoal, setWeightGoal] = useState(0);
  const [lastMeal, setLastMeal] = useState(null);
  const[nutritions, setNutritions] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef(null);
  const circleStroke = route.params?.fromRegister6 ? '#fff' : '#eee';
  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    eatenCalories >= recommendedCalories ? 0 : circumference - (eatenCalories / recommendedCalories) * circumference;

    
  useFocusEffect(
  useCallback(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/user/${signUpData._id}`);
        const { recommendedCalories, eatanCalories, weightHistory, weightGoal,nutritions } = response.data;

        setRecommendedCalories(recommendedCalories);
        setEatenCalories(eatanCalories);
        setEatenPercentage(Math.round((eatanCalories / recommendedCalories)*100));
        setWeightHistory(weightHistory);
        setWeightGoal(weightGoal);
        setNutritions(nutritions);
        setCaloriesLeft(recommendedCalories - eatanCalories);
        console.log(nutritions);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        Alert.alert('Error', 'Failed to fetch user details');
      }
    };
    fetchUserDetails();
    fetchLastMeal();
  }, [])
  
);

const fetchLastMeal = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/food/${signUpData._id}`);
    if (response.data && response.data.length > 0) {
      const length = response.data.length;
      setLastMeal(response.data[length - 1]);
    }
  } catch (error) {
    console.error('Error fetching last meal:', error.message);
  }
};

const nutritionData = nutritions ? {
  labels: ['Protein', 'Carbs', 'Fat'],
  datasets: [{
    data: [
      Math.round(nutritions.protein),
      Math.round(nutritions.carbs),
      Math.round(nutritions.fat),
    ]
  }]
} : {
  labels: ['Protein', 'Carbs', 'Fat'],
  datasets: [{ data: [0, 0, 0] }]
};



const handleScroll = (event) => {
 
  const contentOffsetX = event.nativeEvent.contentOffset.x;
  const currentIndex = Math.round(contentOffsetX / screenWidth);
  
};

const scrollTo = (index) => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
  }
};

const ScrollIndicator = ({ direction }) => (
  <View style={[styles.scrollIndicator, direction === 'left' ? styles.scrollIndicatorLeft : styles.scrollIndicatorRight]}>
    <Ionicons name={direction === 'left' ? 'chevron-back' : 'chevron-forward'} size={24} color="#1E9947" />
  </View>
);

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile'); 
  };

  const handleSignOut = () => {
    const refreshToken = signUpData.refreshToken;
  try{
     axios.get(`${process.env.API_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    navigation.navigate('Login');
    console.log('Sign out successful');
  } catch (error) {
    console.error('Error signing out:', error.message);
    Alert.alert('Error', 'Failed to sign out');
  }
  }
  


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} style={styles.logo} />
          <TouchableOpacity style={styles.profileButton} onPress={navigateToEditProfile}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>

        </View>
        <View style={styles.statsContainer}>
        <View style={styles.circleContainer}>
       
  <Svg height="120" width="120" viewBox="0 0 100 100">
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
  <Text style={styles.circleText}>{eatenPercentage}% </Text>
  <Text style={styles.circleLabelText}>{recommendedCalories}</Text>
  <Text style={styles.circleLabelText}>Recommended calories</Text>
</View>
          <View style={styles.statsTextContainer}>
            <View style={styles.calorieTextWrapper}>
              <Text style={styles.caloriesConsumedText}>{eatenCalories}</Text>
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
        <View style={styles.scrollWrapper}>
        <ScrollView
  ref={scrollViewRef}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.scrollContent}   

  onScroll={handleScroll}
  scrollEventThrottle={16}
  style={{ flexGrow: 1 }} 
>
            <View style={[styles.scrollItem, styles.lastMealContainer]}>
      <Text style={styles.graphTitle}>Track Your Weight Over Time</Text>
      <LineChart
        data={{
          labels: weightHistory.map(entry => {
            const date = new Date(entry.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }).concat(['Goal']),
          datasets: [
            {
              data: weightHistory.map(entry => entry.weight).concat([weightGoal]),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="kg"
        chartConfig={{
          backgroundColor: '#161E21',
          backgroundGradientFrom: '#161E21',
          backgroundGradientTo: '#161E21',
          decimalPlaces: 1,
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
        bezier
        renderDotContent={({ x, y, index, indexData }) => (
          <View key={index} style={{ position: 'absolute', left: x - 20, top: y - 30 }}>
            <Text style={{ color: '#fff', fontSize: 10 }}>{indexData}</Text>
          </View>
        )}
      />
    </View>
    <View style={[styles.scrollItem, styles.lastMealContainer]}>
      <Text style={styles.lastMealTitle}>My Last Meal</Text>
      {lastMeal ? (
        <>
          <Text style={styles.lastMealText}>{lastMeal.name}</Text>
          <Text style={styles.lastMealText}>Calories: {lastMeal.calories.toFixed(0)}</Text>
          <Image source={{ uri: lastMeal.imageUrl }} style={styles.lastMealImage} />
        </>
      ) : (
        <Text style={styles.lastMealText}>No recent meals found</Text>
      )}
    </View>
    <View style={[styles.scrollItem, styles.graphContainer]}>
  <Text style={styles.graphTitle}>Nutrition Overview</Text>
  <BarChart
    data={nutritionData}
    width={screenWidth - 40}
    height={220}
    yAxisSuffix="g"
    chartConfig={{
      backgroundColor: '#161E21',
      backgroundGradientFrom: '#161E21',
      backgroundGradientTo: '#161E21',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: { borderRadius: 16 },
      propsForLabels: { fontSize: 12 },
    }}
    style={{ marginVertical: 8, borderRadius: 16 }}
    showValuesOnTopOfBars={true}
    fromZero={true}
  />
</View>

    
  </ScrollView>
  <ScrollIndicator direction="left" />
          <ScrollIndicator direction="right" />
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
  signoutButton: {
    position: 'absolute',
    top: 10,
    left: 10,
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
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  padding: 10,
},
 graphTitle: {
  fontSize: 18,
  color: '#FFFFFF',
  marginBottom: 10,
  fontWeight: 'bold',
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
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  padding: 10,
},
  lastMealTitle: {
  fontSize: 18,
  color: '#FFFFFF',
  fontWeight: 'bold',
  marginBottom: 10,
},
 lastMealText: {
  fontSize: 16,
  color: '#FFFFFF',
  marginBottom: 5,
},
  lastMealImage: {
  width: 150,
  height: 150,
  borderRadius: 10,
  marginTop: 10,
},
circleContainer: {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  width: 120,
  height: 120,
},
circleText: {
  position: 'absolute',
  top: 20,
  left: 0,
  right: 0,
  bottom: 0,
  fontSize: 25,
  color: '#FFFFFF',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
circleLabelText: {
  fontSize: 12,
  color: '#FFFFFF',
  textAlign: 'center',
},
scrollContent: {
  flexGrow: 1,
},
scrollItem: {
  width: Dimensions.get('window').width,
  padding: 20,
},
scrollWrapper: {
    height: 300, 
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#1E9947',
    borderRadius: 16,
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollItem: {
    width: Dimensions.get('window').width,
    padding: 20,
  },
  scrollIndicator: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(30, 153, 71, 0.3)',
    borderRadius: 15,
    padding: 5,
  },
  scrollIndicatorLeft: {
    left: 10,
  },
  scrollIndicatorRight: {
    right: 10,
  },



});