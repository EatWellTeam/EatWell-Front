import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the "eye" icon

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleContinue = () => {
        // Add any validation or API calls here
        navigation.navigate('EditProfile');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://i.postimg.cc/rmJCZ5G4/cropped-image.png' }} 
                    style={styles.logo} 
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.welcomeText}>Welcome Back!</Text>
                <Text style={styles.loginPrompt}>Log in to continue your journey</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter your email"
                    style={styles.input}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.forgotPassword}>forgot password?</Text>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.signupPrompt}>Don't have an account? <Text style={styles.signupText}>Sign Up</Text></Text>
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
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        marginTop: 20, // Add space between logo and welcome text
    },
    loginPrompt: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 30,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        padding: 10,
        borderRadius: 10,
    },
    eyeIcon: {
        padding: 10,
    },
    forgotPassword: {
        color: '#fff',
        marginBottom: 20,
        alignSelf: 'flex-end',
        marginRight: 40,
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
    signupPrompt: {
        color: '#fff',
        marginTop: 20,
    },
    signupText: {
        color: '#6200ee',
    },
});

