import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, Animated, TouchableOpacity, Image, Alert } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSignUpContext } from '../context/SignUpContext';
import axios from 'axios';

export default function Register6Screen() {
    const { signUpData } = useSignUpContext();
    const [calories, setCalories] = useState(0);
    const animatedValue = new Animated.Value(0);
    const navigation = useNavigation();

    const handleContinue = async () => {
        console.log("Navigating to Dashboard");
        console.log(signUpData);
        try {
            const response = await axios.post('http://192.168.1.107:3000/auth/register', signUpData);
            if (response.status === 201) {
                console.log('Registration successful', response.data);
                const { recommendedCalories } = response.data;
                setCalories(recommendedCalories);
                Alert.alert('Success', 'Registration successful');
                navigation.navigate('Dashboard');
            } else {
                console.log('Unexpected response', response.data);
                Alert.alert('Error', 'Unexpected response from the server');
            }
        } catch (error) {
            console.log('Registration error', error);
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: calories,
            duration: 5000,
            useNativeDriver: false,
        }).start();

        animatedValue.addListener(({ value }) => {
            setCalories(Math.round(value));
        });

        return () => animatedValue.removeAllListeners();
    }, [calories]);

    const circleRadius = 100;
    const circumference = 2 * Math.PI * circleRadius;
    const animatedCircle = animatedValue.interpolate({
        inputRange: [0, calories],
        outputRange: [circumference, 0]
    });

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Register5')}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
                    style={styles.logo} 
                />
            </View>
            <Text style={styles.congratulationsText}>Congratulations! You are ready to start your journey</Text>
            <View style={styles.circleContainer}>
                <Svg height="200" width="200" viewBox="0 0 200 200">
                    <Circle
                        cx="100"
                        cy="100"
                        r="90"
                        stroke="#eee"
                        strokeWidth="20"
                        fill="none"
                    />
                    <Circle
                        cx="100"
                        cy="100"
                        r="90"
                        stroke="#1E9947"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={animatedCircle}
                        strokeLinecap="round"
                    />
                </Svg>
                <View style={styles.textContainer}>
                    <Text style={styles.caloriesText}>Total calories consumption</Text>
                    <Text style={styles.caloriesAmount}>{calories}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161E21',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
        left: 20,
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    header: {
        position: 'absolute',
        top: 60,
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 100,
        height: 100,
    },
    congratulationsText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 200,
        height: 200,
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 170,
        height: 180,
    },
    caloriesText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
    },
    caloriesAmount: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    continueButton: {
        backgroundColor: '#1E9947',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 40,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
