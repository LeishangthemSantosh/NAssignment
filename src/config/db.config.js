import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { salesDataSeed } from '../utils/db.seed.js';

const DB_FILE = './database.sqlite';

export const dbPromise = open({
    filename: DB_FILE,
    driver: sqlite3.Database
});

// Initialize SQLite
export const initDB = async () => {
    
    const db = await dbPromise;
    
    // Check if table exist
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('sales', 'users');");
    const tableNames = tables.map(t => t.name);
    
    if (!tableNames.includes('sales')) {
        await db.exec(`
            CREATE TABLE sales (id INTEGER PRIMARY KEY, date TEXT, amount INTEGER);
        `);
        await salesDataSeed(db)
    }
    
    if (!tableNames.includes('users')) {
        await db.exec(`
            CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, active BOOLEAN);
            INSERT INTO users (name, email, active) VALUES ('Admin', 'naocha@gmail.com', 1), ('Bob', 'bob@gmail.com', 0);
        `);
    }
    return db;
};