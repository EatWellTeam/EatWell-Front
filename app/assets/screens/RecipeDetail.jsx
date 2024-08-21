import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import HTMLView from 'react-native-htmlview';

export default function RecipeDetail({ route }) {
  const { recipe } = route.params;
  const navigation = useNavigation();
  const htmlContent = `<a href="${recipe.url}">View Recipe</a>`;
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
    console.log('Recipe url:', recipe.url);
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
            style={styles.logo} 
          />
        </View>
        <Text style={styles.title}>Recipe Details</Text>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{recipe.label}</Text>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {recipe.ingredientLines && recipe.ingredientLines.length > 0 ? (
            recipe.ingredientLines.map((ingredient, index) => (
              <Text key={index} style={styles.recipeText}>- {ingredient}</Text>
            ))
          ) : (
            <Text style={styles.recipeText}>Ingredients not available.</Text>
          )}
          <Text style={styles.sectionTitle}>Method of Preparation:</Text>
          {recipe.url?(<HTMLView value={htmlContent}/>):(<Text style={styles.recipeText}>Method not available.</Text>)}
          <Text style={styles.sectionTitle}>Nutritional Information:</Text>
          {recipe.totalNutrients ? (
            <>
              <Text style={styles.recipeText}>
                Calories: {recipe.calories ? ((recipe.calories / recipe.yield).toFixed(2))  : 'N/A'}
              </Text>
              {recipe.totalNutrients.CHOCDF && (
                <Text style={styles.recipeText}>
                  Carbohydrates: {(recipe.totalNutrients.CHOCDF.quantity / recipe.yield).toFixed(2)} {recipe.totalNutrients.CHOCDF.unit}
                </Text>
              )}
              {recipe.totalNutrients.PROCNT && (
                <Text style={styles.recipeText}>
                  Protein: {(recipe.totalNutrients.PROCNT.quantity / recipe.yield).toFixed(2)} {recipe.totalNutrients.PROCNT.unit}
                </Text>
              )}
              {recipe.totalNutrients.FAT && (
                <Text style={styles.recipeText}>
                  Fat: {(recipe.totalNutrients.FAT.quantity / recipe.yield).toFixed(2)} {recipe.totalNutrients.FAT.unit}
                </Text>
              )}
            </>
          ) : (
            <Text style={styles.recipeText}>Nutritional information not available.</Text>
          )}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#161E21',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80, 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, 
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  recipeImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  recipeContent: {
    width: '90%',
    alignItems: 'flex-start',
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  recipeText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#161E21', 
    paddingVertical: 10,
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', 
    paddingHorizontal: 10,
  },
  navButton: {
    alignItems: 'center',
    padding: 10,
  },
});
