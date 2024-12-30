
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const DriverDetailsCard = ({ item, onReact }) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Email: {item.email}</Text>
      <Text style={styles.detail}>Phone: {item.phone}</Text>
      <Text style={styles.detail}>Address: {item.address}</Text>
      <Text style={styles.detail}>Car: {item.carDetails}</Text>
      <Image source={item.carImage} style={styles.carImage} />

      <View style={styles.buttonContainer}>
      <Text style={styles.reactsText}>Reacts: {item.reacts}</Text>

        <Button
          title={item.hasReacted ? 'Unlike' : 'Like'}
          onPress={onReact} // Call the onReact function passed from CardScreen
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
  carImage: {
    width: 100,
    height: 60,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 15,
  },
  reactsText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#555555',
  },
 
});

export default DriverDetailsCard;
