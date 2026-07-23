import React from 'react';

const CSS = `
.pk2-alert{display:flex;gap:12px;align-items:flex-start;padding:14px 18px;border-radius:var(--radius-md);
  font-family:var(--font-body);font-size:var(--fs-small);line-height:1.5;color:var(--indigo-900)}
.pk2-alert__sq{width:10px;height:10px;border-radius:3px;flex:none;margin-top:5px}
.pk2-alert__title{font-weight:800;margin:0 0 2px}
.pk2-alert--info{background:var(--bleu-200)}
.pk2-alert--info .pk2-alert__sq{background:var(--bleu-500)}
.pk2-alert--success{background:var(--turquoise-200)}
.pk2-alert--success .pk2-alert__sq{background:var(--turquoise-500)}
.pk2-alert--warning{background:var(--jaune-200)}
.pk2-alert--warning .pk2-alert__sq{background:var(--jaune-500)}
.pk2-alert--brand{background:var(--lavande-200)}
.pk2-alert--brand .pk2-alert__sq{background:var(--violet-700)}
`;

let injected = false;
function ensure(){
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl2','alert');
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Alert({ tone='info', title, className='', children, ...rest }){
  ensure();
  return (
    <div className={['pk2-alert','pk2-alert--'+tone,className].filter(Boolean).join(' ')} role="status" {...rest}>
      <span className="pk2-alert__sq" />
      <div>
        {title && <p className="pk2-alert__title">{title}</p>}
        {children}
      </div>
    </div>
  );
}
