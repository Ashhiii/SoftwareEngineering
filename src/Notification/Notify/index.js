import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { supabase } from '../../DataBase/SupaBase'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Fetch the session to get the user id
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setUserId(session.user.id);
          console.log('User ID from session:', session.user.id);

          // Fetch notifications for the logged-in user
          await fetchUserNotifications(session.user.id); 
        } else {
          Alert.alert('Error', 'User is not logged in');
          console.log('User not logged in');
        }
      } catch (error) {
        console.error('Error initializing notifications:', error);
        Alert.alert('Error', 'An error occurred while loading notifications.');
      }
    };

    initialize();
  }, []);

  const fetchUserNotifications = async (userId) => {
    try {
      if (!userId) {
        throw new Error('User ID is undefined.');
      }
      
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
      Alert.alert('Error', 'Unable to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
    </View>
  );  
  

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading notifications...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
        data={notifications}
        keyExtractor={(item, index) => item.id ? item.id.toString() : `fallback-${index}`}
        renderItem={renderNotificationItem}
      />
      ) : (
        <Text style={styles.emptyText}>No notifications available.</Text>
      )}
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 50,
    top: 20
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default NotificationsScreen;
