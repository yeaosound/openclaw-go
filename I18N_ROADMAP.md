# OpenClaw i18n 汉化落地方案

**版本:** 1.0  
**日期:** 2026-02-01  
**目标:** 将 OpenClaw CLI 及交互组件汉化

---

## 1. 项目现状分析

### 1.1 文本分布统计

| 模块             | 文件数   | 文本量        | 优先级 | 说明                  |
| ---------------- | -------- | ------------- | ------ | --------------------- |
| **CLI 命令描述** | 92+      | ~426 处       | ⭐⭐⭐ | `.description()` 调用 |
| **向导流程**     | 10       | ~200+ 处      | ⭐⭐⭐ | onboarding、prompts   |
| **配对消息**     | 5        | ~50 处        | ⭐⭐⭐ | 用户可见消息          |
| **命令提示**     | 50+      | ~100+ 处      | ⭐⭐   | `message:` 提示       |
| **频道消息**     | 30+      | ~200+ 处      | ⭐⭐   | 发送给用户的消息      |
| **终端输出**     | 20+      | ~50 处        | ⭐     | 表格、进度条          |
| **日志输出**     | 多处     | ~100+ 处      | ⭐     | `console.log`         |
| **总计**         | **~200** | **~1100+ 处** | -      | -                     |

### 1.2 当前问题

- 所有文本硬编码为英文
- 无 i18n 基础设施
- 分散在 200+ 个文件中
- 包含动态插值（如 `${code}`）

---

## 2. i18n 架构设计

### 2.1 目录结构

```
src/i18n/
├── index.ts              # 主入口，提供 t() 函数
├── types.ts              # 类型定义
├── config.ts             # 配置管理
├── loader.ts             # 语言包加载器
├── utils.ts              # 工具函数
├── locales/              # 语言文件目录
│   ├── zh-CN/            # 简体中文
│   │   ├── cli.ts        # CLI 命令描述 (~150 条)
│   │   ├── wizard.ts     # 向导文本 (~200 条)
│   │   ├── pairing.ts    # 配对消息 (~30 条)
│   │   ├── channels.ts   # 频道消息 (~200 条)
│   │   ├── errors.ts     # 错误消息 (~100 条)
│   │   ├── common.ts     # 通用文本 (~50 条)
│   │   └── index.ts      # 汇总导出
│   └── en/               # 英文（fallback）
│       └── ...           # 同上结构
└── scripts/              # 辅助脚本
    ├── extract-keys.ts   # 自动提取文本
    └── validate.ts       # 验证语言包完整性
```

### 2.2 核心 API 设计

#### 2.2.1 类型定义（`types.ts`）

```typescript
// src/i18n/types.ts

export interface I18nConfig {
  locale: string; // 当前语言: 'zh-CN', 'en'
  fallbackLocale: string; // 回退语言: 'en'
}

// 使用模板字面量类型确保 key 的类型安全
export type TranslationKey =
  | `cli.${string}`
  | `wizard.${string}`
  | `pairing.${string}`
  | `channel.${string}`
  | `error.${string}`
  | `common.${string}`;

export interface InterpolationParams {
  [key: string]: string | number | undefined;
}
```

#### 2.2.2 主入口（`index.ts`）

```typescript
// src/i18n/index.ts

import { zhCN } from "./locales/zh-CN/index.js";
import { en } from "./locales/en/index.js";
import type { InterpolationParams } from "./types.js";

const locales: Record<string, Record<string, string>> = {
  "zh-CN": zhCN,
  en: en,
};

let currentLocale = process.env.OPENCLAW_LANG || "en";

/**
 * 翻译函数
 * @param key 翻译键，如 'cli.plugins.description'
 * @param params 插值参数，如 { count: 5 }
 * @returns 翻译后的文本
 *
 * 示例:
 * t('cli.plugins.description')
 *   // => "Manage OpenClaw plugins/extensions" (英文)
 *   // => "管理 OpenClaw 插件/扩展" (中文)
 *
 * t('cli.plugins.installed', { count: 5 })
 *   // => "已安装 5 个插件"
 */
export function t(key: string, params?: InterpolationParams): string {
  const messages = locales[currentLocale] || locales["en"];
  let message = messages[key] || key;

  // 插值处理: {name} -> value
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      if (value !== undefined) {
        message = message.replace(new RegExp(`{${paramKey}}`, "g"), String(value));
      }
    });
  }

  return message;
}

export function setLocale(locale: string): void {
  currentLocale = locale;
}

export function getLocale(): string {
  return currentLocale;
}

export function setLocaleFromConfig(config: { lang?: string }): void {
  if (config.lang && locales[config.lang]) {
    currentLocale = config.lang;
  }
}

export function isValidLocale(locale: string): boolean {
  return locale in locales;
}

export function getAvailableLocales(): string[] {
  return Object.keys(locales);
}
```

