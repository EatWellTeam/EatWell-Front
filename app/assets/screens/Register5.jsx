// app/assets/screens/Register5.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useSignUpContext } from "../context/SignUpContext";
import { API_URL } from "@env";

export default function Register5Screen() {
  const { signUpData, setSignUpData,setUserId } = useSignUpContext();
  const [activityLevel, setActivityLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function fetchCalories() {
    try {
      if (!activityLevel) {
        Alert.alert("Please choose activity level");
        return;
      }
      console.log("fetchCalories");
      setLoading(true);
      const response = await axios.post(
        `${process.env.API_URL}/auth/register`,
        { ...signUpData, activityLevel }
      );
      if (response.status === 201) {
        console.log("Registration successful", response.data);
  

        
        setUserId(response.data._id);

        setSignUpData(prevData => ({
          ...prevData,
          _id: response.data._id,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken, 
        }));
        console.log("Current SignUpData:", JSON.stringify(signUpData, null, 2));
        navigation.navigate("Register6", { registerData: response.data });
      } else {
        console.log("Unexpected response", response.data);
        Alert.alert("Error", "Unexpected response from the server");
      }
    } catch (error) {
      console.log("Registration error", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  
  const handleContinue = () => {
    setSignUpData({
      ...signUpData,
      activityLevel,
    });
    console.log("Registering:", { activityLevel });
    fetchCalories();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://i.postimg.cc/HxgKzxMj/cropped-image-11.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Register</Text>
          <Text style={styles.stepIndicator}>5/5</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.questionText}>What is your activity level?</Text>
          <TouchableOpacity
            style={[
              styles.optionButton,
              activityLevel === "High" && styles.optionButtonSelected,
            ]}
            onPress={() => setActivityLevel("High")}
          >
            <Text style={styles.optionText}>High</Text>
            <Text style={styles.optionSubText}>20+ hours a week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              activityLevel === "Medium" && styles.optionButtonSelected,
            ]}
            onPress={() => setActivityLevel("Medium")}
          >
            <Text style={styles.optionText}>Medium</Text>
            <Text style={styles.optionSubText}>10-20 hours a week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              activityLevel === "Low" && styles.optionButtonSelected,
            ]}
            onPress={() => setActivityLevel("Low")}
          >
            <Text style={styles.optionText}>Low</Text>
            <Text style={styles.optionSubText}>Less than 10 hours a week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#161E21",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  stepIndicator: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    width: 300,
    height: 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  optionButtonSelected: {
    backgroundColor: "#1E9947",
  },
  optionText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionSubText: {
    color: "#000",
    fontSize: 14,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#1E9947",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
