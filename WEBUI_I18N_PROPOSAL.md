# OpenClaw WebUI i18n 技术方案

**版本**: 1.0  
**日期**: 2026-02-02  
**状态**: 已批准，准备实施

---

## 1. 项目概述

### 1.1 背景
- CLI onboarding 翻译已完成 (95%)
- WebUI 仍有大量硬编码英文文本
- WebUI 与 CLI 是不同场景，需要独立 i18n 方案

### 1.2 目标
- 实现 WebUI 完整中文本地化
- 支持中英文实时切换
- 记住用户语言偏好

### 1.3 范围
- **包含**: `ui/src/ui/views/` 下 34 个视图文件
- **预估文本量**: 300-500 个翻译键
- **预估工作量**: 17-25 小时

---

## 2. 技术架构

### 2.1 技术栈

| 组件 | 库 | 版本 | 用途 |
|------|-----|------|------|
| i18n 引擎 | `i18next` | ^24.x | 核心翻译功能 |
| 语言检测 | `i18next-browser-languagedetector` | latest | 自动检测浏览器语言 |
| 持久化 | `i18next-localstorage-backend` | latest | 记住用户选择 |
| Lit 集成 | 自研指令 | - | lit 模板指令封装 |

### 2.2 目录结构

```
ui/
├── src/
│   ├── i18n/                    # 新增：WebUI i18n 模块
│   │   ├── index.ts             # 初始化 i18next
│   │   ├── config.ts            # i18next 配置
│   │   ├── lit.ts               # lit 指令封装
│   │   └── locales/             # 翻译文件
│   │       ├── en/              # 英文
│   │       │   ├── common.json
│   │       │   ├── views.json
│   │       │   └── chat.json
│   │       └── zh-CN/           # 中文
│   │           ├── common.json
│   │           ├── views.json
│   │           └── chat.json
│   └── ui/
│       ├── components/          # 新增：语言切换组件
│       │   └── language-switcher.ts
│       └── views/
│           └── *.ts             # 使用 t() 函数
```

---

## 3. 实施方案

### 3.1 阶段 A: 基础设施 (3-4小时)

#### A1. 安装依赖
```bash
cd /root/openclaw-cn/ui
npm install i18next i18next-browser-languagedetector
```

#### A2. 创建 i18n 配置

**文件**: `ui/src/i18n/config.ts`

```typescript
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const i18n = i18next.createInstance();

export async function initI18n() {
  await i18n
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh-CN'],
      defaultNS: 'common',
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      resources: {}
    });
}

export function changeLanguage(lng: string) {
  return i18n.changeLanguage(lng);
}

export function getCurrentLanguage(): string {
  return i18n.language;
}
```

#### A3. Lit 指令封装

**文件**: `ui/src/i18n/lit.ts`

```typescript
import { directive, AsyncDirective } from 'lit/async-directive.js';
import { i18n } from './config.js';

class TranslateDirective extends AsyncDirective {
  private key: string = '';
  private options?: Record<string, string>;

  render(key: string, options?: Record<string, string>) {
    if (key !== this.key || JSON.stringify(options) !== JSON.stringify(this.options)) {
      this.key = key;
      this.options = options;
      
      // 初始值
      const value = i18n.t(key, options);
      
      // 监听语言变化
      i18n.on('languageChanged', () => {
        this.setValue(i18n.t(this.key, this.options));
      });
      
      return value;
    }
    return i18n.t(key, options);
  }
}

export const t = directive(TranslateDirective);
```

#### A4. 初始化入口

**文件**: `ui/src/main.ts` (修改)

```typescript
import { initI18n } from './i18n/config.js';

// 在应用启动前初始化 i18n
await initI18n();

// 然后启动应用
app.start();
```

---

### 3.2 阶段 B: 翻译文件 (4-6小时)

#### B1. 扫描提取文案

```bash
# 提取所有硬编码文本
grep -rh '">[^<]\{3,100\}<' ui/src/ui/views/ | \
  sed 's/.*>\([^<]*\)<.*/\1/' | \
  sort -u > /tmp/webui_texts.txt
```

#### B2. 创建翻译文件

**文件**: `ui/src/i18n/locales/en/common.json`

