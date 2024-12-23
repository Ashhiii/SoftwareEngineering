import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../DataBase/SupaBase'; 

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('report')
        .select(`
          report_id, 
          created_at, 
          description, 
          user_id, 
          report_image,
          status,
          users(first_name, last_name, profile_picture, email)
        `);

      if (error) {
        throw new Error(error.message); // Throw an error if the query fails
      }

      setReports(data); 
    } catch (error) {
      console.error('Error fetching reports:', error.message);
      Alert.alert('Error', 'Failed to fetch reports.');
    } finally {
      setLoading(false); 
    }
  };

  const updateReportStatus = async (reportId, status, userId) => {
    try {
      const { data, error } = await supabase
        .from('report')
        .update({ status: status })
        .eq('report_id', reportId);
  
      if (error) {
        throw new Error(error.message); 
      }
  
      // FIXED Send notification after updating the status
      const notificationMessage = status.toLowerCase() === 'approved' 
        ? 'Your report has been approved.' 
        : 'Your report has been rejected.';
      
      await insertNotification(userId, reportId, status, notificationMessage);
      
      Alert.alert('Success', `Report ${status === 'Approved' ? 'Approved' : 'Rejected'}`);
      fetchReports(); 
    } catch (error) {
      console.error('Error updating report status:', error.message);
      Alert.alert('Error', 'Failed to update the report status.');
    }
  };

  const insertNotification = async (userId, reportId, status, message) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: userId,
            report_id: reportId,
            type: status === 'Approved' ? 'Report Approved' : 'Report Rejected',
            message: message,
          }
        ]);
      
      if (error) throw error;
      console.log('Notification sent:', data);
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Reports</Text>
    </View>
  );

  const renderReportItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reportItem}
      onPress={() => navigation.navigate('ReportDetails', { report: item })}
    >
      <View style={styles.reportInfoContainer}>
        {/* Report Information Section */}
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>Report No: {item.report_id}</Text>
          <Text style={styles.reportDate}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
        
        <Text style={styles.reportDescription}>{item.description}</Text>
        <Text style={[styles.reportStatus, 
        { 
          color: item.status?.toLowerCase() === 'approved' 
          ? 'green' 
          : item.status?.toLowerCase() === 
          'rejected' ? 'red' 
          : 'black',
          backgroundColor: item.status?.toLowerCase() === 'approved' ? '#d4edda' : item.status?.toLowerCase() === 'rejected' ? '#f8d7da' : '#f4f4f4'}]}>
          Status: {item.status || 'Pending'}
        </Text>
        {/* Report Image */}
        {item.report_image ? (
          <Image
            source={{ uri: item.report_image }}
            style={styles.reportImage}
          />
        ) : (
          <Text style={styles.noImageText}>No image available</Text>
        )}
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Reporter Information Section */}
      <View style={styles.reporterInfo}>
        <View style={styles.reporterInfoColumn}>
          <Text style={styles.reporterName}>
            Reporter: {item.users.first_name} {item.users.last_name}
          </Text>
        </View>
        <View style={styles.reporterInfoRow}>
          <View style={styles.reporterLeftSide}>
            <Text style={styles.reporterEmail}>Email: {item.users.email}</Text>
          </View>
          <View style={styles.reporterRightSide}>
            {item.users.profile_picture && (
              <Image
                source={{ uri: item.users.profile_picture }}
                style={styles.reporterImage}
              />
            )}
          </View>
        </View>
      </View>

      {/* Approve/Reject Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => updateReportStatus(item.report_id, 'Approved', item.user_id)}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => updateReportStatus(item.report_id, 'Rejected', item.user_id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading reports...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={reports}
        keyExtractor={(item) => item.report_id.toString()}
        renderItem={renderReportItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No reports found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  reportItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  reportInfoContainer: {
    marginBottom: 15,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reportDate: {
    fontSize: 14,
    color: '#888',
  },
  reportStatus: {
    flexDirection: 'column',
    fontSize: 14,
    fontWeight: '600',
    color: '#333', 
    backgroundColor: '#f4f4f4', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16, 
    borderWidth: 1,
    borderColor: '#ccc', 
    alignSelf: 'flex-start',
  },
  reportDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginBottom: 30
  },
  reportImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    resizeMode: 'cover',
  },
  noImageText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  reporterInfo: {
    marginTop: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  reporterInfoColumn: {
    marginBottom: 8,
  },
  reporterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reporterInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  reporterLeftSide: {
    flex: 1,
    marginRight: 10,
  },
  reporterEmail: {
    fontSize: 14,
    color: '#555',
  },
  reporterRightSide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reporterImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    aspectRatio:1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 35,
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#e7e7e7', // Light neutral background
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Subtle border color
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#e7e7e7', // Light neutral background
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Subtle border color
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333', // Dark text for better readability
  },
});

export default ReportList;
