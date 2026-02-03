# OpenClaw i18n Usage Guide

Complete guide for using the internationalization system in OpenClaw.

## Quick Start

### Using Translations in CLI Commands

```typescript
import { t } from '../i18n/index.js';

program
  .command('plugins')
  .description(t('cli.plugins.description'));
```

### Switching to Chinese

```bash
# Via environment variable
export OPENCLAW_LANG=zh-CN
openclaw --help

# Via config file
echo '{"lang": "zh-CN"}' > ~/.openclaw/openclaw.json
```

## Basic Usage

### Import the Translation Function

```typescript
import { t } from './i18n/index.js';

const text = t('cli.plugins.description');
// => "Manage OpenClaw plugins/extensions" (en)
// => "管理 OpenClaw 插件/扩展" (zh-CN)
```

### Available Locales

```typescript
import { getAvailableLocales } from './i18n/index.js';

const locales = getAvailableLocales();
// => ['en', 'zh-CN']
```

## Interpolation

```typescript
// Basic interpolation
const text = t('pairing.request.code', { code: '123456' });
// => "Pairing code: 123456"

// Multiple parameters
const text = t('wizard.config.invalid.hint', { 
  command: 'openclaw doctor' 
});
```

## Switching Languages

```typescript
import { setLocale, getLocale } from './i18n/index.js';

// Set to Chinese
setLocale('zh-CN');

// Get current locale
const current = getLocale();
```

Priority: Environment Variable > Config File > Default (en)

## Adding New Translations

### Step 1: Add English Translation

Edit `src/i18n/locales/en/cli.ts`:

```typescript
export const cliMessages = {
  'cli.mycommand.description': 'Description of my command',
};
```

### Step 2: Add Chinese Translation

Edit `src/i18n/locales/zh-CN/cli.ts`:

```typescript
export const cliMessages = {
  'cli.mycommand.description': '我的命令的描述',
};
```

### Step 3: Use in Code

```typescript
import { t } from '../i18n/index.js';

program
  .command('mycommand')
  .description(t('cli.mycommand.description'));
```

### Step 4: Validate

```bash
pnpm tsx src/i18n/scripts/validate.ts
```

## Best Practices

1. **Key Naming**: Use dot notation with lowercase
   - Good: `cli.plugins.list.description`
   - Bad: `cliPluginsListDescription`

2. **Organize by Module**: Group keys logically
   - CLI: `cli.{command}.{subcommand}.description`
   - Wizard: `wizard.{step}.{element}`

3. **Keep It Short**: Be concise
   - Good: "Manage plugins"
   - Bad: "This command allows you to manage all your plugins"

4. **Use Interpolation**: For dynamic values
   - Good: `'Found {count} plugins'`
   - Bad: `'Found ' + count + ' plugins'`

5. **Always Add Both Languages**: Never add to only one file

## API Reference

### Core Functions

- `t(key, params?)` - Translate a key
- `setLocale(locale)` - Set current locale
- `getLocale()` - Get current locale
- `getAvailableLocales()` - List available locales
- `hasTranslation(key)` - Check if key exists

### Configuration

- `initializeI18n()` - Initialize from env/config
- `getLanguageSettings()` - Get language and source

### Scripts

```bash
# Validate translations
pnpm tsx src/i18n/scripts/validate.ts

# Extract hardcoded text
pnpm tsx src/i18n/scripts/extract-i18n-keys.ts

# Output as JSON
pnpm tsx src/i18n/scripts/extract-i18n-keys.ts --format=json
```

## Troubleshooting

### Key not found

If a key is not found, the key itself is returned:

```typescript
t('non.existing.key'); // => "non.existing.key"
```

Check:
1. Key exists in both en and zh-CN
2. No typos in key name
3. Key is exported correctly

### Locale not available

```typescript
setLocale('fr'); // Throws error
```

Check `AVAILABLE_LOCALES` in `src/i18n/types.ts`.

## File Structure

```
src/i18n/
├── index.ts              # Core API
├── types.ts              # Type definitions
├── config.ts             # Configuration
├── locales/
│   ├── en/
│   │   ├── cli.ts        # CLI translations
│   │   ├── wizard.ts     # Wizard translations
│   │   └── ...
│   └── zh-CN/
│       ├── cli.ts        # CLI translations
│       ├── wizard.ts     # Wizard translations
│       └── ...
├── scripts/
│   ├── validate.ts       # Validation script
│   └── extract-i18n-keys.ts  # Extraction script
└── examples/
    └── basic-usage.ts    # Usage examples
```

## Summary

- Import `t` from `../i18n/index.js`
- Use `t('key')` for simple translation
- Use `t('key', { param: value })` for interpolation
- Add keys to both `en` and `zh-CN` files
- Run validation script before committing
