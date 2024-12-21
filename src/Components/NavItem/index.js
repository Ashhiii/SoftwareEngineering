import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const NavItem = ({ icon, text, screen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(screen)}>
      <Icon name={icon} size={24} color="#4CA771" />
      <Text style={styles.navText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#4CA771',
  },
});

export default NavItem;
