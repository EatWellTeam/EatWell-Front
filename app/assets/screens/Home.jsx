import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, View, Button, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import imageUpload from '../../../services/imageUpload';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress from '../../../components/CircularProgress';

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
    }
  }

  async function requestMediaPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
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
    try {
      const url = await imageUpload(image);

      const { data } = await axios.post('http://192.168.1.17:3000/middleware/process', [{ content: [{ type: "image_url", image_url: { url } }], role: "user" }]);

      navigation.navigate('AnalasysResult', { results: { results: data, image: url } });
    } catch (e) {
      console.log(e.message);
    }
  }

  const signOut = () => {
    navigation.navigate('Welcome');
  }

  return (
    <ImageBackground source={{ uri: 'https://i.ibb.co/pvY7xcx/Default-Create-a-background-image-similar-to-the-image-you-mad-3.jpg' }} style={styles.background}>
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
          {image && (
            <TouchableOpacity style={styles.button} onPress={analyze}>
              <Text style={styles.buttonText}>Analyze</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    backgroundColor: '#f8b049',
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
    backgroundColor: '#f8b049',
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