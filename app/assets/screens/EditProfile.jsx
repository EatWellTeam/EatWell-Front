import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useSignUpContext } from "../context/SignUpContext";

const EditProfile = () => {
  const navigation = useNavigation();
  const { signUpData, setSignUpData } = useSignUpContext();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    weight: '',
    height: '',
    weightGoal: '',
    gender: '',
    activityLevel: '',
    goal: '',
    recommendedCalories: 0,  // Adding recommendedCalories
    profilePic: 'https://i.postimg.cc/VsKZqCKb/cropped-image-2.png', // Default profile picture
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://10.0.0.6:3000/user/${signUpData._id}`);
        if (response.status === 200) {
          setProfile({
            ...response.data,
            fullName: response.data.fullName,
            email: response.data.email,
            dateOfBirth: response.data.dateOfBirth,
            weight: response.data.weight.toString(),  // Convert to string for TextInput
            height: response.data.height.toString(),  // Convert to string for TextInput
            weightGoal: response.data.weightGoal?.toString(),  // Convert to string for TextInput
            gender: response.data.gender,
            activityLevel: response.data.activityLevel,
            goal: response.data.goal,
            recommendedCalories: response.data.recommendedCalories,  // Set recommendedCalories
          });
        } else {
          Alert.alert("Error", "Failed to fetch user data");
        }
      } catch (error) {
        console.log("Error fetching user data", error);
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedProfile = {
        ...profile,
        weight: parseFloat(profile.weight),  
        height: parseFloat(profile.height), 
      };
      
      const response = await axios.put(`http://10.0.0.6:3000/user/${signUpData._id}`, updatedProfile);
      if (response.status === 200) {
        setSignUpData(updatedProfile);  
        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.log("Error updating profile", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleContinue = () => {
    navigation.navigate('Dashboard');
  };

  const handleSignOut = () => {
    console.log("Signing out...");
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://i.postimg.cc/HxgKzxMj/cropped-image-11.png' }} 
            style={styles.logo} 
          />
        </View>

        {/* New Welcome and Recommended Calories Section */}
        <Text style={styles.welcomeText}>Welcome Back, {profile.fullName}!</Text>
        <Text style={styles.caloriesText}>Your recommended calories are: {profile.recommendedCalories}</Text>

        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {!isEditing && (
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
        <View style={styles.profileContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={profile.weight}
                onChangeText={(value) => handleChange('weight', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.height}
                onChangeText={(value) => handleChange('height', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.weightGoal}
                onChangeText={(value) => handleChange('weightGoal', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.gender}
                onChangeText={(value) => handleChange('gender', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.activityLevel}
                onChangeText={(value) => handleChange('activityLevel', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.goal}
                onChangeText={(value) => handleChange('goal', value)}
              />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.profileText}>Name: {profile.fullName}</Text>
              <Text style={styles.profileText}>Email: {profile.email}</Text>
              <Text style={styles.profileText}>Date of Birth: {profile.dateOfBirth}</Text>
              <Text style={styles.profileText}>Weight (kg) : {profile.weight}</Text>
              <Text style={styles.profileText}>Height (cm): {profile.height}</Text>
              <Text style={styles.profileText}>Weight Goal (kg): {profile.weightGoal}</Text>
              <Text style={styles.profileText}>Gender: {profile.gender}</Text>
              <Text style={styles.profileText}>Activity Level: {profile.activityLevel}</Text>
              <Text style={styles.profileText}>Goals: {profile.goal}</Text>
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#161E21',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  caloriesText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
  },
  signOutButton: {
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  profileText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#1E9947',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;