/* @ds-bundle: {"format":3,"namespace":"DesignSystem_596261","components":[{"name":"Alert","sourcePath":"components/core/Alert.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Alert.jsx":"9622e4a2e7fc","components/core/Badge.jsx":"95150f1f17be","components/core/Button.jsx":"df7a2331a1b3","components/core/Card.jsx":"ab8f2076e9b9","components/core/Checkbox.jsx":"431e1d9183de","components/core/IconButton.jsx":"f37f11508cf8","components/core/Input.jsx":"cf5f4fa44840","components/core/Select.jsx":"59c496a3241e","components/core/Switch.jsx":"7b7505916881","components/core/Tabs.jsx":"37858e77fd4f","components/core/Tag.jsx":"5b6148f621ac","ui_kits/website/HomeMotifs.jsx":"21df316083ed","ui_kits/website/HomeSections1.jsx":"fbef60e5dcf5","ui_kits/website/HomeSections2.jsx":"499d74af15f2","ui_kits/website/HomeSections3.jsx":"a32d8273976d","ui_kits/website/Sections1.jsx":"65fb58ba8676","ui_kits/website/Sections2.jsx":"bf7342ba824e","ui_kits/website/image-slot.js":"9309434cb09c","ui_kits/website/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_596261 = window.DesignSystem_596261 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-alert{
  display:flex;gap:13px;align-items:flex-start;
  background:var(--surface);border:1px solid var(--border);
  border-left:3px solid var(--_c,var(--accent-2));
  border-radius:var(--radius-md);padding:14px 16px;font-family:var(--font-body);
}
.pcl-alert__icon{flex:none;display:inline-flex;color:var(--_c,var(--accent-2));margin-top:1px}
.pcl-alert__icon svg{width:20px;height:20px}
.pcl-alert__title{font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:var(--text);margin-bottom:3px}
.pcl-alert__body{font-size:var(--text-sm);color:var(--text-muted);line-height:1.5}
.pcl-alert--info{--_c:var(--info)}
.pcl-alert--success{--_c:var(--success)}
.pcl-alert--warning{--_c:var(--warning)}
.pcl-alert--danger{--_c:var(--danger)}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'alert');
  s.textContent = CSS;
  document.head.appendChild(s);
}
const ICONS = {
  info: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4M12 8h.01"
  })),
  success: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })),
  warning: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01"
  })),
  danger: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 9l-6 6M9 9l6 6"
  }))
};
function Alert({
  tone = 'info',
  title,
  icon,
  className = '',
  children,
  ...rest
}) {
  ensure();
  const cls = ['pcl-alert', `pcl-alert--${tone}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "status"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "pcl-alert__icon"
  }, icon || ICONS[tone]), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    className: "pcl-alert__title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "pcl-alert__body"
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Alert.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-badge{
  display:inline-flex;align-items:center;gap:6px;
  font-family:var(--font-mono);font-size:var(--text-2xs);font-weight:700;
  text-transform:uppercase;letter-spacing:.08em;
  padding:4px 9px;border-radius:var(--radius-sm);
  border:1px solid transparent;line-height:1;
}
.pcl-badge__dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.pcl-badge--neutral{background:var(--surface-raised);color:var(--text-muted);border-color:var(--border)}
.pcl-badge--yellow{background:rgba(233,222,31,0.14);color:var(--peak-yellow);border-color:rgba(233,222,31,0.35)}
.pcl-badge--turquoise{background:rgba(25,189,189,0.14);color:var(--peak-turquoise-bright);border-color:rgba(25,189,189,0.35)}
.pcl-badge--violet{background:rgba(166,24,204,0.16);color:var(--peak-violet-bright);border-color:rgba(166,24,204,0.4)}
.pcl-badge--success{background:rgba(47,191,113,0.14);color:var(--success);border-color:rgba(47,191,113,0.35)}
.pcl-badge--danger{background:rgba(240,83,62,0.14);color:var(--danger);border-color:rgba(240,83,62,0.35)}
.pcl-badge--solid{background:var(--accent);color:var(--on-accent);border-color:transparent}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'badge');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Badge({
  tone = 'neutral',
  dot = false,
  className = '',
  children,
  ...rest
}) {
  ensure();
  const cls = ['pcl-badge', `pcl-badge--${tone}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "pcl-badge__dot"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-btn{
  --_bg:var(--accent); --_fg:var(--on-accent); --_bd:transparent; --_glow:var(--glow-yellow);
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-family:var(--font-display);font-weight:600;letter-spacing:var(--ls-snug);
  border:var(--border-width-strong) solid var(--_bd);
  background:var(--_bg);color:var(--_fg);
  border-radius:var(--radius-md);cursor:pointer;white-space:nowrap;
  transition:transform var(--dur-fast) var(--ease-out),
             box-shadow var(--dur-base) var(--ease-out),
             background var(--dur-base) var(--ease-out),
             border-color var(--dur-base) var(--ease-out),
             color var(--dur-base) var(--ease-out);
}
.pcl-btn:hover{box-shadow:var(--_glow)}
.pcl-btn:active{transform:scale(0.97)}
.pcl-btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.pcl-btn:disabled{opacity:.4;cursor:not-allowed;box-shadow:none}
.pcl-btn__i{display:inline-flex;width:1.1em;height:1.1em}
.pcl-btn__i svg{width:100%;height:100%}

.pcl-btn--sm{font-size:var(--text-sm);padding:7px 14px}
.pcl-btn--md{font-size:var(--text-base);padding:11px 20px}
.pcl-btn--lg{font-size:var(--text-md);padding:15px 28px}
.pcl-btn--full{width:100%}

.pcl-btn--primary{--_bg:var(--accent);--_fg:var(--on-accent);--_glow:var(--glow-yellow)}
.pcl-btn--primary:hover{--_bg:var(--accent-hover)}

.pcl-btn--secondary{--_bg:transparent;--_fg:var(--accent-2);--_bd:var(--accent-2);--_glow:var(--glow-turquoise)}
.pcl-btn--secondary:hover{--_bg:rgba(25,189,189,0.12);--_fg:var(--accent-2-hover)}

.pcl-btn--ghost{--_bg:transparent;--_fg:var(--text);--_bd:var(--border-strong);--_glow:none}
.pcl-btn--ghost:hover{--_bg:var(--surface-raised);--_bd:var(--ink-400)}

.pcl-btn--pop{--_bg:var(--accent-pop);--_fg:var(--on-pop);--_glow:var(--glow-violet)}
.pcl-btn--pop:hover{--_bg:var(--peak-violet-bright)}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'button');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  full = false,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  ensure();
  const cls = ['pcl-btn', `pcl-btn--${variant}`, `pcl-btn--${size}`, full ? 'pcl-btn--full' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "pcl-btn__i"
  }, icon), children, iconRight && /*#__PURE__*/React.createElement("span", {
    className: "pcl-btn__i"
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-card{
  position:relative;background:var(--surface);
  border:1px solid var(--border);border-radius:var(--radius-lg);
  padding:var(--space-5);overflow:hidden;
  transition:transform var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);
}
.pcl-card--raised{background:var(--surface-raised);box-shadow:var(--shadow-md)}
.pcl-card--interactive{cursor:pointer}
.pcl-card--interactive:hover{transform:translateY(-2px);border-color:var(--accent-2);box-shadow:var(--shadow-lg)}
.pcl-card--accent::before{
  content:"";position:absolute;top:0;left:0;right:0;height:3px;
  background:var(--accent);
}
.pcl-card__kicker{
  font-family:var(--font-mono);font-size:var(--text-xs);text-transform:uppercase;
  letter-spacing:var(--ls-kicker);color:var(--accent-2);margin-bottom:var(--space-3);
  display:flex;align-items:center;gap:8px;
}
.pcl-card__title{font-family:var(--font-display);font-weight:700;font-size:var(--text-xl);letter-spacing:var(--ls-tight);color:var(--text);margin-bottom:var(--space-2)}
.pcl-card__body{color:var(--text-muted);font-size:var(--text-base);line-height:var(--lh-relaxed)}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'card');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Card({
  variant = 'default',
  interactive = false,
  kicker,
  title,
  className = '',
  children,
  ...rest
}) {
  ensure();
  const cls = ['pcl-card', variant !== 'default' ? `pcl-card--${variant}` : '', interactive ? 'pcl-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), kicker && /*#__PURE__*/React.createElement("div", {
    className: "pcl-card__kicker"
  }, kicker), title && /*#__PURE__*/React.createElement("div", {
    className: "pcl-card__title"
  }, title), title || kicker ? /*#__PURE__*/React.createElement("div", {
    className: "pcl-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-check{display:inline-flex;align-items:flex-start;gap:10px;cursor:pointer;font-family:var(--font-body);font-size:var(--text-sm);color:var(--text);user-select:none;line-height:1.4}
.pcl-check input{position:absolute;opacity:0;width:0;height:0}
.pcl-check__box{
  width:20px;height:20px;flex:none;border-radius:var(--radius-sm);
  border:1.5px solid var(--border-strong);background:var(--surface-sunken);
  display:inline-flex;align-items:center;justify-content:center;margin-top:1px;
  transition:background var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out);
}
.pcl-check__box svg{width:13px;height:13px;stroke:var(--on-accent);stroke-width:3.5;opacity:0;transform:scale(.5);transition:opacity var(--dur-fast),transform var(--dur-base) var(--ease-spring)}
.pcl-check input:checked + .pcl-check__box{background:var(--accent);border-color:var(--accent)}
.pcl-check input:checked + .pcl-check__box svg{opacity:1;transform:scale(1)}
.pcl-check input:focus-visible + .pcl-check__box{outline:2px solid var(--focus-ring);outline-offset:2px}
.pcl-check--disabled{opacity:.45;cursor:not-allowed}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'check');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  className = '',
  ...rest
}) {
  ensure();
  const cls = ['pcl-check', disabled ? 'pcl-check--disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "pcl-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-iconbtn{
  display:inline-flex;align-items:center;justify-content:center;
  background:transparent;border:var(--border-width) solid var(--border-strong);
  color:var(--text);border-radius:var(--radius-md);cursor:pointer;
  transition:transform var(--dur-fast) var(--ease-out),background var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);
}
.pcl-iconbtn svg{width:1.15em;height:1.15em}
.pcl-iconbtn:hover{background:var(--surface-raised);border-color:var(--accent-2);color:var(--accent-2)}
.pcl-iconbtn:active{transform:scale(0.94)}
.pcl-iconbtn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.pcl-iconbtn:disabled{opacity:.4;cursor:not-allowed}
.pcl-iconbtn--sm{width:32px;height:32px;font-size:15px}
.pcl-iconbtn--md{width:40px;height:40px;font-size:18px}
.pcl-iconbtn--lg{width:48px;height:48px;font-size:21px}
.pcl-iconbtn--solid{background:var(--accent);border-color:transparent;color:var(--on-accent)}
.pcl-iconbtn--solid:hover{background:var(--accent-hover);color:var(--on-accent);box-shadow:var(--glow-yellow)}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'iconbtn');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function IconButton({
  icon,
  size = 'md',
  solid = false,
  className = '',
  'aria-label': ariaLabel,
  children,
  ...rest
}) {
  ensure();
  const cls = ['pcl-iconbtn', `pcl-iconbtn--${size}`, solid ? 'pcl-iconbtn--solid' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": ariaLabel
  }, rest), icon || children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-body)}
