import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

const MyAccount = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Account</Text>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profilePic} />
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter your name" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  input: { borderBottomWidth: 1, padding: 10, marginBottom: 20 },
  button: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default MyAccount;
