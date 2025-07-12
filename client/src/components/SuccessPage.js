import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { capsuleService } from '../services/api';
import '../styles/SuccessPage.css';

const SuccessPage = () => {
  const location = useLocation();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCapsuleDetails = async () => {
      // 从location state获取胶囊ID
      const capsuleId = location.state?.capsuleId;
      
      if (!capsuleId) {
        setError('无法找到胶囊信息');
        setLoading(false);
        return;
      }
      
      try {
        const data = await capsuleService.getCapsuleById(capsuleId);
        setCapsule(data);
        setLoading(false);
      } catch (err) {
        console.error('获取胶囊详情失败:', err);
        setError('获取胶囊详情失败');
        setLoading(false);
      }
    };
    
    fetchCapsuleDetails();
  }, [location.state]);
  
  // 格式化日期显示
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };
  
  if (loading) {
    return (
      <div className="success-page loading">
        <div className="container text-center">
          <div className="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="success-page error">
        <div className="container text-center">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2>出错了</h2>
          <p>{error}</p>
          <Link to="/" className="btn">
            返回首页
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          
          <h1>时间胶囊创建成功！</h1>
          
          <div className="capsule-details">
            <h3>胶囊详情</h3>
            
            <div className="detail-item">
              <span className="detail-label">发送给:</span>
              <span className="detail-value">{capsule.recipientName}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">主题:</span>
              <span className="detail-value">{capsule.subject}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">投递日期:</span>
              <span className="detail-value">{formatDate(capsule.deliveryDate)}</span>
            </div>
          </div>
          
          <div className="capsule-id">
            <p>您的胶囊ID: <strong>{capsule.id}</strong></p>
            <p className="small">请保存此ID，以便将来查询您的胶囊状态</p>
          </div>
          
          <div className="next-steps">
            <h3>下一步</h3>
            <p>
              您的时间胶囊已经安全保存。在指定的投递日期，我们将自动将您的消息发送给接收者。
              您无需做任何事情，只需等待投递日期的到来。
            </p>
          </div>
          
          <div className="action-buttons">
            <Link to="/" className="btn">
              返回首页
            </Link>
            <Link to="/create" className="btn btn-outline">
              创建另一个胶囊
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;