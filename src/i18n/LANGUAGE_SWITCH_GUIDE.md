# OpenClaw Language Switch Guide

Version: 1.0
Date: 2026-02-02
Applicable: OpenClaw 2026.1.30+

## Overview

OpenClaw supports multiple languages. Currently available:

| Language Code | Language Name        | Native Name |
| ------------- | -------------------- | ----------- |
| en            | English              | English     |
| zh-CN         | Chinese (Simplified) | 简体中文    |

## Method 1: Environment Variable (Recommended for temporary use)

Use Cases:

- Temporary language switching
- CI/CD scripts
- Docker containers
- One-time commands

Linux/macOS:
export OPENCLAW_LANG=zh-CN
pnpm openclaw --help

Windows PowerShell:
$env:OPENCLAW_LANG="zh-CN"
pnpm openclaw --help

Windows CMD:
set OPENCLAW_LANG=zh-CN
pnpm openclaw --help

One-time use:
OPENCLAW_LANG=zh-CN pnpm openclaw plugins list

Priority: HIGHEST

## Method 2: Configuration File (Recommended for permanent use)

Use Cases:

- Long-term language preference
- Personal settings
- Team standardization

Config File Location:
~/.openclaw/openclaw.json

Manual Setup:
mkdir -p ~/.openclaw
echo '{"lang": "zh-CN"}' > ~/.openclaw/openclaw.json

Programmatic Setup (for developers):
import { updateLanguageSetting } from './i18n/config.js';
await updateLanguageSetting('zh-CN');

Verify:
pnpm openclaw --help

Priority: SECOND

## Method 3: Runtime Switching (For developers)

Use Cases:

- Dynamic switching during runtime
- Plugin development
- Custom logic

API Usage:
import { setLocale, getLocale, t } from './i18n/index.js';

    // Check current locale
    console.log(getLocale());  // "en"

    // Switch to Chinese
    setLocale('zh-CN');
    console.log(getLocale());  // "zh-CN"

    // Use translation
    console.log(t('channel.discord.notAllowed'));
    // Output: "此频道不允许。"

    // Translation with parameters
    console.log(t('channel.discord.system.pinnedMessage', { location: 'general' }));
    // Output: "在 general 置顶了一条消息"

Priority: LOWEST

## Priority Order

1. Environment Variable OPENCLAW_LANG
   |
   | (if not set)
   v
2. Config File ~/.openclaw/openclaw.json lang field
   |
   | (if not set)
   v
3. Default Language (en)

## Usage Examples

Example 1: View help in Chinese temporarily
OPENCLAW_LANG=zh-CN pnpm openclaw --help

Example 2: Permanently set to Chinese
mkdir -p ~/.openclaw
echo '{"lang": "zh-CN"}' > ~/.openclaw/openclaw.json
pnpm openclaw --help

Example 3: Docker environment
ENV OPENCLAW_LANG=zh-CN

Example 4: Script with temporary switch
#!/bin/bash
pnpm openclaw system event --text "Test"
OPENCLAW_LANG=zh-CN pnpm openclaw plugins list

Example 5: Developer dynamic switching
import { setLocale } from './i18n/index.js';
setLocale('zh-CN');
console.log(t('cli.plugins.description'));

## Troubleshooting

Issue 1: Language switch not working

Check steps: # 1. Check environment variable
echo $OPENCLAW_LANG

    # 2. Check config file
    cat ~/.openclaw/openclaw.json | grep lang

    # 3. Clear environment variable
    unset OPENCLAW_LANG

Issue 2: Garbled text display

Solution:
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

Issue 3: Some text not translated

Check:
cd src/i18n && npx tsx scripts/validate-translations.ts

## Advanced Usage

Check current language settings:
import { getLanguageSettings } from './i18n/config.js';
const settings = await getLanguageSettings();
// { locale: "zh-CN", source: "config" }

Get available locales:
import { getAvailableLocales } from './i18n/config.js';
const locales = getAvailableLocales();
// ["en", "zh-CN"]

Check if translation key exists:
import { hasTranslation } from './i18n/index.js';
if (hasTranslation('cli.plugins.description')) {
console.log(t('cli.plugins.description'));
}

## Summary

Quick Start: # Temporary: Use environment variable
OPENCLAW_LANG=zh-CN pnpm openclaw --help

    # Permanent: Use config file
    echo '{"lang": "zh-CN"}' > ~/.openclaw/openclaw.json

Documentation: - Full Check Plan: src/i18n/FULL_CHECK_PLAN.md - Test Report: src/i18n/PHASE7_TEST_REPORT.md - Roadmap: I18N_ROADMAP.md

---

Document Version: 1.0
Last Updated: 2026-02-02
