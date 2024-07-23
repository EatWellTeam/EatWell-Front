// UserDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function UserDetailsScreen({ navigation }) {
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [height, setHeight] = useState("");
    const [heightUnit, setHeightUnit] = useState("cm");
    const [gender, setGender] = useState("Male");

    const handleSubmit = () => {
        // Handle submission logic here
        console.log("User details:", { weight, weightUnit, height, heightUnit, gender });
        // Navigate to the next screen or perform any action
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://i.ibb.co/pvY7xcx/Default-Create-a-background-image-similar-to-the-image-you-mad-3.jpg' }}
                style={styles.background}
            >
                <View style={styles.form}>
                    <Text style={styles.label}>Weight</Text>
                    <View style={styles.unitContainer}>
                        <TextInput
                            value={weight}
                            onChangeText={(text) => setWeight(text)}
                            placeholder="Enter your weight"
                            keyboardType="numeric"
                            style={[styles.input, { flex: 2 }]}
                        />
                        <Picker
                            selectedValue={weightUnit}
                            style={[styles.input, { flex: 1, marginLeft: 10 }]}
                            onValueChange={(itemValue) => setWeightUnit(itemValue)}
                        >
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="pounds" value="pounds" />
                        </Picker>
                    </View>
                    <Text style={styles.label}>Height</Text>
                    <View style={styles.unitContainer}>
                        <TextInput
                            value={height}
                            onChangeText={(text) => setHeight(text)}
                            placeholder="Enter your height"
                            keyboardType="numeric"
                            style={[styles.input, { flex: 2 }]}
                        />
                        <Picker
                            selectedValue={heightUnit}
                            style={[styles.input, { flex: 1, marginLeft: 10 }]}
                            onValueChange={(itemValue) => setHeightUnit(itemValue)}
                        >
                            <Picker.Item label="cm" value="cm" />
                            <Picker.Item label="inches" value="inches" />
                        </Picker>
                    </View>
                    <Text style={styles.label}>Gender</Text>
                    <Picker
                        selectedValue={gender}
                        style={styles.input}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
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
        backgroundColor: '#fff',
    },
    unitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
