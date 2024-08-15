// app/assets/screens/Register4.js
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Image,Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSignUpContext } from '../context/SignUpContext';

export default function Register4Screen() {
    const { signUpData, setSignUpData } = useSignUpContext();
    const [goal, setGoal] = useState("");

    const navigation = useNavigation();

    const handleContinue = () => {

        if (!goal) {
            Alert.alert("Selection Required", "Please select one of the options for your goal.");
            return;
        }


        setSignUpData({ 
            ...signUpData, 
            goal 
        });
        console.log("Registering:", { goal });
        navigation.navigate('Register5');
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image 
                        source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
                        style={styles.logo} 
                    />
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.stepIndicator}>4/5</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.questionText}>What are your goals?</Text>
                    <TouchableOpacity 
                        style={[styles.optionButton, goal === 'lose' && styles.optionButtonSelected]} 
                        onPress={() => setGoal('lose')}
                    >
                        <Text style={styles.optionText}>Losing Weight</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, goal === 'maintain' && styles.optionButtonSelected]} 
                        onPress={() => setGoal('maintain')}
                    >
                        <Text style={styles.optionText}>Maintaining Weight</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, goal === 'gain' && styles.optionButtonSelected]} 
                        onPress={() => setGoal('gain')}
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
        backgroundColor: '#1E9947',
    },
    optionText: {
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