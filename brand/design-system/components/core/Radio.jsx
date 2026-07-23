import React from 'react';

const CSS = `
.pk2-radio{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-family:var(--font-body);font-size:var(--fs-small);font-weight:600;color:var(--ink)}
.pk2-radio input{position:absolute;opacity:0;width:0;height:0}
.pk2-radio__dot{width:20px;height:20px;border-radius:50%;border:1.5px solid var(--border-strong);background:#fff;
  display:inline-flex;align-items:center;justify-content:center;transition:all var(--dur-med) var(--ease-spring);flex:none}
.pk2-radio__dot::after{content:"";width:9px;height:9px;border-radius:50%;background:#fff;transform:scale(0);transition:transform var(--dur-med) var(--ease-spring)}
.pk2-radio input:checked + .pk2-radio__dot{background:var(--bleu-500);border-color:var(--bleu-500)}
.pk2-radio input:checked + .pk2-radio__dot::after{transform:scale(1)}
.pk2-radio input:focus-visible + .pk2-radio__dot{outline:2px solid var(--focus-ring);outline-offset:2px}
.pk2-radio--disabled{opacity:.45;cursor:not-allowed}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','radio');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Radio({ label, disabled=false, className='', ...rest }){
  ensure();
  return (
    <label className={['pk2-radio', disabled?'pk2-radio--disabled':'', className].filter(Boolean).join(' ')}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="pk2-radio__dot" />
      {label && <span>{label}</span>}
    </label>
  );
}
