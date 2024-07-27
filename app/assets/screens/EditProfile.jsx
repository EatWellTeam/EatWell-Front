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
    navigation.navigate('Dashboard'); // Navigate to the Recipes page
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

  const handleSignOut = () => {
    // Add sign out logic here
    console.log("Signing out...");
    // For example, you might want to clear user data and navigate to the welcome screen
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.editPicButton} onPress={pickImage}>
            <Image source={{ uri: 'https://i.postimg.cc/VsKZqCKb/cropped-image-2.png' }} style={styles.editPicIcon} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
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
  signOutButton: {
    padding: 10,
    borderRadius: 25,
    marginBottom: 20, // Adjust margin to move button down
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
