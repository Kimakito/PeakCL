import React from 'react';

const CSS = `
.pk2-check{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-family:var(--font-body);font-size:var(--fs-small);font-weight:600;color:var(--ink)}
.pk2-check input{position:absolute;opacity:0;width:0;height:0}
.pk2-check__box{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--border-strong);background:#fff;
  display:inline-flex;align-items:center;justify-content:center;transition:all var(--dur-med) var(--ease-spring);flex:none}
.pk2-check__box svg{width:12px;height:12px;stroke:#fff;opacity:0;transform:scale(.5);transition:all var(--dur-med) var(--ease-spring)}
.pk2-check input:checked + .pk2-check__box{background:var(--bleu-500);border-color:var(--bleu-500)}
.pk2-check input:checked + .pk2-check__box svg{opacity:1;transform:scale(1)}
.pk2-check input:focus-visible + .pk2-check__box{outline:2px solid var(--focus-ring);outline-offset:2px}
.pk2-check--disabled{opacity:.45;cursor:not-allowed}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','checkbox');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Checkbox({ label, disabled=false, className='', ...rest }){
  ensure();
  return (
    <label className={['pk2-check', disabled?'pk2-check--disabled':'', className].filter(Boolean).join(' ')}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span className="pk2-check__box">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l5 5 9-11"/></svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
