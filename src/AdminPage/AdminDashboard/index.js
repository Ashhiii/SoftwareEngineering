import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AdminDashboard = ({ navigation }) => {
  const [reports, setReports] = useState([
    { id: 1, title: 'Illegal Dumping', status: 'Pending', date: '2024-11-10', visibility: 'private', comments: [] },
    { id: 2, title: 'Tree Cutting', status: 'Approved', date: '2024-11-09', visibility: 'public', comments: ["This is great work!"] },
    { id: 3, title: 'Air Pollution', status: 'Rejected', date: '2024-11-08' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);  

  const renderInfoCard = (iconName, title, count, color) => (
    <View style={[styles.infoCard, { backgroundColor: color }]} >
      <Ionicons name={iconName} size={30} color="white" />
      <Text style={styles.infoCount}>{count}</Text>
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => setIsLogoutVisible(!isLogoutVisible)}>
            <Ionicons name="menu" size={30} color="white" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Welcome, Admin</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.report}>
            {renderInfoCard('document-text-outline', 'Total Reports', 120, '#6a11cb')}
          </TouchableOpacity>
          <TouchableOpacity style={styles.pending}>
            {renderInfoCard('time-outline', 'Pending Reports', 15, '#ffb347')}
          </TouchableOpacity>
          <TouchableOpacity>
            {renderInfoCard('checkmark-done-outline', 'Approved Reports', 95, '#43a047')}
          </TouchableOpacity>
          <TouchableOpacity>
            {renderInfoCard('close-outline', 'Rejected Reports', 10, '#d32f2f')}
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  const handleLogout = () => {
    setIsModalVisible(false);  // Close the modal before starting logout
    setIsLoggingOut(true);  // Set loading state to true
    setTimeout(() => {
      setIsLoggingOut(false);  // Set loading state back to false after 2 seconds
      Alert.alert('Logged Out', 'You have been logged out successfully', [
        { 
          text: 'OK', 
          onPress: () => navigation.replace('Login') 
        }
      ]);
    }, 2000);  // Simulate logout process with a delay
  };
  
  return (
    <View style={styles.fullScreenContainer}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reportCard}
            onPress={() => navigation.navigate('ReportDetails', { report: item })}
          >
            <View>
              <Text style={styles.reportTitle}>{item.title}</Text>
              <Text style={styles.reportDate}>{item.date}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isLogoutVisible && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      )}

      {isLoggingOut && (  // Show loading spinner when logging out
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a11cb" />
          <Text style={styles.loggingOutText}>Logging Out...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  report: {
    width: '50%',
    padding: 15,
    borderRadius: 15,
    marginTop: -15,
    alignItems: 'center',
    left: 5,
  },
  pending: {
    width: '50%',
    padding: 15,
    borderRadius: 15,
    marginTop: -15,
    alignItems: 'center',
    right: 2,
  },
  header: {
    backgroundColor: '#4c669f',
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 10,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    right: 60,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 80,
  },
  infoCard: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    top: 80,
    alignItems: 'center',
  },
  infoCount: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infoTitle: {
    fontSize: 14,
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#6a11cb',
  },
  reportCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportDate: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#6a11cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: '#6a11cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -25 }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    zIndex: 1000,  // Ensure it appears above other components
  },
  
  loggingOutText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
});

export default AdminDashboard;
