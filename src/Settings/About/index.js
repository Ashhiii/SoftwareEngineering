import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About</Text>
      <Text style={styles.text}>EcoGuard App v1.0.0</Text>
      <Text style={styles.text}>Developed by IT-3R4 EcoGuard Team</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginVertical: 10 },
});

export default About;
