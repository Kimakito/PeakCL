import React from 'react';
import { Input } from './Input.jsx';

const CSS = `
.pk2-select{
  appearance:none;-webkit-appearance:none;
  font-family:var(--font-body);font-size:var(--fs-body);color:var(--ink);
  background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2313004D' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
  border:1.5px solid var(--border);border-radius:14px;padding:11px 40px 11px 16px;width:100%;
  transition:border-color var(--dur-med) var(--ease-out),box-shadow var(--dur-med) var(--ease-out);cursor:pointer;
}
.pk2-select:hover{border-color:var(--border-strong)}
.pk2-select:focus{outline:none;border-color:var(--bleu-500);box-shadow:0 0 0 3px rgba(66,124,255,.18)}
.pk2-select:disabled{opacity:.45;cursor:not-allowed}
.pk2-select--placeholder{color:var(--neutre-400)}
.pk2-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-body)}
.pk2-field__label{font-weight:700;font-size:var(--fs-small);color:var(--ink)}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','select');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Select({ label, options=[], placeholder, value, defaultValue, onChange, className='', ...rest }){
  ensure();
  const [val, setVal] = React.useState(value !== undefined ? value : (defaultValue !== undefined ? defaultValue : ''));
  const current = value !== undefined ? value : val;
  const handle = (e)=>{ if (value === undefined) setVal(e.target.value); if (onChange) onChange(e); };
  const opts = options.map(o => typeof o === 'string' ? {value:o, label:o} : o);
  return (
    <label className={['pk2-field', className].filter(Boolean).join(' ')}>
      {label && <span className="pk2-field__label">{label}</span>}
      <select className={'pk2-select' + (current===''?' pk2-select--placeholder':'')} value={current} onChange={handle} {...rest}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
