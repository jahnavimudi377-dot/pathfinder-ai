import { UserProfile } from "@/context/UserContext";

export interface CareerSuggestion {
  title: string;
  matchPercent: number;
  whySuitable: string;
  missingSkills: string[];
  roadmap: string[];
}

// Keyword -> career mappings generated dynamically
const CAREER_RULES: {
  keywords: string[];
  career: string;
  requiredSkills: string[];
  roadmap: string[];
  domain: string;
}[] = [
  { keywords: ["react", "javascript", "html", "css", "frontend", "web", "typescript", "angular", "vue"], career: "Frontend Developer", requiredSkills: ["react", "javascript", "css", "typescript", "html"], roadmap: ["Learn HTML/CSS fundamentals", "Master JavaScript & TypeScript", "Build projects with React", "Learn state management", "Deploy portfolio projects"], domain: "technology" },
  { keywords: ["node", "express", "api", "backend", "server", "database", "sql", "rest", "graphql"], career: "Backend Developer", requiredSkills: ["node.js", "databases", "api design", "sql", "security"], roadmap: ["Learn server-side programming", "Master databases (SQL & NoSQL)", "Build REST APIs", "Learn authentication & security", "Deploy to cloud platforms"], domain: "technology" },
  { keywords: ["java", "spring", "enterprise", "oop", "c++", "c#", "software"], career: "Software Engineer", requiredSkills: ["java", "data structures", "algorithms", "system design", "testing"], roadmap: ["Master a core language (Java/C++)", "Study data structures & algorithms", "Learn system design", "Contribute to open source", "Practice coding interviews"], domain: "technology" },
  { keywords: ["python", "data", "analysis", "statistics", "excel", "visualization", "pandas", "numpy"], career: "Data Analyst", requiredSkills: ["python", "sql", "statistics", "data visualization", "excel"], roadmap: ["Learn Python & SQL", "Study statistics fundamentals", "Master visualization tools", "Work on real datasets", "Build a portfolio of analyses"], domain: "data" },
  { keywords: ["machine learning", "ml", "ai", "deep learning", "tensorflow", "pytorch", "neural"], career: "Machine Learning Engineer", requiredSkills: ["python", "machine learning", "deep learning", "math", "tensorflow"], roadmap: ["Master Python & math foundations", "Learn ML algorithms", "Study deep learning frameworks", "Build ML projects", "Publish research or kaggle entries"], domain: "data" },
  { keywords: ["design", "figma", "ui", "ux", "user experience", "prototype", "wireframe", "sketch"], career: "UX/UI Designer", requiredSkills: ["figma", "user research", "wireframing", "prototyping", "visual design"], roadmap: ["Learn design principles", "Master Figma/Sketch", "Study user research methods", "Build a design portfolio", "Learn basic frontend coding"], domain: "design" },
  { keywords: ["devops", "docker", "kubernetes", "ci/cd", "aws", "cloud", "linux", "terraform", "azure"], career: "DevOps Engineer", requiredSkills: ["linux", "docker", "kubernetes", "ci/cd", "cloud platforms"], roadmap: ["Master Linux administration", "Learn containerization (Docker)", "Study orchestration (Kubernetes)", "Implement CI/CD pipelines", "Get cloud certifications"], domain: "technology" },
  { keywords: ["mobile", "android", "ios", "flutter", "react native", "swift", "kotlin"], career: "Mobile App Developer", requiredSkills: ["react native", "mobile ui", "api integration", "app stores", "testing"], roadmap: ["Choose a framework (React Native/Flutter)", "Learn mobile UI patterns", "Build and publish an app", "Master state management", "Study app performance optimization"], domain: "technology" },
  { keywords: ["security", "cybersecurity", "hacking", "ethical hacking", "penetration", "network security"], career: "Cybersecurity Analyst", requiredSkills: ["networking", "security tools", "ethical hacking", "cryptography", "incident response"], roadmap: ["Learn networking fundamentals", "Study security principles", "Practice with CTF challenges", "Get certified (CompTIA/CEH)", "Build a home security lab"], domain: "technology" },
  { keywords: ["writing", "content", "blog", "copywriting", "seo", "editing", "journalism"], career: "Content Writer / Copywriter", requiredSkills: ["writing", "seo", "research", "editing", "content strategy"], roadmap: ["Develop strong writing habits", "Learn SEO fundamentals", "Build a writing portfolio", "Study content marketing", "Freelance or join a publication"], domain: "creative" },
  { keywords: ["marketing", "digital marketing", "social media", "ads", "branding", "growth"], career: "Digital Marketing Specialist", requiredSkills: ["social media", "analytics", "seo", "advertising", "content creation"], roadmap: ["Learn marketing fundamentals", "Master social media platforms", "Study Google/Meta ads", "Build campaigns from scratch", "Analyze and optimize results"], domain: "business" },
  { keywords: ["product", "management", "roadmap", "agile", "scrum", "stakeholder"], career: "Product Manager", requiredSkills: ["product strategy", "agile", "analytics", "communication", "user research"], roadmap: ["Learn product management basics", "Study agile/scrum methodologies", "Build product roadmaps", "Practice stakeholder communication", "Launch a side product"], domain: "business" },
  { keywords: ["business", "entrepreneurship", "startup", "strategy", "leadership", "management"], career: "Business Analyst / Entrepreneur", requiredSkills: ["business strategy", "financial analysis", "communication", "leadership", "market research"], roadmap: ["Study business fundamentals", "Learn financial modeling", "Build a business plan", "Network with entrepreneurs", "Launch a minimum viable product"], domain: "business" },
  { keywords: ["teaching", "education", "tutoring", "mentoring", "curriculum", "training"], career: "Education / Training Specialist", requiredSkills: ["communication", "curriculum design", "patience", "subject expertise", "assessment"], roadmap: ["Deepen subject matter expertise", "Learn instructional design", "Practice teaching/tutoring", "Build course materials", "Get teaching certifications"], domain: "education" },
  { keywords: ["game", "gaming", "unity", "unreal", "game design", "3d", "animation"], career: "Game Developer", requiredSkills: ["game engines", "c#/c++", "3d modeling", "game design", "physics"], roadmap: ["Learn a game engine (Unity/Unreal)", "Study game design principles", "Build small game projects", "Learn 3D modeling basics", "Publish a game to a platform"], domain: "creative" },
  { keywords: ["blockchain", "crypto", "web3", "smart contract", "solidity", "ethereum", "defi"], career: "Blockchain Developer", requiredSkills: ["solidity", "smart contracts", "cryptography", "web3", "defi protocols"], roadmap: ["Learn blockchain fundamentals", "Master Solidity", "Build smart contracts", "Study DeFi protocols", "Contribute to web3 projects"], domain: "technology" },
  { keywords: ["photography", "photo", "camera", "editing", "lightroom", "photoshop", "visual"], career: "Photographer / Visual Creator", requiredSkills: ["camera operation", "photo editing", "composition", "lighting", "storytelling"], roadmap: ["Master camera fundamentals", "Learn photo editing software", "Build a portfolio", "Study lighting techniques", "Start freelancing or selling prints"], domain: "creative" },
  { keywords: ["music", "audio", "sound", "production", "mixing", "dj"], career: "Audio / Music Producer", requiredSkills: ["audio production", "mixing", "music theory", "daw software", "sound design"], roadmap: ["Learn music theory basics", "Master a DAW (Ableton/FL Studio)", "Study mixing & mastering", "Create and release tracks", "Collaborate with artists"], domain: "creative" },
  { keywords: ["health", "medical", "healthcare", "nursing", "biology", "medicine", "clinical"], career: "Healthcare Professional", requiredSkills: ["biology", "patient care", "medical knowledge", "communication", "empathy"], roadmap: ["Study biology & health sciences", "Get relevant certifications", "Gain clinical experience", "Specialize in an area", "Continue medical education"], domain: "health" },
  { keywords: ["finance", "accounting", "banking", "investment", "trading", "stocks", "economics"], career: "Financial Analyst", requiredSkills: ["financial modeling", "excel", "accounting", "economics", "data analysis"], roadmap: ["Learn accounting & economics", "Master Excel & financial models", "Study investment principles", "Get CFA/CPA certification", "Build financial analysis projects"], domain: "business" },
];

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

