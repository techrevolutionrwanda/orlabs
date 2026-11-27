"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import styles from "./ChatWidget.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const suggestions = [
  "What services does OrLabs offer?",
  "Tell me about your AI solutions",
  "How can I work with OrLabs?",
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

/** Render lightweight markdown (bold / italic) without injecting HTML. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return <span key={index}>{part}</span>;
  });
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableDivider(line: string): boolean {
  if (!line.includes("|") || !line.includes("-")) return false;

  return splitTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell));
}

/** Turn the assistant's plain-text reply into readable blocks, including tables. */
function formatAnswer(content: string): ReactNode[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  function flushParagraph() {
    if (!paragraph.length) return;

    const text = paragraph.join(" ").trim();
    if (text) {
      blocks.push(<p key={`p-${blocks.length}`}>{renderInline(text)}</p>);
    }

    paragraph = [];
  }

  function flushList() {
    if (list?.items.length) {
      const items = list.items.map((item, index) => (
        <li key={index}>{renderInline(item)}</li>
      ));

      blocks.push(
        list.ordered ? (
          <ol key={`l-${blocks.length}`}>{items}</ol>
        ) : (
          <ul key={`l-${blocks.length}`}>{items}</ul>
        ),
      );
    }

    list = null;
  }

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();

    if (!line || /^[|\s:-]+$/.test(line)) {
      flushParagraph();
      flushList();
      continue;
    }

    // Markdown tables: a header row followed by a |---|---| divider.
    if (
      line.includes("|") &&
      index + 1 < lines.length &&
      isTableDivider(lines[index + 1])
    ) {
      flushParagraph();
      flushList();

      const header = splitTableRow(line);
      index += 2;
      const rows: string[][] = [];

      while (index < lines.length) {
        const rowLine = lines[index].trim();
        if (!rowLine.includes("|")) {
          index--;
          break;
        }

        const cells = splitTableRow(rowLine);
        if (!isTableDivider(rowLine) && cells.some(Boolean)) {
          rows.push(cells);
        }
        index++;
      }

      blocks.push(
        <div key={`t-${blocks.length}`} className={styles.tableWrap}>
          <table className={styles.answerTable}>
            {header.length === 2 && (
              <colgroup>
                <col style={{ width: "38%" }} />
                <col style={{ width: "62%" }} />
              </colgroup>
            )}
            <thead>
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex}>{renderInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);

    if (bullet || numbered) {
      flushParagraph();

      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }

      list.items.push((bullet || numbered)![1]);
      continue;
    }

    flushList();

    const heading = line.match(/^#{1,4}\s+(.*)$/);
    if (heading) {
      flushParagraph();
      blocks.push(
        <p key={`h-${blocks.length}`} className={styles.answerHeading}>
          {renderInline(heading[1])}
        </p>,
      );
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, isOpen, isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsFullscreen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  function openChat() {
    setIsOpen(true);
    setHasOpened(true);
  }

  async function sendMessage(content: string) {
    const trimmedMessage = content.trim();

    if (!trimmedMessage || isLoading) return;

    const previousMessages = messages;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: trimmedMessage },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: previousMessages.slice(-10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response from the AI.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again shortly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(message);
  }

  function selectSuggestion(question: string) {
    void sendMessage(question);
  }

  const showHint = !isOpen && !hasOpened;

  return (
    <div className={styles.widget}>
      {showHint && (
        <button className={styles.hint} onClick={openChat}>
          <span>Need help? Ask me anything about OrLabs.</span>
          <span aria-hidden="true">↓</span>
        </button>
      )}

      {isOpen && (
        <section
          className={`${styles.window} ${isFullscreen ? styles.fullscreenWindow : ""}`}
          role="dialog"
          aria-label="OrLabs AI assistant"
          aria-modal={isFullscreen}
        >
          <header className={styles.header}>
            <div className={styles.brand}>
              <div className={styles.avatar}>
                <Image
                  src="/orlabs-logo-pack/orlabs-icon.svg"
                  alt=""
                  width={42}
                  height={42}
                />
              </div>

              <div>
                <h2>OrLabs Assistant</h2>
                <p>
                  <span className={styles.status} />
                  Here to help you
                </p>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                className={`${styles.headerButton} ${isFullscreen ? styles.headerButtonActive : ""}`}
                onClick={() => setIsFullscreen((previous) => !previous)}
                aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
                aria-pressed={isFullscreen}
                title={isFullscreen ? "Exit full screen" : "Full screen"}
              >
                {isFullscreen ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8h5V3" />
                    <path d="M21 8h-5V3" />
                    <path d="M16 21v-5h5" />
                    <path d="M8 21v-5H3" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 3H3v5" />
                    <path d="M16 3h5v5" />
                    <path d="M21 16v5h-5" />
                    <path d="M3 16v5h5" />
                  </svg>
                )}
              </button>

              <button
                className={styles.closeButton}
                onClick={() => {
                  setIsOpen(false);
                  setIsFullscreen(false);
                }}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </header>

          <div className={styles.messages} ref={messagesRef} aria-live="polite">
            <div className={styles.messageRow}>
              <div className={styles.messageAvatar} aria-hidden="true">
                <Image
                  src="/orlabs-logo-pack/orlabs-icon.svg"
                  alt=""
                  width={28}
                  height={28}
                />
              </div>

              <div className={styles.messageBody}>
                <span className={styles.messageAuthor}>OrLabs Assistant</span>
                <div
                  className={`${styles.bubble} ${styles.assistantBubble} ${styles.welcomeBubble}`}
                >
                  <h3>Hello there! 👋</h3>
                  <p>
                    Welcome to OrLabs. I&apos;m here to help you learn about our
                    services, solutions, and how we can work together.
                  </p>
                </div>
              </div>
            </div>

            {messages.length === 0 && (
              <div className={styles.suggestions}>
                <p>What would you like to know?</p>

                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => selectSuggestion(suggestion)}
                    disabled={isLoading}
                  >
                    {suggestion}
                    <span aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            )}

            {messages.map((item, index) =>
              item.role === "user" ? (
                <div key={index} className={styles.messageRow}>
                  <div className={`${styles.messageBody} ${styles.userBody}`}>
                    <span className={`${styles.messageAuthor} ${styles.userAuthor}`}>
                      You
                    </span>
                    <div className={`${styles.bubble} ${styles.userBubble}`}>
                      {item.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className={styles.messageRow}>
                  <div className={styles.messageAvatar} aria-hidden="true">
                    <Image
                      src="/orlabs-logo-pack/orlabs-icon.svg"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>

                  <div className={styles.messageBody}>
                    <span className={styles.messageAuthor}>
                      OrLabs Assistant
                    </span>
                    <div className={`${styles.bubble} ${styles.assistantBubble}`}>
                      <div className={styles.answerText}>
                        {formatAnswer(item.content)}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}

            {isLoading && (
              <div className={styles.messageRow} role="status">
                <div className={styles.messageAvatar} aria-hidden="true">
                  <Image
                    src="/orlabs-logo-pack/orlabs-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                  />
                </div>

                <div className={styles.messageBody}>
                  <span className={styles.messageAuthor}>OrLabs Assistant</span>
                  <div
                    className={`${styles.bubble} ${styles.assistantBubble} ${styles.thinkingBubble}`}
                  >
                    <span className={styles.typingDots} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                    Thinking…
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className={styles.inputArea} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask us anything..."
                aria-label="Type your message"
                disabled={isLoading}
              />

              <button
                type="submit"
                aria-label="Send message"
                disabled={isLoading || !message.trim()}
              >
                ↑
              </button>
            </div>
          </form>

          <div className={styles.disclaimer}>Powered by OrLabs</div>
        </section>
      )}

      <button
        className={`${styles.toggleButton} ${showHint ? styles.toggleButtonHint : ""}`}
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? "×" : "✦"}
      </button>
    </div>
  );
}
