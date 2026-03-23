/**
 * TechEchos Innovation — careers/careers.js
 * Careers + Portfolio page JavaScript.
 */
'use strict';



const VALUES = [
  { emoji:'🔥', title:'Ship & Iterate',        desc:'We believe in getting real software in front of real users fast. Perfect is the enemy of shipped.' },
  { emoji:'🧠', title:'Always Be Learning',     desc:'Every engineer has a $2K/year learning budget. We encourage conference talks, open source and side projects.' },
  { emoji:'🤝', title:'Radical Transparency',   desc:'No politics, no silos. Salaries, decisions and roadmaps are shared openly across the whole company.' },
  { emoji:'🌍', title:'Remote-First Culture',   desc:'80% of our team works remotely. We do async first, with intentional in-person sprints twice a year.' },
  { emoji:'💪', title:'Ownership Mentality',    desc:'Every engineer owns a feature end-to-end. You design it, build it, ship it and support it.' },
  { emoji:'✨', title:'Craft Matters',          desc:'We sweat the details — from API design to pixel-perfect UI to clear, self-documenting code.' },
  { emoji:'🛡️', title:'Psychological Safety',   desc:'We celebrate failures that taught us something. Blame culture has never existed here.' },
  { emoji:'🚀', title:'Move Fast with Quality', desc:'Speed and quality are not opposites. Our CI/CD pipeline and test culture let us do both.' },
];

