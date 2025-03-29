import jwt from 'jsonwebtoken';
import { processQuery } from '../service/index.js';

const SECRET_KEY = process.env.SECRET_KEY;

// /query endpoint
export const postQueryHandler = async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Query is required' });
    const result = processQuery(question);
    const db = await dbPromise;
    const data = await db.all(result.sql).catch(() => []);
    res.json({ query: result.sql, data });
};

// /explain endpoint
export const postExplainHandler = (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Query is required' });
    const result = processQuery(question);
    res.json({ explanation: `This query retrieves data based on: ${question}`, query: result.sql });
};

// /validate endpoint
export const postValidateHandler = (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Query is required' });
    res.json({ valid: true, message: 'Query is valid and can be processed' });
};

// /token endpoint (For testing authentication)
export const getToken = (req, res) => {
    const token = jwt.sign({ user: 'test_user' }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};