/**
 * ============================================================
 * BLOG POSTS DATA
 * ============================================================
 * To add a new blog post, simply append an object to the array
 * below. Posts are displayed in the order they appear here
 * (newest first recommended).
 *
 * Required fields:
 *   - id          Unique string (e.g. "my-new-post")
 *   - title       Post headline
 *   - excerpt     1-2 sentence preview shown on the card
 *   - content     Full article body (supports **bold** and ```code```)
 *   - category    One of: "AI/ML" | "SWE" | "Career" | "Tutorial"
 *   - tags        Array of keyword tags
 *   - date        Display date string (e.g. "May 1, 2026")
 *   - readTime    Estimated read time (e.g. "5 min read")
 *
 * Optional fields:
 *   - featured    Set true to show a "Featured" badge
 *
 * Content formatting:
 *   - **bold text** renders as emerald-colored bold
 *   - ```code blocks``` render as dark code blocks
 *   - Line breaks are preserved
 * ============================================================
 */

export type BlogCategory = "AI/ML" | "SWE" | "Career" | "Tutorial";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "rag-pipelines",
    title: "Building Production-Ready RAG Pipelines: Lessons from the Trenches",
    excerpt:
      "After deploying RAG systems for healthcare and recruitment, here are the key architectural decisions that made or broke performance — from chunking strategies to re-ranking.",
    content: `Retrieval-Augmented Generation (RAG) has become the go-to pattern for grounding LLM outputs in domain-specific knowledge. But moving from a demo to production reveals critical challenges that tutorials rarely cover.

**1. Chunking Strategy Matters More Than You Think**

Most tutorials use fixed-size chunks (e.g., 512 tokens). In practice, I found that semantic chunking — splitting documents at natural boundaries like paragraphs and sections — produces far better retrieval accuracy. For our Clinical Decision Support System, switching from fixed to semantic chunking improved answer relevance by ~30%.

**2. Hybrid Search > Pure Vector Search**

Pure embedding-based search misses keyword-specific queries. I now use a hybrid approach: BM25 for keyword matching combined with dense embeddings for semantic similarity, then fuse results with Reciprocal Rank Fusion (RRF). This consistently outperforms either approach alone.

**3. Re-ranking Is Non-Negotiable**

The initial retrieval step casts a wide net. Adding a cross-encoder re-ranker (like ColBERT or a fine-tuned model) before passing context to the LLM dramatically improves response quality. It's a small latency cost (~100ms) for a huge accuracy gain.

**4. Evaluation Is Your Best Friend**

Build evaluation pipelines early. I use a combination of RAGAS metrics (faithfulness, answer relevancy, context precision) and human evaluation. Automated evals catch regressions before they reach users.

The difference between a demo RAG system and a production one isn't the model — it's the retrieval engineering around it.`,
    category: "AI/ML",
    tags: ["RAG", "LLM", "LangChain", "Production ML"],
    date: "Apr 10, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "fastapi-vs-express",
    title: "Why I Chose FastAPI Over Express for ML-Powered Backends",
    excerpt:
      "A practical comparison of building ML-serving backends with FastAPI vs Express.js — covering type safety, async performance, and ML library integration.",
    content: `When building backends that serve ML models, the choice of framework matters more than you'd expect. Here's why FastAPI became my default choice after years of using Express.js.

**Type Safety with Pydantic**

FastAPI's deep integration with Pydantic means request/response validation is automatic. When your API accepts complex inputs (image tensors, nested JSON for model configs), Pydantic catches malformed requests before they hit your model code. With Express, you need middleware like Joi or Zod — extra setup that FastAPI handles natively.

**Async by Default**

FastAPI is built on Starlette with native async/await support. For ML APIs that call external services (vector databases, embedding APIs), async endpoints handle concurrent requests efficiently. Express.js can do this too, but Python's ecosystem (aiohttp, asyncpg) integrates more naturally with ML pipelines.

**Python ML Ecosystem**

The biggest advantage: your backend speaks the same language as your models. No serialization between Python model code and a Node.js server. Load a PyTorch model, run inference, return results — all in the same process. With Express, you'd need a separate Python service or ONNX export.

**When I Still Use Express/Next.js**

For frontend-heavy apps with simple CRUD operations, Next.js API routes are hard to beat. I use a split architecture: Next.js for the web layer, FastAPI for the ML layer.

The right tool depends on the job, but for ML-powered backends, FastAPI's Python-native approach eliminates an entire class of integration headaches.`,
    category: "SWE",
    tags: ["FastAPI", "Python", "Backend", "System Design"],
    date: "Mar 28, 2026",
    readTime: "5 min read",
  },
  {
    id: "vit-vs-cnn",
    title: "Vision Transformers vs CNNs: When to Use What in 2026",
    excerpt:
      "Breaking down when Vision Transformers (ViT) outperform traditional CNNs, and the surprising cases where CNNs still win — based on my experience with skin cancer classification and anomaly detection.",
    content: `The "ViTs are always better" narrative oversimplifies reality. After building both CNN and ViT-based systems in production, here's my practical take.

**When CNNs Still Win**

For my Skin Cancer Classification project (94% accuracy), a well-tuned EfficientNet outperformed ViT-Base on our dataset of ~10K dermoscopy images. Why? CNNs' inductive biases (locality, translation equivariance) give them a significant advantage on smaller datasets. ViTs need massive data or heavy augmentation to learn these properties from scratch.

**When ViTs Shine**

For our Vision-Based Anomaly Detection system, ViTs excelled. Anomaly detection requires understanding global context — "does this entire frame look normal?" — which ViTs handle naturally through self-attention. CNNs struggle here because their receptive fields are local by design.

**The Hybrid Sweet Spot**

In practice, I now default to hybrid architectures:
- Use CNN backbones (ConvNeXt, EfficientNetV2) for feature extraction when data is limited
- Use ViT or Swin Transformer when global context matters and data is plentiful
- Consider DINOv2 or other self-supervised ViTs as general-purpose feature extractors

**Practical Advice**

Don't choose based on benchmarks — choose based on your data size, compute budget, and what your task actually requires. A well-trained CNN will beat a poorly-trained ViT every time.`,
    category: "AI/ML",
    tags: ["Computer Vision", "ViT", "CNN", "Deep Learning"],
    date: "Mar 15, 2026",
    readTime: "7 min read",
  },
  {
    id: "cgpa-to-cto",
    title: "From 3.93 CGPA to CTO: What University Won't Teach You About Building Startups",
    excerpt:
      "Lessons from co-founding Gemed Solutions while pursuing my engineering degree — balancing academics, leadership, and shipping real products.",
    content: `Co-founding Gemed Solutions while maintaining a 3.93 CGPA taught me things no course ever could. Here's what I wish I knew earlier.

**Ship First, Perfect Later**

In university, you optimize for grades — completeness, correctness, polish. In startups, you optimize for learning. Our first MVP was embarrassingly basic, but it validated our hypothesis and landed our first 2 pilot clients. That ugly prototype taught us more than months of planning would have.

**Technical Debt Is a Feature, Not a Bug**

As CTO, I had to resist my engineer's urge to build perfect systems. We chose a monolithic FastAPI backend knowing we'd refactor later. Why? Because splitting into microservices before product-market fit is premature optimization. The debt was intentional and strategic.

**Leading a Team ≠ Being the Best Coder**

Managing 4 developers and researchers means your value shifts from writing code to unblocking others. Architecture decisions, code reviews, and clear communication have more impact than any individual contribution. This was the hardest mindset shift.

**Academics Still Matter**

Hot take: maintaining strong grades while building a startup isn't a contradiction — it's signal. It shows you can manage competing priorities, learn quickly, and deliver under pressure. Don't use "I'm building a startup" as an excuse to neglect fundamentals.

**The Intersection Is the Advantage**

Being both technical (3.93 CGPA in ECE) and entrepreneurial (CTO of a funded startup) is rare. Lean into intersections — they're where the most interesting opportunities live.`,
    category: "Career",
    tags: ["Startup", "Leadership", "Career Advice", "Entrepreneurship"],
    date: "Feb 20, 2026",
    readTime: "5 min read",
  },
  {
    id: "agentic-ai-job-matching",
    title: "Agentic AI in Practice: Building an Autonomous Job Matching System",
    excerpt:
      "How I designed an Agentic AI pipeline that autonomously screens resumes, matches candidates, and ranks results — moving beyond simple prompt chaining.",
    content: `Agentic AI goes beyond simple LLM calls — it's about building systems that can reason, plan, and take actions autonomously. Here's how I implemented this for our Job Matching Platform.

**Architecture: Beyond Prompt Chaining**

Simple prompt chains are fragile. Our system uses a ReAct-style agent that:
1. Receives a job description
2. Plans a matching strategy (decides which criteria matter most)
3. Retrieves candidate profiles from our vector store
4. Evaluates each candidate against the strategy
5. Ranks and explains its decisions

The key insight: the agent decides HOW to evaluate, not just WHETHER candidates match.

**Tool Use Is Critical**

Our agent has access to tools: a vector search tool for finding candidates, a skill-matching tool for technical evaluation, and an experience-parser tool for extracting work history. The agent orchestrates these tools based on the job requirements.

**Error Recovery**

Agents fail. Sometimes the LLM hallucinates tool calls or enters infinite loops. We implemented: max iteration limits, output validation at each step, and human-in-the-loop escalation for low-confidence decisions.

**Results**

The agentic approach reduced our time-to-shortlist from hours to minutes, with 87% agreement with human recruiters on top-5 candidate rankings. The autonomous reasoning — not just retrieval — is what made the difference.

Agentic AI isn't magic. It's careful engineering of reasoning loops, tool integration, and failure handling. The "agent" is only as good as the system around it.`,
    category: "AI/ML",
    tags: ["Agentic AI", "LLM", "NLP", "Automation"],
    date: "Feb 5, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "docker-ml-deployment",
    title: "Deploying ML Models with Docker: A No-Nonsense Guide",
    excerpt:
      "Step-by-step walkthrough of containerizing a PyTorch model with FastAPI, optimizing image size, and deploying to Railway — with real Dockerfiles from my projects.",
    content: `Deploying ML models shouldn't be painful. Here's my battle-tested workflow for containerizing and deploying PyTorch models.

**Step 1: Structure Your Project**

\`\`\`
├── app/
│   ├── main.py          # FastAPI app
│   ├── model.py         # Model loading & inference
│   └── schemas.py       # Pydantic schemas
├── models/
│   └── model.pth        # Trained weights
├── Dockerfile
└── requirements.txt
\`\`\`

**Step 2: Optimize Your Docker Image**

The naive approach (using pytorch/pytorch base image) gives you a 6GB+ image. Instead:
- Use python:3.11-slim as base
- Install PyTorch CPU-only (unless you need GPU)
- Use multi-stage builds to separate build and runtime dependencies
- This reduces image size from ~6GB to ~1.2GB

**Step 3: Model Loading Strategy**

Don't load the model on every request. Load it once at startup using FastAPI's lifespan events. Cache the model in memory and serve inference requests from the cached model.

**Step 4: Health Checks & Graceful Shutdown**

Add a /health endpoint that verifies the model is loaded and responsive. This is critical for deployment platforms like Railway or Fly.io that use health checks for zero-downtime deployments.

**Step 5: Deploy**

For Railway/Render: just connect your GitHub repo. The Dockerfile is auto-detected. Set environment variables for any API keys or model configs.

This exact workflow powers my Skin Cancer Classification and Vendor Recommendation deployments. It's simple, reproducible, and scales.`,
    category: "Tutorial",
    tags: ["Docker", "MLOps", "Deployment", "FastAPI"],
    date: "Jan 18, 2026",
    readTime: "6 min read",
  },

  // -------------------------------------------------------
  // ADD NEW BLOG POSTS BELOW THIS LINE
  // -------------------------------------------------------
  // {
  //   id: "my-new-post",
  //   title: "My New Post Title",
  //   excerpt: "A brief summary shown on the card.",
  //   content: `Full article body here.
  //
  //   **Bold headings** are supported.
  //
  //   \`\`\`
  //   code blocks too
  //   \`\`\`
  //   `,
  //   category: "AI/ML",
  //   tags: ["Tag1", "Tag2"],
  //   date: "May 1, 2026",
  //   readTime: "5 min read",
  //   featured: false,
  // },
];

