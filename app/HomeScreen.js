import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const data = await getNotes();
        setNotes(data);
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.created_at.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderNote = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { note: item })}>
            <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteContent}>{item.description}</Text>
                <Text style={styles.noteDate}>{new Date(item.created_at).toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notely</Text>
                <Ionicons
                    name="search-outline"
                    size={24}
                    color="#000"
                    onPress={() => navigation.navigate('SearchScreen')}
                />
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title or date"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredNotes}
                renderItem={renderNote}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.notesList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    searchInput: { padding: 8, margin: 16, borderRadius: 8, backgroundColor: '#eee' },
    notesList: { paddingHorizontal: 8 },
    noteCard: { padding: 16, margin: 8, borderRadius: 8, backgroundColor: '#FFF', elevation: 1 },
    noteTitle: { fontSize: 16, fontWeight: 'bold' },
    noteContent: { fontSize: 14, color: '#555' },
    noteDate: { fontSize: 12, color: '#888', marginTop: 4 },
});

export default HomeScreen;
