/**
 * TechEchos Innovation — home-2/home.js  (SaaS / Startup)
 */
'use strict';

const PILL_TEXTS = ['AI Integration','Cloud Hosting','Mobile Apps','Design Systems','API Development'];
const CLIENTS = ['FinEdge','ZenPay','EduFlow','HealthPulse','NovaSaaS','CloudScale','DataForge','NexusAI','LaunchPad','Orbit Tech','StackBloom','NeuraVision'];
const ACTIVITY_ITEMS = [
  { text:'Deploy v2.4.1 completed',    time:'2m ago',  colour:'#22C55E' },
  { text:'New user: arjun@finedge.io', time:'5m ago',  colour:'#00CFFF' },
  { text:'Stripe payment $2,400',      time:'9m ago',  colour:'#FFB623' },
  { text:'CI pipeline passed ✓',       time:'14m ago', colour:'#22C55E' },
  { text:'API latency alert resolved', time:'22m ago', colour:'#F59E0B' },
];
const PROCESS_STEPS = [
  { num:'01', title:'Discovery',  desc:'We audit your market, users and constraints to architect the right solution.' },
  { num:'02', title:'Design',     desc:'Wireframes, system design and a full design system before a line of code.' },
  { num:'03', title:'Build',      desc:'Agile sprints with daily standups. Working software every single week.' },
  { num:'04', title:'Test & QA',  desc:'Automated tests, load testing, security scans and manual QA across devices.' },
  { num:'05', title:'Launch',     desc:'Zero-downtime deploy, monitoring setup and a dedicated launch-day war room.' },
];
const STATS = [
  { val:200, suffix:'+',    label:'Products Built'    },
  { val:150, suffix:'+',    label:'Startups Served'   },
  { val:98,  suffix:'%',    label:'Client Retention'  },
  { val:6,   suffix:' Wks', label:'Avg MVP Time'      },
  { val:24,  suffix:'/7',   label:'Support Coverage'  },
];
const SERVICES = [
  { emoji:'⚛️', title:'Web Development',         desc:'Blazing-fast web apps with React, Next.js and Node.js.',                    href:'../service-details/web-development.html'       },
  { emoji:'📱', title:'Mobile App Development',  desc:'Cross-platform iOS & Android apps that feel native.',                       href:'../service-details/mobile-app.html'            },
  { emoji:'🧠', title:'Artificial Intelligence', desc:'LLMs, computer vision and predictive analytics in your product.',           href:'../service-details/artificial-intelligence.html'},
  { emoji:'☁️', title:'Cloud Solutions',          desc:'Architecture, migration and DevOps across AWS, GCP and Azure.',            href:'../service-details/cloud-solutions.html'       },
  { emoji:'🎨', title:'UI / UX Design',           desc:'Research-led design systems that convert and delight.',                    href:'../service-details/ui-ux-design.html'          },
  { emoji:'🔐', title:'Cybersecurity',            desc:'Pen testing, ISO 27001, GDPR and zero-trust architecture.',               href:'../service-details/cybersecurity.html'         },
];
const PRICING_PLANS = [
  { tier:'Starter',    monthly:4999,  annual:3999,  popular:false, desc:'Perfect for early-stage startups validating an idea.',
    features:[{t:'1 dedicated engineer',yes:true},{t:'Up to 80 hrs/mo',yes:true},{t:'Weekly demos',yes:true},{t:'Slack access',yes:true},{t:'Design system',yes:false},{t:'AI integration',yes:false},{t:'24/7 monitoring',yes:false}],
    cta:'Get Started', ctaCls:'h2-price-cta-outline' },
  { tier:'Growth',     monthly:9999,  annual:7999,  popular:true,  desc:'For growing teams shipping fast and scaling smart.',
    features:[{t:'3 dedicated engineers',yes:true},{t:'Up to 240 hrs/mo',yes:true},{t:'Daily standups',yes:true},{t:'Slack + Jira',yes:true},{t:'Design system',yes:true},{t:'AI integration',yes:true},{t:'24/7 monitoring',yes:false}],
    cta:'Most Popular', ctaCls:'h2-price-cta-primary' },
  { tier:'Enterprise', monthly:19999, annual:15999, popular:false, desc:'Dedicated team for high-growth companies at scale.',
    features:[{t:'Full dedicated team',yes:true},{t:'Unlimited hours',yes:true},{t:'Daily standups',yes:true},{t:'Full tooling',yes:true},{t:'Design system',yes:true},{t:'AI integration',yes:true},{t:'24/7 monitoring',yes:true}],
    cta:'Talk to Sales', ctaCls:'h2-price-cta-outline' },
];
const COMPARE_ROWS = [
  { feature:'Dedicated engineer',   us:'✓', free:'✓', agency:'✓'     },
  { feature:'Direct Slack access',  us:'✓', free:'✓', agency:'✗'     },
  { feature:'Weekly demos',         us:'✓', free:'~', agency:'~'     },
  { feature:'AI/ML expertise',      us:'✓', free:'~', agency:'~'     },
  { feature:'Fixed sprint pricing', us:'✓', free:'✗', agency:'✗'     },
  { feature:'ISO 27001 compliance', us:'✓', free:'✗', agency:'✓'     },
  { feature:'24/7 monitoring',      us:'✓', free:'✗', agency:'~'     },
  { feature:'Post-launch support',  us:'✓', free:'✗', agency:'Extra' },
];
const WALL_CARDS = [
  { name:'Ravi S.',   role:'CTO, FinEdge',        initials:'RS', grad:'linear-gradient(135deg,#7B2FBE,#EC4899)', stars:5, quote:'TechEchos took us from 0 to 500K users in 14 months. Their AI team is second to none.' },
  { name:'Priya M.',  role:'Founder, ZenPay',     initials:'PM', grad:'linear-gradient(135deg,#F97316,#FFB623)', stars:5, quote:'MVP was live in 6 weeks, exactly as promised. Investor-ready and it held up on launch day.' },
  { name:'Arun K.',   role:'VP Eng, NeuraVision', initials:'AK', grad:'linear-gradient(135deg,#007BFF,#00CFFF)', stars:5, quote:'Their computer vision work reduced retail shrinkage by 40% in Q1. ROI was visible in weeks.' },
  { name:'Sneha P.',  role:'CEO, EduFlow',        initials:'SP', grad:'linear-gradient(135deg,#22C55E,#007BFF)', stars:5, quote:'80,000 students on day one. The platform scaled perfectly because the infrastructure was right.' },
  { name:'Vikram R.', role:'Dir IT, HealthPulse', initials:'VR', grad:'linear-gradient(135deg,#EF4444,#F97316)', stars:5, quote:'HIPAA compliance, real-time vitals, IoT integration — delivered on time with zero security incidents.' },
  { name:'Meera T.',  role:'CPO, CloudScale',     initials:'MT', grad:'linear-gradient(135deg,#EC4899,#7B2FBE)', stars:5, quote:'Migration to AWS cut our infra bill by 60%. Their DevOps team is brilliant.' },
];
const FAQ_ITEMS = [
  { q:'How does the 6-week MVP timeline actually work?', a:'We start with a 3-day discovery sprint to nail scope, then run two 2-week build sprints with daily demos. Week 5 is QA, Week 6 is deploy. Repeated across 80+ MVPs.' },
  { q:'Do I own the code and IP?', a:'100%. All source code, designs, infrastructure configs and documentation are transferred to you on the final day. No lock-in, ever.' },
  { q:'Can I scale the team up or down mid-project?', a:'Yes. Add or remove engineers at the start of any sprint with 7 days\' notice. We\'re structured for this kind of flexible engagement.' },
  { q:'What tech stack do you use?', a:'We\'re stack-agnostic. Most commonly: React/Next.js, Node.js, Python, Flutter, AWS/GCP, PostgreSQL and OpenAI APIs.' },
  { q:'What happens after launch?', a:'Every engagement includes a 30-day post-launch support window. Most clients transition to our ongoing retainer for continued development.' },
  { q:'Do you work with non-technical founders?', a:'Absolutely — that\'s our sweet spot. We translate your product vision into technical architecture and keep you in the loop with plain-English weekly updates.' },
];
const INT_EMOJIS = ['💳','📧','📱','📊','🔐','☁️','🤖','🔗'];


