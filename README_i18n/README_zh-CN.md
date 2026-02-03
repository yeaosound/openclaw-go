# 🚀 OpenClaw Go

**私有化部署的 AI 智能助手，完整中文本地化 + 性能优化。**

> 🌍 **Go** = **Global** + **Optimized**
>
> 全球化支持 · 性能优化 · 多语言适配

<p align="center">
  <a href="https://github.com/yeaosound/openclaw-go"><img src="https://img.shields.io/github/v/release/yeaosound/openclaw-go?style=for-the-badge&logo=github&label=版本" alt="GitHub Release"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-≥22-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Version"></a>
  <a href="https://github.com/yeaosound/openclaw-go"><img src="https://img.shields.io/github/stars/yeaosound/openclaw-go?style=for-the-badge&logo=github&label=Stars" alt="GitHub Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/许可证-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

<p align="center">
  <a href="../README.md">🇺🇸 English</a> · <b>🌐 简体中文</b> · <a href="./README_zh-HK.md">香港粵語</a> · <a href="./README_zh-TW.md">繁體中文</a>
</p>

<p align="center">
  <a href="#-快速开始">🚀 快速开始</a> ·
  <a href="#-特性">✨ 特性</a> ·
  <a href="#-安装">📦 安装</a> ·
  <a href="#-文档">📚 文档</a> ·
  <a href="https://github.com/yeaosound/openclaw-go/issues">💬 反馈</a>
</p>

---

## 📝 关于本项目

