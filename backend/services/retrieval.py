"""Curated portfolio knowledge with a lightweight, relevance-gated lexical index."""
import re
from services.curated_data import KNOWLEDGE as _DATA

RESUME_CHUNKS = [
    {**c, "subcategory": c["title"], "keywords": c["keywords"].split()}
    for c in _DATA["chunks"]
]
STOP = set("a an the is are was were what who how where when can does did he his him she her i you me my about please tell show give list of on in at for to with and or from into have has do some more getachew ekubay".split())
ALIASES={"rag":"retrieval augmented generation","llm":"large language model","cv":"computer vision","ml":"machine learning","ai":"artificial intelligence","job":"experience","work":"experience","school":"education","gpa":"cgpa","code":"github","repo":"github","repository":"github","teacher":"instructor"}
def tokens(text):
    words=re.findall(r"[a-z0-9]+(?:[.+#-][a-z0-9]+)*",text.lower())
    return {ALIASES.get(w,w) for w in words if w not in STOP and len(w)>1}
def retrieve(query, intent=None, top_k=5):
    q=tokens(query)
    if intent=="contact" and any(t in query.lower() for t in ("where", "live", "based", "reside", "location")):
        q |= {"location", "based"}
    if intent=="summary":q |= {"professional", "overview"}
    if not q:return []
    ranked=[]
    for c in RESUME_CHUNKS:
        # Protect explicit contact and education intents from unrelated project matches.
        if intent in ("contact", "education", "experience", "skills") and c["category"] != intent:continue
        title=tokens(c["title"]); keywords=tokens(" ".join(c["keywords"])); body=tokens(c["content"])
        common=q & (title|keywords|body)
        if not common:continue
        score=sum(4 if term in title else 2 if term in keywords else 1 for term in common)/max(1,len(q))
        if intent==c["category"]:score+=0.65
        if intent=="projects" and c["id"]=="projects-overview" and ({"all","overview"}&q):score+=2
        ranked.append((c,round(score,3)))
    ranked.sort(key=lambda x:x[1],reverse=True)
    return ranked[:top_k]
def initialize():return len(RESUME_CHUNKS)
