export interface TerminalCommandDefinition {
  name: string;
  aliases: readonly string[];
  description: string;
  usage: string;
}

export type PrintableTerminalResult =
  | { action: "print"; lines: readonly string[]; tone?: "normal" | "muted" | "error" }
  | { action: "help" };

export type TerminalCommandResult =
  | PrintableTerminalResult
  | { action: "clear" }
  | { action: "reboot" };

export const TERMINAL_COMMANDS: readonly TerminalCommandDefinition[] = [
  {
    name: "help",
    aliases: ["ls"],
    description: "List available commands",
    usage: "help",
  },
  {
    name: "about",
    aliases: ["whoami"],
    description: "Open the personal profile",
    usage: "about",
  },
  {
    name: "skills",
    aliases: [],
    description: "Inspect the technology archive",
    usage: "skills",
  },
  {
    name: "experience",
    aliases: [],
    description: "Read the experience log",
    usage: "experience",
  },
  {
    name: "projects",
    aliases: [],
    description: "List portfolio projects",
    usage: "projects",
  },
  {
    name: "project",
    aliases: [],
    description: "Open one project record",
    usage: "project <id>",
  },
  {
    name: "contact",
    aliases: [],
    description: "Display communication channels",
    usage: "contact",
  },
  {
    name: "settings",
    aliases: ["config"],
    description: "Open terminal preferences",
    usage: "settings",
  },
  {
    name: "clear",
    aliases: ["cls"],
    description: "Clear terminal output",
    usage: "clear",
  },
  {
    name: "reboot",
    aliases: ["restart"],
    description: "Replay the boot sequence",
    usage: "reboot",
  },
] as const;

export const GUIDED_COMMANDS = [
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
  "help",
] as const;

const autocompleteTokens = TERMINAL_COMMANDS.flatMap((command) => [
  command.name,
  ...command.aliases,
]);

export function executeTerminalCommand(input: string): TerminalCommandResult | null {
  const [rawName = "", ...args] = input.trim().split(/\s+/);

  if (!rawName) {
    return null;
  }

  const name = rawName.toLowerCase();
  const definition = TERMINAL_COMMANDS.find(
    (command) => command.name === name || command.aliases.includes(name),
  );

  if (!definition) {
    return {
      action: "print",
      tone: "error",
      lines: [`Command not found: ${rawName}`, "Type 'help' to list available commands."],
    };
  }

  switch (definition.name) {
    case "help":
      return { action: "help" };
    case "about":
      return mountedDirectory("ABOUT", "Personal profile channel is ready for data sync.");
    case "skills":
      return mountedDirectory("SKILLS", "Technology archive is ready for data sync.");
    case "experience":
      return mountedDirectory("EXPERIENCE", "Timeline archive is ready for data sync.");
    case "projects":
      return mountedDirectory("PROJECTS", "Project index is ready for data sync.");
    case "project":
      if (!args[0]) {
        return {
          action: "print",
          tone: "error",
          lines: ["Missing project identifier.", `Usage: ${definition.usage}`],
        };
      }

      return mountedDirectory(`PROJECTS/${args[0]}`, "Project record channel is ready.");
    case "contact":
      return mountedDirectory("CONTACT", "Communication channel is ready for data sync.");
    case "settings":
      return {
        action: "print",
        tone: "muted",
        lines: ["SETTINGS module detected.", "Preference controls will be connected soon."],
      };
    case "clear":
      return { action: "clear" };
    case "reboot":
      return { action: "reboot" };
    default:
      return {
        action: "print",
        tone: "error",
        lines: ["Command registry error."],
      };
  }
}

export function getCommandCompletions(input: string) {
  const normalized = input.trimStart().toLowerCase();

  if (!normalized || normalized.includes(" ")) {
    return [];
  }

  return autocompleteTokens.filter((token) => token.startsWith(normalized));
}

function mountedDirectory(path: string, message: string): PrintableTerminalResult {
  return {
    action: "print",
    lines: [`[MOUNTED] /${path}`, message],
  };
}
