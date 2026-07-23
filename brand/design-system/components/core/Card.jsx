import React from 'react';

const CSS = `
.pk2-card{
  background:var(--surface-card);border:1px solid var(--border);
  border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);
  padding:var(--space-6);font-family:var(--font-body);color:var(--text-body);
  transition:transform var(--dur-med) var(--ease-out),box-shadow var(--dur-med) var(--ease-out);
}
.pk2-card--hover:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.pk2-card__kicker{display:flex;align-items:center;gap:8px;font-weight:700;font-size:var(--fs-caption);
  letter-spacing:var(--ls-kicker);text-transform:uppercase;color:var(--bleu-500);margin-bottom:10px}
.pk2-card__kicker::before{content:"";width:9px;height:9px;border-radius:3px;background:var(--grad-jaune)}
.pk2-card__title{font-family:var(--font-display);font-weight:700;font-size:var(--fs-h4);
  line-height:var(--lh-snug);color:var(--ink);margin:0 0 8px}
.pk2-card--turquoise{background:var(--grad-turquoise);border-color:transparent}
.pk2-card--bleu{background:var(--grad-bleu);border-color:transparent}
.pk2-card--lavande{background:var(--grad-lavande);border-color:transparent;color:#fff}
.pk2-card--lavande .pk2-card__title,.pk2-card--lavande .pk2-card__kicker{color:#fff}
.pk2-card--jaune{background:var(--grad-jaune);border-color:transparent}
.pk2-card--violet{background:var(--grad-violet);border-color:transparent;color:#fff}
.pk2-card--violet .pk2-card__title,.pk2-card--violet .pk2-card__kicker{color:#fff}
.pk2-card--turquoise .pk2-card__kicker,.pk2-card--bleu .pk2-card__kicker,.pk2-card--jaune .pk2-card__kicker{color:var(--indigo-900)}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','card');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Card({ tone, kicker, title, hover=true, className='', children, ...rest }){
  ensure();
  const cls = ['pk2-card', tone?'pk2-card--'+tone:'', hover?'pk2-card--hover':'', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {kicker && <div className="pk2-card__kicker">{kicker}</div>}
      {title && <h3 className="pk2-card__title">{title}</h3>}
      {children}
    </div>
  );
}
