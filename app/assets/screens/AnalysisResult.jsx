import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from '@env';
import{useSignUpContext} from '../context/SignUpContext';
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnalysisResult({ navigation, route }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editIngredients, setEditIngredients] = useState('');
    const [showRecalculate, setShowRecalculate] = useState(false);
    const [results, setResults] = useState(route.params.results);
    const [caloriesConsumed, setCaloriesConsumed] = useState(route.params.caloriesConsumed || 0);
    const [caloriesLeft, setCaloriesLeft] = useState(route.params.caloriesLeft || 0);
    const initialCaloriesLeft = route.params.initialCaloriesLeft;
    const imageUri = route.params.image;
    const { signUpData, setSignUpData } = useSignUpContext();

    const handleEdit = () => {
        setIsEditing(true);
        setEditIngredients(results.ingredients.join('\n')); 
        setShowRecalculate(false);
    };

    const handleSaveMeal = async () => {
        try {
            const caloriesFromMeal = results.nutritionData.calories;
            const mealData = {
                name: results.ingredients[0], 
                calories: caloriesFromMeal,
                nutritionValues: {
                    calories: results.nutritionData.calories,
                    protein: results.nutritionData.totalNutrients?.PROCNT?.quantity || 0,
                    carbs: results.nutritionData.totalNutrients?.CHOCDF?.quantity || 0,
                    fat: results.nutritionData.totalNutrients?.FAT?.quantity || 0,
                },
                userId: signUpData._id,  
                imageUrl: imageUri || 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png',
            };

            const response = await fetch(`${process.env.API_URL}/food/save-meal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData),
            });
    
            if (response.ok) {
                const updatedCaloriesConsumed = caloriesConsumed + caloriesFromMeal; 
                const updatedCaloriesLeft = caloriesLeft - caloriesFromMeal; 

                setCaloriesConsumed(updatedCaloriesConsumed);
                setCaloriesLeft(updatedCaloriesLeft);
                
                navigation.navigate('Dashboard', {
                    updatedCaloriesConsumed,
                    updatedCaloriesLeft,
                    initialCaloriesLeft,
                });
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to save meal');
            }
        } catch (error) {
            console.error('Error saving meal:', error);
            Alert.alert('Error', 'An error occurred while saving the meal.');
        }
    };

    const handleRecalculate = async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/nutrition/get-nutrition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients: editIngredients.split('\n').map(ingredient => ingredient.trim()) }),
            });
            const data = await response.json();
    
            if (response.ok) {
                setResults({
                    ...results,
                    ingredients: editIngredients.split('\n').map(ingredient => ingredient.trim()), 
                    nutritionData: data.nutritionData, 
                });
                setIsEditing(false);
                setShowRecalculate(false);
            } else {
                throw new Error(data.error || 'Failed to recalculate');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleCancelMeal = () => {
        navigation.navigate('Dashboard');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setShowRecalculate(false);
        setEditIngredients('');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} style={styles.logo} />
                <View style={styles.contentWrapper}>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
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
                        <View style={styles.resultContainer}>
                            <Text style={styles.sectionTitle}>Nutrition</Text>
                            <Text style={styles.text}>Calories: {results.nutritionData.calories}</Text>
                            <Text style={styles.text}>Protein: {results.nutritionData.totalNutrients?.PROCNT?.quantity?.toFixed(2) || 0}g</Text>
                            <Text style={styles.text}>Carbs: {results.nutritionData.totalNutrients?.CHOCDF?.quantity?.toFixed(2) || 0}g</Text>
                            <Text style={styles.text}>Fat: {results.nutritionData.totalNutrients?.FAT?.quantity?.toFixed(2) || 0}g</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    {!isEditing ? (
                        <>
                            <TouchableOpacity style={styles.button} onPress={handleSaveMeal}>
                                <Text style={styles.buttonText}>Save Meal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleCancelMeal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleEdit}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.button} onPress={handleRecalculate}>
                                <Text style={styles.buttonText}>Recalculate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleCancelEdit}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#161E21',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    contentWrapper: {
        flex: 1,
        width: '100%',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#161E21',
    },
    scrollViewContent: {
        padding: 20,
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
        borderRadius: 5,
    },
    resultContainer: {
        backgroundColor: '#1D1D1D',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        minWidth: '30%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});