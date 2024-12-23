import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, Animated, ImageBackground } from 'react-native';
import { Video } from 'expo-av';

import IntroScreen from './src/OpenIntro/IntroScreen';
import LoginScreen from './src/AuthenticationScreen/Login';
import RegisterScreen from './src/AuthenticationScreen/Register';

import HomeScreen from './src/Home/AQIIndicator/index'; 
import BottomNav from './src/Home/BottomNav'; 
import ReportingTool from './src/ReportingTool/Report';
import Map from './src/Map/Location';
import Notification from './src/Notification/Notify'; 


import EnviroTipsScreen from './src/Components/IconGrid/index'; 
import TreeScreen from './src/Components/TreeScreen'; 
import RecycleScreen from './src/Components/RecycleScreen';
import PollutionScreen from './src/Components/PollutionScreen'; 
import FootScreen from './src/Components/FootScreen'; 

import AdminHome from './src/AdminPage/AdminHome';
import ReportDetails from './src/AdminPage/ReportDetails';
import AdminLogin from './src/AdminPage/AdminLogin';
import AdminDashboard from './src/AdminPage/AdminDashboard';
import WelcomeScreen from './src/AdminPage/WelcomeScreen';
import ManageUsers from './src/AdminPage/ManageUsers';
import userDetails from './src/AdminPage/ManageUsers/userDetails';

import Settings from './src/Settings/SettingsScreen';
import MyAccount from './src/Settings/MyAccount';
import Notifications from './src/Settings/NotificationSettings';
import Privacy from './src/Settings/PrivacyAndSecurity';
import HelpSupport from './src/Settings/HelpAndSupport';
import About from './src/Settings/About';

  const Stack = createStackNavigator();

  export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setIsLoading(false);
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }, []);

    return (
        <NavigationContainer>
        {isLoading ? (
          <ImageBackground
            source={require('./src/assets/loadscreen.jpg')}
            style={styles.container}
          >
            <Animated.View style={{ ...styles.splashContainer, opacity: fadeAnim }}>
              <Image
                source={require('./src/assets/logo.png')}  
                style={styles.logo}
              />
            </Animated.View>
          </ImageBackground>
        ) : (
          <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Home" component={HomeScreenWithBackground} />
            <Stack.Screen name="EnviroTips" component={EnviroTipsScreenWithBackground} />
            <Stack.Screen name="ReportingTool" component={ReportingTool} />
            <Stack.Screen name="Location" component={Map} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="SignUp" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="AQIIndicator" component={HomeScreen} />
            <Stack.Screen name="TreeScreen" component={TreeScreen} />
            <Stack.Screen name="RecycleScreen" component={RecycleScreen} />
            <Stack.Screen name="PollutionScreen" component={PollutionScreen} />
            <Stack.Screen name="FootScreen" component={FootScreen} />
            <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: 'Admin Dashboard' }}/>
            <Stack.Screen name="ReportDetails" component={ReportDetails} options={{ title: 'Report Details' }}/>
            <Stack.Screen name="AdminLogin" component={AdminLogin} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard}/>
            <Stack.Screen name="ManageUsers" component={ManageUsers}/>
            <Stack.Screen name="userDetails" component={userDetails}/>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="MyAccount" component={MyAccount} options={{ title: 'My Account' }} />
            <Stack.Screen name="NotificationSettings" component={Notifications} options={{ title: 'Notifications' }} />
            <Stack.Screen name="PrivacyAndSecurity" component={Privacy} options={{ title: 'Privacy & Security' }} />
            <Stack.Screen name="HelpAndSupport" component={HelpSupport} options={{ title: 'Help & Support' }} />
            <Stack.Screen name="About" component={About} options={{ title: 'About' }} />
          </Stack.Navigator>
           )}
      </NavigationContainer>
    );
  }

  const HomeScreenWithBackground = ({ navigation }) => (
    <ImageBackground
      source={require('./src/assets/home.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <HomeScreen navigation={navigation} />
      <BottomNav navigation={navigation} /> 
    </ImageBackground>
  );

  const EnviroTipsScreenWithBackground = ({ navigation }) => (
    <ImageBackground
      source={require('./src/assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <Video
        source={require('./src/assets/video.mp4')}
        style={styles.headerVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <EnviroTipsScreen />
      <BottomNav navigation={navigation} /> 
    </ImageBackground>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    splashContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    background: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    headerVideo: {
      width: '180%',
      height: 260,
      position: 'absolute',
      top: 0,
      left: -140,
      zIndex: 0,
    },
  });