.pcl-field__label{font-size:var(--text-sm);font-weight:600;color:var(--text)}
.pcl-field__label span{color:var(--danger);margin-left:2px}
.pcl-input-wrap{position:relative;display:flex;align-items:center}
.pcl-input-wrap__icon{position:absolute;left:13px;display:inline-flex;color:var(--text-subtle);pointer-events:none}
.pcl-input-wrap__icon svg{width:18px;height:18px}
.pcl-input{
  width:100%;font-family:var(--font-body);font-size:var(--text-base);color:var(--text);
  background:var(--surface-sunken);border:1px solid var(--border-strong);
  border-radius:var(--radius-md);padding:11px 14px;
  transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),background var(--dur-base) var(--ease-out);
}
.pcl-input--has-icon{padding-left:40px}
.pcl-input::placeholder{color:var(--text-subtle)}
.pcl-input:hover{border-color:var(--ink-400)}
.pcl-input:focus{outline:none;border-color:var(--accent-2);box-shadow:0 0 0 3px rgba(25,189,189,0.18)}
.pcl-input:disabled{opacity:.45;cursor:not-allowed}
.pcl-input--error{border-color:var(--danger)}
.pcl-input--error:focus{box-shadow:0 0 0 3px rgba(240,83,62,0.2)}
.pcl-field__hint{font-size:var(--text-xs);color:var(--text-subtle)}
.pcl-field__hint--error{color:var(--danger)}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'input');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Input({
  label,
  hint,
  error,
  required = false,
  icon,
  id,
  className = '',
  ...rest
}) {
  ensure();
  const fieldId = id || (label ? `pcl-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const inputCls = ['pcl-input', icon ? 'pcl-input--has-icon' : '', error ? 'pcl-input--error' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: "pcl-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "pcl-field__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", null, "*")), /*#__PURE__*/React.createElement("div", {
    className: "pcl-input-wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "pcl-input-wrap__icon"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("div", {
    className: `pcl-field__hint${error ? ' pcl-field__hint--error' : ''}`
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-select-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-body)}
.pcl-select-field__label{font-size:var(--text-sm);font-weight:600;color:var(--text)}
.pcl-select-wrap{position:relative;display:flex;align-items:center}
.pcl-select{
  width:100%;appearance:none;font-family:var(--font-body);font-size:var(--text-base);color:var(--text);
  background:var(--surface-sunken);border:1px solid var(--border-strong);
  border-radius:var(--radius-md);padding:11px 38px 11px 14px;cursor:pointer;
  transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);
}
.pcl-select:hover{border-color:var(--ink-400)}
.pcl-select:focus{outline:none;border-color:var(--accent-2);box-shadow:0 0 0 3px rgba(25,189,189,0.18)}
.pcl-select:disabled{opacity:.45;cursor:not-allowed}
.pcl-select-wrap__caret{position:absolute;right:13px;pointer-events:none;color:var(--text-subtle);display:inline-flex}
.pcl-select-wrap__caret svg{width:16px;height:16px}
.pcl-select option{background:var(--surface);color:var(--text)}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'select');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Select({
  label,
  options = [],
  placeholder,
  id,
  className = '',
  children,
  ...rest
}) {
  ensure();
  const fieldId = id || (label ? `pcl-sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "pcl-select-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "pcl-select-field__label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "pcl-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: ['pcl-select', className].filter(Boolean).join(' ')
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lab = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  }), children), /*#__PURE__*/React.createElement("span", {
    className: "pcl-select-wrap__caret"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-switch{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-family:var(--font-body);font-size:var(--text-sm);color:var(--text);user-select:none}
.pcl-switch input{position:absolute;opacity:0;width:0;height:0}
.pcl-switch__track{
  width:42px;height:24px;border-radius:var(--radius-pill);
  background:var(--ink-500);position:relative;flex:none;
  transition:background var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);
}
.pcl-switch__thumb{
  position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;
  background:var(--white);transition:transform var(--dur-base) var(--ease-spring);
}
.pcl-switch input:checked + .pcl-switch__track{background:var(--accent-2)}
.pcl-switch input:checked + .pcl-switch__track .pcl-switch__thumb{transform:translateX(18px)}
.pcl-switch input:focus-visible + .pcl-switch__track{outline:2px solid var(--focus-ring);outline-offset:2px}
.pcl-switch--disabled{opacity:.45;cursor:not-allowed}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'switch');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  className = '',
  ...rest
}) {
  ensure();
  const cls = ['pcl-switch', disabled ? 'pcl-switch--disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "pcl-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pcl-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
const CSS = `
.pcl-tabs{display:inline-flex;gap:2px;background:var(--surface-sunken);border:1px solid var(--border);border-radius:var(--radius-md);padding:4px}
.pcl-tab{
  font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);
  color:var(--text-muted);background:transparent;border:none;cursor:pointer;
  padding:8px 16px;border-radius:var(--radius-sm);display:inline-flex;align-items:center;gap:7px;
  transition:color var(--dur-base) var(--ease-out),background var(--dur-base) var(--ease-out);
}
.pcl-tab svg{width:16px;height:16px}
.pcl-tab:hover{color:var(--text)}
.pcl-tab--active{color:var(--on-accent);background:var(--accent)}
.pcl-tab:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}

.pcl-tabs--underline{background:transparent;border:none;border-bottom:1px solid var(--border);border-radius:0;padding:0;gap:4px}
.pcl-tabs--underline .pcl-tab{border-radius:0;padding:11px 14px;border-bottom:2px solid transparent;margin-bottom:-1px}
.pcl-tabs--underline .pcl-tab--active{background:transparent;color:var(--accent-2-hover);border-bottom-color:var(--accent-2)}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'tabs');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'segmented',
  className = ''
}) {
  ensure();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  const cls = ['pcl-tabs', variant === 'underline' ? 'pcl-tabs--underline' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    role: "tablist"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.value,
    role: "tab",
    "aria-selected": active === it.value,
    className: `pcl-tab${active === it.value ? ' pcl-tab--active' : ''}`,
    onClick: () => select(it.value)
  }, it.icon, it.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pcl-tag{
  display:inline-flex;align-items:center;gap:7px;
  font-family:var(--font-body);font-size:var(--text-sm);font-weight:500;
  padding:6px 13px;border-radius:var(--radius-pill);
  background:var(--surface-raised);color:var(--text-muted);
  border:1px solid var(--border);cursor:default;
  transition:border-color var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out),background var(--dur-base) var(--ease-out);
}
.pcl-tag--interactive{cursor:pointer}
.pcl-tag--interactive:hover{border-color:var(--accent-2);color:var(--text)}
.pcl-tag--active{background:rgba(25,189,189,0.14);border-color:var(--accent-2);color:var(--accent-2-hover)}
.pcl-tag__x{display:inline-flex;width:14px;height:14px;border-radius:50%;align-items:center;justify-content:center;background:rgba(255,255,255,.1);font-size:11px;line-height:1;cursor:pointer}
.pcl-tag__x:hover{background:var(--danger);color:#fff}
`;
let injected = false;
function ensure() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-peakcl', 'tag');
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Tag({
  active = false,
  onRemove,
  onClick,
  className = '',
  children,
  ...rest
}) {
  ensure();
  const interactive = !!onClick;
  const cls = ['pcl-tag', interactive ? 'pcl-tag--interactive' : '', active ? 'pcl-tag--active' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    onClick: onClick
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    className: "pcl-tag__x",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeMotifs.jsx
try { (() => {
/* PeakCL — Home refonte · signature motifs (chargé avant les sections) */

/* Radar d'hexagones concentriques — rappel du badge / altitude */
function HexRings() {
  const base = [[25, 0], [75, 0], [100, 50], [75, 100], [25, 100], [0, 50]];
  const ks = [1, 0.8, 0.6, 0.4, 0.22];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid meet",
    style: {
      position: 'absolute',
      top: '46%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: 'min(82vw, 900px)',
      height: 'min(82vw, 900px)',
      pointerEvents: 'none',
      opacity: 0.6
    }
  }, ks.map((k, i) => /*#__PURE__*/React.createElement("polygon", {
    key: i,
    points: base.map(([x, y]) => `${50 + (x - 50) * k},${50 + (y - 50) * k}`).join(' '),
    fill: i === ks.length - 1 ? 'color-mix(in srgb, var(--accent-2) 7%, transparent)' : 'none',
    stroke: i === 0 ? 'color-mix(in srgb, var(--accent) 26%, transparent)' : 'color-mix(in srgb, var(--accent-2) 20%, transparent)',
    strokeWidth: i === 0 ? 0.5 : 0.35
  })));
}

/* Bandeau défilant — ticker éditorial */
function Marquee() {
  const items = ['SITE', 'IDENTITÉ', 'RÉSEAUX', 'GOOGLE', 'SEO LOCAL', 'LOGO', 'CONTENUS'];
  const seq = [...items, ...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface-sunken)',
      overflow: 'hidden',
      padding: '16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pcl-marquee",
    style: {
      display: 'inline-flex',
      whiteSpace: 'nowrap',
      alignItems: 'center',
      willChange: 'transform'
    }
  }, seq.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(26px,3.6vw,50px)',
      letterSpacing: '-0.02em',
      padding: '0 26px',
      color: i % 2 ? 'transparent' : 'var(--text)',
      WebkitTextStroke: i % 2 ? '1.4px var(--accent)' : '0'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      background: 'var(--accent-2)',
      clipPath: 'var(--clip-chevron-up)',
      flex: 'none'
    }
  })))));
}

