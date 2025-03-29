import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();

app.use(bodyParser.json());

app.use('/api', routes)

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;