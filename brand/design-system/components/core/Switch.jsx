import React from 'react';

const CSS = `
.pk2-switch{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-family:var(--font-body);font-size:var(--fs-small);font-weight:600;color:var(--ink)}
.pk2-switch input{position:absolute;opacity:0;width:0;height:0}
.pk2-switch__track{width:44px;height:24px;border-radius:999px;background:var(--neutre-200);position:relative;
  transition:background var(--dur-med) var(--ease-out);flex:none}
.pk2-switch__track::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;
  background:#fff;box-shadow:var(--shadow-sm);transition:transform var(--dur-med) var(--ease-spring)}
.pk2-switch input:checked + .pk2-switch__track{background:var(--grad-bleu)}
.pk2-switch input:checked + .pk2-switch__track::after{transform:translateX(20px)}
.pk2-switch input:focus-visible + .pk2-switch__track{outline:2px solid var(--focus-ring);outline-offset:2px}
.pk2-switch--disabled{opacity:.45;cursor:not-allowed}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','switch');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Switch({ label, disabled=false, className='', ...rest }){
  ensure();
  return (
    <label className={['pk2-switch', disabled?'pk2-switch--disabled':'', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="pk2-switch__track" />
      {label && <span>{label}</span>}
    </label>
  );
}
