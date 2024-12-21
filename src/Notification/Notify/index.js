import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Video } from 'expo-av';

const initialNotifications = [
  { id: '1', action: 'Reminder: Garbage collection scheduled for today. Please take your bins out.', time: '2m', read: false },
  { id: '2', action: 'Alert: Poor air quality detected in your area. Limit outdoor activities.', time: '5m', read: false },
  { id: '3', action: 'Reminder: Avoid cutting down trees. Support reforestation efforts.', time: '15m', read: false },
  { id: '4', action: 'Reminder: Recycling pickup is tomorrow. Separate plastics and paper.', time: '1h', read: false },
  { id: '5', action: 'Alert: Forested area nearby marked for illegal logging. Report any activities.', time: '3h', read: false },
];

const NotificationSettings = ({ navigation }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleReadStatus = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleReadStatus(item.id)} style={styles.touchable}>
      <View style={[styles.notificationBox, item.read && styles.readBox]}>
        <Icon
          name="warning"
          type="material"
          color={item.read ? '#aaa' : '#f50'}
          size={30}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.action}>{item.action}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={require('../../../src/assets/notifvideo.mp4')}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay
        />
      </View>

      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../../assets/world.png')}
        style={styles.container}
        imageStyle={styles.image}
      >
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
          </ImageBackground>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  notificationList: {
    paddingBottom: 160,
  },
  touchable: {
    marginBottom: 10,
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    borderRadius: 10,
    padding: 15,
  },
  readBox: {
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
  },
  notificationContent: {
    marginLeft: 10,
    flex: 1,
  },
  action: {
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  image: {
    borderRadius: 10,
    width: 360,
    height: 300,
    top: 250,
    left: 0,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 2,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default NotificationSettings;