#### 2.2.3 配置管理（`config.ts`）

```typescript
// src/i18n/config.ts

import { resolveConfigFilePath, readConfigFile } from "../config/config.js";
import { setLocale, getLocale } from "./index.js";

const LANG_ENV_VAR = "OPENCLAW_LANG";
const DEFAULT_LANG = "en";

export async function initializeI18n(): Promise<void> {
  // 1. 优先从环境变量读取
  const envLang = process.env[LANG_ENV_VAR];
  if (envLang) {
    setLocale(envLang);
    return;
  }

  // 2. 从配置文件读取
  try {
    const configPath = await resolveConfigFilePath();
    if (configPath) {
      const config = await readConfigFile(configPath);
      if (config.lang) {
        setLocale(config.lang);
        return;
      }
    }
  } catch {
    // 配置文件不存在或无效，使用默认
  }

  // 3. 使用系统语言或默认
  setLocale(DEFAULT_LANG);
}

export function getCurrentLanguage(): string {
  return getLocale();
}
```

### 2.3 语言包组织

#### 2.3.1 简体中文语言包（`zh-CN/index.ts`）

```typescript
// src/i18n/locales/zh-CN/index.ts

import { cliMessages } from "./cli.js";
import { wizardMessages } from "./wizard.js";
import { pairingMessages } from "./pairing.js";
import { channelMessages } from "./channels.js";
import { errorMessages } from "./errors.js";
import { commonMessages } from "./common.js";

export const zhCN: Record<string, string> = {
  ...cliMessages,
  ...wizardMessages,
  ...pairingMessages,
  ...channelMessages,
  ...errorMessages,
  ...commonMessages,
};

export default zhCN;
```

#### 2.3.2 CLI 模块（`zh-CN/cli.ts`）

```typescript
// src/i18n/locales/zh-CN/cli.ts

export const cliMessages = {
  // ==================== plugins-cli.ts ====================
  "cli.plugins.description": "管理 OpenClaw 插件/扩展",
  "cli.plugins.list.description": "列出已发现的插件",
  "cli.plugins.show.description": "显示插件详情",
  "cli.plugins.enable.description": "在配置中启用插件",
  "cli.plugins.disable.description": "在配置中禁用插件",
  "cli.plugins.install.description": "安装插件（路径、压缩包或 npm 规范）",
  "cli.plugins.update.description": "更新已安装的插件（仅限 npm 安装）",
  "cli.plugins.doctor.description": "报告插件加载问题",

  // ==================== gateway-cli ====================
  "cli.gateway.description": "运行 WebSocket 网关",
  "cli.gateway.run.description": "运行 WebSocket 网关（前台）",
  "cli.gateway.status.description": "显示网关服务状态 + 探测网关",
  "cli.gateway.install.description": "安装网关服务（launchd/systemd/schtasks）",
  "cli.gateway.uninstall.description": "卸载网关服务",
  "cli.gateway.start.description": "启动网关服务",
  "cli.gateway.stop.description": "停止网关服务",
  "cli.gateway.restart.description": "重启网关服务",
  "cli.gateway.call.description": "调用网关方法",
  "cli.gateway.usage.description": "从会话日志获取使用费用摘要",
  "cli.gateway.health.description": "获取网关健康状态",
  "cli.gateway.deep.description": "显示网关可访问性 + 发现 + 健康 + 状态摘要",
  "cli.gateway.discover.description": "通过 Bonjour 发现网关",

  // ==================== browser-cli ====================
  "cli.browser.description": "管理 OpenClaw 专用浏览器（Chrome/Chromium）",
  "cli.browser.status.description": "显示浏览器状态",
  "cli.browser.start.description": "启动浏览器（如果已在运行则无操作）",
  "cli.browser.stop.description": "停止浏览器（尽力而为）",
  "cli.browser.reset.description": "重置浏览器配置文件（移至废纸篓）",
  "cli.browser.tabs.description": "列出打开的选项卡",
  "cli.browser.shortcuts.description": "选项卡快捷方式（基于索引）",
  "cli.browser.new.description": "打开新选项卡（about:blank）",
  "cli.browser.focus.description": "按索引聚焦选项卡（从 1 开始）",
  "cli.browser.close.description": "按索引关闭选项卡（从 1 开始）；默认：第一个选项卡",
  "cli.browser.open.description": "在新选项卡中打开 URL",
  "cli.browser.focus-id.description": "按目标 ID 聚焦选项卡（或唯一前缀）",
  "cli.browser.close-id.description": "关闭选项卡（目标 ID 可选）",
  "cli.browser.profiles.description": "列出所有浏览器配置文件",
  "cli.browser.profile-create.description": "创建新的浏览器配置文件",
  "cli.browser.profile-delete.description": "删除浏览器配置文件",

  // ==================== memory-cli ====================
  "cli.memory.description": "内存搜索工具",
  "cli.memory.status.description": "显示内存搜索索引状态",
  "cli.memory.index.description": "重新索引内存文件",
  "cli.memory.search.description": "搜索内存文件",
  "cli.memory.indexing": "正在索引内存…",
  "cli.memory.checking": "正在检查内存…",

  // ==================== 通用 CLI 文本 ====================
  "cli.service.alreadyRunning": "服务已在运行",
  "cli.service.notRunning": "服务未运行",
  "cli.service.installed": "服务已安装",
  "cli.service.notInstalled": "服务未安装",

  // ==================== 进度和状态 ====================
  "cli.progress.loading": "正在加载…",
  "cli.progress.done": "完成",
  "cli.status.success": "成功",
  "cli.status.failed": "失败",
  "cli.status.warning": "警告",
};

export default cliMessages;
```

