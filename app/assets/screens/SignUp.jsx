import React, { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the "eye" icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function SignUpScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
        console.log("Signing up:", { email, password });
        navigation.navigate('Register2'); // Navigate to Register2Screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
                    style={styles.logo} 
                />
                <Text style={styles.title}>Register</Text>
                <Text style={styles.stepIndicator}>1/5</Text>
            </View>
            <View style={styles.formContainer}>
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
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholder="Re-Enter your password"
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


