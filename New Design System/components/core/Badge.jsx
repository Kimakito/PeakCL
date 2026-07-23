import React from 'react';

const CSS = `
.pk2-badge{
  display:inline-flex;align-items:center;gap:6px;
  font-family:var(--font-body);font-weight:700;font-size:var(--fs-caption);
  padding:4px 12px;border-radius:var(--radius-pill);white-space:nowrap;
}
.pk2-badge__dot{width:7px;height:7px;border-radius:2px;background:currentColor}
.pk2-badge--turquoise{background:var(--turquoise-200);color:var(--indigo-900)}
.pk2-badge--bleu{background:var(--bleu-200);color:var(--indigo-900)}
.pk2-badge--lavande{background:var(--lavande-200);color:var(--violet-800)}
.pk2-badge--jaune{background:var(--jaune-200);color:var(--indigo-900)}
.pk2-badge--violet{background:var(--violet-700);color:#fff}
.pk2-badge--neutre{background:var(--neutre-100);color:var(--neutre-600)}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','badge');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Badge({ tone='bleu', dot=false, className='', children, ...rest }){
  ensure();
  return (
    <span className={['pk2-badge','pk2-badge--'+tone,className].filter(Boolean).join(' ')} {...rest}>
      {dot && <span className="pk2-badge__dot" />}
      {children}
    </span>
  );
}
