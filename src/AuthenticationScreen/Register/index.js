import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../src/DataBase/Firebase';
import { supabase } from '../../../src/DataBase/SupaBase'; 

const Register = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: new Date(),
    gender: '',
    password: '',
    confirmPassword: '',
  });

const handleRegister = async () => {
  const { firstName, lastName, email, phone, gender, birthDate, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  try {
    //Create a new user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    //Send email verification
    await sendEmailVerification(user);

    //Notify the user to check their email
    Alert.alert(
      "Verify Your Email",
      "Registration successful! Please check your email to verify your account.",
      [{ text: "OK", onPress: () => navigation.navigate("Login") }]
    );

    //Save additional user info in Supabase
    const { error: dbError } = await supabase.from('users').insert([{
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      email,
      gender,
      date_of_birth: birthDate.toISOString(),
    }]);

    if (dbError) {
      console.error("Database error:", dbError);
      Alert.alert("Database Error", dbError.message);
      return;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    Alert.alert("Registration Error", error.message);
  }
};


  const handleNext = () => {
    const { firstName, lastName, email, phone, gender, password, confirmPassword } = formData;

    switch (currentStep) {
      case 0:
        if (!firstName || !lastName) {
          Alert.alert("Error", "Please fill out your name.");
          return;
        }
        break;
      case 1:
        if (!email || !phone) {
          Alert.alert("Error", "Please fill out your contact information.");
          return;
        }
        break;
      case 2:
        if (!gender) {
          Alert.alert("Error", "Please select your gender.");
          return;
        }
        break;
      case 3:
        if (!password || !confirmPassword) {
          Alert.alert("Error", "Password fields cannot be empty.");
          return;
        }
        if (password !== confirmPassword) {
          Alert.alert("Error", "Passwords do not match.");
          return;
        }
        handleRegister();
        return;
      default:
        break;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              placeholderTextColor="white"
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              placeholderTextColor="white"
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              placeholderTextColor="white"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              placeholderTextColor="white"
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.datePickerContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                <Text style={{ color: 'white' }}>{formData.birthDate.toLocaleDateString()}</Text>
                <Icon name="calendar" size={20} color="white" style={styles.dateIcon} />
                </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.birthDate}
                  mode="date"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setFormData({ ...formData, birthDate: date });
                  }}
                />
              )}
            </View>
            <Picker
              selectedValue={formData.gender}
              style={styles.input}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              placeholderTextColor="white"
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.confirmPassword}
              placeholderTextColor="white"
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground 
      source={require('../../../src/assets/2.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.progressBar}>
          {['Name', 'Contact', 'Birth', 'Submit'].map((step, index) => (
            <React.Fragment key={index}>
              <View style={[styles.step, index === currentStep && styles.activeStep]}>
                <Text style={styles.stepText}>{step}</Text>
                <View style={[styles.bullet, index <= currentStep && styles.activeBullet]}>
                  <Text style={styles.bulletText}>
                    {index < currentStep ? '✓' : index + 1}
                  </Text>
                </View>
              </View>
              {index < 3 && (
                <View 
                  style={[styles.line, index < currentStep && { backgroundColor: '#1b7dc3' }]} 
                />
              )}
            </React.Fragment>
          ))}
        </View>

        <ScrollView>  
          {renderStep()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.button} onPress={handlePrevious}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{currentStep === 3 ? "Submit" : "Next"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',  
    borderRadius: 10,
    left: 19,
    width: '90%',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white', 
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 5, 
  },
  input: {
    height: 50,
    borderColor: 'white', 
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white', 
    width: 280,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  progressBar: {
    flexDirection: 'row', 
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
  },
  activeStep: {
    fontWeight: 'bold',
  },
  stepText: {
    color: 'white', 
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 10,
  },
  bullet: {
    height: 25,
    width: 25,
    borderColor: 'white', 
    borderWidth: 2,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBullet: {
    backgroundColor: '#1b7dc3',
    borderColor: 'white',
  },
  bulletText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  line: {
    height: 2.5,
    backgroundColor: 'white',
    flex: 1, 
    alignSelf: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between', 
  },
  dateIcon: {
    marginLeft: 150, 
  },
});


export default Register;
