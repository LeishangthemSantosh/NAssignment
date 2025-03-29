const salesData = [
    { date: '2024-01-01', amount: 1000 },
    { date: '2024-01-05', amount: 1500 },
    { date: '2024-01-10', amount: 2000 },
    { date: '2024-01-15', amount: 1800 },
    { date: '2024-01-20', amount: 2200 },
    { date: '2024-02-01', amount: 2500 },
    { date: '2024-02-05', amount: 2700 },
    { date: '2024-02-10', amount: 3000 },
    { date: '2024-02-15', amount: 3100 },
    { date: '2024-02-20', amount: 3300 },
    { date: '2024-03-01', amount: 3500 },
    { date: '2024-03-05', amount: 3700 },
    { date: '2024-03-10', amount: 4000 },
    { date: '2024-03-15', amount: 4100 },
    { date: '2024-03-20', amount: 4300 },
    { date: '2024-04-01', amount: 4500 },
    { date: '2024-04-05', amount: 4700 },
    { date: '2024-04-10', amount: 5000 },
    { date: '2024-04-15', amount: 5100 },
    { date: '2024-04-20', amount: 5300 }
];

export const salesDataSeed = async (db) => {
    const insertStmt = await db.prepare("INSERT INTO sales (date, amount) VALUES (?, ?)");
    for (const sale of salesData) {
        await insertStmt.run(sale.date, sale.amount);
    }
    await insertStmt.finalize();
}