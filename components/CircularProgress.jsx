import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";


export default function CircularProgress({progress} /* fraction from 0 to 1 */) {
    const sv = useSharedValue(0);   
    const animatedStyles = useAnimatedStyle(() => ({
        offset: sv.value,
    }));

    return <View style={styles.circularProgressBar}>
            <Animated.View style={[styles.circularBarInner, animatedStyles]}>
                    <Text style={styles.text}>
                        Calories Consumed 
                    </Text>
                    <Text style={styles.text}>
                        {Math.floor(progress * 100)}%
                    </Text>
            </Animated.View>
    </View>
}

const styles = StyleSheet.create({

    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    circularProgressBar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circularBarInner: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth :10,
        borderColor: '#1E9947',
        justifyContent: 'center',
        alignItems: 'center'
    }
})