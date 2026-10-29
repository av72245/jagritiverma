(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
root.classList.add('js');
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

/* split text into letters */
function split(el){
  const t=el.textContent; el.setAttribute('aria-label',t); el.textContent=''; let i=0;
  t.split(' ').forEach((w,wi,arr)=>{
    const word=document.createElement('span'); word.className='w'; word.setAttribute('aria-hidden','true');
    [...w].forEach(ch=>{const s=document.createElement('span'); s.className='ch'; s.textContent=ch; s.style.setProperty('--i',i++); word.appendChild(s)});
    el.appendChild(word); if(wi<arr.length-1) el.appendChild(document.createTextNode(' '));
  });
}
$$('[data-split]').forEach(split);

/* reveal on scroll */
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in'); io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('.rv,.rule').forEach(el=>io.observe(el));
}else{ $$('.rv,.rule').forEach(el=>el.classList.add('in')); }

/* theme toggle */
$('#theme').addEventListener('click',()=>{
  const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme=dark?'light':'dark';
});

/* confetti */
const cv=$('#confetti'), cx=cv.getContext('2d'); let parts=[], raf=0, dpr=1;
function sizeCv(){dpr=Math.min(2,devicePixelRatio||1); cv.width=innerWidth*dpr; cv.height=innerHeight*dpr; cx.setTransform(dpr,0,0,dpr,0,0)}
sizeCv(); addEventListener('resize',sizeCv);
function burst(x,y,n=70){
  if(reduce) return;
  const cs=getComputedStyle(root); const cols=['--rose','--sea','--gold','--pop','--royal'].map(v=>cs.getPropertyValue(v).trim());
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2, sp=4+Math.random()*9;
    parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-5,s:6+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.5,c:cols[i%cols.length],l:1});}
  if(!raf) raf=requestAnimationFrame(tick);
}
function tick(){
  cx.clearRect(0,0,innerWidth,innerHeight);
  parts=parts.filter(p=>p.l>0&&p.y<innerHeight+40);
  parts.forEach(p=>{p.vy+=.3;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l-=.006;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.globalAlpha=clamp(p.l*2,0,1);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.66);cx.restore();});
  raf=parts.length?requestAnimationFrame(tick):0;
  if(!raf) cx.clearRect(0,0,innerWidth,innerHeight);
}

/* hero rotator */
const rotEl=$('#rot'); const roles=JSON.parse(rotEl.dataset.roles||'[]'); if(!roles.length) roles.push(rotEl.textContent);
let ri=0;
if(!reduce){ setInterval(()=>{
  rotEl.classList.add('out');
  setTimeout(()=>{ri=(ri+1)%roles.length; rotEl.textContent=roles[ri]; rotEl.classList.remove('out'); rotEl.classList.add('in2'); setTimeout(()=>rotEl.classList.remove('in2'),480)},300);
},2600); }

if(reduce) $$('.traveller').forEach(n=>n.remove());

/* hero parallax */
const hero=$('#hero'), collage=$('#collage');
if(fine&&!reduce){
  hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();
    collage.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*2);
    collage.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*2);});
  hero.addEventListener('pointerleave',()=>{collage.style.setProperty('--mx',0);collage.style.setProperty('--my',0)});
}

/* tilt */
if(fine&&!reduce){ $$('.tilt,.fc').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.03)`;});
  el.addEventListener('pointerleave',()=>{el.style.transform=''});
});}

/* magnetic buttons */
if(fine&&!reduce){ $$('.mag').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(); el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`;});
  el.addEventListener('pointerleave',()=>{el.style.transform=''});
});}

/* sample reel play */
$$('.card-in').forEach(c=>{
  const go=()=>{ if(c.classList.contains('playing')) return; c.classList.add('playing'); const r=c.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height/2,24); setTimeout(()=>c.classList.remove('playing'),4000); };
  c.addEventListener('click',go);
  c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
});

