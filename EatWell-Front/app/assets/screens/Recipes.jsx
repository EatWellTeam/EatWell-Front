// app/assets/screens/Recipes.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

const Recipes = () => {
  return (
    <ImageBackground source={{ uri: 'https://i.ibb.co/pvY7xcx/Default-Create-a-background-image-similar-to-the-image-you-mad-3.jpg' }} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.ibb.co/3Yv3Hq8/Screenshot-2024-07-20-185504.png' }} style={styles.logo} />
          <Text style={styles.headerText}>Recipes</Text>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Breakfast</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            <View style={styles.recipe}>
              <Image style={styles.recipeImage} source={{ uri: 'https://i.ibb.co/6Zpvk4W/Avocado-Toast-with-Poached-Egg.jpg' }} />
              <Text style={styles.recipeText}>Avocado Toast with Poached Egg</Text>
            </View>
            <View style={styles.recipe}>
              <Image style={styles.recipeImage} source={{ uri: 'https://images-ext-1.discordapp.net/external/NtFzd-Obz1AK4knqLP7QEBaQHjmbEc90kAof0EpPIic/https/i.ibb.co/4d8CrZj/Chia-Seed-Pudding.jpg' }} />
              <Text style={styles.recipeText}>Chia Seed Pudding</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Lunch</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            <View style={styles.recipe}>
              <Image style={styles.recipeImage} source={{ uri: 'https://i.ibb.co/LNfGkcL/Grilled-Chicken-Salad.jpg' }} />
              <Text style={styles.recipeText}>Grilled Chicken Salad</Text>
            </View>
            <View style={styles.recipe}>
              <Image style={styles.recipeImage} source={{ uri: 'https://i.ibb.co/Xj57mTj/Quinoa-and-Black-Bean-Bowl.jpg' }} />
              <Text style={styles.recipeText}>Quinoa and Black Bean Bowl</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryText}>Dinner</Text>
          <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
            {/* Add dinner recipes here */}
          </ScrollView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  category: {
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  recipeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  recipe: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  recipeImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  recipeText: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Recipes;
