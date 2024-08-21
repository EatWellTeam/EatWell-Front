import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useSignUpContext } from "../context/SignUpContext";
import axios from 'axios';
import { useEffect } from 'react';

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
    profilePic: 'https://i.postimg.cc/VsKZqCKb/cropped-image-2.png', 
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.API_URL}/user/${signUpData._id}`);
        if (response.status === 200) {
          setProfile({
            ...response.data,
            fullName: response.data.fullName,
            email: response.data.email,
            dateOfBirth: response.data.dateOfBirth.substring(0, 10),  
            weight: response.data.weight.toString(),  
            height: response.data.height.toString(),  
            weightGoal: response.data.weightGoal.toString(),  
            gender: response.data.gender|| '',
            activityLevel: response.data.activityLevel,
            goal: response.data.goal,
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
      
      const response = await axios.put(`${process.env.API_URL}/user/${signUpData._id}`, updatedProfile);
      if (response.status === 200) {
        setSignUpData(updatedProfile);  
        setIsEditing(false);
      
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
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {!isEditing && (
          <TouchableOpacity>
            
          </TouchableOpacity>
        )}
        <View style={styles.profileContainer}>
          {isEditing ? (
            <>
            <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={profile.weight}
                onChangeText={(value) => handleChange('weight', value)}
              />
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={profile.height}
                onChangeText={(value) => handleChange('height', value)}
              />
              <Text style={styles.label}>Weight Goal</Text>
              <TextInput
                style={styles.input}
                value={profile.weightGoal}
                onChangeText={(value) => handleChange('weightGoal', value)}
              />

              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    profile.gender === 'male' ? styles.genderButtonSelected : null,
                  ]}
                  onPress={() => handleChange('gender', 'male')}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      profile.gender === 'male' ? styles.genderButtonTextSelected : null,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    profile.gender === 'female' ? styles.genderButtonSelected : null,
                  ]}
                  onPress={() => handleChange('gender', 'female')}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      profile.gender === 'female' ? styles.genderButtonTextSelected : null,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
               <Text style={styles.label}>Activity Level</Text>
               <View style={styles.activityContainer}>
                <TouchableOpacity
                  style={[
                    styles.activityButton,
                    profile.activityLevel === 'High' ? styles.activityButtonSelected : null,
                  ]}
                  onPress={() => handleChange('activityLevel', 'High')}
                >
                  <Text
                    style={[
                      styles.activityButtonText,
                      profile.activityLevel === 'High' ? styles.activityButtonTextSelected : null,
                    ]}
                  >
                    High
                  </Text>
                  <Text style={styles.activitySubText}>(20+ hours a week)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.activityButton,
                    profile.activityLevel === 'Medium' ? styles.activityButtonSelected : null,
                  ]}
                  onPress={() => handleChange('activityLevel', 'Medium')}
                >
                  <Text
                    style={[
                      styles.activityButtonText,
                      profile.activityLevel === 'Medium' ? styles.activityButtonTextSelected : null,
                    ]}
                  >
                    Medium
                  </Text>
                  <Text style={styles.activitySubText}>(10-20 hours a week)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.activityButton,
                    profile.activityLevel === 'Low' ? styles.activityButtonSelected : null,
                  ]}
                  onPress={() => handleChange('activityLevel', 'Low')}
                >
                  <Text
                    style={[
                      styles.activityButtonText,
                      profile.activityLevel === 'Low' ? styles.activityButtonTextSelected : null,
                    ]}
                  >
                    Low
                  </Text>
                  <Text style={styles.activitySubText}>(Less than 10 hours a week)</Text>
                </TouchableOpacity>
              </View>
               <Text style={styles.label}>Goal</Text>
               <View style={styles.activityContainer}>
                <TouchableOpacity
                  style={[
                    styles.activityButton,
                    profile.goal === 'lose' ? styles.activityButtonSelected : null,
                  ]}
                  onPress={() => handleChange('goal', 'lose')}
                >
                  <Text
                    style={[
                      styles.activityButtonText,
                      profile.goal === 'lose' ? styles.activityButtonTextSelected : null,
                    ]}
                  >
                    Losing Weight
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.activityButton,
                    profile.goal === 'maintain' ? styles.activityButtonSelected : null,
                  ]}
                  onPress={() => handleChange('goal', 'maintain')}
                >
                  <Text
                    style={[
                      styles.activityButtonText,
                      profile.goal === 'maintain' ? styles.activityButtonTextSelected : null,
                    ]}
                  >
                    Maintaining Weight
                  </Text>
                
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.activityButton,
                    profile.goal === 'gain' ? styles.activityButtonSelected : null,
                  ]}
                  onPress={() => handleChange('goal', 'gain')}
                >
                  <Text
                    style={[
                      styles.activityButtonText,
                      profile.goal === 'gain' ? styles.activityButtonTextSelected : null,
                    ]}
                  >
                    Gaining Weight
                  </Text>
                  
                </TouchableOpacity>
              </View>
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
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
   alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
  },
  profileText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15, 
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#2E2E2E', 
    paddingVertical: 10, 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444', 
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
 genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderButtonSelected: {
  backgroundColor: '#1E9947',
    borderWidth: 2,
    borderColor: '#fff',
  },
  genderButtonText: {
    color: '#fff',
    
  },
  genderButtonTextSelected: {
    fontWeight: 'bold',
  },

  activityContainer: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  activityButton: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#ccc',
  },
  activityButtonText: {
    color: '#fff',
  },
  activitySubText: {
    color: '#fff',
    fontSize: 12,
  },
  activityButtonSelected: {
    backgroundColor: '#1E9947',
    borderWidth: 2,
    borderColor: '#fff',
  },
  activityButtonTextSelected: {
    fontWeight: 'bold',
    
  },

});

export default EditProfile;