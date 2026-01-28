/**
 * MessageHandler 抽象基類
 * 所有訊息處理器必須繼承此類別
 */
class MessageHandler {
  /**
   * 訊息類型識別符
   * @type {string}
   */
  get type() {
    throw new Error('Subclass must implement type getter');
  }

  /**
   * 處理訊息
   * @param {Object} payload - 訊息內容
   * @returns {Promise<Object>} 處理結果
   */
  async handle(payload) {
    throw new Error('Subclass must implement handle method');
  }
}

module.exports = MessageHandler;
