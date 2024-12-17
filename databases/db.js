import * as SQLite from 'expo-sqlite';

// Membuka database secara asynchronous


// Fungsi untuk menginisialisasi database
const initDB = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('db_notelist');

        // Eksekusi PRAGMA dan pembuatan tabel
        await db.execAsync([
            {
                sql: `PRAGMA journal_mode = WAL;`,
                args: [],
            },
            {
                sql: `
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL UNIQUE,
            created_at DATE DEFAULT (datetime('now'))
          );
          `,
                args: [],
            },
        ]);

        console.log("Database berhasil diinisialisasi.");
        return db;
    } catch (error) {
        console.error("Error saat inisialisasi database: ", error.message);
        throw error;
    }
};

const checkTableStructure = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('db_notelist');
        const result = await db.execAsync([
            {
                sql: `SELECT name FROM sqlite_master WHERE type='table' AND name='users';`,
                args: [],
            },
        ]);

        if (result[0]?.rows?.length > 0) {
            console.log("Table 'users' sudah ada.");
        } else {
            console.log("Table 'users' tidak ditemukan. Membuat tabel...");
            await initDB(); // Jika tabel tidak ada, buat tabel
        }
    } catch (error) {
        console.error("Error saat memeriksa struktur tabel: ", error.message);
        throw error;
    }
};

export { initDB, checkTableStructure };