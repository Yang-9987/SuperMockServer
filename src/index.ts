import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config/env';
import apiRoutes from './routes/apiRoutes';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 提供 Vue 打包后的静态文件
app.use(express.static(path.join(__dirname, '../dist')));

// API 路由
app.use(apiRoutes);

// 处理 SPA 路由（确保 Vue 路由正常工作）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
