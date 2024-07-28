import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const sampleRecipes = {
  breakfast: [
    {
      name: 'Avocado Toast with Poached Egg',
      image: 'https://i.ibb.co/6Zpvk4W/Avocado-Toast-with-Poached-Egg.jpg',
      groceries: [
        '1 slice whole grain bread (70 calories)',
        '1/2 avocado (120 calories)',
        '1 large egg (70 calories)',
        'Salt and pepper to taste',
      ],
      method: [
        'Toast 1 slice of whole grain bread.',
        'Mash 1/2 avocado and spread it on top of the toast.',
        'Poach 1 large egg to your desired level of doneness and place it on top of the avocado.',
        'Season with salt and pepper to taste.',
      ],
      calories: '260 calories',
    },
    {
      name: 'Chia Seed Pudding',
      image: 'https://i.ibb.co/4d8CrZj/Chia-Seed-Pudding.jpg',
      groceries: [
        '1/2 cup chia seeds (290 calories)',
        '2 cups almond milk (60 calories)',
        '1 tsp vanilla extract (12 calories)',
        '1 tbsp honey (64 calories)',
      ],
      method: [
        'In a bowl, combine chia seeds, almond milk, and vanilla extract.',
        'Stir well and refrigerate for at least 4 hours or overnight.',
        'Top with honey before serving.',
      ],
      calories: '426 calories',
    },
  ],
  lunch: [
    {
      name: 'Grilled Chicken Salad',
      image: 'https://i.ibb.co/LNfGkcL/Grilled-Chicken-Salad.jpg',
      groceries: [
        '1 chicken breast (165 calories)',
        '2 cups mixed greens (20 calories)',
        '1/2 cup cherry tomatoes (15 calories)',
        '1/4 cup feta cheese (100 calories)',
        '2 tbsp balsamic vinaigrette (80 calories)',
      ],
      method: [
        'Grill the chicken breast until fully cooked and slice it.',
        'In a bowl, combine mixed greens, cherry tomatoes, and feta cheese.',
        'Top with grilled chicken slices and drizzle with balsamic vinaigrette.',
      ],
      calories: '380 calories',
    },
    {
      name: 'Quinoa and Black Bean Bowl',
      image: 'https://i.ibb.co/Xj57mTj/Quinoa-and-Black-Bean-Bowl.jpg',
      groceries: [
        '1 cup cooked quinoa (222 calories)',
        '1/2 cup black beans (114 calories)',
        '1/2 cup corn (77 calories)',
        '1/4 cup salsa (20 calories)',
        '1/4 avocado (60 calories)',
      ],
      method: [
        'In a bowl, combine cooked quinoa, black beans, and corn.',
        'Top with salsa and avocado slices.',
      ],
      calories: '493 calories',
    },
  ],
  dinner: [
    // Add dinner recipes here
  ],
};

const Recipes = () => {
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

  useEffect(() => {
    requestMediaPermissions();
  }, []);

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
        {/* Custom Back Button */}
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
            {sampleRecipes.breakfast.map((recipe, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipe} 
                onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              >
                <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                <Text style={styles.recipeText}>{recipe.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Lunch</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            {sampleRecipes.lunch.map((recipe, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipe} 
                onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              >
                <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                <Text style={styles.recipeText}>{recipe.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Dinner</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            {sampleRecipes.dinner.map((recipe, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipe} 
                onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              >
                <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                <Text style={styles.recipeText}>{recipe.name}</Text>
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