```json
{
  "appName": "OpenClaw",
  "loading": "Loading…",
  "refresh": "Refresh",
  "save": "Save",
  "cancel": "Cancel",
  "confirm": "Confirm",
  "delete": "Delete",
  "edit": "Edit",
  "create": "Create",
  "search": "Search",
  "filter": "Filter",
  "yes": "Yes",
  "no": "No",
  "enabled": "Enabled",
  "disabled": "Disabled",
  "configured": "Configured",
  "notConfigured": "Not configured",
  "running": "Running",
  "stopped": "Stopped",
  "connected": "Connected",
  "disconnected": "Disconnected",
  "error": "Error",
  "warning": "Warning",
  "success": "Success",
  "info": "Info"
}
```

**文件**: `ui/src/i18n/locales/zh-CN/common.json`

```json
{
  "appName": "OpenClaw",
  "loading": "加载中…",
  "refresh": "刷新",
  "save": "保存",
  "cancel": "取消",
  "confirm": "确认",
  "delete": "删除",
  "edit": "编辑",
  "create": "创建",
  "search": "搜索",
  "filter": "筛选",
  "yes": "是",
  "no": "否",
  "enabled": "已启用",
  "disabled": "已禁用",
  "configured": "已配置",
  "notConfigured": "未配置",
  "running": "运行中",
  "stopped": "已停止",
  "connected": "已连接",
  "disconnected": "已断开",
  "error": "错误",
  "warning": "警告",
  "success": "成功",
  "info": "信息"
}
```

#### B3. 视图翻译文件

**文件**: `ui/src/i18n/locales/en/views.json`

```json
{
  "overview": {
    "title": "Overview",
    "gatewayAccess": "Gateway Access",
    "webSocketUrl": "WebSocket URL",
    "gatewayToken": "Gateway Token",
    "password": "Password (not stored)",
    "defaultSessionKey": "Default Session Key",
    "connect": "Connect",
    "refresh": "Refresh",
    "snapshot": "Snapshot",
    "status": "Status",
    "uptime": "Uptime",
    "tickInterval": "Tick Interval",
    "lastChannelsRefresh": "Last Channels Refresh",
    "instances": "Instances",
    "sessions": "Sessions",
    "cron": "Cron"
  },
  "channels": {
    "title": "Channels",
    "health": "Channel Health",
    "configured": "Configured",
    "running": "Running",
    "connected": "Connected",
    "lastStart": "Last Start",
    "lastProbe": "Last Probe",
    "lastInbound": "Last Inbound"
  },
  "chat": {
    "placeholder": "Message (↩ to send, Shift+↩ for line breaks, paste images)",
    "placeholderDisconnected": "Connect to the gateway to start chatting…",
    "send": "Send",
    "queue": "Queue",
    "stop": "Stop",
    "newSession": "New Session",
    "loading": "Loading chat…",
    "queued": "Queued",
    "addMessage": "Add a message or paste more images…"
  },
  "skills": {
    "title": "Skills",
    "subtitle": "Bundled, managed, and workspace skills",
    "loading": "Loading…",
    "filter": "Filter",
    "searchPlaceholder": "Search skills",
    "shown": "{count} shown",
    "noSkills": "No skills found",
    "enable": "Enable",
    "disable": "Disable",
    "installing": "Installing…",
    "apiKey": "API key"
  },
  "cron": {
    "title": "Scheduler",
    "subtitle": "Gateway-owned cron scheduler status",
    "enabled": "Enabled",
    "jobs": "Jobs",
    "nextWake": "Next Wake",
    "refreshing": "Refreshing…",
    "newJob": "New Job",
    "name": "Name",
    "description": "Description",
    "agentId": "Agent ID",
    "enabled_label": "Enabled",
    "schedule": "Schedule",
    "every": "Every",
    "cron": "Cron",
    "session": "Session",
    "main": "Main",
    "isolated": "Isolated",
    "wakeMode": "Wake Mode",
    "nextHeartbeat": "Next heartbeat",
    "now": "Now",
    "payload": "Payload",
    "systemEvent": "System event",
    "agentTurn": "Agent turn",
    "systemText": "System text",
    "agentMessage": "Agent message",
    "deliver": "Deliver",
    "channel": "Channel",
    "timeout": "Timeout (seconds)",
    "postToMainPrefix": "Post to main prefix",
    "addJob": "Add job",
    "saving": "Saving…",
    "jobsList": "Jobs",
    "jobsSubtitle": "All scheduled jobs stored in the gateway",
    "noJobs": "No jobs yet",
    "runHistory": "Run History",
    "selectJobToInspect": "Select a job to inspect run history",
    "noRuns": "No runs yet",
    "unit": "Unit",
    "minutes": "Minutes",
    "hours": "Hours",
    "days": "Days",
    "expression": "Expression",
    "timezone": "Timezone (optional)"
  }
}
```

