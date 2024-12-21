import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const AQIIndicator = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    const waveAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 600, 
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: -1,
            duration: 300, 
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 100, 
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: 10, 
        }
      ).start(() => {
        animation.setValue(0);
      });
    };

    const startAnimationWithInterval = () => {
      waveAnimation();
      const interval = setInterval(() => {
        waveAnimation();
      }, 10000);

      return () => clearInterval(interval); 
    };

    startAnimationWithInterval(); 
  }, [animation]);

  const rotate = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'], 
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.circleOuter} />
        <View style={styles.circleMiddle} />
        <View style={styles.circleInner} />
        <View style={styles.aqiText}>
          <Text style={styles.aqiHeader}>AQI</Text>
          <Text style={styles.aqiValue}>27</Text>
          <Text style={styles.aqiStatus}>GREAT</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Location')}>
        <View style={styles.iconContainer}>
          <Animated.Image
            style={[styles.mapImage, { transform: [{ rotate }] }]} 
            source={require('../../assets/icon-remove.jpg')}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.bottomNav}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  circleContainer: {
    position: 'absolute',
    top: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOuter: {
    width: 330,
    height: 330,
    backgroundColor: 'rgba(123, 202, 135, 0.7)',
    borderRadius: 165,
    position: 'absolute',
  },
  circleMiddle: {
    width: 270,
    height: 270,
    backgroundColor: 'rgba(17, 51, 39, 0.3)',
    borderRadius: 135,
    position: 'absolute',
  },
  circleInner: {
    width: 210,
    height: 210,
    backgroundColor: 'rgba(17, 51, 39, 0.6)',
    borderRadius: 105,
    position: 'absolute',
  },
  aqiText: {
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    transform: [{ translateX: 10 }, { translateY: -5 }],
  },
  aqiHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    transform: [{ translateX: 10 }, { translateY: 5 }],
  },
  aqiValue: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    transform: [{ translateX: -2 }, { translateY: 5 }],
  },
  aqiStatus: {
    fontSize: 24,
    color: 'white',
    transform: [{ translateX: -10 }, { translateY: 5 }],
  },
  iconContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderRadius: 60, 
    marginBottom: 20,
    marginTop: 500,
  },
  mapImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default AQIIndicator;
