const express = require('express');

/**
 * 建立訊息路由
 * @param {import('../processor/message-processor')} processor
 * @returns {express.Router}
 */
function createMessagesRouter(processor) {
  const router = express.Router();

  /**
   * POST /messages
   * 處理訊息並分發到對應的處理器
   */
  router.post('/', async (req, res) => {
    try {
      const { type, payload } = req.body;

      // 驗證請求格式
      if (!type) {
        return res.status(400).json({
          success: false,
          message: 'Missing required field: type'
        });
      }

      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({
          success: false,
          message: 'Missing or invalid field: payload'
        });
      }

      // 檢查是否有對應的處理器
      if (!processor.hasHandler(type)) {
        return res.status(404).json({
          success: false,
          message: `Unknown message type: ${type}`
        });
      }

      // 處理訊息
      const result = await processor.process(type, payload);
      return res.status(200).json(result);

    } catch (error) {
      // 處理 payload 驗證錯誤
      if (error.code === 'INVALID_PAYLOAD') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      // 處理未知類型錯誤
      if (error.code === 'UNKNOWN_TYPE') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      // 其他伺服器錯誤
      console.error('Server error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  });

  return router;
}

module.exports = createMessagesRouter;
