import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tooltip from '../../../src/Home/ToolTip'; 

const BottomNav = ({ navigation }) => {
  const navItems = [
    { icon: 'home', text: 'Home', screen: 'Home' },
    { icon: 'leaf', text: 'EnviroTips', screen: 'EnviroTips' },
    { icon: 'camera', text: 'Reporting Tool', screen: 'ReportingTool' },
    { icon: 'bell', text: 'Notifications', screen: 'Notification' },
    { icon: 'cog', text: 'Settings', screen: 'Settings' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <View key={item.text} style={styles.navItem}>
          <TouchableOpacity onPress={() => navigation.navigate(item.screen)} style={styles.touchable}>
            <Icon name={item.icon} size={24} color="#4CA771" />
            <Text style={styles.navText}>{item.text}</Text>
          </TouchableOpacity>
          {item.text === 'EnviroTips' && (
            <Tooltip>Check out our tips for a greener planet!</Tooltip>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(17, 51, 39, 0.7)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
  },
  navItem: {
    alignItems: 'center',
    position: 'relative', 
  },
  touchable: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
});

export default BottomNav;