export default blogPosts;

// ============================================================
// CATEGORY CONFIG — controls filter tabs, icons, and colors.
// To add a new category:
//   1. Add it to the BlogCategory type above
//   2. Add an entry here with label, icon name, and color
// ============================================================
export const categoryConfig: {
  label: BlogCategory | "All";
  icon?: string;
  color?: string;
}[] = [
  { label: "All" },
  { label: "AI/ML", icon: "Brain", color: "#34d399" },
  { label: "SWE", icon: "Code", color: "#3b82f6" },
  { label: "Career", icon: "Layers", color: "#f472b6" },
  { label: "Tutorial", icon: "Cpu", color: "#fbbf24" },
];

// Icon map for categories (matches icon string names to components)
import { Brain, Code, Layers, Cpu, type LucideIcon } from "lucide-react";

export const blogIconMap: Record<string, LucideIcon> = {
  Brain,
  Code,
  Layers,
  Cpu,
};

export function getCategoryColor(category: string): string {
  const entry = categoryConfig.find((c) => c.label === category);
  return entry?.color || "#34d399";
}

export function getCategoryIcon(category: string): LucideIcon | null {
  const entry = categoryConfig.find((c) => c.label === category);
  if (!entry?.icon) return null;
  return blogIconMap[entry.icon] || null;
}
