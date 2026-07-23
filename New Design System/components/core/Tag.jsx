import React from 'react';

const CSS = `
.pk2-tag{
  display:inline-flex;align-items:center;gap:6px;
  font-family:var(--font-body);font-weight:600;font-size:var(--fs-small);
  padding:6px 14px;border-radius:var(--radius-pill);
  border:1.5px solid var(--border-strong);background:#fff;color:var(--ink);
  transition:all var(--dur-med) var(--ease-out);
}
.pk2-tag--clickable{cursor:pointer}
.pk2-tag--clickable:hover{background:var(--neutre-100);transform:translateY(-1px)}
.pk2-tag--active{background:var(--bleu-500);border-color:var(--bleu-500);color:#fff}
.pk2-tag--active.pk2-tag--clickable:hover{background:var(--bleu-400)}
.pk2-tag__x{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;
  border-radius:50%;border:none;background:transparent;color:inherit;cursor:pointer;font-size:13px;line-height:1;padding:0}
.pk2-tag__x:hover{background:rgba(19,0,77,.12)}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','tag');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Tag({ active=false, onRemove, onClick, className='', children, ...rest }){
  ensure();
  const cls = ['pk2-tag', active?'pk2-tag--active':'', onClick?'pk2-tag--clickable':'', className].filter(Boolean).join(' ');
  return (
    <span className={cls} onClick={onClick} {...rest}>
      {children}
      {onRemove && <button className="pk2-tag__x" aria-label="retirer" onClick={(e)=>{e.stopPropagation();onRemove();}}>×</button>}
    </span>
  );
}