/* Jauge d'ascension — chevron qui grimpe vers le sommet au scroll */
function AscensionRail() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    window.addEventListener('scroll', on, {
      passive: true
    });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "pcl-rail",
    style: {
      position: 'fixed',
      right: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '44vh',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: '0.12em',
      color: 'var(--accent)',
      marginBottom: 8
    }
  }, "SOMMET"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      width: 2,
      background: 'var(--border-strong)',
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: `${p * 100}%`,
      background: 'linear-gradient(to top, var(--accent-2), var(--accent))',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: `calc(${p * 100}% - 8px)`,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 16,
      height: 16,
      background: 'var(--accent)',
      clipPath: 'var(--clip-chevron-up)',
      filter: 'drop-shadow(0 0 6px color-mix(in srgb, var(--accent) 60%, transparent))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: '0.12em',
      color: 'var(--text-subtle)',
      marginTop: 8
    }
  }, "BASE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--accent)',
      marginTop: 6
    }
  }, Math.round(p * 100), "%"));
}
window.PCLMotifs = {
  HexRings,
  Marquee,
  AscensionRail
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeMotifs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeSections1.jsx
try { (() => {
/* PeakCL — Home refonte · part 1: helpers, Nav, 3 hero variants */

const DS = () => window.DesignSystem_596261;
function Icon({
  name,
  size = 20,
  color,
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      display: 'inline-flex',
      ...style
    }
  });
}
function useLucide() {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
}
const GOLD = 'var(--accent)';
const wrap = {
  maxWidth: 'var(--container)',
  margin: '0 auto'
};
const pad = {
  padding: 'var(--section-y) var(--gutter)'
};
const kicker = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: 'var(--accent-2)'
};
function Rating() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 14px',
      borderRadius: 999,
      border: '1px solid var(--border)',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD,
      fontSize: 14,
      letterSpacing: 1
    }
  }, "\u2605\u2605\u2605\u2605\u2605"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "5/5 Google \xB7 un seul interlocuteur"));
}
function ServicePills() {
  const items = ['Site & pages de vente', 'Identité & visuels', 'Réseaux & contenus'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, items.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-muted)',
      padding: '7px 13px',
      borderRadius: 999,
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 1,
      background: GOLD,
      transform: 'rotate(45deg)'
    }
  }), s)));
}
function HeroCtas({
  size = 'lg',
  center
}) {
  const {
    Button
  } = DS();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      justifyContent: center ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: size,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 18
    }),
    onClick: () => go('contact')
  }, "Remplir le brief \u2014 8 min"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: size,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 18
    }),
    onClick: () => go('method')
  }, "R\xE9server un appel"));
}
function ContactLine({
  center
}) {
  const items = [['phone', '07 43 51 76 27'], ['message-circle', 'WhatsApp'], ['mail', 'peakcl73@gmail.com']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      flexWrap: 'wrap',
      justifyContent: center ? 'center' : 'flex-start',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Ou"), items.map(([ic, t], i) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 13,
    color: "var(--accent-2)"
  }), t, i < items.length - 1 ? /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4,
      marginLeft: 8
    }
  }, "\xB7") : null)));
}
function Stats({
  center,
  boxed
}) {
  const stats = [['+20', 'projets livrés'], ['14 j', 'délai moyen'], ['5/5', 'notes Google']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: boxed ? 14 : 44,
      flexWrap: 'wrap',
      justifyContent: center ? 'center' : 'flex-start'
    }
  }, stats.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: boxed ? {
      padding: '16px 22px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface)'
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(28px,3vw,38px)',
      color: 'var(--text)',
      letterSpacing: '-0.02em'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-subtle)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginTop: 2
    }
  }, l))));
}
function go(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 76,
    behavior: 'smooth'
  });
}

/* ----------------------------------------------------------- NAV */
function Nav() {
  const {
    Button
  } = DS();
  const [scrolled, setScrolled] = React.useState(false);
  useLucide();
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links = [['Méthode', 'method'], ['Offres', 'offres'], ['Portfolio', 'portfolio'], ['Avis', 'avis'], ['FAQ', 'faq']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 60,
      padding: '13px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'color-mix(in srgb, var(--bg) 80%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      go('top');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/peakcl-logo-badge.png",
    alt: "PeakCL",
    style: {
      height: 38,
      width: 38,
      objectFit: 'cover',
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 21,
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--peak-yellow)'
    }
  }, "PEAK"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--peak-violet-bright)'
    }
  }, "CL"))), /*#__PURE__*/React.createElement("nav", {
    className: "pcl-navlinks",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 26
    }
  }, links.map(([l, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    onClick: e => {
      e.preventDefault();
      go(id);
    },
    style: {
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 15
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--text)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-muted)'
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => go('method')
  }, "R\xE9server un appel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => go('contact')
  }, "Remplir le brief")));
}

