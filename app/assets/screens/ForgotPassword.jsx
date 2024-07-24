import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("");

    const handleSendEmail = () => {
        // Add any validation or API calls here
        navigation.navigate('EmailSent');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image 
                        source={{ uri: 'https://i.postimg.cc/cLXvz2BL/cropped-image-8.png' }} 
                        style={styles.logo} 
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Forgot Password?</Text>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Enter your email"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                        <Text style={styles.buttonText}>Send Email</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
      position: 'absolute',
      top: 55,
      alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 20,
    },
    formContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
        marginTop: 20, // Add space between logo and title
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
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
