import React from 'react';
import { View, Text, StyleSheet, Image,SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const UserDetails = ({ route }) => {
  const { user } = route.params;

  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
      <Image source={{ uri: user.profile_picture }} style={styles.profilePicture} />
      <Text style={styles.name}>{`${user.first_name} ${user.last_name}`}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.role}>{user.role}</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  role: {
    fontSize: 14,
    color: '#999',
  },
});

export default UserDetails;