/* ------------------------------------------------- HERO 1 · SPLIT */
function HeroSplit() {
  useLucide();
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "peak-grid-bg",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(44px,6vw,88px) var(--gutter) clamp(56px,7vw,104px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-14%',
      left: '-6%',
      width: 560,
      height: 560,
      background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-26%',
      right: '-8%',
      width: 520,
      height: 520,
      background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-2) 18%, transparent), transparent 62%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "pcl-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(Rating, null)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(40px,5.6vw,82px)',
      lineHeight: 0.98,
      letterSpacing: '-0.03em',
      margin: '0 0 22px'
    }
  }, "Pas le temps pour ton site, tes r\xE9seaux, ton image\xA0?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD
    }
  }, "D\xE9l\xE8gue-moi toute ta com'.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-muted)',
      maxWidth: 520,
      lineHeight: 1.55,
      margin: '0 0 26px'
    }
  }, "On te juge en ligne avant de t'appeler. Je construis ton image compl\xE8te \u2014 site, identit\xE9, r\xE9seaux, Google \u2014 pour que tu paraisses aussi pro que tu l'es vraiment. Tu valides, je m'occupe du reste."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(ServicePills, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(HeroCtas, null)), /*#__PURE__*/React.createElement(ContactLine, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      minHeight: 460
    },
    className: "pcl-hero-visual"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '2% 4%',
      background: 'radial-gradient(circle at 52% 58%, color-mix(in srgb, var(--accent-2) 28%, transparent), transparent 64%)',
      filter: 'blur(8px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '2%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(88%, 430px)',
      aspectRatio: '1.05/1',
      clipPath: 'var(--clip-hex)',
      border: '1px solid var(--border)',
      background: 'color-mix(in srgb, var(--surface) 55%, transparent)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/charlotte-vector.svg",
    alt: "Charlotte \u2014 PeakCL",
    style: {
      position: 'relative',
      height: 'clamp(360px, 42vw, 540px)',
      width: 'auto',
      filter: 'drop-shadow(0 26px 52px rgba(0,0,0,0.45))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'max(0px, 2%)',
      top: '16%',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [['+20', 'projets'], ['14 j', 'délai moyen']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      padding: '12px 16px',
      background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
      backdropFilter: 'blur(8px)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      color: GOLD
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-subtle)'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 6,
      right: '6%',
      width: 40,
      height: 40,
      background: GOLD,
      clipPath: 'var(--clip-chevron-up)'
    }
  }))));
}

/* ------------------------------------------------ HERO 2 · CENTRE */
function HeroCentre({
  motifs
}) {
  useLucide();
  const HexRings = window.PCLMotifs && window.PCLMotifs.HexRings;
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "peak-grid-bg",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(52px,7vw,104px) var(--gutter) clamp(48px,6vw,88px)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-10%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 760,
      height: 520,
      background: 'radial-gradient(ellipse, color-mix(in srgb, var(--accent) 14%, transparent), transparent 62%)',
      pointerEvents: 'none'
    }
  }), motifs && HexRings ? /*#__PURE__*/React.createElement(HexRings, null) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'min(70vw, 680px)',
      aspectRatio: '1.15/1',
      clipPath: 'var(--clip-hex)',
      border: '1px solid var(--border)',
      opacity: 0.5
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      maxWidth: 1000
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement(Rating, null)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(44px,8vw,118px)',
      lineHeight: 0.92,
      letterSpacing: '-0.035em',
      margin: '0 0 24px'
    }
  }, "Ta com',", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD
    }
  }, "au sommet.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xl)',
      color: 'var(--text-muted)',
      maxWidth: 640,
      margin: '0 auto 30px',
      lineHeight: 1.5
    }
  }, "Pas le temps pour ton site, tes r\xE9seaux et ton image\xA0? D\xE9l\xE8gue tout \xE0 un seul interlocuteur. Tu valides, je m'occupe du reste."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(ServicePills, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement(HeroCtas, {
    center: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(76%, 480px)',
      aspectRatio: '1.1/1',
      clipPath: 'var(--clip-hex)',
      border: '1px solid var(--border)',
      background: 'color-mix(in srgb, var(--surface) 50%, transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '8%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(70%, 440px)',
      height: 240,
      background: 'radial-gradient(ellipse, color-mix(in srgb, var(--accent) 16%, transparent), transparent 64%)',
      filter: 'blur(6px)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/charlotte-vector.svg",
    alt: "Charlotte \u2014 PeakCL",
    style: {
      position: 'relative',
      height: 'clamp(300px, 36vw, 480px)',
      width: 'auto',
      filter: 'drop-shadow(0 26px 52px rgba(0,0,0,0.45))'
    }
  })), /*#__PURE__*/React.createElement(Stats, {
    center: true
  })));
}

/* --------------------------------------------- HERO 3 · EDITORIAL */
function HeroEditorial() {
  useLucide();
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: 'min(88vh, 820px)',
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "pcl-hero-bg",
    placeholder: "D\xE9pose une photo montagne / Savoie (plein cadre)",
    fit: "cover",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      borderRadius: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, color-mix(in srgb, var(--bg) 55%, transparent) 0%, color-mix(in srgb, var(--bg) 30%, transparent) 38%, var(--bg) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "peak-grid-bg",
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/charlotte-vector.svg",
    alt: "Charlotte \u2014 PeakCL",
    className: "pcl-hero-visual",
    style: {
      position: 'absolute',
      right: 'clamp(8px, 4vw, 90px)',
      bottom: 0,
      height: 'clamp(360px, 52vh, 640px)',
      width: 'auto',
      filter: 'drop-shadow(0 22px 44px rgba(0,0,0,0.5))',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'clamp(80px,12vw,140px)',
      right: 'var(--gutter)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Rating, null), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      background: GOLD,
      clipPath: 'var(--clip-chevron-up)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      width: '100%',
      padding: '0 var(--gutter) clamp(48px,6vw,80px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...kicker,
      marginBottom: 18
    }
  }, "\u25B2 Albertville \xB7 Savoie \xB7 partout en France"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(46px,9vw,130px)',
      lineHeight: 0.88,
      letterSpacing: '-0.04em',
      margin: '0 0 22px',
      maxWidth: 1100
    }
  }, "D\xE9l\xE8gue-moi", /*#__PURE__*/React.createElement("br", null), "toute ta ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD
    }
  }, "com'.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-muted)',
      maxWidth: 540,
      lineHeight: 1.55,
      margin: '0 0 28px'
    }
  }, "Site, identit\xE9, r\xE9seaux, Google : un seul interlocuteur pour une image en ligne coh\xE9rente, sans y passer tes soir\xE9es."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(HeroCtas, null)), /*#__PURE__*/React.createElement(Stats, null)));
}
function Hero({
  variant,
  motifs
}) {
  if (variant === 'centre') return /*#__PURE__*/React.createElement(HeroCentre, {
    motifs: motifs
  });
  if (variant === 'editorial') return /*#__PURE__*/React.createElement(HeroEditorial, null);
  return /*#__PURE__*/React.createElement(HeroSplit, null);
}
window.PCLHome1 = {
  Icon,
  useLucide,
  DS,
  wrap,
  pad,
  kicker,
  GOLD,
  go,
  Nav,
  Hero,
  Stats
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeSections1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeSections2.jsx
try { (() => {
/* PeakCL — Home refonte · part 2: Pains, Comparison, Méthode, Offres */
const {
  Icon,
  useLucide,
  DS,
  wrap,
  pad,
  kicker,
  GOLD,
  go
} = window.PCLHome1;
const h2 = {
  fontSize: 'clamp(30px,4.4vw,56px)',
  letterSpacing: '-0.03em',
  lineHeight: 1.04,
  margin: 0
};
function SectionHead({
  eyebrow,
  title,
  intro,
  center,
  max = 680
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-7)',
      textAlign: center ? 'center' : 'left',
      marginLeft: center ? 'auto' : 0,
      marginRight: center ? 'auto' : 0,
      maxWidth: center ? 820 : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...kicker,
      marginBottom: 14
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...h2,
      maxWidth: center ? 'none' : max,
      marginLeft: center ? 'auto' : 0,
      marginRight: center ? 'auto' : 0
    }
  }, title), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.6,
      maxWidth: 640,
      marginTop: 18,
      marginLeft: center ? 'auto' : 0,
      marginRight: center ? 'auto' : 0
    }
  }, intro));
}

