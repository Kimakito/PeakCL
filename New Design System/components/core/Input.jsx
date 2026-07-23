import React from 'react';

const CSS = `
.pk2-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-body)}
.pk2-field__label{font-weight:700;font-size:var(--fs-small);color:var(--ink)}
.pk2-input{
  font-family:var(--font-body);font-size:var(--fs-body);color:var(--ink);
  background:#fff;border:1.5px solid var(--border);border-radius:14px;
  padding:11px 16px;width:100%;transition:border-color var(--dur-med) var(--ease-out),box-shadow var(--dur-med) var(--ease-out);
}
.pk2-input::placeholder{color:var(--neutre-400)}
.pk2-input:hover{border-color:var(--border-strong)}
.pk2-input:focus{outline:none;border-color:var(--bleu-500);box-shadow:0 0 0 3px rgba(66,124,255,.18)}
.pk2-input:disabled{opacity:.45;cursor:not-allowed}
.pk2-field__hint{font-size:var(--fs-caption);color:var(--text-muted)}
.pk2-field--error .pk2-input{border-color:#E14D7B;box-shadow:0 0 0 3px rgba(225,77,123,.14)}
.pk2-field--error .pk2-field__hint{color:#C13363}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','input');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Input({ label, hint, error=false, multiline=false, className='', ...rest }){
  ensure();
  const El = multiline ? 'textarea' : 'input';
  return (
    <label className={['pk2-field', error?'pk2-field--error':'', className].filter(Boolean).join(' ')}>
      {label && <span className="pk2-field__label">{label}</span>}
      <El className="pk2-input" rows={multiline?4:undefined} {...rest} />
      {hint && <span className="pk2-field__hint">{hint}</span>}
    </label>
  );
}
