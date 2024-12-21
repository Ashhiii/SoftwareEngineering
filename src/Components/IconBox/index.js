import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const IconBox = ({ source, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconBox}>
    <Image source={source} style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconBox: {
    padding: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 140,
    height: 155,
    borderRadius: 15,
    resizeMode: 'cover',
  },
});

export default IconBox;