/* --------------------------------------------------------- PAINS */
function Pains() {
  useLucide();
  const items = [['Tu repousses toujours « le site » et « les réseaux ».', "Pas par manque d'envie, par manque de temps. Et chaque mois, ton image en ligne reste en retard sur ton vrai niveau."], ['Tu perds des soirées sur des outils que tu détestes.', "Canva, WordPress, Instagram… ce n'est pas ton métier. Pendant ce temps, tu ne factures pas ce qui te rapporte vraiment."], ['Trop d\'interlocuteurs, zéro cohérence.', "Un pour le logo, un autre pour le site, personne pour les réseaux : le résultat ne raconte pas la même histoire. Et ça se voit."], ['Sans image en ligne, on te choisit moins.', "Tes clients comparent avant d'appeler. Si ton concurrent paraît plus pro sur Google, c'est lui qu'on contacte — même si tu es meilleur."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...pad,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Soyons honn\xEAtes",
    title: "Ton m\xE9tier m\xE9rite une image en ligne \xE0 la hauteur \u2014 sans y passer tes week-ends.",
    intro: "La plupart de mes clients ne veulent pas devenir community managers ni int\xE9grateurs web. Ils veulent une com' claire, coh\xE9rente, qui travaille pour eux. Et quelqu'un \xE0 qui d\xE9l\xE9guer tout \xE7a."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: 'var(--space-4)'
    }
  }, items.map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: 'var(--space-5)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 9,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'color-mix(in srgb, var(--danger) 14%, transparent)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18,
    color: "var(--danger)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.25,
      marginBottom: 8
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6
    }
  }, d))))));
}

/* ---------------------------------------------------- COMPARISON */
function Comparison() {
  const {
    Button
  } = DS();
  useLucide();
  const left = ['Site, réseaux et visuels repoussés « à plus tard »', 'Des heures perdues sur des outils hors de ton métier', 'Plusieurs prestataires, aucune ligne directrice commune', 'Une image en ligne qui ne reflète pas ton niveau réel'];
  const right = ['Un seul interlocuteur pour toute ta communication', 'Site, identité, réseaux et Google alignés sur le même message', 'Une image pro qui inspire confiance avant le premier appel', 'Tu retrouves du temps pour ton vrai travail'];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...pad,
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "La diff\xE9rence",
    title: "M\xEAme activit\xE9. Deux fa\xE7ons de g\xE9rer sa com'.",
    center: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
      gap: 'var(--space-5)',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border)',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: 'var(--text-subtle)',
      marginBottom: 20
    }
  }, "Tu g\xE8res tout seul"), left.map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18,
    color: "var(--text-subtle)",
    style: {
      marginTop: 2,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-base)'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      border: '1.5px solid color-mix(in srgb, var(--accent) 45%, transparent)',
      background: 'var(--surface)',
      boxShadow: 'var(--glow-yellow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 'var(--space-6)',
      right: 'var(--space-6)',
      height: 3,
      background: GOLD
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: GOLD,
      marginBottom: 20
    }
  }, "Tu d\xE9l\xE8gues \xE0 PeakCL"), right.map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "var(--accent-2)",
    style: {
      marginTop: 2,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text)',
      fontSize: 'var(--text-base)'
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go('contact')
  }, "Je veux d\xE9l\xE9guer"))))));
}

/* ------------------------------------------------------- MÉTHODE */
function Methode() {
  const {
    Button
  } = DS();
  useLucide();
  const steps = [['01', 'Diagnostic', "Tu remplis un formulaire de 8 minutes ou on en parle 20 minutes en visio. Je comprends ton activité, ton public, ton budget, tes contraintes."], ['02', 'Cadrage', "Je te renvoie un devis précis sous 48 h ouvrées (pas une fourchette élastique) et un planning. Tu valides ou tu ajustes."], ['03', 'Production', "Je code, je dessine, je rédige. Tu vois le travail au fur et à mesure, pas seulement à la fin. Une révision incluse à chaque livrable."], ['04', 'Suivi', "Une fois en ligne, je reste dispo pour les ajustements de la première semaine. Au-delà, on continue ou on s'arrête : tu décides."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "method",
    style: pad
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u25B2 Comment je travaille \xB7 4 paliers",
    title: "Du diagnostic \xE0 la mise en ligne, en quatre \xE9tapes claires"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 'var(--space-5)',
      marginBottom: 'var(--space-6)'
    }
  }, steps.map(([n, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: 'relative',
      paddingTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: i === 0 ? GOLD : 'var(--border-strong)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: i === 0 ? GOLD : 'var(--accent-2)',
      marginBottom: 14
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      marginBottom: 10
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6
    }
  }, d)))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    }),
    onClick: () => go('contact')
  }, "Faire le diagnostic")));
}

/* -------------------------------------------------------- OFFRES */
function Offres() {
  const {
    Button,
    Badge
  } = DS();
  useLucide();
  const packs = [{
    name: 'Pack présence en ligne',
    tag: 'Combo · à pousser',
    featured: true,
    icon: 'layers',
    items: ['Site + logo + pages réseaux sociaux', 'Premières publications pour présenter l\'activité', 'Intégration de ton réseau préféré au site', 'Mise en ligne + bases SEO + parcours de contact']
  }, {
    name: 'Site vitrine codé',
    tag: 'Site',
    icon: 'layout-template',
    items: ['Pages essentielles (accueil, services, à propos, contact)', 'Mobile, rapide, propre', 'Mise en ligne complète (domaine, SSL, indexation)', 'Bases SEO (structure, titres)']
  }, {
    name: 'Site sur-mesure',
    tag: 'Custom',
    icon: 'code-2',
    items: ['UX/UI poussé, pages & sections sur-mesure', 'Intégrations et fonctionnalités adaptées', 'Optimisations performance, structure, conversion']
  }, {
    name: 'Identité visuelle / logo',
    tag: 'Branding',
    icon: 'mountain',
    items: ['Logo propre et déclinable (web + réseaux)', 'Couleurs & typos cohérentes', 'Mini kit de départ pour une image homogène']
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "offres",
    style: {
      ...pad,
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Les formes que prend l'accompagnement",
    title: "Quatre formes, selon ton besoin",
    intro: "L'accompagnement reste le m\xEAme. Ce qui change, c'est ce qu'on produit ensemble."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))',
      gap: 'var(--space-5)'
    }
  }, packs.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: 'var(--surface)',
      border: p.featured ? '1.5px solid color-mix(in srgb, var(--accent) 45%, transparent)' : '1px solid var(--border)',
      boxShadow: p.featured ? 'var(--shadow-lg)' : 'none'
    }
  }, p.featured && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -11,
      left: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "solid"
  }, "\u2605 \xC0 pousser en priorit\xE9")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 21,
    color: p.featured ? GOLD : 'var(--accent-2)'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--text-subtle)'
    }
  }, p.tag)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-lg)',
      marginBottom: 4
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: GOLD,
      marginBottom: 18
    }
  }, "Sur devis"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      flex: 1
    }
  }, p.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "var(--accent-2)",
    style: {
      marginTop: 2,
      flex: 'none'
    }
  }), it))), /*#__PURE__*/React.createElement(Button, {
    variant: p.featured ? 'primary' : 'ghost',
    full: true,
    onClick: () => go('contact')
  }, "Discutons-en")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      marginTop: 'var(--space-6)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--border-strong)',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "repeat",
    size: 18,
    color: "var(--peak-violet-bright)"
  }), " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, "Option mensuelle"), " \u2014 rester visible sans y penser : publications, mises \xE0 jour, contenus, suivi l\xE9ger."))));
}
window.PCLHome2 = {
  SectionHead,
  h2,
  Pains,
  Comparison,
  Methode,
  Offres
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeSections2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeSections3.jsx
try { (() => {
/* PeakCL — Home refonte · part 3: Pour qui, Portfolio, Avis, Pourquoi moi, FAQ, CTA, Footer */
const {
  Icon,
  useLucide,
  DS,
  wrap,
  pad,
  kicker,
  GOLD,
  go
} = window.PCLHome1;
const {
  SectionHead
} = window.PCLHome2;

/* ------------------------------------------------------ POUR QUI */
function PourQui() {
  useLucide();
  return /*#__PURE__*/React.createElement("section", {
    style: pad
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "pcl-two"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Pour qui",
    title: "\xC0 qui \xE7a s'adresse"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      marginBottom: 18
    }
  }, "Mon accompagnement est pens\xE9 pour les ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, "ind\xE9pendants, artisans, cr\xE9ateurs et petites structures"), ". Concr\xE8tement : tu portes ton activit\xE9 seul\xB7e ou \xE0 quelques-uns, tu veux une pr\xE9sence en ligne propre sans embaucher une agence, et tu n'as pas le temps de g\xE9rer plusieurs prestataires."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      color: 'var(--text-subtle)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 18,
    color: "var(--text-subtle)",
    style: {
      marginTop: 2,
      flex: 'none'
    }
  }), "Je n'accompagne pas les grandes \xE9quipes marketing, les agences qui veulent sous-traiter, ni les projets sans budget d\xE9fini.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-3)'
    }
  }, [['briefcase', 'Indépendants'], ['hammer', 'Artisans'], ['palette', 'Créateurs'], ['store', 'Petites structures']].map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "var(--accent-2)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-base)',
      marginTop: 12
    }
  }, t))))));
}

