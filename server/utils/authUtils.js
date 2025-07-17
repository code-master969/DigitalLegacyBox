const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mailer = require('./mailer');

// 生成6位数字验证码
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 发送验证码邮件
const sendVerificationCode = async (email) => {
  try {
    // 生成验证码
    const verificationCode = generateVerificationCode();
    
    // 保存验证码到用户记录
    let user = await User.findOne({ email });
    
    if (!user) {
      // 如果用户不存在，创建新用户
      user = new User({ email });
    }
    
    // 添加新验证码
    user.verificationCodes.push({ code: verificationCode });
    await user.save();
    
    // 发送验证码邮件
    const subject = '时间胶囊 - 登录验证码';
    const text = `您的登录验证码是: ${verificationCode}，10分钟内有效。`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a4a4a;">时间胶囊 - 登录验证码</h2>
        <p>您好，</p>
        <p>您的登录验证码是: <strong style="font-size: 18px; color: #007bff;">${verificationCode}</strong></p>
        <p>此验证码将在10分钟内有效。</p>
        <p>如果您没有请求此验证码，请忽略此邮件。</p>
        <p>谢谢！</p>
        <p>- 时间胶囊团队</p>
      </div>
    `;
    
    await mailer.sendMail(email, subject, text, html);
    return true;
  } catch (error) {
    console.error('发送验证码失败:', error);
    throw error;
  }
};

// 验证验证码
const verifyCode = async (email, code) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return { valid: false, message: '用户不存在' };
    }
    
    // 查找匹配的验证码
    const validCode = user.verificationCodes.find(vc => vc.code === code);
    
    if (!validCode) {
      return { valid: false, message: '验证码无效' };
    }
    
    // 验证成功，清除所有验证码
    user.verificationCodes = [];
    user.lastLogin = Date.now();
    await user.save();
    
    return { valid: true, user };
  } catch (error) {
    console.error('验证码验证失败:', error);
    throw error;
  }
};

// 生成JWT令牌
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d' // 令牌7天有效
  });
};

// 验证JWT令牌
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};

// 发送注册验证码邮件
const sendRegistrationCode = async (email) => {
  try {
    // 生成验证码
    const verificationCode = generateVerificationCode();
    
    // 保存验证码到用户记录
    let user = await User.findOne({ email });
    
    if (user && user.isVerified) {
      return { success: false, message: '该邮箱已被注册' };
    }
    
    if (!user) {
      // 如果用户不存在，创建新临时用户
      user = new User({ 
        email,
        isVerified: false // 标记为未验证
      });
    }
    
    // 添加新验证码
    user.verificationCodes.push({ code: verificationCode });
    await user.save();
    
    // 发送验证码邮件
    const subject = '时间胶囊 - 注册验证码';
    const text = `您的注册验证码是: ${verificationCode}，10分钟内有效。`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a4a4a;">时间胶囊 - 注册验证码</h2>
        <p>您好，</p>
        <p>您的注册验证码是: <strong style="font-size: 18px; color: #007bff;">${verificationCode}</strong></p>
        <p>此验证码将在10分钟内有效。</p>
        <p>如果您没有请求此验证码，请忽略此邮件。</p>
        <p>谢谢！</p>
        <p>- 时间胶囊团队</p>
      </div>
    `;
    
    await mailer.sendMail(email, subject, text, html);
    return { success: true };
  } catch (error) {
    console.error('发送注册验证码失败:', error);
    throw error;
  }
};

// 注册新用户（使用邮箱和密码）
const registerUser = async (email, password, name, code) => {
  try {
    // 检查用户是否已存在
    let user = await User.findOne({ email });
    
    if (!user) {
      return { success: false, message: '请先获取验证码' };
    }
    
    if (user.isVerified) {
      return { success: false, message: '该邮箱已被注册' };
    }
    
    // 验证验证码
    const validCode = user.verificationCodes.find(vc => vc.code === code);
    
    if (!validCode) {
      return { success: false, message: '验证码无效' };
    }
    
    // 验证成功，清除所有验证码
    user.verificationCodes = [];
    user.password = password;
    user.name = name || email.split('@')[0]; // 如果没有提供名称，使用邮箱前缀作为默认名称
    user.isVerified = true; // 标记为已验证
    user.lastLogin = Date.now();
    
    await user.save();
    
    return { success: true, user };
  } catch (error) {
    console.error('用户注册失败:', error);
    throw error;
  }
};

// 验证用户密码
const verifyPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return { valid: false, message: '用户不存在' };
    }
    
    // 如果用户没有设置密码
    if (!user.password) {
      return { valid: false, message: '此账户未设置密码，请使用验证码登录' };
    }
    
    // 验证密码
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return { valid: false, message: '密码错误' };
    }
    
    // 更新最后登录时间
    user.lastLogin = Date.now();
    await user.save();
    
    return { valid: true, user };
  } catch (error) {
    console.error('密码验证失败:', error);
    throw error;
  }
};

module.exports = {
  generateVerificationCode,
  sendVerificationCode,
  verifyCode,
  generateToken,
  verifyToken,
  registerUser,
  verifyPassword,
  sendRegistrationCode
};