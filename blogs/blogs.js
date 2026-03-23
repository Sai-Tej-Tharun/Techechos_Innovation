/**
 * TechEchos Innovation — blogs/blogs.js
 * Blogs page: hero canvas, search, filter, sort,
 * masonry grid with 24 articles linking to 6 blog-details pages,
 * deep dives, newsletter, topic cloud, authors.
 */
'use strict';

/* ─────────────────────────────────────────────
   ALL BLOG ARTICLES DATA
   6 unique href targets (blog-details pages)
   24 articles total spread across them
   ───────────────────────────────────────────── */

const ALL_ARTICLES = [

  
  {
    id:1, slug:'ai-trends',
    href:'../blog-details/ai-trends.html',
    category:'AI / ML', catClass:'bl-cat-ai',
    title:'The AI Revolution in Software Development — What Every Engineer Must Know in 2025',
    excerpt:'LLMs, autonomous agents, AI-assisted debugging — the way software is built is changing faster than at any point since the birth of the internet. Here\'s what\'s real and what every team needs to start doing now.',
    tags:['LLMs','AI Agents','Engineering','2025'],
    author:'Anika Singh', authorRole:'Head of AI & Data', authorInitials:'AS', authorGrad:'linear-gradient(135deg,#7B2FBE,#EC4899)',
    date:'March 10, 2025', readTime:'12 min read',
    gradient:'linear-gradient(135deg,#7B2FBE 0%,#EC4899 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    popular:980, wide: false,
  },
  {
    id:2, slug:'ai-trends',
    href:'../blog-details/ai-trends.html',
    category:'AI / ML', catClass:'bl-cat-ai',
    title:'Building Production LLM Applications: The Architecture Decisions That Actually Matter',
    excerpt:'Embeddings vs fine-tuning. RAG vs context stuffing. Prompt engineering vs tool calling. After shipping 15 LLM-powered features, here\'s the opinionated guide we wish existed when we started.',
    tags:['LLM Architecture','RAG','Production AI'],
    author:'Anika Singh', authorRole:'Head of AI & Data', authorInitials:'AS', authorGrad:'linear-gradient(135deg,#7B2FBE,#EC4899)',
    date:'February 28, 2025', readTime:'18 min read',
    gradient:'linear-gradient(135deg,#4C1D95 0%,#7B2FBE 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2"/><path d="M12 6v6l4 2"/></svg>`,
    popular:1240, wide: false,
  },
  {
    id:3, slug:'ai-trends',
    href:'../blog-details/ai-trends.html',
    category:'AI / ML', catClass:'bl-cat-ai',
    title:'Why Most Computer Vision Projects Fail in Production (And How to Fix Them)',
    excerpt:'Model accuracy in notebooks vs real-world environments are two completely different things. We\'ve shipped 8 CV products. Here are the lessons that cost us time and money so they don\'t have to cost you.',
    tags:['Computer Vision','YOLO','Production ML'],
    author:'Anika Singh', authorRole:'Head of AI & Data', authorInitials:'AS', authorGrad:'linear-gradient(135deg,#7B2FBE,#EC4899)',
    date:'February 14, 2025', readTime:'14 min read',
    gradient:'linear-gradient(135deg,#6D28D9 0%,#A78BFA 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    popular:876, wide: false,
  },
  {
    id:4, slug:'ai-trends',
    href:'../blog-details/ai-trends.html',
    category:'AI / ML', catClass:'bl-cat-ai',
    title:'The Anatomy of a Great AI Product: From Dataset to Deployed Feature',
    excerpt:'AI products are not just models — they\'re data pipelines, inference infrastructure, monitoring systems, and user experiences. A complete walkthrough of how we build them end-to-end.',
    tags:['AI Product','MLOps','Data Pipeline'],
    author:'Karan Mehta', authorRole:'ML Engineer', authorInitials:'KM', authorGrad:'linear-gradient(135deg,#0056b3,#00CFFF)',
    date:'January 30, 2025', readTime:'20 min read',
    gradient:'linear-gradient(135deg,#1D4ED8 0%,#7C3AED 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    popular:1090, wide: true,
  },

  
  {
    id:5, slug:'cloud-migration',
    href:'../blog-details/cloud-migration.html',
    category:'Cloud', catClass:'bl-cat-cloud',
    title:'The 7-Step Cloud Migration Playbook That Actually Works',
    excerpt:'Moving to the cloud shouldn\'t be a gamble. Our battle-tested playbook — used across 20+ client migrations — walks you through risk mitigation, zero-downtime strategies and cost optimisation at every stage.',
    tags:['AWS','Cloud Migration','DevOps'],
    author:'Vikram Mehta', authorRole:'Head of Cloud', authorInitials:'VM', authorGrad:'linear-gradient(135deg,#22C55E,#007BFF)',
    date:'March 5, 2025', readTime:'15 min read',
    gradient:'linear-gradient(135deg,#0369A1 0%,#22C55E 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    popular:1560, wide: false,
  },
  {
    id:6, slug:'cloud-migration',
    href:'../blog-details/cloud-migration.html',
    category:'Cloud', catClass:'bl-cat-cloud',
    title:'Kubernetes at Scale: 10 Mistakes We Made So You Don\'t Have To',
    excerpt:'We run Kubernetes clusters handling millions of requests per day. We\'ve made every mistake in the book. This is the honest retrospective of what broke, why, and the patterns that fixed it.',
    tags:['Kubernetes','DevOps','SRE'],
    author:'Vikram Mehta', authorRole:'Head of Cloud', authorInitials:'VM', authorGrad:'linear-gradient(135deg,#22C55E,#007BFF)',
    date:'February 20, 2025', readTime:'16 min read',
    gradient:'linear-gradient(135deg,#065F46 0%,#0369A1 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    popular:1380, wide: false,
  },
  {
    id:7, slug:'cloud-migration',
    href:'../blog-details/cloud-migration.html',
    category:'Cloud', catClass:'bl-cat-cloud',
    title:'AWS Cost Optimisation: How We Cut Client Bills by 60% Without Touching Features',
    excerpt:'Reserved instances, Spot pricing, S3 lifecycle policies, right-sizing compute — the practical toolkit we use to slash cloud costs while keeping uptime at 99.9%.',
    tags:['AWS','Cost Optimisation','FinOps'],
    author:'Vikram Mehta', authorRole:'Head of Cloud', authorInitials:'VM', authorGrad:'linear-gradient(135deg,#22C55E,#007BFF)',
    date:'January 25, 2025', readTime:'11 min read',
    gradient:'linear-gradient(135deg,#047857 0%,#0284C7 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    popular:2100, wide: false,
  },
  {
    id:8, slug:'cloud-migration',
    href:'../blog-details/cloud-migration.html',
    category:'Cloud', catClass:'bl-cat-cloud',
    title:'Infrastructure as Code with Terraform: From Zero to Production in Under a Day',
    excerpt:'A hands-on walkthrough of building a fully reproducible, multi-environment AWS infrastructure with Terraform — VPCs, ECS clusters, RDS, CloudFront and all — with code you can use today.',
    tags:['Terraform','IaC','AWS','Infrastructure'],
    author:'Pranith Reddy', authorRole:'VP Engineering', authorInitials:'AR', authorGrad:'linear-gradient(135deg,#0056b3,#00CFFF)',
    date:'January 10, 2025', readTime:'22 min read',
    gradient:'linear-gradient(135deg,#1E40AF 0%,#0891B2 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    popular:940, wide: false,
  },

  
  {
    id:9, slug:'digital-transformation',
    href:'../blog-details/digital-transformation.html',
    category:'Strategy', catClass:'bl-cat-startup',
    title:'Digital Transformation Is Dead — Long Live Product Thinking',
    excerpt:'The phrase "digital transformation" has been so abused it\'s almost meaningless. Here\'s the honest reframe that actually helps companies change: stop transforming technology, start building products that solve problems.',
    tags:['Strategy','Product Thinking','Digital'],
    author:'Yashrab Unnisa ', authorRole:'CEO & Co-Founder', authorInitials:'RS', authorGrad:'linear-gradient(135deg,#EC4899,#7B2FBE)',
    date:'March 8, 2025', readTime:'10 min read',
    gradient:'linear-gradient(135deg,#BE185D 0%,#7B2FBE 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    popular:720, wide: false,
  },
  {
    id:10, slug:'digital-transformation',
    href:'../blog-details/digital-transformation.html',
    category:'Strategy', catClass:'bl-cat-startup',
    title:'How to Choose the Right Tech Stack for Your Startup in 2025',
    excerpt:'The wrong stack early is survivable. The wrong stack at Series A is a rewrite. Here\'s the framework we use when advising founders on technology decisions that will define the next 3 years of their product.',
    tags:['Tech Stack','Startup','Architecture'],
    author:'Priya Nair', authorRole:'CTO & Co-Founder', authorInitials:'PN', authorGrad:'linear-gradient(135deg,#F97316,#EC4899)',
    date:'February 18, 2025', readTime:'13 min read',
    gradient:'linear-gradient(135deg,#9D174D 0%,#F97316 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>`,
    popular:1820, wide: false,
  },
  {
    id:11, slug:'digital-transformation',
    href:'../blog-details/digital-transformation.html',
    category:'Strategy', catClass:'bl-cat-startup',
    title:'The Real Cost of Technical Debt: A CFO\'s Perspective on Engineering Quality',
    excerpt:'Technical debt isn\'t an engineering problem — it\'s a business risk. We\'ve seen it kill products, block fundraising and lose clients. Here\'s how to frame it for the boardroom and what to actually do about it.',
    tags:['Technical Debt','Engineering Quality','Leadership'],
    author:'Yashrab Unnisa ', authorRole:'CEO & Co-Founder', authorInitials:'RS', authorGrad:'linear-gradient(135deg,#EC4899,#7B2FBE)',
    date:'February 5, 2025', readTime:'9 min read',
    gradient:'linear-gradient(135deg,#831843 0%,#6D28D9 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    popular:1340, wide: false,
  },
  {
    id:12, slug:'digital-transformation',
    href:'../blog-details/digital-transformation.html',
    category:'Strategy', catClass:'bl-cat-startup',
    title:'From Idea to Series A: The 18-Month Engineering Roadmap We\'d Give Every Founder',
    excerpt:'Based on helping 30+ startups go from zero to their first institutional round, here is the engineering strategy that consistently de-risks the journey and creates the product leverage investors love to see.',
    tags:['Startup Roadmap','Series A','Founder Advice'],
    author:'Priya Nair', authorRole:'CTO & Co-Founder', authorInitials:'PN', authorGrad:'linear-gradient(135deg,#F97316,#EC4899)',
    date:'January 20, 2025', readTime:'17 min read',
    gradient:'linear-gradient(135deg,#7C3AED 0%,#DB2777 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    popular:2340, wide: true,
  },

  
  {
    id:13, slug:'startup-advice',
    href:'../blog-details/startup-advice.html',
    category:'Startup', catClass:'bl-cat-startup',
    title:'Why Startups Fail at Technology: The 7 Patterns We See Over and Over Again',
    excerpt:'After working with 150+ startups, we see the same failure patterns repeat with remarkable consistency. Not bad luck — bad decisions that feel like good decisions at the time. Here\'s what to watch for.',
    tags:['Startups','Failure Patterns','Product'],
    author:'Yashrab Unnisa ', authorRole:'CEO & Co-Founder', authorInitials:'RS', authorGrad:'linear-gradient(135deg,#EC4899,#7B2FBE)',
    date:'March 3, 2025', readTime:'11 min read',
    gradient:'linear-gradient(135deg,#EC4899 0%,#F97316 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    popular:2890, wide: false,
  },
  {
    id:14, slug:'startup-advice',
    href:'../blog-details/startup-advice.html',
    category:'Startup', catClass:'bl-cat-startup',
    title:'The MVP Trap: Why Building Less Is Actually Harder Than Building More',
    excerpt:'Everyone tells you to "build an MVP." Almost nobody tells you how hard it is to decide what to cut. Here\'s the mental model we use with founders to find the smallest possible thing that proves the biggest possible assumption.',
    tags:['MVP','Product Strategy','Lean'],
    author:'Rahul Joshi', authorRole:'Head of Product', authorInitials:'RJ', authorGrad:'linear-gradient(135deg,#F97316,#FFB623)',
    date:'February 24, 2025', readTime:'8 min read',
    gradient:'linear-gradient(135deg,#D97706 0%,#DC2626 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    popular:1750, wide: false,
  },
  {
    id:15, slug:'startup-advice',
    href:'../blog-details/startup-advice.html',
    category:'Startup', catClass:'bl-cat-startup',
    title:'Hiring Your First 10 Engineers: The Playbook Nobody Shares Publicly',
    excerpt:'The first 10 engineers set your technical culture, establish your hiring bar, and determine whether your early codebase is a foundation or a ball of mud. Here\'s the process we\'d use if we were starting again today.',
    tags:['Hiring','Engineering Culture','Startup'],
    author:'Pranith Reddy', authorRole:'VP Engineering', authorInitials:'AR', authorGrad:'linear-gradient(135deg,#0056b3,#00CFFF)',
    date:'February 10, 2025', readTime:'14 min read',
    gradient:'linear-gradient(135deg,#B45309 0%,#EC4899 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    popular:1430, wide: false,
  },

  
  {
    id:16, slug:'ux-design-2025',
    href:'../blog-details/ux-design-2025.html',
    category:'Design', catClass:'bl-cat-design',
    title:'Design Systems in 2025: Why Your Component Library Is Costing You More Than It\'s Saving',
    excerpt:'Design systems are supposed to speed you up. Most of them slow you down. We\'ve built 4 design systems from scratch and audited a dozen more. Here is what separates the ones that work from the ones that gather dust.',
    tags:['Design Systems','Component Library','UI'],
    author:'Sneha Patel', authorRole:'Head of Design', authorInitials:'SP', authorGrad:'linear-gradient(135deg,#22C55E,#007BFF)',
    date:'March 6, 2025', readTime:'13 min read',
    gradient:'linear-gradient(135deg,#D97706 0%,#EA580C 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>`,
    popular:1620, wide: false,
  },
  {
    id:17, slug:'ux-design-2025',
    href:'../blog-details/ux-design-2025.html',
    category:'Design', catClass:'bl-cat-design',
    title:'The Product Designer\'s Complete Guide to Performance-Aware Design',
    excerpt:'Beautiful interfaces that load slowly are bad products. Here\'s how to design with web performance in mind from the first frame — font choices, animation budgets, image strategies and the metrics that actually matter.',
    tags:['Performance','Design','Web Vitals','UX'],
    author:'Sneha Patel', authorRole:'Head of Design', authorInitials:'SP', authorGrad:'linear-gradient(135deg,#22C55E,#007BFF)',
    date:'February 22, 2025', readTime:'11 min read',
    gradient:'linear-gradient(135deg,#92400E 0%,#D97706 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13.5V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.5"/><path d="M12 17v4"/><path d="M8 21h8"/><rect x="4" y="15" width="16" height="2" rx="1"/></svg>`,
    popular:890, wide: false,
  },
  {
    id:18, slug:'ux-design-2025',
    href:'../blog-details/ux-design-2025.html',
    category:'Design', catClass:'bl-cat-design',
    title:'Accessible by Default: How We Bake WCAG AA into Every Product from Day One',
    excerpt:'Accessibility is not a feature you add at the end. It\'s a practice you embed from the first wireframe. Here\'s our end-to-end process for shipping products that work for every user, every time.',
    tags:['Accessibility','WCAG','Inclusive Design'],
    author:'Sneha Patel', authorRole:'Head of Design', authorInitials:'SP', authorGrad:'linear-gradient(135deg,#22C55E,#007BFF)',
    date:'January 28, 2025', readTime:'16 min read',
    gradient:'linear-gradient(135deg,#F59E0B 0%,#EF4444 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    popular:1050, wide: false,
  },

  
  {
    id:19, slug:'cybersecurity-tips',
    href:'../blog-details/cybersecurity-tips.html',
    category:'Security', catClass:'bl-cat-security',
    title:'The Security Audit Every SaaS Startup Should Do Before Their First Enterprise Client',
    excerpt:'Enterprise clients have security teams that will ask hard questions. Most startups are embarrassingly unprepared. Here\'s the 40-point audit we run on every product before it goes near an enterprise deal.',
    tags:['Security Audit','SaaS','Enterprise','SOC 2'],
    author:'Pranith Reddy', authorRole:'VP Engineering', authorInitials:'AR', authorGrad:'linear-gradient(135deg,#0056b3,#00CFFF)',
    date:'March 1, 2025', readTime:'19 min read',
    gradient:'linear-gradient(135deg,#166534 0%,#0369A1 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    popular:1680, wide: false,
  },
  {
    id:20, slug:'cybersecurity-tips',
    href:'../blog-details/cybersecurity-tips.html',
    category:'Security', catClass:'bl-cat-security',
    title:'Zero Trust Architecture: The Practical Guide for Engineering Teams That Don\'t Have a CISO',
    excerpt:'Zero Trust sounds like enterprise jargon until your startup gets breached. Here\'s the practical, no-budget-required implementation guide that every engineering team can start using this week.',
    tags:['Zero Trust','Security Architecture','DevSecOps'],
    author:'Pranith Reddy', authorRole:'VP Engineering', authorInitials:'AR', authorGrad:'linear-gradient(135deg,#0056b3,#00CFFF)',
    date:'February 15, 2025', readTime:'15 min read',
    gradient:'linear-gradient(135deg,#14532D 0%,#1E3A5F 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    popular:1220, wide: false,
  },
  {
    id:21, slug:'cybersecurity-tips',
    href:'../blog-details/cybersecurity-tips.html',
    category:'Security', catClass:'bl-cat-security',
    title:'API Security Checklist: 25 Things Every Backend Developer Must Implement',
    excerpt:'APIs are the attack surface that most developers leave wide open. From authentication edge cases to rate limiting to SQL injection to SSRF — the complete checklist we use on every TechEchos project.',
    tags:['API Security','Backend','OWASP'],
    author:'Karan Mehta', authorRole:'ML Engineer', authorInitials:'KM', authorGrad:'linear-gradient(135deg,#0056b3,#00CFFF)',
    date:'January 18, 2025', readTime:'10 min read',
    gradient:'linear-gradient(135deg,#064E3B 0%,#1D4ED8 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    popular:1890, wide: false,
  },

  
  {
    id:22, slug:'digital-transformation',
    href:'../blog-details/digital-transformation.html',
    category:'Engineering', catClass:'bl-cat-web',
    title:'Next.js 15 in Production: What We Learned After 3 Months and 5 Million Requests',
    excerpt:'Server components, partial prerendering, Turbopack — we\'ve been running Next.js 15 in production since it landed. Here\'s the real-world performance data, the gotchas and the patterns that make it shine.',
    tags:['Next.js','React','Performance','Frontend'],
    author:'Pranith Reddy', authorRole:'VP Engineering', authorInitials:'AR', authorGrad:'linear-gradient(135deg,#0056b3,#00CFFF)',
    date:'March 12, 2025', readTime:'14 min read',
    gradient:'linear-gradient(135deg,#1D4ED8 0%,#0891B2 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    popular:2200, wide: false,
  },
  {
    id:23, slug:'ux-design-2025',
    href:'../blog-details/ux-design-2025.html',
    category:'Design', catClass:'bl-cat-design',
    title:'Motion Design in 2025: The Micro-Interaction Patterns Users Actually Love',
    excerpt:'Animations either delight or frustrate. There is almost no in-between. After 5 years of A/B testing interactions across consumer products with 10M+ users, here are the patterns that consistently win.',
    tags:['Motion Design','Animation','Micro-interactions'],
    author:'Sneha Patel', authorRole:'Head of Design', authorInitials:'SP', authorGrad:'linear-gradient(135deg,#22C55E,#007BFF)',
    date:'March 14, 2025', readTime:'9 min read',
    gradient:'linear-gradient(135deg,#B45309 0%,#BE185D 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    popular:1340, wide: false,
  },
  {
    id:24, slug:'startup-advice',
    href:'../blog-details/startup-advice.html',
    category:'Startup', catClass:'bl-cat-startup',
    title:'The Startup Engineering Interview Process That Actually Finds Great Engineers',
    excerpt:'Most technical interviews test whiteboard skills, not product thinking. After conducting 500+ interviews and hiring 80+ engineers, here\'s the process that consistently identifies the people who ship.',
    tags:['Hiring','Interviews','Engineering Culture'],
    author:'Yashrab Unnisa ', authorRole:'CEO & Co-Founder', authorInitials:'RS', authorGrad:'linear-gradient(135deg,#EC4899,#7B2FBE)',
    date:'March 15, 2025', readTime:'12 min read',
    gradient:'linear-gradient(135deg,#DB2777 0%,#9333EA 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    popular:1780, wide: false,
  },
];


