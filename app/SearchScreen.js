import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getNotes } from '../databases/db';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const data = await getNotes();
        setNotes(data);
    };

    const handleSearch = (text) => {
        setQuery(text);
        const results = notes.filter((note) =>
            note.title.toLowerCase().includes(text.toLowerCase()) ||
            note.created_at.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredNotes(results);
    };

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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search</Text>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title or date"
                value={query}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredNotes}
                renderItem={renderNote}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.notesList}
                ListEmptyComponent={<Text style={styles.emptyText}>No notes found</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    searchInput: {
        padding: 8,
        margin: 16,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    notesList: { paddingHorizontal: 8 },
    noteCard: {
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: '#FFF',
        elevation: 1,
    },
    noteTitle: { fontSize: 16, fontWeight: 'bold' },
    noteContent: { fontSize: 14, color: '#555' },
    noteDate: { fontSize: 12, color: '#888', marginTop: 4 },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});



export default SearchScreen;
