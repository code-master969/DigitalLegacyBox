import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>向未来发送一条消息</h1>
          <p className="hero-description">
            创建一个时间胶囊，在未来的某一天将您的思想、感受和回忆传递给您所爱的人。
          </p>
          <Link to="/create" className="btn btn-hero">
            创建时间胶囊
          </Link>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">如何使用</h2>
        <div className="feature-container">
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-pencil-alt"></i>
            </div>
            <h3>1. 撰写消息</h3>
            <p>
              写下您想在未来某一天分享的消息、照片或视频。
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>2. 设置日期</h3>
            <p>
              选择您希望接收者收到这个时间胶囊的未来日期。
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-envelope-open-text"></i>
            </div>
            <h3>3. 等待投递</h3>
            <p>
              当指定的日期到来时，我们会自动将您的消息发送给接收者。
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>准备好创建您的时间胶囊了吗？</h2>
        <p>
          无论是给未来的自己写一封信，还是为特殊场合准备一个惊喜，时间胶囊都能帮助您跨越时间传递情感。
        </p>
        <Link to="/create" className="btn">
          立即开始
        </Link>
      </section>
    </div>
  );
};

export default Home;