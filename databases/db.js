import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('db_notelist');

export const createNote = (title, description) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO users (title, description, created_at) VALUES (?, ?, datetime('now'))`,
                [title, description],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

export const updateNote = (id, title, description) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE users SET title = ?, description = ?, created_at = datetime('now') WHERE id = ?`,
                [title, description, id],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

export const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM users WHERE id = ?`,
                [id],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

export const getNotes = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM users ORDER BY created_at DESC`,
                [],
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error)
            );
        });
    });
};
