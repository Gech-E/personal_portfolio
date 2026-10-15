import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf(filename):
    # Standard 1-page letter with 24pt (0.33in) margins
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=28,
        rightMargin=28,
        topMargin=24,
        bottomMargin=24
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY = colors.HexColor('#0f172a')     # Dark Slate/Navy
    ACCENT = colors.HexColor('#1d4ed8')      # Blue 700
    TEXT_DARK = colors.HexColor('#1e293b')   # Slate 800
    TEXT_MUTED = colors.HexColor('#475569')  # Slate 600
    LINE_COLOR = colors.HexColor('#cbd5e1')  # Slate 300

    # Typography Styles
    name_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=21,
        alignment=TA_CENTER,
        textColor=PRIMARY
    )

    subtitle_style = ParagraphStyle(
        'SubTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        alignment=TA_CENTER,
        textColor=ACCENT
    )

    contact_style = ParagraphStyle(
        'Contact',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        alignment=TA_CENTER,
        textColor=TEXT_MUTED
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=PRIMARY,
        spaceAfter=2,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=TEXT_DARK,
        alignment=TA_LEFT
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=TEXT_DARK
    )

    role_title = ParagraphStyle(
        'RoleTitle',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=PRIMARY
    )

    date_style = ParagraphStyle(
        'DateStyle',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10.5,
        alignment=TA_RIGHT,
        textColor=ACCENT
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.2,
        textColor=TEXT_DARK,
        leftIndent=8,
        firstLineIndent=-8
    )

    story = []

    # 1. Header
    story.append(Paragraph("GETACHEW EKUBAY", name_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("FULL-STACK DEVELOPER &amp; AI/ML ENGINEER", subtitle_style))
    story.append(Spacer(1, 2))
    
    contacts = (
        "Mekelle, Ethiopia &nbsp;|&nbsp; "
        "+251 994 659 621 &nbsp;|&nbsp; "
        "<font color='#1d4ed8'>getachewekubay8@gmail.com</font> &nbsp;|&nbsp; "
        "<font color='#1d4ed8'>linkedin.com/in/getachewekubay</font> &nbsp;|&nbsp; "
        "<font color='#1d4ed8'>github.com/Gech-E</font> &nbsp;|&nbsp; "
        "<font color='#1d4ed8'>getachewekubay.vercel.app</font>"
    )
    story.append(Paragraph(contacts, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceBefore=1, spaceAfter=4))

    # Helper for Section Title with Underline
    def add_section_header(title):
        t = Table(
            [[Paragraph(f"<b>{title}</b>", section_header_style)]],
            colWidths=[556]
        )
        t.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('LINEBELOW', (0,0), (-1,-1), 0.75, ACCENT),
        ]))
        story.append(t)
        story.append(Spacer(1, 3))

    # 2. Professional Summary
    add_section_header("Professional Summary")
    summary_text = (
        "High-achieving <b>Full-Stack Developer and AI/ML Engineer</b> (CGPA: <b>3.93/4.0</b>, Great Distinction) "
        "with deep expertise in architecting scalable production web platforms and intelligent systems. "
        "Specialized in <b>FastAPI, Node.js, Express.js, Nest.js, React, Tailwind CSS, and Next.js</b> on the full-stack, alongside "
        "<b>PyTorch, TensorFlow, RAG pipelines, LangChain, AI Agents, Computer Vision, NLP, Speech Recognition, and Recommendation Systems</b>. "
        "Proven background leading technical teams, deploying production models, and optimizing end-to-end architectures for real-world impact."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 3. Technical Skills
    add_section_header("Technical Skills & Core Competencies")
    skills_data = [
        [
            Paragraph("<b>AI &amp; Machine Learning:</b>", body_bold),
            Paragraph("Recommendation Systems, Computer Vision, NLP, RAG Pipelines, Speech Recognition, AI Agents, LangChain, Chatbots, Deep Learning, Supervised/Unsupervised Learning", body_style)
        ],
        [
            Paragraph("<b>Backend &amp; APIs:</b>", body_bold),
            Paragraph("FastAPI, Node.js, Express.js, Nest.js, Python, TypeScript, RESTful APIs, Microservices, Async Architecture", body_style)
        ],
        [
            Paragraph("<b>Frontend &amp; UI:</b>", body_bold),
            Paragraph("React, Next.js, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3, Responsive Design, State Management", body_style)
        ],
        [
            Paragraph("<b>Frameworks &amp; ML Tools:</b>", body_bold),
            Paragraph("PyTorch, TensorFlow, Scikit-learn, Hugging Face, OpenCV, Vector Databases (Chroma/FAISS)", body_style)
        ],
        [
            Paragraph("<b>Databases &amp; Cloud:</b>", body_bold),
            Paragraph("PostgreSQL, MongoDB, Redis, MySQL, Docker, Kubernetes, AWS, Google Cloud, Git/GitHub, CI/CD", body_style)
        ]
    ]
    st = Table(skills_data, colWidths=[125, 431])
    st.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(st)
    story.append(Spacer(1, 4))

    # 4. Professional Experience
    add_section_header("Professional Experience")

    # Experience 1: Memi Trading
    exp1 = [
        [
            Paragraph("<b>AI/ML Engineer Intern</b> &nbsp;|&nbsp; <i>Memi Trading PLC</i>", role_title),
            Paragraph("Jun 2025 – Present &nbsp;|&nbsp; Addis Ababa, ET", date_style)
        ]
    ]
    t_exp1 = Table(exp1, colWidths=[400, 156])
    t_exp1.setStyle(TableStyle([('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp1)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("•&nbsp; Architected and deployed 3 production-grade AI applications utilizing <b>FastAPI, Node.js, and Next.js</b>, reducing manual processing time by <b>65%</b> for enterprise inventory forecasting and vendor matching.", bullet_style))
    story.append(Paragraph("•&nbsp; Implemented a <b>hybrid RAG (Retrieval-Augmented Generation)</b> pipeline with dense-sparse embeddings and vector indexing, powering rapid diagnostic retrieval in a Clinical Decision Support System (CDSS).", bullet_style))
    story.append(Paragraph("•&nbsp; Streamlined backend inference endpoints with asynchronous worker pools, cutting average API latency by <b>40%</b>.", bullet_style))
    story.append(Spacer(1, 3))

    # Experience 2: Gemed Solutions
    exp2 = [
        [
            Paragraph("<b>Chief Technology Officer (CTO) &amp; Co-Founder</b> &nbsp;|&nbsp; <i>Gemed Solutions</i>", role_title),
            Paragraph("Dec 2025 – Present &nbsp;|&nbsp; Mekelle, ET", date_style)
        ]
    ]
    t_exp2 = Table(exp2, colWidths=[400, 156])
    t_exp2.setStyle(TableStyle([('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp2)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("•&nbsp; Directed an engineering team of 4 software developers and researchers to build an end-to-end AI incubation and analytics platform; secured first 2 commercial pilot clients within 3 months.", bullet_style))
    story.append(Paragraph("•&nbsp; Designed scalable full-stack system architecture using <b>React, Nest.js, FastAPI, PostgreSQL, and Docker</b>, delivering real-time predictive analytics and business intelligence for <b>15+ startups</b>.", bullet_style))
    story.append(Paragraph("•&nbsp; Established CI/CD deployment pipelines, automated linting/testing protocols, and robust schema migrations maintaining <b>99.9% uptime</b>.", bullet_style))
    story.append(Spacer(1, 3))

    # Experience 3: Tech Club Coordinator
    exp3 = [
        [
            Paragraph("<b>Program &amp; Event Coordinator</b> &nbsp;|&nbsp; <i>Born to Win Tech Club</i>", role_title),
            Paragraph("Sep 2025 – Present &nbsp;|&nbsp; Mekelle, ET", date_style)
        ]
    ]
    t_exp3 = Table(exp3, colWidths=[400, 156])
    t_exp3.setStyle(TableStyle([('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp3)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("•&nbsp; Organized 12 hands-on workshops on <b>Generative AI, Agentic workflows, and Full-Stack Engineering</b>, expanding active club membership from 45 to <b>180+ members</b>.", bullet_style))
    story.append(Paragraph("•&nbsp; Mentored 500+ university students in data structures, algorithms, PyTorch machine learning, and modern web frameworks.", bullet_style))
    story.append(Spacer(1, 4))

    # 5. Key Projects
    add_section_header("Selected Projects")
    
    proj_items = [
        ("AI-Powered Recommendation & E-Commerce Platform", "Next.js, FastAPI, PyTorch, PostgreSQL", "Built full-stack e-commerce engine with collaborative filtering and matrix factorization recommendation algorithms, boosting item discovery by 35%."),
        ("Clinical Decision Support System (CDSS)", "Python, RAG, LangChain, NLP, FastAPI", "Engineered intelligent diagnostic assistant processing multi-modal clinical symptoms, integrating RAG literature retrieval with 94% precision."),
        ("Computer Vision Anomaly & Dermoscopy Classifier", "PyTorch, OpenCV, CNNs, React, FastAPI", "Trained convolutional neural network on dermoscopy imaging for skin lesion classification; integrated real-time video anomaly detection via contrastive learning."),
        ("Autonomous AI Agent Job Matching Platform", "LangChain, AI Agents, Vector DB, Express.js", "Designed autonomous agents evaluating candidate CVs against dynamic job specifications using multi-step semantic reasoning and vector similarity.")
    ]

    for title, tech, desc in proj_items:
        t_proj = Table([
            [Paragraph(f"•&nbsp; <b>{title}</b> &nbsp;|&nbsp; <font color='#1d4ed8'><i>{tech}</i></font>", body_bold)],
            [Paragraph(f"&nbsp;&nbsp; {desc}", body_style)]
        ], colWidths=[556])
        t_proj.setStyle(TableStyle([
            ('PADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,1), (-1,1), 1.5)
        ]))
        story.append(t_proj)

    story.append(Spacer(1, 3))

    # 6. Education & Certifications
    add_section_header("Education & Certifications")
    edu_table = [
        [
            Paragraph("<b>B.Sc. in Electrical &amp; Computer Engineering</b> &nbsp;|&nbsp; <i>Mekelle University</i>", role_title),
            Paragraph("Expected Jul 2026 &nbsp;|&nbsp; <b>CGPA: 3.93/4.0</b>", date_style)
        ],
        [
            Paragraph("•&nbsp; <b>Honors:</b> Top Academic Performer &amp; Honorable Graduate of 2026; 1st Place Winner of Mekelle Incubation Center Startup Pitch.", bullet_style),
            Paragraph("", body_style)
        ],
        [
            Paragraph("•&nbsp; <b>Relevant Coursework:</b> Artificial Intelligence, Data Structures &amp; Algorithms, Computer Networks, Software Engineering, Database Systems.", bullet_style),
            Paragraph("", body_style)
        ],
        [
            Paragraph("•&nbsp; <b>Certifications:</b> Machine Learning Specialization (Stanford &amp; DeepLearning.AI) &nbsp;|&nbsp; Full-Stack Web Developer (Udacity)", bullet_style),
            Paragraph("", body_style)
        ]
    ]
    t_edu = Table(edu_table, colWidths=[385, 171])
    t_edu.setStyle(TableStyle([
        ('PADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1)
    ]))
    story.append(t_edu)

    doc.build(story)

if __name__ == "__main__":
    out_path = "public/Getachew_Ekubay_AI_Engineer_Resume.pdf"
    os.makedirs("public", exist_ok=True)
    build_pdf(out_path)
    print("Built", out_path)
    
    # Also copy to src/imports
    os.makedirs("src/imports", exist_ok=True)
    import shutil
    shutil.copyfile(out_path, "src/imports/Getachew_Ekubay_AI_Engineer_Resume.pdf")
    print("Copied to src/imports")
