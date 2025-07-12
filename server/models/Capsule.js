const mongoose = require('mongoose');

const CapsuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  recipientEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '请提供有效的邮箱地址']
  },
  senderName: {
    type: String,
    required: true,
    trim: true
  },
  senderEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '请提供有效的邮箱地址']
  },
  openDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  attachments: [{
    type: String,  // 存储文件路径或URL
    trim: true
  }],
  theme: {
    type: String,
    default: 'default',
    enum: ['default', 'birthday', 'anniversary', 'graduation', 'custom']
  }
});

module.exports = mongoose.model('Capsule', CapsuleSchema);