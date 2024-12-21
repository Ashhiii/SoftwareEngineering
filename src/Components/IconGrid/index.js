
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import IconBox from '../IconBox/index'; 

const IconGrid = () => {
  const navigation = useNavigation(); 

  const handleIconPress = (routeName) => {
    navigation.navigate(routeName); 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <View style={styles.emptySpace} />
        <View style={styles.icons}>
          <IconBox source={require('../../assets/recycles.jpg')} onPress={() => handleIconPress('RecycleScreen')} />
          <IconBox source={require('../../assets/fort.png')} onPress={() => handleIconPress('TreeScreen')} />
          <IconBox source={require('../../assets/pollution.jpg')} onPress={() => handleIconPress('PollutionScreen')} />
          <IconBox source={require('../../assets/foot.png')} onPress={() => handleIconPress('FootScreen')} />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingTop: 300,
  },
  content: {
    alignItems: 'center',
  },
  emptySpace: {
    height: 300,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: 600,
    marginVertical: -340,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
  },
});

export default IconGrid;
