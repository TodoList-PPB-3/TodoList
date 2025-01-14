import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addNote, updateNote } from '../databases/db';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { note } = route.params || {};

  const [title, setTitle] = useState(note?.title || '');
  const [description, setDescription] = useState(note?.description || '');

  const handleSave = async () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Title cannot be empty!');
      return;
    }

    try {
      if (note) {
        // Edit existing note
        await updateNote(note.id, { title, description });
      } else {
        // Create new note
        const newNote = {
          id: Date.now(), // Generate unique ID based on timestamp
          title,
          description,
          dateCreated: new Date().toISOString(),
        };
        await addNote(newNote);
      }
      navigation.goBack(); // Navigate back to HomeScreen
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save the note. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
        <Ionicons name="checkmark-outline" size={24} onPress={handleSave} />
      </View>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor="#aaa"
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  input: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
});

export default DetailScreen;
