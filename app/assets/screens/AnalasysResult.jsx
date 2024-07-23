import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AnalasysResult({ navigation, route }) {
  const { results } = route.params

  const Fat = useMemo(() => { 
     if(!results) return null 
     else return  results.results.nutritionData?.totalNutrients["FAT"]
   },[results])
   const Carbs = useMemo(() => { 
    if(!results) return null 
    else return  results.results.nutritionData?.totalNutrients["CHOCDF"]
  },[results])
  const Protein = useMemo(() => { 
    if(!results) return null 
    else return  results.results.nutritionData?.totalNutrients["PROCNT"]
  },[results])

  /*useEffect(() => {
    const fetchResultsLocally = async () => {
      if (!results) {
        const storedResults = await AsyncStorage.getItem("results");
        if (storedResults) {
          const parsed = JSON.parse(storedResults)
          setResults(parsed);
        }
      }
    };
    fetchResultsLocally();
  }, []);*/

  if (!results || !Protein || !Carbs || !Fat) {
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
        <Text style={styles.textSection}>{Protein.quantity.toFixed(3)}</Text>
        <Text style={styles.textTitle}>{"Carbs"}</Text>
        <Text style={styles.textSection}>{Carbs.quantity.toFixed(3)}</Text>
        <Text style={styles.textTitle}>{"Fat"}</Text>
        <Text style={styles.textSection}>{Fat.quantity.toFixed(3)}</Text>
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
