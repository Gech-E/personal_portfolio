/**
 * Custom hook encapsulating all chatbot state and business logic.
 * The ChatBot component should only deal with rendering.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { portfolioAPI } from "@/lib/api";
import { generateLocalResponse } from "@/lib/chatbot/fallback";
import { playNotificationSound } from "@/lib/utils/audio";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Constants ──────────────────────────────────────────────────────────────

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

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    playNotificationSound("send");

    let responseText: string;

    // Manage session persistence
    const sessionId =
      sessionStorage.getItem("chat_session_id") || Date.now().toString();
    if (!sessionStorage.getItem("chat_session_id")) {
      sessionStorage.setItem("chat_session_id", sessionId);
    }

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const data = await portfolioAPI.chat({
        session_id: sessionId,
        messages: apiMessages,
      });
      responseText = data.reply;
    } catch (err) {
      console.error("Backend error, using local fallback:", err);
      responseText = generateLocalResponse(msg);
    }

    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
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
