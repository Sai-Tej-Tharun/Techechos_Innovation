/**
 * TechEchos Innovation — contact/contact.js
 * Contact page JavaScript: hero canvas, multi-step form,
 * service selection, trust band, FAQ accordion,
 * alt contact cards, CTA section.
 */
'use strict';



const SERVICES = [
  { emoji:'⚛️', label:'Web Development'    },
  { emoji:'📱', label:'Mobile App'         },
  { emoji:'🧠', label:'AI / ML'            },
  { emoji:'☁️', label:'Cloud Solutions'    },
  { emoji:'🎨', label:'UI / UX Design'     },
  { emoji:'🔐', label:'Cybersecurity'      },
];

const SOCIAL_LINKS = [
  { label:'LinkedIn', href:'#', abbr:'in'  },
  { label:'Twitter',  href:'#', abbr:'𝕏'   },
  { label:'GitHub',   href:'#', abbr:'gh'  },
  { label:'YouTube',  href:'#', abbr:'yt'  },
  { label:'Instagram',href:'#', abbr:'ig'  },
];

const TRUST_ITEMS = [
  { icon:'🔒', text:'End-to-end encrypted communication'        },
  { icon:'⚡', text:'Reply within 3 hours on business days'    },
  { icon:'🤝', text:'Free consultation — zero obligation'      },
  { icon:'🌍', text:'Serving clients in 35+ countries'         },
  { icon:'🏆', text:'ISO 27001 certified processes'            },
  { icon:'⭐', text:'4.9 / 5 average client satisfaction'      },
  { icon:'💡', text:'200+ products successfully shipped'       },
  { icon:'🚀', text:'MVP delivery in as little as 6 weeks'     },
];

const FAQ_ITEMS = [
  { q:'How quickly do you respond to enquiries?',
    a:'We reply to every message within 3 business hours during IST office hours, and within 24 hours at all other times. You\'ll always hear back from a real human, not a bot.' },
  { q:'Do you sign NDAs before discussing projects?',
    a:'Absolutely. We\'re happy to sign your NDA or provide our standard mutual NDA before any detailed project discussion. Just ask when you get in touch.' },
  { q:'What information should I include in my first message?',
    a:'The more context you give us, the faster we can help. A rough idea of what you\'re building, your timeline, and budget range gives us everything we need to respond meaningfully. But even just "I have an idea" is a perfectly good starting point.' },
  { q:'Do you work with international clients?',
    a:'Yes — the majority of our clients are international. We work async-first and have engineers covering IST, EST and GMT time zones. We\'ve successfully delivered projects for clients in the US, UK, Europe, Singapore, Australia and across the Middle East.' },
  { q:'Can I book a video call before committing to anything?',
    a:'Of course. Fill in the contact form and indicate that you\'d like a call. We\'ll send you a Calendly link and get a 30-minute discovery call booked within 24 hours. No sales pressure — just an honest conversation.' },
  { q:'What happens after I submit this form?',
    a:'A member of our team reviews your message and responds with a personalised reply (not a template). If your project is a good fit, we\'ll schedule a discovery call. If it\'s not the right fit, we\'ll tell you honestly and point you in the right direction.' },
  { q:'Do you offer fixed-price or time-and-materials pricing?',
    a:'Both. For well-scoped projects we offer fixed-price sprints. For ongoing development, we offer a time-and-materials retainer. We\'ll recommend the right model for your situation on the discovery call.' },
  { q:'What\'s the minimum project size you work on?',
    a:'We don\'t have a strict minimum, but we\'re best suited to projects starting at $5,000. For smaller requests — audits, consultation, design sprints — we have specific packages. Just describe what you need and we\'ll find a way to help.' },
];

const ALT_CARDS = [
  { emoji:'📅', title:'Book a Discovery Call',   desc:'Schedule a 30-minute video call with one of our senior engineers. No prep required — just bring your idea.',  cta:'Book a Call',      href:'#quote'                    },
  { emoji:'💌', title:'Email Us Directly',        desc:'Prefer email? Write to us at hello@techechos.com. We respond to every message personally within 24 hours.',   cta:'Send an Email',    href:'mailto:hello@techechos.com' },
  { emoji:'💼', title:'Partner With Us',          desc:'Are you an agency, reseller, or consultant looking to white-label our engineering capabilities? Let\'s talk.', cta:'Explore Partnership', href:'mailto:partners@techechos.com' },
  { emoji:'🎓', title:'Join Our Team',             desc:'We\'re always looking for exceptional engineers, designers and PMs. View our open roles and apply today.',     cta:'View Open Roles',  href:'../careers/careers.html#open-roles' },
];



function debounce(fn,d){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d);};}



