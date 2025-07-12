const { verifyToken } = require('../utils/authUtils');

// 验证JWT令牌的中间件
const authMiddleware = (req, res, next) => {
  // 从请求头获取令牌
  const token = req.header('x-auth-token');
  
  // 检查是否有令牌
  if (!token) {
    return res.status(401).json({ message: '无访问权限，未提供令牌' });
  }
  
  try {
    // 验证令牌
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: '令牌无效' });
    }
    
    // 将用户信息添加到请求对象
    req.user = decoded;
    next();
  } catch (error) {
    console.error('令牌验证失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = authMiddleware;