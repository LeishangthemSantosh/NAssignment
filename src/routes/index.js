
import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { getToken, postExplainHandler, postQueryHandler, postValidateHandler } from '../controllers/app.controller.js';

const router = express.Router();

router.post('/query', authenticateToken, postQueryHandler);

router.post('/explain', authenticateToken, postExplainHandler);

router.post('/validate', authenticateToken, postValidateHandler);

router.post('/token', getToken);

export default router;