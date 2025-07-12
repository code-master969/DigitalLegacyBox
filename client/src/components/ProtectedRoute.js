import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  // 如果正在加载，显示加载中
  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  // 如果用户未登录，重定向到登录页面
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // 如果用户已登录，显示子组件
  return children;
};

export default ProtectedRoute;