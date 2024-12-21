import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Tooltip = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    const showTooltip = () => {
      // Fade in the tooltip
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Duration of the fade-in
        useNativeDriver: true,
      }).start(() => {
        // Fade out after 3 seconds
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300, // Duration of the fade-out
            useNativeDriver: true,
          }).start();
        }, 3000); // Tooltip stays visible for 3 seconds
      });
    };

    // Show tooltip every 10 seconds
    const interval = setInterval(showTooltip, 10000);
    
    // Initial show
    showTooltip();

    return () => clearInterval(interval); // Clean up on unmount
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.tooltipContainer, { opacity: fadeAnim }]}>
      <View style={styles.tooltipArrow} />
      <Text style={styles.tooltipText}>{children}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    bottom: 55, 
    left: '50%', 
    transform: [{ translateX: -50 }], 
    backgroundColor: '#fff',
    padding: 8,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    elevation: 5,
    zIndex: 10, 
  },
  tooltipArrow: {
    position: 'absolute',
    top: '118%',
    left: '100%',
    transform: [{ translateX: -5 }], 
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8, 
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff', 
  },
  tooltipText: {
    color: '#000',
    fontSize: 12,
  },
});

export default Tooltip;
