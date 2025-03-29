import http from 'http'
import app from './src/app.js'
import { initDB } from './src/config/db.config.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app)

server.listen(PORT, async () => {
    await initDB()
    console.log("SERVER START AT", PORT);
})