/* custom cursor */
if(fine&&!reduce){
  const cur=$('.cursor'), lab=$('.cursor-dot b'); let tx=-100,ty=-100,x=-100,y=-100;
  addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cur.classList.add('on')});
  document.addEventListener('mouseleave',()=>cur.classList.remove('on'));
  document.addEventListener('pointerover',e=>{const t=e.target.closest&&e.target.closest('[data-cursor]'); if(t){lab.textContent=t.dataset.cursor;cur.classList.add('big')}else cur.classList.remove('big')});
  (function loop(){x+=(tx-x)*.2;y+=(ty-y)*.2;cur.style.transform=`translate3d(${x}px,${y}px,0)`;requestAnimationFrame(loop)})();
}

/* worlds */
const worlds=$$('.world');
function setWorld(i){
  worlds.forEach((w,j)=>{const on=i===j; w.classList.toggle('active',on); const h=$('.w-hit',w); h.setAttribute('aria-expanded',String(on)); h.tabIndex=on?-1:0;});
  const w=worlds[i];
  root.style.setProperty('--world',`var(${w.dataset.c})`);
  root.style.setProperty('--world-on',`var(${w.dataset.on})`);
}
worlds.forEach((w,i)=>{
  const h=$('.w-hit',w);
  h.addEventListener('click',()=>{ if(!w.classList.contains('active')){ setWorld(i); const r=w.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height/2,30);} });
  if(fine) w.addEventListener('pointerenter',()=>{ if(!w.classList.contains('active')) setWorld(i) });
  h.addEventListener('focus',()=>{ if(!w.classList.contains('active')) setWorld(i) });
});
setWorld(0);

/* counters */
function runCount(el){
  const to=+el.dataset.to, dec=+(el.dataset.dec||0), fmt=v=>dec?v.toFixed(dec):Math.round(v);
  if(reduce){el.textContent=fmt(to);return}
  const t0=performance.now(), d=1400;
  (function step(t){const p=clamp((t-t0)/d,0,1); el.textContent=fmt(to*(1-Math.pow(1-p,3))); if(p<1)requestAnimationFrame(step)})(t0);
}
if('IntersectionObserver' in window){
  const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){runCount(e.target);co.unobserve(e.target)}}),{threshold:.6});
  $$('.count').forEach(el=>{el.textContent='0'; co.observe(el)});
}

/* timeline */
const items=$$('.t-item'), stage=$('#stage'), sY=$('#sYear'), sR=$('#sRole'), sC=$('#sCo'), track=$('#track');
function activate(it){
  if(it.classList.contains('active')&&sY.textContent===it.dataset.year&&sR.textContent===it.dataset.role) return;
  items.forEach(x=>x.classList.toggle('active',x===it));
  stage.classList.remove('swap'); void stage.offsetWidth; stage.classList.add('swap');
  sY.textContent=it.dataset.year; sR.textContent=it.dataset.role; sC.textContent=it.dataset.co;
}
if('IntersectionObserver' in window){
  const to=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting) activate(e.target)}),{rootMargin:'-42% 0px -48% 0px'});
  items.forEach(i=>to.observe(i));
}

/* scroll: progress bar, timeline line, marquee skew */
const prog=$('#prog'), mq=$('#marquee'); let lastY=scrollY, vel=0, ticking=false;
function onScroll(){
  if(ticking) return; ticking=true;
  requestAnimationFrame(()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    prog.style.transform=`scaleX(${max>0?clamp(scrollY/max,0,1):0})`;
    const r=track.getBoundingClientRect();
    track.style.setProperty('--p',clamp((innerHeight*.5-r.top)/r.height,0,1));
    vel+=(clamp((scrollY-lastY)*.25,-8,8)-vel)*.4; lastY=scrollY;
    if(!reduce) mq.style.transform=`skewX(${-vel}deg)`;
    ticking=false;
  });
}
addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll); onScroll();

/* wealth words */
const wordEl=$('#word'), wordLine=$('#wordLine'), chips=$$('.chip');
chips.forEach(c=>c.addEventListener('click',e=>{
  chips.forEach(x=>x.setAttribute('aria-pressed',String(x===c)));
  wordEl.textContent=c.dataset.w; split(wordEl); wordEl.removeAttribute('aria-label');
  wordEl.setAttribute('aria-label',c.dataset.w);
  wordLine.textContent=c.dataset.l;
  const r=c.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height/2,60);
}));

