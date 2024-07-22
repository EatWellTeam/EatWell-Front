import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AnalasysResult({ navigation, route }) {
  const { results: initialResults } = route.params || {};
  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    const fetchResultsLocally = async () => {
      if (!results) {
        const storedResults = await AsyncStorage.getItem("results");
        if (storedResults) {
          setResults(JSON.parse(storedResults));
        }
      }
    };
    fetchResultsLocally();
  }, []);

  if (!results) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: results.image }} style={{ width: 200, height: 200, margin: 10, borderRadius: 10 }} />
        <Text style={styles.textTitle}>{"Ingredients"}</Text>
        <View style={styles.textSection}>
          {results.results.ingredients.map((ingredient, index) => {
            return <Text key={index + ingredient}>{ingredient}</Text>;
          })}
        </View>

        <Text style={styles.textTitle}>{"Calories"}</Text>
        <Text style={styles.textSection}>{results.results.nutritionData.calories}</Text>
        <Text style={styles.textTitle}>{"Protein"}</Text>
        <Text style={styles.textSection}>{results.results.nutritionData.Proteins}</Text>
        <Text style={styles.textTitle}>{"Carbs"}</Text>
        <Text style={styles.textSection}>{results.results.nutritionData.Carbs}</Text>
        <Text style={styles.textTitle}>{"Fat"}</Text>
        <Text style={styles.textSection}>{results.results.nutritionData.Fats}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontSize: 16,
    fontWeight: 'normal',
    padding: 10
  }
});
