import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
    const logoScale = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        
        Animated.sequence([
            Animated.timing(logoScale, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        
        const timeout = setTimeout(() => {
            navigation.navigate('Login');
        }, 6000);

        return () => clearTimeout(timeout);
    }, [logoScale, textOpacity, navigation]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{ uri: "https://i.postimg.cc/HxgKzxMj/cropped-image-11.png" }}
                style={[styles.logo, { transform: [{ scale: logoScale }] }]}
            />
            <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
                "Fuel Your Body, Nourish Your Life"
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#161E21',
    },
    logo: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});