const DEEP_DIVES = [
  { ...ALL_ARTICLES.find(a => a.id === 4), deepNum: '01', deepDesc: 'A 20-minute masterclass on building AI-native products that survive contact with the real world.' },
  { ...ALL_ARTICLES.find(a => a.id === 8), deepNum: '02', deepDesc: 'The complete hands-on Terraform guide. By the end, you\'ll have production-grade infrastructure running.' },
  { ...ALL_ARTICLES.find(a => a.id === 12), deepNum: '03', deepDesc: 'The 18-month engineering roadmap we\'d give every founder trying to get to Series A.' },
];


const CATEGORIES = [
  { label:'All',       emoji:'✨', key:'all' },
  { label:'AI / ML',   emoji:'🧠', key:'AI / ML' },
  { label:'Cloud',     emoji:'☁️', key:'Cloud' },
  { label:'Strategy',  emoji:'🎯', key:'Strategy' },
  { label:'Startup',   emoji:'🚀', key:'Startup' },
  { label:'Design',    emoji:'🎨', key:'Design' },
  { label:'Security',  emoji:'🔐', key:'Security' },
  { label:'Engineering',emoji:'⚙️',key:'Engineering' },
];


const TOPICS = [
  { emoji:'🤖', label:'LLMs & GPT',           count:8,  filter:'AI / ML'    },
  { emoji:'☁️', label:'AWS',                   count:12, filter:'Cloud'      },
  { emoji:'🔄', label:'DevOps & CI/CD',        count:7,  filter:'Cloud'      },
  { emoji:'⚛️', label:'React & Next.js',       count:9,  filter:'Engineering'},
  { emoji:'🎯', label:'Product Strategy',      count:6,  filter:'Strategy'   },
  { emoji:'📱', label:'Mobile Development',    count:5,  filter:'Engineering'},
  { emoji:'🎨', label:'Design Systems',        count:4,  filter:'Design'     },
  { emoji:'🔐', label:'Cybersecurity',         count:6,  filter:'Security'   },
  { emoji:'🚀', label:'Startup Advice',        count:11, filter:'Startup'    },
  { emoji:'📊', label:'MLOps',                 count:5,  filter:'AI / ML'    },
  { emoji:'🐳', label:'Docker & Kubernetes',   count:8,  filter:'Cloud'      },
  { emoji:'✏️', label:'UX Research',           count:4,  filter:'Design'     },
  { emoji:'💰', label:'FinOps',                count:3,  filter:'Cloud'      },
  { emoji:'🌍', label:'Accessibility',         count:3,  filter:'Design'     },
  { emoji:'🏗️', label:'Architecture',          count:9,  filter:'Engineering'},
  { emoji:'📈', label:'Growth Engineering',    count:5,  filter:'Startup'    },
];


