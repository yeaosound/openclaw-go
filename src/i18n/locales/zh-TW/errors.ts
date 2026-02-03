// 简体中文翻译 - 錯誤模块
export const errorMessages = {
  // Generic errors
  "error.generic": "发生錯誤：{message}",
  "error.unknown": "发生未知錯誤",
  "error.notFound": "未找到：{resource}",
  "error.invalidInput": "無效输入：{field}",
  "error.required": "{field} 是必需的",
  "error.unauthorized": "未授權",
  "error.forbidden": "禁止存取",

  // Config errors
  "error.config.invalid": "設定無效",
  "error.config.notFound": "未找到設定檔案",
  "error.config.parse": "无法解析設定檔案",

  // Gateway errors
  "error.gateway.notRunning": "網關未執行",
  "error.gateway.unreachable": "无法存取網關",
  "error.gateway.authFailed": "網關身份驗證失敗",

  // Channel errors
  "error.channel.notConfigured": "頻道未設定",
  "error.channel.sendFailed": "傳送訊息失敗",
  "error.channel.receiveFailed": "接收訊息失敗",

  // Tool errors
  "error.tool.notFound": "未找到工具：{name}",
  "error.tool.notAllowed": "不允許使用工具：{name}",
  "error.tool.executionFailed": "工具执行失敗：{message}",
};

export default errorMessages;
