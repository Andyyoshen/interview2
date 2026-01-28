const MessageHandler = require('./message-handler');

/**
 * LINE 訊息處理器
 */
class LineHandler extends MessageHandler {
  get type() {
    return 'line';
  }

  /**
   * 處理 LINE 訊息
   * @param {Object} payload
   * @param {string} payload.userId - LINE 使用者 ID
   * @param {string} payload.message - 訊息內容
   * @returns {Promise<Object>}
   */
  async handle(payload) {
    const { userId, message } = payload;

    // 驗證必要欄位
    if (!userId || !message) {
      const error = new Error('LINE payload must include: userId, message');
      error.code = 'INVALID_PAYLOAD';
      throw error;
    }

    // 模擬發送 LINE 訊息
    const messageId = `line-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    return {
      success: true,
      message: 'LINE message sent successfully',
      data: {
        messageId,
        status: 'sent',
        userId
      }
    };
  }
}

module.exports = LineHandler;
