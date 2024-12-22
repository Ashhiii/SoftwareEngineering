import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../DataBase/SupaBase'; // import your supabase client

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Get the navigation prop


  const handleReportPress = (reportId) => {
    navigation.navigate('ReportDetails', { reportId });
  };

  const renderInfoCard = (iconName, title, count, color) => (
    <View style={[styles.infoCard, { backgroundColor: color }]}>
      <Ionicons name={iconName} size={30} color="white" />
      <Text style={styles.infoCount}>{count}</Text>
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
  );

  const renderHeader = () => (
    <SafeAreaView>
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
          <TouchableOpacity>
            {renderInfoCard('document-text-outline', 'Total Reports', 120, '#6a11cb')}
          </TouchableOpacity>
          <TouchableOpacity>
            {renderInfoCard('time-outline', 'Pending Reports', 15, '#ffb347')}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ManageUsers')}>
            {renderInfoCard('people-outline', 'Manage Users', 50, '#2196f3')}
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
    </SafeAreaView>
  );

  // Fetch reports from Supabase
  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('report').select('report_id, created_at, description');
      if (error) {
        throw error;
      }
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error.message);
      Alert.alert('Error', 'Failed to fetch reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={reports}
        keyExtractor={(item) => item.report_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleReportPress(item.report_id)} style={styles.reportItem}>
            <Text style={styles.reportText}>Report No: {item.report_id}</Text>
            <Text style={styles.reportText}>Date: {new Date(item.created_at).toLocaleDateString()}</Text>
            <Text style={styles.reportText}>Description: {item.description}</Text>
            </TouchableOpacity>
        )}
      />
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
    flexWrap: 'wrap',
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
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 100 ,
    marginTop: -20,
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
  reportItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3, // Adds shadow for better depth
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  reportText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5, // Adds spacing between lines
    fontFamily: 'Roboto', // Customize font style if needed
  },
  reportTextBold: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reportDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
});

export default AdminDashboard;