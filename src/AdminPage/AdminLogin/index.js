import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { supabase } from '../../../src/DataBase/SupaBase'; 
import { useNavigation } from '@react-navigation/native';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    Keyboard.dismiss(); 
    setLoading(true);  // This will show the loading state

    try {
      console.log("Attempting to log in with", username, password);

      const { data, error } = await supabase
        .from('admin')  
        .select('*')
        .eq('email', username)
        .eq('password', password);

      if (error) {
        console.error('Supabase error:', error);
        Alert.alert('Login Failed', 'Invalid credentials or issue connecting to the database.');
        setLoading(false);  // Reset loading state if error occurs
        return;
      }

      if (data.length > 0) {
        // Wait for a moment before navigating to simulate loading
        setTimeout(() => {
          navigation.navigate('WelcomeScreen');
        }, 1000);  // Delay of 1 second for loading effect
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
        setLoading(false);  // Reset loading state if no data found
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
      setLoading(false);  // Reset loading state if error occurs
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Admin Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin} 
        disabled={loading}  // Disables the button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2db14f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
