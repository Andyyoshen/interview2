# 後端工程師實作測驗 — 插件式訊息處理系統

## 概述

請使用 **JavaScript** 實作一個**插件式訊息處理系統**。
系統應該接受不同類型的訊息，並根據訊息類型將其分發到正確的處理器。

**注意事項：**

- 可使用任何套件管理器（npm）
- JavaScript

範例訊息：

```json
{
  "type": "email",
  "payload": {
    "to": "test@example.com",
    "subject": "Hello",
    "body": "World"
  }
}
```

範例響應：

```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "messageId": "msg-123",
    "status": "sent"
  }
}
```

系統必須至少支援：

- email
- sms

未來的訊息類型（例如：LINE、Slack、Webhook）應該能夠輕鬆添加，而無需修改核心邏輯。

---

## 需求

### 1. API

實作一個 POST 端點：

#### POST /messages

請求體：

```json
{
  "type": "email" | "sms",
  "payload": { ... }
}
```

- 接受 { type, payload }
- 分發到正確的處理器
- 回傳處理器的結果
- 應返回適當的 HTTP 狀態碼（200 表示成功，400 表示錯誤請求，404 表示未知訊息類型，500 表示伺服器錯誤）

框架可自由選擇：

- Node.js(Express)

---

### 2. 插件架構

您必須實作：

#### MessageHandler 介面（或抽象類別）

定義：

- `type: string`
- `handle(payload: any): Promise<any> | any`

#### 處理器

至少實作：

- EmailHandler
- SmsHandler

每個處理器必須實作 MessageHandler 介面。

#### MessageProcessor

負責：

- 註冊處理器
- 映射 type → handler
- 分發訊息
- 處理未知類型

---

### 3. 代碼結構

您的代碼應該組織成模組，例如：

```text
src/
  handlers/
    email.handler.ts
    sms.handler.ts
  processor/
    message-processor.ts
  routes/
    messages.route.ts
  index.ts
```

不需要資料庫。
所有資料可以儲存在記憶體中。

---
