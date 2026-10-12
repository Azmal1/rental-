document.documentElement.classList.add('js');
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const page=document.body.dataset.page;
const items=[['index.html','Home','home'],['index.html#about','About Us'],['index.html#profile','Company Profile'],'dd',['index.html#careers','Careers'],['index.html#contact','Contact']];
const sub=SERVICES.map((s,i)=>`<a href="services.html#${s.id}"><b>0${i+1}</b>${s.title}</a>`).join('');

/* ---- floating nav with Services dropdown + mobile menu ---- */
$('#hdr').innerHTML=`<nav class="nav"><a class="logo" href="index.html"><img src="images/logo.png" alt="Sawdax Est."></a>
<div class="links"><span class="pill"></span>${items.map(x=>x==='dd'?`<div class="dd"><a href="services.html" class="${page==='services'?'on':''}">Services</a><div class="ddm">${sub}</div></div>`:`<a href="${x[0]}" class="${x[2]===page?'on':''}">${x[1]}</a>`).join('')}</div>
<a class="btn" href="index.html#contact">Get a quote</a><button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button></nav>
<div class="menu">${items.map((x,i)=>x==='dd'?`<div class="mi"><button class="mt" style="--i:${i}">Services <span>+</span></button><div class="ms">${sub}<a href="services.html">View all services</a></div></div>`:`<a href="${x[0]}" style="--i:${i}">${x[1]}</a>`).join('')}<a class="btn" href="index.html#contact">Get a quote</a></div>`;
const pill=$('.pill'),tops=$$('.links>a,.dd>a');
const place=a=>{pill.style.width=a?a.offsetWidth+'px':0;if(a)pill.style.left=a.offsetLeft+'px'};
tops.forEach(a=>a.onmouseenter=()=>place(a));$('.links').onmouseleave=()=>place($('.links .on'));
place($('.links .on'));addEventListener('load',()=>place($('.links .on')));
const burger=$('.burger'),menu=$('.menu');
const tog=o=>{menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o)};
burger.onclick=()=>tog(!menu.classList.contains('open'));
menu.onclick=e=>{const m=e.target.closest('.mt');if(m)return m.parentElement.classList.toggle('open');if(e.target.closest('a'))tog(false)};

/* ---- footer ---- */
$('#ftr').innerHTML=`<div class="wrap"><div class="fg"><div><div class="plate"><img src="images/logo.png" alt="Sawdax Est."></div><p>Integrated services for construction, industrial, engineering, logistics, manpower, equipment rental, and technology projects across Saudi Arabia.</p></div>
<div><h4>Company</h4><ul>${items.filter(x=>x!=='dd').map(l=>`<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}<li><a href="services.html">Services</a></li></ul></div>
<div><h4>Services</h4><ul>${SERVICES.map(s=>`<li><a href="services.html#${s.id}">${s.title}</a></li>`).join('')}</ul></div></div>
<p class="copy">&copy; ${new Date().getFullYear()} Sawdax Est. All rights reserved.</p></div>`;

/* ---- render from data ---- */
const art='<div class="art"><b class="orb o1"></b><b class="orb o2"></b><i></i><i></i><i></i></div>';
$$('[data-render=slides]').forEach(el=>el.innerHTML=SLIDES.map((s,i)=>`<div class="slide ${s.tone}">${art}<span class="num">0${i+1}</span><div class="wrap"><span class="tag"><b></b>${s.tag}</span><h1>${s.h}</h1><p>${s.p}</p><div class="btns"><a class="btn" href="${s.cta[1]}">${s.cta[0]}</a><a class="btn ghost" href="index.html#contact">Contact us</a></div><div class="sc">${s.chips.map(c=>`<span>${c}</span>`).join('')}</div></div></div>`).join('')
 +`<div class="ctrl"><div class="wrap"><button class="arrow" id="prev" aria-label="Previous">&larr;</button><button class="arrow" id="next" aria-label="Next">&rarr;</button><div class="dots">${SLIDES.map((_,i)=>`<button class="dot" aria-label="Slide ${i+1}"><i></i></button>`).join('')}</div><span id="cnt"></span></div></div>`);
$$('[data-render=cards]').forEach(el=>el.innerHTML=SERVICES.map((s,i)=>`<a class="card" href="services.html#${s.id}"><div class="top t${i%4}"><i></i><i></i><span>0${i+1}</span></div><div class="bd"><h3>${s.title}</h3><p>${s.short}</p><span class="go">Learn more &rarr;</span></div></a>`).join(''));
$$('[data-render=why]').forEach(el=>el.innerHTML=WHY.map((w,i)=>`<div class="c rv" style="--d:${i}"><span class="n">0${i+1}</span><h3>${w[0]}</h3><p>${w[1]}</p></div>`).join(''));
$$('[data-render=chips]').forEach(el=>el.innerHTML=SERVICES.map(s=>`<li><a href="services.html#${s.id}">${s.title}</a></li>`).join(''));
$$('[data-render=detail]').forEach(el=>el.innerHTML=SERVICES.map((s,i)=>`<article class="svc" id="${s.id}"><div class="l rv"><div class="big">0${i+1}</div><h2>${s.title}</h2><p>${s.intro}</p></div><div class="r rv" style="--d:1">${s.items?`<p class="label">${s.label||'Our capabilities include'}:</p><ul class="chips">${s.items.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}${s.extra?`<p>${s.extra}</p>`:''}</div></article>`).join(''));
$$('[data-render=contact]').forEach(el=>el.innerHTML=`<div class="wrap cols"><div class="rv"><p class="eyebrow">Contact us</p><h2>Have a project requirement?</h2><p class="lead">Share your scope with our team. We will review your requirements and provide a suitable and competitive proposal.</p></div>
<form class="form rv" style="--d:1" data-ok="Thank you! Our team will review your requirements and get back to you."><div class="two"><input required placeholder="Full name" aria-label="Full name"><input placeholder="Company" aria-label="Company"></div><div class="two"><input type="email" required placeholder="Email address" aria-label="Email"><input type="tel" placeholder="Phone number" aria-label="Phone"></div>
<select aria-label="Service required"><option value="">Service required</option>${SERVICES.map(s=>`<option>${s.title.replace(/&amp;/g,'&')}</option>`).join('')}</select><textarea required placeholder="Tell us about your project scope" aria-label="Project scope"></textarea><button class="btn" type="submit">Send enquiry</button><p class="ok" role="status"></p></form></div>`);

