// 香港粵語翻譯 - CLI 模組（書面粵語）
export const cliMessages = {
  // plugins-cli.ts
  "cli.plugins.description": "管理 OpenClaw 外掛/擴展",
  "cli.plugins.list.description": "列出已發現嘅外掛",
  "cli.plugins.show.description": "顯示外掛詳情",
  "cli.plugins.enable.description": "喺配置入面啟用外掛",
  "cli.plugins.disable.description": "喺配置入面停用外掛",
  "cli.plugins.install.description": "安裝外掛（路徑、壓縮檔或者 npm 規範）",
  "cli.plugins.update.description": "更新已安裝嘅外掛（淨係 npm 安裝）",
  "cli.plugins.doctor.description": "報告外掛加載問題",

  // gateway-cli
  "cli.gateway.description": "運行 WebSocket 網關",
  "cli.gateway.run.description": "運行 WebSocket 網關（前景）",
  "cli.gateway.status.description": "顯示網關服務狀態 + 探測網關",
  "cli.gateway.install.description": "安裝網關服務（launchd/systemd/schtasks）",
  "cli.gateway.uninstall.description": "卸載網關服務",
  "cli.gateway.start.description": "啟動網關服務",
  "cli.gateway.stop.description": "停止網關服務",
  "cli.gateway.restart.description": "重啟網關服務",
  "cli.gateway.call.description": "呼叫網關方法",
  "cli.gateway.usage.description": "由會話日誌攞使用費用摘要",
  "cli.gateway.health.description": "攞網關健康狀態",
  "cli.gateway.deep.description": "顯示網關可連接性 + 發現 + 健康 + 狀態摘要",
  "cli.gateway.discover.description": "透過 Bonjour 發現網關",

  // browser-cli
  "cli.browser.description": "管理 OpenClaw 專用瀏覽器（Chrome/Chromium）",
  "cli.browser.status.description": "顯示瀏覽器狀態",
  "cli.browser.start.description": "啟動瀏覽器（如果已經運行咗就冇操作）",
  "cli.browser.stop.description": "停止瀏覽器（盡力而為）",
  "cli.browser.reset.description": "重置瀏覽器設定檔（搬去垃圾桶）",
  "cli.browser.tabs.description": "列出打開咗嘅分頁",
  "cli.browser.shortcuts.description": "分頁快捷方式（基於索引）",
  "cli.browser.new.description": "打開新分頁（about:blank）",
  "cli.browser.focus.description": "按索引聚焦分頁（由 1 開始）",
  "cli.browser.focus-id.description": "按目標 ID 聚焦分頁（或者唯一前綴）",
  "cli.browser.close.description": "按索引關閉分頁（由 1 開始）；預設：第一個分頁",
  "cli.browser.close-id.description": "關閉分頁（目標 ID 可選）",
  "cli.browser.open.description": "喺新分頁入面打開網址",
  "cli.browser.profiles.description": "列出所有瀏覽器設定檔",
  "cli.browser.profile-create.description": "建立新嘅瀏覽器設定檔",
  "cli.browser.profile-delete.description": "刪除瀏覽器設定檔",
  "cli.browser.set.description": "瀏覽器環境設定",
  "cli.browser.viewport.description": "設定視窗大小（resize 嘅別名）",
  "cli.browser.offline.description": "切換離線模式",
  "cli.browser.headers.description": "設定額外嘅 HTTP 標頭（JSON 物件）",
  "cli.browser.auth.description": "設定 HTTP 基本認證憑證",
  "cli.browser.geolocation.description": "設定地理位置（同埋授予權限）",
  "cli.browser.color-scheme.description": "模擬 prefers-color-scheme",
  "cli.browser.timezone.description": "覆寫時區（CDP）",
  "cli.browser.locale.description": "覆寫語言地區（CDP）",
  "cli.browser.device.description": '套用 Playwright 裝置描述元（例如 "iPhone 14"）',
  "cli.browser.screenshot.description": "截取熒幕截圖 (MEDIA:<path>)",
  "cli.browser.snapshot.description": "截取快照（預設：ai；aria 係無障礙樹）",
  "cli.browser.extension.description": "Chrome 擴展助手",
  "cli.browser.extension-install.description": "將 Chrome 擴展安裝去穩定嘅本地路徑",
  "cli.browser.extension-path.description": "列印已安裝嘅 Chrome 擴展嘅路徑（載入已解壓）",
  "cli.browser.console.description": "攞最近嘅主控台訊息",
  "cli.browser.pdf.description": "將頁面儲存為 PDF",
  "cli.browser.network.description": "等待網絡回應並且傳回佢嘅主體",
  "cli.browser.cookies.description": "讀取/寫入 cookie",
  "cli.browser.cookie-set.description": "設定 cookie（需要 --url 或者 domain+path）",
  "cli.browser.cookies-clear.description": "清除所有 cookie",
  "cli.browser.storage.description": "讀取/寫入 localStorage/sessionStorage",
  "cli.browser.highlight.description": "突顯元素（透過 ref）",
  "cli.browser.errors.description": "攞最近嘅頁面錯誤",
  "cli.browser.requests.description": "攞最近嘅網絡請求（盡力而為）",
  "cli.browser.trace.description": "錄製 Playwright 追蹤",
  "cli.browser.trace-start.description": "開始錄製追蹤",
  "cli.browser.trace-stop.description": "停止錄製追蹤並且寫入 .zip",

  // channels-cli
  "cli.channels.description": "管理對話頻道帳戶",
  "cli.channels.list.description": "列出已配置嘅頻道 + 認證設定檔",
  "cli.channels.status.description": "顯示網關頻道狀態（本地使用 status --deep）",
  "cli.channels.capabilities.description": "顯示供應商能力（意圖/範圍 + 支援嘅功能）",
  "cli.channels.resolve.description": "將頻道/用戶名解析為 ID",
  "cli.channels.logs.description": "由網關日誌檔案顯示最近嘅頻道日誌",
  "cli.channels.add.description": "新增或者更新頻道帳戶",
  "cli.channels.remove.description": "停用或者刪除頻道帳戶",
  "cli.channels.link.description": "連結頻道帳戶（如果支援）",
  "cli.channels.logout.description": "登出頻道會話（如果支援）",

  // config-cli
  "cli.config.description": "配置助手（攞/設定/取消設定）。唔帶子命令運行以啟動精靈。",
  "cli.config.get.description": "透過點路徑攞配置值",
  "cli.config.set.description": "透過點路徑設定配置值",
  "cli.config.unset.description": "透過點路徑移除配置值",

  // memory-cli
  "cli.memory.description": "記憶體搜尋工具",
  "cli.memory.status.description": "顯示記憶體搜尋索引狀態",
  "cli.memory.index.description": "重新索引記憶體檔案",
  "cli.memory.search.description": "搜尋記憶體檔案",
  "cli.memory.indexing": "索引緊記憶體…",
  "cli.memory.checking": "檢查緊記憶體…",

  // system-cli
  "cli.system.description": "系統同埋保安工具",
  "cli.system.audit.description": "運行保安審查",
  "cli.system.audit.deep.description": "運行深度保安審查",
  "cli.system.audit.fix.description": "嘗試自動化修復保安問題",

  // devices-cli
  "cli.devices.description": "管理已配對裝置（iOS/Android 節點）",
  "cli.devices.list.description": "列出待處理同埋已配對嘅裝置請求",
  "cli.devices.approve.description": "批核裝置配對請求",
  "cli.devices.reject.description": "拒絕裝置配對請求",
  "cli.devices.rotate.description": "旋轉裝置信物",
  "cli.devices.revoke.description": "撤銷裝置配對",

  // nodes-cli
  "cli.nodes.description": "查詢同埋調用已配對節點",
  "cli.nodes.list.description": "列出可用節點",
  "cli.nodes.invoke.description": "喺節點入面調用動作（相機、熒幕錄影等）",
  "cli.nodes.pair.description": "配對新節點",
  "cli.nodes.unpair.description": "解除配對節點",

  // pairing-cli
  "cli.pairing.description": "安全 DM 配對（批核入嚟嘅請求）",
  "cli.pairing.list.description": "列出待處理嘅配對請求",
  "cli.pairing.approve.description": "批核配對碼同埋允許嗰個傳送者",

  // plugins-cli (additional)
  "cli.plugins.uninstall.description": "卸載外掛",

  // sandbox-cli
  "cli.sandbox.description": "管理沙箱 Docker 容器",
  "cli.sandbox.list.description": "列出沙箱容器",
  "cli.sandbox.recreate.description": "重新建立沙箱容器",
  "cli.sandbox.explain.description": "解釋沙箱設定",

  // security-cli
  "cli.security.description": "保安審查同埋工具",
  "cli.security.audit.description": "運行保安審查",

  // skills-cli
  "cli.skills.description": "管理技能（外掛）",
  "cli.skills.list.description": "列出已安裝嘅技能",
  "cli.skills.info.description": "顯示技能資訊",
  "cli.skills.check.description": "檢查技能狀態",

  // models-cli
  "cli.models.description": "管理模型同埋認證",
  "cli.models.list.description": "列出可用模型",
  "cli.models.status.description": "顯示模型狀態",
  "cli.models.set.description": "設定預設模型",
  "cli.models.setImage.description": "設定圖片模型",
  "cli.models.aliases.description": "管理模型別名",
  "cli.models.aliases.list.description": "列出模型別名",
  "cli.models.aliases.add.description": "新增模型別名",
  "cli.models.aliases.remove.description": "移除模型別名",
  "cli.models.fallbacks.description": "管理模型後備",
  "cli.models.fallbacks.list.description": "列出模型後備",
  "cli.models.fallbacks.add.description": "新增模型後備",
  "cli.models.fallbacks.remove.description": "移除模型後備",
  "cli.models.fallbacks.clear.description": "清除模型後備",
  "cli.models.imageFallbacks.description": "管理圖片模型後備",
  "cli.models.imageFallbacks.list.description": "列出圖片模型後備",
  "cli.models.imageFallbacks.add.description": "新增圖片模型後備",
  "cli.models.imageFallbacks.remove.description": "移除圖片模型後備",
  "cli.models.imageFallbacks.clear.description": "清除圖片模型後備",
  "cli.models.scan.description": "掃描模型目錄",
  "cli.models.auth.description": "管理模型認證",
  "cli.models.auth.add.description": "新增認證設定檔",
  "cli.models.auth.login.description": "登入供應商",
  "cli.models.auth.setupToken.description": "設定 API 信物",
  "cli.models.auth.pasteToken.description": "貼上信物",
  "cli.models.auth.loginGithubCopilot.description": "登入 GitHub Copilot",
  "cli.models.auth.order.description": "管理認證順序",
  "cli.models.auth.order.get.description": "攞認證順序",
  "cli.models.auth.order.set.description": "設定認證順序",
  "cli.models.auth.order.clear.description": "清除認證順序",

  // agent-cli
  "cli.agent.description": "直接向智能體傳送訊息",
  "cli.agents.description": "管理智能體",
  "cli.agents.list.description": "列出智能體",
  "cli.agents.add.description": "新增智能體",
  "cli.agents.set-identity.description": "設定智能體身份",
  "cli.agents.delete.description": "刪除智能體",

  // message-cli
  "cli.message.description": "透過頻道傳送訊息",
  "cli.message.send.description": "傳送訊息去聯絡人",
  "cli.message.read.description": "讀取訊息",
  "cli.message.edit.description": "編輯訊息",
  "cli.message.delete.description": "刪除訊息",
  "cli.message.poll.description": "建立投票",
  "cli.message.react.description": "加入反應",
  "cli.message.reactions.description": "列出反應",
  "cli.message.thread.description": "管理對話串",
  "cli.message.pins.description": "管理置頂訊息",
  "cli.message.permissions-search.description": "搜尋權限",
  "cli.message.discord-admin.description": "Discord 管理員工具",
  "cli.message.emoji-sticker.description": "傳送表情符號或者貼紙",

  // cron-cli
  "cli.cron.description": "管理定時任務",
  "cli.cron.list.description": "列出定時任務",
  "cli.cron.add.description": "新增定時任務",
  "cli.cron.edit.description": "編輯定時任務",
  "cli.cron.remove.description": "移除定時任務",
  "cli.cron.logs.description": "顯示定時任務日誌",

  // approvals-cli
  "cli.approvals.description": "管理執行批核",
  "cli.approvals.get.description": "攞批核設定",
  "cli.approvals.set.description": "設定批核設定",
  "cli.approvals.allowlist.description": "管理允許清單",
  "cli.approvals.allowlist.add.description": "新增允許清單項目",
  "cli.approvals.allowlist.remove.description": "移除允許清單項目",

  // status/health/sessions
  "cli.status.description": "顯示網關狀態",
  "cli.health.description": "顯示網關健康狀態",
  "cli.sessions.description": "列出作用中嘅會話",

  // configure
  "cli.configure.description": "啟動配置精靈",

  // onboard
  "cli.onboard.description": "啟動入門引導",

  // setup
  "cli.setup.description": "初始設定",

  // reset/uninstall/dashboard/doctor
  "cli.reset.description": "重置設定",
  "cli.uninstall.description": "卸載 OpenClaw",
  "cli.dashboard.description": "打開 Web 儀表版",
  "cli.doctor.description": "診斷同埋修復問題",

  // update
  "cli.update.description": "更新 OpenClaw",

  // maintenance
  "cli.maintenance.description": "維護工具",

  // 補充缺失嘅翻譯
  // cron-cli 補充
  "cli.cron.disable.description": "停用定時任務",
  "cli.cron.enable.description": "啟用定時任務",
  "cli.cron.rm.description": "移除定時任務",
  "cli.cron.run.description": "立即運行定時任務（除錯）",
  "cli.cron.runs.description": "顯示定時任務運行歷程（JSONL 支援）",
  "cli.cron.status.description": "顯示定時任務排程器狀態",

  // hooks-cli
  "cli.hooks.description": "管理內部智能體鈎子",
  "cli.hooks.list.description": "列出所有鈎子",
  "cli.hooks.info.description": "顯示鈎子嘅詳細資訊",
  "cli.hooks.check.description": "檢查鈎子資格狀態",
  "cli.hooks.enable.description": "啟用鈎子",
  "cli.hooks.disable.description": "停用鈎子",
  "cli.hooks.install.description": "安裝鈎子包（路徑、壓縮檔或者 npm 規範）",
  "cli.hooks.update.description": "更新已安裝嘅鈎子（僅限 npm 安裝）",

  // message-cli 補充
  "cli.message.ban.description": "封鎖成員",
  "cli.message.broadcast.description": "向多個目標廣播訊息",
  "cli.message.channel.description": "頻道操作",
  "cli.message.channel.info.description": "攞頻道資訊",
  "cli.message.channel.list.description": "列出頻道",
  "cli.message.event.create.description": "建立預定事件",
  "cli.message.event.description": "事件操作",
  "cli.message.event.list.description": "列出預定事件",
  "cli.message.kick.description": "踢出成員",
  "cli.message.member.description": "成員操作",
  "cli.message.member.info.description": "攞成員資訊",
  "cli.message.permissions.description": "攞頻道權限",
  "cli.message.pin.description": "置頂訊息",
  "cli.message.role.add.description": "向成員新增角色",
  "cli.message.role.description": "角色操作",
  "cli.message.role.info.description": "列出角色",
  "cli.message.role.remove.description": "由成員移除角色",
  "cli.message.search.description": "搜尋 Discord 訊息",
  "cli.message.thread.create.description": "建立對話串",
  "cli.message.thread.list.description": "列出對話串",
  "cli.message.thread.reply.description": "喺對話串入面回覆",
  "cli.message.timeout.description": "禁言成員",
  "cli.message.unpin.description": "取消置頂訊息",
  "cli.message.voice.description": "語音操作",
  "cli.message.voice.status.description": "攞語音狀態",

  // nodes-cli
  "cli.nodes.camera.description": "由配對節點截取相機媒體",
  "cli.nodes.camera.list.description": "列出節點上嘅可用相機",
  "cli.nodes.camera.photo.description": "由節點相機截取相（列印 MEDIA:<path>）",
  "cli.nodes.camera.video.description": "由節點相機截取短視頻（列印 MEDIA:<path>）",
  "cli.nodes.canvas.a2ui.description": "喺畫布上渲染 A2UI 內容",
  "cli.nodes.canvas.a2ui.push.description": "推送 A2UI JSONL 去畫布",
  "cli.nodes.canvas.a2ui.reset.description": "重置 A2UI 渲染器狀態",
  "cli.nodes.canvas.description": "由配對節點截取或者渲染畫布內容",
  "cli.nodes.canvas.eval.description": "喺畫布入面執行 JavaScript",
  "cli.nodes.canvas.hide.description": "隱藏畫布",
  "cli.nodes.canvas.navigate.description": "導航畫布去網址",
  "cli.nodes.canvas.show.description": "顯示畫布（可選帶目標網址/路徑）",
  "cli.nodes.canvas.snapshot.description": "截取畫布快照（列印 MEDIA:<path>）",
  "cli.nodes.invoke.shell.description": "喺節點上運行 shell 命令（僅限 Mac）",
  "cli.nodes.location.description": "由配對節點攞位置",
  "cli.nodes.location.get.description": "由節點攞目前位置",
  "cli.nodes.notify.description": "喺節點上傳送本機通知（僅限 Mac）",
  "cli.nodes.pairing.approve.description": "批核待處理嘅配對請求",
  "cli.nodes.pairing.list.description": "列出待處理嘅配對請求",
  "cli.nodes.pairing.reject.description": "拒絕待處理嘅配對請求",
  "cli.nodes.pairing.rename.description": "重新命名已配對節點（顯示名稱覆寫）",
  "cli.nodes.screen.description": "由配對節點截取熒幕錄影",
  "cli.nodes.screen.record.description": "由節點截取熒幕錄影（列印 MEDIA:<path>）",
  "cli.nodes.status.describe.description": "描述節點（功能同埋支援嘅呼叫命令）",
  "cli.nodes.status.list.description": "列出已知節點同埋佢哋嘅連線狀態同埋功能",
  "cli.nodes.status.pending.description": "列出待處理同埋已配對嘅節點",

  // progress
  "cli.progress.done": "搞掂",
  "cli.progress.loading": "載入緊…",

  // service
  "cli.service.alreadyRunning": "服務已經喺度運行",
  "cli.service.installed": "服務已經安裝",
  "cli.service.notInstalled": "服務未安裝",
  "cli.service.notRunning": "服務未運行",

  // status
  "cli.status.error": "錯誤",
  "cli.status.failed": "失敗",
  "cli.status.info": "資訊",
  "cli.status.success": "成功",
  "cli.status.warning": "警告",

  // system
  "cli.system.event.description": "將系統事件加入隊列並且可選擇噉觸發心跳",
  "cli.system.heartbeat.description": "心跳控制",
  "cli.system.heartbeat.disable.description": "停用心跳",
  "cli.system.heartbeat.enable.description": "啟用心跳",
  "cli.system.heartbeat.last.description": "顯示上次心跳事件",
  "cli.system.presence.description": "列出系統線上狀態項目",
};

export default cliMessages;
