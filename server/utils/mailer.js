const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// 格式化日期为易读格式
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 发送确认邮件给胶囊创建者
const sendConfirmationEmail = async (email, name, capsuleTitle, openDate) => {
  const mailOptions = {
    from: `"时间胶囊" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '您的时间胶囊已成功创建',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4a6ee0;">您好，${name}！</h2>
        <p>您的时间胶囊 <strong>"${capsuleTitle}"</strong> 已成功创建。</p>
        <p>它将在 <strong>${formatDate(openDate)}</strong> 被打开并发送给收件人。</p>
        <p>感谢您使用我们的时间胶囊服务！</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
          <p>此邮件由系统自动发送，请勿回复。</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`确认邮件已发送至 ${email}`);
    return true;
  } catch (error) {
    console.error('发送确认邮件失败:', error);
    return false;
  }
};

// 发送时间胶囊邮件给接收者
const deliverCapsule = async (capsule) => {
  const mailOptions = {
    from: `"时间胶囊" <${process.env.EMAIL_USER}>`,
    to: capsule.recipientEmail,
    subject: `来自过去的一封信: ${capsule.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4a6ee0;">亲爱的朋友：</h2>
        <p>您收到了一个来自 <strong>${capsule.senderName}</strong> 的时间胶囊，这是在 <strong>${formatDate(capsule.createdAt)}</strong> 创建的。</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #4a6ee0; border-radius: 5px;">
          <h3 style="margin-top: 0;">${capsule.title}</h3>
          <div style="white-space: pre-line;">${capsule.content}</div>
        </div>
        ${capsule.attachments && capsule.attachments.length > 0 ? 
          `<p>此邮件包含附件，请查收。</p>` : ''}
        <p>希望这个来自过去的信息能给您带来惊喜和回忆。</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p>来自：${capsule.senderName} (${capsule.senderEmail})</p>
        </div>
      </div>
    `,
    attachments: capsule.attachments.map(attachment => {
      return {
        path: attachment
      };
    })
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`时间胶囊已发送至 ${capsule.recipientEmail}`);
    return true;
  } catch (error) {
    console.error('发送时间胶囊失败:', error);
    return false;
  }
};

// 发送通用邮件
const sendMail = async (to, subject, text, html) => {
  const mailOptions = {
    from: `"时间胶囊" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`邮件已发送至 ${to}`);
    return true;
  } catch (error) {
    console.error('发送邮件失败:', error);
    throw error;
  }
};

module.exports = {
  sendConfirmationEmail,
  deliverCapsule,
  sendMail
};