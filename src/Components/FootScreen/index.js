import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const PollutionScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = [
    {
      title: 'Carbon Footprint',
      description: 'Every action counts, every footprint matters. The small choices we make today will shape our planet’s future.',
      image: require('../../assets/foot3.jpg'),
      steps: [
        {
          
            stepTitle: 'Step 1:  Energy Use',
            subSteps: [
              'Switch to LEDs: They use up to 80% less energy and last longer than traditional bulbs.',
              'Unplug Devices: Standby power can account for 10% of a home’s electricity use.',
              'Optimize Heating/Cooling: Use energy-efficient settings and insulate your space to maintain temperature naturally.',
      
            ],
          },
          {
            stepTitle: 'Step 2: Sustainable Transportation',
            subSteps: [
              'Use Public Transit: Fewer cars on the road significantly lower emissions.',
              'Bike or Walk When Possible: A great way to reduce emissions and stay fit.',
              'Carpool: Sharing rides lowers the number of vehicles needed and cuts emissions.',
            ],
          },
          {
            stepTitle: 'Step 3: Reduce, Reuse, Recycle',
            subSteps: [
              'Minimize Single-Use Items: Use reusable bags, bottles, and containers.',
              'Recycle Properly: Sort items correctly to ensure they’re actually recycled.',
              'Choose Recycled Products: Look for recycled or upcycled items whenever possible.',
            ],
          },
          {
            stepTitle: 'Step 4: . Food Choices',
            subSteps: [
              'Buy Local and Seasonal: It reduces transportation emissions and often comes with less packaging.',
              'Reduce Meat and Dairy: Production of these foods emits high amounts of greenhouse gases.',
              'Minimize Food Waste: Plan meals, use leftovers creatively, and compost organic waste.',
            ],
          },
          {
            stepTitle: 'Step 5:  Mindful Consumption',
            subSteps: [
              'Buy Durable Goods: Fewer replacements mean less waste.',
              'Support Sustainable Brands: Choose companies that prioritize eco-friendly practices.',
              'Repair, Don’t Replace: Extend the life of items with maintenance or repair.',
            ],
          },
          {
            stepTitle: 'Steps 6: Water Conservation',
            subSteps: [
              'Take Shorter Showers: Less energy is used for heating.',
              'Fix Leaks: A leaky faucet wastes significant water over time.',
              'Use Efficient Appliances: Install low-flow toilets, showerheads, and faucets.',
            ],
              
        },
      ],
    },
  ];

  const handleSwipeLeft = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
          <Image source={pages[currentIndex].image} style={styles.image} />
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
  arrowButtonLeft: {
    position: 'absolute', 
    left: 10, 
    top: '50%', 
    transform: [{ translateY: -20 }], 
    zIndex: 1, 
    padding: 10,
  },
  arrowButtonRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -20 }], 
    zIndex: 1, 
    padding: 10,
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
