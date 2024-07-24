import React, { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function Register2Screen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const navigation = useNavigation(); // Get the navigation prop

    const handleContinue = () => {
        // Add any validation or API calls here
        console.log("Registering:", { firstName, lastName, day, month, year });
        navigation.navigate('Register3'); // Navigate to Register3Screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://i.postimg.cc/cLXvz2BL/cropped-image-8.png' }} 
                    style={styles.logo} 
                />
                <Text style={styles.title}>Register</Text>
                <Text style={styles.stepIndicator}>2/5</Text>
            </View>
            <View style={styles.formContainer}>
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
                <View style={styles.dateOfBirthContainer}>
                    <TextInput
                        value={day}
                        onChangeText={(text) => setDay(text)}
                        placeholder="Day"
                        style={styles.dateInput}
                        keyboardType="numeric"
                        maxLength={2}
                    />
                    <TextInput
                        value={month}
                        onChangeText={(text) => setMonth(text)}
                        placeholder="Month"
                        style={styles.dateInput}
                        keyboardType="numeric"
                        maxLength={2}
                    />
                    <TextInput
                        value={year}
                        onChangeText={(text) => setYear(text)}
                        placeholder="Year"
                        style={styles.dateInput}
                        keyboardType="numeric"
                        maxLength={4}
                    />
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
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
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
    dateOfBirthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 20,
    },
    dateInput: {
        width: 90,
        height: 50,
        backgroundColor: '#fff',
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

