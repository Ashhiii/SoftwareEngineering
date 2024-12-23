import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.shapeTopLeft}></View>
      <View style={styles.shapeBottomRight}></View>
      <View style={styles.shapeCircle}></View>
      <Image 
        source={require('../../../src/assets/ADMIN.jpg')}
        style={styles.adminImage}
      />

      <Text style={styles.title}>Welcome Admin</Text>
      
      <Text style={styles.message}>We're glad to have you on board. Please proceed to your dashboard.</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('AdminDashboard')} 
      >
        <Text style={styles.buttonText}>Proceed to Dashboard</Text>
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
    position: 'relative', 
  },

  adminImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20, 
    borderWidth: 2,
    borderColor: 'skyblue', 
  },
  shapeTopLeft: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 150,
    height: 150,
    backgroundColor: '#F0B90D',
    borderRadius: 75, 
    opacity: 0.2,
  },
  shapeBottomRight: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 200,
    height: 200,
    backgroundColor: '#FF7043',
    borderRadius: 100, 
    opacity: 0.2,
  },
  shapeCircle: {
    position: 'absolute',
    top: 150,
    left: '50%',
    width: 120,
    height: 120,
    backgroundColor: '#2db14f',
    borderRadius: 60, 
    opacity: 0.15,
    transform: [{ translateX: -60 }], 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2db14f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
