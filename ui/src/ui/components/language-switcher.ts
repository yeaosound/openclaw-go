import { html } from "lit";
import { changeLanguage, getCurrentLanguage } from "../../i18n/config.js";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "简体中文" },
];

export function renderLanguageSwitcher() {
  const currentLang = getCurrentLanguage();

  return html`
    <div class="language-switcher">
      <select
        class="language-switcher__select"
        @change=${(e: Event) => {
          const lang = (e.target as HTMLSelectElement).value;
          void changeLanguage(lang);
        }}
        title="Select language"
        aria-label="Select language"
      >
        ${LANGUAGES.map(
          (lang) => html`
            <option value=${lang.code} ?selected=${currentLang === lang.code}>
              ${lang.label}
            </option>
          `,
        )}
      </select>
    </div>
  `;
}
