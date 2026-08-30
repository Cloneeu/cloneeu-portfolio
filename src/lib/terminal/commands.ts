import { projects } from "@/lib/data";

export interface TerminalCommandDefinition {
  name: string;
  aliases: readonly string[];
  description: string;
  usage: string;
}

export type PrintableTerminalResult =
  | { action: "print"; lines: readonly string[]; tone?: "normal" | "muted" | "error" }
  | { action: "help" }
  | { action: "about" }
  | { action: "skills" }
  | { action: "experience" }
  | { action: "projects" }
  | { action: "project"; projectId: string }
  | { action: "contact" }
  | { action: "settings" };

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
  "settings",
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
      return { action: "about" };
    case "skills":
      return { action: "skills" };
    case "experience":
      return { action: "experience" };
    case "projects":
      return { action: "projects" };
    case "project": {
      const query = args.join(" ").toLowerCase();

      if (!query) {
        return {
          action: "print",
          tone: "error",
          lines: ["Missing project identifier.", `Usage: ${definition.usage}`],
        };
      }

      const project = projects.find(
        (item) => item.id.toLowerCase() === query || item.title.toLowerCase() === query,
      );

      if (!project) {
        return {
          action: "print",
          tone: "error",
          lines: [
            `Project not found: ${args.join(" ")}`,
            `Available records: ${projects.map((item) => item.id).join(", ")}`,
          ],
        };
      }

      return { action: "project", projectId: project.id };
    }
    case "contact":
      return { action: "contact" };
    case "settings":
      return { action: "settings" };
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
