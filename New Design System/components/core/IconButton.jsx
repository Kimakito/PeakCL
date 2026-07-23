import React from 'react';

const CSS = `
.pk2-iconbtn{
  display:inline-flex;align-items:center;justify-content:center;
  width:40px;height:40px;border-radius:var(--radius-pill);cursor:pointer;
  border:1.5px solid var(--border-strong);background:#fff;color:var(--ink);
  transition:all var(--dur-med) var(--ease-out);
}
.pk2-iconbtn svg{width:18px;height:18px}
.pk2-iconbtn:hover{background:var(--neutre-100);transform:translateY(-1px);box-shadow:var(--shadow-sm)}
.pk2-iconbtn:active{transform:scale(.95)}
.pk2-iconbtn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.pk2-iconbtn:disabled{opacity:.45;cursor:not-allowed}
.pk2-iconbtn--solid{background:var(--bleu-500);border-color:transparent;color:#fff}
.pk2-iconbtn--solid:hover{background:var(--bleu-400)}
.pk2-iconbtn--sm{width:32px;height:32px}
.pk2-iconbtn--sm svg{width:15px;height:15px}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','iconbutton');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function IconButton({ icon, solid=false, size='md', className='', ...rest }){
  ensure();
  const cls = ['pk2-iconbtn', solid?'pk2-iconbtn--solid':'', size==='sm'?'pk2-iconbtn--sm':'', className].filter(Boolean).join(' ');
  return <button className={cls} {...rest}>{icon}</button>;
}
