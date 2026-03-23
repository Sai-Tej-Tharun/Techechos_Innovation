/**
 * TechEchos Innovation — about/about.js
 * About page JavaScript: canvas, parallax bulb, stats,
 * milestones, interactive values tabs, team grid, awards,
 * tech stack, global map, CTA section.
 */
'use strict';



const STATS = [
  { val:7,   suffix:' Years', label:'In Business'       },
  { val:80,  suffix:'+',      label:'Team Members'      },
  { val:200, suffix:'+',      label:'Products Shipped'  },
  { val:150, suffix:'+',      label:'Happy Clients'     },
  { val:35,  suffix:'',       label:'Countries Reached' },
  { val:98,  suffix:'%',      label:'Client Retention'  },
];

const MILESTONES = [
  { year:'2023', title:'The First Spark',       desc:'Co-founders Raj Sharma and Priya Nair quit their jobs and shipped their first MVP — a fintech app that raised ₹40Cr Series A — in 6 weeks.', side:'left'  },
  { year:'2023', title:'First 10 Engineers',    desc:'Word spread. We hit 10 engineers and 15 clients. Moved from a rented desk to our first proper office in Hitech City, Hyderabad.',           side:'right' },
  { year:'2024', title:'20-Person Milestone',   desc:'Expanded to a 20-engineer team. Built our internal "Launch Protocol" — the repeatable 6-week MVP process used on every project since.',    side:'left'  },
  { year:'2024', title:'Remote-First Pivot',    desc:'Turned a global challenge into our greatest strength. Went fully remote, grew by 30% and served clients across 12 countries for the first time.',  side:'right' },
  { year:'2024', title:'AI & Cloud Practice',   desc:'Launched dedicated AI/ML and Cloud practices. Shipped our 50th product. Secured our first Series B-stage client at $100M+ valuation.',    side:'left'  },
  { year:'2025', title:'50-Person Team',        desc:'Grew to 50 engineers, designers and PMs. Crossed 100 shipped products. Opened our AI Research Lab within the company.',                    side:'right' },
  { year:'2025', title:'Going Global',          desc:'Crossed 200 shipped products and 80 team members. Opened first international client office. Reached clients in 35 countries.',              side:'left'  },
  { year:'2026', title:'The Bright Future',     desc:'Launching TechEchos Labs — an internal incubator for AI-native products. Building the next generation of engineers through our apprenticeship programme.', side:'right' },
];

const VALUES = [
  { emoji:'⚡', title:'Velocity Without Compromise',
    text:'Speed is one of our core products. Every process we build is designed to remove friction. But speed without quality is just chaos — so we invest in CI/CD, automated testing and design systems that let us move fast and ship clean.',
    examples:['CI/CD pipelines on every project','Automated testing as a non-negotiable','Design systems to prevent rework','6-week MVP as our default delivery model'] },
  { emoji:'🧠', title:'Obsessive Craftsmanship',
    text:'We think deeply about the things others gloss over. API naming conventions. Loading state micro-interactions. Error message copy. The one-second improvement in page load time. These details aren\'t extra — they\'re the job.',
    examples:['Code review as a teaching practice','Design QA by engineers, not just designers','Accessibility built in from line one','Performance budgets on every project'] },
  { emoji:'🤝', title:'Client as Teammate',
    text:'We don\'t want to be your vendor. We want to be the engineering arm of your company. We join your Slack, attend your standups, challenge your assumptions and celebrate your wins like they\'re our own.',
    examples:['Named engineer on every client Slack','Weekly demo calls — no exceptions','Direct CEO/CTO access for any client','Post-mortems shared openly with clients'] },
  { emoji:'🌱', title:'Growth as Responsibility',
    text:'We are relentlessly in learning mode. Every engineer gets $2K/year for conferences, courses and books. We run internal "TechTalk Tuesdays". We expect every team member to leave every project having grown.',
    examples:['$2K annual learning budget per person','TechTalk Tuesdays — internal knowledge sharing','Open source contributions encouraged','Conference speaking sponsored by the company'] },
  { emoji:'🔑', title:'Radical Ownership',
    text:'We don\'t do "not my job" at TechEchos. If you see a problem, you own the fix — whether it\'s in your lane or not. Ownership means caring about outcomes, not just outputs.',
    examples:['Engineers own features end-to-end','On-call rotation with real accountability','Post-launch support is everyone\'s job','Transparent ownership assignments in Jira'] },
  { emoji:'❤️', title:'People Over Process',
    text:'Processes are tools, not rules. We build them to serve our team and our clients — never the other way around. When a process stops working, we change it the same week.',
    examples:['30-day new-joiner retrospective','Quarterly team pulse surveys (acted on)','Zero-bureaucracy expense policy','Manager 1:1s weekly, not quarterly'] },
];

