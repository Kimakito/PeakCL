/* Chargeur PeakCL : essaie _ds_bundle.js (généré quand le projet est marqué Design System),
   sinon compile les composants core/ à la volée avec Babel. Expose window.__dsReady (Promise<NS>). */
(function () {
  var base = window.__dsBase || './';
  var FILES = ['Button','IconButton','Badge','Tag','Card','Input','Select','Checkbox','Radio','Switch','Tabs','Alert'];
  function findNS() {
    var keys = Object.keys(window);
    for (var i = 0; i < keys.length; i++) {
      if (!/^(DesignSystem_|PeakCL)/.test(keys[i])) continue;
      try {
        var v = window[keys[i]];
        if (v && v.Button && v.Badge && v.Card) return v;
      } catch (e) { /* frame cross-origin — ignorer */ }
    }
    return null;
  }
  window.__dsReady = new Promise(function (resolve) {
    var s = document.createElement('script');
    s.src = base + '_ds_bundle.js';
    s.onload = done; s.onerror = done;
    document.head.appendChild(s);
    function done() {
      var ns = findNS();
      if (ns) return resolve(ns);
      fallback().then(resolve);
    }
  });
  function fallback() {
    var NSOUT = {};
    var chain = Promise.resolve();
    FILES.forEach(function (f) {
      chain = chain.then(function () {
        return fetch(base + 'components/core/' + f + '.jsx').then(function (r) { return r.text(); });
      }).then(function (src) {
        src = src.replace(/^import\s+React.*$/gm, '');
        src = src.replace(/^import\s*\{\s*(\w+)\s*\}\s*from\s*['"][^'"]+['"];?/gm, 'var $1 = NSOUT.$1;');
        src = src.replace(/^export\s+function\s+(\w+)/m, 'NSOUT.$1 = function $1');
        var code = Babel.transform('(function(React,NSOUT){\n' + src + '\n})', { presets: ['react'] }).code;
        (0, eval)(code)(window.React, NSOUT);
      });
    });
    return chain.then(function () { window.PeakCL = NSOUT; return NSOUT; });
  }
})();
