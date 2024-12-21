import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert, Keyboard, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../src/DataBase/Firebase'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Information", "Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    Keyboard.dismiss();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await user.reload();
  
      if (!user.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before logging in.",
          [{ text: "OK" }]
        );
  
        const interval = setInterval(async () => {
          await user.reload();
          if (auth.currentUser?.emailVerified) {
            clearInterval(interval);
            Alert.alert("Email Verified", "Your email is verified. Redirecting...");
            navigation.navigate("Home");
          }
        }, 3000); 
  
        setLoading(false);
        return;
      }
  
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Missing Information", "Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "A password reset email has been sent to your email address.");
    } catch (error) {
      console.error("Forgot password error:", error);
      Alert.alert("Error", "Failed to send password reset email. Please try again.");
    }
  };

  return (
    <ImageBackground source={require('../../../src/assets/2.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {/* Email input */}
        <TextInput
          placeholder="Email or Phone"
          style={styles.input}
          placeholderTextColor="#e5e5e5"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password input */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#e5e5e5"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#e5e5e5"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password link */}
        <TouchableOpacity
          style={styles.forgotPasswordLink}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        {/* Don't have an account? Sign up */}
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.registerText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.separator} />
        </View>

        {/* Social login */}
        <Text style={styles.socialText}>Sign in with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => alert('Google Sign In')}>
            <Image source={require('../../../src/assets/google.jpg')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('Facebook Sign In')}>
            <Image source={require('../../../src/assets/facebook.jpg')} style={styles.socialIcons} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderRadius: 10,
    left: 19,
    width: '90%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  forgotPasswordLink: {
    marginTop: 10,
    alignSelf: 'flex-end', 
  },
  forgotPasswordText: {
    color: '#fff',
    textDecorationLine: 'underline',
    textAlign: 'left', 
  },
  registerLink: {
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#fff',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 10,
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 15,
  },
  socialIcons: {
    width: 75,
    height: 50,
    marginHorizontal: -5,
  },
  socialText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
});
