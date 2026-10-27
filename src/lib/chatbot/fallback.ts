/** Offline / API failure: retrieve directly from the published portfolio knowledge. */
import projects from "../../app/data/projects";
type Entry={category:string;title:string;content:string;url?:string};
const stop=new Set("a an the is are what who where how does he his of on to and about getachew ekubay tell me please show".split(" "));
const words=(s:string)=>new Set(s.toLowerCase().match(/[a-z0-9]+/g)?.filter(w=>w.length>1&&!stop.has(w))??[]);
const evidence:Entry[]=[
{category:"summary",title:"Professional overview",content:"Getachew Ekubay is an AI/ML and full-stack developer based in Addis Ababa, Ethiopia."},
{category:"education",title:"Education",content:"B.Sc. Electrical and Computer Engineering, Mekelle University, graduated 2026, CGPA 3.93/4.00."},
{category:"contact",title:"Contact",content:"Email: getachewekubay8@gmail.com. GitHub: https://github.com/Gech-E. LinkedIn: https://www.linkedin.com/in/getachewekubay/."},
{category:"skills",title:"Technical skills",content:"Python, TypeScript, React, Next.js, FastAPI, NestJS, PostgreSQL, PyTorch, scikit-learn, RAG, computer vision and recommendation systems."},
...projects.map(p=>({category:"projects",title:p.title,content:`${p.title}: ${p.desc} Technologies: ${p.tags.join(", ")}.`,url:p.githubUrl}))
];
export function generateLocalResponse(query:string):string {
const q=query.trim().toLowerCase();
if (/\b(he|his|getachew|ekubay)\b/.test(q) && ((/\b(where|what|which|location|address|city|country|home)\b/.test(q) && /\b(live|lives|living|reside|resides|based|located|location|address|city|country|home)\b/.test(q)) || /\bwhere\s+(?:is|was|does)\s+(?:he|getachew)\s+from\b/.test(q))) {
  return "Getachew Ekubay is based in Addis Ababa, Ethiopia. His exact residential address is not publicly listed.";
}

if(/^(hi|hello|hey)\b/.test(q))return "Hello! Ask me about Getachew's skills, projects, education or contact information.";
if(/^(thanks|thank you)\b/.test(q))return "You're welcome!";
const qwords=words(q);if(!qwords.size)return "Please ask about a project, skill, education or contact details.";
const scored=evidence.map(e=>{const title=words(e.title),body=words(e.content),cat=words(e.category);let score=0;for(const w of qwords){if(title.has(w))score+=4;else if(cat.has(w))score+=2;else if(body.has(w))score+=1;}return {e,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
if(!scored.length)return "I couldn't find that information in the public portfolio. Contact Getachew at getachewekubay8@gmail.com.";
const relevant=scored.slice(0,q.includes("project")?4:2);
return relevant.map(x=>`${x.e.content}${x.e.url?"\nSource: "+x.e.url:""}`).join("\n\n");
}
export function retrieveChunks(query:string,topK=3){const q=words(query);return evidence.map(e=>({chunk:{id:e.title,category:e.category,keywords:[],content:e.content},score:[...q].filter(w=>words(e.title+" "+e.content+" "+e.category).has(w)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,topK).map(x=>x.chunk);}
