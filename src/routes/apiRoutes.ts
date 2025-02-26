import express from 'express';
import { getTableData } from '@/controllers/apiController';

const router = express.Router();

router.get('/api/:table/:id', getTableData);

export default router;
