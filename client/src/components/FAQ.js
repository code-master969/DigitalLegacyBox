import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FAQ.css';

const FAQ = () => {
  // FAQ数据
  const faqData = [
    {
      id: 1,
      question: "什么是时间胶囊？",
      answer: "时间胶囊是一个数字平台，允许您创建包含文字、图片等内容的消息，并设定在未来的特定日期发送给指定的收件人（包括您自己）。这就像是给未来写一封信，或者为重要的人留下一份惊喜。"
    },
    {
      id: 2,
      question: "如何创建时间胶囊？",
      answer: "创建时间胶囊非常简单！点击网站上的\"创建胶囊\"按钮，填写表单，包括收件人的电子邮件地址、发送日期、主题和内容。您还可以上传图片或其他附件。完成后，点击\"封存胶囊\"按钮即可。"
    },
    {
      id: 3,
      question: "我可以在什么时候接收到时间胶囊？",
      answer: "您可以选择任何未来的日期作为胶囊的发送时间，从明天到数年后都可以。我们的系统会在您指定的确切日期和时间发送胶囊内容。"
    },
    {
      id: 4,
      question: "创建时间胶囊需要付费吗？",
      answer: "基本的时间胶囊服务是完全免费的。我们也提供高级功能，如更大的附件存储空间、视频内容支持等，这些功能需要付费订阅。详情请查看我们的价格页面。"
    },
    {
      id: 5,
      question: "我的时间胶囊内容安全吗？",
      answer: "是的，您的胶囊内容完全安全。我们使用高级加密技术保护所有数据，确保只有指定的收件人在指定的时间才能查看内容。我们的隐私政策确保您的个人信息和胶囊内容不会被未授权访问或用于其他目的。"
    },
    {
      id: 6,
      question: "我可以编辑或删除已创建的时间胶囊吗？",
      answer: "是的，在胶囊发送之前，您可以随时登录您的账户编辑或删除已创建的胶囊。一旦胶囊被发送，出于数据完整性和服务承诺的考虑，将无法再进行修改或删除。"
    },
    {
      id: 7,
      question: "如果收件人的电子邮件地址在未来发生变化怎么办？",
      answer: "我们建议您使用收件人长期使用的主要电子邮件地址。如果您担心地址可能会变化，可以考虑使用多个联系方式，或者选择发送给自己，然后在收到后手动转发。您也可以在发送日期临近时登录并更新收件人信息。"
    },
    {
      id: 8,
      question: "我可以在时间胶囊中包含哪些类型的内容？",
      answer: "您可以在胶囊中包含文字消息、照片、文档等。基本账户有附件大小限制，高级账户可以包含更大的文件和视频内容。请注意，我们禁止包含任何违法、有害或侵犯他人权利的内容。"
    },
    {
      id: 9,
      question: "如果我忘记了我的账户密码怎么办？",
      answer: "如果您忘记了密码，可以在登录页面点击\"忘记密码\"链接。我们会向您的注册邮箱发送重置密码的链接。为了保护您的账户安全，请使用强密码并定期更新。"
    },
    {
      id: 10,
      question: "如果网站在我的胶囊发送日期之前关闭了怎么办？",
      answer: "我们理解这种担忧。我们承诺长期运营，并已建立了数据保护机制，即使在极端情况下也能确保胶囊的发送。此外，我们定期进行数据备份，并有应急计划确保服务的连续性。"
    }
  ];

  // 状态管理：跟踪哪个FAQ项目是展开的
  const [activeIndex, setActiveIndex] = useState(null);

  // 切换FAQ项目的展开/折叠状态
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <div className="faq-header">
          <h1>常见问题</h1>
          <p className="faq-subtitle">
            了解关于时间胶囊服务的常见问题和解答
          </p>
        </div>
        
        <div className="faq-search">
          <input 
            type="text" 
            placeholder="搜索问题..." 
            className="search-input"
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        <div className="faq-categories">
          <button className="category-button active">所有问题</button>
          <button className="category-button">使用指南</button>
          <button className="category-button">账户问题</button>
          <button className="category-button">隐私安全</button>
          <button className="category-button">技术支持</button>
        </div>
        
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? 
                    <i className="fas fa-minus"></i> : 
                    <i className="fas fa-plus"></i>
                  }
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-contact">
          <h2>还有其他问题？</h2>
          <p>
            如果您没有找到您需要的答案，请随时联系我们的客服团队。
            我们很乐意为您提供帮助！
          </p>
          <div className="faq-actions">
            <Link to="/contact" className="btn">联系我们</Link>
            <a href="mailto:support@timecapsule.com" className="btn btn-outline">
              发送邮件
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;