import { formatCliCommand } from "../cli/command-format.js";
import { t } from "../i18n/index.js";
import type { PairingChannel } from "./pairing-store.js";

export function buildPairingReply(params: {
  channel: PairingChannel;
  idLine: string;
  code: string;
}): string {
  const { channel, idLine, code } = params;
  return [
    t('pairing.request.title'),
    "",
    t('pairing.request.idLine', { id: idLine }),
    "",
    t('pairing.request.code', { code }),
    "",
    t('pairing.request.instruction'),
    formatCliCommand(`openclaw pairing approve ${channel} <code>`),
  ].join("\n");
}
