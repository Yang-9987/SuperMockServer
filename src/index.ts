// src/index.ts
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import path from "node:path";
dotenv.config();

const port = 3000;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的 URL
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);

// 获取当前文件的目录路径
const __dirname = dirname(__filename);

console.log(__dirname);

// 提供 Vue 打包后的静态文件
app.use(express.static(path.join(__dirname, '../dist')));

// API 路由
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// 处理 SPA 路由（确保 Vue 路由正常工作）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
