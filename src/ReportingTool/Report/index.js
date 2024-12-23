import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, Text, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import worldImage from '../../assets/world.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../DataBase/SupaBase';  

const ReportingTool = ({ navigation }) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [userId, setUserId] = useState(null);

  console.log(text)
  console.log(location)
  console.log(images)
  console.log(userId)


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        alert('Permission to access location was denied');
      } else {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);  
      } else {
        alert('User is not logged in');
      }
    })();
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 0,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const captureImage = async () => {
    if (cameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImages([...images, result.assets[0].uri]);
      }
    } else {
      alert('Camera permission not granted');
    }
  };

  // Function to convert image
  const convertToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  
  const uploadImages = async () => {
    const uploadedImages = [];

    for (const uri of images) {
      const base64Image = await convertToBase64(uri);
      uploadedImages.push(base64Image); 
    }

    return uploadedImages;
  };

  const submitReport = async () => {
    if (!text || images.length === 0 || !location || !userId) {
      alert('Please add a description, images, location, and make sure you are logged in.');
      return;
    }

      // tag upload img
    const uploadedImages = await uploadImages();

    // taga insert
    const { data, error } = await supabase
      .from('report')  
      .insert([{
        description: text,
        report_image: uploadedImages.join(','),  
        location: JSON.stringify(location),  
        user_id: userId,  
        created_at: new Date(),
      }]);

    if (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting the report. Please try again.');
      return;
    }

    Alert.alert('Report Submitted', 'Your report has been successfully submitted.', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Location', {
            reportedLocation: location,
            reportedImages: uploadedImages,
          });
        },
      },
    ]);

    setText('');
    setImages([]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 20 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 }}>
        <TouchableOpacity onPress={pickImages} style={{ marginRight: 10 }}>
          <Ionicons name="cloud-upload-outline" size={30} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={captureImage}>
          <Ionicons name="camera-outline" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Describe what happened..."
        multiline
        numberOfLines={4}
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Uploaded Images:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.uploadedImage} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ marginTop: 15, zIndex: 2 }}>
        <Button title="Submit Report" onPress={submitReport} color="#007BFF" />
      </View>

      <Image source={worldImage} style={styles.cornerImage} resizeMode="cover" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 50,
    padding: 10,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    zIndex: 2,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  imageLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
    backgroundColor: '#f9f9f9',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cornerImage: {
    position: 'absolute',
    bottom: -80,
    right: -5,
    width: 300,
    height: 300,
    zIndex: 1,
  },

  backButtonContainer: {
    position: 'absolute',
    top:30,
    left: 5,
    zIndex: 2, 
  },
  backButton: {
    padding: 10, 
    borderRadius: 50,
  },
});

export default ReportingTool;
