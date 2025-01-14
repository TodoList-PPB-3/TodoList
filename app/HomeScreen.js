import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getNotes, deleteNote } from '../databases/db';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    };
    const unsubscribe = navigation.addListener('focus', fetchNotes); // Refresh data when returning to this screen
    return unsubscribe;
  }, [navigation]);

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const numColumns = 2;
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
        key={numColumns.toString()}
        data={notes}
        keyExtractor={(item) => item.id.toString()}
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
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNote(item.id)}
            >
              <Ionicons name="trash" size={20} color="#ff5c5c" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.notesContainer}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('DetailScreen')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 23, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  searchButton: { padding: 8 },
  notesContainer: { paddingBottom: 80 },
  noteCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, marginHorizontal: 8, elevation: 2, position: 'relative' },
  noteTitle: { fontSize: 16, fontWeight: 'bold' },
  noteDescription: { fontSize: 14, color: '#666' },
  addButton: { position: 'absolute', bottom: 16, right: 16, backgroundColor: '#000', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  deleteButton: { position: 'absolute', top: 8, right: 8 },
});

export default HomeScreen;