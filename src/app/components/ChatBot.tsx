import { MessageCircle, X, Send } from "lucide-react";
import { useChatBot, SUGGESTED_QUESTIONS } from "../../hooks/useChatBot";

function Answer({ content }: { content: string }) {
  return <div className="whitespace-pre-wrap break-words leading-relaxed">{content.split(/(https?:\/\/[^\s]+)/g).map((piece, i) => /^https?:\/\//.test(piece) && /^https?:\/\/[\w./?=&%-]+$/.test(piece) ? <a key={i} href={piece} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline break-all">{piece}</a> : <span key={i}>{piece}</span>)}</div>;
}
export function ChatBot({ startOpen = false }: { startOpen?: boolean }) {
  const {isOpen,setIsOpen,messages,input,setInput,isTyping,messagesEndRef,inputRef,handleSend,handleKeyDown}=useChatBot(startOpen);
  return <>
    {!isOpen && <button type="button" onClick={()=>setIsOpen(true)} aria-label="Open portfolio assistant" className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700"><MessageCircle size={23}/></button>}
    {isOpen && <section role="dialog" aria-label="Ask Getachew's portfolio assistant" aria-modal="false" className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[9999] w-full md:w-[400px] h-[100dvh] md:h-[min(610px,calc(100dvh-3rem))] bg-background text-foreground border border-border md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      <header className="flex items-center justify-between gap-3 p-4 border-b border-border bg-card">
        <div><h2 className="font-semibold text-base">Ask about Getachew</h2><p className="text-xs text-muted-foreground mt-1">Projects, skills, experience and education</p></div>
        <button type="button" onClick={()=>setIsOpen(false)} aria-label="Close assistant" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X size={19}/></button>
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite" aria-relevant="additions text">
        {messages.map(m=><div key={m.id} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
          <div className={`max-w-[90%] rounded-2xl p-3 text-sm ${m.role==="user"?"bg-blue-600 text-white rounded-br-sm":m.isError?"bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-foreground":"bg-card border border-border text-foreground rounded-bl-sm"}`}><Answer content={m.content}/>{m.citations?.length ? <div className="border-t border-border mt-3 pt-2 flex flex-wrap gap-2" aria-label="Sources">{m.citations.map(c=><a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-blue-600 dark:text-blue-400">{c.title}</a>)}</div> : null}</div>
        </div>)}
        {isTyping && <p role="status" className="text-sm text-muted-foreground">Finding relevant information…</p>}
        <div ref={messagesEndRef}/>
      </div>
      {messages.length<=2 && <div className="px-4 pb-3 flex flex-wrap gap-2" aria-label="Suggested questions">{SUGGESTED_QUESTIONS.slice(0,4).map(q=><button key={q} type="button" disabled={isTyping} onClick={()=>handleSend(q)} className="rounded-full border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-blue-500 disabled:opacity-50">{q}</button>)}</div>}
      <form onSubmit={e=>{e.preventDefault();handleSend();}} className="border-t border-border p-4 bg-card">
        <div className="flex items-center gap-2">
          <input ref={inputRef} aria-label="Your question" value={input} maxLength={1000} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask a question…" disabled={isTyping} className="flex-1 min-w-0 rounded-xl border border-border bg-background text-foreground px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"/>
          <button type="submit" disabled={!input.trim()||isTyping} aria-label="Send question" className="rounded-xl bg-blue-600 text-white p-3 hover:bg-blue-700 disabled:opacity-40"><Send size={18}/></button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Responses use portfolio sources. Verify important details directly.</p>
      </form>
    </section>}
  </>;
}
