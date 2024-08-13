import React, { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSignUpContext } from '../context/SignUpContext';
import { Picker } from '@react-native-picker/picker';

export default function Register2Screen() {
    const { signUpData, setSignUpData } = useSignUpContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const navigation = useNavigation();

    const validateName = (name) => /^[a-zA-Z]+$/.test(name);

    const handleContinue = () => {
        if (!validateName(firstName)) {
            Alert.alert("Error", "First name should contain letters only.");
            return;
        }
        if (!validateName(lastName)) {
            Alert.alert("Error", "Last name should contain letters only.");
            return;
        }
        const dayNum = parseInt(day);
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
            Alert.alert("Error", "Please enter a valid birth day.");
            return;
        }
        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            Alert.alert("Error", "Please enter a valid birth month.");
            return;
        }
        if (isNaN(yearNum) || yearNum < 1920 || yearNum > 2008) {
            Alert.alert("Error", "Please enter a valid birth year.");
            return;
        }
        if (yearNum > 2008) {
            Alert.alert("Error", "This app is for 16 years and older.");
            return;
        }

        const dob = `${year}-${month}-${day}`;
        setSignUpData({ 
            ...signUpData, 
            fullName: `${firstName} ${lastName}`, 
            dateOfBirth: dob 
        });
        console.log("Registering:", { firstName, lastName, day, month, year });
        navigation.navigate('Register3');
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 89 }, (_, i) => 2008 - i);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
                    style={styles.logo} 
                />
                <Text style={styles.title}>Register</Text>
                <Text style={styles.stepIndicator}>2/5</Text>
            </View>
            <ScrollView contentContainerStyle={styles.formContainer}>
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
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={day}
                            onValueChange={(itemValue) => setDay(itemValue)}
                            style={styles.picker}
                            mode="dropdown"
                        >
                            <Picker.Item label="Day" value="" />
                            {days.map((d) => (
                                <Picker.Item key={d} label={d.toString()} value={d.toString()} />
                            ))}
                        </Picker>
                        <Text style={styles.placeholderText}>
                            {day ? day : "Day"}
                        </Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={month}
                            onValueChange={(itemValue) => setMonth(itemValue)}
                            style={styles.picker}
                            mode="dropdown"
                        >
                            <Picker.Item label="Month" value="" />
                            {months.map((m) => (
                                <Picker.Item key={m} label={m.toString()} value={m.toString()} />
                            ))}
                        </Picker>
                        <Text style={styles.placeholderText}>
                            {month ? month : "Month"}
                        </Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={year}
                            onValueChange={(itemValue) => setYear(itemValue)}
                            style={styles.picker}
                            mode="dropdown"
                        >
                            <Picker.Item label="Year" value="" />
                            {years.map((y) => (
                                <Picker.Item key={y} label={y.toString()} value={y.toString()} />
                            ))}
                        </Picker>
                        <Text style={styles.placeholderText}>
                            {year ? year : "Year"}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
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
    dateOfBirthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 20,
    },
    pickerContainer: {
        width: 90,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        position: 'relative',
    },
    picker: {
        width: '100%',
        height: '100%',
        color: 'transparent', // Make picker text transparent
    },
    placeholderText: {
        position: 'absolute',
        left: 10,
        color: '#000',
        fontSize: 16,
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
