import type { PartInfo } from "lit/directive.js";
import { directive, AsyncDirective } from "lit/async-directive.js";
import { i18n, onLanguageChanged } from "./config.js";

class TranslateDirective extends AsyncDirective {
  private key: string = "";
  private options?: Record<string, string | number>;
  private unsubscribe?: () => void;

  constructor(partInfo: PartInfo) {
    super(partInfo);
  }

  render(key: string, options?: Record<string, string | number>): string {
    if (key !== this.key || JSON.stringify(options) !== JSON.stringify(this.options)) {
      this.key = key;
      this.options = options;

      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.unsubscribe = onLanguageChanged(() => {
        this.setValue(i18n.t(this.key, this.options));
      });
    }

    return i18n.t(key, options);
  }

  disconnected(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = undefined;
    }
  }
}

export const t = directive(TranslateDirective);

export function translate(key: string, options?: Record<string, string | number>): string {
  return i18n.t(key, options);
}
