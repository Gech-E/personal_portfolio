/**
 * ChatBot — floating RAG-powered assistant widget.
 * All state and logic lives in useChatBot hook; this file is purely UI.
 */

import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useChatBot, SUGGESTED_QUESTIONS } from "../../hooks/useChatBot";

// ─── Markdown-light renderer ────────────────────────────────────────────────

function renderContent(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-blue-400" style={{ fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="text-slate-400">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part.split("\n").map((line, j) => (
      <span key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line.split(/(https?:\/\/[^\s]+)/g).map((segment, k) =>
          /^https?:\/\//.test(segment) ? (
            <a key={k} href={segment} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline underline-offset-2 break-all">{segment}</a>
          ) : segment
        )}
      </span>
    ));
  });
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ChatBot({ startOpen = false }: { startOpen?: boolean }) {
  const {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    inputRef,
    handleSend,
    handleKeyDown,
  } = useChatBot(startOpen);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI chat assistant"
            className="fixed bottom-20 right-6 md:bottom-6 md:right-6 z-[9999] w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center cursor-pointer transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[9999] w-full md:w-[380px] h-[100dvh] md:h-[560px] md:max-h-[calc(100vh-3rem)] bg-slate-900 border border-slate-700/60 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-800/90 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-slate-700/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Sparkles className="w-[18px] h-[18px] text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">RAG Assistant</h3>
                  <p className="text-blue-400 flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    Answers based on portfolio sources
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat assistant"
                className="w-8 h-8 rounded-lg hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-slate-800/80 text-slate-200 rounded-bl-md border border-slate-700/50"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 shrink-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-500 text-[11px] font-medium">Suggested questions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-800 px-3 py-1.5 rounded-full transition-all cursor-pointer text-[11.5px] font-medium"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-slate-700/50 shrink-0 bg-slate-900/50">
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-2 focus-within:border-blue-500/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none text-[13px]"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message to assistant"
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-center text-slate-400 mt-2 text-[10px]">
                Answers based on public portfolio information
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}