#### 2.3.3 向导模块（`zh-CN/wizard.ts`）

```typescript
// src/i18n/locales/zh-CN/wizard.ts

export const wizardMessages = {
  // ==================== onboarding.ts ====================
  'wizard.intro.title': 'OpenClaw 入门',

  // 安全警告
  'wizard.security.title': '安全警告',
  'wizard.security.note': `安全警告 — 请仔细阅读。

OpenClaw 是一个业余项目，目前处于测试阶段。请预期会有各种问题。
如果启用了工具，此机器人可以读取文件并执行操作。
错误的提示可能会诱使它执行不安全的操作。

如果您对基本安全和访问控制感到不舒服，请不要运行 OpenClaw。
在启用工具或将其暴露给互联网之前，请向有经验的人寻求帮助。

推荐的安全基线：
- 配对/白名单 + @提及限制
- 沙箱 + 最小权限工具
- 将机密信息保留在代理可访问的文件系统之外
- 对于具有工具或不受信任收件箱的任何机器人，使用最强大的可用模型

定期运行：
openclaw security audit --deep
openclaw security audit --fix

必读：https://docs.openclaw.ai/gateway/security`,
  'wizard.security.confirm': '我理解这很强大且存在固有风险。继续吗？',

  // 配置处理
  'wizard.config.existing': '检测到现有配置',
  'wizard.config.invalid': '配置无效',
  'wizard.config.issues.title': '配置问题',
  'wizard.config.action': '配置处理',
  'wizard.config.action.keep': '使用现有值',
  'wizard.config.action.modify': '更新值',
  'wizard.config.action.reset': '重置',
  'wizard.config.reset.scope': '重置范围',
  'wizard.config.reset.config': '仅配置',
  'wizard.config.reset.config-creds-sessions': '配置 + 凭证 + 会话',
  'wizard.config.reset.full': '完全重置（配置 + 凭证 + 会话 + 工作区）',
  'wizard.config.invalid.hint': '配置无效。运行 `{command}` 修复它，然后重新运行入门程序。',

  // 向导模式
  'wizard.onboarding.mode': '入门模式',
  'wizard.onboarding.quickstart.label': '快速开始',
  'wizard.onboarding.quickstart.hint': '稍后在 {command} 中配置详细信息。',
  'wizard.onboarding.advanced.label': '手动',
  'wizard.onboarding.advanced.hint': '配置端口、网络、Tailscale 和身份验证选项。',
  'wizard.onboarding.remote.notice': '快速开始仅支持本地网关。切换到手动模式。',

  // 网关配置
  'wizard.gateway.port': '网关端口',
  'wizard.gateway.auth.mode': '网关身份验证模式',
  'wizard.gateway.auth.token': '网关令牌',
  'wizard.gateway.probe.success': '网关可访问！',
  'wizard.gateway.probe.failed': '无法访问网关。',

  // 频道设置
  'wizard.channels.setup': '设置频道',
  'wizard.channels.select': '选择要配置的频道',

  // 技能设置
  'wizard.skills.setup': '设置技能',
  'wizard.skills.select': '选择要启用的技能',

  // 钩子设置
  'wizard.hooks.setup': '设置内部钩子',

  // 最终化
  'wizard.finalize.title': '设置完成',
  'wizard.finalize.completion': '是否要安装 shell 补全？',
  'wizard.finalize.hints': '提示：
