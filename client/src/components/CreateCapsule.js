import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capsuleService } from '../services/api';
import '../styles/CreateCapsule.css';

const CreateCapsule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    recipientName: '',
    recipientEmail: '',
    subject: '',
    message: '',
    deliveryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.senderEmail) || !emailRegex.test(formData.recipientEmail)) {
      setError('请输入有效的电子邮件地址');
      return false;
    }

    // 验证日期是否在未来
    const selectedDate = new Date(formData.deliveryDate);
    const today = new Date();
    if (selectedDate <= today) {
      setError('投递日期必须是未来的日期');
      return false;
    }

    // 验证所有必填字段
    for (const key in formData) {
      if (formData[key].trim() === '') {
        setError('请填写所有必填字段');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await capsuleService.createCapsule(formData);
      setLoading(false);
      
      // 导航到成功页面，并传递胶囊ID
      navigate('/success', { state: { capsuleId: response.id } });
    } catch (err) {
      setLoading(false);
      setError('创建时间胶囊失败，请稍后再试');
      console.error('创建胶囊错误:', err);
    }
  };

  // 计算最小日期（明天）
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="create-capsule">
      <div className="container">
        <h1 className="text-center">创建时间胶囊</h1>
        <p className="text-center mb-4">
          填写以下表单，创建一个将在未来特定日期发送的时间胶囊。
        </p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>发送者信息</h3>
            <div className="form-group">
              <label htmlFor="senderName" className="form-label">您的姓名</label>
              <input
                type="text"
                className="form-control"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="senderEmail" className="form-label">您的电子邮件</label>
              <input
                type="email"
                className="form-control"
                id="senderEmail"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>接收者信息</h3>
            <div className="form-group">
              <label htmlFor="recipientName" className="form-label">接收者姓名</label>
              <input
                type="text"
                className="form-control"
                id="recipientName"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipientEmail" className="form-label">接收者电子邮件</label>
              <input
                type="email"
                className="form-control"
                id="recipientEmail"
                name="recipientEmail"
                value={formData.recipientEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>胶囊内容</h3>
            <div className="form-group">
              <label htmlFor="subject" className="form-label">主题</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">消息内容</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>投递设置</h3>
            <div className="form-group">
              <label htmlFor="deliveryDate" className="form-label">投递日期</label>
              <input
                type="date"
                className="form-control"
                id="deliveryDate"
                name="deliveryDate"
                min={minDate}
                value={formData.deliveryDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? '创建中...' : '创建时间胶囊'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;