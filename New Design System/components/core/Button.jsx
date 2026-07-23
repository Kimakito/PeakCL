import React from 'react';

const CSS = `
.pk2-btn{
  --_bg:var(--grad-jaune); --_fg:var(--cta-ink); --_bd:transparent; --_sh:0 3px 10px rgba(242,208,75,.35);
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-family:var(--font-body);font-weight:700;
  border:1.5px solid var(--_bd);background:var(--_bg);color:var(--_fg);
  border-radius:var(--radius-pill);cursor:pointer;white-space:nowrap;box-shadow:var(--_sh);
  transition:transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-med) var(--ease-out),
             background var(--dur-med) var(--ease-out),border-color var(--dur-med) var(--ease-out);
}
.pk2-btn:hover{transform:translateY(-1px)}
.pk2-btn:active{transform:scale(.97)}
.pk2-btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.pk2-btn:disabled{opacity:.45;cursor:not-allowed;box-shadow:none;transform:none}
.pk2-btn__i{display:inline-flex;width:1.1em;height:1.1em}
.pk2-btn__i svg{width:100%;height:100%}
.pk2-btn--sm{font-size:var(--fs-small);padding:7px 16px}
.pk2-btn--md{font-size:var(--fs-body);padding:11px 22px}
.pk2-btn--lg{font-size:17px;padding:14px 28px}
.pk2-btn--full{width:100%}
.pk2-btn--primary:hover{box-shadow:var(--shadow-cta)}
.pk2-btn--secondary{--_bg:var(--bleu-500);--_fg:#fff;--_sh:none}
.pk2-btn--secondary:hover{--_bg:var(--bleu-400);box-shadow:var(--shadow-md)}
.pk2-btn--secondary:active{--_bg:var(--accent-press)}
.pk2-btn--ghost{--_bg:transparent;--_fg:var(--ink);--_bd:var(--border-strong);--_sh:none}
.pk2-btn--ghost:hover{--_bg:var(--neutre-100)}
.pk2-btn--inverse{--_bg:#fff;--_fg:var(--violet-700);--_sh:var(--shadow-sm)}
.pk2-btn--inverse:hover{box-shadow:var(--shadow-md)}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','button');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Button({ variant='primary', size='md', icon, iconRight, full=false, disabled=false, className='', children, ...rest }){
  ensure();
  const cls = ['pk2-btn','pk2-btn--'+variant,'pk2-btn--'+size, full?'pk2-btn--full':'', className].filter(Boolean).join(' ');
  return (
    <button className={cls} disabled={disabled} {...rest}>
      {icon && <span className="pk2-btn__i">{icon}</span>}
      {children}
      {iconRight && <span className="pk2-btn__i">{iconRight}</span>}
    </button>
  );
}
