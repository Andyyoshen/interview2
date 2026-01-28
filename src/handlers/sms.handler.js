const MessageHandler = require('./message-handler');

/**
 * SMS 訊息處理器
 */
class SmsHandler extends MessageHandler {
  get type() {
    return 'sms';
  }

  /**
   * 處理 SMS 訊息
   * @param {Object} payload
   * @param {string} payload.phoneNumber - 電話號碼
   * @param {string} payload.message - 簡訊內容
   * @returns {Promise<Object>}
   */
  async handle(payload) {
    const { phoneNumber, message } = payload;

    // 驗證必要欄位
    if (!phoneNumber || !message) {
      const error = new Error('SMS payload must include: phoneNumber, message');
      error.code = 'INVALID_PAYLOAD';
      throw error;
    }

    // 模擬發送 SMS
    const messageId = `sms-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    return {
      success: true,
      message: 'SMS sent successfully',
      data: {
        messageId,
        status: 'sent',
        phoneNumber
      }
    };
  }
}

module.exports = SmsHandler;
