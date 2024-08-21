import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSignUpContext } from '../../assets/context/SignUpContext'; 
import NavBar from '../../../components/navBar'; 

const MyLastMeals = () => {
  const [meals, setMeals] = useState([]);
  const { signUpData } = useSignUpContext();
  const navigation = useNavigation();
  const userId = signUpData._id;


  const fetchMeals = async () => {
    if (!userId) {
      console.log("no userid");
      return; 
    }

    try {
      console.log(`Fetching meals for userId: ${userId}`);
      const response = await fetch(`${process.env.API_URL}/food/${userId}`);
      console.log(`Response status: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setMeals(data.reverse());
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [userId]); 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

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
              <View style={styles.mealHeader}>
                <Text style={styles.mealName} numberOfLines={1} ellipsizeMode="tail">{meal.name}</Text>
                <Text style={styles.mealDate}>{formatDate(meal.createdAt)}</Text>
              </View>
              <View style={styles.mealContent}>
                <Image source={{ uri: meal.imageUrl }} style={styles.mealImage} />
                <View style={styles.mealDetails}>
                  <Text style={styles.mealCalories}>{meal.calories.toFixed(0)} calories</Text>
                  <Text style={styles.mealNutrients}>
                    {`Carbs: ${meal.nutritionValues.carbs.toFixed(2)}g | Fat: ${meal.nutritionValues.fat.toFixed(2)}g | Protein: ${meal.nutritionValues.protein.toFixed(2)}g`}
                  </Text>
                </View>
              </View>
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
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealDateContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
 mealDate: {
    color: '#fff',
    fontSize: 12,
  },
  mealContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  mealDetails: {
    marginLeft: 10,
    flex: 1,
  },
  mealName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  mealCalories: {
    color: '#fff',
    fontSize: 16,
  },
  mealNutrients: {
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