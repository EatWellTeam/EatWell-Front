import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URL } from "@env";

export default function AnalysisResult({ navigation, route }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editIngredients, setEditIngredients] = useState("");
  const [showRecalculate, setShowRecalculate] = useState(false);
  const [results, setResults] = useState(route.params.results);
  const [caloriesConsumed, setCaloriesConsumed] = useState(
    route.params.caloriesConsumed || 0
  );
  const [caloriesLeft, setCaloriesLeft] = useState(
    route.params.caloriesLeft || 0
  );
  const initialCaloriesLeft = route.params.initialCaloriesLeft;
  const imageUri = route.params.image;

  const handleEdit = () => {
    setIsEditing(true);
    setEditIngredients(results.ingredients.join("\n"));
    setShowRecalculate(true);
  };

  const handleSave = () => {
    const caloriesFromPhoto = results.nutritionData.calories;

    const updatedCaloriesConsumed = caloriesConsumed + caloriesFromPhoto;
    const updatedCaloriesLeft = caloriesLeft - caloriesFromPhoto;

    navigation.navigate("Dashboard", {
      updatedCaloriesConsumed: updatedCaloriesConsumed,
      updatedCaloriesLeft: updatedCaloriesLeft,
      initialCaloriesLeft: initialCaloriesLeft,
    });
  };

  const handleRecalculate = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.17:3000/nutrition/get-nutrition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: editIngredients
              .split("\n")
              .map((ingredient) => ingredient.trim()),
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setResults({
          ...results,
          nutritionData: data.nutritionData,
        });
        Alert.alert("Recalculated!", "Nutrition data has been updated.");
        setShowRecalculate(false);
        setIsEditing(false);
      } else {
        throw new Error(data.error || "Failed to recalculate");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleXButtonPress = () => {
    handleSave();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleXButtonPress}>
        <Ionicons name="close-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <Image
        source={{ uri: "https://i.postimg.cc/HxgKzxMj/cropped-image-11.png" }}
        style={styles.logo}
      />
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editIngredients}
                onChangeText={setEditIngredients}
                multiline
              />
            ) : (
              results.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.text}>
                  {ingredient}
                </Text>
              ))
            )}
            <Text style={styles.sectionTitle}>Nutrition</Text>
            <Text style={styles.text}>
              Calories: {results.nutritionData.calories}
            </Text>
            <Text style={styles.text}>
              Protein:{" "}
              {results.nutritionData.totalNutrients?.PROCNT?.quantity?.toFixed(
                2
              ) || 0}
              g
            </Text>
            <Text style={styles.text}>
              Carbs:{" "}
              {results.nutritionData.totalNutrients?.CHOCDF?.quantity?.toFixed(
                2
              ) || 0}
              g
            </Text>
            <Text style={styles.text}>
              Fat:{" "}
              {results.nutritionData.totalNutrients?.FAT?.quantity?.toFixed(
                2
              ) || 0}
              g
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editIngredients}
                onChangeText={setEditIngredients}
                multiline
              />
            ) : (
              results.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.text}>
                  {ingredient}
                </Text>
              ))
            )}
            <Text style={styles.sectionTitle}>Nutrition</Text>
            <Text style={styles.text}>
              Calories: {results.nutritionData.calories}
            </Text>
            <Text style={styles.text}>
              Protein:{" "}
              {results.nutritionData.totalNutrients?.PROCNT?.quantity?.toFixed(
                2
              ) || 0}
              g
            </Text>
            <Text style={styles.text}>
              Carbs:{" "}
              {results.nutritionData.totalNutrients?.CHOCDF?.quantity?.toFixed(
                2
              ) || 0}
              g
            </Text>
            <Text style={styles.text}>
              Fat:{" "}
              {results.nutritionData.totalNutrients?.FAT?.quantity?.toFixed(
                2
              ) || 0}
              g
            </Text>
          </>
        )}
      </ScrollView>
      {/* Show Save and Edit Analysis buttons */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit Analysis</Text>
      </TouchableOpacity>
      {/* Show Recalculate button when editing */}
      {showRecalculate && (
        <TouchableOpacity style={styles.button} onPress={handleRecalculate}>
          <Text style={styles.buttonText}>Recalculate</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#161E21",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  scrollViewContentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1E9947",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
