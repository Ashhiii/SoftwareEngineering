import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Button, StyleSheet } from 'react-native';
import SettingsCard from './src/Settings/SettingsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <SettingsCard />
        </View>
        <Button title="Log Out" onPress={() => console.log('Signing out...')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  cardContainer: {
    marginTop: 20,
    width: '100%',
  },
});
  