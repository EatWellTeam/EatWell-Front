import { useState } from 'react';
import { View, Text, Button, SafeAreaView, Platform, StatusBar, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the "eye" icon

export default function SignUpScreen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match", "Please ensure that both passwords are the same.");
            return;
        }
        console.log("Signing up:", { firstName, lastName, email, password });
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
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        style={styles.input}
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
                        style={styles.input}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign Up"
                        onPress={handleSignUp}
                        color="#f8b049"
                    />
                </View>
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
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
    buttonContainer: {
        width: 300,
        height: 50,
    },
});
