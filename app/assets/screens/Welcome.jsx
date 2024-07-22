import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Platform, StyleSheet, Dimensions, ImageBackground } from 'react-native';

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
            <ImageBackground 
                source={{ uri: "https://i.ibb.co/pvY7xcx/Default-Create-a-background-image-similar-to-the-image-you-mad-3.jpg" }} 
                style={styles.background}
            >
                <Text style={styles.title}></Text>
                <TouchableOpacity onPress={() => console.log('Logo pressed')}>
                    <Image
                        source={{ uri: "https://i.ibb.co/3Yv3Hq8/Screenshot-2024-07-20-185504.pngS" }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}></View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}></View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 50 }}></View>
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
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    buttonContainer: {
        width: 100,
        height: 40,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#f8b049',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
