const MessageHandler = require('./message-handler');

/**
 * Email 訊息處理器
 */
class EmailHandler extends MessageHandler {
  get type() {
    return 'email';
  }

  /**
   * 處理 Email 訊息
   * @param {Object} payload
   * @param {string} payload.to - 收件者
   * @param {string} payload.subject - 主旨
   * @param {string} payload.body - 內容
   * @returns {Promise<Object>}
   */
  async handle(payload) {
    const { to, subject, body } = payload;

    // 驗證必要欄位
    if (!to || !subject || !body) {
      const error = new Error('Email payload must include: to, subject, body');
      error.code = 'INVALID_PAYLOAD';
      throw error;
    }

    // 模擬發送 Email
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    return {
      success: true,
      message: 'Email sent successfully',
      data: {
        messageId,
        status: 'sent'
      }
    };
  }
}

module.exports = EmailHandler;
