const MessageHandler = require('../handlers/message-handler');

/**
 * 訊息處理器 - 負責註冊與分發訊息到對應的處理器
 */
class MessageProcessor {
  constructor() {
    /** @type {Map<string, MessageHandler>} */
    this.handlers = new Map();
  }

  /**
   * 註冊處理器
   * @param {MessageHandler} handler - 處理器實例
   */
  register(handler) {
    if (!(handler instanceof MessageHandler)) {
      throw new Error('Handler must be an instance of MessageHandler');
    }
    this.handlers.set(handler.type, handler);
  }

  /**
   * 檢查是否有對應的處理器
   * @param {string} type - 訊息類型
   * @returns {boolean}
   */
  hasHandler(type) {
    return this.handlers.has(type);
  }

  /**
   * 處理訊息
   * @param {string} type - 訊息類型
   * @param {Object} payload - 訊息內容
   * @returns {Promise<Object>} 處理結果
   */
  async process(type, payload) {
    const handler = this.handlers.get(type);

    if (!handler) {
      const error = new Error(`Unknown message type: ${type}`);
      error.code = 'UNKNOWN_TYPE';
      throw error;
    }

    return handler.handle(payload);
  }

  /**
   * 取得所有已註冊的訊息類型
   * @returns {string[]}
   */
  getRegisteredTypes() {
    return Array.from(this.handlers.keys());
  }
}

module.exports = MessageProcessor;
