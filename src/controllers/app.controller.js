import jwt from 'jsonwebtoken';
import { processQuery, validateQuestion } from '../service/index.js';
import { dbPromise } from '../config/db.config.js';
import { extractDates } from '../utils/keysExtraction.helper.js';

const SECRET_KEY = process.env.SECRET_KEY;

// query endpoint
export const postQueryHandler = async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Query is required' });
    const result = processQuery(question);
    const db = await dbPromise;

    let data;
    if (result.requiresParam === 'date_range') {
        let dates = extractDates(question);

        if (!dates) return res.status(400).json({ error: "Invalid or missing date range." });

        data = await db.all(result.sql, [dates.startDate, dates.endDate]);
    } else if (result.requiresParam === 'date') {
        const date = extractDates(question);
        console.log(date);
        

        if(!date) return res.status(400).json({ error: "Invalid or missing date." });

        data = await db.all(result.sql, [date.date]);
    } else if (result.requiresParam) {
        console.log(asds);
        return res.status(400).json({ error: `Missing required parameter: ${result.requiresParam}` });
    } else {
        console.log("asds");
        data = await db.all(result.sql);
    }
    // const data = await db.all(result.sql).catch(() => []);
    return res.json({ query: result.sql, data });
};

// explain endpoint
export const postExplainHandler = (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Query is required' });
    const result = processQuery(question);
    return res.json({ explanation: `This query retrieves data based on: ${question}`, query: result.sql });
};

// validate endpoint
export const postValidateHandler = (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Query is required' });
    const result = validateQuestion(question);
    return res.json(result)
};

// token endpoint (For testing authentication)
export const getToken = async (req, res) => {
    const {userName, email} = req.body
    const db = await getDB();

    // Check if user exists in the database
    const user = await db.get('SELECT * FROM users WHERE name = ? AND email = ?', [userName, email]);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or email' });
    }

    const token = jwt.sign({ userName, email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};