const TECH_CATS = [
  { label:'Frontend', pills:[{e:'⚛️',t:'React'},{e:'🔲',t:'Next.js'},{e:'🎨',t:'Tailwind CSS'},{e:'📘',t:'TypeScript'},{e:'🎭',t:'Framer Motion'},{e:'📚',t:'Storybook'},{e:'🔷',t:'GraphQL'}] },
  { label:'Backend',  pills:[{e:'🟢',t:'Node.js'},{e:'🐍',t:'Python'},{e:'🚂',t:'Express'},{e:'⚡',t:'FastAPI'},{e:'🔗',t:'REST APIs'},{e:'📨',t:'gRPC'},{e:'🐘',t:'PostgreSQL'},{e:'🍃',t:'MongoDB'},{e:'🔴',t:'Redis'}] },
  { label:'Mobile',   pills:[{e:'🦋',t:'Flutter'},{e:'📱',t:'React Native'},{e:'🍎',t:'Swift'},{e:'🤖',t:'Kotlin'},{e:'🔥',t:'Firebase'}] },
  { label:'AI / ML',  pills:[{e:'🧠',t:'TensorFlow'},{e:'🤗',t:'HuggingFace'},{e:'🔮',t:'OpenAI API'},{e:'📊',t:'PyTorch'},{e:'🔬',t:'scikit-learn'},{e:'🌊',t:'LangChain'},{e:'👁️',t:'YOLO / CV'}] },
  { label:'Cloud & DevOps', pills:[{e:'☁️',t:'AWS'},{e:'🌐',t:'GCP'},{e:'💠',t:'Azure'},{e:'🐳',t:'Docker'},{e:'☸️',t:'Kubernetes'},{e:'🏗️',t:'Terraform'},{e:'🔄',t:'GitHub Actions'},{e:'📈',t:'Datadog'}] },
  { label:'Design',   pills:[{e:'🎨',t:'Figma'},{e:'🖼️',t:'Framer'},{e:'✏️',t:'Design Tokens'},{e:'📐',t:'Design Systems'},{e:'♿',t:'WCAG AA'},{e:'🔬',t:'User Research'}] },
];

const TEAM = [
  { name:'Raj Sharma',   role:'Co-Founder & CEO',         initials:'RS', grad:'linear-gradient(135deg,#7B2FBE,#EC4899)', bio:'Ex-Google engineer. IIT Hyderabad alumni. Built his first SaaS at 19. Believes technology should be a force for equity.', li:'#', tw:'#' },
  { name:'Priya Nair',   role:'Co-Founder & CTO',         initials:'PN', grad:'linear-gradient(135deg,#F97316,#FFB623)', bio:'Former ML research engineer at Uber. Published researcher in NLP. Leads all technical architecture and AI strategy.', li:'#', tw:'#' },
  { name:'Pranith Reddy',  role:'VP Engineering',            initials:'AR', grad:'linear-gradient(135deg,#007BFF,#00CFFF)', bio:'10 years building distributed systems at scale. Joined TechEchos in 2019 to lead our engineering culture and practices.', li:'#', gh:'#' },
  { name:'Sneha Patel',  role:'Head of Design',            initials:'SP', grad:'linear-gradient(135deg,#22C55E,#007BFF)', bio:'Former Head of Design at Swiggy. Pioneer of the Orbit Design System. Advocates relentlessly for accessibility-first design.', li:'#', tw:'#' },
  { name:'Vikram Mehta', role:'Head of Cloud & DevOps',    initials:'VM', grad:'linear-gradient(135deg,#EC4899,#7B2FBE)', bio:'AWS Certified Solutions Architect. Designed our multi-region infrastructure serving 50M+ users across client products.', li:'#', gh:'#' },
  { name:'Anika Singh',  role:'Head of AI & Data',         initials:'AS', grad:'linear-gradient(135deg,#EF4444,#F97316)', bio:'PhD in Computer Science, IISc. Leads our AI research lab and the delivery of all ML/LLM products.', li:'#', tw:'#' },
  { name:'Rahul Joshi',  role:'Head of Product',           initials:'RJ', grad:'linear-gradient(135deg,#FFB623,#F97316)', bio:'Former PM at Razorpay. Shapes how TechEchos thinks about product strategy and client outcomes.', li:'#', tw:'#' },
  { name:'Meera Kumar',  role:'Head of Client Success',    initials:'MK', grad:'linear-gradient(135deg,#00CFFF,#22C55E)', bio:'Ensures every client relationship is a long-term partnership. 100% retention on accounts she manages directly.', li:'#', tw:'#' },
];

