# 🚀 OpenClaw Go

**私有化部署嘅 AI 智能助手，完整多語言支援 + 性能優化。**

> 🌍 **Go** = **Global** + **Optimized**
>
> 全球化支援 · 性能優化 · 多語言適配

<p align="center">
  <a href="https://github.com/yeaosound/openclaw-go"><img src="https://img.shields.io/github/v/release/yeaosound/openclaw-go?style=for-the-badge&logo=github&label=版本" alt="GitHub Release"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-≥22-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Version"></a>
  <a href="https://github.com/yeaosound/openclaw-go"><img src="https://img.shields.io/github/stars/yeaosound/openclaw-go?style=for-the-badge&logo=github&label=Stars" alt="GitHub Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/牌照-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

<p align="center">
  <a href="../README.md">🇺🇸 English</a> · <a href="./README_zh-CN.md">简体中文</a> · <b>🇭🇰 香港粵語</b> · <a href="./README_zh-TW.md">繁體中文</a>
</p>

<p align="center">
  <a href="#-快速開始">🚀 快速開始</a> ·
  <a href="#-功能">✨ 功能</a> ·
  <a href="#-安裝">📦 安裝</a> ·
  <a href="#-文件">📚 文件</a> ·
  <a href="https://github.com/yeaosound/openclaw-go/issues">💬 反饋</a>
</p>

---

## 📝 關於呢個項目