- 运行 `{doctor}` 检查安装
- 运行 `{status}` 查看网关状态
- 运行 `{help}` 获取帮助',

  // 通用
  'wizard.cancelled': '向导已取消',
  'wizard.back': '返回',
  'wizard.next': '下一步',
  'wizard.finish': '完成',
};

export default wizardMessages;
```

#### 2.3.4 配对模块（`zh-CN/pairing.ts`）

```typescript
// src/i18n/locales/zh-CN/pairing.ts

export const pairingMessages = {
  // ==================== pairing-messages.ts ====================
  "pairing.request.title": "OpenClaw：访问未配置",
  "pairing.request.idLine": "您的 ID：{id}",
  "pairing.request.code": "配对码：{code}",
  "pairing.request.instruction": "请要求机器人所有者使用以下命令批准：",

  // ==================== pairing-cli.ts ====================
  "cli.pairing.description": "安全 DM 配对（批准入站请求）",
  "cli.pairing.list.description": "列出待处理的配对请求",
  "cli.pairing.approve.description": "批准配对码并允许该发送者",

  // 配对状态
  "pairing.status.pending": "待处理",
  "pairing.status.approved": "已批准",
  "pairing.status.rejected": "已拒绝",
  "pairing.status.expired": "已过期",

  // 配对提示
  "pairing.approve.success": "已成功批准配对请求",
  "pairing.approve.failed": "批准配对请求失败",
  "pairing.reject.success": "已拒绝配对请求",
  "pairing.no.pending": "没有待处理的配对请求",
};

export default pairingMessages;
```

#### 2.3.5 频道消息（`zh-CN/channels.ts`）

```typescript
// src/i18n/locales/zh-CN/channels.ts

export const channelMessages = {
  // ==================== Discord ====================
  "channel.discord.notAllowed": "此频道不允许。",
  "channel.discord.dmsDisabled": "Discord DM 已禁用。",
  "channel.discord.notAuthorized": "您无权在此处使用此命令。",
  "channel.discord.slash.messageRequired": "需要消息。",
  "channel.discord.slash.error": "抱歉，处理该命令时出了点问题。",
  "channel.discord.slash.buttonExpired": "抱歉，该按钮已不再有效。",
  "channel.discord.slash.menuOtherUser": "该菜单是针对其他用户的。",

  // ==================== Slack ====================
  "channel.slack.notAllowed": "此频道不允许。",
  "channel.slack.dmsDisabled": "Slack DM 已禁用。",

  // ==================== LINE ====================
  "channel.line.error": "抱歉，处理您的消息时出了点问题。",

  // ==================== 通用频道消息 ====================
  "channel.notConfigured": "频道未配置。",
  "channel.disabled": "频道已禁用。",
  "channel.noPermission": "没有权限访问此频道。",
};

export default channelMessages;
```

#### 2.3.6 错误消息（`zh-CN/errors.ts`）

```typescript
// src/i18n/locales/zh-CN/errors.ts

