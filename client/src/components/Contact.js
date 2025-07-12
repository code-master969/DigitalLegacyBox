import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // 表单提交状态
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // 表单验证状态
  const [formErrors, setFormErrors] = useState({});
  
  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 清除该字段的错误
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // 验证表单
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = '请输入您的姓名';
    }
    
    if (!formData.email.trim()) {
      errors.email = '请输入您的电子邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '请输入有效的电子邮箱地址';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = '请输入主题';
    }
    
    if (!formData.message.trim()) {
      errors.message = '请输入您的留言';
    } else if (formData.message.trim().length < 10) {
      errors.message = '留言内容至少需要10个字符';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // 模拟表单提交
    setFormStatus({
      submitted: true,
      success: false,
      message: '正在提交您的留言...'
    });
    
    // 模拟API调用
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: '感谢您的留言！我们会尽快回复您。'
      });
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>联系我们</h1>
          <p className="contact-subtitle">
            有任何问题或建议？请随时与我们联系，我们很乐意听取您的意见！
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>地址</h3>
              <p>深圳市南山区科技园</p>
              <p>高新南七道数字大厦8楼</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>电话</h3>
              <p>+86 123 4567 8910</p>
              <p>周一至周五: 9:00 - 18:00</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>电子邮箱</h3>
              <p>contact@timecapsule.com</p>
              <p>support@timecapsule.com</p>
            </div>
            
            <div className="social-links">
              <h3>关注我们</h3>
              <div className="social-icons">
                <a href="https://weibo.com" target="_blank" rel="noopener noreferrer" aria-label="微博">
                  <i className="fab fa-weibo"></i>
                </a>
                <a href="https://wx.qq.com" target="_blank" rel="noopener noreferrer" aria-label="微信">
                  <i className="fab fa-weixin"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2>发送留言</h2>
            
            {formStatus.submitted && formStatus.success ? (
              <div className="form-success">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>提交成功！</h3>
                <p>{formStatus.message}</p>
                <button 
                  className="btn"
                  onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                >
                  发送新留言
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {formStatus.submitted && (
                  <div className="form-loading">
                    <div className="spinner"></div>
                    <p>{formStatus.message}</p>
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">电子邮箱</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">主题</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={formErrors.subject ? 'error' : ''}
                  />
                  {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">留言</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={formErrors.message ? 'error' : ''}
                  ></textarea>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>
                
                <button type="submit" className="btn submit-btn">
                  发送留言
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="map-container">
          <h2>我们的位置</h2>
          <div className="map">
            {/* 这里可以集成地图API，如高德地图或百度地图 */}
            <div className="map-placeholder">
              <img src="/images/map-placeholder.jpg" alt="公司地图位置" />
              <div className="map-overlay">
                <p>地图加载中...</p>
                <p>点击加载交互式地图</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;