import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DriverDetailsCard = ({ item, onReact }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Email: {item.email}</Text>
      <Text style={styles.detail}>Phone: {item.phone}</Text>
      <Text style={styles.detail}>Website: {item.website}</Text>
      <Button
        title={item.hasReacted ? 'Unlike' : 'Like'}
        onPress={onReact}
      />
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default DriverDetailsCard;