import React, { useContext, useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { DriverContext } from '../context/DriverContext';
import DriverDetailsCard from '../components/DriverDetailsCard';

const CardScreen = ({ route }) => {
  const { username } = route.params; // username from navigation
  const { drivers, isLoading, totalReacts, toggleReact } = useContext(DriverContext);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Filter drivers based on search query
  const filteredDrivers = useMemo(() => {
    if (!searchQuery.trim()) return drivers;
    return drivers.filter((driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [drivers, searchQuery]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3399FF" />
        <Text>Loading drivers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with greeting */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Hi, {username}</Text>
        <Text style={styles.totalReactsText}>Total Reacts: {totalReacts}</Text>
      </View>

      {/* Search Box */}
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search for drivers"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update state on text input
        />
      </View>

      {/* Display filtered drivers */}
      {filteredDrivers.length === 0 ? (
        <Text>No drivers found matching your search.</Text>
      ) : (
        <FlatList
          data={filteredDrivers}
          renderItem={({ item, index }) => (
            <DriverDetailsCard
              item={item}
              onReact={() => toggleReact(index)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#3399FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalReactsText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    marginBottom: 15,
    marginHorizontal: 10,
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});

export default CardScreen;
