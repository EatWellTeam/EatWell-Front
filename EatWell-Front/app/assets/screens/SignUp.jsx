// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the "eye" icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function SignUpScreen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

    const navigation = useNavigation(); // Get the navigation prop

    const handleSignUp = () => {
        if (!email.includes('@')) {
            Alert.alert("Invalid email", "Please enter a valid email address.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match", "Please ensure that both passwords are the same.");
            return;
        }
        console.log("Signing up:", { firstName, lastName, email, password, dateOfBirth });
        navigation.navigate('UserDetails'); // Navigate to UserDetailsScreen
    };

    const formatDateOfBirth = (text) => {
        if (text.length === 2 || text.length === 5) {
            text += '/';
        }
        setDateOfBirth(text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground 
                source={{ uri: "https://i.ibb.co/5hGdWDj/Default-Create-a-visually-appealing-background-in-a-soft-muted-3-1.jpg" }} 
                style={styles.background}
            >
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    placeholder="First Name"
                    style={styles.input}
                />
                <TextInput
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    placeholder="Last Name"
                    style={styles.input}
                />
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    value={dateOfBirth}
                    onChangeText={(text) => formatDateOfBirth(text)}
                    placeholder="Date of Birth (MM/DD/YYYY)"
                    style={styles.input}
                    maxLength={10} // Restrict the input length to 10 characters
                    keyboardType="numeric" // Ensure the keyboard is numeric
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
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
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholder="Confirm Password"
                        secureTextEntry={!showConfirmPassword}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#fff',
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // To make the input fields slightly opaque
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#f8b049',
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
