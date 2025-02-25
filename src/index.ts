// src/index.ts
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

// 中间件：解析 JSON 请求体
app.use(express.json());

// 路由
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.post('/data', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}!` });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
