import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env'; 
import NavBar from '../../../components/navBar'; 


const Recipes = () => {
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);
  const navigation = useNavigation();

  // Function to fetch recipes for a specific meal type
  const fetchRecipesForMealType = async (mealType, setRecipes) => {
    try {
      const response = await fetch("http://10.0.0.6:3000/nutrition/get-recipes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mealType,
        }),
      });

      console.log(`Response Status for ${mealType}: ${response.status}`);

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Recipes data received for ${mealType}:`, data);
      setRecipes(data.hits.map(hit => hit.recipe)); // Assume 'hits' is where the recipes are in the API response
    } catch (error) {
      console.error(`Error fetching ${mealType} recipes:`, error);
    }
  };

  useEffect(() => {
    fetchRecipesForMealType('healthy breakfast', setBreakfastRecipes);
    fetchRecipesForMealType('healthy lunch', setLunchRecipes);
    fetchRecipesForMealType('healthy dinner', setDinnerRecipes);
  }, []);

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
          <Text style={styles.headerText}>Recipes</Text>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Breakfast</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            {breakfastRecipes.map((recipe, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipe} 
                onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              >
                <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                <Text style={styles.recipeText}>{recipe.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Lunch</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            {lunchRecipes.map((recipe, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipe} 
                onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              >
                <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                <Text style={styles.recipeText}>{recipe.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Dinner</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            {dinnerRecipes.map((recipe, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipe} 
                onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              >
                <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                <Text style={styles.recipeText}>{recipe.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161E21', // Set background color to black
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding to avoid overlap with the navbar
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40, // Ensure this value is set correctly
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure the back button is on top
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10, // Adjust vertical margin if necessary
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 2, // Add marginTop to move the logo higher
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  category: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  recipeContainer: {
    flexDirection: 'row',
  },
  recipe: {
    alignItems: 'center',
    marginRight: 20, // Add margin to space out the items in the horizontal scroll
    width: 150, // Set a fixed width for the items
  },
  recipeImage: {
    width: 150, // Match the width to the recipe item width
    height: 150,
    borderRadius: 10,
  },
  recipeText: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Recipes;
