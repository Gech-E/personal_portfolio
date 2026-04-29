import { Download, FileText, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function ResumeSection() {
  const [showPreview, setShowPreview] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(resumeHTML);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  return (
    <section id="resume" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-emerald-400 mb-2" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>RESUME</p>
          <h2 className="text-white mb-4" style={{ fontSize: "32px", fontWeight: 700 }}>Download My Resume</h2>
          <p className="text-slate-400 max-w-2xl mb-10" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            Get a detailed PDF version of my resume for your review. Click the button below to preview or download.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-8 md:p-10 max-w-3xl"
        >
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <FileText className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1" style={{ fontSize: "18px", fontWeight: 600 }}>Getachew_Ekubay_AI_Engineer_Resume.pdf</h3>
              <p className="text-slate-400 mb-5" style={{ fontSize: "13px" }}>Full-Stack Developer & AI/ML Engineer — Updated April 2026</p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 border border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? "Hide Preview" : "Preview"}
                </button>
              </div>
            </div>
          </div>

          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-8 bg-white rounded-xl overflow-hidden"
            >
              <div className="p-6 md:p-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                {/* Mini resume preview */}
                <div className="bg-slate-800 text-white p-5 rounded-lg mb-5">
                  <h4 style={{ fontSize: "20px", fontWeight: 700 }}>Getachew Ekubay</h4>
                  <p className="text-slate-300" style={{ fontSize: "13px" }}>Full Stack Developer | AI/ML Engineer</p>
                  <p className="text-slate-400 mt-1" style={{ fontSize: "11px" }}>
                    Mekelle, Ethiopia · +251 994 659 621 · getachewekubay8@gmail.com
                  </p>
                </div>

                <div className="space-y-4" style={{ fontSize: "12px", color: "#334155" }}>
                  <div>
                    <h5 className="border-b border-slate-200 pb-1 mb-2 text-slate-800" style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Professional Summary
                    </h5>
                    <p style={{ lineHeight: 1.6 }}>
                      Passionate Full-Stack Developer and AI/ML Engineer (CGPA 3.93/4.0) with proven experience building scalable web applications and intelligent systems.
                      Expert in Next.js + FastAPI stacks, RAG pipelines, Agentic AI, and computer vision.
                    </p>
                  </div>

                  <div>
                    <h5 className="border-b border-slate-200 pb-1 mb-2 text-slate-800" style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Technical Skills
                    </h5>
                    <p style={{ lineHeight: 1.8 }}>
                      <strong>Languages:</strong> Python, JavaScript, TypeScript &nbsp;|&nbsp;
                      <strong>Frontend:</strong> React, Next.js, Tailwind CSS &nbsp;|&nbsp;
                      <strong>Backend:</strong> FastAPI, Flask &nbsp;|&nbsp;
                      <strong>AI/ML:</strong> PyTorch, TensorFlow, LangChain, Hugging Face, OpenCV
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-slate-400 italic" style={{ fontSize: "11px" }}>Click "Download PDF" for the full resume</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

const resumeHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Getachew Ekubay - Resume</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI','Roboto',Arial,sans-serif;color:#1e293b;line-height:1.5}
.header{background:#1e293b;color:#fff;padding:28px 40px}
.header h1{font-size:26px;font-weight:700}
.header p{font-size:14px;color:#94a3b8;margin-top:2px}
.header .contact{display:flex;flex-wrap:wrap;gap:16px;margin-top:12px;font-size:12px;color:#cbd5e1}
.body{padding:28px 40px}
.section{margin-bottom:20px}
.section h2{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #1e293b;padding-bottom:4px;margin-bottom:10px}
.skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;font-size:12.5px}
.skills-grid b{color:#1e293b}
.exp-item{margin-bottom:12px}
.exp-header{display:flex;justify-content:space-between;align-items:baseline}
.exp-header h3{font-size:13.5px;font-weight:600}
.exp-header span{font-size:11px;color:#64748b}
.exp-org{font-size:12px;color:#64748b;margin-bottom:4px}
ul{padding-left:16px;font-size:12px}
li{margin-bottom:3px}
.proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px}
.proj-grid h4{font-size:12.5px;font-weight:600}
.proj-grid p{font-size:11.5px;color:#64748b}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.cert h4{font-size:12.5px;font-weight:600}
.cert p{font-size:11.5px;color:#64748b}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="header">
<h1>Getachew Ekubay</h1>
<p>Full Stack Developer | AI/ML Engineer</p>
<div class="contact">
<span>Mekelle, Ethiopia</span>
<span>+251 994 659 621</span>
<span>getachewekubay8@gmail.com</span>
<span>getachewekubay.vercel.app</span>
<span>github.com/Gech-E</span>
<span>linkedin.com/in/getachewekubay</span>
</div></div>
<div class="body">
<div class="section"><h2>Professional Summary</h2>
<p style="font-size:12.5px">Passionate Full-Stack Developer and AI/ML Engineer (CGPA 3.93/4.0) with proven experience building scalable web applications and intelligent systems. Expert in Next.js + FastAPI stacks, RAG pipelines, Agentic AI, and computer vision. Delivered production AI solutions in e-commerce, healthcare, and startup incubation.</p></div>

<div class="section"><h2>Technical Skills</h2>
<div class="skills-grid">
<div><b>Languages:</b> Python, JavaScript, TypeScript, HTML, CSS</div>
<div><b>Frontend:</b> React, Next.js, Tailwind CSS</div>
<div><b>Backend:</b> FastAPI, Flask, RESTful APIs</div>
<div><b>AI/ML:</b> ML, DL, CV, NLP, RAG, Agentic AI, LLM Integration</div>
<div><b>Databases & Tools:</b> PostgreSQL, MySQL, MongoDB, Docker, Git</div>
<div><b>Frameworks:</b> PyTorch, TensorFlow, Scikit-learn, LangChain, HF, OpenCV</div>
</div></div>

<div class="section"><h2>Experience</h2>
<div class="exp-item"><div class="exp-header"><h3>AI/ML Intern</h3><span>Jun 2025 – Present</span></div>
<div class="exp-org">Memi Trading PLC</div>
<ul><li>Designed and deployed 3 AI-powered applications using FastAPI + Next.js, reducing manual processing time by 65%.</li>
<li>Integrated RAG-based medical knowledge retrieval into clinical decision support system.</li></ul></div>
<div class="exp-item"><div class="exp-header"><h3>CTO & Co-Founder</h3><span>Dec 2025 – Present</span></div>
<div class="exp-org">Gemed Solutions</div>
<ul><li>Led team of 4 to build end-to-end AI incubation platform; secured 2 pilot clients in 3 months.</li>
<li>Architected full-stack system (React + FastAPI + PostgreSQL + Docker) for 15+ startups.</li></ul></div>
<div class="exp-item"><div class="exp-header"><h3>Program & Event Coordinator</h3><span>Sep 2025 – Present</span></div>
<div class="exp-org">Born to Win Tech Club</div>
<ul><li>Organized 12 workshops on Generative AI and Agentic Systems, growing membership from 45 to 180+.</li></ul></div></div>

<div class="section"><h2>Selected Projects</h2>
<div class="proj-grid">
<div><h4>Vendor Recommendation System</h4><p>ML-driven vendor matching; React + FastAPI</p></div>
<div><h4>AI-Powered E-commerce Platform</h4><p>Collaborative filtering; Next.js + FastAPI</p></div>
<div><h4>Clinical Decision Support System</h4><p>NLP + RAG for medical knowledge retrieval</p></div>
<div><h4>Skin Cancer Classification</h4><p>CNN dermoscopy classifier; 94% accuracy</p></div>
<div><h4>Vision-Based Anomaly Detection</h4><p>Contrastive learning; Next.js dashboard</p></div>
<div><h4>AI Job Matching Platform</h4><p>LLM + RAG + Agentic AI resume screening</p></div>
</div></div>

<div class="two-col">
<div class="section"><h2>Education</h2>
<h4 style="font-size:13px;font-weight:600">B.Sc. Electrical & Computer Engineering</h4>
<p style="font-size:12px;color:#64748b">Mekelle University | Expected: July 2026</p>
<p style="font-size:12px;color:#64748b">CGPA: 3.93 / 4.0</p>
<p style="font-size:11.5px;color:#64748b;margin-top:4px"><b style="color:#334155">Achievements:</b> Top performer; startup competition winner.</p></div>
<div class="section"><h2>Certifications</h2>
<div class="cert"><h4>Machine Learning Specialization</h4><p>Coursera & Stanford — March 2025</p></div>
<div class="cert" style="margin-top:8px"><h4>Full-Stack Developer Certificate</h4><p>Udacity — January 2025</p></div>
<div style="margin-top:12px"><p style="font-size:11.5px"><b>Languages:</b> English (Fluent) · Amharic (Fluent) · Tigrinya (Native)</p></div></div>
</div></div></body></html>`;
