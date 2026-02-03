import { channelMessages } from "./channels.js";
// English locale index - aggregates all English translations
import { cliMessages } from "./cli.js";
import { commonMessages } from "./common.js";
import { errorMessages } from "./errors.js";
import { pairingMessages } from "./pairing.js";
import { wizardMessages } from "./wizard.js";

export const en: Record<string, string> = {
  ...cliMessages,
  ...wizardMessages,
  ...pairingMessages,
  ...commonMessages,
  ...channelMessages,
  ...errorMessages,
};

export default en;
export {
  cliMessages,
  wizardMessages,
  pairingMessages,
  commonMessages,
  channelMessages,
  errorMessages,
};
