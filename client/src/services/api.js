import axios from 'axios';

// 创建 axios 实例
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 可以在这里添加认证令牌等
api.interceptors.request.use(
  (config) => {
    // 从本地存储获取令牌（如果有的话）
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理常见错误
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 处理错误响应
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('API Error:', error.response.data);
      
      // 如果是认证错误，可以在这里处理登出逻辑
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // 可以在这里添加重定向到登录页面的逻辑
      }
      
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request);
      return Promise.reject({ message: '服务器无响应，请稍后再试' });
    } else {
      // 请求设置时发生错误
      console.error('Request error:', error.message);
      return Promise.reject({ message: '请求错误，请稍后再试' });
    }
  }
);

// 胶囊相关 API 服务
export const capsuleService = {
  // 创建新的时间胶囊
  createCapsule: async (capsuleData) => {
    // 转换字段名以匹配后端API
    const transformedData = {
      title: capsuleData.subject,
      content: capsuleData.message,
      openDate: capsuleData.deliveryDate,
      senderName: capsuleData.senderName,
      senderEmail: capsuleData.senderEmail,
      recipientName: capsuleData.recipientName,
      recipientEmail: capsuleData.recipientEmail
    };
    
    // 使用临时配置覆盖默认的x-auth-token头
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    };
    
    return await api.post('/capsules', transformedData, config);
  },
  
  // 根据 ID 获取胶囊详情
  getCapsuleById: async (id) => {
    return await api.get(`/capsules/${id}`);
  },
  
  // 验证胶囊访问码
  verifyCapsuleAccess: async (id, accessCode) => {
    return await api.post(`/capsules/${id}/verify`, { accessCode });
  },
  
  // 获取用户创建的所有胶囊（需要认证）
  getUserCapsules: async () => {
    return await api.get('/capsules/user');
  },
  
  // 更新胶囊信息（需要认证）
  updateCapsule: async (id, updateData) => {
    return await api.put(`/capsules/${id}`, updateData);
  },
  
  // 删除胶囊（需要认证）
  deleteCapsule: async (id) => {
    return await api.delete(`/capsules/${id}`);
  }
};

// 用户认证相关 API 服务
export const authService = {
  // 用户注册
  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },
  
  // 用户登录
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },
  
  // 用户登出
  logout: () => {
    localStorage.removeItem('token');
  },
  
  // 获取当前用户信息
  getCurrentUser: async () => {
    return await api.get('/auth/me');
  },
  
  // 检查用户是否已登录
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};

export default api;