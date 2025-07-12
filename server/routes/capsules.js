const express = require('express');
const router = express.Router();
const Capsule = require('../models/Capsule');
const mailer = require('../utils/mailer');
const authMiddleware = require('../middleware/auth');

// 获取所有时间胶囊
router.get('/', async (req, res) => {
  try {
    const capsules = await Capsule.find().sort({ createdAt: -1 });
    res.json(capsules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个时间胶囊
router.get('/:id', async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) {
      return res.status(404).json({ message: '找不到该时间胶囊' });
    }
    res.json(capsule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建新的时间胶囊
router.post('/', authMiddleware, async (req, res) => {
  const capsule = new Capsule({
    title: req.body.title,
    content: req.body.content,
    recipientEmail: req.body.recipientEmail,
    senderName: req.body.senderName,
    senderEmail: req.user.email, // 强制使用登录用户的邮箱
    openDate: new Date(req.body.openDate),
    attachments: req.body.attachments || [],
    theme: req.body.theme || 'default'
  });

  try {
    const newCapsule = await capsule.save();
    
    // 发送确认邮件给发送者
    await mailer.sendConfirmationEmail(
      capsule.senderEmail,
      capsule.senderName,
      capsule.title,
      capsule.openDate
    );
    
    res.status(201).json(newCapsule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新时间胶囊
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) {
      return res.status(404).json({ message: '找不到该时间胶囊' });
    }
    
    // 验证当前用户是否为胶囊创建者
    if (capsule.senderEmail !== req.user.email) {
      return res.status(403).json({ message: '您没有权限修改这个时间胶囊' });
    }
    
    // 只允许在未发送前修改
    if (capsule.isDelivered) {
      return res.status(400).json({ message: '已发送的时间胶囊不能修改' });
    }
    
    // 更新可修改的字段
    if (req.body.title) capsule.title = req.body.title;
    if (req.body.content) capsule.content = req.body.content;
    if (req.body.recipientEmail) capsule.recipientEmail = req.body.recipientEmail;
    if (req.body.openDate) capsule.openDate = new Date(req.body.openDate);
    if (req.body.attachments) capsule.attachments = req.body.attachments;
    if (req.body.theme) capsule.theme = req.body.theme;
    
    const updatedCapsule = await capsule.save();
    res.json(updatedCapsule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除时间胶囊
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) {
      return res.status(404).json({ message: '找不到该时间胶囊' });
    }
    
    // 验证当前用户是否为胶囊创建者
    if (capsule.senderEmail !== req.user.email) {
      return res.status(403).json({ message: '您没有权限删除这个时间胶囊' });
    }
    
    // 只允许在未发送前删除
    if (capsule.isDelivered) {
      return res.status(400).json({ message: '已发送的时间胶囊不能删除' });
    }
    
    await capsule.remove();
    res.json({ message: '时间胶囊已删除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 手动触发发送特定时间胶囊（用于测试）
router.post('/:id/deliver', async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) {
      return res.status(404).json({ message: '找不到该时间胶囊' });
    }
    
    if (capsule.isDelivered) {
      return res.status(400).json({ message: '该时间胶囊已经发送过了' });
    }
    
    // 发送时间胶囊邮件
    await mailer.deliverCapsule(capsule);
    
    // 更新发送状态
    capsule.isDelivered = true;
    await capsule.save();
    
    res.json({ message: '时间胶囊已成功发送' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;