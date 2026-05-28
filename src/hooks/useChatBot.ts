/**
 * Custom hook encapsulating all chatbot state and business logic.
 * The ChatBot component should only deal with rendering.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { portfolioAPI, APIError } from "@/lib/api";
import { generateLocalResponse } from "@/lib/chatbot/fallback";
import { playNotificationSound } from "@/lib/utils/audio";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;  // Flag for error messages (styled differently in UI)
}

// ─── Constants ──────────────────────────────────────────────────────────────

const MAX_CONVERSATION_LENGTH = 50;  // Prevent memory bloat

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    'Hi! 👋 I\'m an AI assistant powered by Getachew\'s resume. Ask me anything about his **skills**, **projects**, **experience**, or **background**. I use RAG (Retrieval-Augmented Generation) to find the most relevant information from his profile.',
  timestamp: new Date(),
};

export const SUGGESTED_QUESTIONS = [
  "Who is Getachew?",
  "What are his AI/ML skills?",
  "Tell me about his projects",
  "What's his work experience?",
  "How can I contact him?",
  "What's his education?",
];

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);  // Deduplication guard

  // Auto-scroll on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // ─── Send Message ───────────────────────────────────────────────────────

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim();
    // Reject empty or punctuation-only messages
    if (!msg || !/[a-zA-Z0-9]/.test(msg)) return;

    // Deduplication: prevent double-sends from rapid clicks
    if (sendingRef.current) return;
    sendingRef.current = true;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMsg];
      // Cap conversation length to prevent memory bloat
      if (updated.length > MAX_CONVERSATION_LENGTH) {
        // Keep welcome message + most recent messages
        return [updated[0], ...updated.slice(-(MAX_CONVERSATION_LENGTH - 1))];
      }
      return updated;
    });
    setInput("");
    setIsTyping(true);
    playNotificationSound("send");

    let responseText: string;
    let isError = false;

    // Manage session persistence
    const sessionId =
      sessionStorage.getItem("chat_session_id") || Date.now().toString();
    if (!sessionStorage.getItem("chat_session_id")) {
      sessionStorage.setItem("chat_session_id", sessionId);
    }

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== "welcome" && !m.isError)
        .map((m) => ({ role: m.role, content: m.content }));

      const data = await portfolioAPI.chat({
        session_id: sessionId,
        messages: apiMessages,
      });
      responseText = data.reply;
    } catch (err) {
      console.error("Chat API error:", err);

      // Provide specific error feedback based on error type
      if (err instanceof APIError) {
        if (err.status === 429) {
          responseText = "⏳ You're sending messages too quickly. Please wait a moment and try again.";
          isError = true;
        } else if (err.status === 0) {
          // Timeout or network error — use local fallback
          responseText = generateLocalResponse(msg);
        } else {
          responseText = generateLocalResponse(msg);
        }
      } else {
        responseText = generateLocalResponse(msg);
      }
    } finally {
      sendingRef.current = false;
    }

    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
      isError,
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
    playNotificationSound("receive");
  };

  // ─── Keyboard Handler ─────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
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
  };
}
