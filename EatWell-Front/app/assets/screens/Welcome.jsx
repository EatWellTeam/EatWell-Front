import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Platform, StyleSheet, Dimensions } from 'react-native';

export default function HomeScreen({ navigation }) {
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
        <SafeAreaView style={[styles.container, { width: dimensions.width, height: dimensions.height }]}>
            <View style={styles.content}>
                <Text style={styles.title}></Text>
                <TouchableOpacity onPress={() => console.log('Logo pressed')}>
                    <Image
                        source={{ uri: "https://i.postimg.cc/HxgKzxMj/cropped-image-11.png" }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}></View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}></View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}></View>
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
    content: {
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
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: '#1E9947',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25, // Make the button round
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
    },
});