const AUTHORS = [
  { name:'Anika Singh',  role:'Head of AI & Data',   initials:'AS', grad:'linear-gradient(135deg,#7B2FBE,#EC4899)', count:'8 articles',  bio:'ML researcher & AI product builder.'   },
  { name:'Vikram Mehta', role:'Head of Cloud & DevOps',initials:'VM', grad:'linear-gradient(135deg,#22C55E,#007BFF)', count:'6 articles',  bio:'AWS architect. Kubernetes at scale.'    },
  { name:'Sneha Patel',  role:'Head of Design',       initials:'SP', grad:'linear-gradient(135deg,#F97316,#FFB623)', count:'5 articles',  bio:'Design systems & accessibility lead.'  },
  { name:'Yashrab Unnisa ',   role:'CEO & Co-Founder',     initials:'RS', grad:'linear-gradient(135deg,#EC4899,#7B2FBE)', count:'6 articles',  bio:'Product thinker. Startup advisor.'     },
  { name:'Pranith Reddy',  role:'VP Engineering',       initials:'AR', grad:'linear-gradient(135deg,#0056b3,#00CFFF)', count:'5 articles',  bio:'Engineering culture & backend systems.'},
  { name:'Priya Nair',   role:'CTO & Co-Founder',     initials:'PN', grad:'linear-gradient(135deg,#F97316,#EC4899)', count:'4 articles',  bio:'Architecture decisions & tech strategy.'},
  { name:'Rahul Joshi',  role:'Head of Product',      initials:'RJ', grad:'linear-gradient(135deg,#FFB623,#F97316)', count:'3 articles',  bio:'Product strategy & roadmap thinking.'  },
  { name:'Karan Mehta',  role:'ML Engineer',          initials:'KM', grad:'linear-gradient(135deg,#0056b3,#22C55E)', count:'3 articles',  bio:'LLMs, MLOps & production AI systems.'  },
];