function debounce(fn,d){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d);};}


function initConstellation(){
  const canvas=document.getElementById('h2-constellation');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H,nodes;
  const COLS=[[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;build();}
  function build(){const n=Math.min(70,Math.floor((W*H)/10000));nodes=Array.from({length:n},()=>{const c=COLS[Math.floor(Math.random()*COLS.length)];return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:1+Math.random()*2,c,a:.3+Math.random()*.5,p:Math.random()*Math.PI*2};});}
  function draw(){ctx.clearRect(0,0,W,H);for(let i=0;i<nodes.length;i++){for(let j=i+1;j<nodes.length;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<130){const a=(1-d/130)*.14;ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);const[r,g,b]=nodes[i].c;ctx.strokeStyle=`rgba(${r},${g},${b},${a})`;ctx.lineWidth=.6;ctx.stroke();}}}nodes.forEach(n=>{n.p+=.018;n.x+=n.vx;n.y+=n.vy;if(n.x<0)n.x=W;if(n.x>W)n.x=0;if(n.y<0)n.y=H;if(n.y>H)n.y=0;const a=n.a*(.65+.35*Math.sin(n.p));ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=`rgba(${n.c[0]},${n.c[1]},${n.c[2]},${a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}


function initBulbGrid(){
  const g=document.getElementById('h2-bulb-grid');if(!g)return;
  for(let r=0;r<6;r++)for(let c=0;c<8;c++){const i=document.createElement('img');i.src='../global-images/logo.svg';i.alt='';i.className='h2-bg-bulb';i.style.left=`${(c/7)*100}%`;i.style.top=`${(r/5)*100}%`;i.style.animationDuration=`${3+Math.random()*4}s`;i.style.animationDelay=`${Math.random()*5}s`;g.appendChild(i);}
}


function initPillRotator(){
  const el=document.getElementById('h2-pill-text');if(!el)return;
  let idx=0;
  setInterval(()=>{
    el.style.cssText='opacity:0;transform:translateY(4px);transition:opacity .25s ease,transform .25s ease';
    setTimeout(()=>{idx=(idx+1)%PILL_TEXTS.length;el.textContent=PILL_TEXTS[idx];el.style.cssText='opacity:1;transform:translateY(0);transition:opacity .25s ease,transform .25s ease';},280);
  },3000);
}


function initDashMetrics(){
  const m1=document.getElementById('dash-m1'),m2=document.getElementById('dash-m2'),m3=document.getElementById('dash-m3');
  function countUp(el,tgt,suf,pre,dur){const s=performance.now();const step=n=>{const p=Math.min((n-s)/dur,1),e=1-Math.pow(1-p,3);el.textContent=`${pre}${Math.floor(e*tgt)}${suf}`;if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);}
  const dash=document.querySelector('.h2-dash-wrap');if(!dash)return;
  const obs=new IntersectionObserver(en=>{if(en[0].isIntersecting){if(m1)countUp(m1,99,'%','',1800);if(m2)countUp(m2,12847,'','',2000);if(m3)countUp(m3,84,'K','$',2200);obs.disconnect();}},{threshold:.4});
  obs.observe(dash);
}


function initMiniChart(){
  const canvas=document.getElementById('h2-mini-chart');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const DATA=[18,22,19,30,28,36,42,38,48,52,58,64];
  const W=canvas.offsetWidth||300,H=canvas.height;canvas.width=W;
  const max=Math.max(...DATA);
  const pts=DATA.map((v,i)=>({x:(i/(DATA.length-1))*W,y:H-(v/max)*(H-14)-7}));
  let progress=0;
  function draw(){
    ctx.clearRect(0,0,W,H);
    const cnt=Math.floor(progress*pts.length);if(cnt<2){progress+=.04;requestAnimationFrame(draw);return;}
    const vis=pts.slice(0,cnt);
    const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'rgba(123,47,190,.30)');grad.addColorStop(.5,'rgba(249,115,22,.15)');grad.addColorStop(1,'rgba(236,72,153,.02)');
    ctx.beginPath();ctx.moveTo(vis[0].x,H);ctx.lineTo(vis[0].x,vis[0].y);for(let i=1;i<vis.length;i++){const cx=(vis[i-1].x+vis[i].x)/2;ctx.bezierCurveTo(cx,vis[i-1].y,cx,vis[i].y,vis[i].x,vis[i].y);}ctx.lineTo(vis[vis.length-1].x,H);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
    const lg=ctx.createLinearGradient(0,0,W,0);lg.addColorStop(0,'#7B2FBE');lg.addColorStop(.5,'#F97316');lg.addColorStop(1,'#EC4899');
    ctx.beginPath();ctx.moveTo(vis[0].x,vis[0].y);for(let i=1;i<vis.length;i++){const cx=(vis[i-1].x+vis[i].x)/2;ctx.bezierCurveTo(cx,vis[i-1].y,cx,vis[i].y,vis[i].x,vis[i].y);}ctx.strokeStyle=lg;ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.stroke();
    const last=vis[vis.length-1];ctx.beginPath();ctx.arc(last.x,last.y,4,0,Math.PI*2);ctx.fillStyle='#EC4899';ctx.fill();
    if(progress<1){progress+=.03;requestAnimationFrame(draw);}
  }
  const obs=new IntersectionObserver(en=>{if(en[0].isIntersecting){draw();obs.disconnect();}},{threshold:.5});obs.observe(canvas);
}


function initActivityFeed(){
  const list=document.getElementById('h2-act-list');if(!list)return;
  let idx=0;
  function add(){if(idx>=ACTIVITY_ITEMS.length)idx=0;const item=ACTIVITY_ITEMS[idx++];const el=document.createElement('div');el.className='h2-act-item';el.innerHTML=`<div class="h2-act-dot" style="background:${item.colour};box-shadow:0 0 6px ${item.colour}"></div><span class="h2-act-text">${item.text}</span><span class="h2-act-time">${item.time}</span>`;list.insertBefore(el,list.firstChild);while(list.children.length>4)list.removeChild(list.lastChild);}
  ACTIVITY_ITEMS.slice(0,3).forEach(()=>add());setInterval(add,3500);
}


function initClientsBand(){
  const inner=document.getElementById('h2-clients-inner');if(!inner)return;
  [...CLIENTS,...CLIENTS].forEach((n,i)=>{const s=document.createElement('span');s.className='h2-client-item';s.textContent=n;inner.appendChild(s);if(i<CLIENTS.length*2-1){const dot=document.createElement('span');dot.className='h2-client-sep';dot.textContent='·';inner.appendChild(dot);}});
  inner.addEventListener('mouseenter',()=>inner.style.animationPlayState='paused');inner.addEventListener('mouseleave',()=>inner.style.animationPlayState='running');
}


function initBentoBars(){
  const fills=document.querySelectorAll('.h2-bar-fill[data-w]');if(!fills.length)return;
  const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.getAttribute('data-w')+'%';obs.unobserve(e.target);}});},{threshold:.5});
  fills.forEach(f=>obs.observe(f));
}


function initUptimeDots(){
  const w=document.getElementById('h2-uptime-dots');if(!w)return;
  for(let i=0;i<35;i++){const d=document.createElement('div');d.className='h2-ud';const ok=Math.random()>.04;d.style.background=ok?`rgba(34,197,94,${.4+Math.random()*.55})`:'rgba(239,68,68,.6)';w.appendChild(d);}
}


function initIntIcons(){
  const w=document.getElementById('h2-int-icons');if(!w)return;
  INT_EMOJIS.forEach(e=>{const el=document.createElement('div');el.className='h2-ii';el.textContent=e;w.appendChild(el);});
}


function initProcessSteps(){
  const track=document.getElementById('h2-process-track'),bar=document.getElementById('h2-process-progress');if(!track)return;
  PROCESS_STEPS.forEach((s,i)=>{const el=document.createElement('div');el.className='h2-proc-step';el.innerHTML=`<div class="h2-proc-num-wrap"><img src="../global-images/logo.svg" alt="" class="h2-proc-bulb"><span class="h2-proc-num">${s.num}</span></div><h3 class="h2-proc-title">${s.title}</h3><p class="h2-proc-desc">${s.desc}</p>`;track.appendChild(el);});
  const steps=track.querySelectorAll('.h2-proc-step');let cur=0;
  function activate(i){steps.forEach((s,j)=>s.classList.toggle('active',j===i));if(bar)bar.style.width=`${((i+1)/steps.length)*100}%`;}
  activate(0);let iv;
  const obs=new IntersectionObserver(en=>{if(en[0].isIntersecting){iv=setInterval(()=>{cur=(cur+1)%steps.length;activate(cur);},1800);}else clearInterval(iv);},{threshold:.4});
  obs.observe(track);
  steps.forEach((s,i)=>s.addEventListener('click',()=>{clearInterval(iv);cur=i;activate(i);}));
}


function initStatsBand(){
  const inner=document.getElementById('h2-stats-inner');if(!inner)return;
  STATS.forEach(s=>{const item=document.createElement('div');item.className='h2-stat-item';const v=document.createElement('span');v.className='h2-stat-val';v.textContent=`0${s.suffix}`;v.dataset.target=s.val;v.dataset.suffix=s.suffix;const l=document.createElement('span');l.className='h2-stat-lbl';l.textContent=s.label;item.appendChild(v);item.appendChild(l);inner.appendChild(item);});
  const obs=new IntersectionObserver(en=>{if(en[0].isIntersecting){inner.querySelectorAll('.h2-stat-val').forEach(el=>{const t=parseFloat(el.dataset.target),suf=el.dataset.suffix,dur=2000,start=performance.now(),isF=String(t).includes('.');const step=n=>{const p=Math.min((n-start)/dur,1),e=1-Math.pow(1-p,3),val=isF?(e*t).toFixed(1):Math.floor(e*t);el.textContent=`${val}${suf}`;if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);});obs.disconnect();}},{threshold:.5});
  obs.observe(inner);
}


function initServiceCards(){
  const wrap=document.getElementById('h2-svc-cards');if(!wrap)return;
  SERVICES.forEach(s=>{const c=document.createElement('a');c.className='h2-svc-card';c.href=s.href;c.setAttribute('role','listitem');c.innerHTML=`<div class="h2-svc-icon" aria-hidden="true">${s.emoji}</div><h3 class="h2-svc-title">${s.title}</h3><p class="h2-svc-desc">${s.desc}</p><span class="h2-svc-arrow">Learn More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span><div class="h2-svc-bulb-deco" aria-hidden="true"><img src="../global-images/logo.svg" alt="" style="width:100%;height:100%;object-fit:contain;"></div>`;wrap.appendChild(c);});
  const ov=document.querySelector('.h2-svc-overflow');if(!ov)return;
  let dragging=false,startX,sl;ov.addEventListener('mousedown',e=>{dragging=true;startX=e.pageX-ov.offsetLeft;sl=ov.scrollLeft;ov.style.cursor='grabbing';});ov.addEventListener('mouseleave',()=>{dragging=false;ov.style.cursor='';});ov.addEventListener('mouseup',()=>{dragging=false;ov.style.cursor='';});ov.addEventListener('mousemove',e=>{if(!dragging)return;e.preventDefault();ov.scrollLeft=sl-(e.pageX-ov.offsetLeft-startX)*1.2;});
}


let isAnnual=false;
function renderPricing(){
  const g=document.getElementById('h2-pricing-grid');if(!g)return;g.innerHTML='';
  PRICING_PLANS.forEach(plan=>{
    const price=isAnnual?plan.annual:plan.monthly;
    const c=document.createElement('div');c.className=`h2-price-card${plan.popular?' popular':''}`;
    c.innerHTML=`<img src="../global-images/logo.svg" alt="" class="h2-price-bulb" aria-hidden="true">${plan.popular?'<span class="h2-price-badge">Most Popular</span>':''}<span class="h2-price-tier">${plan.tier}</span><div class="h2-price-amount"><span class="h2-price-currency">$</span><span class="h2-price-val">${price.toLocaleString()}</span><span class="h2-price-period">/mo</span></div><p class="h2-price-desc">${plan.desc}</p><ul class="h2-price-features">${plan.features.map(f=>`<li class="h2-pf-item${f.yes?'':' disabled'}"><span class="h2-pf-check${f.yes?'':' h2-pf-x'}">${f.yes?'✓':'✗'}</span>${f.t}</li>`).join('')}</ul><a href="../contact/contact.html#quote" class="h2-price-cta ${plan.ctaCls}">${plan.cta}</a>`;
    g.appendChild(c);
  });
}
function initPricing(){renderPricing();const t=document.getElementById('h2-billing-toggle');if(!t)return;t.addEventListener('click',()=>{isAnnual=!isAnnual;t.setAttribute('aria-pressed',String(isAnnual));renderPricing();});}


function initCompareTable(){
  const tbody=document.getElementById('h2-compare-tbody');if(!tbody)return;
  COMPARE_ROWS.forEach(row=>{const tr=document.createElement('tr');const cell=v=>v==='✓'?`<span class="cmp-yes">✓</span>`:v==='✗'?`<span class="cmp-no">✗</span>`:v==='~'?`<span class="cmp-partial">~</span>`:`<span class="cmp-partial">${v}</span>`;tr.innerHTML=`<td>${row.feature}</td><td class="h2-col-us">${cell(row.us)}</td><td>${cell(row.free)}</td><td>${cell(row.agency)}</td>`;tbody.appendChild(tr);});
}


function initWall(){
  const wall=document.getElementById('h2-wall');if(!wall)return;
  WALL_CARDS.forEach((c,i)=>{const el=document.createElement('div');el.className='h2-wall-card reveal';el.style.animationDelay=`${i*.08}s`;el.innerHTML=`<div class="h2-wc-bulb" aria-hidden="true"><img src="../global-images/logo.svg" alt=""></div><div class="h2-wc-stars">${'★'.repeat(c.stars)}</div><p class="h2-wc-quote">"${c.quote}"</p><div class="h2-wc-author"><div class="h2-wc-av" style="background:${c.grad}">${c.initials}</div><div><p class="h2-wc-name">${c.name}</p><p class="h2-wc-role">${c.role}</p></div></div>`;wall.appendChild(el);});
  setTimeout(()=>{wall.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('visible');});},100);
}


function initFaq(){
  const con=document.getElementById('h2-accordion');if(!con)return;
  FAQ_ITEMS.forEach((faq,i)=>{const item=document.createElement('div');item.className='h2-acc-item';item.setAttribute('role','listitem');item.innerHTML=`<button class="h2-acc-trigger" aria-expanded="false" aria-controls="h2-ab-${i}">${faq.q}<svg class="h2-acc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></button><div class="h2-acc-body" id="h2-ab-${i}"><div class="h2-acc-body-inner">${faq.a}</div></div>`;con.appendChild(item);
    const trig=item.querySelector('.h2-acc-trigger'),body=item.querySelector('.h2-acc-body'),inner=item.querySelector('.h2-acc-body-inner');
    trig.addEventListener('click',()=>{const open=item.classList.contains('open');con.querySelectorAll('.h2-acc-item.open').forEach(oi=>{oi.classList.remove('open');oi.querySelector('.h2-acc-trigger').setAttribute('aria-expanded','false');oi.querySelector('.h2-acc-body').style.maxHeight=null;});if(!open){item.classList.add('open');trig.setAttribute('aria-expanded','true');body.style.maxHeight=inner.scrollHeight+'px';}});
  });
}