/* ----------------------------------------------------- PORTFOLIO */
function Portfolio() {
  useLucide();
  const {
    Button
  } = DS();
  const projects = [['adelante', 'Adelante Voyages', 'Agence de voyage · France', '#1b3a3a'], ['alfonso', 'Cabinet Johanna Alfonso', 'Avocate · Grenoble', '#241036'], ['plumes', 'Plumes Poils & Compagnie', 'Ferme pédagogique · Savoie', '#33310a'], ['vieilleroue', 'La Vieille Roue', 'Artisan auto · Albertville', '#102a2a'], ['setic', 'SETIC Fluides', "Bureau d'études BTP · Savoie", '#22240f'], ['fiona', 'Fiona Espitallier Dick', 'Artiste comédie musicale', '#2a1530']];
  return /*#__PURE__*/React.createElement("section", {
    id: "portfolio",
    style: {
      ...pad,
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 18,
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "R\xE9alisations",
    title: "Des projets livr\xE9s, qui convertissent."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 18
    })
  }, "Voir tout le portfolio")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
      gap: 'var(--space-5)'
    }
  }, projects.map(([id, name, type, c]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: `linear-gradient(150deg, ${c}, var(--bg))`
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'pcl-proj-' + id,
    placeholder: 'Capture — ' + name,
    fit: "cover",
    style: {
      display: 'block',
      width: '100%',
      height: 190,
      borderRadius: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 30,
      height: 30,
      background: GOLD,
      clipPath: 'var(--clip-hex)',
      opacity: 0.92,
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-md)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent-2)',
      marginTop: 5,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, type)), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 18,
    color: "var(--text-subtle)"
  })))))));
}

/* ---------------------------------------------------------- AVIS */
function Avis() {
  const reviews = [["Un immense merci à Charlotte pour le travail exceptionnel réalisé sur le site d'Adelante Voyage. Toute l'équipe est ravie ! Elle a parfaitement su comprendre nos attentes et même les dépasser. Ultra disponible, à l'écoute et force de proposition.", 'Victor G.', 'Adelante Voyages · Avis Google'], ["Je ne peux que recommander Charlotte. Très professionnelle, elle a vite cerné mes besoins et proposé de supers versions. Elle m'a aussi proposé un logo bien plus dynamique et moderne. 100 % satisfaite !", 'Mathilde T.', 'Avis Google · mai 2026'], ["Cela faisait des mois que je repoussais la création de mon site. Le 1er jet m'a bluffée car je me suis entièrement reconnue. Très réactive sur les ajustements : mon site est opérationnel avant mon salon. Parfait !", 'Céline G.', 'Avis Google · mars 2026']];
  return /*#__PURE__*/React.createElement("section", {
    id: "avis",
    style: pad
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Ils en parlent mieux que moi",
    title: "Des r\xE9sultats, pas des promesses.",
    center: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))',
      gap: 'var(--space-5)'
    }
  }, reviews.map(([q, a, src]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: 'var(--surface)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: GOLD,
      fontSize: 16,
      letterSpacing: 2,
      marginBottom: 16
    }
  }, "\u2605\u2605\u2605\u2605\u2605"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.6,
      flex: 1,
      marginBottom: 20
    }
  }, "\xAB ", q, " \xBB"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      color: 'var(--text)'
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)',
      marginTop: 3
    }
  }, src, " \u2713")))))));
}

/* -------------------------------------------------- POURQUOI MOI */
function PourquoiMoi() {
  const {
    Button
  } = DS();
  useLucide();
  const values = [['target', 'Clarté avant tout', "On structure ton message pour que tes clients comprennent vite et passent à l'action."], ['zap', 'Simple et efficace', "On va à l'essentiel : un résultat en ligne, propre, et prêt à travailler pour toi."], ['layers', 'Cohérence partout', 'Logo, site, réseaux, Google : un ensemble aligné qui inspire confiance.'], ['clock', 'Tu gardes ton temps', "Tu me confies le sujet, je fais. Tu valides, on met en ligne, tu passes à autre chose."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...pad,
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: '0.95fr 1.05fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "pcl-two"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Pourquoi moi",
    title: "Une seule personne, trois expertises."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      marginBottom: 16
    }
  }, "Je code, je con\xE7ois tes visuels et, form\xE9e au community management, je g\xE8re tes r\xE9seaux. Pas besoin de briefer trois fois, de payer trois marges, ni d'arbitrer entre un dev qui ne pense pas design, un graphiste qui ne code pas et un CM qui ne conna\xEEt pas ton image."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      marginBottom: 26
    }
  }, "Tu travailles avec moi seule. Pas de sous-traitance cach\xE9e, pas de chef de projet entre nous. Tu m'\xE9cris, je te r\xE9ponds. Tu vois le travail avancer."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    }),
    onClick: () => go('contact')
  }, "Faire le diagnostic"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 38,
      display: 'flex',
      justifyContent: 'center'
    },
    className: "pcl-hero-visual"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      width: '72%',
      height: 200,
      background: 'radial-gradient(ellipse, color-mix(in srgb, var(--accent-2) 20%, transparent), transparent 64%)',
      filter: 'blur(6px)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/charlotte-vector.svg",
    alt: "Charlotte \u2014 PeakCL",
    style: {
      position: 'relative',
      height: 'clamp(280px, 30vw, 400px)',
      width: 'auto',
      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, values.map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--bg)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: GOLD
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-base)',
      marginTop: 14,
      marginBottom: 8
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.55
    }
  }, d))))));
}

/* ----------------------------------------------------------- FAQ */
function FAQ() {
  const [open, setOpen] = React.useState(0);
  const qs = [['Comment savoir quel type de présence en ligne est adapté à mon activité ?', "On part de ton activité (ce que tu fais, pour qui, où) et de l'action que tu veux obtenir (appel, devis, réservation…). Un bon site ne commence pas par la technique, mais par un message clair et un parcours simple vers la prise de contact."], ['Combien de temps faut-il pour créer un site et le mettre en ligne ?', "Ça dépend du périmètre (site seul vs site + logo + réseaux + Google). L'idée : avancer vite sans bâcler. On valide la structure et le ton, puis je produis. Le délai dépend aussi de ta disponibilité pour les infos de base."], ['Pourquoi un site si j\'ai déjà Instagram / Facebook ?', "Les réseaux sont utiles, mais tu ne les contrôles pas (algorithmes, restrictions, comptes). Ton site, c'est ta base : un endroit clair, avec une prise de contact simple. Et Google renvoie d'abord vers des pages web, pas vers tes posts."], ['Mon site sera-t-il référencé sur Google ?', "Oui : j'installe les fondations (structure, titres, performance, indexation). Ensuite la visibilité se construit dans le temps, surtout avec une fiche Google Business Profile et du contenu utile."], ['Mon site sera-t-il adapté aux smartphones ?', "Oui, 100 % responsive : le mobile est la norme, pas l'option."], ['Je n\'ai pas le temps de préparer le contenu. On fait comment ?', "C'est le cœur de mon approche : je te pose les bonnes questions, je structure, et je rédige/organise avec toi. Pas besoin d'arriver avec un dossier parfait — on part de ce que tu as."], ["L'IA peut faire un site. Pourquoi passer par toi ?", "L'IA peut aider. Mais un site utile, c'est aussi des choix : structure, message, confiance, mise en ligne, Google, cohérence visuelle. Mon rôle : prendre le temps, simplifier, et livrer une présence propre sans t'épuiser."], ['Travailles-tu uniquement en Savoie / Albertville ?', "Basée à Albertville, j'accompagne des clients partout en France (visio, téléphone, email). Rencontre possible en Savoie."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: pad
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Questions fr\xE9quentes",
    title: "On l\xE8ve les derniers doutes.",
    center: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, qs.map(([q, a], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      padding: '20px 4px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-md)',
      color: 'var(--text)'
    }
  }, q), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 28,
      height: 28,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: open === i ? GOLD : 'var(--surface-raised)',
      color: open === i ? 'var(--on-accent)' : 'var(--text-muted)',
      fontSize: 18,
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, open === i ? '−' : '+')), open === i && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.65,
      padding: '0 4px 22px',
      maxWidth: 680
    }
  }, a))))));
}

