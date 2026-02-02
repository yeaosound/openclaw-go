import "./styles.css";
import { initI18n } from "./i18n/index.js";

async function bootstrap() {
  await initI18n();
  await import("./ui/app.js");
}

bootstrap();
