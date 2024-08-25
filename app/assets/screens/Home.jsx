import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import imageUpload from '../../../services/imageUpload';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress from '../../../components/CircularProgress';
import { API_URL } from '@env';


export default function Home({ navigation }) {
  const [image, setImage] = useState(null);

  async function openCamera() {
    const permissions = await ImagePicker.getCameraPermissionsAsync();
    if (!permissions.granted) {
      requestMediaPermissions();
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      console.log('Image selected from camera:', uri);
    }
  }

  async function openGallery() {
    const permissions = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!permissions.granted) {
      requestMediaPermissions();
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      console.log('Image selected from gallery:', uri);
    }
  }

  async function requestMediaPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      requestMediaPermissions() // recursively try requesting permissions
      return;
    }
    const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaLibraryStatus.status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  }

  useEffect(() => {
    requestMediaPermissions();
  }, []);

  const analyze = async () => {
    if (!image) {
        Alert.alert('No image selected', 'Please select an image first.');
        return;
    }

    try {
        console.log('Uploading image:', image);
        const url = await imageUpload(image);
        console.log('Image uploaded, URL:', url);

        const payload = {
            content: [
                {
                    type: "image_url",
                    image_url: {
                        url
                    }
                }
            ],
            role: "user"
        };

        const { data } = await axios.post(`${process.env.API_URL}/middleware/process`, [payload], {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Analysis data received:', data);
        navigation.navigate('AnalysisResult', { results: { results: data, image: url } });
    } catch (e) {
        console.error('Error during analysis:', e.message);
        if (e.response) {
            console.error('Server responded with:', e.response.data);
            Alert.alert('No Food Detected in Image', 'Please try again with a different image.');
        } else if (e.request) {
            console.error('No Food Detected in Image', 'Please try again with a different image.', e.request);
            Alert.alert('No Food Detected in Image', 'Please try again with a different image.');
        } else {
            console.error('Error setting up request:', e.message);
            Alert.alert('Error', e.message);
        }
    }
}


  const signOut = () => {
    navigation.navigate('Welcome');
  }

  const handleDescribeMealManually = () => {
    navigation.navigate('TrackCalories');
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.signOutContainer}>
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={{padding: 20}}>
            <CircularProgress progress={0.5}/>
          </View>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <Text style={styles.buttonText}>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDescribeMealManually}>
            <Text style={styles.buttonText}>Describe Meal Manually</Text>
          </TouchableOpacity>
          {image && (
            <TouchableOpacity style={styles.button} onPress={analyze}>
              <Text style={styles.buttonText}>Analyze</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#161E21',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  signOutContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  signOutButton: {
    backgroundColor: '#1E9947',
    padding: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1E9947',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
