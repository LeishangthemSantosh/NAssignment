// AI-powered query processing simulation
export const processQuery = (naturalQuery) => {
    const lowerQuery = naturalQuery.toLowerCase();
    if (lowerQuery.includes('total sales')) {
        return { sql: "SELECT SUM(amount) AS total_sales FROM sales_data;" };
    } else if (lowerQuery.includes('active users')) {
        return { sql: "SELECT COUNT(*) AS active_users FROM users WHERE active = 1;" };
    }
    return { sql: "SELECT * FROM sales_data;" };
};