**OpenClaw Go** 係基於 [OpenClaw](https://github.com/openclaw/openclaw) 嘅優化分支：

- **Go** = **Global** + **Optimized**
  - 🌍 **Global**：全球化支援，多語言適配
  - ⚡ **Optimized**：性能優化，代碼結構優化
- 🌐 **完整多語言支援** - CLI、Web 界面、配置精靈已支援 4 種語言
- 🔄 **上游同步** - 定期合併上游安全修復同功能更新

> 💡 **注意**：呢個項目用 Node.js/TypeScript 開發，"Go" 代表 Global + Optimized，唔係 Go 語言。

---

## ✨ 功能

- **🌐 多語言支援** — 完整支援英語、簡體中文、香港粵語、繁體中文（4,240+ 翻譯條目）
- **🏠 本地優先** — 數據儲喺你自己嘅設備度，私隱由你控制
- **📱 多渠道支援** — WhatsApp、Telegram、Slack、Discord、Signal、iMessage、Google Chat、Microsoft Teams
- **🎙️ 語音互動** — macOS/iOS/Android 語音喚醒同對話
- **🖼️ Canvas 畫布** — 智能體驅動嘅可視化工作區
- **🔧 技能擴展** — 內置技能 + 自訂工作區技能
- **🔒 安全預設** — DM 配對驗證、沙箱隔離、執行審批

---

## 🚀 快速開始

**環境要求：** Node.js ≥ 22

```bash
# 安裝
npm install -g openclaw-go@latest

# 運行安裝精靈
openclaw-go onboard --install-daemon

# 啟動網關
openclaw-go gateway --port 18789 --verbose
```

> 💡 **兼容性**：舊版本 `clawdbot` 指令仍然用得。

---

## 📦 安裝

### npm（推薦）

```bash
npm install -g openclaw-go@latest
# 或者
pnpm add -g openclaw-go@latest
```

### 由原始碼建置

```bash
git clone https://github.com/yeaosound/openclaw-go.git
cd openclaw-go

pnpm install
pnpm ui:build
pnpm build

pnpm openclaw-go onboard --install-daemon
```

---

## 🔧 配置

最簡配置 `~/.openclaw/openclaw.json`：

```json
{
  "agent": {
    "model": "anthropic/claude-opus-4-5"
  },
  "lang": "zh-HK"
}
```

**語言設定**：
- 環境變數：`OPENCLAW_LANG=zh-HK`
- 配置文件：`lang` 欄位
- 支援語言：
  - `en` - English (英文)
  - `zh-CN` - 簡體中文
  - `zh-HK` - 香港粵語 (Hong Kong Cantonese)
  - `zh-TW` - 繁體中文 (Traditional Chinese)

---

## 📚 文件

- [上游官方文件](https://docs.openclaw.ai)
- [快速開始指南](https://docs.openclaw.ai/start/getting-started)
- [Gateway 配置](https://docs.openclaw.ai/gateway/configuration)
- [渠道接入](https://docs.openclaw.ai/channels)
- [技能開發](https://docs.openclaw.ai/tools/skills)

**多語言文件**：
- 📘 [English](../README.md)
- 📕 [簡體中文](./README_zh-CN.md)
- 📙 香港粵語 (本文檔)
- 📗 [繁體中文](./README_zh-TW.md)

---

## 🔄 版本同步

呢個項目基於 [openclaw/openclaw](https://github.com/openclaw/openclaw) 進行優化同多語言支援，定期同上游保持同步。

**已合併上游更新**：
- ✅ SSRF 安全修復
- ✅ 關鍵安全修復（LFI、代碼執行阻止）
- ✅ 網關功能改進（時間戳、路由）
- ✅ Agent 同 Channel Bug 修復
- ✅ 代碼風格統一（import 排序）

**版本格式**：`vYYYY.M.D-go.N`（好似 `v2026.2.3-go.1`）

---

## 🛠️ i18n 國際化

呢個項目已經實現完整嘅多語言國際化支援：

### 已支援語言
- 🇺🇸 **English** (en) - 636+ 翻譯條目
- 🇨🇳 **簡體中文** (zh-CN) - 636+ 翻譯條目
- 🇭🇰 **香港粵語** (zh-HK) - 粵語書面語，636+ 條目
- 🇨🇳 **繁體中文** (zh-TW) - 636+ 翻譯條目

### 計劃支援
- 🇯🇵 **日文** (ja)
- 🇰🇷 **韓文** (ko)
- 🇫🇷 **法文** (fr)
- 更多語言歡迎貢獻！

### 實現結構
- **後端 i18n** (`src/i18n/`)：
  - CLI 指令同提示
  - 配置精靈
  - 配對訊息
  - 渠道配置
  
- **前端 i18n** (`ui/src/i18n/`)：基於 i18next
  - Web 控制界面
  - 語言切換器

**使用示例**：
```typescript
import { t, setLocale, getAvailableLocales } from './i18n/index.js';

// 睇吓有咩語言可以用
console.log(getAvailableLocales()); // ['en', 'zh-CN', 'zh-HK', 'zh-TW']

// 設定語言
setLocale('zh-HK');  // 香港粵語
// setLocale('zh-CN');  // 簡體中文
// setLocale('zh-TW');  // 繁體中文

// 攞翻譯
console.log(t('cli.plugins.description'));
// => "管理 OpenClaw 外掛/擴展"

// 插值
console.log(t('common.status.loading', { item: 'gateway' }));
// => "載入緊 gateway..."
```

---

## 🤝 參與貢獻

歡迎提交 Issue 同 PR！

- 🐛 Bug 修復同功能優化
- 🌐 翻譯改進
- 📖 文件完善
- 🔌 本地渠道適配

**貢獻指引**：
- 遵循上游代碼風格（已配置 oxfmt）
- 提交前運行 `pnpm lint` 同 `pnpm build`
- 如需新增翻譯，請參考 `src/i18n/locales/` 結構

---

## 📋 開發計劃

### 已完成 ✅
- [x] CLI 界面本地化（4 種語言）
- [x] Web 控制界面本地化（4 種語言）
- [x] 配置精靈本地化（4 種語言）
- [x] 語言切換功能
- [x] 上游版本同步機制
- [x] 英語 (en) 完整支援
- [x] 簡體中文 (zh-CN) 完整支援
- [x] 香港粵語 (zh-HK) 完整支援
- [x] 繁體中文 (zh-TW) 完整支援

### 計劃中 📅
- [ ] 日文 (ja) 支援
- [ ] 韓文 (ko) 支援
- [ ] 法文 (fr) 支援
- [ ] 德文 (de) 支援
- [ ] 西班牙文 (es) 支援
- [ ] 翻譯貢獻者社區建設

---

## 🏗️ 項目結構

```
openclaw-go/
├── src/
│   ├── i18n/              # 國際化核心模組
│   │   ├── locales/       # 語言包
│   │   │   ├── en/        # 英語 (636+ 條目)
│   │   │   ├── zh-CN/     # 簡體中文 (636+ 條目)
│   │   │   ├── zh-HK/     # 香港粵語 (636+ 條目)
│   │   │   └── zh-TW/     # 繁體中文 (636+ 條目)
│   │   ├── index.ts       # 翻譯函數
│   │   └── config.ts      # 初始化配置
│   ├── commands/          # CLI 指令
│   ├── channels/          # 渠道整合
│   └── ...
├── ui/
│   └── src/i18n/          # 前端國際化 (每種語言 424+ 條目)
├── extensions/            # 擴展外掛
├── README_i18n/           # 多語言 README 文件
│   ├── README_zh-CN.md    # 簡體中文
│   ├── README_zh-HK.md    # 香港粵語 (本文檔)
│   ├── README_zh-TW.md    # 繁體中文
│   └── ...
└── ...
```

---

## 📄 牌照

[MIT](LICENSE)

基於 [OpenClaw](https://github.com/openclaw/openclaw) 開發，多謝原項目開發者 🦞

---

## ⭐ Star 趨勢

<a href="https://star-history.com/#yeaosound/openclaw-go&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=yeaosound/openclaw-go&type=Date" />
 </picture>
</a>

---

<p align="center">
  基於 <a href="https://github.com/openclaw/openclaw">OpenClaw</a> · 多謝原項目開發者 🚀
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/yeaosound">yeaosound</a>
</p>
