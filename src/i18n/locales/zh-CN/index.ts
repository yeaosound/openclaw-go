import { channelMessages } from "./channels.js";
// 简体中文语言包索引
import { cliMessages } from "./cli.js";
import { commonMessages } from "./common.js";
import { errorMessages } from "./errors.js";
import { pairingMessages } from "./pairing.js";
import { wizardMessages } from "./wizard.js";

export const zhCN: Record<string, string> = {
  ...cliMessages,
  ...wizardMessages,
  ...pairingMessages,
  ...commonMessages,
  ...channelMessages,
  ...errorMessages,
};

export default zhCN;
export {
  cliMessages,
  wizardMessages,
  pairingMessages,
  commonMessages,
  channelMessages,
  errorMessages,
};
