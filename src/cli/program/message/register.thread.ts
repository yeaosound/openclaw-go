import type { Command } from "commander";
import type { MessageCliHelpers } from "./helpers.js";
import { t } from "../../../i18n/index.js";

export function registerMessageThreadCommands(message: Command, helpers: MessageCliHelpers) {
  const thread = message.command("thread").description(t("cli.message.thread.description"));

  helpers
    .withMessageBase(
      helpers.withRequiredMessageTarget(
        thread
          .command("create")
          .description(t("cli.message.thread.create.description"))
          .requiredOption("--thread-name <name>", "Thread name"),
      ),
    )
    .option("--message-id <id>", "Message id (optional)")
    .option("--auto-archive-min <n>", "Thread auto-archive minutes")
    .action(async (opts) => {
      await helpers.runMessageAction("thread-create", opts);
    });

  helpers
    .withMessageBase(
      thread
        .command("list")
        .description(t("cli.message.thread.list.description"))
        .requiredOption("--guild-id <id>", "Guild id"),
    )
    .option("--channel-id <id>", "Channel id")
    .option("--include-archived", "Include archived threads", false)
    .option("--before <id>", "Read/search before id")
    .option("--limit <n>", "Result limit")
    .action(async (opts) => {
      await helpers.runMessageAction("thread-list", opts);
    });

  helpers
    .withMessageBase(
      helpers.withRequiredMessageTarget(
        thread
          .command("reply")
          .description(t("cli.message.thread.reply.description"))
          .requiredOption("-m, --message <text>", "Message body"),
      ),
    )
    .option(
      "--media <path-or-url>",
      "Attach media (image/audio/video/document). Accepts local paths or URLs.",
    )
    .option("--reply-to <id>", "Reply-to message id")
    .action(async (opts) => {
      await helpers.runMessageAction("thread-reply", opts);
    });
}
