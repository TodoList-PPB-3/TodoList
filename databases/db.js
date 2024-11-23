import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myDatabase.db');

export const initDB = () => {
    console.log("Initializing Database...");
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                age INTEGER
            );`,
            [],
            () => console.log("Table created successfully!"),
            (txObj, error) => console.error("Error creating table: ", error)
        );
    });
};


export const checkTableStructure = () => {
    console.log("Checking table structure...");

    db.transaction((tx) => {
        tx.executeSql(
            "PRAGMA table_info(users);",
            [],
            (txObj, resultSet) => {
                const columns = resultSet.rows._array;
                console.log("Columns in users table:", columns);
            },
            (txObj, error) => console.error("Error checking table structure:", error)
        );
    });
};
