// 简体中文翻译 - 错误模块
export const errorMessages = {
  // Generic errors
  "error.generic": "发生错误：{message}",
  "error.unknown": "发生未知错误",
  "error.notFound": "未找到：{resource}",
  "error.invalidInput": "无效输入：{field}",
  "error.required": "{field} 是必需的",
  "error.unauthorized": "未授权",
  "error.forbidden": "禁止访问",

  // Config errors
  "error.config.invalid": "配置无效",
  "error.config.notFound": "未找到配置文件",
  "error.config.parse": "无法解析配置文件",

  // Gateway errors
  "error.gateway.notRunning": "网关未运行",
  "error.gateway.unreachable": "无法访问网关",
  "error.gateway.authFailed": "网关身份验证失败",

  // Channel errors
  "error.channel.notConfigured": "频道未配置",
  "error.channel.sendFailed": "发送消息失败",
  "error.channel.receiveFailed": "接收消息失败",

  // Tool errors
  "error.tool.notFound": "未找到工具：{name}",
  "error.tool.notAllowed": "不允许使用工具：{name}",
  "error.tool.executionFailed": "工具执行失败：{message}",
};

export default errorMessages;