**OpenClaw Go** 是基于 [OpenClaw](https://github.com/openclaw/openclaw) 的优化分支：

- **Go** = **Global** + **Optimized**
  - 🌍 **Global**：全球化支持，多语言适配
  - ⚡ **Optimized**：性能优化，代码结构优化
- 🇨🇳 **完整中文化** - CLI、Web 界面、配置向导全部汉化
- 🌏 **多语言支持** - 计划支持简体中文、繁体中文、英语及更多语言
- 🔄 **上游同步** - 定期合并上游安全修复和功能更新

> 💡 **注意**：本项目使用 Node.js/TypeScript 开发，"Go" 代表 Global + Optimized，不是 Go 语言。

---

## ✨ 特性

- **🇨🇳 完整中文化** — CLI、Web 控制界面、配置向导全部汉化（634+ 翻译条目）
- **🏠 本地优先** — 数据存储在你自己的设备上，隐私可控
- **📱 多渠道支持** — WhatsApp、Telegram、Slack、Discord、Signal、iMessage、Google Chat、Microsoft Teams
- **🎙️ 语音交互** — macOS/iOS/Android 语音唤醒和对话
- **🖼️ Canvas 画布** — 智能体驱动的可视化工作区
- **🔧 技能扩展** — 内置技能 + 自定义工作区技能
- **🔒 安全默认** — DM 配对验证、沙箱隔离、执行审批

---

## 🚀 快速开始

**环境要求：** Node.js ≥ 22

\`\`\`bash
# 安装
npm install -g openclaw-go@latest

# 运行安装向导
openclaw-go onboard --install-daemon

# 启动网关
openclaw-go gateway --port 18789 --verbose
\`\`\`

> 💡 **兼容性**：旧版本 \`clawdbot\` 命令仍然可用。

---

## 📦 安装

### npm（推荐）

\`\`\`bash
npm install -g openclaw-go@latest
# 或
pnpm add -g openclaw-go@latest
\`\`\`

### 从源码构建

\`\`\`bash
git clone https://github.com/yeaosound/openclaw-go.git
cd openclaw-go

pnpm install
pnpm ui:build
pnpm build

pnpm openclaw-go onboard --install-daemon
\`\`\`

---

## 🔧 配置

最小配置 \`~/.openclaw/openclaw.json\`：

\`\`\`json
{
  "agent": {
    "model": "anthropic/claude-opus-4-5"
  },
  "lang": "zh-CN"
}
\`\`\`

**语言设置**：
- 环境变量：\`OPENCLAW_LANG=zh-CN\`
- 配置文件：\`lang\` 字段
- 支持语言：
  - \`en\` - English (英语)
  - \`zh-CN\` - 简体中文 (Simplified Chinese)
  - \`zh-TW\` - 繁體中文 (Traditional Chinese, 计划中)

---

## 📚 文档

- [上游官方文档](https://docs.openclaw.ai)
- [快速开始指南](https://docs.openclaw.ai/start/getting-started)
- [Gateway 配置](https://docs.openclaw.ai/gateway/configuration)
- [渠道接入](https://docs.openclaw.ai/channels)
- [技能开发](https://docs.openclaw.ai/tools/skills)

**多语言文档**：
- 📘 [English](../README.md)
- 📕 简体中文 (本文档)
- 📙 [香港粵語](./README_zh-HK.md) (计划中)
- 📗 [繁體中文](./README_zh-TW.md) (计划中)

---

## 🔄 版本同步

本项目基于 [openclaw/openclaw](https://github.com/openclaw/openclaw) 进行优化和中文本地化，定期与上游保持同步。

**已合并上游更新**：
- ✅ SSRF 安全修复
- ✅ 关键安全修复（LFI、代码执行阻止）
- ✅ 网关功能改进（时间戳、路由）
- ✅ Agent 和 Channel Bug 修复
- ✅ 代码风格统一（import 排序）

**版本格式**：\`vYYYY.M.D-go.N\`（如 \`v2026.2.3-go.1\`）

---

## 🛠️ i18n 国际化

本项目已实现完整的多语言国际化支持：

### 已支持语言
- 🇺🇸 **英语** (en)
- 🇨🇳 **简体中文** (zh-CN) - 634+ 翻译条目

### 计划支持
- 🇹🇼 **繁体中文** (zh-TW)
- 🇯🇵 **日语** (ja)
- 🇰🇷 **韩语** (ko)
- 🇫🇷 **法语** (fr)
- 更多语言欢迎贡献！

### 实现结构
- **后端 i18n** (\`src/i18n/\`)：
  - CLI 命令和提示
  - 配置向导
  - 配对消息
  - 通道配置
  
- **前端 i18n** (\`ui/src/i18n/\`)：基于 i18next
  - Web 控制界面
  - 语言切换器

**使用示例**：
\`\`\`typescript
import { t, setLocale, getAvailableLocales } from './i18n/index.js';

// 查看可用语言
console.log(getAvailableLocales()); // ['en', 'zh-CN', 'zh-TW', ...]

// 设置语言
setLocale('zh-CN');  // 简体中文
// setLocale('zh-TW');  // 繁体中文

// 获取翻译
console.log(t('cli.plugins.description'));
// => "管理 OpenClaw 插件/扩展"

// 插值
console.log(t('common.status.loading', { item: 'gateway' }));
// => "正在加载 gateway..."
\`\`\`

---

## 🤝 参与贡献

欢迎提交 Issue 和 PR！

- 🐛 Bug 修复和功能优化
- 🌐 翻译改进（中文/其他语言）
- 📖 文档完善
- 🔌 国内渠道适配

**贡献指南**：
- 遵循上游代码风格（已配置 oxfmt）
- 提交前运行 \`pnpm lint\` 和 \`pnpm build\`
- 如需添加翻译，请参考 \`src/i18n/locales/\` 结构

---

## 📋 开发计划

### 已完成 ✅
- [x] CLI 界面汉化
- [x] Web 控制界面汉化
- [x] 配置向导汉化
- [x] 语言切换功能
- [x] 上游版本同步机制
- [x] 简体中文 (zh-CN) 完整支持

### 进行中 🚧
- [ ] 繁体中文 (zh-TW) 支持
- [ ] 日语 (ja) 支持
- [ ] 韩语 (ko) 支持

### 计划中 📅
- [ ] 国内渠道适配（飞书、钉钉、企业微信）
- [ ] 更多语言支持（法语、德语、西班牙语等）
- [ ] 翻译贡献者社区建设

---

## 🏗️ 项目结构

\`\`\`
openclaw-go/
├── src/
│   ├── i18n/              # 国际化核心模块
│   │   ├── locales/       # 语言包
│   │   │   ├── en/        # 英语
│   │   │   ├── zh-CN/     # 简体中文
│   │   │   └── zh-TW/     # 繁体中文 (计划中)
│   │   ├── index.ts       # 翻译函数
│   │   └── config.ts      # 初始化配置
│   ├── commands/          # CLI 命令
│   ├── channels/          # 渠道集成
│   └── ...
├── ui/
│   └── src/i18n/          # 前端国际化
├── extensions/            # 扩展插件
├── README_i18n/           # 多语言 README 文件
│   ├── README_zh-CN.md    # 简体中文 (本文档)
│   ├── README_zh-TW.md    # 繁體中文 (计划中)
│   └── ...
└── ...
\`\`\`

---

## 📄 许可证

[MIT](LICENSE)

基于 [OpenClaw](https://github.com/openclaw/openclaw) 开发，感谢原项目开发者 🦞

---

## ⭐ Star 趋势

<a href="https://star-history.com/#yeaosound/openclaw-go&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date" />
 </picture>
</a>

---

<p align="center">
  基于 <a href="https://github.com/openclaw/openclaw">OpenClaw</a> · 感谢原项目开发者 🚀
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/yeaosound">yeaosound</a>
</p>
