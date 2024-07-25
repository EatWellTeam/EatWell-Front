import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const EditProfile = () => {
  const navigation = useNavigation(); // Initialize useNavigation

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "abc123@gmail.com",
    dateOfBirth: "10/10/2020",
    weight: "60 Kg",
    height: "170 Cm",
    gender: "Male",
    activityLevel: "Low",
    goals: "Maintain Weight",
    profilePic: null, // Add profilePic field
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add any save logic here if needed
  };

  const handleContinue = () => {
    navigation.navigate('Recipes'); // Navigate to the Recipes page
  };

  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleChange('profilePic', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('profilePic', result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Custom Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.header}>
          <TouchableOpacity style={styles.editPicButton} onPress={pickImage}>
            <Image source={{ uri: 'https://i.postimg.cc/VsKZqCKb/cropped-image-2.png' }} style={styles.editPicIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="pencil" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={profile.firstName}
                onChangeText={(value) => handleChange('firstName', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.lastName}
                onChangeText={(value) => handleChange('lastName', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(value) => handleChange('email', value)}
              />
              <TextInput
                style={styles.input}
                value={profile.dateOfBirth}
                onChangeText={(value) => handleChange('dateOfBirth', value)}
              />
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
                value={profile.goals}
                onChangeText={(value) => handleChange('goals', value)}
              />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.profileText}>First Name: {profile.firstName}</Text>
              <Text style={styles.profileText}>Last Name: {profile.lastName}</Text>
              <Text style={styles.profileText}>Email: {profile.email}</Text>
              <Text style={styles.profileText}>Date of Birth: {profile.dateOfBirth}</Text>
              <Text style={styles.profileText}>Weight: {profile.weight}</Text>
              <Text style={styles.profileText}>Height: {profile.height}</Text>
              <Text style={styles.profileText}>Gender: {profile.gender}</Text>
              <Text style={styles.profileText}>Activity Level: {profile.activityLevel}</Text>
              <Text style={styles.profileText}>Goals: {profile.goals}</Text>
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
    backgroundColor: '#161E21', // Background color similar to the provided screenshot
  },
  container: {
    padding: 20,
    alignItems: 'center',  // Center content horizontally
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editPicButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editPicIcon: {
    width: 150, // Increased width
    height: 150, // Increased height
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 20,
    top: 20,
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
