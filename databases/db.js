import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'notes_database.db', location: 'default' });

const executeQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            sql,
            params,
            (tx, result) => resolve(result),
            (tx, error) => reject(error)
        );
    });
});

const createTable = async () => {
    await executeQuery(
        `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT);`
    );
};

const addNote = async (title, description) => {
    try {
        await executeQuery(
            `INSERT INTO notes (title, description) VALUES (?, ?)`,
            [title, description]
        );
        console.log('Catatan berhasil ditambahkan');
    } catch (error) {
        console.error('Error menambahkan catatan:', error);
    }
};

const getNotes = async () => {
    try {
        const result = await executeQuery(`SELECT * FROM notes`);
        const notes = result.rows._array;
        console.log('Catatan:', notes);
        return notes;
    } catch (error) {
        console.error('Error mengambil catatan:', error);
    }
};

const updateNote = async (id, title, description) => {
    try {
        await executeQuery(
            `UPDATE notes SET title = ?, description = ? WHERE id = ?`,
            [title, description, id]
        );
        console.log('Catatan berhasil diperbarui');
    } catch (error) {
        console.error('Error memperbarui catatan:', error);
    }
};

const deleteNote = async (id) => {
    try {
        await executeQuery(`DELETE FROM notes WHERE id = ?`, [id]);
        console.log('Catatan berhasil dihapus');
    } catch (error) {
        console.error('Error menghapus catatan:', error);
    }
};

export default {
    createTable,
    addNote,
    getNotes,
    updateNote,
    deleteNote,
};