export const errorMessages = {
  // ==================== 通用错误 ====================
  "error.generic": "发生错误：{message}",
  "error.unknown": "发生未知错误",
  "error.notFound": "未找到：{resource}",
  "error.invalidInput": "无效输入：{field}",
  "error.required": "{field} 是必需的",
  "error.unauthorized": "未授权",
  "error.forbidden": "禁止访问",

  // ==================== 配置错误 ====================
  "error.config.invalid": "配置无效",
  "error.config.notFound": "未找到配置文件",
  "error.config.parse": "无法解析配置文件",

  // ==================== 网关错误 ====================
  "error.gateway.notRunning": "网关未运行",
  "error.gateway.unreachable": "无法访问网关",
  "error.gateway.authFailed": "网关身份验证失败",

  // ==================== 频道错误 ====================
  "error.channel.notConfigured": "频道未配置",
  "error.channel.sendFailed": "发送消息失败",
  "error.channel.receiveFailed": "接收消息失败",

  // ==================== 工具错误 ====================
  "error.tool.notFound": "未找到工具：{name}",
  "error.tool.notAllowed": "不允许使用工具：{name}",
  "error.tool.executionFailed": "工具执行失败：{message}",
};

export default errorMessages;
```

#### 2.3.7 通用文本（`zh-CN/common.ts`）

```typescript
// src/i18n/locales/zh-CN/common.ts

export const commonMessages = {
  // ==================== 通用按钮和标签 ====================
  "common.yes": "是",
  "common.no": "否",
  "common.ok": "确定",
  "common.cancel": "取消",
  "common.back": "返回",
  "common.next": "下一步",
  "common.finish": "完成",
  "common.save": "保存",
  "common.delete": "删除",
  "common.edit": "编辑",
  "common.create": "创建",
  "common.add": "添加",
  "common.remove": "移除",
  "common.enable": "启用",
  "common.disable": "禁用",
  "common.enabled": "已启用",
  "common.disabled": "已禁用",
  "common.active": "活跃",
  "common.inactive": "非活跃",
  "common.pending": "待处理",
  "common.completed": "已完成",
  "common.failed": "失败",
  "common.success": "成功",
  "common.warning": "警告",
  "common.error": "错误",
  "common.info": "信息",

  // ==================== 状态 ====================
  "common.status.running": "运行中",
  "common.status.stopped": "已停止",
  "common.status.starting": "正在启动",
  "common.status.stopping": "正在停止",
  "common.status.loading": "正在加载",
  "common.status.ready": "就绪",
  "common.status.error": "错误",

  // ==================== 时间 ====================
  "common.time.now": "现在",
  "common.time.justNow": "刚刚",
  "common.time.minutesAgo": "{count} 分钟前",
  "common.time.hoursAgo": "{count} 小时前",
  "common.time.daysAgo": "{count} 天前",
};

export default commonMessages;
```

---

## 3. 代码迁移指南

### 3.1 CLI 命令描述迁移

**修改前：**

```typescript
// src/cli/plugins-cli.ts
program.command("plugins").description("Manage OpenClaw plugins/extensions");
```

**修改后：**

```typescript
// src/cli/plugins-cli.ts
import { t } from "../i18n/index.js";

program.command("plugins").description(t("cli.plugins.description"));
```

### 3.2 向导文本迁移

**修改前：**

```typescript
// src/wizard/onboarding.ts
await prompter.note(
  ["Security warning — please read.", "", "OpenClaw is a hobby project and still in beta..."].join(
    "\n",
  ),
  "Security",
);

const ok = await prompter.confirm({
  message: "I understand this is powerful and inherently risky. Continue?",
  initialValue: false,
});
```

**修改后：**

```typescript
// src/wizard/onboarding.ts
import { t } from "../i18n/index.js";

await prompter.note(t("wizard.security.note"), t("wizard.security.title"));

const ok = await prompter.confirm({
  message: t("wizard.security.confirm"),
  initialValue: false,
});
```

### 3.3 配对消息迁移

**修改前：**

```typescript
// src/pairing/pairing-messages.ts
return [
  "OpenClaw: access not configured.",
  "",
  idLine,
  "",
  `Pairing code: ${code}`,
  "",
  "Ask the bot owner to approve with:",
  formatCliCommand(`openclaw pairing approve ${channel} <code>`),
].join("\n");
```

**修改后：**

```typescript
// src/pairing/pairing-messages.ts
import { t } from "../i18n/index.js";