function matchScore(userTokens: string[], keywords: string[]): number {
  let hits = 0;
  for (const kw of keywords) {
    if (userTokens.some((t) => t.includes(kw) || kw.includes(t))) {
      hits++;
    }
  }
  return hits;
}

export function generateCareerSuggestions(profile: UserProfile): CareerSuggestion[] {
  const allInput = [
    ...profile.skills,
    ...profile.interests,
    ...profile.goals,
    ...profile.strengths,
  ];
  const tokens = allInput.map(normalize).flatMap((s) => s.split(/[\s,]+/));

  if (tokens.length === 0) return [];

  const scored = CAREER_RULES.map((rule) => {
    const skillMatch = matchScore(tokens, rule.keywords);
    const maxPossible = Math.min(rule.keywords.length, tokens.length);
    const rawPercent = maxPossible > 0 ? (skillMatch / maxPossible) * 100 : 0;
    const percent = Math.min(98, Math.max(rawPercent > 0 ? 35 : 0, Math.round(rawPercent * 1.3)));

    const userSkillsNorm = profile.skills.map(normalize);
    const missing = rule.requiredSkills.filter(
      (rs) => !userSkillsNorm.some((us) => us.includes(rs) || rs.includes(us))
    );

    const interestTokens = profile.interests.map(normalize).flatMap((s) => s.split(/[\s,]+/));
    const interestMatch = matchScore(interestTokens, rule.keywords);
    const bonus = interestMatch * 5;

    return {
      title: rule.career,
      matchPercent: Math.min(98, percent + bonus),
      whySuitable: buildWhyText(profile, rule.career, rule.keywords, tokens),
      missingSkills: missing.slice(0, 4),
      roadmap: rule.roadmap,
      score: skillMatch + interestMatch,
    };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 6);

  return scored;
}

function buildWhyText(profile: UserProfile, career: string, keywords: string[], tokens: string[]): string {
  const matched = keywords.filter((kw) => tokens.some((t) => t.includes(kw) || kw.includes(t)));
  const name = profile.name || "You";
  if (matched.length === 0) return `${name}, this career aligns with your overall profile.`;
  const skillList = matched.slice(0, 3).join(", ");
  return `${name}, your experience with ${skillList} makes you a great fit for ${career}. This role leverages your strengths and aligns with your goals.`;
}
