import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Platform, StyleSheet, Button, Dimensions, ImageBackground } from 'react-native';

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
                        source={{ uri: "https://i.postimg.cc/cLXvz2BL/cropped-image-8.png" }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}></View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Log in"
                        onPress={() => navigation.navigate('Login')}
                        color="#f8b049"
                    />
                </View>
                <View style={{ marginTop: 20 }}></View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign up"
                        onPress={() => navigation.navigate('SignUp')} // Update navigation here
                        color="#f8b049"
                    />
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
        width: 300,
        height: 50,
    },
});