**文件**: `ui/src/i18n/locales/zh-CN/views.json`

```json
{
  "overview": {
    "title": "概览",
    "gatewayAccess": "网关访问",
    "webSocketUrl": "WebSocket URL",
    "gatewayToken": "网关令牌",
    "password": "密码（不存储）",
    "defaultSessionKey": "默认会话密钥",
    "connect": "连接",
    "refresh": "刷新",
    "snapshot": "快照",
    "status": "状态",
    "uptime": "运行时间",
    "tickInterval": "心跳间隔",
    "lastChannelsRefresh": "上次频道刷新",
    "instances": "实例",
    "sessions": "会话",
    "cron": "定时任务"
  },
  "channels": {
    "title": "频道",
    "health": "频道健康",
    "configured": "已配置",
    "running": "运行中",
    "connected": "已连接",
    "lastStart": "上次启动",
    "lastProbe": "上次探测",
    "lastInbound": "上次入站"
  },
  "chat": {
    "placeholder": "消息（↩ 发送，Shift+↩ 换行，可粘贴图片）",
    "placeholderDisconnected": "连接网关后开始聊天…",
    "send": "发送",
    "queue": "排队",
    "stop": "停止",
    "newSession": "新会话",
    "loading": "加载聊天中…",
    "queued": "队列中",
    "addMessage": "添加消息或粘贴更多图片…"
  },
  "skills": {
    "title": "技能",
    "subtitle": "捆绑包、托管和工作区技能",
    "loading": "加载中…",
    "filter": "筛选",
    "searchPlaceholder": "搜索技能",
    "shown": "显示 {count} 个",
    "noSkills": "未找到技能",
    "enable": "启用",
    "disable": "禁用",
    "installing": "安装中…",
    "apiKey": "API 密钥"
  },
  "cron": {
    "title": "调度器",
    "subtitle": "网关拥有的定时调度器状态",
    "enabled": "已启用",
    "jobs": "任务",
    "nextWake": "下次唤醒",
    "refreshing": "刷新中…",
    "newJob": "新建任务",
    "name": "名称",
    "description": "描述",
    "agentId": "代理 ID",
    "enabled_label": "已启用",
    "schedule": "调度",
    "every": "每",
    "cron": "Cron",
    "session": "会话",
    "main": "主会话",
    "isolated": "隔离会话",
    "wakeMode": "唤醒模式",
    "nextHeartbeat": "下次心跳",
    "now": "立即",
    "payload": "负载",
    "systemEvent": "系统事件",
    "agentTurn": "代理回合",
    "systemText": "系统文本",
    "agentMessage": "代理消息",
    "deliver": "投递",
    "channel": "频道",
    "timeout": "超时（秒）",
    "postToMainPrefix": "发布到主前缀",
    "addJob": "添加任务",
    "saving": "保存中…",
    "jobsList": "任务列表",
    "jobsSubtitle": "存储在网关中的所有定时任务",
    "noJobs": "暂无任务",
    "runHistory": "运行历史",
    "selectJobToInspect": "选择任务查看运行历史",
    "noRuns": "暂无运行记录",
    "unit": "单位",
    "minutes": "分钟",
    "hours": "小时",
    "days": "天",
    "expression": "表达式",
    "timezone": "时区（可选）"
  }
}
```

---

### 3.3 阶段 C: 代码迁移 (8-12小时)

#### C1. 批量修改示例

**文件**: `ui/src/ui/views/chat.ts` (部分)

**修改前**:
```typescript
render() {
  const placeholder = !props.session
    ? "Add a message or paste more images..."
    : "Message (↩ to send, Shift+↩ for line breaks, paste images)"
    : "Connect to the gateway to start chatting…";
  
  return html`
    <input placeholder="${placeholder}" />
    <button>${isBusy ? "Queue" : "Send"}</button>
    <button>${canAbort ? "Stop" : "New session"}</button>
  `;
}
```

