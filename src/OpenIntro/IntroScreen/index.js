import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IntroScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../../src/assets/2.jpg')}
      style={styles.background}
      
    >
    <TouchableOpacity style={styles.adminIcon} onPress={() => navigation.navigate('AdminLogin')}
    >
        <MaterialCommunityIcons name='account-cog-outline' size={30} color='white' />
    </TouchableOpacity>

      <View style={styles.container}>
        <SwiperFlatList
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={3}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
        >
          <View style={styles.slide}>
            <Image source={require('../../../src/assets/holding.jpg')} style={styles.headerImage} />
            <View style={styles.smallImagesContainer}>
              <Image source={require('../../../src/assets/airpurifiers.jpg')} style={styles.smallImage1} />
              <Image source={require('../../../src/assets/man.jpg')} style={styles.smallImage2} />
              <Image source={require('../../../src/assets/glass.jpg')} style={styles.smallImage3} />
            </View>
            <View style={styles.welcomeMessage}>
              <Text style={styles.welcomeText}>Welcome to the app that reveals</Text>
              <Text style={styles.welcomeText}>what's in the air!</Text>
            </View>
          </View>

          <View style={styles.slide}>
            <Image source={require('../../../src/assets/map.jpg')} style={styles.headerImage} />
            <View style={styles.smallImagesContainer}>
              <Image source={require('../../../src/assets/mapicon.jpg')} style={styles.smallImage6} />
            </View>
            <View style={styles.circleDotRed} />
            <View style={styles.circleDotYellow} />
            <View style={styles.circleDotBlue} />
            <View style={styles.welcomeMessage}>
              <Text style={styles.welcomeText}>Explore air quality data and</Text>
              <Text style={styles.welcomeText}>forecast for any city in your place.</Text>
            </View>
          </View>

          <View style={styles.slide}>
            <Image source={require('../../../src/assets/notif.jpg')} style={styles.headerImage} />
            <View style={styles.smallImagesContainer}>
              <Image source={require('../../../src/assets/notify.jpg')} style={styles.smallImage4} />
              <Image source={require('../../../src/assets/8.jpg')} style={styles.smallImage5} />
            </View>
            <View style={styles.welcomeMessage}>
              <Text style={styles.welcomeText}>Set up notifications tailored</Text>
              <Text style={styles.welcomeText}>to your habits.</Text>
            </View>
          </View>
        </SwiperFlatList>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton} 
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  adminIcon: {
    position: 'absolute',
    top: 40, 
    left: 20, 
    zIndex: 10,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
  },
  headerImage: {
    width: '100%',
    height: 580,
    resizeMode: 'cover',
  },
  smallImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
  },
  smallImage1: {
    width: 100,
    height: 100,
    top: 100,
    left: 50,
    borderRadius: 10,
  },
  smallImage2: {
    width: 150,
    height: 100,
    top: 70,
    left: 110,
    borderRadius: 10,
  },
  smallImage3: {
    width: 150,
    height: 100,
    borderRadius: 10,
    top: 280,
    right: 70,
  },
  smallImage4: {
    width: 100,
    height: 100,
    borderRadius: 10,
    top: 280,
    right: 45,
  },
  smallImage5: {
    width: 150,
    height: 100,
    borderRadius: 10,
    top: 300,
    left: 45,
  },
  smallImage6: {
    width: 150,
    height: 100,
    top: 190,
    borderRadius: 10,
    left: 0,
  },
  circleDotRed: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
    position: 'absolute',
    top: 100,
    left: 50,
  },
  circleDotYellow: {
    width: 50,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 25,
    position: 'absolute',
    top: 200,
    left: 300,
  },
  circleDotBlue: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 25,
    position: 'absolute',
    top: 400,
    left: 20,
  },
  welcomeMessage: {
    marginTop: 70,
    bottom: 50,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  dot: {
    backgroundColor: '#bbb',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#2db14f',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  loginButton: {
    borderWidth: 2, 
    borderColor: 'green', 
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  signUpButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