/* ---- hero slider ---- */
const hero=$('.hero');
if(hero&&$('.slide')){const sl=$$('.slide'),dots=$$('.dot');let cur=0,tm;
 const go=n=>{cur=(n+sl.length)%sl.length;sl.forEach((s,i)=>s.classList.toggle('on',i===cur));dots.forEach((d,i)=>d.classList.toggle('on',i===cur));$('#cnt').textContent=`0${cur+1} / 0${sl.length}`;clearInterval(tm);tm=setInterval(()=>go(cur+1),6500)};
 $('#prev').onclick=()=>go(cur-1);$('#next').onclick=()=>go(cur+1);dots.forEach((d,i)=>d.onclick=()=>go(i));
 hero.onmouseenter=()=>{clearInterval(tm);hero.classList.add('pause')};hero.onmouseleave=()=>{hero.classList.remove('pause');go(cur)};
 hero.addEventListener('pointermove',e=>{hero.style.setProperty('--px',(e.clientX/innerWidth-.5).toFixed(3));hero.style.setProperty('--py',(e.clientY/innerHeight-.5).toFixed(3))});
 let x0;hero.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});hero.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(cur+(d<0?1:-1))});
 addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});go(0)}

/* ---- services slider: continuous auto-slide (loops), arrows, drag ---- */
const rail=$('#rail');
if(rail){rail.innerHTML+=rail.innerHTML;
 const bar=$('.prog i'),half=()=>rail.scrollWidth/2,step=()=>rail.firstElementChild.offsetWidth+20;
 let pos=0,hover=0,down=0,hold=0,sx,sl0,moved;
 const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const tick=()=>{const h=half();
  if(down||Date.now()<hold){pos=rail.scrollLeft;if(pos<=0){pos+=h;rail.scrollLeft=pos}else if(pos>=h){pos-=h;rail.scrollLeft=pos}}
  else if(!still){pos+=hover?.25:.9;if(pos>=h)pos-=h;rail.scrollLeft=pos}
  bar.style.width=Math.max(8,(pos%h)/h*100)+'%';requestAnimationFrame(tick)};
 const nudge=d=>{hold=Date.now()+2500;rail.scrollBy({left:d*step(),behavior:'smooth'})};
 $('#sprev').onclick=()=>nudge(-1);$('#snext').onclick=()=>nudge(1);
 rail.onmouseenter=()=>hover=1;rail.onmouseleave=()=>hover=0;
 rail.addEventListener('touchstart',()=>hold=Date.now()+3500,{passive:true});rail.addEventListener('wheel',()=>hold=Date.now()+2500,{passive:true});
 rail.onpointerdown=e=>{if(e.pointerType!=='mouse')return;down=1;moved=0;sx=e.clientX;sl0=rail.scrollLeft;rail.classList.add('drag')};
 addEventListener('pointermove',e=>{if(!down)return;const d=e.clientX-sx;if(Math.abs(d)>5)moved=1;rail.scrollLeft=sl0-d});
 addEventListener('pointerup',()=>{if(down){down=0;hold=Date.now()+1500;rail.classList.remove('drag')}});
 rail.addEventListener('click',e=>{if(moved){e.preventDefault();moved=0}},true);rail.ondragstart=e=>e.preventDefault();
 requestAnimationFrame(tick)}

/* ---- company profile tabs ---- */
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab').forEach(x=>x.classList.toggle('on',x===b));$$('.panel').forEach(p=>p.classList.toggle('on',p.id===b.dataset.t))});

/* ---- scroll reveal ---- */
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;el.classList.add('in');io.unobserve(el);setTimeout(()=>el.classList.remove('rv','in'),1500)}}),{threshold:.1}):null;
$$('.rv').forEach(el=>io?io.observe(el):el.classList.remove('rv'));

/* ---- forms (front-end only: connect to your email/backend) ---- */
$$('form[data-ok]').forEach(f=>f.onsubmit=e=>{e.preventDefault();$('.ok',f).textContent=f.dataset.ok;f.reset()});
