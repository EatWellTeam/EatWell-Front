
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, View, Button } from 'react-native';
import imageUpload from '../../../services/imageUpload';
import axios from 'axios';

export default function Home({navigation}) {


    const [image, setImage] = useState(null)
        async function openCamera() {
            const permissions = await ImagePicker.getCameraPermissionsAsync()
            if(!permissions.granted) {
                requestMediaPermissions()
                return
            }
            let result  = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            })

            if(!result.canceled) {
                // get uri
                const uri = result.assets[0].uri
                setImage(uri)
            }
        }


        async function openGallery() {
            const permissions = await ImagePicker.getMediaLibraryPermissionsAsync()
            if(!permissions.granted) {
                requestMediaPermissions()
                return
            }

            let result  = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            })

            if(!result.canceled) {
                // get uri
                const uri = result.assets[0].uri
                setImage(uri)
            }
        }


        async function requestMediaPermissions() {

            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if(status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
                return
            }
            const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if(mediaLibraryStatus.status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
                return
            }

        }

        useEffect(() => {
            requestMediaPermissions()
        },[])
        
        const analyze = async () => {
            const url = await imageUpload(image)
            console.log(url)
            const { data } = axios.post('https://api.eatwell.com/analyze', { url })
            navigation.navigate('AnalasysResult', { results: data })
        }


        return (<View>
            <Button title="Open Camera" onPress={openCamera}/>
            <Button title="Open Gallery" onPress={openGallery}/>
            {
             image && <Button title="Analyze" onPress={analyze}/>
            }
        </View>)
}