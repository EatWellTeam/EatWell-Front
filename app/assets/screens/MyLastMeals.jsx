import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSignUpContext } from '../../assets/context/SignUpContext'; 
import NavBar from '../../../components/navBar'; 

const MyLastMeals = () => {
  const [meals, setMeals] = useState([]);
  const { userId } = useSignUpContext(); 
  const navigation = useNavigation();


  const fetchMeals = async () => {
    if (!userId) return; 

    try {
      const response = await fetch(`http://10.0.0.6:3000/${userId}`); 
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const data = await response.json();
      setMeals(data.meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [userId]); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} style={styles.logo} />
          <Text style={styles.headerText}>My Last Meals</Text>
        </View>

        {meals.length === 0 ? (
          <Text style={styles.noMealsText}>No meals found for the past few days.</Text>
        ) : (
          meals.map((meal, index) => (
            <View key={index} style={styles.mealContainer}>
              <Image source={{ uri: meal.imageUrl }} style={styles.mealImage} />
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealCalories}>{meal.calories} calories</Text>
              <Text style={styles.mealDate}>{new Date(meal.createdAt).toDateString()}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161E21',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  mealContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  mealImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  mealName: {
    color: '#fff',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealCalories: {
    color: '#fff',
    marginTop: 5,
    fontSize: 16,
  },
  mealDate: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
  noMealsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default MyLastMeals;
