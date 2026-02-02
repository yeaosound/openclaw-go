import { Command } from "commander";
import { initializeI18nSync } from "../../i18n/config.js";
import { createProgramContext } from "./context.js";
import { registerProgramCommands } from "./command-registry.js";
import { configureProgramHelp } from "./help.js";
import { registerPreActionHooks } from "./preaction.js";

export function buildProgram() {
  // Initialize i18n before building the program
  initializeI18nSync();

  const program = new Command();
  const ctx = createProgramContext();
  const argv = process.argv;

  configureProgramHelp(program, ctx);
  registerPreActionHooks(program, ctx.programVersion);

  registerProgramCommands(program, ctx, argv);

  return program;
}
