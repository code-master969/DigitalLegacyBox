import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>关于时间胶囊</h1>
          <p className="about-subtitle">
            连接过去与未来，传递情感与记忆
          </p>
        </div>
        
        <div className="about-section">
          <div className="about-image">
            <img src="/images/about-story.jpg" alt="我们的故事" />
          </div>
          <div className="about-content">
            <h2>我们的故事</h2>
            <p>
              时间胶囊项目起源于2023年，由一群热爱科技与人文的开发者共同创立。
              我们相信，每个人都有值得被记住的故事和情感，而这些珍贵的记忆不应随着时间的流逝而消散。
            </p>
            <p>
              在这个数字化的时代，我们希望创造一种新的方式，让人们能够跨越时间的界限，
              将当下的思考、情感和期望传递给未来的自己或他人。这就是时间胶囊的诞生初衷。
            </p>
          </div>
        </div>
        
        <div className="about-section reverse">
          <div className="about-image">
            <img src="/images/about-mission.jpg" alt="我们的使命" />
          </div>
          <div className="about-content">
            <h2>我们的使命</h2>
            <p>
              我们的使命是创建一个安全、可靠且富有意义的平台，让用户能够向未来传递信息。
              无论是给未来的自己写一封信，为孩子留下成长的祝福，还是与朋友分享未来的约定，
              时间胶囊都致力于保存这些珍贵的时刻。
            </p>
            <p>
              我们相信，这些跨越时间的信息不仅是对过去的记录，更是对未来的期许和希望。
              通过时间胶囊，我们希望能够帮助人们建立更深层次的时间连接，感受生命的延续和意义。
            </p>
          </div>
        </div>
        
        <div className="about-section">
          <div className="about-image">
            <img src="/images/about-values.jpg" alt="我们的价值观" />
          </div>
          <div className="about-content">
            <h2>我们的价值观</h2>
            <ul className="values-list">
              <li>
                <strong>真实性</strong> - 我们鼓励用户分享真实的情感和想法，创造有意义的时间连接。
              </li>
              <li>
                <strong>隐私保护</strong> - 我们严格保护用户数据，确保每个胶囊内容的私密性和安全性。
              </li>
              <li>
                <strong>可靠性</strong> - 我们承诺按时准确地传递每一个时间胶囊，无论时间跨度多长。
              </li>
              <li>
                <strong>创新精神</strong> - 我们不断探索新技术，提升用户体验和服务质量。
              </li>
              <li>
                <strong>情感连接</strong> - 我们相信科技应该增强人与人之间的情感连接，而非替代它。
              </li>
            </ul>
          </div>
        </div>
        
        <div className="team-section">
          <h2 className="text-center">我们的团队</h2>
          <p className="team-intro text-center">
            时间胶囊由一群充满激情的专业人士组成，他们在技术、设计和用户体验方面拥有丰富的经验。
          </p>
          
          <div className="team-members">
            <div className="team-member">
              <div className="member-avatar">
                <img src="/images/team-member1.jpg" alt="团队成员" />
              </div>
              <h3>张明</h3>
              <p className="member-role">创始人 & CEO</p>
              <p className="member-bio">
                拥有10年互联网产品开发经验，热衷于探索科技与人文的结合点。
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <img src="/images/team-member2.jpg" alt="团队成员" />
              </div>
              <h3>李华</h3>
              <p className="member-role">技术总监</p>
              <p className="member-bio">
                全栈开发者，专注于构建安全、可靠的网络应用和数据存储系统。
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <img src="/images/team-member3.jpg" alt="团队成员" />
              </div>
              <h3>王芳</h3>
              <p className="member-role">设计师</p>
              <p className="member-bio">
                拥有丰富的用户界面和用户体验设计经验，致力于创造简洁而有意义的交互体验。
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <img src="/images/team-member4.jpg" alt="团队成员" />
              </div>
              <h3>刘强</h3>
              <p className="member-role">市场总监</p>
              <p className="member-bio">
                营销专家，擅长品牌建设和用户增长策略，热衷于将有意义的产品推广给更多人。
              </p>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <h2>加入我们的时间之旅</h2>
          <p>
            无论是给未来的自己写一封信，还是为重要的人留下珍贵的回忆，
            时间胶囊都能帮助你跨越时间的界限，传递最真挚的情感。
          </p>
          <Link to="/create" className="btn">立即创建胶囊</Link>
        </div>
      </div>
    </div>
  );
};

export default About;