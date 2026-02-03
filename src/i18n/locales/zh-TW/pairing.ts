// 简体中文翻译 - 配对模块
export const pairingMessages = {
  // Pairing request
  "pairing.request.title": "OpenClaw：存取未設定",
  "pairing.request.idLine": "您的 ID：{id}",
  "pairing.request.code": "配对码：{code}",
  "pairing.request.instruction": "请要求机器人所有者使用以下指令批准：",

  // CLI
  "cli.pairing.description": "安全 DM 配对（批准入站請求）",
  "cli.pairing.list.description": "列出待處理的配对請求",
  "cli.pairing.approve.description": "批准配对码并允許该傳送者",

  // Status
  "pairing.status.pending": "待處理",
  "pairing.status.approved": "已批准",
  "pairing.status.rejected": "已拒絕",
  "pairing.status.expired": "已過期",

  // Messages
  "pairing.approve.success": "配对請求已成功批准",
  "pairing.approve.failed": "批准配对請求失敗",
  "pairing.reject.success": "配对請求已拒絕",
  "pairing.no.pending": "没有待處理的配对請求",
};

export default pairingMessages;
