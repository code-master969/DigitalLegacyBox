const mongoose = require('mongoose');
const Capsule = require('./models/Capsule');
require('dotenv').config();

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 查询所有胶囊数据
const queryAllCapsules = async () => {
  try {
    const capsules = await Capsule.find({});
    console.log('查询到的胶囊数据:');
    console.log(JSON.stringify(capsules, null, 2));
    console.log(`总共查询到 ${capsules.length} 个胶囊`);
  } catch (error) {
    console.error('查询数据失败:', error);
  } finally {
    // 关闭数据库连接
    mongoose.connection.close();
  }
};

// 执行查询操作
queryAllCapsules();