/* ----------------------------------------------------- FINAL CTA */
function FinalCTA() {
  const {
    Button,
    Input,
    Alert
  } = DS();
  const [sent, setSent] = React.useState(false);
  useLucide();
  const reassure = ['Réponse sous 24 h', 'Sans engagement', 'Recommandations actionnables', 'Clarté sur les prochaines étapes'];
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "peak-grid-bg",
    style: {
      ...pad,
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-30%',
      right: '-10%',
      width: 560,
      height: 560,
      background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent), transparent 62%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "pcl-two"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...kicker,
      marginBottom: 14
    }
  }, "Audit gratuit : ton site + tes r\xE9seaux"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(32px,4.6vw,58px)',
      letterSpacing: '-0.03em',
      lineHeight: 1.02,
      margin: '0 0 18px'
    }
  }, "Pr\xEAt \xE0 arr\xEAter de tout faire toi-m\xEAme\xA0?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.6,
      maxWidth: 460,
      marginBottom: 26
    }
  }, "D\xE9cris ton activit\xE9 en 8 minutes : je te dis ce qu'il faut pour une image en ligne coh\xE9rente (site, identit\xE9, r\xE9seaux), et comment je peux m'en charger pour toi."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, reassure.map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'center',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2",
    size: 17,
    color: "var(--accent-2)"
  }), r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, sent ? /*#__PURE__*/React.createElement(Alert, {
    tone: "success",
    title: "Brief re\xE7u, merci !"
  }, "Je reviens vers toi sous 24 h pour d\xE9marrer l'ascension.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nom",
    required: true,
    placeholder: "Camille Dupont"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    required: true,
    type: "email",
    placeholder: "camille@exemple.fr"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Ton projet en deux mots",
    placeholder: "Ex : refonte du site + visibilit\xE9 locale"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    full: true,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 18
    })
  }, "Recevoir mon plan"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 14,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "ou"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--accent-2)'
    }
  }, "r\xE9server une visio \u2192"))))));
}

