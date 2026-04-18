import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { submitContactForm } from "../lib/api";

const contactInfo = [
  { icon: Mail, label: "Email", value: "getachewekubay8@gmail.com", href: "mailto:getachewekubay8@gmail.com" },
  { icon: Phone, label: "Phone", value: "+251 994 659 621", href: "tel:+251994659621" },
  { icon: MapPin, label: "Location", value: "Mekelle, Ethiopia", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Gech-E" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/getachewekubay" },
  { icon: Globe, label: "Portfolio", href: "https://getachewekubay.vercel.app" },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        message: `[${form.subject}] ${form.message}`,
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      // Fallback: open mailto if backend is unavailable
      const mailto = `mailto:getachewekubay8@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
      window.open(mailto, "_blank");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-20" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-emerald-400 mb-2" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>GET IN TOUCH</p>
          <h2 className="text-white mb-4" style={{ fontSize: "32px", fontWeight: 700 }}>Let's Work Together</h2>
          <p className="text-slate-400 max-w-2xl mb-12" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            Interested in collaborating on AI/ML projects or need a full-stack developer? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <c.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-400" style={{ fontSize: "12px", fontWeight: 500 }}>{c.label}</p>
                  <p className="text-white group-hover:text-emerald-400 transition-colors" style={{ fontSize: "14px", fontWeight: 500 }}>{c.value}</p>
                </div>
              </motion.a>
            ))}

            <div className="pt-4">
              <p className="text-slate-400 mb-3" style={{ fontSize: "13px", fontWeight: 500 }}>Follow me</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors"
                  >
                    <s.icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-slate-300 mb-1.5 block" style={{ fontSize: "13px", fontWeight: 500 }}>Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-700/40 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
                  style={{ fontSize: "14px" }}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 mb-1.5 block" style={{ fontSize: "13px", fontWeight: 500 }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-700/40 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
                  style={{ fontSize: "14px" }}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 mb-1.5 block" style={{ fontSize: "13px", fontWeight: 500 }}>Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-slate-700/40 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
                style={{ fontSize: "14px" }}
                placeholder="Project collaboration"
                required
              />
            </div>
            <div>
              <label className="text-slate-300 mb-1.5 block" style={{ fontSize: "13px", fontWeight: 500 }}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full bg-slate-700/40 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                style={{ fontSize: "14px" }}
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-8 py-3 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed w-full justify-center sm:w-auto"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {status === "sending" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              ) : status === "sent" ? (
                <><CheckCircle className="w-4 h-4" /> Message Sent!</>
              ) : status === "error" ? (
                <><AlertCircle className="w-4 h-4" /> {errorMsg || "Try Again"}</>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}