/* flip cards */
$$('.fc-in').forEach(b=>b.addEventListener('click',()=>b.classList.toggle('flipped')));

/* form */
$('#hello').addEventListener('submit',e=>{
  e.preventDefault();
  const name=$('#f-name').value.trim()||'there';
  $('#formMsg').textContent=`Thanks, ${name}. In the finished site this would reach Jagriti.`;
  const r=e.submitter?e.submitter.getBoundingClientRect():{left:innerWidth/2,top:innerHeight/2,width:0,height:0};
  burst(r.left+r.width/2,r.top+r.height/2,90);
});

/* ===== v3: media, tips, hats, sound ===== */

/* reel wall (markup rendered at build time) */
(function(){
  const vids=$$('.reel').map(el=>[el,$('video',el)]).filter(([,v])=>v);
  const stopAll=except=>vids.forEach(([e,x])=>{if(x!==except){x.pause();e.classList.remove('playing')}});
  vids.forEach(([el,v])=>{
    if(v.readyState>=2) el.classList.add('ready');
    v.addEventListener('loadeddata',()=>el.classList.add('ready'));
    v.addEventListener('error',()=>el.classList.add('empty'));
    const play=()=>{stopAll(v); v.play().then(()=>el.classList.add('playing')).catch(()=>{})};
    const stop=()=>{v.pause(); try{v.currentTime=0}catch(e){} el.classList.remove('playing')};
    if(fine){ el.addEventListener('pointerenter',play); el.addEventListener('pointerleave',stop); $('.hit',el).addEventListener('focus',play); $('.hit',el).addEventListener('blur',stop); }
    else { $('.hit',el).addEventListener('click',()=>{ if(el.classList.contains('playing')) stop(); else play(); }); }
  });
})();

/* photo mosaic */
(function(){
  const box=$('#mosaic'); if(!box) return;
  const tiles=$$('.tile',box);
  tiles.forEach(t=>{
    const origin=()=>{const r=t.getBoundingClientRect(), cx=(r.left+r.width/2)/innerWidth; t.style.transformOrigin=(cx<.34?'0%':cx>.66?'100%':'50%')+' 50%'};
    t.addEventListener('pointerenter',origin); t.addEventListener('focus',origin);
    t.addEventListener('click',()=>{const was=t.classList.contains('open'); tiles.forEach(x=>x.classList.remove('open')); if(!was){origin(); t.classList.add('open')}});
  });
  document.addEventListener('click',e=>{ if(!e.target.closest('.tile')) tiles.forEach(x=>x.classList.remove('open')) });
  addEventListener('keydown',e=>{ if(e.key==='Escape') tiles.forEach(x=>x.classList.remove('open')) });
})();

/* three hats */
(function(){
  const range=$('#hatRange'), stage=$('#hatStage'); if(!range||!stage) return;
  const hats=$$('.hat',stage), btns=$$('.hat-btn'), names=['Banker','Broker','Founder'];
  function setHat(t){
    hats.forEach((h,i)=>{ if(i===0) return; h.style.clipPath=`circle(${clamp(t-(i-1),0,1)*76}% at 50% 55%)`; });
    const idx=Math.round(t); range.setAttribute('aria-valuetext',names[idx]);
    btns.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===idx)));
  }
  function glide(to){
    const from=+range.value; if(reduce){range.value=to;setHat(to);return}
    const t0=performance.now(), d=750;
    (function f(t){const p=clamp((t-t0)/d,0,1), e=1-Math.pow(1-p,3), v=from+(to-from)*e; range.value=v; setHat(v); if(p<1) requestAnimationFrame(f)})(t0);
  }
  range.addEventListener('input',()=>setHat(+range.value));
  range.addEventListener('change',()=>glide(Math.round(+range.value)));
  btns.forEach(b=>b.addEventListener('click',()=>{glide(+b.dataset.i); const r=b.getBoundingClientRect(); burst(r.left+r.width/2,r.top,30)}));
  setHat(0);
})();

