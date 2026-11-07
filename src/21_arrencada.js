/* ===== ARRANQUE ===== */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const f=ACT[t.dataset.a];if(f){if(t.tagName!=='INPUT')e.preventDefault();f(t.dataset.v,t)}});
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>go(t.dataset.v)));
$('#back').addEventListener('click',up);$('#brand').addEventListener('click',()=>go('home'));
applyTheme();show();

})();
