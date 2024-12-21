import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const TreeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = [
      {
        title: 'Planting Trees',
        description: 'Planting trees to green the earth.',
        image: require('../../assets/tree1.jpg'),
        steps: [
          {
            stepTitle: 'Step 1: Choose the Right Species',
            subSteps: [
              'Look up trees native to your region. Resources can include local forestry departments, universities, and botanical gardens.',
              'Understand the climate of your area (temperature, rainfall, etc.) and select species that are well-adapted to these conditions.',
              'Test your soil to determine pH and nutrient levels. Choose species that thrive in the soil type (sandy, clay, loamy) and conditions (well-drained, wet, etc.) present in your planting area.',
              'Opt for species that provide habitat and food for local wildlife. Trees like oaks, maples, and pines often attract birds and insects.',
            ],
          },
          {
            stepTitle: 'Step 2: Determine Spacing and Location',
            subSteps: [
              'Measure the area where you plan to plant. Ensure there is enough room for the tree to grow to its full size.',
              'Identify nearby structures, power lines, and other trees. Maintain a safe distance (at least 10-15 feet) from power lines and structures to prevent future growth issues.',
              'Observe sunlight patterns in your planting area. Most trees prefer full sun (6-8 hours of direct sunlight). Choose a location that receives adequate light throughout the day.',
              'Research the mature size of the tree species you’ve selected. Ensure that other plants and trees will not overshadow or crowd your new tree as it grows.',
              'Once you\'ve determined the spacing, mark the spots where you will plant each tree. This helps visualize the layout and ensures even spacing.',
            ],
          },
          {
            stepTitle: 'Step 3: Prepare for Planting',
            subSteps: [
              'Collect necessary tools, such as a shovel, water, mulch, and fertilizer (if needed).',
              'Clear the planting area of debris, grass, and weeds. Loosen the soil where you will plant the tree to facilitate root growth.',
              'Dig a hole that is twice as wide and just as deep as the root ball of the tree. This allows the roots to spread and establish in the surrounding soil.',
              'Remove the tree from its container, gently loosen any bound roots, and place it in the hole. Ensure that the top of the root ball is level with or slightly above the soil surface.',
              'Fill the hole with the original soil, gently tamping it down to eliminate air pockets. Water thoroughly after planting to help settle the soil.',
            ],
          },
          {
            stepTitle: 'Step 4: Care After Planting',
            subSteps: [
              'Water the tree deeply and regularly, especially during the first few years as it establishes roots.',
              'Apply a 2-4 inch layer of mulch around the base of the tree, leaving space around the trunk to prevent rot. Mulch helps retain moisture and suppress weeds.',
              'Keep an eye on your tree for any signs of stress, disease, or pests. Address any issues promptly to ensure healthy growth.',
              'As the tree grows, prune to remove dead or damaged branches and to shape the tree. Proper pruning can encourage strong, healthy growth.',
            ],
          },
        ],
      },
    
    {
      title: 'Protect Natural Habitats',
      description: 'Conservation is humanity caring for the future.',
      image: require('../../assets/tree2.jpg'), 
      steps: [
        {
          stepTitle: 'Step 1: Support Reforestation Projects',
          subSteps: [
            'Participate in reforestation initiatives in your community or through global organizations.',
            'Donate to or volunteer with reforestation projects focused on restoring deforested areas.',
          ],
        },
        {
          stepTitle: 'Step 2: Promote Sustainable Practices',
          subSteps: [
            'Educate people on the importance of using sustainable materials like bamboo or recycled wood to reduce the demand for timber.',
            'Encourage local businesses to adopt eco-friendly and sustainable practices to lessen their impact on natural habitats.',
          ],
        },
        {
          stepTitle: 'Step 3: Raise Awareness',
          subSteps: [
            'Organize educational campaigns on the importance of forests and biodiversity, using social media or local events.',
            'Share information on the dangers of deforestation and the long-term impacts on ecosystems, wildlife, and human communities.',
          ],
        },
        {
          stepTitle: 'Step 4: Support Conservation Policies',
          subSteps: [
            'Advocate for government policies and laws that protect forests, wildlife habitats, and biodiversity.',
            'Join petitions or participate in campaigns that focus on preserving natural habitats and preventing deforestation.',
          ],
        },
        {
          stepTitle: 'Step 5: Work with Conservation Organizations',
          subSteps: [
            'Collaborate with or donate to conservation groups that focus on protecting endangered species and habitats.',
            'Volunteer for activities like tree planting, habitat cleanup, or wildlife monitoring.',
          ],
        },
        {
          stepTitle: 'Step 6: Reduce Personal Impact',
          subSteps: [
            'Minimize your carbon footprint by reducing waste, using energy efficiently, and consuming fewer products that contribute to deforestation (such as palm oil).',
            'Opt for products that are certified sustainable or eco-friendly (e.g., Forest Stewardship Council-certified wood).',
         ],
        },

        {
          stepTitle: 'Step 7: Monitor Local Forest Health',
          subSteps: [
            'Participate in or organize local initiatives to monitor the health of nearby forests and natural habitats.',
            'Report illegal logging or habitat destruction to local authorities or environmental organizations.',
         ],
        },
      ],
    },
    {
      title: 'Practice Sustainable logging',
      description: 'Noise pollution is caused by traffic, industrial activity, construction, and loudspeakers.',
      image: require('../../assets/tree3.jpg'), 
      steps: [
        {
          stepTitle: 'Step 1: Understand sustainable logging methods',
          subSteps: [
            'Learn about selective logging, where only certain trees are harvested, leaving the ecosystem intact.',
          ],
        },
        {
          stepTitle: 'Step 2: Support companies that follow eco-friendly practices',
          subSteps: [
            'Choose wood products certified by sustainable forestry initiatives (e.g., FSC - Forest Stewardship Council).',
          ],
        },
        {
          stepTitle: 'Step 3: Promote replanting efforts',
          subSteps: [
            'Encourage replanting to replenish trees that are cut down for wood products.',
          ],
        },
      ],
    },

    {
      title: 'Promote Tree Health',
      description: 'Noise pollution is caused by traffic, industrial activity, construction, and loudspeakers.',
      image: require('../../assets/tree4.jpg'), 
      steps: [
        {
          stepTitle: 'Step 1: Encourage regular tree care',
          subSteps: [
            'Advocate for practices like pruning, watering, and soil management to keep trees healthy.',
          ],
        },
        {
          stepTitle: 'Step 2: Inform others about the importance of pest control',
          subSteps: [
            'Prevent diseases and pests from harming trees, prolonging their life.',
          ],
        },
        {
          stepTitle: 'Step 3: Host or attend tree care workshops',
          subSteps: [
            ' Organize or participate in community workshops that teach proper tree maintenance techniques.',
          ],
        },
      ],
    },

    {
      title: 'Report Illegal Cutting',
      description: 'Noise pollution is caused by traffic, industrial activity, construction, and loudspeakers.',
      image: require('../../assets/tree5.jpg'), 
      steps: [
        {
          stepTitle: 'Step 1: Learn how to spot illegal activities',
          subSteps: [
            'Advocate for practices like pruning, watering, and soil management to keep trees healthy.',
          ],
        },
        {
          stepTitle: 'Step 2: Know who to contact',
          subSteps: [
            'Identify the proper authorities, such as local environmental agencies or conservation organizations, to report illegal activities.',
          ],
        },
        {
          stepTitle: 'Step 3: Encourage community vigilance',
          subSteps: [
            'Share the importance of reporting illegal activities to help enforce conservation laws and protect forests.',
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

      <Text style={styles.stepsText}>Steps to reduce deforestation and protect trees </Text>

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
    height: height * 0.35,
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
    textAlign: 'center',   // Center the text
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

export default TreeScreen;