/* free ka gyan deck */
(function(){
  const deck=$('#deck'); if(!deck) return;
  const cards=$$('.gcard',deck); if(!cards.length) return;
  const tips=cards.map(el=>({q:$('h3',el).textContent,a:$('.g-b p',el).textContent}));
  const dots=$('#gDots'), count=$('#gCount'), live=$('#gLive'); let gi=0, flipped=false;
  function paint(){
    cards.forEach((el,i)=>{ const o=i-gi; el.style.setProperty('--o',Math.min(2,Math.max(0,o))); el.classList.toggle('gone',o<0); el.classList.toggle('far',o>2); el.classList.toggle('flip',o===0&&flipped); el.setAttribute('aria-hidden',o===0?'false':'true'); });
    $$('i',dots).forEach((d,i)=>d.classList.toggle('on',i===gi));
    count.textContent=(gi+1)+' / '+tips.length;
    live.textContent=tips[gi].q+(flipped?' '+tips[gi].a:'');
  }
  function go(d){ gi=(gi+d+tips.length)%tips.length; flipped=false; paint(); }
  function flip(){ flipped=!flipped; paint(); }
  let sx=0, down=false;
  deck.addEventListener('pointerdown',e=>{down=true;sx=e.clientX});
  deck.addEventListener('pointercancel',()=>{down=false});
  deck.addEventListener('pointerup',e=>{ if(!down) return; down=false; const dx=e.clientX-sx; if(dx<-50) go(1); else if(dx>50) go(-1); else flip(); });
  deck.addEventListener('keydown',e=>{ if(e.key==='ArrowRight') go(1); else if(e.key==='ArrowLeft') go(-1); else if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()} });
  $('#gPrev').addEventListener('click',()=>go(-1)); $('#gNext').addEventListener('click',()=>go(1));
  paint();
})();

/* section rules: the dot patrols its line and runs from the cursor.
   Cornered at an edge, it hops over you. Catch it and it bursts. */
(function(){
  const rules=$$('.rule'); if(!rules.length||reduce) return;
  const D=14, FLEE=170, CRUISE=.6, live=new Set(); let px=-1e4, py=-1e4, raf=0, tapT=0;
  const dots=rules.map(el=>({el,dot:$('.rule-dot',el),x:0,y:0,v:0,vy:0,dir:Math.random()<.5?-1:1,min:0,max:0,cool:0,placed:false}));
  function measure(){ dots.forEach(d=>{ const w=d.el.getBoundingClientRect().width, o=d.dot.offsetLeft;
    d.min=8-o; d.max=w-o-D-8;
    if(!d.placed){ d.x=d.min+(d.max-d.min)*(.1+Math.random()*.3); d.placed=true; }
    d.x=clamp(d.x,d.min,d.max); }); }
  function step(d){
    const r=d.el.getBoundingClientRect(), cx=r.left+d.dot.offsetLeft+d.x+D/2, cy=r.top+D/2+d.y;
    const dx=cx-px, dy=cy-py, dist=Math.hypot(dx,dy), grounded=d.y===0;
    if(d.cool>0) d.cool--;
    if(dist<FLEE&&d.cool===0){
      const away=Math.sign(dx)||d.dir;
      d.dir=away; d.v+=away*(1-dist/FLEE)*2.4;
      const cornered=(away<0&&d.x-d.min<40)||(away>0&&d.max-d.x<40);
      if(cornered&&grounded&&dist<90){ d.dir=-away; d.v=-away*17; d.vy=-11; d.cool=25; }
      if(dist<D&&grounded&&d.cool===0){ burst(cx,cy,36); d.dot.classList.remove('caught'); void d.dot.offsetWidth; d.dot.classList.add('caught'); d.dir=-away; d.v=-away*18; d.vy=-12; d.cool=40; }
    }
    d.v+=(d.dir*CRUISE-d.v)*.035; d.v=clamp(d.v,-24,24);
    d.x+=d.v;
    if(d.x<=d.min){d.x=d.min; d.dir=1; d.v=Math.abs(d.v)*.5;}
    else if(d.x>=d.max){d.x=d.max; d.dir=-1; d.v=-Math.abs(d.v)*.5;}
    if(!grounded||d.vy){ d.vy+=.9; d.y=Math.min(0,d.y+d.vy); if(d.y===0) d.vy=0; }
    const sq=1+Math.min(.45,Math.abs(d.v)/30);
    d.dot.style.translate=`${d.x}px ${d.y}px`;
    d.dot.style.scale=`${sq} ${1/sq}`;
  }
  function loop(){ live.forEach(step); if(tapT&&performance.now()>tapT){px=py=-1e4;tapT=0} raf=live.size?requestAnimationFrame(loop):0; }
  addEventListener('pointermove',e=>{ if(e.pointerType==='mouse'){px=e.clientX;py=e.clientY} },{passive:true});
  addEventListener('pointerdown',e=>{ px=e.clientX;py=e.clientY; tapT=performance.now()+700; },{passive:true});
  document.addEventListener('mouseleave',()=>{px=py=-1e4});
  addEventListener('resize',measure);
  measure();
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{ es.forEach(e=>{ const d=dots.find(x=>x.el===e.target); e.isIntersecting?live.add(d):live.delete(d); }); if(live.size&&!raf) raf=requestAnimationFrame(loop); });
    rules.forEach(el=>io.observe(el));
  }
})();

