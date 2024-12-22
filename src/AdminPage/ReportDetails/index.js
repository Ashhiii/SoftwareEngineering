import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../DataBase/SupaBase'; // Import your Supabase client

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
          users(first_name, last_name, profile_picture, email)
        `);
  
      if (error) {
        throw new Error(error.message); // Throw an error if the query fails
      }
  
      setReports(data); // Set the reports if data is returned
    } catch (error) {
      console.error('Error fetching reports:', error.message);
      Alert.alert('Error', 'Failed to fetch reports.');
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
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
  reportDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
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
});

export default ReportList;
