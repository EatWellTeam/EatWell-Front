// app/assets/screens/Login.js
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; 
import axios from "axios";
import { API_URL } from "@env";
import { useSignUpContext } from "../context/SignUpContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const { signUpData, setSignUpData } = useSignUpContext();

  const handleContinue = async () => {
    console.log("Attempting login with email:", email); 
    
    
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/login`, {
        email: email.toLowerCase(),
        password,
      });
      if (response.status === 200) {
        console.log("Login successful");
      
      
        setSignUpData(prevData => ({
          ...prevData,
          _id: response.data._id, 
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }));
        console.log("refresh token is:", signUpData.refreshToken);
        console.log("access token is:", signUpData.accessToken);
        
        
        navigation.navigate("Dashboard"); 
      } else {
        console.log("Unexpected response", response.data);
        Alert.alert("Error", "Unexpected response from the server");
      }
    } catch (error) {
      console.log("Login error", error); 
      Alert.alert("Error", error.message);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword"); 
  };

  return (
    <SafeAreaView style={styles.container}>
     

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://i.postimg.cc/HxgKzxMj/cropped-image-11.png",
            }}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.loginPrompt}>
            Log in to continue your journey
          </Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            style={styles.input}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
            Forgot password?
          </Text>
          <Text style={styles.signupPrompt}>
            Don't have an account?{" "}
            <Text style={styles.signupText} onPress={handleSignUp}>
              Sign Up
            </Text>
          </Text>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  formContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    marginTop: 20, 
  },
  loginPrompt: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    color: "#fff",
    marginTop: 20,
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
  signupPrompt: {
    color: "#fff",
    marginTop: 20,
  },
  signupText: {
    color: "#1E9947",
  },
});
