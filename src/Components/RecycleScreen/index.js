import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialIcons';


const { width, height } = Dimensions.get('window');

const RecycleScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const pages = [
    {
      title: 'REDUCE',
      description: 'Reduce waste and minimize consumption to save the environment.',
      image: require('../../assets/waste1.jpg'), 
      steps: [
        {
          stepTitle: 'Step 1: Assess Your Consumption Habits',
          subSteps: [
            'Take note of the items you frequently buy or use, especially single-use products like plastic bottles, packaging, and disposable items.',
            'Identify areas where you can cut back, such as reducing the use of plastic, paper, or energy.',
          ],
        },
        {
          stepTitle: 'Step 2: Choose Reusable Over Disposable',
          subSteps: [
            'Switch to reusable items: Use cloth shopping bags, refillable water bottles, and reusable coffee cups.',
            'Replace disposable products with reusable alternatives, like metal straws, beeswax wraps, and glass containers.',
          ],
        },
        {
          stepTitle: 'Step 3: Buy in Bulk',
          subSteps: [
            'Purchase food and household products in bulk to minimize packaging waste.',
            'Use your own containers when possible for bulk shopping.',
          ],
        },
        {
          stepTitle: 'Step 4: Prioritize Quality Over Quantity',
          subSteps: [
            'Choose durable, long-lasting items instead of cheap, disposable ones.',
            'Invest in high-quality clothing, furniture, and electronics that won’t need frequent replacing.',
          ],
        },
        {
          stepTitle: 'Step 5: Reduce Paper Usage',
          subSteps: [
            'Go digital with bills, bank statements, and other documents to cut down on paper waste.',
            'Use both sides of the paper for printing or note-taking, and recycle used paper.',
          ],
        },
        {
          stepTitle: 'Step 6: Opt for Minimal Packaging',
          subSteps: [
            'Choose products with less packaging or eco-friendly packaging.',
            'Buy from companies that prioritize sustainable packaging, such as compostable, recyclable, or biodegradable materials.',
          ],
        },
        {
          stepTitle: 'Step 7: Donate or Sell Items You No Longer Use',
          subSteps: [
            'Instead of throwing things away, donate them to charity or sell them online.',
            'Items like clothes, books, electronics, and furniture can often find a second home.',
          ],
        },
        {
          stepTitle: 'Step 8: Reduce Food Waste',
          subSteps: [
            'Plan your meals to avoid overbuying and wasting food.',
            'Store food properly to keep it fresh longer, and use leftovers creatively.',
            'Compost food scraps to reduce waste further and create nutrient-rich soil.',
          ],
        },
        {
          stepTitle: 'Step 9: Limit Energy and Water Use',
          subSteps: [
            'Turn off lights, appliances, and electronics when not in use.',
            'Switch to energy-efficient appliances and LED light bulbs.',
            'Reduce water waste by fixing leaks and using water-saving appliances.',
          ],
        },
        {
          stepTitle: 'Step 10: Support Sustainable Companies',
          subSteps: [
            'Choose brands and products that are eco-friendly and committed to reducing waste in their operations.',
            'Look for certifications like Fair Trade, Organic, or those that use recycled materials in their products.',
          ],
        },
      ],
    },
    {
      title: 'RECYCLING',
      description: 'Recycle items to contribute to a greener planet.',
      image: require('../../assets/waste2.jpg'),
      steps: [
        {
          stepTitle: 'Step 1: Know Your Local Recycling Guidelines',
          subSteps: [
            'Research: Check your local government or recycling facility’s website for specific guidelines on what can and cannot be recycled in your area.',
            'Create a List: Make a list of accepted materials (e.g., paper, cardboard, glass, certain plastics) and items that should be avoided (e.g., plastic bags, pizza boxes).',
          ],
        },
        {
          stepTitle: 'Step 2: Set Up a Recycling Station at Home',
          subSteps: [
            'Designate Containers: Use separate bins for different types of recyclables (e.g., one for paper, one for plastics, one for glass).',
            'Label Each Bin: Clearly label each container to remind everyone which items belong where.',
          ],
        },
        {
          stepTitle: 'Step 3: Clean and Prepare Recyclables',
          subSteps: [
            'Rinse Containers: Rinse out food containers like jars, cans, and bottles to remove any residue.',
            'Dry Items: Ensure items are dry to prevent contamination.',
            'Flatten Boxes: Flatten cardboard boxes to save space and make them easier to process.',
          ],
        },
        {
          stepTitle: 'Step 4: Sort Your Recyclables',
          subSteps: [
            'Separate by Material: Keep different materials separated based on local recycling rules (e.g., keep glass away from paper).',
            'Check for Labels: Look for recycling symbols on plastic items to identify their recyclability.',
          ],
        },
        {
          stepTitle: 'Step 5: Avoid Common Recycling Mistakes',
          subSteps: [
            'No Plastic Bags: Do not place plastic bags in your recycling bin unless your local facility accepts them; use designated drop-off locations instead.',
            'Remove Lids and Caps: Check if your recycling facility accepts lids; if not, remove them from bottles and jars.',
          ],
        },
        {
          stepTitle: 'Step 6: Drop Off or Place Bins Curbside',
          subSteps: [
            'Follow Collection Schedule: If you have curbside recycling, know your collection days and place your bin outside accordingly.',
            'Visit Drop-Off Centers: If curbside service is not available, take your sorted recyclables to a local drop-off center.',
          ],
        },
        {
          stepTitle: 'Step 7: Recycle Specialty Items Properly',
          subSteps: [
            'Electronics: Take old electronics, batteries, and other hazardous materials to designated e-waste recycling locations.',
            'Light Bulbs: Some types of light bulbs may require special recycling; check local guidelines.',
          ],
        },
        {
          stepTitle: 'Step 8: Educate Yourself and Others',
          subSteps: [
            'Stay Informed: Keep updated on changes to local recycling rules or accepted materials.',
            'Share Knowledge: Encourage family and friends to recycle properly by sharing tips and guidelines.',
          ],
        },
        {
          stepTitle: 'Step 9: Monitor Your Recycling Efforts',
          subSteps: [
            'Evaluate: Periodically check your recycling habits to see if you’re recycling effectively.',
            'Adjust as Needed: Make changes if you notice contamination or if items are being incorrectly disposed of.',
          ],
        },
        {
          stepTitle: 'Step 10: Advocate for Better Recycling Practices',
          subSteps: [
            'Support Local Initiatives: Get involved with community efforts to improve recycling programs and raise awareness about recycling.',
            'Promote Sustainable Practices: Encourage others to reduce, reuse, and recycle in their daily lives.',
          ],
        },
      ],
    },
    {
      title: 'REUSE',
      description: 'Find creative ways to reuse items to reduce waste.',
      image: require('../../assets/waste3.jpg'), 
      steps: [
        {
          stepTitle: 'Step 1: Identify Items to Reuse',
          subSteps: [
            'Assess your belongings to identify items that can be reused instead of discarded (e.g., glass jars, plastic containers, old clothes).',
            'Look for versatile items that can serve multiple purposes, such as towels, boxes, or furniture.',
          ],
        },
        {
          stepTitle: 'Step 2: Clean and Prepare Items for Reuse',
          subSteps: [
            'Clean thoroughly: Wash or sanitize items you plan to reuse to ensure they’re safe and ready for new uses.',
            'Repair when possible: Fix broken items instead of throwing them away (e.g., sew a button back on or use glue for minor repairs).',
          ],
        },
        {
          stepTitle: 'Step 3: Get Creative with Reuse Ideas',
          subSteps: [
            'Repurpose containers: Use glass jars for storage, plant pots, or as drinking glasses.',
            'Transform old clothes: Turn old t-shirts into rags, quilts, or tote bags.',
            'Reuse packaging: Save boxes and shipping materials for future use, such as organizing or storing items.',
          ],
        },
        {
          stepTitle: 'Step 4: Incorporate Reusable Items into Daily Life',
          subSteps: [
            'Use reusable bags instead of single-use plastic bags for shopping.',
            'Carry a refillable water bottle to reduce single-use plastic bottles.',
            'Pack snacks in reusable containers instead of disposable ones.',
          ],
        },
        {
          stepTitle: 'Step 5: Host a Swap or Donation Event',
          subSteps: [
            'Organize a swap with friends or family to exchange items they no longer need.',
            'Donate unused items in good condition to local charities, thrift stores, or shelters.',
          ],
        },
        {
          stepTitle: 'Step 6: Learn DIY Upcycling Projects',
          subSteps: [
            'Upcycle furniture: Repaint or refinish old furniture to give it a fresh look.',
            'Create art or crafts from discarded materials like paper, plastic, or wood.',
            'Find online tutorials for DIY projects that involve reusing everyday items.',
          ],
        },
        {
          stepTitle: 'Step 7: Avoid Single-Use Products',
          subSteps: [
            'Opt for reusable alternatives to items like plastic straws, paper towels, and disposable utensils.',
            'Use cloth napkins, reusable snack bags, and refillable containers for household needs.',
          ],
        },
        {
          stepTitle: 'Step 8: Share Reuse Ideas with Others',
          subSteps: [
            'Talk to friends and family about the benefits of reusing items.',
            'Share creative reuse ideas on social media or in your community to inspire others.',
          ],
        },
        {
          stepTitle: 'Step 9: Encourage Others to Adopt Reuse Practices',
          subSteps: [
            'Help family members, friends, or coworkers incorporate reusable items into their daily lives.',
            'Lead by example: Use reusable items at home, at work, and in public settings.',
          ],
        },
        {
          stepTitle: 'Step 10: Support Businesses that Promote Reuse',
          subSteps: [
            'Shop at second-hand stores or thrift shops that sell reused items.',
            'Choose products from companies that offer sustainable or reusable packaging.',
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

      <Text style={styles.stepsText}>Steps to Reduce Waste</Text>

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

export default RecycleScreen;