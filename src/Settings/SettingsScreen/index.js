import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Video } from 'expo-av'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../../src/DataBase/Firebase'; 


const SettingsCard = ({ navigation }) => { 
  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await signOut(auth);
            console.log("Signed out");
            
            if (auth.currentUser === null) {
              console.log("User is successfully logged out");
              navigation.replace('Login'); 
            } else {
              console.log("User is still signed in");
            }
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        }
      }
    ]);
};

  return (
    <View style={styles.outerContainer}>
      <Video
        source={require('../../../src/assets/video.mp4')} 
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay 
      />
      <View style={styles.backButtonContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" /> 
      </TouchableOpacity>
    </View>
      
      <ImageBackground
        source={require('../../assets/world.jpg')}
        style={styles.container}
        imageStyle={styles.image}
      >
        <Text style={styles.settingsHeader}>Settings</Text>

          <View style={styles.section}>
          <TouchableOpacity 
            style={styles.rowWithBackground} 
            onPress={() => navigation.navigate('MyAccount')}
          >
            <Icon name="person-circle-outline" size={24} color="gray" />
            <Text style={styles.item}>My Accounts</Text>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.rowWithBackground} 
            onPress={() => navigation.navigate('NotificationSettings')}
          >
            <Icon name="notifications" size={24} color="gray" />  
            <Text style={styles.item}>Notifications</Text>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.rowWithBackground} 
            onPress={() => navigation.navigate('PrivacyAndSecurity')}
          >
            <Icon name="lock-closed" size={24} color="gray" />
            <Text style={styles.item}>Privacy & Security</Text>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.rowWithBackground} 
            onPress={() => navigation.navigate('HelpAndSupport')}
          >
            <Icon name="headset" size={24} color="gray" />  
            <Text style={styles.item}>Help and Support</Text>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.rowWithBackground} 
            onPress={() => navigation.navigate('About')}
          >
            <Icon name="information-circle" size={24} color="gray" />  
            <Text style={styles.item}>About</Text>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Log Out</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1, 
  },
  video: {
    width: '150%',
    height: 200,
    position: 'absolute',
    top: -20,
    left: -90,
    zIndex: 0,
  },
  container: {
    padding: 30,
    borderRadius: 10,
    marginTop: 70,
    zIndex: 1,
  },
  image: {
    borderRadius: 10,
    width: 360,
    height: 300,
    top: 450,
    left: 0,
  },
  settingsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 100,
    color: '#000', 
  },
  section: {
    marginVertical: 10,
  },
  rowWithBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  item: {
    fontSize: 16,
    color: '#263238',
    flex: 1,
    marginLeft: 10,
  },
  signOutButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: 'black', 
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
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

export default SettingsCard;