const PERKS = [
  { emoji:'💰', title:'Competitive Salary',      desc:'Market-leading pay benchmarked against global tech companies, reviewed every 6 months.' },
  { emoji:'📅', title:'Flexible Hours',          desc:'Core hours 11am–4pm IST. Outside that, work when you do your best thinking.' },
  { emoji:'🏥', title:'Full Health Coverage',    desc:'100% premium covered for you and your family — medical, dental, and vision.' },
  { emoji:'🎓', title:'$2K Learning Budget',     desc:'Conferences, courses, books, certifications — spend it on whatever makes you sharper.' },
  { emoji:'🏠', title:'Remote-Friendly',         desc:'Work from anywhere. We ship to your home office: monitor, keyboard, chair — your choice.' },
  { emoji:'📈', title:'ESOP / Equity',           desc:'Share in the company's success. All full-time employees receive equity from day one.' },
  { emoji:'🌴', title:'Unlimited PTO',           desc:'We track output, not hours. Take the time you need to recharge and come back stronger.' },
  { emoji:'👶', title:'Generous Parental Leave', desc:'16 weeks fully paid for all parents — mothers, fathers, and adoptive parents.' },
  { emoji:'🎮', title:'Annual Team Retreat',     desc:'Full-company offsite twice a year — part hackathon, part adventure, entirely memorable.' },
];

const OPEN_ROLES = [
  { id:1, title:'Senior Full-Stack Engineer',     dept:'Engineering',  tags:['Remote','₹30L–₹45L'],   type:'remote', desc:'Build and own complex features across our React/Node.js stack. Architect for scale and quality.' },
  { id:2, title:'Lead AI / ML Engineer',          dept:'AI & Data',    tags:['Hybrid','₹40L–₹60L'],   type:'hybrid', desc:'Design and ship production ML systems — LLMs, computer vision, recommendation engines.' },
  { id:3, title:'Mobile App Developer (Flutter)', dept:'Engineering',  tags:['Remote','₹20L–₹32L'],   type:'remote', desc:'Own the cross-platform mobile experience for our clients' consumer-facing applications.' },
  { id:4, title:'DevOps / Cloud Engineer',        dept:'Infrastructure',tags:['Remote','₹28L–₹42L'],  type:'remote', desc:'Architect and automate our AWS/GCP infrastructure. We run Kubernetes and Terraform at scale.' },
  { id:5, title:'Product Designer (UX/UI)',       dept:'Design',       tags:['Hybrid','₹18L–₹28L'],   type:'hybrid', desc:'Lead research, design systems, and end-to-end product design for 3–4 client products simultaneously.' },
  { id:6, title:'Frontend Engineer',              dept:'Engineering',  tags:['Remote','₹18L–₹28L'],   type:'remote', desc:'Build highly polished, accessible React interfaces. Performance and animation are core to this role.' },
  { id:7, title:'Backend Engineer (Python)',      dept:'Engineering',  tags:['Remote','₹22L–₹35L'],   type:'remote', desc:'Design and build robust APIs, data pipelines, and backend systems. Strong focus on AI integrations.' },
  { id:8, title:'Technical Project Manager',      dept:'PM',           tags:['On-site','₹24L–₹36L'],  type:'onsite', desc:'Run delivery for 2–3 client product squads. Own roadmaps, stakeholder comms, and sprint ceremonies.' },
  { id:9, title:'Cybersecurity Analyst',          dept:'Security',     tags:['Hybrid','₹22L–₹34L'],   type:'hybrid', desc:'Pen testing, security reviews, compliance (ISO 27001, SOC 2) and incident response across client products.' },
  { id:10,title:'Content & Technical Writer',     dept:'Marketing',    tags:['Remote','₹12L–₹18L'],   type:'remote', desc:'Write engineering blog posts, case studies, API docs and product copy that resonates with developers.' },
];

const HIRE_PROCESS = [
  { emoji:'📩', title:'Apply',           desc:'Submit your CV and a quick cover note. We read every application personally within 48 hours.' },
  { emoji:'☎️', title:'Intro Call',      desc:'30-minute chat with our recruiter. No brain-teasers — just genuine conversation about you and the role.' },
  { emoji:'🔧', title:'Technical Round', desc:'A practical take-home task (max 3 hours) reflecting real work, not whiteboard puzzles.' },
  { emoji:'🤝', title:'Team Interview',  desc:'Meet 2–3 team members for a collaborative conversation about craft, culture and collaboration.' },
  { emoji:'🎉', title:'Offer',           desc:'We move fast. Expect a decision within 5 business days and a clear, transparent offer.' },
];

const TEAM_QUOTES = [
  { name:'Ananya Iyer',    dept:'Engineering',   yrs:'3 yrs',  initials:'AI', grad:'linear-gradient(135deg,#7B2FBE,#EC4899)', roleTag:'Senior Engineer',
    quote:'I\'ve shipped more here in 18 months than I did in 4 years at my previous company. The pace is real but so is the support. My team lead is genuinely invested in my growth.' },
  { name:'Karan Mehta',   dept:'AI & Data',     yrs:'2 yrs',  initials:'KM', grad:'linear-gradient(135deg,#F97316,#FFB623)', roleTag:'ML Engineer',
    quote:'The AI projects here are production-scale, not Kaggle notebooks. I\'ve built systems used by millions of people. That\'s why I joined and why I\'m still here.' },
  { name:'Deeksha Reddy', dept:'Design',        yrs:'1.5 yrs',initials:'DR', grad:'linear-gradient(135deg,#007BFF,#00CFFF)', roleTag:'Product Designer',
    quote:'Designers here have a seat at every product decision from day zero. I\'ve never been told to "just make it pretty." My work changes how products think, not just how they look.' },
  { name:'Siddharth Rao', dept:'Infrastructure',yrs:'4 yrs',  initials:'SR', grad:'linear-gradient(135deg,#22C55E,#007BFF)', roleTag:'Lead DevOps',
    quote:'We run some seriously impressive infrastructure. Kubernetes clusters, multi-region deployments, zero-downtime releases. It\'s the kind of system I wanted to build since college.' },
  { name:'Preethi Nair',  dept:'PM',            yrs:'2.5 yrs',initials:'PN', grad:'linear-gradient(135deg,#EC4899,#7B2FBE)', roleTag:'Technical PM',
    quote:'TechEchos gave me autonomy I didn\'t expect this early in my career. I own entire product roadmaps, talk to clients directly and see the real impact of decisions I make.' },
];

const PORTFOLIO_ITEMS = [
  { id:1, filter:'ai',     featured:false,
    title:'NeuraVision Analytics',      category:'Artificial Intelligence',
    desc:'Real-time computer vision dashboard for retail inventory management using custom YOLO v8 models.',
    metrics:[{val:'40%',lbl:'Shrinkage Reduction'},{val:'12ms',lbl:'Avg Inference'},{val:'99.7%',lbl:'Accuracy'}],
    tags:['Python','TensorFlow','React','FastAPI'],
    gradient:'linear-gradient(135deg,#7B2FBE 0%,#EC4899 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
  { id:2, filter:'web',    featured:false,
    title:'FinEdge SaaS Platform',      category:'Web Development',
    desc:'B2B financial analytics SaaS processing $2B+ in transactions monthly with sub-100ms query times.',
    metrics:[{val:'$2B+',lbl:'Transactions'},{val:'<100ms',lbl:'Query Time'},{val:'50K',lbl:'Daily Users'}],
    tags:['Next.js','Node.js','PostgreSQL','Redis'],
    gradient:'linear-gradient(135deg,#0056b3 0%,#00CFFF 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` },
  { id:3, filter:'mobile', featured:false,
    title:'ZenPay Super App',           category:'Mobile App',
    desc:'Cross-platform fintech app with 500K+ downloads, biometric auth and real-time fund transfers.',
    metrics:[{val:'500K+',lbl:'Downloads'},{val:'4.8★',lbl:'App Store'},{val:'₹0',lbl:'Transaction Fees'}],
    tags:['Flutter','Firebase','Stripe','Dart'],
    gradient:'linear-gradient(135deg,#F97316 0%,#FFB623 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>` },
  { id:4, filter:'cloud',  featured:false,
    title:'CloudScale Infrastructure',  category:'Cloud & DevOps',
    desc:'Zero-downtime migration of 40-service microservices from on-prem to AWS, achieving 60% cost reduction.',
    metrics:[{val:'60%',lbl:'Cost Saved'},{val:'0',lbl:'Downtime Minutes'},{val:'40',lbl:'Services Migrated'}],
    tags:['AWS','Terraform','Kubernetes','Helm'],
    gradient:'linear-gradient(135deg,#22C55E 0%,#007BFF 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>` },
  { id:5, filter:'web',    featured:false,
    title:'EduFlow Learning Platform',  category:'Web Development',
    desc:'Adaptive e-learning platform serving 80K students with AI-driven personalized curriculum paths.',
    metrics:[{val:'80K',lbl:'Students'},{val:'43%',lbl:'Completion Rate Up'},{val:'6',lbl:'Awards Won'}],
    tags:['React','Node.js','OpenAI','MongoDB'],
    gradient:'linear-gradient(135deg,#EC4899 0%,#7B2FBE 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>` },
  { id:6, filter:'mobile', featured:false,
    title:'HealthPulse Wearables App',  category:'Mobile + IoT',
    desc:'IoT-connected health app with real-time vitals, AI anomaly detection and HIPAA compliance.',
    metrics:[{val:'200K',lbl:'Active Users'},{val:'HIPAA',lbl:'Compliant'},{val:'98.9%',lbl:'Uptime'}],
    tags:['React Native','Python','AWS IoT','FHIR'],
    gradient:'linear-gradient(135deg,#EF4444 0%,#F97316 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>` },
  { id:7, filter:'design', featured:false,
    title:'Orbit Design System',        category:'UI / UX Design',
    desc:'End-to-end design system used across 12 client products — 240+ components, Figma + code.',
    metrics:[{val:'240+',lbl:'Components'},{val:'12',lbl:'Products Using'},{val:'100%',lbl:'WCAG AA'}],
    tags:['Figma','React','Storybook','Tokens'],
    gradient:'linear-gradient(135deg,#FFB623 0%,#F97316 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>` },
  { id:8, filter:'ai',     featured:false,
    title:'TradeSense AI Engine',       category:'Artificial Intelligence',
    desc:'Proprietary NLP engine parsing 50K news articles/day to generate real-time trading signals.',
    metrics:[{val:'50K',lbl:'Articles/day'},{val:'87%',lbl:'Signal Accuracy'},{val:'3ms',lbl:'Avg Latency'}],
    tags:['Python','HuggingFace','Kafka','TimescaleDB'],
    gradient:'linear-gradient(135deg,#7B2FBE 0%,#007BFF 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
  { id:9, filter:'cloud',  featured:false,
    title:'SecureOps Platform',         category:'Cloud & Security',
    desc:'Unified security operations platform covering SIEM, threat detection and automated incident response.',
    metrics:[{val:'99.99%',lbl:'Uptime'},{val:'<2 min',lbl:'Detection Time'},{val:'ISO 27001',lbl:'Certified'}],
    tags:['AWS','Elastic','Python','Terraform'],
    gradient:'linear-gradient(135deg,#22C55E 0%,#00CFFF 100%)',
    icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
];

const SPOTLIGHT = {
  title:'FinEdge SaaS Platform',
  category:'Web Development + Cloud',
  desc:'FinEdge needed to rebuild their legacy monolith into a scalable multi-tenant SaaS platform capable of processing billions in financial transactions monthly, with SOC 2 compliance and sub-100ms response times. We designed the architecture, led the migration and shipped in 14 weeks.',
  gradient:'linear-gradient(135deg,#0056b3 0%,#00CFFF 100%)',
  icon:`<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  metrics:[{val:'$2B+',lbl:'Transactions Processed'},{val:'60%',lbl:'Infrastructure Cost Cut'},{val:'14 Wks',lbl:'Full Delivery'}],
  stack:['Next.js','Node.js','PostgreSQL','Redis','AWS','Terraform','Stripe'],
};



function debounce(fn,d){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d);};}
function countUp(el,target,suffix,prefix,dur){
  const start=performance.now(),isF=String(target).includes('.');
  const step=n=>{const p=Math.min((n-start)/dur,1),e=1-Math.pow(1-p,3),v=isF?(e*target).toFixed(1):Math.floor(e*target);el.textContent=`${prefix||''}${v}${suffix||''}`;if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}
function onView(el,cb,threshold=0.4){
  const obs=new IntersectionObserver(en=>{if(en[0].isIntersecting){cb();obs.disconnect();}},{threshold});
  obs.observe(el);
}



function initHeroCanvas(){
  const canvas=document.getElementById('cr-hero-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H,pts;
  const COLS=[[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;build();}
  function build(){const n=Math.min(90,Math.floor((W*H)/8000));pts=Array.from({length:n},()=>{const c=COLS[Math.floor(Math.random()*COLS.length)];return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:1+Math.random()*2.5,c,a:.25+Math.random()*.55,p:Math.random()*Math.PI*2};});}
  function draw(){ctx.clearRect(0,0,W,H);for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(${pts[i].c[0]},${pts[i].c[1]},${pts[i].c[2]},${(1-d/120)*.15})`;ctx.lineWidth=.5;ctx.stroke();}}pts.forEach(p=>{p.p+=.018;p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;const a=p.a*(.65+.35*Math.sin(p.p));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}



function initBulbField(){
  const field=document.getElementById('cr-bulb-field');if(!field)return;
  for(let i=0;i<16;i++){const img=document.createElement('img');img.src='../global-images/logo.svg';img.alt='';img.className='cr-bf-bulb';const sz=14+Math.random()*28;Object.assign(img.style,{width:`${sz}px`,height:`${sz}px`,left:`${Math.random()*100}%`,bottom:`${Math.random()*20}%`,animationDuration:`${5+Math.random()*8}s`,animationDelay:`${Math.random()*6}s`});field.appendChild(img);}
}



function initMosaicCounters(){
  document.querySelectorAll('.cr-mc-val[data-count]').forEach(el=>{
    onView(el,()=>countUp(el,parseInt(el.dataset.count),el.dataset.suffix||'','',1800),.5);
  });
}



function initValues(){
  const grid=document.getElementById('cr-values-grid');if(!grid)return;
  VALUES.forEach((v,i)=>{const card=document.createElement('div');card.className='cr-val-card reveal';card.style.animationDelay=`${i*.07}s`;card.innerHTML=`<div class="cr-val-icon" aria-hidden="true">${v.emoji}</div><h3 class="cr-val-title">${v.title}</h3><p class="cr-val-desc">${v.desc}</p>`;grid.appendChild(card);});
}



function initPerks(){
  const grid=document.getElementById('cr-perks-grid');if(!grid)return;
  PERKS.forEach((p,i)=>{const card=document.createElement('div');card.className='cr-perk-card reveal';card.style.animationDelay=`${i*.06}s`;card.innerHTML=`<div class="cr-perk-icon" aria-hidden="true">${p.emoji}</div><div><p class="cr-perk-title">${p.title}</p><p class="cr-perk-desc">${p.desc}</p></div>`;grid.appendChild(card);});
}



const DEPTS=['All','Engineering','AI & Data','Design','Infrastructure','PM','Security','Marketing'];
let currentDept='All';

function renderRoles(dept){
  const list=document.getElementById('cr-roles-list');if(!list)return;
  list.innerHTML='';
  const filtered=dept==='All'?OPEN_ROLES:OPEN_ROLES.filter(r=>r.dept===dept);
  filtered.forEach((role,i)=>{
    const item=document.createElement('div');item.className='cr-role-item reveal';item.dataset.id=role.id;item.style.animationDelay=`${i*.05}s`;
    const typeClass=`tag-${role.type}`;
    const tagHtml=role.tags.map((t,ti)=>`<span class="cr-role-tag${ti===1?' tag-salary':''}">${t}</span>`).join('');
    item.innerHTML=`
      <div class="cr-role-info">
        <h3 class="cr-role-title">${role.title}</h3>
        <div class="cr-role-meta">
          <span class="cr-role-dept">${role.dept}</span>
          <span class="cr-role-tag ${typeClass}">${role.type.charAt(0).toUpperCase()+role.type.slice(1)}</span>
          ${tagHtml}
        </div>
        <p class="cr-role-desc">${role.desc}</p>
      </div>
      <div class="cr-role-actions">
        <span class="cr-role-salary">${role.tags[1]}</span>
        <button class="cr-apply-btn" data-role-id="${role.id}" aria-label="Apply for ${role.title}">Apply Now</button>
      </div>
    `;
    list.appendChild(item);
  });
 
  setTimeout(()=>{list.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));},60);
 
  list.querySelectorAll('.cr-apply-btn').forEach(btn=>{btn.addEventListener('click',e=>{e.stopPropagation();openApplyModal(parseInt(btn.dataset.roleId));});});
}

function initRoles(){
  const filtersEl=document.querySelector('.cr-role-filters');
  DEPTS.forEach(dept=>{
    const btn=document.createElement('button');btn.className=`cr-rf-btn${dept==='All'?' active':''}`;btn.textContent=dept;
    btn.setAttribute('role','tab');btn.setAttribute('aria-selected',String(dept==='All'));
    btn.addEventListener('click',()=>{
      filtersEl.querySelectorAll('.cr-rf-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      currentDept=dept;renderRoles(dept);
    });
    filtersEl.appendChild(btn);
  });
  renderRoles('All');
}



function openApplyModal(roleId){
  const role=OPEN_ROLES.find(r=>r.id===roleId);if(!role)return;
  const modal=document.getElementById('cr-apply-modal');
  const nameEl=document.getElementById('cr-modal-role-name');
  const deptEl=document.getElementById('cr-modal-dept');
  if(nameEl)nameEl.textContent=role.title;
  if(deptEl)deptEl.textContent=`${role.dept} · ${role.type.charAt(0).toUpperCase()+role.type.slice(1)} · ${role.tags[1]}`;
  if(modal){modal.classList.add('open');document.body.style.overflow='hidden';}
}

function initApplyModal(){
  const modal=document.getElementById('cr-apply-modal');
  const closeBtn=document.getElementById('cr-modal-close');
  if(closeBtn)closeBtn.addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow='';});
  if(modal)modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');document.body.style.overflow='';}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open')){modal.classList.remove('open');document.body.style.overflow='';}});

 
  const form=document.getElementById('cr-apply-form');
  if(form&&window.TechEchos){
    window.TechEchos.initFormValidation(form,()=>{
      const btn=document.getElementById('ap-submit');
      if(btn){btn.innerHTML='✓ Application Submitted!';btn.style.background='linear-gradient(135deg,#22C55E,#16A34A)';}
      window.TechEchos.showToast('🎉 Application received! We\'ll respond within 48 hours.','success',5000);
      setTimeout(()=>{modal.classList.remove('open');document.body.style.overflow='';form.reset();if(btn){btn.innerHTML='Submit Application';btn.style.background='';}},2500);
    });
  }
}



function initHireProcess(){
  const track=document.getElementById('cr-hire-timeline');if(!track)return;
  HIRE_PROCESS.forEach((step,i)=>{
    const el=document.createElement('div');el.className='cr-ht-step reveal';el.style.animationDelay=`${i*.1}s`;
    el.innerHTML=`
      <div class="cr-ht-badge">
        <img src="../global-images/logo.svg" alt="" class="cr-ht-bulb" aria-hidden="true">
        <span style="font-size:1.3rem">${step.emoji}</span>
        <span class="cr-ht-num">${i+1}</span>
      </div>
      <h3 class="cr-ht-title">${step.title}</h3>
      <p class="cr-ht-desc">${step.desc}</p>
    `;
    track.appendChild(el);
  });
}



let teamIdx=0,teamAuto;
function initTeamSlider(){
  const track=document.getElementById('cr-ts-track');const dotsEl=document.getElementById('cr-ts-dots');if(!track)return;
  TEAM_QUOTES.forEach((m,i)=>{
    const card=document.createElement('div');card.className='cr-ts-card';
    card.innerHTML=`
      <img src="../global-images/logo.svg" alt="" class="cr-ts-bulb" aria-hidden="true">
      <span class="cr-ts-role-badge">${m.roleTag}</span>
      <p class="cr-ts-quote">"${m.quote}"</p>
      <div class="cr-ts-author">
        <div class="cr-ts-av" style="background:${m.grad}" aria-hidden="true">${m.initials}</div>
        <div>
          <p class="cr-ts-name">${m.name}</p>
          <p class="cr-ts-dept">${m.dept} · <span class="cr-ts-yrs">${m.yrs} at TechEchos</span></p>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
  if(dotsEl){TEAM_QUOTES.forEach((_,i)=>{const d=document.createElement('button');d.className=`cr-td-dot${i===0?' active':''}`;d.setAttribute('role','tab');d.setAttribute('aria-label',`Team quote ${i+1}`);d.addEventListener('click',()=>goTeam(i));dotsEl.appendChild(d);});}

  function goTeam(idx){
    const cards=track.querySelectorAll('.cr-ts-card');const dots=dotsEl?dotsEl.querySelectorAll('.cr-td-dot'):[];
    const isMob=window.innerWidth<=767,isTab=window.innerWidth<=1023;const perView=isMob?1:isTab?2:3;
    teamIdx=Math.max(0,Math.min(idx,TEAM_QUOTES.length-perView));
    const cw=cards[0]?cards[0].offsetWidth+24:0;track.style.transform=`translateX(-${teamIdx*cw}px)`;
    cards.forEach((c,i)=>c.classList.toggle('active',i===teamIdx));
    dots.forEach((d,i)=>{d.classList.toggle('active',i===teamIdx);d.setAttribute('aria-selected',String(i===teamIdx));});
  }

  teamAuto=setInterval(()=>goTeam((teamIdx+1)%TEAM_QUOTES.length),4500);
  const slider=document.getElementById('cr-team-slider');
  if(slider){
    slider.addEventListener('mouseenter',()=>clearInterval(teamAuto));
    slider.addEventListener('mouseleave',()=>{teamAuto=setInterval(()=>goTeam((teamIdx+1)%TEAM_QUOTES.length),4500);});
    let tx=0;slider.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;},{passive:true});
    slider.addEventListener('touchend',e=>{const d=tx-e.changedTouches[0].clientX;if(Math.abs(d)>50)goTeam(d>0?Math.min(teamIdx+1,TEAM_QUOTES.length-1):Math.max(teamIdx-1,0));},{passive:true});
  }
  window.addEventListener('resize',debounce(()=>goTeam(teamIdx),200));
}



function initPortStats(){
  document.querySelectorAll('.cr-ps-val[data-count]').forEach(el=>{
    onView(el,()=>countUp(el,parseInt(el.dataset.count),el.dataset.suffix||'','',2000),.4);
  });
}



function renderPortfolio(filter){
  const grid=document.getElementById('cr-port-grid');if(!grid)return;
 
  grid.querySelectorAll('.cr-port-card').forEach(c=>{c.style.opacity='0';c.style.transform='scale(.93)';});
  setTimeout(()=>{
    grid.innerHTML='';
    const items=filter==='all'?PORTFOLIO_ITEMS:PORTFOLIO_ITEMS.filter(p=>p.filter===filter);
    items.forEach((item,i)=>{
      const card=document.createElement('article');card.className='cr-port-card reveal';card.style.animationDelay=`${i*.07}s`;card.dataset.id=item.id;
      card.innerHTML=`
        <img src="../global-images/logo.svg" alt="" class="cr-pc-bulb" aria-hidden="true">
        <div class="cr-pc-thumb">
          <div class="cr-pc-thumb-bg" style="background:${item.gradient};">
            <div class="cr-pc-thumb-icon">${item.icon}</div>
          </div>
          <div class="cr-pc-overlay">
            <button class="cr-pc-ov-btn primary cr-view-cs" data-id="${item.id}" aria-label="View case study for ${item.title}">View Case Study</button>
          </div>
        </div>
        <div class="cr-pc-body">
          <span class="cr-pc-category">${item.category}</span>
          <h3 class="cr-pc-title">${item.title}</h3>
          <p class="cr-pc-desc">${item.desc}</p>
          <div class="cr-pc-metrics">
            ${item.metrics.map(m=>`<div class="cr-pc-metric"><span class="cr-pc-m-val">${m.val}</span><span class="cr-pc-m-lbl">${m.lbl}</span></div>`).join('')}
          </div>
          <div class="cr-pc-tags">${item.tags.map(t=>`<span class="cr-pc-tag">${t}</span>`).join('')}</div>
        </div>
      `;
      grid.appendChild(card);
    });
   
    setTimeout(()=>{grid.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));},60);
   
    grid.querySelectorAll('.cr-view-cs').forEach(btn=>{btn.addEventListener('click',e=>{e.stopPropagation();openCaseStudy(parseInt(btn.dataset.id));});});
  },220);
}

function initPortfolio(){
  renderPortfolio('all');
  document.querySelectorAll('.cr-pf-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.cr-pf-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      renderPortfolio(btn.dataset.filter);
    });
  });
}



function openCaseStudy(id){
  const item=PORTFOLIO_ITEMS.find(p=>p.id===id);if(!item)return;
  const modal=document.getElementById('cr-cs-modal');
  const title=document.getElementById('cr-cs-modal-title');
  const body=document.getElementById('cr-cs-body');
  if(title)title.innerHTML=`<span class="text-gradient">${item.title}</span>`;
  if(body){
    body.innerHTML=`
      <div style="height:200px;border-radius:12px;overflow:hidden;margin-bottom:24px;display:flex;align-items:center;justify-content:center;background:${item.gradient};position:relative;">
        <div style="position:absolute;inset:0;background:rgba(0,0,0,.25)"></div>
        <div style="position:relative;z-index:1;color:#fff;display:flex;flex-direction:column;align-items:center;gap:10px;">
          ${item.icon.replace('stroke-width="2"','stroke-width="1.5"').replace('width="28" height="28"','width="52" height="52"')}
          <span style="font-family:var(--font-heading);font-size:1.5rem;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,.5)">${item.category}</span>
        </div>
      </div>
      <p style="font-size:var(--text-base);color:rgba(255,255,255,.72);line-height:1.80;margin-bottom:24px;">${item.desc} This project required deep collaboration across our engineering, design, and cloud teams to deliver a product that truly moves the needle for the client.</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;padding:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;">
        ${item.metrics.map(m=>`<div style="text-align:center;"><span style="font-family:var(--font-heading);font-size:1.6rem;font-weight:900;background:var(--gradient-accent);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;margin-bottom:4px;">${m.val}</span><span style="font-size:.75rem;color:var(--color-secondary);">${m.lbl}</span></div>`).join('')}
      </div>
      <div style="margin-bottom:12px;"><p style="font-family:var(--font-heading);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.10em;color:rgba(255,255,255,.4);margin-bottom:8px;">Technology Stack</p><div style="display:flex;flex-wrap:wrap;gap:8px;">${item.tags.map(t=>`<span style="font-size:.72rem;font-weight:600;color:rgba(0,207,255,.8);background:rgba(0,207,255,.08);border:1px solid rgba(0,207,255,.15);border-radius:4px;padding:4px 10px;">${t}</span>`).join('')}</div></div>
      <div style="margin-top:24px;text-align:center;">
        <a href="../contact/contact.html#quote" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-heading);font-size:var(--text-sm);font-weight:700;color:#fff;background:var(--gradient-accent);border:none;border-radius:var(--radius-full);padding:12px 28px;text-decoration:none;">Build Something Similar →</a>
      </div>
    `;
  }
  if(modal){modal.classList.add('open');document.body.style.overflow='hidden';}
}

function initCsModal(){
  const modal=document.getElementById('cr-cs-modal');
  const close=document.getElementById('cr-cs-close');
  if(close)close.addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow='';});
  if(modal)modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');document.body.style.overflow='';}});
}



function initSpotlight(){
  const el=document.getElementById('cr-spotlight');if(!el)return;
  el.innerHTML=`
    <div class="cr-sp-visual reveal-left">
      <div class="cr-sp-vis-bg" style="background:${SPOTLIGHT.gradient};"></div>
      <div class="cr-sp-vis-icon">
        ${SPOTLIGHT.icon}
        <span class="cr-sp-vis-name">${SPOTLIGHT.title}</span>
      </div>
    </div>
    <div class="cr-sp-copy">
      <span class="cr-sp-category">${SPOTLIGHT.category}</span>
      <h3 class="cr-sp-title">${SPOTLIGHT.title}</h3>
      <p class="cr-sp-desc">${SPOTLIGHT.desc}</p>
      <div class="cr-sp-metrics">
        ${SPOTLIGHT.metrics.map(m=>`<div class="cr-sp-metric"><span class="cr-sp-m-val">${m.val}</span><span class="cr-sp-m-lbl">${m.lbl}</span></div>`).join('')}
      </div>
      <div class="cr-sp-stack">
        ${SPOTLIGHT.stack.map(t=>`<span class="cr-sp-tag">${t}</span>`).join('')}
      </div>
      <a href="../contact/contact.html#quote" class="cr-btn-primary" style="margin-top:8px;width:fit-content;">Build Something Similar
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  `;
}



function initBottomCta(){
  const bw=document.getElementById('cr-cta-bulbs');
  if(bw){for(let i=0;i<14;i++){const img=document.createElement('img');img.src='../global-images/logo.svg';img.alt='';img.className='cr-cta-bulb-item';const sz=16+Math.random()*30;Object.assign(img.style,{width:`${sz}px`,height:`${sz}px`,left:`${Math.random()*100}%`,bottom:`-${sz}px`,animationDuration:`${5+Math.random()*7}s`,animationDelay:`${Math.random()*5}s`,opacity:'0'});bw.appendChild(img);}}
  const canvas=document.getElementById('cr-cta-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  const pts=Array.from({length:40},()=>({x:Math.random()*1000,y:Math.random()*400,r:1+Math.random()*3,vy:.1+Math.random()*.25,c:['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random()*3)],a:.1+Math.random()*.25}));
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.y-=p.vy;if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`${p.c},${p.a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}



document.addEventListener('DOMContentLoaded',()=>{
  initHeroCanvas();
  initBulbField();
  initMosaicCounters();
  initValues();
  initPerks();
  initRoles();
  initApplyModal();
  initHireProcess();
  initTeamSlider();
  initPortStats();
  initPortfolio();
  initSpotlight();
  initCsModal();
  initBottomCta();
 
  setTimeout(()=>{document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight-40)el.classList.add('visible');});},160);
});
