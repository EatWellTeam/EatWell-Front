// UserDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function UserDetailsScreen({ navigation }) {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = () => {
        // Handle submission logic here
        console.log("User details:", { weight, height, gender });
        // Navigate to the next screen or perform any action
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                    placeholder="Enter your weight"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.label}>Height (cm)</Text>
                <TextInput
                    value={height}
                    onChangeText={(text) => setHeight(text)}
                    placeholder="Enter your height"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.label}>Gender</Text>
                <TextInput
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                    placeholder="Enter your gender"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    form: {
        width: '80%',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        height: 50,
        backgroundColor: '#f8b049',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
