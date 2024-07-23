import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, Platform, StatusBar, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the "eye" icon

export default function LoginScreen({ navigation }) { // Add navigation prop
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleContinue = () => {
        // Add any validation or API calls here
        navigation.navigate('EditProfile');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground 
                source={{ uri: "https://i.ibb.co/5hGdWDj/Default-Create-a-visually-appealing-background-in-a-soft-muted-3-1.jpg" }} 
                style={styles.background}
            >
                <Text style={styles.title}>Login Screen</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    style={styles.input}
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
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>CONTINUE</Text>
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
