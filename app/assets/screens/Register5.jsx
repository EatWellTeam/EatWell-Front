import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function Register5Screen() {
    const [activityLevel, setActivityLevel] = useState("");
    const navigation = useNavigation(); // Get the navigation prop

    const handleContinue = () => {
        // Add any validation or API calls here
        console.log("Registering:", { activityLevel });
        navigation.navigate('Home'); // Navigate to Home screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image 
                        source={{ uri: 'https://i.postimg.cc/rmJCZ5G4/cropped-image.png' }} 
                        style={styles.logo} 
                    />
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.stepIndicator}>5/5</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.questionText}>What is your activity level?</Text>
                    <TouchableOpacity 
                        style={[styles.optionButton, activityLevel === 'High' && styles.optionButtonSelected]} 
                        onPress={() => setActivityLevel('High')}
                    >
                        <Text style={styles.optionText}>High</Text>
                        <Text style={styles.optionSubText}>20+ hours a week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, activityLevel === 'Medium' && styles.optionButtonSelected]} 
                        onPress={() => setActivityLevel('Medium')}
                    >
                        <Text style={styles.optionText}>Medium</Text>
                        <Text style={styles.optionSubText}>10-20 hours a week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, activityLevel === 'Low' && styles.optionButtonSelected]} 
                        onPress={() => setActivityLevel('Low')}
                    >
                        <Text style={styles.optionText}>Low</Text>
                        <Text style={styles.optionSubText}>Less than 10 hours a week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    stepIndicator: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 20,
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
    },
    optionButton: {
        width: 300,
        height: 70,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    optionButtonSelected: {
        backgroundColor: '#6200ee',
    },
    optionText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionSubText: {
        color: '#000',
        fontSize: 14,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

