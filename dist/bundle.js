window.__MODULE_DEFAULT_EXPORT__ = (() => {
  "use strict";
  var o = {
    513: () => {
      const o = require("react"), c = require("prop-types");
      var n = "o-buttons", e = "".concat(n, "--"), t = "".concat(n, "-icon"), a = "".concat(t, "--"),
        r = (0, o.forwardRef)((function (c, r) {
          var i = c.id, s = c.children, l = c.disabled, d = c.onClick, b = c.selected, m = c.className, p = c.primary,
            u = c.secondary, y = c.inverse, f = c.big, g = c.mono, v = c.b2c, N = c.icon, k = c.title, C = n;
          return p && (C += " ".concat(e, "primary")), u && (C += " ".concat(e, "secondary")), y && (C += " ".concat(e, "inverse")), f && (C += " ".concat(e, "big")), g && (C += " ".concat(e, "mono")), v && (C += " ".concat(e, "b2c")), N && (C += " ".concat(t, " ").concat(a).concat(N, " "), s || (C += " ".concat(a, "icon-only"))), m && (C += " ".concat(m)), o.createElement("button", {
            id: i,
            ref: r,
            "data-testid": i,
            className: C,
            disabled: l,
            onClick: d,
            title: k,
            "aria-selected": b
          }, s)
        }));
      r.displayName = "Button", r.propTypes = {
        id: c.oneOfType([c.number, c.string]),
        children: c.node,
        disabled: c.bool,
        onClick: c.func,
        selected: c.bool,
        className: c.string,
        primary: c.bool,
        secondary: c.bool,
        inverse: c.bool,
        big: c.bool,
        mono: c.bool,
        b2c: c.bool,
        icon: c.string,
        title: c.string
      };
      var i = "o-buttons", s = "".concat(i, "--"), l = "".concat(i, "-icon"), d = "".concat(l, "--"),
        b = (0, o.forwardRef)((function (c, n) {
          var e = c.id, t = c.children, a = c.disabled, r = c.onClick, b = c.selected, m = c.className, p = c.primary,
            u = c.secondary, y = c.inverse, f = c.big, g = c.mono, v = c.b2c, N = c.icon, k = c.title, C = i;
          return p && (C += " ".concat(s, "primary")), u && (C += " ".concat(s, "secondary")), y && (C += " ".concat(s, "inverse")), f && (C += " ".concat(s, "big")), g && (C += " ".concat(s, "mono")), v && (C += " ".concat(s, "b2c")), N && (C += " ".concat(l, " ").concat(d).concat(N, " "), t || (C += " ".concat(d, "icon-only"))), m && (C += " ".concat(m)), o.createElement("button", {
            id: e,
            ref: n,
            "data-testid": e,
            className: C,
            disabled: a,
            onClick: r,
            title: k,
            "aria-selected": b
          }, t)
        }));
      b.displayName = "AnotherButton", b.propTypes = {
        id: c.oneOfType([c.number, c.string]),
        children: c.node,
        disabled: c.bool,
        onClick: c.func,
        selected: c.bool,
        className: c.string,
        primary: c.bool,
        secondary: c.bool,
        inverse: c.bool,
        big: c.bool,
        mono: c.bool,
        b2c: c.bool,
        icon: c.string,
        title: c.string
      }
    }
  }, c = {};
  return function n(e) {
    if (c[e]) return c[e].exports;
    var t = c[e] = { exports: {} };
    return o[e](t, t.exports, n), t.exports
  }(513)
})().default;
