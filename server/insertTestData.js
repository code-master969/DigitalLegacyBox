const mongoose = require('mongoose');
const Capsule = require('./models/Capsule');
require('dotenv').config();

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 测试数据
const testCapsule = {
  title: "测试胶囊",
  content: "你好未来的我",
  senderName: "测试发送者",
  senderEmail: "sender@example.com",
  recipientEmail: "recipient@example.com",
  openDate: new Date("2025-12-31T00:00:00Z"),
  isDelivered: false,
  createdAt: new Date()
};

// 插入测试数据
const insertTestData = async () => {
  try {
    const capsule = new Capsule(testCapsule);
    const savedCapsule = await capsule.save();
    console.log('测试数据插入成功:', savedCapsule);
  } catch (error) {
    console.error('插入测试数据失败:', error);
  } finally {
    // 关闭数据库连接
    mongoose.connection.close();
  }
};

// 执行插入操作
insertTestData();