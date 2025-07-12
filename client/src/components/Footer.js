import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="footer-title">关于时间胶囊</h3>
            <p>
              时间胶囊是一个让您能够向未来发送消息的平台。
              创建一个胶囊，填入您的思考、希望或梦想，
              我们会在您指定的日期将其发送给接收者。
            </p>
            <div className="social-links">
              <a href="https://weibo.com" target="_blank" rel="noopener noreferrer" aria-label="微博">
                <i className="fab fa-weibo"></i>
              </a>
              <a href="https://wx.qq.com" target="_blank" rel="noopener noreferrer" aria-label="微信">
                <i className="fab fa-weixin"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3 className="footer-title">快速链接</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/create">创建胶囊</Link>
              </li>
              <li>
                <Link to="/about">关于我们</Link>
              </li>
              <li>
                <Link to="/faq">常见问题</Link>
              </li>
              <li>
                <Link to="/contact">联系我们</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h3 className="footer-title">联系我们</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-envelope"></i>
                <span>contact@timecapsule.com</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+86 123 4567 8910</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>深圳市南山区科技园</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} 时间胶囊 | 保留所有权利</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">隐私政策</Link>
            <Link to="/terms">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;