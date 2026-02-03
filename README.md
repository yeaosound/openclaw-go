# 🚀 OpenClaw Go

**Self-hosted AI assistant with complete Chinese localization and performance optimization.**

> 🌍 **Go** = **Global** + **Optimized**
>
> Global Support · Performance Optimized · Multi-language Ready

<p align="center">
  <a href="https://github.com/yeaosound/openclaw-go"><img src="https://img.shields.io/github/v/release/yeaosound/openclaw-go?style=for-the-badge&logo=github&label=Version" alt="GitHub Release"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-≥22-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Version"></a>
  <a href="https://github.com/yeaosound/openclaw-go"><img src="https://img.shields.io/github/stars/yeaosound/openclaw-go?style=for-the-badge&logo=github&label=Stars" alt="GitHub Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

<p align="center">
  🌐 <b>English</b> · <a href="./README_i18n/README_zh-CN.md">简体中文</a> · <a href="./README_i18n/README_zh-HK.md">香港粵語</a> · <a href="./README_i18n/README_zh-TW.md">繁體中文</a>
</p>

<p align="center">
  <a href="#-quick-start">🚀 Quick Start</a> ·
  <a href="#-features">✨ Features</a> ·
  <a href="#-installation">📦 Installation</a> ·
  <a href="#-documentation">📚 Documentation</a> ·
  <a href="https://github.com/yeaosound/openclaw-go/issues">💬 Feedback</a>
</p>

---

## 📝 About This Project

