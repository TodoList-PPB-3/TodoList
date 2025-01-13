import AsyncStorage from '@react-native-async-storage/async-storage';

const saveNotes = async (notes) => {
    try {
        await AsyncStorage.setItem('NOTES', JSON.stringify(notes));
    } catch (e) {
        console.error('Failed to save notes', e);
    }
};

const getNotes = async () => {
    try {
        const notes = await AsyncStorage.getItem('NOTES');
        return notes ? JSON.parse(notes) : [];
    } catch (e) {
        console.error('Failed to load notes', e);
        return [];
    }
};

const addNote = async (note) => {
    const notes = await getNotes();
    notes.push(note);
    await saveNotes(notes);
};

const updateNote = async (id, updatedNote) => {
    const notes = await getNotes();
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        notes[index] = { ...notes[index], ...updatedNote };
        await saveNotes(notes);
    }
};

const deleteNote = async (id) => {
    const notes = await getNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    await saveNotes(filteredNotes);
};


const searchNotes = async (query) => {
    const notes = await getNotes();
    return notes.filter(note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase()) ||
        new Date(note.dateCreated).toLocaleDateString().includes(query)
    );
};