/* -------------------------------------------------------- FOOTER */
function Footer() {
  const clients = ['Adelante Voyages', 'Cabinet J. Alfonso', 'Plumes Poils & Cie', 'La Vieille Roue', 'SETIC Fluides', 'Sky View', 'Peak Training', 'Natural Riders', 'Mordant Équin', 'C\'mieux comme ça'];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: 'var(--space-8) var(--gutter) var(--space-6)',
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...kicker,
      marginBottom: 18
    }
  }, "Ils m'ont fait confiance \xB7 21 projets livr\xE9s"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-7)',
      paddingBottom: 'var(--space-6)',
      borderBottom: '1px solid var(--border)'
    }
  }, clients.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 17,
      color: 'var(--ink-300)',
      letterSpacing: '-0.01em'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/peakcl-logo-badge.png",
    alt: "PeakCL",
    style: {
      height: 36,
      width: 36,
      objectFit: 'cover',
      borderRadius: 8
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--peak-yellow)'
    }
  }, "PEAK"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--peak-violet-bright)'
    }
  }, "CL"))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-subtle)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6
    }
  }, "Charlotte Lacroix \u2014 communication en ligne pour ind\xE9pendants, artisans & petites structures. Albertville \xB7 Savoie \xB7 partout en France.")), [['Naviguer', ['Méthode', 'Offres', 'Portfolio', 'Avis', 'FAQ']], ['Contact', ['07 43 51 76 27', 'WhatsApp', 'peakcl73@gmail.com', 'Réserver un appel']]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...kicker,
      marginBottom: 16
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 'var(--space-7)',
      paddingTop: 'var(--space-5)',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "\xA9 2026 PeakCL \xB7 Charlotte Lacroix"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "\u25B2 Ta com', au sommet"))));
}
window.PCLHome3 = {
  PourQui,
  Portfolio,
  Avis,
  PourquoiMoi,
  FAQ,
  FinalCTA,
  Footer
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeSections3.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections1.jsx
try { (() => {
/* PeakCL — marketing site sections (part 1: Nav, Hero, Trust, Services) */

function Icon({
  name,
  size = 20,
  color
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      display: 'inline-flex'
    }
  });
}
function useLucide(dep) {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
}
function Logo({
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/peakcl-logo-badge.png",
    alt: "PeakCL",
    style: {
      height: 40,
      width: 40,
      objectFit: 'cover',
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--peak-yellow)'
    }
  }, "PEAK"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--peak-violet-bright)'
    }
  }, "CL")));
}
function Nav({
  onNav,
  onContact
}) {
  const {
    Button
  } = window.DesignSystem_596261;
  const [scrolled, setScrolled] = React.useState(false);
  useLucide();
  React.useEffect(() => {
    const el = document.querySelector('[data-scroll-root]') || window;
    const get = () => el === window ? window.scrollY : el.scrollTop;
    const on = () => setScrolled(get() > 20);
    el.addEventListener('scroll', on);
    return () => el.removeEventListener('scroll', on);
  }, []);
  const links = [['Méthode', 'method'], ['Services', 'services'], ['Réalisations', 'work'], ['À propos', 'about']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '14px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(20,22,27,0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    onClick: e => {
      e.preventDefault();
      onNav('top');
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    },
    className: "pcl-navlinks"
  }, links.map(([label, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    onClick: e => {
      e.preventDefault();
      onNav(id);
    },
    style: {
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 15
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--text)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-muted)'
  }, label))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onContact
  }, "Prendre rendez-vous"));
}
function Hero({
  onContact,
  onNav
}) {
  const {
    Button
  } = window.DesignSystem_596261;
  useLucide();
  const stats = [['+120', 'projets au sommet'], ['x3', 'visibilité moyenne'], ['24 h', 'délai de réponse']];
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "peak-grid-bg",
    style: {
      position: 'relative',
      padding: 'clamp(56px,9vw,120px) var(--gutter) var(--space-9)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-12%',
      right: '-6%',
      width: 540,
      height: 540,
      background: 'radial-gradient(circle, rgba(233,222,31,0.16), transparent 62%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-20%',
      left: '-8%',
      width: 480,
      height: 480,
      background: 'radial-gradient(circle, rgba(25,189,189,0.16), transparent 62%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1.15fr 0.85fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "pcl-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "peak-kicker",
    style: {
      marginBottom: 20
    }
  }, "\u25B2 Agence de communication \xB7 Ind\xE9pendants, TPE & PME"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(40px,6vw,70px)',
      lineHeight: 1.02,
      marginBottom: 22
    }
  }, "Votre communication,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--peak-yellow)'
    }
  }, "au sommet.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-muted)',
      maxWidth: 520,
      marginBottom: 32,
      lineHeight: 1.55
    }
  }, "On vous accompagne dans votre ascension : visibilit\xE9, image de marque et pr\xE9sence en ligne. Un interlocuteur unique, du brief au sommet."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onContact
  }, "D\xE9marrons l'ascension"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 18
    }),
    onClick: () => onNav('work')
  }, "Voir nos r\xE9alisations")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      flexWrap: 'wrap'
    }
  }, stats.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 32,
      color: 'var(--text)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center'
    },
    className: "pcl-hero-visual"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '8% 14%',
      background: 'radial-gradient(circle, rgba(166,24,204,0.22), transparent 65%)',
      filter: 'blur(8px)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/peakcl-logo-badge.png",
    alt: "PeakCL",
    style: {
      position: 'relative',
      width: '88%',
      maxWidth: 380,
      borderRadius: 20,
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-xl)'
    }
  }))));
}
function Trust() {
  const clients = ['Atelier Belmont', 'Café du Sommet', 'Kova Studio', 'Verde & Co', 'Maison Rives', 'Nord Optique'];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-7) var(--gutter)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-7)',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "peak-kicker",
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Ils gravissent avec nous"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      flexWrap: 'wrap',
      flex: 1,
      justifyContent: 'space-around'
    }
  }, clients.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--ink-300)',
      letterSpacing: '-0.01em'
    }
  }, c)))));
}
function Services({
  onContact
}) {
  const {
    Card
  } = window.DesignSystem_596261;
  useLucide();
  const items = [['eye', 'Visibilité Google', 'Être trouvé par vos clients. Référencement local, fiche Google, contenus qui vous placent en tête.'], ['layout-template', 'Site web', 'Un site rapide, clair et qui convertit. Conçu sur-mesure, sans usine à gaz.'], ['mountain', 'Identité de marque', 'Logo, charte, ton de voix. Une image cohérente qui inspire confiance.'], ['share-2', 'Réseaux sociaux', 'Une présence régulière et maîtrisée, là où vos clients passent leur temps.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "peak-kicker",
    style: {
      marginBottom: 14
    }
  }, "Nos services"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(30px,4vw,46px)',
      marginBottom: 16,
      maxWidth: 640
    }
  }, "Tout ce qu'il faut pour gagner en altitude"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      maxWidth: 560,
      marginBottom: 'var(--space-7)'
    }
  }, "On assemble les bons leviers selon votre cap. Pas de pack tout fait : un plan d'ascension adapt\xE9 \xE0 votre structure."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
      gap: 'var(--space-5)'
    }
  }, items.map(([ic, t, d], i) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true,
    variant: i === 0 ? 'accent' : 'default',
    onClick: onContact
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 11,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "var(--peak-turquoise)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      marginBottom: 8
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.6
    }
  }, d))))));
}
window.PeakSite1 = {
  Icon,
  useLucide,
  Logo,
  Nav,
  Hero,
  Trust,
  Services
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections2.jsx
try { (() => {
/* PeakCL — marketing site sections (part 2: Method, Work, Quote, Contact, Footer) */
const {
  Icon,
  useLucide
} = window.PeakSite1;
function Method() {
  const steps = [['01', 'On trace la voie', 'Audit, écoute, et définition du cap. On part de votre réalité, pas d\'un modèle générique.'], ['02', 'On prépare la cordée', 'Stratégie, maquettes et plan d\'action validés ensemble. Vous savez où on va.'], ['03', 'On gravit', 'Production : site, contenus, identité, campagnes. Un interlocuteur unique tout du long.'], ['04', 'On atteint le sommet', 'Mise en ligne, mesure des résultats et accompagnement dans la durée.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "method",
    style: {
      padding: 'var(--section-y) var(--gutter)',
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "peak-kicker",
    style: {
      marginBottom: 14
    }
  }, "\u25B2 La m\xE9thode PeakCL \xB7 4 paliers"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(30px,4vw,46px)',
      marginBottom: 'var(--space-7)',
      maxWidth: 620
    }
  }, "Une ascension claire, \xE9tape par \xE9tape"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 'var(--space-5)'
    }
  }, steps.map(([n, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: 'relative',
      paddingTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: i === 0 ? 'var(--peak-yellow)' : 'var(--border-strong)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: i === 0 ? 'var(--peak-yellow)' : 'var(--accent-2)',
      marginBottom: 14
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-lg)',
      marginBottom: 10
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6
    }
  }, d))))));
}
function Work() {
  const {
    Tabs,
    Tag
  } = window.DesignSystem_596261;
  const [filter, setFilter] = React.useState('all');
  const projects = [['Café du Sommet', 'Site web', 'web', ['#1b3a3a', '#19BDBD']], ['Atelier Belmont', 'Identité', 'brand', ['#2a1530', '#A618CC']], ['Nord Optique', 'Visibilité Google', 'seo', ['#33310a', '#E9DE1F']], ['Kova Studio', 'Site web', 'web', ['#102a2a', '#3FD8D8']], ['Verde & Co', 'Réseaux sociaux', 'social', ['#22240f', '#C9BE10']], ['Maison Rives', 'Identité', 'brand', ['#241036', '#C53BE8']]];
  const tabs = [{
    value: 'all',
    label: 'Tout'
  }, {
    value: 'web',
    label: 'Sites web'
  }, {
    value: 'brand',
    label: 'Identité'
  }, {
    value: 'seo',
    label: 'Visibilité'
  }, {
    value: 'social',
    label: 'Réseaux'
  }];
  const shown = filter === 'all' ? projects : projects.filter(p => p[2] === filter);
  return /*#__PURE__*/React.createElement("section", {
    id: "work",
    style: {
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 20,
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "peak-kicker",
    style: {
      marginBottom: 14
    }
  }, "R\xE9alisations"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(30px,4vw,46px)',
      maxWidth: 520
    }
  }, "Des sommets atteints avec nos clients")), /*#__PURE__*/React.createElement(Tabs, {
    items: tabs,
    value: filter,
    onChange: setFilter
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
      gap: 'var(--space-5)'
    }
  }, shown.map(([name, type, _, [c1, c2]]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      cursor: 'pointer',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "peak-grid-bg",
    style: {
      height: 168,
      background: `linear-gradient(150deg, ${c1}, var(--ink-850))`,
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 34,
      height: 34,
      background: c2,
      clipPath: 'var(--clip-hex)',
      opacity: 0.9
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-lg)'
    }
  }, name), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 18,
    color: "var(--text-subtle)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--accent-2)',
      marginTop: 6,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, type)))))));
}
function Quote() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: 'var(--section-y) var(--gutter)',
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      margin: '0 auto var(--space-5)',
      background: 'var(--peak-yellow)',
      clipPath: 'var(--clip-chevron-up)'
    }
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(24px,3.4vw,38px)',
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
      margin: 0,
      color: 'var(--text)'
    }
  }, "\xAB On ne s'est jamais sentis aussi bien accompagn\xE9s. PeakCL parle clair, livre vite, et nous a vraiment fait gagner en visibilit\xE9. \xBB"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-base)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, "L\xE9a Moreau"), " \u2014 Fondatrice, Caf\xE9 du Sommet")));
}
function Contact({
  submitted,
  onSubmit
}) {
  const {
    Input,
    Select,
    Button,
    Switch,
    Alert
  } = window.DesignSystem_596261;
  useLucide();
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "pcl-contact-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "peak-kicker",
    style: {
      marginBottom: 14
    }
  }, "Parlons de votre projet"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(30px,4vw,48px)',
      marginBottom: 18
    }
  }, "Pr\xEAt \xE0 atteindre votre sommet\xA0?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.6,
      marginBottom: 'var(--space-6)',
      maxWidth: 460
    }
  }, "Un premier \xE9change gratuit de 30 minutes pour comprendre votre besoin et tracer la voie. On revient vers vous sous 24 h."), [['phone', 'Un interlocuteur unique, du brief au sommet'], ['clock', 'Réponse sous 24 h ouvrées'], ['map-pin', 'À distance ou sur site']].map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18,
    color: "var(--peak-yellow)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-base)'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, submitted ? /*#__PURE__*/React.createElement(Alert, {
    tone: "success",
    title: "Brief re\xE7u, merci !"
  }, "On revient vers vous sous 24 h pour d\xE9marrer l'ascension.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Pr\xE9nom & nom",
    required: true,
    placeholder: "Camille Dupont"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    required: true,
    type: "email",
    placeholder: "camille@exemple.fr"
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Votre besoin",
    placeholder: "Choisir\u2026",
    options: ['Visibilité Google', 'Site web', 'Identité de marque', 'Réseaux sociaux', 'Je ne sais pas encore']
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Votre projet en deux mots",
    placeholder: "Ex : refonte du site + r\xE9f\xE9rencement local"
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "M'envoyer la newsletter mensuelle (conseils visibilit\xE9)",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    full: true
  }, "Envoyer mon brief")))));
}
function Footer({
  onNav
}) {
  const {
    Logo
  } = window.PeakSite1;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: 'var(--space-8) var(--gutter) var(--space-6)',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-deep)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-7)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-subtle)',
      fontSize: 'var(--text-sm)',
      marginTop: 16,
      lineHeight: 1.6
    }
  }, "Agence de communication pour ind\xE9pendants, TPE et PME. On vous accompagne au sommet.")), [['Services', ['Visibilité Google', 'Site web', 'Identité de marque', 'Réseaux sociaux']], ['Agence', ['Méthode', 'Réalisations', 'À propos', 'Contact']]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    className: "peak-kicker",
    style: {
      marginBottom: 16
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 'var(--space-5)',
      borderTop: '1px solid var(--border)',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "\xA9 2026 PeakCL \u2014 Tous droits r\xE9serv\xE9s"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "\u25B2 Visibilit\xE9 au sommet"))));
}
window.PeakSite2 = {
  Method,
  Work,
  Quote,
  Contact,
  Footer
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

})();