**修改后**:
```typescript
import { t } from '../i18n/lit.js';

render() {
  const placeholder = !props.session
    ? t('chat.addMessage')
    : props.connected
      ? t('chat.placeholder')
      : t('chat.placeholderDisconnected');
  
  return html`
    <input placeholder="${placeholder}" />
    <button>${isBusy ? t('chat.queue') : t('chat.send')}</button>
    <button>${canAbort ? t('chat.stop') : t('chat.newSession')}</button>
  `;
}
```

#### C2. 语言切换组件

**文件**: `ui/src/ui/components/language-switcher.ts`

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { changeLanguage, getCurrentLanguage } from '../i18n/config.js';

@customElement('language-switcher')
export class LanguageSwitcher extends LitElement {
  static styles = css`
    select {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--border-color);
      background: var(--bg-color);
      color: var(--text-color);
    }
  `;

  render() {
    const currentLang = getCurrentLanguage();
    
    return html`
      <select @change="${this._onChange}">
        <option value="en" ?selected="${currentLang === 'en'}">English</option>
        <option value="zh-CN" ?selected="${currentLang === 'zh-CN'}">简体中文</option>
      </select>
    `;
  }

  private _onChange(e: Event) {
    const lang = (e.target as HTMLSelectElement).value;
    changeLanguage(lang);
  }
}
```

---

### 3.4 阶段 D: 测试验证 (2-3小时)

#### D1. 功能测试
- [ ] 页面加载时自动检测语言
- [ ] 语言切换实时生效
- [ ] 刷新后记住语言选择
- [ ] 所有视图文本正确翻译

#### D2. 边界测试
- [ ] 网络慢时加载不报错
- [ ] 翻译键缺失时显示键名
- [ ] 动态插值参数正确替换

---

## 4. 与 CLI i18n 的关系

### 4.1 不复用 CLI 翻译键的理由

| 对比项 | CLI | WebUI |
|--------|-----|-------|
| **运行环境** | Node.js | Browser |
| **用户场景** | 一次性 onboarding | 日常使用 |
| **文本风格** | 命令行风格 | 界面友好 |
| **技术栈** | 自定义 t() | i18next |
| **结构** | 扁平化 | 模块化 |

### 4.2 保持一致性

- 技术术语统一（如 "Gateway", "Channel", "Session"）
- 已翻译的 CLI 术语可作为 WebUI 参考

---

## 5. 文件清单

### 5.1 新建文件

```
ui/src/i18n/
├── config.ts                    # i18next 配置
├── index.ts                     # 导出
├── lit.ts                       # Lit 指令
└── locales/
    ├── en/
    │   ├── common.json          # 通用文本
    │   ├── views.json           # 视图文本
    │   └── chat.json            # 聊天相关
    └── zh-CN/
        ├── common.json
        ├── views.json
        └── chat.json

ui/src/ui/components/
└── language-switcher.ts         # 语言切换组件
```

### 5.2 修改文件

```
ui/src/main.ts                   # 初始化 i18n
ui/package.json                  # 添加依赖
ui/src/ui/views/*.ts             # 全部 34 个视图文件
```

---

## 6. 风险与应对

| 风险 | 影响 | 应对策略 |
|------|------|---------|
| i18next 与 Lit 集成问题 | 高 | 先验证阶段A，确保指令工作正常 |
| 翻译键数量过多 | 中 | 分阶段实施，核心视图优先 |
| 性能问题 | 低 | i18next 有缓存机制，影响可忽略 |
| 维护成本 | 中 | 建立命名规范，文档化 |

---

## 7. 验收标准

- [ ] 所有用户可见文本都有翻译
- [ ] 中英文切换无刷新延迟
- [ ] 语言选择持久化（localStorage）
- [ ] 翻译缺失时优雅降级（显示键名）
- [ ] 代码审查通过

---

## 8. 附录

### 8.1 命名规范

**翻译键命名**:
```
[模块].[组件].[元素]
例如:
- views.chat.sendButton
- common.actions.save
- cron.fields.schedule
```

### 8.2 参考链接

- [i18next 文档](https://www.i18next.com/)
- [Lit 指令文档](https://lit.dev/docs/templates/directives/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

---

**方案编制**: OpenCode  
**审核状态**: 已批准  
**实施状态**: 阶段 A 准备开始