function initCtaSection(){
  const bw=document.getElementById('h2-cta-bulbs');
  if(bw){for(let i=0;i<12;i++){const img=document.createElement('img');img.src='../global-images/logo.svg';img.alt='';img.className='h2-cta-bulb-item';const sz=18+Math.random()*32;Object.assign(img.style,{width:`${sz}px`,height:`${sz}px`,left:`${Math.random()*100}%`,bottom:`-${sz}px`,filter:`drop-shadow(0 0 ${sz*.3}px rgba(255,182,35,.6))`,animationDuration:`${4+Math.random()*6}s`,animationDelay:`${Math.random()*4}s`,opacity:'0'});bw.appendChild(img);}}
  const canvas=document.getElementById('h2-cta-canvas');if(!canvas)return;const ctx=canvas.getContext('2d');let W,H;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  const pts=Array.from({length:50},()=>({x:Math.random()*1000,y:Math.random()*500,r:1+Math.random()*3,vy:.1+Math.random()*.3,c:['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random()*3)],a:.1+Math.random()*.3}));
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.y-=p.vy;if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`${p.c},${p.a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}


function initPlayBtn(){
  const btn=document.getElementById('h2-play-btn');if(!btn)return;
  btn.addEventListener('click',()=>{if(window.TechEchos)window.TechEchos.showToast('🎬 Demo video would open here in the live build!','info',3500);btn.style.transform='scale(.9)';setTimeout(()=>btn.style.transform='',600);});
}


function initDashParallax(){
  const dash=document.querySelector('.h2-dash-wrap'),hero=document.getElementById('hero');
  if(!dash||!hero||window.innerWidth<1024)return;
  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),rx=((e.clientY-r.top-r.height/2)/(r.height/2))*4,ry=-((e.clientX-r.left-r.width/2)/(r.width/2))*6;dash.style.transform=`perspective(1200px) rotateX(${rx+2}deg) rotateY(${ry-4}deg)`;},{passive:true});
  hero.addEventListener('mouseleave',()=>{dash.style.transform='perspective(1200px) rotateY(-4deg) rotateX(2deg)';});
}


document.addEventListener('DOMContentLoaded',()=>{
  initConstellation();initBulbGrid();initPillRotator();
  initDashMetrics();initMiniChart();initActivityFeed();initDashParallax();
  initClientsBand();initBentoBars();initUptimeDots();initIntIcons();
  initProcessSteps();initStatsBand();initServiceCards();
  initPricing();initCompareTable();initWall();initFaq();
  initCtaSection();initPlayBtn();
  setTimeout(()=>{document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight-40)el.classList.add('visible');});},160);
});
