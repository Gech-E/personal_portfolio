'use client'

import { useState, useMemo, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

type ChatMessage = {
  from: 'user' | 'bot'
  text: string
}

const SUGGESTED_QUESTIONS = [
  'What technologies do you work with?',
  'How do you usually handle projects?',
  'What is your experience with AI/ML?',
  'Can you work with existing codebases?',
  'How do you communicate during a project?',
]

function getBotReply(raw: string): string {
  const text = raw.toLowerCase()

  if (text.includes('tech') || text.includes('stack') || text.includes('skills')) {
    return (
      "I work mainly with Python for backend and AI/ML, and React/Next.js on the frontend. " +
      "On the backend I use FastAPI and sometimes Flask, with PostgreSQL as the main database. " +
      "On the AI side I have experience with classic ML, deep learning, computer vision, and NLP."
    )
  }

  if (text.includes('project') && (text.includes('process') || text.includes('how') || text.includes('work'))) {
    return (
      "For most projects I start by clarifying requirements and success criteria, then propose an architecture and milestones. " +
      "We usually iterate in short cycles with visible progress and regular check-ins, and I keep the codebase clean, tested, and documented so it’s easy to maintain."
    )
  }

  if (text.includes('ai') || text.includes('ml') || text.includes('machine learning') || text.includes('deep')) {
    return (
      "I build end‑to‑end AI/ML solutions: data preprocessing, model selection and training, evaluation, and deployment. " +
      "I’ve worked on computer vision (image classification, object detection), NLP (classification, sentiment, text processing), and general ML for prediction and recommendation."
    )
  }

  if (text.includes('experience') || text.includes('background')) {
    return (
      "I’m a Python full‑stack developer and AI/ML engineer with experience building production web apps and ML systems. " +
      "I combine strong backend skills (APIs, databases, deployment) with modern frontend development and practical applied machine learning."
    )
  }

  if (text.includes('communicat') || text.includes('contact') || text.includes('available')) {
    return (
      "I usually communicate through email and online meetings, and I like to keep clients updated with short, regular progress summaries. " +
      "For new work, you can reach out via the contact form on this site and share a short description of your project and timeline."
    )
  }

  if (text.includes('existing') || text.includes('legacy') || text.includes('codebase')) {
    return (
      "Yes, I can work with existing codebases. I typically start with a quick review, identify risks or technical debt, " +
      "and then propose a plan that balances new features, refactoring, and stability."
    )
  }

  return (
    "I can answer questions about my skills, experience, and how I usually run projects. " +
    "You can ask about my tech stack, AI/ML work, project process, or how I collaborate with clients."
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      from: 'bot',
      text: "Hi! I'm the portfolio assistant. Ask me about skills, AI/ML experience, or how I work on projects.",
    },
  ])

  // Small UX improvement: prevent body scroll shift when chatbot is open on mobile
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [open])

  const canSend = useMemo(() => input.trim().length > 0, [input])

  const handleSend = () => {
    if (!canSend) return
    const userText = input.trim()

    const reply = getBotReply(userText)

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: userText },
      { from: 'bot', text: reply },
    ])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestedClick = (q: string) => {
    const reply = getBotReply(q)
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: q },
      { from: 'bot', text: reply },
    ])
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/40 hover:shadow-primary-400/60 transition-all duration-200"
          aria-label="Open portfolio assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="w-80 sm:w-96 h-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-900/90">
            <div>
              <p className="text-sm font-semibold text-white">Portfolio Assistant</p>
              <p className="text-xs text-gray-400">
                Ask about skills, AI/ML, or project process
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-primary-400 transition-colors duration-150"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-3 space-y-2 overflow-y-auto bg-slate-900/80">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-800 text-gray-100 border border-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested questions */}
          <div className="px-3 pb-2 space-x-1 space-y-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSuggestedClick(q)}
                className="inline-flex items-center px-2 py-1 rounded-full bg-slate-800 text-[11px] text-gray-300 hover:bg-slate-700 hover:text-primary-300 border border-slate-700 transition-colors duration-150"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-700 bg-slate-900/90">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a question…"
              className="flex-1 bg-slate-800 text-sm text-gray-100 placeholder-gray-500 rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-primary-400"
            />
            <button
              onClick={handleSend}
              disabled={!canSend}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

