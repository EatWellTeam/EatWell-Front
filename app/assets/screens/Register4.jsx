import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function Register4Screen() {
    const [goal, setGoal] = useState("");
    const navigation = useNavigation(); // Get the navigation prop

    const handleContinue = () => {
        // Add any validation or API calls here
        console.log("Registering:", { goal });
        navigation.navigate('Register5'); // Navigate to Register5Screen
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
                    <Text style={styles.stepIndicator}>4/5</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.questionText}>What are your goals?</Text>
                    <TouchableOpacity 
                        style={[styles.optionButton, goal === 'Losing Weight' && styles.optionButtonSelected]} 
                        onPress={() => setGoal('Losing Weight')}
                    >
                        <Text style={styles.optionText}>Losing Weight</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, goal === 'Maintaining Weight' && styles.optionButtonSelected]} 
                        onPress={() => setGoal('Maintaining Weight')}
                    >
                        <Text style={styles.optionText}>Maintaining Weight</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, goal === 'Gaining Weight' && styles.optionButtonSelected]} 
                        onPress={() => setGoal('Gaining Weight')}
                    >
                        <Text style={styles.optionText}>Gaining Weight</Text>
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
        height: 50,
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

