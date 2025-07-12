import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Login.css'; // 复用Login的样式

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    if (!email || !password || !confirmPassword) {
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
      
      // 调用注册函数
      await register(email, password);
      
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