return [
  t("pairing.request.title"),
  "",
  t("pairing.request.idLine", { id: idLine }),
  "",
  t("pairing.request.code", { code }),
  "",
  t("pairing.request.instruction"),
  formatCliCommand(`openclaw pairing approve ${channel} <code>`),
].join("\n");
```

### 3.4 频道消息迁移

**修改前：**

```typescript
// src/slack/monitor/slash.ts
text: "This channel is not allowed.",
text: "Slack DMs are disabled.",
```

**修改后：**

```typescript
// src/slack/monitor/slash.ts
import { t } from "../../i18n/index.js";

text: t('channel.slack.notAllowed'),
text: t('channel.slack.dmsDisabled'),
```

---

## 4. 配置集成

### 4.1 配置类型扩展

```typescript
// src/config/types.ts

export interface OpenClawConfig {
  // ... 现有配置

  /** 界面语言 */
  lang?: string; // 'zh-CN' | 'en' | etc.
}
```

### 4.2 初始化集成

```typescript
// src/cli/program/build-program.ts

import { initializeI18n } from "../../i18n/config.js";

export async function buildProgram() {
  // 初始化 i18n（从环境变量或配置读取语言）
  await initializeI18n();

  const program = new Command();
  // ... 其余设置
}
```

### 4.3 环境变量

```bash
# 通过环境变量设置语言
export OPENCLAW_LANG=zh-CN

# 或通过配置文件 ~/.openclaw/openclaw.json
{
  "lang": "zh-CN",
  "gateway": { ... }
}
```

---

## 5. 辅助工具脚本

### 5.1 自动提取脚本（`scripts/extract-i18n-keys.ts`）

```typescript
#!/usr/bin/env node --import tsx
// scripts/extract-i18n-keys.ts

import { glob } from "glob";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

/**
 * 自动提取代码中的硬编码文本
 * 用于生成语言包模板
 */