function initCanvas(){
  const canvas=document.getElementById('ct-hero-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H,pts;
  const COLS=[[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;build();}
  function build(){const n=Math.min(90,Math.floor((W*H)/8500));pts=Array.from({length:n},()=>{const c=COLS[Math.floor(Math.random()*COLS.length)];return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:1+Math.random()*2.5,c,a:.2+Math.random()*.5,p:Math.random()*Math.PI*2};});}
  function draw(){ctx.clearRect(0,0,W,H);for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(${pts[i].c[0]},${pts[i].c[1]},${pts[i].c[2]},${(1-d/120)*.14})`;ctx.lineWidth=.5;ctx.stroke();}}pts.forEach(p=>{p.p+=.017;p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;const a=p.a*(.65+.35*Math.sin(p.p));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}



function initSocialLinks(){
  const wrap=document.getElementById('ct-social-links');if(!wrap)return;
  SOCIAL_LINKS.forEach(s=>{const a=document.createElement('a');a.href=s.href;a.className='ct-sl-btn';a.textContent=s.abbr;a.setAttribute('aria-label',`TechEchos on ${s.label}`);a.setAttribute('rel','noopener noreferrer');a.setAttribute('target','_blank');wrap.appendChild(a);});
}



let currentStep = 1;

function initServicePills(){
  const grid=document.getElementById('ct-service-grid');if(!grid)return;
  SERVICES.forEach(s=>{
    const pill=document.createElement('label');pill.className='ct-svc-pill';
    pill.innerHTML=`<input type="checkbox" name="services" value="${s.label}"><span class="ct-svc-pill-emoji" aria-hidden="true">${s.emoji}</span><span class="ct-svc-pill-label">${s.label}</span><span class="ct-svc-check" aria-hidden="true">✓</span>`;
    pill.querySelector('input').addEventListener('change',e=>{pill.classList.toggle('selected',e.target.checked);});
    grid.appendChild(pill);
  });
}

function goToStep(targetStep){
  const fieldsets=document.querySelectorAll('.ct-fieldset');
  const steps=document.querySelectorAll('.ct-step');
  const lines=document.querySelectorAll('.ct-step-line');

 
  fieldsets.forEach(fs=>fs.classList.remove('active'));
  const targetFs=document.querySelector(`.ct-fs-${targetStep}`);
  if(targetFs){targetFs.classList.add('active');}

 
  steps.forEach((s,i)=>{
    const n=i+1;
    s.classList.toggle('active',  n===targetStep);
    s.classList.toggle('complete', n<targetStep);
  });
 
  lines.forEach((l,i)=>l.classList.toggle('filled', i<targetStep-1));

  currentStep=targetStep;

 
  const card=document.querySelector('.ct-form-card');
  if(card){card.scrollIntoView({behavior:'smooth',block:'nearest'});}
}

function validateStep1(){
  const name  = document.getElementById('ct-name');
  const email = document.getElementById('ct-email');
  let valid=true;

 
  if(!name.value.trim()||name.value.trim().length<2){
    name.classList.add('error');valid=false;
  } else { name.classList.remove('error'); }

 
  const emailRx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email.value.trim()||!emailRx.test(email.value)){
    email.classList.add('error');valid=false;
  } else { email.classList.remove('error'); }

  return valid;
}

function validateStep3(){
  const msg=document.getElementById('ct-message');
  const consent=document.getElementById('ct-consent');
  let valid=true;

  if(!msg.value.trim()||msg.value.trim().length<20){
    msg.classList.add('error');valid=false;
  } else { msg.classList.remove('error'); }

  if(!consent.checked){
    if(window.TechEchos) window.TechEchos.showToast('Please agree to our privacy policy to continue.','warning',3000);
    valid=false;
  }
  return valid;
}

function initForm(){
  initServicePills();

 
  document.getElementById('ct-next-1')?.addEventListener('click',()=>{
    if(validateStep1()) goToStep(2);
    else if(window.TechEchos) window.TechEchos.showToast('Please fill in your name and email to continue.','warning',3000);
  });
  document.getElementById('ct-back-2')?.addEventListener('click',()=>goToStep(1));
  document.getElementById('ct-next-2')?.addEventListener('click',()=>goToStep(3));
  document.getElementById('ct-back-3')?.addEventListener('click',()=>goToStep(2));

 
  const form=document.getElementById('ct-main-form');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    if(!validateStep3()) return;

    const submitBtn=document.getElementById('ct-submit');
    if(submitBtn){
      submitBtn.disabled=true;
      submitBtn.innerHTML=`
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .7s linear infinite" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Sending…
      `;
    }

   
    setTimeout(()=>{
     
      document.querySelectorAll('.ct-fieldset').forEach(f=>f.classList.remove('active'));
      document.getElementById('ct-step-bar').style.display='none';
      const success=document.getElementById('ct-success');
      success.removeAttribute('hidden');
      if(window.TechEchos) window.TechEchos.showToast('🎉 Message sent! We\'ll respond within 24 hours.','success',5500);
    },1400);
  });

 
  ['ct-name','ct-email','ct-message'].forEach(id=>{
    document.getElementById(id)?.addEventListener('input',function(){
      if(this.classList.contains('error')&&this.value.trim().length>1){
        this.classList.remove('error');
      }
    });
  });
}



function initTrustBand(){
  const inner=document.getElementById('ct-trust-inner');if(!inner)return;
  const items=[...TRUST_ITEMS,...TRUST_ITEMS];
  items.forEach((item,i)=>{
    const el=document.createElement('span');el.className='ct-trust-item';el.innerHTML=`<span class="ct-ti-icon" aria-hidden="true">${item.icon}</span>${item.text}`;inner.appendChild(el);
    if(i<items.length-1){const sep=document.createElement('span');sep.className='ct-trust-sep';sep.textContent='·';inner.appendChild(sep);}
  });
  inner.addEventListener('mouseenter',()=>inner.style.animationPlayState='paused');
  inner.addEventListener('mouseleave',()=>inner.style.animationPlayState='running');
}



function initFaq(){
  const con=document.getElementById('ct-accordion');if(!con)return;
  FAQ_ITEMS.forEach((faq,i)=>{
    const item=document.createElement('div');item.className='ct-acc-item';item.setAttribute('role','listitem');
    item.innerHTML=`
      <button class="ct-acc-trigger" aria-expanded="false" aria-controls="ct-ab-${i}">
        ${faq.q}
        <svg class="ct-acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="ct-acc-body" id="ct-ab-${i}">
        <div class="ct-acc-body-inner">${faq.a}</div>
      </div>
    `;
    con.appendChild(item);

    const trigger=item.querySelector('.ct-acc-trigger');
    const body=item.querySelector('.ct-acc-body');
    const inner=item.querySelector('.ct-acc-body-inner');

    trigger.addEventListener('click',()=>{
      const open=item.classList.contains('open');
     
      con.querySelectorAll('.ct-acc-item.open').forEach(oi=>{
        oi.classList.remove('open');
        oi.querySelector('.ct-acc-trigger').setAttribute('aria-expanded','false');
        oi.querySelector('.ct-acc-body').style.maxHeight=null;
      });
      if(!open){
        item.classList.add('open');
        trigger.setAttribute('aria-expanded','true');
        body.style.maxHeight=inner.scrollHeight+'px';
      }
    });
  });
}



function initAltCards(){
  const grid=document.getElementById('ct-alt-grid');if(!grid)return;
  ALT_CARDS.forEach((c,i)=>{
    const el=document.createElement('a');el.href=c.href;el.className='ct-alt-card reveal';el.style.animationDelay=`${i*.08}s`;
    const external=c.href.startsWith('mailto')||c.href.startsWith('http');
    if(external){el.setAttribute('rel','noopener noreferrer');}
    el.innerHTML=`
      <div class="ct-alt-icon" aria-hidden="true">${c.emoji}</div>
      <p class="ct-alt-title">${c.title}</p>
      <p class="ct-alt-desc">${c.desc}</p>
      <span class="ct-alt-cta">
        ${c.cta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
      </span>
    `;
    grid.appendChild(el);
  });
}



function initCtaSection(){
  const bw=document.getElementById('ct-cta-bulbs');
  if(bw){for(let i=0;i<14;i++){const img=document.createElement('img');img.src='../global-images/logo.svg';img.alt='';img.className='ct-cbi';const sz=14+Math.random()*30;Object.assign(img.style,{width:`${sz}px`,height:`${sz}px`,left:`${Math.random()*100}%`,bottom:`-${sz}px`,animationDuration:`${5+Math.random()*7}s`,animationDelay:`${Math.random()*5}s`,opacity:'0'});bw.appendChild(img);}}
  const canvas=document.getElementById('ct-cta-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  const pts=Array.from({length:45},()=>({x:Math.random()*1000,y:Math.random()*400,r:1+Math.random()*3,vy:.1+Math.random()*.25,c:['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random()*3)],a:.1+Math.random()*.28}));
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.y-=p.vy;if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`${p.c},${p.a})`;ctx.fill();});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',debounce(resize,250));
}



function initMapPulse(){
 
 
  const mapVis=document.getElementById('ct-map-visual');if(!mapVis)return;
  const colours=[
    'radial-gradient(ellipse at 50% 50%, rgba(123,47,190,.10) 0%, rgba(249,115,22,.06) 50%, rgba(15,23,42,.95) 80%)',
    'radial-gradient(ellipse at 40% 55%, rgba(249,115,22,.12) 0%, rgba(236,72,153,.06) 50%, rgba(15,23,42,.95) 80%)',
    'radial-gradient(ellipse at 60% 45%, rgba(236,72,153,.10) 0%, rgba(0,207,255,.05) 50%, rgba(15,23,42,.95) 80%)',
  ];
  let ci=0;
  setInterval(()=>{
    ci=(ci+1)%colours.length;
    mapVis.style.background=colours[ci];
    mapVis.style.transition='background 3s ease';
  },4000);
}



function injectSpinKeyframe(){
  if(document.getElementById('ct-spin-style'))return;
  const style=document.createElement('style');
  style.id='ct-spin-style';
  style.textContent='@keyframes spin{to{transform:rotate(360deg);}}';
  document.head.appendChild(style);
}



document.addEventListener('DOMContentLoaded',()=>{
  injectSpinKeyframe();
  initCanvas();
  initSocialLinks();
  initForm();
  initTrustBand();
  initFaq();
  initAltCards();
  initCtaSection();
  initMapPulse();

 
  setTimeout(()=>{
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>{
      if(el.getBoundingClientRect().top<window.innerHeight-40)el.classList.add('visible');
    });
  },160);
});
