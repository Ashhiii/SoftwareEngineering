import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ReportDetails = ({ route, navigation }) => {
  const { report } = route.params;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(report.comments || []);
  const [visibility, setVisibility] = useState(report.visibility || 'private');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment.trim()];
      setComments(updatedComments);
      Alert.alert('Comment Added', 'Your comment has been posted.');
      setNewComment('');
    }
  };

  const handleToggleVisibility = () => {
    const newVisibility = visibility === 'public' ? 'private' : 'public';
    setVisibility(newVisibility);
    Alert.alert('Visibility Updated', `This report is now ${newVisibility}.`);
  };

  const handleApprove = () => {
    Alert.alert('Report Approved', 'The report has been approved.');
    navigation.goBack();
  };

  const handleReject = () => {
    Alert.alert('Report Rejected', 'The report has been rejected.');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Report Details</Text>
      <Text style={styles.description}>Description: {report.title}</Text>
      <Image source={{ uri: report.image }} style={styles.image} />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: report.location?.latitude || 0,
          longitude: report.location?.longitude || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {report.location && (
          <Marker coordinate={report.location} title="Reported Location" />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Approve" onPress={handleApprove} color="green" />
        <Button title="Reject" onPress={handleReject} color="red" />
      </View>

      <View style={styles.visibilityContainer}>
        <Button
          title={visibility === 'public' ? 'Make Private' : 'Make Public'}
          onPress={handleToggleVisibility}
          color={visibility === 'public' ? 'orange' : 'blue'}
        />
      </View>

      {visibility === 'public' && (
        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Comments:</Text>
          <ScrollView style={styles.commentsList}>
            {comments.map((comment, index) => (
              <Text key={index} style={styles.commentText}>
                - {comment}
              </Text>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder="Write a comment..."
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
            />
            <Button title="Add Comment" onPress={handleAddComment} color="green" />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    bottom: 150,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    top: 180,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    top: 180,

  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  visibilityContainer: {
    marginBottom: 20,
  },
  commentsSection: {
    flex: 1,
    marginTop: 20,
  },
  commentsHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentsList: {
    maxHeight: 200, // Set a fixed height for the scrollable comments
    marginBottom: 10,
  },
  commentText: {
    marginBottom: 5,
  },
  commentInputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default ReportDetails;
