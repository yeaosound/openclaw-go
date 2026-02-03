// 香港粵語翻譯 - 錯誤模組（書面粵語）
export const errorMessages = {
  // Generic errors
  "error.generic": "發生錯誤：{message}",
  "error.unknown": "發生未知錯誤",
  "error.notFound": "搵唔到：{resource}",
  "error.invalidInput": "無效輸入：{field}",
  "error.required": "{field} 係必填",
  "error.unauthorized": "未經授權",
  "error.forbidden": "禁止存取",

  // Config errors
  "error.config.invalid": "無效嘅配置",
  "error.config.notFound": "搵唔到配置檔案",
  "error.config.parse": "解析配置檔案失敗",

  // Gateway errors
  "error.gateway.notRunning": "網關未運行",
  "error.gateway.unreachable": "連唔到網關",
  "error.gateway.authFailed": "網關認證失敗",

  // Channel errors
  "error.channel.notConfigured": "頻道未配置",
  "error.channel.sendFailed": "傳送訊息失敗",
  "error.channel.receiveFailed": "接收訊息失敗",

  // Tool errors
  "error.tool.notFound": "搵唔到工具：{name}",
  "error.tool.notAllowed": "唔允許工具：{name}",
  "error.tool.executionFailed": "工具執行失敗：{message}",
};

export default errorMessages;
