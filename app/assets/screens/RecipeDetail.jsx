import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';

export default function RecipeDetail({ route, navigation }) {
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://i.postimg.cc/cLXvz2BL/cropped-image-8.png' }} 
            style={styles.logo} 
          />
        </View>
        <Text style={styles.title}>Recepies</Text>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <Text style={styles.sectionTitle}>Groceries:</Text>
          {recipe.groceries.map((item, index) => (
            <Text key={index} style={styles.recipeText}>- {item}</Text>
          ))}
          <Text style={styles.sectionTitle}>Method of Preparation:</Text>
          {recipe.method.map((step, index) => (
            <Text key={index} style={styles.recipeText}>{index + 1}. {step}</Text>
          ))}
          <Text style={styles.recipeText}>Total Calories: {recipe.calories}</Text>
        </View>
      </ScrollView>
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
});