**OpenClaw Go** is an optimized fork of [OpenClaw](https://github.com/openclaw/openclaw):

- **Go** = **Global** + **Optimized**
  - 🌍 **Global**: Global support, multi-language adaptation
  - ⚡ **Optimized**: Performance optimization, improved code structure
- 🇨🇳 **Complete Chinese Localization** - CLI, Web UI, and configuration wizard fully translated
- 🌏 **Multi-language Support** - Planned support for Simplified Chinese, Traditional Chinese, English, and more
- 🔄 **Upstream Sync** - Regularly merges security fixes and feature updates from upstream

> 💡 **Note**: This project is developed with Node.js/TypeScript. "Go" stands for Global + Optimized, not the Go programming language.

---

## ✨ Features

- **🇨🇳 Complete Chinese Localization** — CLI, Web control panel, and configuration wizard fully translated (634+ translation entries)
- **🏠 Local-first** — Data stored on your own device, privacy under your control
- **📱 Multi-channel Support** — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Google Chat, Microsoft Teams
- **🎙️ Voice Interaction** — Voice wake and conversation on macOS/iOS/Android
- **🖼️ Canvas Workspace** — Agent-driven visual workspace
- **🔧 Skill Extensions** — Built-in skills + custom workspace skills
- **🔒 Security by Default** — DM pairing verification, sandbox isolation, execution approval

---

## 🚀 Quick Start

**Requirements:** Node.js ≥ 22

\`\`\`bash
# Install
npm install -g openclaw-go@latest

# Run setup wizard
openclaw-go onboard --install-daemon

# Start gateway
openclaw-go gateway --port 18789 --verbose
\`\`\`

> 💡 **Compatibility**: Old \`clawdbot\` commands remain available.

---

## 📦 Installation

### npm (Recommended)

\`\`\`bash
npm install -g openclaw-go@latest
# or
pnpm add -g openclaw-go@latest
\`\`\`

### Build from Source

\`\`\`bash
git clone https://github.com/yeaosound/openclaw-go.git
cd openclaw-go

pnpm install
pnpm ui:build
pnpm build

pnpm openclaw-go onboard --install-daemon
\`\`\`

---

## 🔧 Configuration

Minimal configuration in \`~/.openclaw/openclaw.json\`:

\`\`\`json
{
  "agent": {
    "model": "anthropic/claude-opus-4-5"
  },
  "lang": "zh-CN"
}
\`\`\`

**Language Settings**:
- Environment variable: \`OPENCLAW_LANG=zh-CN\`
- Config file: \`lang\` field
- Supported languages:
  - \`en\` - English
  - \`zh-CN\` - 简体中文 (Simplified Chinese)
  - \`zh-HK\` - 香港粵語 (Hong Kong Cantonese, planned)
  - \`zh-TW\` - 繁體中文 (Traditional Chinese, planned)

---

## 📚 Documentation

- [Upstream Official Documentation](https://docs.openclaw.ai)
- [Quick Start Guide](https://docs.openclaw.ai/start/getting-started)
- [Gateway Configuration](https://docs.openclaw.ai/gateway/configuration)
- [Channel Integration](https://docs.openclaw.ai/channels)
- [Skill Development](https://docs.openclaw.ai/tools/skills)

**Languages**:
- 📘 [English](./README.md) (this file)
- 📕 [简体中文](./README_i18n/README_zh-CN.md)
- 📙 [香港粵語](./README_i18n/README_zh-HK.md) (planned)
- 📗 [繁體中文](./README_i18n/README_zh-TW.md) (planned)

---

## 🔄 Version Sync

This project is based on [openclaw/openclaw](https://github.com/openclaw/openclaw) with optimization and Chinese localization, regularly synchronized with upstream.

**Merged upstream updates**:
- ✅ SSRF security fixes
- ✅ Critical security fixes (LFI, code execution prevention)
- ✅ Gateway feature improvements (timestamps, routing)
- ✅ Agent and Channel bug fixes
- ✅ Unified code style (import sorting)

**Version format**: \`vYYYY.M.D-go.N\` (e.g., \`v2026.2.3-go.1\`)

---

## 🛠️ i18n Internationalization

This project implements complete multi-language internationalization support:

### Supported Languages
- 🇺🇸 **English** (en)
- 🇨🇳 **Simplified Chinese** (zh-CN) - 634+ translation entries

### Planned Support
- 🇭🇰 **Hong Kong Cantonese** (zh-HK) - Written Cantonese
- 🇹🇼 **Traditional Chinese** (zh-TW)
- 🇯🇵 **Japanese** (ja)
- 🇰🇷 **Korean** (ko)
- 🇫🇷 **French** (fr)
- More languages welcome!

### Implementation Structure
- **Backend i18n** (\`src/i18n/\`):
  - CLI commands and prompts
  - Configuration wizard
  - Pairing messages
  - Channel configuration
  
- **Frontend i18n** (\`ui/src/i18n/\`): Based on i18next
  - Web control panel
  - Language switcher

**Usage Example**:
\`\`\`typescript
import { t, setLocale, getAvailableLocales } from './i18n/index.js';

// Check available languages
console.log(getAvailableLocales()); // ['en', 'zh-CN', 'zh-TW', ...]

// Set language
setLocale('zh-CN');  // Simplified Chinese
// setLocale('zh-TW');  // Traditional Chinese

// Get translation
console.log(t('cli.plugins.description'));
// => "管理 OpenClaw 插件/扩展"

// Interpolation
console.log(t('common.status.loading', { item: 'gateway' }));
// => "正在加载 gateway..."
\`\`\`

---

## 🤝 Contributing

Issues and PRs welcome!

- 🐛 Bug fixes and feature optimizations
- 🌐 Translation improvements (Chinese/other languages)
- 📖 Documentation improvements
- 🔌 Domestic channel adaptation

**Contribution Guidelines**:
- Follow upstream code style (oxfmt configured)
- Run \`pnpm lint\` and \`pnpm build\` before submitting
- For translations, refer to \`src/i18n/locales/\` structure

---

## 📋 Development Roadmap

### Completed ✅
- [x] CLI interface localization
- [x] Web control panel localization
- [x] Configuration wizard localization
- [x] Language switching feature
- [x] Upstream version sync mechanism
- [x] Simplified Chinese (zh-CN) full support

### In Progress 🚧
- [ ] Hong Kong Cantonese (zh-HK) support - Written Cantonese
- [ ] Traditional Chinese (zh-TW) support
- [ ] Japanese (ja) support
- [ ] Korean (ko) support

### Planned 📅
- [ ] Domestic channel adaptation (Lark/Feishu, DingTalk, WeCom)
- [ ] More language support (French, German, Spanish, etc.)
- [ ] Translation contributor community building

---

## 🏗️ Project Structure

\`\`\`
openclaw-go/
├── src/
│   ├── i18n/              # Internationalization core module
│   │   ├── locales/       # Language packs
│   │   │   ├── en/        # English
│   │   │   ├── zh-CN/     # Simplified Chinese
│   │   │   ├── zh-HK/     # Hong Kong Cantonese (planned)
│   │   │   └── zh-TW/     # Traditional Chinese (planned)
│   │   ├── index.ts       # Translation functions
│   │   └── config.ts      # Initialization config
│   ├── commands/          # CLI commands
│   ├── channels/          # Channel integrations
│   └── ...
├── ui/
│   └── src/i18n/          # Frontend i18n
├── extensions/            # Extension plugins
├── README_i18n/           # Multi-language README files
│   ├── README_zh-CN.md    # 简体中文
│   ├── README_zh-HK.md    # Hong Kong Cantonese (planned)
│   ├── README_zh-TW.md    # 繁體中文 (planned)
│   └── ...
└── ...
\`\`\`

---

## 📄 License

[MIT](LICENSE)

Based on [OpenClaw](https://github.com/openclaw/openclaw). Thanks to the original developers 🦞

---

## ⭐ Star History

<a href="https://star-history.com/#yeaosound/openclaw-go&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date" />
 </picture>
</a>

---

<p align="center">
  Based on <a href="https://github.com/openclaw/openclaw">OpenClaw</a> · Thanks to the original developers 🚀
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/yeaosound">yeaosound</a>
</p>
