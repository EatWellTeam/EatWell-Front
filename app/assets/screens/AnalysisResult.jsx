import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from '@env';
import{useSignUpContext} from '../context/SignUpContext';


export default function AnalysisResult({ navigation, route }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editIngredients, setEditIngredients] = useState('');
    const [showRecalculate, setShowRecalculate] = useState(false);
    const [results, setResults] = useState(route.params.results); // Initialize results with props
    const [caloriesConsumed, setCaloriesConsumed] = useState(route.params.caloriesConsumed || 0); // Use caloriesConsumed from params
    const [caloriesLeft, setCaloriesLeft] = useState(route.params.caloriesLeft || 0); // Use caloriesLeft from params
    const initialCaloriesLeft = route.params.initialCaloriesLeft; // Use initialCaloriesLeft from params
    const imageUri = route.params.image;
    const { signUpData, setSignUpData } = useSignUpContext();
     


    
    const handleEdit = () => {
        setIsEditing(true);
        setEditIngredients(results.ingredients.join('\n')); // Join ingredients with a newline for editing
        setShowRecalculate(false);
    };

    const handleSaveMeal = async () => {
        
        try {
            const caloriesFromMeal = results.nutritionData.calories;
            

            const mealData = {
                name: results.ingredients[0],  // Use the first ingredient as the meal name
                calories: caloriesFromMeal,
                nutritionValues: {
                    calories: results.nutritionData.calories,
                    protein: results.nutritionData.totalNutrients?.PROCNT?.quantity || 0,
                    carbs: results.nutritionData.totalNutrients?.CHOCDF?.quantity || 0,
                    fat: results.nutritionData.totalNutrients?.FAT?.quantity || 0,
                },
                userId: signUpData._id,  
                imageUrl: imageUri || '', 
            };

            const response = await fetch(`http://10.0.0.6:3000/food/save-meal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData),
            });
    
            if (response.ok) {
                Alert.alert('Success', 'Meal saved successfully!');
                const updatedCaloriesConsumed = caloriesConsumed + caloriesFromMeal; //  update calories consumed
                const updatedCaloriesLeft = caloriesLeft - caloriesFromMeal; // update calories left

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
                    ingredients: editIngredients.split('\n').map(ingredient => ingredient.trim()), // Update ingredients with new ones
                    nutritionData: data.nutritionData, // Update nutrition data
                });
                Alert.alert('Recalculated!', 'Nutrition data has been updated.');
                
                
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
        // Navigate back to the Dashboard or previous screen without saving
        navigation.navigate('Dashboard')
    };

    const handleCancelEdit = () => {
        
        setIsEditing(false);
        setShowRecalculate(false);
        setEditIngredients(''); 
    };

    const handleXButtonPress = () => {
        const caloriesFromMeal = results.nutritionData.calories; // Calories from the analyzed meal
    
        console.log("Calories from meal:", caloriesFromMeal);
        console.log("Initial caloriesConsumed:", caloriesConsumed);
        console.log("Initial caloriesLeft:", caloriesLeft);
    
        navigation.navigate('Dashboard', {
            updatedCaloriesConsumed: caloriesConsumed,
            updatedCaloriesLeft: caloriesLeft,
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
           
            {!isEditing ? (
                <>
                    <TouchableOpacity style={styles.button} onPress={handleSaveMeal}>
                        <Text style={styles.buttonText}>Save Meal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCancelMeal}>
                        <Text style={styles.buttonText}>Cancel Meal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Edit Analysis</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={handleRecalculate}>
                        <Text style={styles.buttonText}>Recalculate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCancelEdit}>
                        <Text style={styles.buttonText}>Cancel Changes</Text>
                    </TouchableOpacity>
                </>
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