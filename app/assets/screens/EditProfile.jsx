import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useSignUpContext } from "../context/SignUpContext";

const EditProfile = () => {
  const navigation = useNavigation();
  const { signUpData, setSignUpData } = useSignUpContext();
  

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({

    firstName: signUpData.firstName,
    lastName: signUpData.lastName,
    email: signUpData.email,
    dateOfBirth: signUpData.dateOfBirth,
    weight: signUpData.weight,
    height: signUpData.height,
    gender: signUpData.gender,
    activityLevel: signUpData.activityLevel,
    goals: signUpData.goal,
    profilePic: 'https://i.postimg.cc/VsKZqCKb/cropped-image-2.png', // Default profile picture
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleContinue = () => {
    navigation.navigate('Dashboard');
  };

  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

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
    console.log("Signing out...");
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
            <Image source={{ uri: profile.profilePic }} style={styles.editPicIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={24} color="#fff" />
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
    backgroundColor: '#161E21',
  },
  container: {
    padding: 20,
    alignItems: 'center',
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
  takePhotoButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editPicIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
