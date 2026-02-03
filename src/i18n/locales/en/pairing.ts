// English translations for pairing module
export const pairingMessages = {
  // Pairing request
  "pairing.request.title": "OpenClaw: access not configured",
  "pairing.request.idLine": "Your ID: {id}",
  "pairing.request.code": "Pairing code: {code}",
  "pairing.request.instruction": "Ask the bot owner to approve with:",

  // CLI
  "cli.pairing.description": "Secure DM pairing (approve inbound requests)",
  "cli.pairing.list.description": "List pending pairing requests",
  "cli.pairing.approve.description": "Approve a pairing code and allow that sender",

  // Status
  "pairing.status.pending": "Pending",
  "pairing.status.approved": "Approved",
  "pairing.status.rejected": "Rejected",
  "pairing.status.expired": "Expired",

  // Messages
  "pairing.approve.success": "Pairing request approved successfully",
  "pairing.approve.failed": "Failed to approve pairing request",
  "pairing.reject.success": "Pairing request rejected",
  "pairing.no.pending": "No pending pairing requests",
};

export default pairingMessages;
