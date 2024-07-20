import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Platform, StyleSheet, Button, Alert, Dimensions } from 'react-native';

export default function HomeScreen() {
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions(window);
        });
        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <>
            <SafeAreaView style={[styles.container, { width: dimensions.width, height: dimensions.height }]}>
                <Text></Text>
                <TouchableOpacity onPress={() => console.log()}>
                    <Image
                        source={{ uri: "https://i.ibb.co/wL36F9S/eat-well-logo.png" }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}></View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Log in"
                        onPress={() => Alert.alert("You have clicked the button", "There is no more to do")}
                        color="#00A059"
                    />
                </View>
                <View style={{ marginTop: 20 }}></View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign up"
                        onPress={() => Alert.alert("You have clicked the button", "There is no more to do")}
                        color="#00A059"
                    />
                </View>
                <View style={{ marginTop: 50 }}></View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150, // make the image circular
    },
    buttonContainer: {
        width: 200,
        height: 50,
    },
});
