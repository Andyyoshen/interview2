const express = require('express');
const MessageProcessor = require('./processor/message-processor');
const EmailHandler = require('./handlers/email.handler');
const SmsHandler = require('./handlers/sms.handler');
const LineHandler = require('./handlers/line.handler');
const createMessagesRouter = require('./routes/messages.route');

/**
 * 建立並設定 Express 應用程式
 * @returns {{ app: express.Application, processor: MessageProcessor }}
 */
function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // 初始化 MessageProcessor 並註冊處理器
  const processor = new MessageProcessor();
  processor.register(new EmailHandler());
  processor.register(new SmsHandler());
  processor.register(new LineHandler());

  // 註冊路由
  app.use('/messages', createMessagesRouter(processor));

  // 健康檢查端點
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      registeredTypes: processor.getRegisteredTypes()
    });
  });

  return { app, processor };
}

module.exports = createApp;
