import React, { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function Register3Screen() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");

    const navigation = useNavigation(); // Get the navigation prop

    const handleContinue = () => {
        // Add any validation or API calls here
        console.log("Registering:", { weight, height, gender });
        navigation.navigate('Register4'); // Navigate to Register4Screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://i.postimg.cc/cLXvz2BL/cropped-image-8.png' }} 
                    style={styles.logo} 
                />
                <Text style={styles.title}>Register</Text>
                <Text style={styles.stepIndicator}>3/5</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                    placeholder="Weight (Kg)"
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    value={height}
                    onChangeText={(text) => setHeight(text)}
                    placeholder="Height (Cm)"
                    style={styles.input}
                    keyboardType="numeric"
                />
                <View style={styles.genderContainer}>
                    <TouchableOpacity 
                        style={[styles.genderButton, gender === 'F' && styles.genderButtonSelected]} 
                        onPress={() => setGender('F')}
                    >
                        <Text style={styles.genderText}>F</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.genderButton, gender === 'M' && styles.genderButtonSelected]} 
                        onPress={() => setGender('M')}
                    >
                        <Text style={styles.genderText}>M</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#161E21',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
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
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 20,
    },
    genderButton: {
        width: 100,
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    genderButtonSelected: {
        backgroundColor: '#1E9947',
    },
    genderText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#1E9947',
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

