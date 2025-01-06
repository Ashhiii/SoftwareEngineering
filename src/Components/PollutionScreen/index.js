import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const PollutionScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = [
    {
      title: 'AIR POLLUTION',
      description: 'Air pollution results from vehicle emissions, industrial smoke, and the burning of fossil fuels.',
      image: require('../../assets/pollution1.jpg'),
      steps: [
        {
          stepTitle: 'Step 1: Use Clean Energy',
          subSteps: [
            'Opt for renewable energy sources like solar, wind, or hydroelectric power instead of fossil fuels.',
          ],
        },
        {
          stepTitle: 'Step 2: Switch to Electric Vehicles (EVs)',
          subSteps: [
            'Reduce vehicle emissions by using electric or hybrid cars, or carpooling.',
          ],
        },
        {
          stepTitle: 'Step 3: Limit Driving',
          subSteps: [
            'Use public transport, bike, or walk whenever possible to reduce air pollutants.',
          ],
        },
        {
          stepTitle: 'Step 4: Regular Vehicle Maintenance',
          subSteps: [
            'Keep your vehicle in good condition to reduce its emissions.',
          ],
        },
        {
          stepTitle: 'Step 5: Plant Trees',
          subSteps: [
            'Trees act as carbon sinks by absorbing CO₂ and releasing oxygen.',
          ],
        },
        {
          stepTitle: 'Tips for Air Pollution',
          subSteps: [
            'Use energy-efficient appliances and lighting.',
            'Avoid burning garbage or yard waste, which releases harmful gases into the air.',
            'Participate in reforestation or urban greening initiatives in your community.',
          ],
        },
      ],
    },
    {
      title: 'WATER POLLUTION',
      description: 'Water pollution is caused by industrial discharge, plastic waste, sewage, and agricultural runoff.',
      image: require('../../assets/pollution2.jpg'),
      steps: [
        {
          stepTitle: 'Step 1: Proper Waste Disposal',
          subSteps: [
            'Never dump chemicals, oils, or medicines down the drain or in water bodies.',
          ],
        },
        {
          stepTitle: 'Step 2: Use Eco-Friendly Products',
          subSteps: [
            'Opt for biodegradable cleaning products and natural pesticides to minimize chemical runoff.',
          ],
        },
        {
          stepTitle: 'Step 3: Fix Leaks',
          subSteps: [
            'Ensure septic tanks and sewage systems are well-maintained to prevent leakage into water sources.',
          ],
        },
        {
          stepTitle: 'Step 4: Reduce Plastic Use',
          subSteps: [
            'Minimize the use of single-use plastics, which often end up in oceans and rivers. Instead, use reusable items.',
          ],
        },
        {
          stepTitle: 'Step 5: Conserve Water',
          subSteps: [
            'Reduce water usage by fixing leaks, using efficient fixtures, and limiting water waste.',
          ],
        },
        {
          stepTitle: 'Tips for Water Pollution',
          subSteps: [
            'Participate in local clean-up activities for rivers, lakes, or beaches.',
            'Avoid overuse of fertilizers and pesticides in gardening or farming.',
            'Support policies and initiatives that enforce strict water pollution regulations for industries.',
          ],
        },
      ],
    },
    {
      title: 'SOIL POLLUTION',
      description: 'Soil pollution is caused by the overuse of pesticides, industrial waste, and improper waste disposal.',
      image: require('../../assets/pollution5.jpg'), 
      steps: [
        {
          stepTitle: 'Step 1: Use Organic Fertilizers',
          subSteps: [
            'Replace chemical fertilizers with organic options like compost and manure to reduce soil contamination.',
          ],
        },
        {
          stepTitle: 'Step 2: Compost',
          subSteps: [
            'Start composting organic waste at home instead of sending it to landfills.',
          ],
        },
        {
          stepTitle: 'Step 3: Limit Industrial Waste',
          subSteps: [
            'Support industries that implement waste treatment procedures to prevent hazardous materials from contaminating soil.',
          ],
        },
        {
          stepTitle: 'Step 4: Avoid Single-Use Plastics',
          subSteps: [
            'Plastic products contribute to long-term soil pollution when improperly discarded.',
          ],
        },
        {
          stepTitle: 'Tips for Soil Pollution',
          subSteps: [
            'Support sustainable agricultural practices, such as crop rotation and reduced pesticide use.',
            'Plant trees and other vegetation to prevent soil erosion and degradation.',
            'Participate in community clean-up efforts to remove litter and waste from parks and public areas.',
          ],
        },
      ],
    },
    {
      title: 'NOISE POLLUTION',
      description: 'Noise pollution is caused by traffic, industrial activity, construction, and loudspeakers.',
      image: require('../../assets/pollution4.jpg'),
      steps: [
        {
          stepTitle: 'Step 1: Reduce Vehicle Use',
          subSteps: [
            'Limit the use of vehicles, especially in residential areas, and support traffic calming measures.',
          ],
        },
        {
          stepTitle: 'Step 2: Implement Sound Barriers',
          subSteps: [
            'Advocate for sound barriers along highways and busy roads to minimize noise exposure.',
          ],
        },
        {
          stepTitle: 'Step 3: Use Quiet Equipment',
          subSteps: [
            'Opt for quieter machinery and tools in construction and landscaping to reduce noise pollution.',
          ],
        },
        {
          stepTitle: 'Step 4: Be Mindful of Noise Levels',
          subSteps: [
            'Keep noise levels down during late hours and encourage neighbors to do the same.',
          ],
        },
        {
          stepTitle: 'Tips for Noise Pollution',
          subSteps: [
            'Use noise-canceling headphones in noisy environments.',
            'Participate in local initiatives that promote quieter living spaces.',
          ],
        },
      ],
    },
  ];

  const handleSwipeLeft = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(pages.length - 1);
    }
  };
  

  return (
    <View style={styles.container}>

<View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <GestureRecognizer
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        style={styles.gestureContainer}
      >
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleSwipeRight} style={styles.circleButton1}>
            <Icon name="chevron-left" size={30} color="white" />
          </TouchableOpacity>

          <Image source={pages[currentIndex].image} style={styles.image} />

          <TouchableOpacity onPress={handleSwipeLeft} style={styles.circleButton2}>
            <Icon name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{pages[currentIndex].title}</Text>
          <Text style={styles.description}>{pages[currentIndex].description}</Text>
        </View>

        <View style={styles.dotContainer}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, { backgroundColor: currentIndex === index ? 'green' : '#D3D3D3' }]}
            />
          ))}
        </View>

        <View style={styles.separator} />
      </GestureRecognizer>

      <Text style={styles.stepsText}>Steps to reduce Pollution</Text>

      <ScrollView style={styles.stepsContainer} contentContainerStyle={styles.scrollContent}>
        {pages[currentIndex].steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.assessText}>{step.stepTitle}</Text>
            {step.subSteps.map((subStep, subIndex) => (
              <View key={subIndex} style={styles.bulletContainer}>
                <Text style={styles.bullet}>• </Text>
                <Text style={styles.stepsDescription}>{subStep}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  gestureContainer: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleButton1: {
    backgroundColor: '#2E7D32',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    position: 'absolute',
    zIndex: 2,
},
circleButton2: {
  backgroundColor: '#2E7D32',
  width: 50,
  height: 50,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 10,
  position: 'absolute',
  zIndex: 2,
  right: 0,
},

  arrowText: {
    fontSize: 40, 
    color: '#2E7D32', 
  },
  image: {
    width: width * 1, 
    height: height * 0.30,
    marginBottom: 30,
    top: 35,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: '#555',
    marginBottom: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: '#D3D3D3',
    marginVertical: 20,
    bottom: 20,
  },
  stepsText: {
    fontSize: 20, 
    color: '#2E7D32',
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    bottom: 40,
  },
  stepsContainer: {
    paddingHorizontal: 20,
    marginBottom: -40,
    flex: 1,
    bottom: 40,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  stepContainer: {
    marginBottom: 20,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 18,
    color: '#555',
  },
  assessText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  stepsDescription: {
    textAlign: 'left',
    fontSize: 13,
    color: 'black',
    textAlign: 'justify',
    lineHeight: 22,
  },

  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 2,
  },
  backButton: {
    padding: 10,
  },
});

export default PollutionScreen;
