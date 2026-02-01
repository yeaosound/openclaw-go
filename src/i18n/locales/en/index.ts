// English locale index - aggregates all English translations
import { cliMessages } from './cli.js';
import { wizardMessages } from './wizard.js';
import { pairingMessages } from './pairing.js';
import { commonMessages } from './common.js';
import { channelMessages } from './channels.js';
import { errorMessages } from './errors.js';

export const en: Record<string, string> = {
  ...cliMessages,
  ...wizardMessages,
  ...pairingMessages,
  ...commonMessages,
  ...channelMessages,
  ...errorMessages,
};

export default en;
export { cliMessages, wizardMessages, pairingMessages, commonMessages, channelMessages, errorMessages };
