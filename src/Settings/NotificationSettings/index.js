import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const Notifications = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <View style={styles.row}>
        <Text>Push Notifications</Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
});

export default Notifications;
