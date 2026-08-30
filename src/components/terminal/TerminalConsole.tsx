"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GUIDED_COMMANDS,
  TERMINAL_COMMANDS,
  executeTerminalCommand,
  getCommandCompletions,
  type PrintableTerminalResult,
} from "@/lib/terminal/commands";
import { REBOOT_EVENT } from "@/hooks/useBootSequence";
import {
  AboutOutput,
  ContactOutput,
  ExperienceOutput,
  SkillsOutput,
} from "@/components/terminal/PortfolioOutputs";
import { ProjectLibrary } from "@/components/terminal/ProjectLibrary";

const systemChecks = [
  "PHOSPHOR DISPLAY ........ ONLINE",
  "MEMORY BANK ............. 640K OK",
  "PORTFOLIO ARCHIVE ....... MOUNTED",
] as const;

type ConsoleOutput = PrintableTerminalResult | { action: "welcome" };

interface ConsoleEntry {
  id: number;
  command?: string;
  output: ConsoleOutput;
}

const INITIAL_ENTRIES: readonly ConsoleEntry[] = [{ id: 0, output: { action: "welcome" } }];

interface TerminalConsoleProps {
  isReady: boolean;
}

export function TerminalConsole({ isReady }: TerminalConsoleProps) {
  const [entries, setEntries] = useState<readonly ConsoleEntry[]>(INITIAL_ENTRIES);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<readonly string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [completionMessage, setCompletionMessage] = useState("");
  const nextEntryId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const focusInput = useCallback(() => {
    window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }, []);

  const runCommand = useCallback(
    (rawCommand: string) => {
      const command = rawCommand.trim();
      const result = executeTerminalCommand(command);

      if (!result) {
        focusInput();
        return;
      }

      setCommandHistory((current) => [...current.slice(-49), command]);
      setHistoryIndex(-1);
      setCompletionMessage("");

      if (result.action === "clear") {
        setEntries([]);
        focusInput();
        return;
      }

      if (result.action === "reboot") {
        setEntries(INITIAL_ENTRIES);
        setCommandHistory([]);
        window.dispatchEvent(new Event(REBOOT_EVENT));
        return;
      }

      setEntries((current) => [
        ...current,
        { id: nextEntryId.current++, command, output: result },
      ]);

      if (result.action !== "projects" && result.action !== "project") {
        focusInput();
      }
    },
    [focusInput],
  );

  useEffect(() => {
    if (!isReady || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    focusInput();
  }, [focusInput, isReady]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || !isReady) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [entries, isReady]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input;
    setInput("");
    runCommand(command);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setEntries([]);
      setInput("");
      setCompletionMessage("Terminal cleared");
      return;
    }

    if (event.key === "ArrowUp" && commandHistory.length > 0) {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      return;
    }

    if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setInput(nextIndex < 0 ? "" : commandHistory[commandHistory.length - 1 - nextIndex]);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const completions = getCommandCompletions(input);

      if (completions.length === 0) {
        setCompletionMessage("No command matches");
        return;
      }

      if (completions.length === 1) {
        setInput(`${completions[0]} `);
        setCompletionMessage(`Completed: ${completions[0]}`);
        return;
      }

      const commonPrefix = findCommonPrefix(completions);
      setInput(commonPrefix);
      setCompletionMessage(`Matches: ${completions.join(", ")}`);
    }
  };

  const handleViewportClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest("button, a, input") || window.getSelection()?.toString()) {
      return;
    }

    focusInput();
  };

  return (
    <>
      <div
        ref={viewportRef}
        className="terminal-viewport terminal-console"
        onClick={handleViewportClick}
      >
        <div className="terminal-history" role="log" aria-live="polite" aria-relevant="additions">
          {entries.map((entry) => (
            <ConsoleEntryView key={entry.id} entry={entry} onCommand={runCommand} />
          ))}
        </div>
      </div>

      <footer className="terminal-commandline">
        <form className="terminal-command-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="terminal-input">
            Terminal command
          </label>
          <span className="terminal-prompt__user">guest@cloneeu</span>
          <span className="terminal-prompt__path">:~</span>
          <span className="terminal-prompt__symbol">$</span>
          <input
            ref={inputRef}
            id="terminal-input"
            className="terminal-command-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setCompletionMessage("");
            }}
            onKeyDown={handleKeyDown}
            disabled={!isReady}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </form>
        <span className="terminal-status" aria-live="polite">
          {completionMessage || "INPUT // READY"}
        </span>
      </footer>
    </>
  );
}

function ConsoleEntryView({
  entry,
  onCommand,
}: {
  entry: ConsoleEntry;
  onCommand: (command: string) => void;
}) {
  return (
    <article className="terminal-entry">
      {entry.command && (
        <p className="terminal-entry__command">
          <span>guest@cloneeu</span>:~$ {entry.command}
        </p>
      )}
      <ConsoleOutputView output={entry.output} onCommand={onCommand} />
    </article>
  );
}

function ConsoleOutputView({
  output,
  onCommand,
}: {
  output: ConsoleOutput;
  onCommand: (command: string) => void;
}) {
  if (output.action === "welcome") {
    return <WelcomeOutput onCommand={onCommand} />;
  }

  if (output.action === "help") {
    return (
      <div className="terminal-help-output">
        <p className="terminal-output__heading">AVAILABLE COMMANDS</p>
        <div className="terminal-help-output__rows">
          {TERMINAL_COMMANDS.map((command) => (
            <div key={command.name}>
              <code>{command.usage}</code>
              <span>{command.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (output.action === "about") {
    return <AboutOutput />;
  }

  if (output.action === "skills") {
    return <SkillsOutput />;
  }

  if (output.action === "experience") {
    return <ExperienceOutput />;
  }

  if (output.action === "projects") {
    return <ProjectLibrary />;
  }

  if (output.action === "project") {
    return <ProjectLibrary initialProjectId={output.projectId} />;
  }

  if (output.action === "contact") {
    return <ContactOutput />;
  }

  return (
    <div className={`terminal-text-output terminal-text-output--${output.tone ?? "normal"}`}>
      {output.lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

function WelcomeOutput({ onCommand }: { onCommand: (command: string) => void }) {
  return (
    <div className="terminal-welcome-output">
      <p className="terminal-eyebrow">CLONEEU PERSONAL COMPUTER SYSTEM</p>
      <h1 id="terminal-title" className="terminal-title">
        SYSTEM READY<span aria-hidden="true">_</span>
      </h1>

      <div className="terminal-rule" aria-hidden="true" />

      <div className="system-checks" aria-label="System status">
        {systemChecks.map((check) => (
          <p key={check}>
            <span aria-hidden="true">[ OK ]</span> {check}
          </p>
        ))}
      </div>

      <section className="terminal-message" aria-labelledby="welcome-title">
        <p id="welcome-title" className="terminal-message__title">
          WELCOME, VISITOR.
        </p>
        <p>This machine contains the work, experience, and experiments of Alexandro.</p>
        <p>Type a command or select a directory below to begin.</p>
      </section>

      <section className="directory-list" aria-labelledby="directory-list-title">
        <p id="directory-list-title" className="directory-list__label">
          AVAILABLE DIRECTORIES
        </p>
        <div className="directory-list__items">
          {GUIDED_COMMANDS.map((command, index) => (
            <button key={command} type="button" onClick={() => onCommand(command)}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}/</span>
              {command.toUpperCase()}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function findCommonPrefix(values: readonly string[]) {
  return values.reduce((prefix, value) => {
    let index = 0;

    while (index < prefix.length && prefix[index] === value[index]) {
      index += 1;
    }

    return prefix.slice(0, index);
  });
}
