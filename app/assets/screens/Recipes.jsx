import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


const Recipes = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [calorieRange, setCalorieRange] = useState({ min: 0, max: 1000 });
  const [minCalories, setMinCalories] = useState('0');
  const [maxCalories, setMaxCalories] = useState('1000');
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [mealType, setMealType] = useState(null); // Adjusted for JavaScript
  const navigation = useNavigation();

  const fetchRecipesByCalories = async (range, query, mealType) => {
    try {
      const response = await fetch(`${process.env.API_URL}/nutrition/get-recipes-by-calories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calorieRange: range,
          query: query,
          mealType: mealType ? [mealType] : [], // Send as array
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.hits || []);
    } catch (error) {
      console.error(`Error fetching recipes by calories:`, error);
    }
  };

  const handleSearchButtonPress = () => {
    const newRange = { min: parseInt(minCalories), max: parseInt(maxCalories) };
    fetchRecipesByCalories(newRange, ingredientQuery, mealType);

    setMinCalories('');
    setMaxCalories('');
    setIngredientQuery('');
  };

  const handleMealTypePress = (type) => {
    setMealType(prev => (prev === type ? null : type)); 
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

        <View style={styles.searchBar}>
          <Text style={styles.searchLabel}>Calories:</Text>
          <View style={styles.searchInputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.searchInput}
                value={minCalories}
                onChangeText={setMinCalories}
                placeholder="Min"
                placeholderTextColor="#a3a3a3"
                keyboardType="numeric"
              />
              <Text style={styles.inputLabel}>Min</Text>
            </View>
            <Text style={styles.rangeSeparator}>-</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.searchInput}
                value={maxCalories}
                onChangeText={setMaxCalories}
                placeholder="Max"
                placeholderTextColor="#a3a3a3"
                keyboardType="numeric"
              />
              <Text style={styles.inputLabel}>Max</Text>
            </View>
          </View>
          <View style={styles.searchIngredient}>
            <Text style={styles.searchLabel}>Ingredient:</Text>
            <TextInput
              style={styles.searchInput}
              value={ingredientQuery}
              onChangeText={setIngredientQuery}
              placeholder="Ingredient"
              placeholderTextColor="#a3a3a3"
            />
          </View>
          <View style={styles.searchIngredient}>
            <Text style={styles.searchLabel}>Meal Type:</Text>
            <View style={styles.mealTypeContainer}>
              {['Breakfast', 'Lunch', 'Dinner'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.mealTypeButton,
                    mealType === type && styles.mealTypeButtonSelected
                  ]}
                  onPress={() => handleMealTypePress(type)}
                >
                  <Text
                    style={[
                      styles.mealTypeButtonText,
                      mealType === type && styles.mealTypeButtonTextSelected
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.searchIngredient}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        </View>

        {searchResults.length > 0 ? (
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            {searchResults.map((hit, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recipe}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: hit.recipe })}
              >
                <Image style={styles.recipeImage} source={{ uri: hit.recipe.image }} />
                <Text style={styles.recipeText}>{hit.recipe.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <></>
          
        )}
      </ScrollView>
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
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10, 
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 2, 
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
    marginRight: 20, 
    width: 150, 
  },
  recipeImage: {
    width: 150, 
    height: 150,
    borderRadius: 10,
  },
  recipeText: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  searchBar: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  searchLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: '#1f2833',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#fff',
  },
  inputLabel: {
    color: '#a3a3a3',
    fontSize: 14,
    marginTop: 5,
  },
  rangeSeparator: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor:  '#1E9947',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchIngredient: {
    marginTop: 20,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  mealTypeButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTypeButtonSelected: {
    backgroundColor: '#1E9947',
    borderWidth: 2,
    borderColor: '#fff',
  },
  mealTypeButtonText: {
    color: '#000',
  },
  mealTypeButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Recipes;