const AWARDS = [
  { emoji:'🏆', year:'2024', title:'Top 50 Tech Companies', org:'Economic Times',           },
  { emoji:'⭐', year:'2024', title:'Best Employer — Tech',  org:'Great Place to Work India', },
  { emoji:'🥇', year:'2023', title:'Excellence in AI',      org:'Nasscom Innovation Awards', },
  { emoji:'🌟', year:'2023', title:'Startup of the Year',   org:'TiE Hyderabad Chapter',     },
  { emoji:'💡', year:'2022', title:'Best Engineering Team', org:'ProductHunt Golden Kitty',  },
  { emoji:'🎖️', year:'2022', title:'Top Employer — Design', org:'Awwwards',                  },
  { emoji:'🏅', year:'2021', title:'Emerging Tech Leader',  org:'Deloitte Fast 50 India',    },
  { emoji:'✨', year:'2020', title:'100 Startups to Watch', org:'Forbes India',              },
];

const REGIONS = [
  { region:'South Asia',   val:'80+', lbl:'Clients' },
  { region:'North America',val:'35+', lbl:'Clients' },
  { region:'Europe',       val:'20+', lbl:'Clients' },
  { region:'Rest of World',val:'15+', lbl:'Clients' },
];




function debounce(fn,d){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d);};}
function countUp(el,target,suffix,dur=2000){
  const s=performance.now(),isF=String(target).includes('.');
  const step=n=>{const p=Math.min((n-s)/dur,1),e=1-Math.pow(1-p,3),v=isF?(e*target).toFixed(1):Math.floor(e*target);el.textContent=`${v}${suffix}`;if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}
function onView(el,cb,thr=0.4){const o=new IntersectionObserver(en=>{if(en[0].isIntersecting){cb();o.disconnect();}},{threshold:thr});o.observe(el);}



function initHeroCanvas(){
  const canvas=document.getElementById('ab-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H,pts;
  const COLS=[[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;build();}
  function build(){const n=Math.min(80,Math.floor((W*H)/9000));pts=Array.from({length:n},()=>{const c=COLS[Math.floor(Math.random()*COLS.length)];return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:1+Math.random()*2.5,c,a:.2+Math.random()*.5,p:Math.random()*Math.PI*2};});}
  function draw(){ctx.clearRect(0,0,W,H);for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<125){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(${pts[i].c[0]},${pts[i].c[1]},${pts[i].c[2]},${(1-d/125)*.13})`;ctx.lineWidth=.5;ctx.stroke();}}pts.forEach(p=>{p.p+=.016;p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;const a=p.a*(.65+.35*Math.sin(p.p));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}



function initHeroBulbParallax(){
  const bulb=document.getElementById('ab-hero-bulb');const hero=document.getElementById('hero');
  if(!bulb||!hero||window.innerWidth<1024)return;
  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),rx=((e.clientY-r.top-r.height/2)/(r.height/2))*10,ry=((e.clientX-r.left-r.width/2)/(r.width/2))*10;bulb.style.transform=`translate(calc(-50% + ${ry}px), calc(-50% + ${rx}px))`;},{passive:true});
  hero.addEventListener('mouseleave',()=>{bulb.style.transform='translate(-50%,-50%)';});
}



function initStatsBar(){
  const bar=document.getElementById('ab-stats-bar');if(!bar)return;
  const maxWidth=1280;const wrapper=document.createElement('div');wrapper.style.cssText=`max-width:${maxWidth}px;margin:0 auto;padding:0 clamp(16px,4vw,48px);display:flex;flex-wrap:wrap;width:100%;`;
  STATS.forEach(s=>{const item=document.createElement('div');item.className='ab-stat-item';const val=document.createElement('span');val.className='ab-stat-val';val.textContent=`0${s.suffix}`;val.dataset.target=s.val;val.dataset.suffix=s.suffix;const lbl=document.createElement('span');lbl.className='ab-stat-lbl';lbl.textContent=s.label;item.appendChild(val);item.appendChild(lbl);wrapper.appendChild(item);});
  bar.appendChild(wrapper);
  onView(bar,()=>{bar.querySelectorAll('.ab-stat-val').forEach(el=>{countUp(el,parseFloat(el.dataset.target),el.dataset.suffix,2000);});});
}



function initTimeline(){
  const tl=document.getElementById('ab-timeline');if(!tl)return;
  MILESTONES.forEach((m,i)=>{
    const item=document.createElement('div');item.className='ab-tl-item reveal';item.style.animationDelay=`${i*.08}s`;
    const content=`<div class="ab-tl-content"><span class="ab-tl-year">${m.year}</span><h3 class="ab-tl-title">${m.title}</h3><p class="ab-tl-desc">${m.desc}</p></div>`;
    const node=`<div class="ab-tl-node"><img src="../global-images/logo.svg" alt="" class="ab-tl-bulb-icon" aria-hidden="true"></div>`;
    const empty=`<div class="ab-tl-empty"></div>`;
   
    if(i%2===0){item.innerHTML=`${content}${node}${empty}`;}
    else        {item.innerHTML=`${empty}${node}${content}`;}
    tl.appendChild(item);
  });
}



let activeValIdx=0;
function renderValueDetail(idx){
  const v=VALUES[idx];const detail=document.getElementById('ab-val-detail');if(!detail)return;
  detail.style.opacity='0';
  setTimeout(()=>{
    detail.innerHTML=`
      <span class="ab-vd-emoji" aria-hidden="true">${v.emoji}</span>
      <h3 class="ab-vd-title">${v.title}</h3>
      <p class="ab-vd-text">${v.text}</p>
      <div class="ab-vd-examples">
        ${v.examples.map(ex=>`<div class="ab-vd-ex"><div class="ab-vd-ex-dot" aria-hidden="true"></div><span>${ex}</span></div>`).join('')}
      </div>
    `;
    detail.style.opacity='1';
    detail.style.transition='opacity .3s ease';
  },150);
}

function initValues(){
  const tabsEl=document.getElementById('ab-val-tabs');if(!tabsEl)return;
  VALUES.forEach((v,i)=>{
    const btn=document.createElement('button');btn.className=`ab-vt-btn${i===0?' active':''}`;
    btn.setAttribute('role','tab');btn.setAttribute('aria-selected',String(i===0));btn.setAttribute('aria-controls','ab-val-detail');
    btn.innerHTML=`<span class="ab-vt-emoji" aria-hidden="true">${v.emoji}</span>${v.title}`;
    btn.addEventListener('click',()=>{
      tabsEl.querySelectorAll('.ab-vt-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      activeValIdx=i;renderValueDetail(i);
    });
    tabsEl.appendChild(btn);
  });
  renderValueDetail(0);
 
  let cycleInterval;
  const valSection=document.getElementById('values');
  if(valSection){
    const obs=new IntersectionObserver(en=>{
      if(en[0].isIntersecting){
        cycleInterval=setInterval(()=>{
          activeValIdx=(activeValIdx+1)%VALUES.length;
          tabsEl.querySelectorAll('.ab-vt-btn').forEach((b,i)=>{b.classList.toggle('active',i===activeValIdx);b.setAttribute('aria-selected',String(i===activeValIdx));});
          renderValueDetail(activeValIdx);
        },4000);
      }else{clearInterval(cycleInterval);}
    },{threshold:.3});
    obs.observe(valSection);
  }
}



function initTechStack(){
  const wrap=document.getElementById('ab-tech-categories');if(!wrap)return;
  TECH_CATS.forEach(cat=>{
    const sec=document.createElement('div');sec.className='ab-tech-cat reveal';
    const label=document.createElement('div');label.className='ab-tc-label';label.textContent=cat.label;
    const pills=document.createElement('div');pills.className='ab-tc-pills';
    cat.pills.forEach(p=>{const pill=document.createElement('div');pill.className='ab-tc-pill';pill.innerHTML=`<span class="ab-tc-pill-emoji" aria-hidden="true">${p.e}</span>${p.t}`;pills.appendChild(pill);});
    sec.appendChild(label);sec.appendChild(pills);wrap.appendChild(sec);
  });
}



function initTeam(){
  const grid=document.getElementById('ab-team-grid');if(!grid)return;
  TEAM.forEach((m,i)=>{
    const card=document.createElement('div');card.className='ab-team-card reveal';card.style.animationDelay=`${i*.07}s`;
    const links=[
      m.li?`<a href="${m.li}" class="ab-tc-link" aria-label="LinkedIn" rel="noopener" target="_blank">in</a>`:'',
      m.tw?`<a href="${m.tw}" class="ab-tc-link" aria-label="Twitter" rel="noopener" target="_blank">𝕏</a>`:'',
      m.gh?`<a href="${m.gh}" class="ab-tc-link" aria-label="GitHub"  rel="noopener" target="_blank">gh</a>`:'',
    ].filter(Boolean).join('');
    card.innerHTML=`
      <div class="ab-tc-avatar">
        <div class="ab-tc-av-bg" style="background:${m.grad};"></div>
        <img src="../global-images/logo.svg" alt="" class="ab-tc-bulb" aria-hidden="true">
        <span class="ab-tc-initials" aria-hidden="true">${m.initials}</span>
      </div>
      <div class="ab-tc-body">
        <p class="ab-tc-name">${m.name}</p>
        <span class="ab-tc-role">${m.role}</span>
        <p class="ab-tc-bio">${m.bio}</p>
        <div class="ab-tc-links">${links}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}



function initAwards(){
  const grid=document.getElementById('ab-awards-grid');if(!grid)return;
  AWARDS.forEach((a,i)=>{
    const card=document.createElement('div');card.className='ab-award-card reveal';card.style.animationDelay=`${i*.06}s`;
    card.innerHTML=`<span class="ab-aw-emoji" aria-hidden="true">${a.emoji}</span><span class="ab-aw-year">${a.year}</span><p class="ab-aw-title">${a.title}</p><p class="ab-aw-org">${a.org}</p>`;
    grid.appendChild(card);
  });
}



function initRegionStats(){
  const wrap=document.getElementById('ab-region-stats');if(!wrap)return;
  REGIONS.forEach(r=>{const card=document.createElement('div');card.className='ab-rs-card reveal';card.innerHTML=`<span class="ab-rs-region">${r.region}</span><span class="ab-rs-val">${r.val}</span><span class="ab-rs-lbl">${r.lbl}</span>`;wrap.appendChild(card);});
}



function initHeroMosaicCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    onView(el,()=>countUp(el,parseInt(el.dataset.count),el.dataset.suffix||'',1800),.5);
  });
}