const DESCRIPTION_PATTERN = /\.description\(["'`]([^"'`]+)["'`]\)/g;
const MESSAGE_PATTERN = /message:\s*["'`]([^"'`]+)["'`]/g;
const TEXT_PATTERN = /text:\s*["'`]([^"'`]+)["'`]/g;
const LABEL_PATTERN = /label:\s*["'`]([^"'`]+)["'`]/g;
const NOTE_PATTERN = /\.note\(["'`]([^"'`]+)["'`]/g;

async function extractKeys() {
  const files = await glob("src/**/*.ts");
  const keys: Record<string, { text: string; file: string }[]> = {
    description: [],
    message: [],
    text: [],
    label: [],
    note: [],
  };

  for (const file of files) {
    const content = await readFile(file, "utf-8");

    // 提取 .description()
    let match;
    while ((match = DESCRIPTION_PATTERN.exec(content)) !== null) {
      keys.description.push({ text: match[1], file });
    }

    // 提取 message:
    while ((match = MESSAGE_PATTERN.exec(content)) !== null) {
      keys.message.push({ text: match[1], file });
    }

    // 提取 text:
    while ((match = TEXT_PATTERN.exec(content)) !== null) {
      keys.text.push({ text: match[1], file });
    }

    // 提取 label:
    while ((match = LABEL_PATTERN.exec(content)) !== null) {
      keys.label.push({ text: match[1], file });
    }

    // 提取 .note()
    while ((match = NOTE_PATTERN.exec(content)) !== null) {
      keys.note.push({ text: match[1], file });
    }
  }

  // 生成报告
  const report = [
    "# 提取的 i18n 键",
    "",
    `生成时间: ${new Date().toISOString()}`,
    "",
    "## 统计",
    `- description: ${keys.description.length}`,
    `- message: ${keys.message.length}`,
    `- text: ${keys.text.length}`,
    `- label: ${keys.label.length}`,
    `- note: ${keys.note.length}`,
    "",
    "## 详情",
    "",
    ...Object.entries(keys).flatMap(([type, items]) => [
      `### ${type}`,
      ...items.map((item) => `- [ ] \`${item.text}\` (${item.file})`),
      "",
    ]),
  ].join("\n");

  await writeFile("i18n-extraction-report.md", report);
  console.log("报告已生成: i18n-extraction-report.md");
}

extractKeys().catch(console.error);
```

### 5.2 验证脚本（`src/i18n/scripts/validate.ts`）

```typescript
// src/i18n/scripts/validate.ts

import { zhCN } from "../locales/zh-CN/index.js";
import { en } from "../locales/en/index.js";

export function validateTranslations(): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const enKeys = Object.keys(en);
  const zhKeys = Object.keys(zhCN);

  // 检查缺失的中文翻译
  const missingInZh = enKeys.filter((key) => !zhKeys.includes(key));
  if (missingInZh.length > 0) {
    issues.push(`简体中文缺少 ${missingInZh.length} 个键：`);
    issues.push(...missingInZh.map((k) => `  - ${k}`));
  }

  // 检查多余的中文键
  const extraInZh = zhKeys.filter((key) => !enKeys.includes(key));
  if (extraInZh.length > 0) {
    issues.push(`简体中文有 ${extraInZh.length} 个多余的键：`);
    issues.push(...extraInZh.map((k) => `  - ${k}`));
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateTranslations();
  if (result.valid) {
    console.log("✓ 所有翻译键都有效");
  } else {
    console.error("✗ 发现以下问题：\n");
    result.issues.forEach((issue) => console.error(issue));
    process.exit(1);
  }
}
```

---

## 6. 实施时间表

### 6.1 详细计划

| 阶段        | 任务                | 预计时间     | 产出                   |
| ----------- | ------------------- | ------------ | ---------------------- |
| **Phase 1** | 基础设施搭建        | 1-2 天       | i18n 框架可用          |
|             | - 创建目录结构      | 2 小时       | `src/i18n/` 目录       |
|             | - 实现核心 API      | 4 小时       | `t()` 函数可用         |
|             | - 创建英文 fallback | 4 小时       | `locales/en/` 完整     |
|             | - 编写类型定义      | 2 小时       | 类型安全保证           |
|             | - 编写测试          | 2 小时       | 单元测试通过           |
| **Phase 2** | CLI 命令描述        | 2-3 天       | CLI 完全汉化           |
|             | - 提取 CLI 文本     | 4 小时       | 150+ 条 key            |
|             | - 创建中文语言包    | 6 小时       | `zh-CN/cli.ts`         |
|             | - 修改 CLI 文件     | 8 小时       | 92 个文件更新          |
|             | - 测试验证          | 2 小时       | `openclaw --help` 正常 |
| **Phase 3** | 向导流程            | 2-3 天       | 向导完全汉化           |
|             | - 提取向导文本      | 4 小时       | 200+ 条 key            |
|             | - 创建中文语言包    | 8 小时       | `zh-CN/wizard.ts`      |
|             | - 修改向导文件      | 6 小时       | 10 个文件更新          |
|             | - 测试验证          | 2 小时       | 向导流程正常           |
| **Phase 4** | 配对消息            | 1 天         | 配对完全汉化           |
|             | - 提取配对文本      | 2 小时       | 30+ 条 key             |
|             | - 创建中文语言包    | 3 小时       | `zh-CN/pairing.ts`     |
|             | - 修改配对文件      | 2 小时       | 5 个文件更新           |
|             | - 测试验证          | 1 小时       | 配对流程正常           |
| **Phase 5** | 命令提示            | 2 天         | 命令提示汉化           |
|             | - 提取提示文本      | 3 小时       | 100+ 条 key            |
|             | - 创建中文语言包    | 5 小时       | 补充到各文件           |
|             | - 修改命令文件      | 6 小时       | 50 个文件更新          |
|             | - 测试验证          | 2 小时       | 命令执行正常           |
| **Phase 6** | 频道消息            | 3-4 天       | 频道消息汉化           |
|             | - 提取频道文本      | 6 小时       | 200+ 条 key            |
|             | - 创建中文语言包    | 10 小时      | `zh-CN/channels.ts`    |
|             | - 修改频道文件      | 10 小时      | 30 个文件更新          |
|             | - 测试验证          | 4 小时       | 消息发送正常           |
| **Phase 7** | 测试与优化          | 2-3 天       | 项目稳定               |
|             | - 完整测试          | 8 小时       | 测试套件通过           |
|             | - 性能优化          | 4 小时       | 无性能退化             |
|             | - 文档编写          | 4 小时       | 迁移文档完成           |
|             | - 回归测试          | 4 小时       | 无回归问题             |
| **总计**    | **全部完成**        | **13-18 天** | **完全汉化**           |

### 6.2 里程碑

- **M1（第 2 天）**：i18n 框架搭建完成，可以使用 `t()` 函数
- **M2（第 5 天）**：CLI 和向导汉化完成，用户可见主要文本已汉化
- **M3（第 9 天）**：配对和命令提示汉化完成，交互体验完整
- **M4（第 14 天）**：所有文本汉化完成，进入测试阶段
- **M5（第 18 天）**：全部完成，可以发布

---

## 7. 风险评估与对策

### 7.1 风险识别

| 风险     | 概率 | 影响 | 对策                           |
| -------- | ---- | ---- | ------------------------------ |
| 文本遗漏 | 高   | 中   | 使用自动提取脚本，建立检查清单 |
| 插值错误 | 中   | 高   | 添加类型检查，单元测试覆盖     |
| 性能下降 | 低   | 中   | 语言包预加载，缓存翻译结果     |
| 代码冲突 | 中   | 中   | 分模块逐步迁移，及时 rebase    |
| 翻译质量 | 中   | 中   | 使用专业术语表，同行评审       |

### 7.2 质量保证

1. **类型安全**：使用 TypeScript 类型确保 key 存在
2. **自动化测试**：单元测试覆盖所有翻译函数
3. **回归测试**：每次修改后运行完整测试套件
4. **代码审查**：所有翻译修改需通过 PR 审查
5. **静态检查**：添加 ESLint 规则禁止硬编码文本

---

## 8. 最佳实践

### 8.1 命名规范

```typescript
// 使用点分命名，模块.组件.含义
"cli.plugins.description"; // CLI-插件-描述
"wizard.onboarding.mode"; // 向导-入门-模式
"pairing.request.code"; // 配对-请求-验证码
"channel.discord.notAllowed"; // 频道-Discord-不允许
"error.config.invalid"; // 错误-配置-无效
"common.status.loading"; // 通用-状态-加载中
```

### 8.2 文本组织原则

1. **就近原则**：文本放在使用它的模块对应的语言文件中
2. **复用原则**：通用文本放在 `common.ts`，避免重复
3. **上下文原则**：相同英文在不同上下文可能有不同中文
4. **动态原则**：使用插值而非拼接，如 `{count}` 而非 `+` 操作

### 8.3 代码审查清单

- [ ] 所有用户可见文本都使用 `t()` 函数
- [ ] 新增 key 已添加到英文和中文语言包
- [ ] 插值参数正确使用，无潜在 XSS
- [ ] 翻译质量检查（无错别字，语气一致）
- [ ] 单元测试通过
- [ ] 类型检查通过

---

## 9. 附录

### 9.1 术语表

| 英文       | 中文   | 说明                        |
| ---------- | ------ | --------------------------- |
| Gateway    | 网关   | WebSocket 服务端            |
| Agent      | 代理   | AI 代理实例                 |
| Channel    | 频道   | 消息渠道（Discord/Slack等） |
| Plugin     | 插件   | 功能扩展模块                |
| Skill      | 技能   | 特定功能能力                |
| Hook       | 钩子   | 事件拦截器                  |
| Pairing    | 配对   | DM 访问授权流程             |
| Onboarding | 入门   | 初始化向导                  |
| Workspace  | 工作区 | 项目工作目录                |
| Session    | 会话   | 对话上下文                  |
| Tool       | 工具   | AI 可调用的功能             |
| Sandbox    | 沙箱   | 隔离执行环境                |

### 9.2 参考资料

- [Commander.js 文档](https://github.com/tj/commander.js/)
- [TypeScript 模板字面量类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [i18n 最佳实践](https://github.com/i18next/i18next)

### 9.3 相关文件

- 配置：`src/config/config.ts`
- CLI 入口：`src/cli/program/build-program.ts`
- 向导：`src/wizard/onboarding.ts`
- 配对：`src/pairing/pairing-messages.ts`

---

**制定人：** OpenClaw 汉化项目组  
**审核人：** [待填写]  
**批准人：** [待填写]  
**最后更新：** 2026-02-01

---

## 快速开始

如果你要立刻开始实施，按以下顺序：

1. **第一天**：阅读本方案，创建 `src/i18n/` 目录，实现核心 API
2. **第二天**：提取 CLI 文本，创建语言包，修改 `src/cli/` 文件
3. **第三天**：提取向导文本，修改 `src/wizard/` 和 `src/commands/` 文件
4. **第四天**：测试、修复问题、编写文档
5. **第五天**：代码审查、合并、发布

**祝你汉化顺利！**
