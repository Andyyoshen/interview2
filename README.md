# Plugin Message System

插件式訊息處理系統 - 基於 Express 框架的 REST API 服務，支援多種訊息類型的發送處理。

## 系統需求

- **Node.js**: >= 18.0.0（Express 5.x 需要 Node.js 18 或以上版本）
- **npm**: >= 8.0.0

## 專案結構

```
src/
├── index.js                      # 應用程式入口點
├── app.js                        # Express 應用程式配置
├── routes/
│   └── messages.route.js         # 訊息路由
├── processor/
│   └── message-processor.js      # 訊息處理器（分發中心）
└── handlers/
    ├── message-handler.js        # 處理器抽象基類
    ├── email.handler.js          # Email 處理器
    ├── sms.handler.js            # SMS 處理器
    └── line.handler.js           # LINE 處理器
```

## 安裝

```bash
# 安裝依賴
npm install
```

## 運行專案

```bash
# 啟動伺服器（預設 port 3000）
npm start

# 使用自定義 port
PORT=8080 npm start
```

伺服器啟動後，會顯示以下資訊：
```
Server is running on port 3000
Health check: http://localhost:3000/health
Messages API: POST http://localhost:3000/messages
```

## API 端點

### 健康檢查

```
GET /health
```

回應範例：
```json
{
  "status": "ok",
  "registeredTypes": ["email", "sms", "line"]
}
```

### 發送訊息

```
POST /messages
Content-Type: application/json
```

#### Email 訊息

```json
{
  "type": "email",
  "payload": {
    "to": "user@example.com",
    "subject": "測試主旨",
    "body": "測試內容"
  }
}
```

#### SMS 訊息

```json
{
  "type": "sms",
  "payload": {
    "phoneNumber": "0912345678",
    "message": "測試簡訊內容"
  }
}
```

#### LINE 訊息

```json
{
  "type": "line",
  "payload": {
    "userId": "U1234567890",
    "message": "測試 LINE 訊息"
  }
}
```

### 回應格式

成功回應：
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "messageId": "msg-1234567890-abc123",
    "status": "sent"
  }
}
```

錯誤回應：
```json
{
  "success": false,
  "message": "錯誤訊息"
}
```

## 擴展新的訊息類型

1. 在 `src/handlers/` 目錄下建立新的處理器，繼承 `MessageHandler`：

```javascript
const MessageHandler = require('./message-handler');

class NewHandler extends MessageHandler {
  get type() {
    return 'new-type';
  }

  async handle(payload) {
    // 實作處理邏輯
    return {
      success: true,
      message: 'Message sent successfully',
      data: { messageId: '...', status: 'sent' }
    };
  }
}

module.exports = NewHandler;
```

2. 在 `src/app.js` 中註冊新的處理器：

```javascript
const NewHandler = require('./handlers/new.handler');

processor.register(new NewHandler());
```

## 技術棧

- **Express** 5.x - Web 框架
- **Node.js** 18+ - 運行環境
