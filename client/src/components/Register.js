import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import '../styles/Login.css'; // 复用Login的样式

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  // 处理倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 发送验证码
  const handleSendCode = async () => {
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('请输入有效的电子邮箱');
      return;
    }

    try {
      setIsSendingCode(true);
      setErrorMessage('');
      
      const response = await axios.post('/api/auth/send-registration-code', { email });
      
      setSuccessMessage('验证码已发送到您的邮箱');
      setCountdown(60); // 60秒倒计时
    } catch (err) {
      setErrorMessage(err.response?.data?.message || '发送验证码失败，请稍后再试');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    if (!email || !password || !confirmPassword || !verificationCode) {
      setErrorMessage('请填写所有必填字段');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('两次输入的密码不一致');
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage('密码长度至少为6个字符');
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      // 调用注册函数，包含验证码
      await register(email, password, verificationCode);
      
      // 注册成功，重定向到首页
      navigate('/');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || '注册失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>注册账号</h2>
        
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        
        {successMessage && (
          <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">电子邮箱</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入您的电子邮箱"
              required
            />
          </div>
          
          <div className="form-group verification-code-group">
            <label htmlFor="verificationCode">验证码</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="请输入验证码"
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0 || isSendingCode}
                style={{
                  minWidth: '120px',
                  backgroundColor: countdown > 0 ? '#cccccc' : '#4a90e2',
                  cursor: countdown > 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {isSendingCode ? '发送中...' : countdown > 0 ? `重新发送(${countdown}s)` : '获取验证码'}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码（至少6个字符）"
              required
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="请再次输入密码"
              required
              minLength={6}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? '注册中...' : '注册'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>已有账号？ <Link to="/login">登录</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;