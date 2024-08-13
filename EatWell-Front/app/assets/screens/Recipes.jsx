import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '@env'; // Ensure this imports correctly

const Recipes = () => {
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);
  const navigation = useNavigation();

  // Function to fetch recipes for a specific meal type
  const fetchRecipesForMealType = async (mealType, setRecipes) => {
    try {
      const response = await fetch(`http://10.160.1.46:3000/nutrition/get-recipes`, {
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
    fetchRecipesForMealType('breakfast', setBreakfastRecipes);
    fetchRecipesForMealType('lunch', setLunchRecipes);
    fetchRecipesForMealType('dinner', setDinnerRecipes);
    requestMediaPermissions();
  }, []);

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
    }
  }

  async function openGallery() {
    const permissions = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!permissions.granted) {
      requestMediaPermissions();
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Image selected from gallery:', uri);
    }
  }

  async function requestMediaPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibraryStatus.status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  }

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

export default Recipes;
