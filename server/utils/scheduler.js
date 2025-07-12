const cron = require('node-cron');
const Capsule = require('../models/Capsule');
const mailer = require('./mailer');

// 启动定时任务调度器
const startScheduler = () => {
  // 每小时检查一次是否有需要发送的时间胶囊
  // 格式: 秒 分 时 日 月 星期
  cron.schedule('0 0 * * * *', async () => {
    console.log('执行定时检查时间胶囊任务...');
    await checkAndDeliverCapsules();
  });

  console.log('时间胶囊调度器已启动');
};

// 检查并发送到期的时间胶囊
const checkAndDeliverCapsules = async () => {
  try {
    // 查找所有到期但尚未发送的时间胶囊
    const now = new Date();
    const capsulesToDeliver = await Capsule.find({
      openDate: { $lte: now },
      isDelivered: false
    });

    console.log(`找到 ${capsulesToDeliver.length} 个需要发送的时间胶囊`);

    // 逐个发送时间胶囊
    for (const capsule of capsulesToDeliver) {
      try {
        // 发送时间胶囊
        const success = await mailer.deliverCapsule(capsule);
        
        if (success) {
          // 更新发送状态
          capsule.isDelivered = true;
          await capsule.save();
          console.log(`成功发送时间胶囊 ID: ${capsule._id}`);
        } else {
          console.error(`发送时间胶囊失败 ID: ${capsule._id}`);
        }
      } catch (error) {
        console.error(`处理时间胶囊时出错 ID: ${capsule._id}`, error);
      }
    }
  } catch (error) {
    console.error('检查和发送时间胶囊时出错:', error);
  }
};

// 手动触发检查（用于测试）
const manualCheck = async () => {
  console.log('手动触发时间胶囊检查...');
  await checkAndDeliverCapsules();
};

module.exports = {
  startScheduler,
  manualCheck
};