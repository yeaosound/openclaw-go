// 简体中文翻译 - 配对模块
export const pairingMessages = {
  // Pairing request
  "pairing.request.title": "OpenClaw：访问未配置",
  "pairing.request.idLine": "您的 ID：{id}",
  "pairing.request.code": "配对码：{code}",
  "pairing.request.instruction": "请要求机器人所有者使用以下命令批准：",

  // CLI
  "cli.pairing.description": "安全 DM 配对（批准入站请求）",
  "cli.pairing.list.description": "列出待处理的配对请求",
  "cli.pairing.approve.description": "批准配对码并允许该发送者",

  // Status
  "pairing.status.pending": "待处理",
  "pairing.status.approved": "已批准",
  "pairing.status.rejected": "已拒绝",
  "pairing.status.expired": "已过期",

  // Messages
  "pairing.approve.success": "配对请求已成功批准",
  "pairing.approve.failed": "批准配对请求失败",
  "pairing.reject.success": "配对请求已拒绝",
  "pairing.no.pending": "没有待处理的配对请求",
};

export default pairingMessages;
