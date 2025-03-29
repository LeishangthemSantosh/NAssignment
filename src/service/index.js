

// Keys and Query
const queryMappings = [
    { key: 'total sales', sql: "SELECT SUM(amount) AS total_sales FROM sales;" },
    { key: 'active users', sql: "SELECT COUNT(*) AS active_users FROM users WHERE active = 1;" },
    { key: 'average sales', sql: "SELECT AVG(amount) AS average_sales FROM sales;" },
    { key: 'highest sale', sql: "SELECT MAX(amount) AS highest_sale FROM sales;" },
    { key: 'lowest sale', sql: "SELECT MIN(amount) AS lowest_sale FROM sales;" },
    { key: 'user list', sql: "SELECT * FROM users;" },
    { key: 'sales on', sql: "SELECT * FROM sales WHERE date = ?;", requiresParam: 'date' },
    { key: 'count users', sql: "SELECT COUNT(*) AS user_count FROM users;" },
    { key: 'inactive users', sql: "SELECT COUNT(*) AS inactive_users FROM users WHERE active = 0;" },
    { key: 'sales between', sql: "SELECT * FROM sales WHERE date BETWEEN ? AND ?;", requiresParam: 'date_range' },
    { key: 'sales after', sql: "SELECT * FROM sales WHERE date > ?;", requiresParam: 'date' },
    { key: 'sales before', sql: "SELECT * FROM sales WHERE date < ?;", requiresParam: 'date' }
];


// AI-powered query processing simulation
export const processQuery = (naturalQuery) => {
    const lowerQuery = naturalQuery.toLowerCase();
    const match = queryMappings.find(q => lowerQuery.includes(q.key));
    return match ? { sql: match.sql, requiresParam: match.requiresParam || null } : { sql: "SELECT * FROM sales;" };
};

export const validateQuestion = (naturalQuery) => {
    if (!naturalQuery) {
        return { valid: false, message: "Query is required" };
    }
    const lowerQuery = naturalQuery.toLowerCase();
    
    const match = queryMappings.find(q => lowerQuery.includes(q.key));

    if (match) {
        return { valid: true, message: "Query is valid and can be processed" };
    }

    return { valid: false, message: "Query does not match any known pattern" };
};