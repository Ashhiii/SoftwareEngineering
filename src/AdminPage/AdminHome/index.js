import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminHome = ({ navigation }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = [
        { id: 1, title: 'Illegal Dumping', status: 'Pending' },
        { id: 2, title: 'Tree Cutting', status: 'Pending' },
      ];
      setReports(response);
    };
    fetchReports();
  }, []);

  const handleViewReport = (report) => {
    navigation.navigate('ReportDetails', { report });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reportItem}
            onPress={() => handleViewReport(item)}
          >
            <View style={styles.reportContent}>
              <Text style={styles.reportTitle}>{item.title}</Text>
              <Text style={styles.reportStatus}>Status: {item.status}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    top: 30,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  reportItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: 'green',
    borderWidth: 1,
  },
  reportContent: {
    flexDirection: 'column',
    flex: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportStatus: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default AdminHome;
