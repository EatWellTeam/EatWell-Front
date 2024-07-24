import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Recipes = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.postimg.cc/cLXvz2BL/cropped-image-8.png' }} style={styles.logo} />
        <Text style={styles.headerText}>Recepies</Text>
      </View>

      <View style={styles.category}>
        <Text style={styles.categoryText}>Breakfast</Text>
        <ScrollView horizontal contentContainerStyle={styles.recipeContainer}>
          <View style={styles.recipe}>
            <Image style={styles.recipeImage} source={{ uri: 'https://i.ibb.co/6Zpvk4W/Avocado-Toast-with-Poached-Egg.jpg' }} />
            <Text style={styles.recipeText}>Avocado Toast with Poached Egg</Text>
          </View>
          <View style={styles.recipe}>
            <Image style={styles.recipeImage} source={{ uri: 'https://i.ibb.co/4d8CrZj/Chia-Seed-Pudding.jpg' }} />
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
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: '#161E21', // Set background color to black
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
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
