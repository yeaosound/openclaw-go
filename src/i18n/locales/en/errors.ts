// English translations for errors module
export const errorMessages = {
  // Generic errors
  "error.generic": "An error occurred: {message}",
  "error.unknown": "An unknown error occurred",
  "error.notFound": "Not found: {resource}",
  "error.invalidInput": "Invalid input: {field}",
  "error.required": "{field} is required",
  "error.unauthorized": "Unauthorized",
  "error.forbidden": "Forbidden",

  // Config errors
  "error.config.invalid": "Invalid configuration",
  "error.config.notFound": "Configuration file not found",
  "error.config.parse": "Failed to parse configuration file",

  // Gateway errors
  "error.gateway.notRunning": "Gateway not running",
  "error.gateway.unreachable": "Cannot reach gateway",
  "error.gateway.authFailed": "Gateway authentication failed",

  // Channel errors
  "error.channel.notConfigured": "Channel not configured",
  "error.channel.sendFailed": "Failed to send message",
  "error.channel.receiveFailed": "Failed to receive message",

  // Tool errors
  "error.tool.notFound": "Tool not found: {name}",
  "error.tool.notAllowed": "Tool not allowed: {name}",
  "error.tool.executionFailed": "Tool execution failed: {message}",
};

export default errorMessages;
