import React from 'react';

const CSS = `
.pk2-tabs{display:inline-flex;gap:4px;background:var(--neutre-100);border-radius:var(--radius-pill);padding:4px;font-family:var(--font-body)}
.pk2-tabs__tab{border:none;background:transparent;color:var(--neutre-600);font-family:inherit;font-weight:700;
  font-size:var(--fs-small);padding:8px 18px;border-radius:var(--radius-pill);cursor:pointer;
  transition:all var(--dur-med) var(--ease-out)}
.pk2-tabs__tab:hover{color:var(--ink)}
.pk2-tabs__tab--active{background:#fff;color:var(--ink);box-shadow:var(--shadow-sm)}
.pk2-tabs--underline{background:transparent;border-radius:0;padding:0;gap:20px;border-bottom:1.5px solid var(--border)}
.pk2-tabs--underline .pk2-tabs__tab{border-radius:0;padding:10px 2px;position:relative}
.pk2-tabs--underline .pk2-tabs__tab--active{background:transparent;box-shadow:none;color:var(--bleu-500)}
.pk2-tabs--underline .pk2-tabs__tab--active::after{content:"";position:absolute;left:0;right:0;bottom:-1.5px;height:3px;border-radius:3px;background:var(--grad-bleu)}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','tabs');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Tabs({ items=[], value, defaultValue, onChange, variant='pill', className='', ...rest }){
  ensure();
  const [val, setVal] = React.useState(value !== undefined ? value : (defaultValue !== undefined ? defaultValue : (items[0] && items[0].value)));
  const current = value !== undefined ? value : val;
  const pick = (v)=>{ if (value === undefined) setVal(v); if (onChange) onChange(v); };
  return (
    <div className={['pk2-tabs', variant==='underline'?'pk2-tabs--underline':'', className].filter(Boolean).join(' ')} role="tablist" {...rest}>
      {items.map(it => (
        <button key={it.value} role="tab" aria-selected={current===it.value}
          className={'pk2-tabs__tab' + (current===it.value?' pk2-tabs__tab--active':'')}
          onClick={()=>pick(it.value)}>{it.label}</button>
      ))}
    </div>
  );
}
