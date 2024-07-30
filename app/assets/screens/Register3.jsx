// app/assets/screens/Register3.js
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSignUpContext } from '../context/SignUpContext';

export default function Register3Screen() {
    const { signUpData, setSignUpData } = useSignUpContext();
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");

    const navigation = useNavigation();

    const handleContinue = () => {
        setSignUpData({ 
            ...signUpData, 
            weight, 
            height, 
            gender 
        });
        console.log("Registering:", { weight, height, gender });
        navigation.navigate('Register4');
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
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
