const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const capsuleRoutes = require('./routes/capsules');
const authRoutes = require('./routes/auth');
const scheduler = require('./utils/scheduler');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/timeCapsule')
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 注册路由
app.use('/api/capsules', capsuleRoutes);
app.use('/api/auth', authRoutes);

// 启动定时任务
scheduler.startScheduler();

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});