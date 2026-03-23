/**
 * TechEchos Innovation — particles.js  (LIGHT MODE)
 * Same logic, lighter visuals for white backgrounds
 */
(function () {
  'use strict';

  
  const canvas = document.createElement('canvas');
  canvas.id = 'global-particle-canvas';
  Object.assign(canvas.style, {
    position:      'fixed',
    inset:         '0',
    width:         '100vw',
    height:        '100vh',
    pointerEvents: 'none',
    zIndex:        '0',
    filter:        'blur(0.3px)'
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  
  const COLS = [
    [167, 139, 250],
    [251, 146,  60],
    [244, 114, 182],
    [125, 211, 252],
    [110, 231, 183],
  ];

  let W, H, pts;
  let mx = null, my = null;

  
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    build();
  }

  
  function build() {
    const n = Math.min(110, Math.floor((W * H) / 9000));
    pts = Array.from({ length: n }, () => {
      const c   = COLS[Math.floor(Math.random() * COLS.length)];
      const big = Math.random() < 0.12;
      return {
        x:    Math.random() * W,
        y:    Math.random() * H,
        vx:   (Math.random() - .5) * .18,
        vy:   (Math.random() - .5) * .18,
        r:    big ? 3.5 + Math.random() * 1.5 : 1.0 + Math.random() * 2.2,
        c,
        a:    big
                ? 0.18 + Math.random() * 0.12  
                : 0.08 + Math.random() * 0.14,
        p:    Math.random() * Math.PI * 2,
        sp:   0.008 + Math.random() * 0.018,
        big,
      };
    });
  }

  
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const CONN = 95;

    
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONN) {
          const [r, g, b] = pts[i].c;
          const lineA = (1 - d / CONN) * 0.06;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${lineA})`;
          ctx.lineWidth   = 0.4;
          ctx.stroke();
        }
      }
    }

    
    pts.forEach(p => {

      
      if (mx !== null) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d > 0 && d < 160) {
          const f = (1 - d / 160) * 0.018;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }

      
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > 1.2) {
        p.vx = p.vx / spd * 1.2;
        p.vy = p.vy / spd * 1.2;
      }

      p.vx *= 0.994;
      p.vy *= 0.994;

      
      p.p  += p.sp;
      p.x  += p.vx;
      p.y  += p.vy;

      
      if (p.x < -5)  p.x = W + 5;
      if (p.x > W+5) p.x = -5;
      if (p.y < -5)  p.y = H + 5;
      if (p.y > H+5) p.y = -5;

      
      const pulse  = p.big
        ? 0.65 + 0.35 * Math.sin(p.p)
        : 0.55 + 0.45 * Math.sin(p.p);

      const alpha = p.a * pulse;
      const [r, g, b] = p.c;

      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();

      
      if (p.big) {
        const haloR = p.r * 3.2;
        const grad  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);

        grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha * 0.18})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.05})`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

      } else if (p.r > 1.8) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.10})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  }

  
  document.addEventListener('mousemove',  e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  document.addEventListener('mouseleave', () => { mx = null; my = null; });

  
  let _rt;
  window.addEventListener('resize', () => {
    clearTimeout(_rt);
    _rt = setTimeout(resize, 200);
  }, { passive: true });

  
  resize();
  draw();

})();