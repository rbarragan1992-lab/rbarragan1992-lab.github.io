const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];
document.addEventListener('DOMContentLoaded', ()=>{
  $('#year').textContent = new Date().getFullYear();
  const nav = $('.site-nav'); const btn = $('.nav-toggle');
  btn.addEventListener('click', ()=>{ const exp = btn.getAttribute('aria-expanded')==='true'; btn.setAttribute('aria-expanded', String(!exp)); nav.setAttribute('aria-expanded', String(!exp)); });
  const menuLinks = $$('#menu a'); const sections = $$('main section[id]'); const map = new Map(sections.map(s=>[s.id,s]));
  function show(id){ map.forEach((sec,k)=>{ k===id? sec.removeAttribute('hidden') : sec.setAttribute('hidden',''); }); menuLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')===`#${id}`)); window.location.hash=id; }
  show((location.hash||'#inicio').replace('#',''));
  menuLinks.forEach(a=> a.addEventListener('click', e=>{ e.preventDefault(); show(a.getAttribute('href').replace('#','')); }));
  ['wheel','touchmove'].forEach(evt=> window.addEventListener(evt, e=> e.preventDefault(), {passive:false}));
  window.addEventListener('keydown', e=>{ const keys=['ArrowDown','ArrowUp','PageDown','PageUp','Space','Home','End']; if(keys.includes(e.code)) e.preventDefault(); });
  const form=$('#contactForm'), status=$('#formStatus');
  form.addEventListener('submit', async (e)=>{ e.preventDefault(); status.textContent='Enviando...'; try{ const EP='https://formspree.io/f/mldoqzbp'; const r=await fetch(EP,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)}); if(r.ok){ status.textContent='¡Mensaje enviado!'; form.reset(); } else { status.textContent='No se pudo enviar.'; } }catch(err){ status.textContent='Error de red.'; } });
});