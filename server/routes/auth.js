const express = require('express');
const router = express.Router();
const { 
  sendVerificationCode, 
  verifyCode, 
  generateToken, 
  registerUser, 
  verifyPassword,
  sendRegistrationCode
} = require('../utils/authUtils');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// 发送验证码
router.post('/send-code', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: '邮箱地址是必需的' });
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '邮箱格式无效' });
    }
    
    await sendVerificationCode(email);
    res.status(200).json({ message: '验证码已发送到您的邮箱' });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ message: '发送验证码失败，请稍后再试' });
  }
});

// 验证码登录
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    
    if (!email || !code) {
      return res.status(400).json({ message: '邮箱和验证码都是必需的' });
    }
    
    const result = await verifyCode(email, code);
    
    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }
    
    // 生成JWT令牌
    const token = generateToken(result.user);
    
    res.status(200).json({
      message: '登录成功',
      token,
      user: {
        id: result.user._id,
        email: result.user.email,
        name: result.user.name
      }
    });
  } catch (error) {
    console.error('验证码验证失败:', error);
    res.status(500).json({ message: '验证失败，请稍后再试' });
  }
});

// 获取当前用户信息
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-verificationCodes');
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新用户信息
router.put('/update-profile', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    if (name) {
      user.name = name;
    }
    
    await user.save();
    
    res.status(200).json({
      message: '个人资料已更新',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 发送注册验证码
router.post('/send-registration-code', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: '邮箱地址是必需的' });
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '邮箱格式无效' });
    }
    
    const result = await sendRegistrationCode(email);
    
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    
    res.status(200).json({ message: '验证码已发送到您的邮箱' });
  } catch (error) {
    console.error('发送注册验证码失败:', error);
    res.status(500).json({ message: '发送验证码失败，请稍后再试' });
  }
});

// 注册新用户（邮箱+密码+验证码）
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, code } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: '邮箱和密码都是必需的' });
    }
    
    if (!code) {
      return res.status(400).json({ message: '验证码是必需的' });
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '邮箱格式无效' });
    }
    
    // 验证密码长度
    if (password.length < 6) {
      return res.status(400).json({ message: '密码长度至少为6个字符' });
    }
    
    const result = await registerUser(email, password, name, code);
    
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    
    // 生成JWT令牌
    const token = generateToken(result.user);
    
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: result.user._id,
        email: result.user.email,
        name: result.user.name
      }
    });
  } catch (error) {
    console.error('用户注册失败:', error);
    res.status(500).json({ message: '注册失败，请稍后再试' });
  }
});

// 密码登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: '邮箱和密码都是必需的' });
    }
    
    const result = await verifyPassword(email, password);
    
    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }
    
    // 生成JWT令牌
    const token = generateToken(result.user);
    
    res.status(200).json({
      message: '登录成功',
      token,
      user: {
        id: result.user._id,
        email: result.user.email,
        name: result.user.name
      }
    });
  } catch (error) {
    console.error('密码登录失败:', error);
    res.status(500).json({ message: '登录失败，请稍后再试' });
  }
});

module.exports = router;