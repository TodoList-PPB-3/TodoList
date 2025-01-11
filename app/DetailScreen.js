import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { note } = route.params || {};

    const [title, setTitle] = useState(note?.title || '');
    const [description, setDescription] = useState(note?.description || '');

    const handleSave = async () => {
        if (note) {
            await updateNote(note.id, title, description);
        } else {
            await createNote(title, description);
        }
        navigation.goBack();
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
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    input: { padding: 8, borderBottomWidth: 1, marginBottom: 16 },
    textArea: { height: 100, textAlignVertical: 'top' },
});

export default DetailScreen;