/* sound: optional licensed file, otherwise a soft generated loop */
(function(){
  const btn=$('#snd'); if(!btn) return;
  const SRC=btn.dataset.audio||''; let on=false, actx=null, master=null, timer=0, nextT=0, step=0, audio=null;
  const NOTE=n=>440*Math.pow(2,(n-69)/12), BEAT=60/92;
  const PROG=[[60,64,67],[67,71,74],[69,72,76],[65,69,72]];
  const ARP=[0,1,2,1,2,1,0,2];
  function tone(f,t,dur,type,vol){ const o=actx.createOscillator(), g=actx.createGain(); o.type=type; o.frequency.value=f; g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.05); g.gain.exponentialRampToValueAtTime(.0001,t+dur); o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+.05); }
  function sched(){
    while(nextT<actx.currentTime+.4){
      const bar=Math.floor(step/8)%PROG.length, ch=PROG[bar], k=step%8;
      if(k===0){ ch.forEach(n=>tone(NOTE(n-12),nextT,BEAT*4.1,'triangle',.05)); tone(NOTE(ch[0]-24),nextT,BEAT*3.8,'sine',.1); }
      tone(NOTE(ch[ARP[k]]+12),nextT,BEAT*.9,'sine',.04);
      nextT+=BEAT/2; step++;
    }
  }
  function start(){
    if(SRC){ if(!audio){audio=new Audio(SRC); audio.loop=true; audio.volume=.35} audio.play().catch(()=>{}); return; }
    if(!actx){ const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return; actx=new AC(); master=actx.createGain(); master.gain.value=0; master.connect(actx.destination); }
    actx.resume(); nextT=actx.currentTime+.1; step=0;
    master.gain.cancelScheduledValues(actx.currentTime); master.gain.setTargetAtTime(.9,actx.currentTime,.4);
    clearInterval(timer); timer=setInterval(sched,120);
  }
  function stop(){
    if(audio) audio.pause();
    if(actx){ master.gain.setTargetAtTime(0,actx.currentTime,.2); const a=actx; setTimeout(()=>{ if(!on){clearInterval(timer); a.suspend()} },700); }
  }
  btn.addEventListener('click',()=>{ on=!on; btn.setAttribute('aria-pressed',String(on)); btn.setAttribute('aria-label',on?'Pause background music':'Play background music'); on?start():stop(); });
  document.addEventListener('visibilitychange',()=>{ if(!on) return; if(document.hidden){ if(audio) audio.pause(); if(actx) actx.suspend(); } else { if(audio) audio.play().catch(()=>{}); if(actx) actx.resume(); } });
})();
})();
