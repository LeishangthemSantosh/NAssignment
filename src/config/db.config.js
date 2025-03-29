import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DB_FILE = '../../database.sqlite';

// Initialize SQLite
export const initDB = async () => {
    const db = await open({
        filename: DB_FILE,
        driver: sqlite3.Database
    });
    
    // Check if table exist
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('sales_data', 'users');");
    const tableNames = tables.map(t => t.name);
    
    if (!tableNames.includes('sales_data')) {
        await db.exec(`
            CREATE TABLE sales_data (id INTEGER PRIMARY KEY, date TEXT, amount INTEGER);
            INSERT INTO sales_data (date, amount) VALUES ('2024-01-01', 1000), ('2024-02-01', 2000);
        `);
    }
    
    if (!tableNames.includes('users')) {
        await db.exec(`
            CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, active BOOLEAN);
            INSERT INTO users (name, email, active) VALUES ('Alice', 'naocha@gmail.com', 1), ('Bob', 'tomba@gmail.com', 0);
        `);
    }
    return db;
};