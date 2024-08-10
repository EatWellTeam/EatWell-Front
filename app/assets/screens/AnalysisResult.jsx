import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from '@env';

export default function AnalysisResult({ navigation, route }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editIngredients, setEditIngredients] = useState('');
    const [showRecalculate, setShowRecalculate] = useState(false);
    const [results, setResults] = useState(route.params.results); // Initialize results with props
    const [caloriesConsumed, setCaloriesConsumed] = useState(route.params.caloriesConsumed || 0); // Use caloriesConsumed from params
    const [caloriesLeft, setCaloriesLeft] = useState(route.params.caloriesLeft || 0); // Use caloriesLeft from params
    const initialCaloriesLeft = route.params.initialCaloriesLeft; // Use initialCaloriesLeft from params
    const imageUri = route.params.image;

    const handleEdit = () => {
        setIsEditing(true);
        setEditIngredients(results.ingredients.join('\n')); // Join ingredients with a newline for editing
        setShowRecalculate(false);
    };

    const handleSave = () => {
        setIsEditing(false);
        results.ingredients = editIngredients.split('\n').map(ingredient => ingredient.trim()); // Split by newline and trim each ingredient
        Alert.alert('Saved!', 'Your changes have been saved.');
        setShowRecalculate(true);
    };

    const handleRecalculate = async () => {
        try {
            const response = await fetch(`${API_URL}/nutrition/get-nutrition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients: editIngredients.split('\n').map(ingredient => ingredient.trim()) }),
            });
            const data = await response.json();

            if (response.ok) {
                // Update the results with new nutrition data
                setResults({
                    ...results,
                    nutritionData: data.nutritionData,
                });
                Alert.alert('Recalculated!', 'Nutrition data has been updated.');
            } else {
                throw new Error(data.error || 'Failed to recalculate');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleXButtonPress = () => {
        const caloriesFromPhoto = results.nutritionData.calories; // Calories from the analyzed photo
    
        console.log("Calories from photo:", caloriesFromPhoto);
        console.log("Initial caloriesConsumed:", caloriesConsumed);
        console.log("Initial caloriesLeft:", caloriesLeft);
    
        const updatedCaloriesConsumed = caloriesConsumed + caloriesFromPhoto; // Correctly update calories consumed
        const updatedCaloriesLeft = caloriesLeft - caloriesFromPhoto; // Correctly update calories left
    
        console.log("Updated caloriesConsumed:", updatedCaloriesConsumed);
        console.log("Updated caloriesLeft:", updatedCaloriesLeft);
    
        // Navigate back and pass updated values
        navigation.navigate('Dashboard', {
            updatedCaloriesConsumed: updatedCaloriesConsumed, 
            updatedCaloriesLeft: updatedCaloriesLeft,
            initialCaloriesLeft: initialCaloriesLeft,
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleXButtonPress}>
                <Ionicons name="close-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Image source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} style={styles.logo} />
            <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollViewContentContainer}>
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
                                <Text key={index} style={styles.text}>{ingredient}</Text>
                            ))
                        )}
                        <Text style={styles.sectionTitle}>Nutrition</Text>
                        <Text style={styles.text}>Calories: {results.nutritionData.calories}</Text>
                        <Text style={styles.text}>Protein: {results.nutritionData.totalNutrients?.PROCNT?.quantity?.toFixed(2) || 0}g</Text>
                        <Text style={styles.text}>Carbs: {results.nutritionData.totalNutrients?.CHOCDF?.quantity?.toFixed(2) || 0}g</Text>
                        <Text style={styles.text}>Fat: {results.nutritionData.totalNutrients?.FAT?.quantity?.toFixed(2) || 0}g</Text>
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
                                <Text key={index} style={styles.text}>{ingredient}</Text>
                            ))
                        )}
                        <Text style={styles.sectionTitle}>Nutrition</Text>
                        <Text style={styles.text}>Calories: {results.nutritionData.calories}</Text>
                        <Text style={styles.text}>Protein: {results.nutritionData.totalNutrients?.PROCNT?.quantity?.toFixed(2) || 0}g</Text>
                        <Text style={styles.text}>Carbs: {results.nutritionData.totalNutrients?.CHOCDF?.quantity?.toFixed(2) || 0}g</Text>
                        <Text style={styles.text}>Fat: {results.nutritionData.totalNutrients?.FAT?.quantity?.toFixed(2) || 0}g</Text>
                    </>
                )}
            </ScrollView>
            {isEditing ? (
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Edit Analysis</Text>
                </TouchableOpacity>
            )}
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
        backgroundColor: '#161E21',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
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
        width: '100%',
    },
    scrollViewContentContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1E9947',
        padding: 15,
        borderRadius: 5,
        margin: 10,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
