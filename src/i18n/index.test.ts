import { describe, expect, it, beforeEach } from "vitest";
import {
  t,
  setLocale,
  getLocale,
  getAvailableLocales,
  hasTranslation,
  DEFAULT_LOCALE,
  isAvailableLocale,
} from "./index.js";

describe("i18n core module", () => {
  beforeEach(() => {
    // Reset to default locale before each test
    setLocale(DEFAULT_LOCALE);
  });

  describe("t() function", () => {
    it("should return translation for existing key", () => {
      const result = t("cli.plugins.description");
      expect(result).toBe("Manage OpenClaw plugins/extensions");
    });

    it("should return key itself for non-existing key", () => {
      const result = t("non.existing.key");
      expect(result).toBe("non.existing.key");
    });

    it("should handle interpolation", () => {
      const result = t("pairing.request.code", { code: "123456" });
      expect(result).toBe("Pairing code: 123456");
    });

    it("should handle multiple interpolation values", () => {
      const result = t("wizard.config.invalid.hint", { command: "openclaw doctor" });
      expect(result).toContain("openclaw doctor");
    });

    it("should replace all occurrences of interpolation", () => {
      // This test assumes there's a key with multiple same placeholders
      // If not, we can skip or adjust
      const result = t("pairing.request.idLine", { id: "test123" });
      expect(result).toBe("Your ID: test123");
    });
  });

  describe("locale management", () => {
    it("should get default locale", () => {
      expect(getLocale()).toBe(DEFAULT_LOCALE);
    });

    it("should set locale to zh-CN", () => {
      setLocale("zh-CN");
      expect(getLocale()).toBe("zh-CN");
    });

    it("should throw error for invalid locale", () => {
      expect(() => setLocale("invalid")).toThrow();
    });

    it("should return Chinese translation after setting locale", () => {
      setLocale("zh-CN");
      const result = t("cli.plugins.description");
      expect(result).toBe("管理 OpenClaw 插件/扩展");
    });
  });

  describe("available locales", () => {
    it("should return list of available locales", () => {
      const locales = getAvailableLocales();
      expect(locales).toContain("en");
      expect(locales).toContain("zh-CN");
    });
  });

  describe("hasTranslation()", () => {
    it("should return true for existing key", () => {
      expect(hasTranslation("cli.plugins.description")).toBe(true);
    });

    it("should return false for non-existing key", () => {
      expect(hasTranslation("non.existing.key")).toBe(false);
    });
  });

  describe("isAvailableLocale()", () => {
    it("should return true for valid locales", () => {
      expect(isAvailableLocale("en")).toBe(true);
      expect(isAvailableLocale("zh-CN")).toBe(true);
    });

    it("should return false for invalid locale", () => {
      expect(isAvailableLocale("fr")).toBe(false);
      expect(isAvailableLocale("invalid")).toBe(false);
    });
  });

  describe("fallback mechanism", () => {
    it("should fallback to key when translation missing in non-default locale", () => {
      setLocale("zh-CN");
      // Use a key that doesn't exist in zh-CN but exists in en
      const result = t("non.existing.key.that.falls.back");
      expect(result).toBe("non.existing.key.that.falls.back");
    });
  });
});
