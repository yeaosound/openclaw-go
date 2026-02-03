// 繁體中文（台灣正體）語言包索引
import { cliMessages } from "./cli.js";
import { wizardMessages } from "./wizard.js";
import { pairingMessages } from "./pairing.js";
import { commonMessages } from "./common.js";
import { channelMessages } from "./channels.js";
import { errorMessages } from "./errors.js";

export const zhTW: Record<string, string> = {
  ...cliMessages,
  ...wizardMessages,
  ...pairingMessages,
  ...commonMessages,
  ...channelMessages,
  ...errorMessages,
};

export default zhTW;
export {
  cliMessages,
  wizardMessages,
  pairingMessages,
  commonMessages,
  channelMessages,
  errorMessages,
};
