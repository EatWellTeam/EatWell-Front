import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text } from 'react-native';

const LoadingAnimation = () => {
  const spinValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const fade = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
        source={{ uri: 'https://i.postimg.cc/hGyFQPXG/green.png' }}
      />
      <Animated.Text style={[styles.text, { opacity: fade }]}>
        Analyze your nutritions...
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 30, 33, 0.8)',
  },
  logo: {
    width: 200, 
    height: 200, 
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
  },
});

export default LoadingAnimation;