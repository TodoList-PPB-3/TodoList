import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const notes = [
    { id: '1', title: 'Title 1', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '2', title: 'Title 2', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '3', title: 'Title 3', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '4', title: 'Title 4', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '5', title: 'Title 5', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '6', title: 'Title 6', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.' },
  ];

  const numColumns = 2; // Fixed number of columns
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Header with Search Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Notely</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Notes Grid */}
      <FlatList
        key={numColumns.toString()} // Ensure FlatList re-renders if numColumns changes
        data={notes}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.noteCard, { width: (screenWidth - 48) / numColumns }]}
            onPress={() => navigation.navigate('DetailScreen', { note: item })}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.notesContainer}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPage')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 23,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 8,
  },
  notesContainer: {
    paddingBottom: 80, // Space for floating button
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteDescription: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default HomeScreen;
