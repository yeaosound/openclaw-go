import type { Command } from "commander";
import { t } from "../../../i18n/index.js";
import type { MessageCliHelpers } from "./helpers.js";

export function registerMessagePinCommands(message: Command, helpers: MessageCliHelpers) {
  const pins = [
    helpers
      .withMessageBase(
        helpers.withRequiredMessageTarget(message.command("pin").description(t("cli.message.pin.description"))),
      )
      .requiredOption("--message-id <id>", "Message id")
      .action(async (opts) => {
        await helpers.runMessageAction("pin", opts);
      }),
    helpers
      .withMessageBase(
        helpers.withRequiredMessageTarget(message.command("unpin").description(t("cli.message.unpin.description"))),
      )
      .requiredOption("--message-id <id>", "Message id")
      .action(async (opts) => {
        await helpers.runMessageAction("unpin", opts);
      }),
    helpers
      .withMessageBase(
        helpers.withRequiredMessageTarget(
          message.command("pins").description(t("cli.message.pins.description")),
        ),
      )
      .option("--limit <n>", "Result limit")
      .action(async (opts) => {
        await helpers.runMessageAction("list-pins", opts);
      }),
  ] as const;

  void pins;
}
