import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 检查用户是否已登录
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // 从localStorage获取token
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // 设置axios默认headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // 验证token
          const res = await axios.get('/api/auth/verify');
          setCurrentUser(res.data);
        }
      } catch (err) {
        // 如果token无效，清除localStorage
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        console.error('验证token失败:', err);
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // 登录函数
  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', { email, password });
      
      // 保存token到localStorage
      localStorage.setItem('authToken', res.data.token);
      
      // 设置axios默认headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // 设置当前用户
      setCurrentUser(res.data.user);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || '登录失败，请检查您的凭据');
      throw err;
    }
  };

  // 注册函数
  const register = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/register', { email, password });
      
      // 保存token到localStorage
      localStorage.setItem('authToken', res.data.token);
      
      // 设置axios默认headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // 设置当前用户
      setCurrentUser(res.data.user);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || '注册失败，请稍后再试');
      throw err;
    }
  };

  // 登出函数
  const logout = () => {
    // 清除localStorage中的token
    localStorage.removeItem('authToken');
    
    // 清除axios默认headers
    delete axios.defaults.headers.common['Authorization'];
    
    // 清除当前用户
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;