let activeCategory = 'all';
let activeSort     = 'newest';
let searchQuery    = '';
let visibleCount   = 9;
const PAGE_SIZE    = 6;



function debounce(fn,d){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d);};}
function countUp(el,target,suffix,dur=1800){
  const s=performance.now(),isF=String(target).includes('.');
  const step=n=>{const p=Math.min((n-s)/dur,1),e=1-Math.pow(1-p,3),v=isF?(e*target).toFixed(1):Math.floor(e*target);el.textContent=`${v}${suffix}`;if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}
function onView(el,cb){const o=new IntersectionObserver(en=>{if(en[0].isIntersecting){cb();o.disconnect();}},{threshold:.4});o.observe(el);}



function initCanvas(){
  const canvas=document.getElementById('bl-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H,pts;
  const COLS=[[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;build();}
  function build(){const n=Math.min(70,Math.floor((W*H)/9000));pts=Array.from({length:n},()=>{const c=COLS[Math.floor(Math.random()*COLS.length)];return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:1+Math.random()*2.5,c,a:.2+Math.random()*.5,p:Math.random()*Math.PI*2};});}
  function draw(){ctx.clearRect(0,0,W,H);for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(${pts[i].c[0]},${pts[i].c[1]},${pts[i].c[2]},${(1-d/115)*.13})`;ctx.lineWidth=.5;ctx.stroke();}}pts.forEach(p=>{p.p+=.017;p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;const a=p.a*(.65+.35*Math.sin(p.p));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}



function initHeroBulbs(){
  const wrap=document.getElementById('bl-hero-bulbs');if(!wrap)return;
  for(let i=0;i<18;i++){const img=document.createElement('img');img.src='../global-images/logo.svg';img.alt='';img.className='bl-hb-item';const sz=12+Math.random()*24;Object.assign(img.style,{width:`${sz}px`,height:`${sz}px`,left:`${Math.random()*100}%`,bottom:`${Math.random()*30}%`,animationDuration:`${5+Math.random()*9}s`,animationDelay:`${Math.random()*7}s`});wrap.appendChild(img);}
}



function initHeroStats(){
  document.querySelectorAll('.bl-hs-val[data-count]').forEach(el=>{onView(el,()=>countUp(el,parseInt(el.dataset.count),el.dataset.suffix||'',1600),.5);});
}



function initFilterBar(){
  const bar=document.getElementById('bl-filter-bar');if(!bar)return;
  const inner=bar.querySelector('.bl-filter-inner');if(!inner)return;
  CATEGORIES.forEach(cat=>{
    const count=cat.key==='all'?ALL_ARTICLES.length:ALL_ARTICLES.filter(a=>a.category===cat.key).length;
    const btn=document.createElement('button');btn.className=`bl-flt-btn${cat.key==='all'?' active':''}`;
    btn.setAttribute('role','tab');btn.setAttribute('aria-selected',String(cat.key==='all'));
    btn.setAttribute('data-filter',cat.key);
    btn.innerHTML=`${cat.emoji} ${cat.label}<span class="bl-flt-count">${count}</span>`;
    btn.addEventListener('click',()=>{
      inner.querySelectorAll('.bl-flt-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      activeCategory=cat.key;visibleCount=PAGE_SIZE+3;
      updateCatLabel(cat.label);
      renderGrid();
    });
    inner.appendChild(btn);
  });
}
function updateCatLabel(label){
  const lbl=document.getElementById('bl-active-cat-label');if(lbl)lbl.textContent=label;
}



function initSearch(){
  const input=document.getElementById('bl-search');if(!input)return;
  input.addEventListener('input',debounce(()=>{
    searchQuery=input.value.trim().toLowerCase();
    visibleCount=PAGE_SIZE+3;
    renderGrid();
  },280));

 
  document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();input.focus();}});
}



function initSort(){
  const sel=document.getElementById('bl-sort');if(!sel)return;
  sel.addEventListener('change',()=>{activeSort=sel.value;renderGrid();});
}



function getFilteredArticles(){
  let list=[...ALL_ARTICLES];
 
  if(activeCategory!=='all') list=list.filter(a=>a.category===activeCategory);
 
  if(searchQuery){
    list=list.filter(a=>
      a.title.toLowerCase().includes(searchQuery)||
      a.excerpt.toLowerCase().includes(searchQuery)||
      a.tags.some(t=>t.toLowerCase().includes(searchQuery))||
      a.category.toLowerCase().includes(searchQuery)||
      a.author.toLowerCase().includes(searchQuery)
    );
  }
 
  switch(activeSort){
    case 'oldest':   list.sort((a,b)=>new Date(a.date)-new Date(b.date));           break;
    case 'popular':  list.sort((a,b)=>b.popular-a.popular);                         break;
    case 'reading':  list.sort((a,b)=>parseInt(a.readTime)-parseInt(b.readTime));   break;
    default:         list.sort((a,b)=>new Date(b.date)-new Date(a.date));           break;
  }
  return list;
}



function buildCardHTML(article){
  const isWide=article.wide&&activeCategory==='all'&&!searchQuery;
  const card=document.createElement('a');card.href=article.href;card.className=`bl-card${isWide?' bl-wide':''} reveal`;
  card.setAttribute('aria-label',`Read: ${article.title}`);
  card.setAttribute('rel','noopener');

  card.innerHTML=`
    <div class="bl-card-thumb">
      <div class="bl-card-thumb-bg" style="background:${article.gradient};"></div>
      <div class="bl-card-thumb-icon">${article.icon}</div>
      <img src="../global-images/logo.svg" alt="" class="bl-card-thumb-bulb" aria-hidden="true" loading="lazy">
    </div>
    <div class="bl-card-body">
      <div class="bl-card-meta">
        <span class="bl-fc-cat bl-card-cat ${article.catClass}">${article.category}</span>
        <span class="bl-card-date">${article.date}</span>
        <span class="bl-card-read">⏱ ${article.readTime}</span>
      </div>
      <h2 class="bl-card-title">${article.title}</h2>
      <p class="bl-card-excerpt">${article.excerpt}</p>
      <div class="bl-card-tags">${article.tags.map(t=>`<span class="bl-card-tag">${t}</span>`).join('')}</div>
      <div class="bl-card-footer">
        <div class="bl-card-av" style="background:${article.authorGrad};" aria-hidden="true">${article.authorInitials}</div>
        <span class="bl-card-author">${article.author}</span>
        <span class="bl-card-read-link" aria-hidden="true">
          Read
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
      </div>
    </div>
  `;
  return card;
}



function renderGrid(){
  const grid=document.getElementById('bl-grid');
  const countEl=document.getElementById('bl-article-count');
  const loadBtn=document.getElementById('bl-load-more');
  if(!grid)return;

 
  grid.style.opacity='0';grid.style.transform='translateY(8px)';grid.style.transition='opacity .25s ease,transform .25s ease';

  setTimeout(()=>{
    grid.innerHTML='';
    const filtered=getFilteredArticles();
    const visible=filtered.slice(0,visibleCount);

    if(filtered.length===0){
      const noRes=document.createElement('div');noRes.className='bl-no-results';
      noRes.innerHTML=`<img src="../global-images/logo.svg" alt="" aria-hidden="true"><h3>No articles found</h3><p>Try a different search or filter.</p>`;
      grid.appendChild(noRes);
    } else {
      visible.forEach((a,i)=>{const card=buildCardHTML(a);card.style.animationDelay=`${(i%PAGE_SIZE)*.06}s`;grid.appendChild(card);});
     
      setTimeout(()=>{grid.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));},80);
    }

   
    if(countEl) countEl.textContent=`Showing ${Math.min(visible.length,filtered.length)} of ${filtered.length} article${filtered.length!==1?'s':''}`;

   
    const wrap=document.getElementById('bl-load-more-wrap');
    if(wrap) wrap.style.display=filtered.length>visibleCount?'block':'none';

   
    grid.style.opacity='1';grid.style.transform='translateY(0)';
  },260);
}



function initLoadMore(){
  const btn=document.getElementById('bl-load-more');if(!btn)return;
  btn.addEventListener('click',()=>{
    visibleCount+=PAGE_SIZE;
    renderGrid();
    btn.textContent='Loading…';btn.disabled=true;
    setTimeout(()=>{const t=document.getElementById('bl-lm-text');if(t)t.textContent='Load More Articles';btn.disabled=false;},400);
  });
}



function initDeepDives(){
  const grid=document.getElementById('bl-deep-grid');if(!grid)return;
  DEEP_DIVES.forEach((d,i)=>{
    const card=document.createElement('a');card.href=d.href;card.className='bl-deep-card reveal';card.style.animationDelay=`${i*.1}s`;card.setAttribute('aria-label',`Deep dive: ${d.title}`);
    card.innerHTML=`
      <div class="bl-deep-bulb-deco" aria-hidden="true"><img src="../global-images/logo.svg" alt="" style="width:100%;height:100%;object-fit:contain;"></div>
      <span class="bl-deep-num" aria-hidden="true">${d.deepNum}</span>
      <span class="bl-fc-cat bl-deep-cat ${d.catClass}">${d.category}</span>
      <h3 class="bl-deep-title">${d.title}</h3>
      <p class="bl-deep-desc">${d.deepDesc}</p>
      <div class="bl-deep-meta">
        <span>${d.date}</span>
        <span>⏱ ${d.readTime}</span>
        <span class="bl-deep-read">
          Read
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
      </div>
    `;
    grid.appendChild(card);
  });
}



function initNewsletter(){
 
  const bw=document.getElementById('bl-nl-bulbs');
  if(bw){for(let i=0;i<12;i++){const img=document.createElement('img');img.src='../global-images/logo.svg';img.alt='';img.className='bl-nl-bi';const sz=12+Math.random()*26;Object.assign(img.style,{width:`${sz}px`,height:`${sz}px`,left:`${Math.random()*100}%`,bottom:`-${sz}px`,animationDuration:`${5+Math.random()*7}s`,animationDelay:`${Math.random()*5}s`,opacity:'0'});bw.appendChild(img);}}

 
  const canvas=document.getElementById('bl-nl-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  const pts=Array.from({length:35},()=>({x:Math.random()*1000,y:Math.random()*300,r:1+Math.random()*2.5,vy:.08+Math.random()*.2,c:['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random()*3)],a:.1+Math.random()*.25}));
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.y-=p.vy;if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`${p.c},${p.a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));

 
  const form=document.getElementById('bl-nl-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const emailEl=document.getElementById('bl-nl-email');
      const email=emailEl?emailEl.value.trim():'';
      const rx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!email||!rx.test(email)){
        if(emailEl){emailEl.style.borderColor='rgba(239,68,68,.6)';setTimeout(()=>emailEl.style.borderColor='',2500);}
        return;
      }
      if(window.TechEchos) window.TechEchos.showToast('🎉 You\'re subscribed! First issue lands next Friday.','success',4500);
      form.reset();
    });
  }
}