function initMapPulse(){
  const circles=document.querySelectorAll('.ab-map-svg circle');
  circles.forEach((c,i)=>{
    const baseR=parseFloat(c.getAttribute('r'));
    if(baseR<8){// Small location dots — pulse animation via class
      c.style.animationDelay=`${i*.25}s`;
    }
  });
}



function initCtaSection(){
  const bw=document.getElementById('ab-cta-bulbs');
  if(bw){for(let i=0;i<14;i++){const img=document.createElement('img');img.src='../global-images/logo.svg';img.alt='';img.className='ab-cta-bi';const sz=14+Math.random()*30;Object.assign(img.style,{width:`${sz}px`,height:`${sz}px`,left:`${Math.random()*100}%`,bottom:`-${sz}px`,animationDuration:`${5+Math.random()*7}s`,animationDelay:`${Math.random()*5}s`,opacity:'0'});bw.appendChild(img);}}
  const canvas=document.getElementById('ab-cta-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  const pts=Array.from({length:45},()=>({x:Math.random()*1000,y:Math.random()*400,r:1+Math.random()*3,vy:.1+Math.random()*.25,c:['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random()*3)],a:.1+Math.random()*.28}));
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.y-=p.vy;if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`${p.c},${p.a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}



function initStoryParallax(){
  const aside=document.querySelector('.ab-story-aside');if(!aside||window.innerWidth<1024)return;
  window.addEventListener('scroll',()=>{const rect=aside.getBoundingClientRect();if(rect.top>-300&&rect.bottom>0){aside.style.transform=`translateY(${rect.top*0.05}px)`;}},{passive:true});
}



document.addEventListener('DOMContentLoaded',()=>{
  initHeroCanvas();
  initHeroBulbParallax();
  initHeroMosaicCounters();
  initStatsBar();
  initTimeline();
  initValues();
  initTechStack();
  initTeam();
  initAwards();
  initRegionStats();
  initMapPulse();
  initCtaSection();
  initStoryParallax();
 
  setTimeout(()=>{document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight-40)el.classList.add('visible');});},160);
});
