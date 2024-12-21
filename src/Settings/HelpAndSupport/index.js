import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HelpSupport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>
      <TouchableOpacity style={styles.button}>
        <Text>FAQs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#ddd', padding: 15, borderRadius: 10, marginVertical: 10 },
});

export default HelpSupport;