function initTopicCloud(){
  const wrap=document.getElementById('bl-topic-cloud');if(!wrap)return;
  TOPICS.forEach(t=>{
    const pill=document.createElement('button');pill.className='bl-topic-pill';
    pill.innerHTML=`<span class="bl-topic-emoji" aria-hidden="true">${t.emoji}</span>${t.label}<span class="bl-topic-count">${t.count}</span>`;
    pill.setAttribute('aria-label',`Filter by ${t.label}`);
    pill.addEventListener('click',()=>{
     
      activeCategory=t.filter;visibleCount=PAGE_SIZE+3;
      searchQuery='';
      const searchInput=document.getElementById('bl-search');if(searchInput)searchInput.value='';
     
      document.querySelectorAll('.bl-flt-btn').forEach(b=>{
        const isMatch=b.getAttribute('data-filter')===t.filter;
        b.classList.toggle('active',isMatch);b.setAttribute('aria-selected',String(isMatch));
      });
      updateCatLabel(t.label);
      renderGrid();
     
      document.getElementById('articles')?.scrollIntoView({behavior:'smooth',block:'start'});
    });
    wrap.appendChild(pill);
  });
}



function initAuthors(){
  const grid=document.getElementById('bl-authors-grid');if(!grid)return;
  AUTHORS.forEach((a,i)=>{
    const card=document.createElement('div');card.className='bl-author-card reveal';card.style.animationDelay=`${i*.07}s`;
    card.innerHTML=`
      <div class="bl-author-av" style="background:${a.grad};" aria-hidden="true">
        ${a.initials}
        <img src="../global-images/logo.svg" alt="" class="bl-author-bulb-badge" aria-hidden="true">
      </div>
      <p class="bl-author-name">${a.name}</p>
      <span class="bl-author-role">${a.role}</span>
      <p class="bl-author-bio">${a.bio}</p>
      <span class="bl-author-count">${a.count}</span>
    `;
    grid.appendChild(card);
  });
}



document.addEventListener('DOMContentLoaded',()=>{
  initCanvas();
  initHeroBulbs();
  initHeroStats();
  initFilterBar();
  initSearch();
  initSort();
  renderGrid();
  initLoadMore();
  initDeepDives();
  initNewsletter();
  initTopicCloud();
  initAuthors();

  setTimeout(()=>{
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>{
      if(el.getBoundingClientRect().top<window.innerHeight-40)el.classList.add('visible');
    });
  },160);
});
