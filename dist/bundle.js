window.__MODULE_DEFAULT_EXPORT__ = (() => {
  "use strict";
  var o = {
    513: (o, e, n) => {
      n.r(e), n.d(e, { AnotherButton: () => u, Button: () => s });
      const t = require("react"), c = require("prop-types");
      var r = "o-buttons", a = "".concat(r, "--"), i = "".concat(r, "-icon"), l = "".concat(i, "--"),
        s = (0, t.forwardRef)((function (o, e) {
          var n = o.id, c = o.children, s = o.disabled, d = o.onClick, b = o.selected, p = o.className, y = o.primary,
            u = o.secondary, m = o.inverse, f = o.big, g = o.mono, v = o.b2c, O = o.icon, N = o.title, T = r;
          return y && (T += " ".concat(a, "primary")), u && (T += " ".concat(a, "secondary")), m && (T += " ".concat(a, "inverse")), f && (T += " ".concat(a, "big")), g && (T += " ".concat(a, "mono")), v && (T += " ".concat(a, "b2c")), O && (T += " ".concat(i, " ").concat(l).concat(O, " "), c || (T += " ".concat(l, "icon-only"))), p && (T += " ".concat(p)), t.createElement("button", {
            id: n,
            ref: e,
            "data-testid": n,
            className: T,
            disabled: s,
            onClick: d,
            title: N,
            "aria-selected": b
          }, c)
        }));
      s.displayName = "Button", s.propTypes = {
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
      var d = "o-buttons", b = "".concat(d, "--"), p = "".concat(d, "-icon"), y = "".concat(p, "--"),
        u = (0, t.forwardRef)((function (o, e) {
          var n = o.id, c = o.children, r = o.disabled, a = o.onClick, i = o.selected, l = o.className, s = o.primary,
            u = o.secondary, m = o.inverse, f = o.big, g = o.mono, v = o.b2c, O = o.icon, N = o.title, T = d;
          return s && (T += " ".concat(b, "primary")), u && (T += " ".concat(b, "secondary")), m && (T += " ".concat(b, "inverse")), f && (T += " ".concat(b, "big")), g && (T += " ".concat(b, "mono")), v && (T += " ".concat(b, "b2c")), O && (T += " ".concat(p, " ").concat(y).concat(O, " "), c || (T += " ".concat(y, "icon-only"))), l && (T += " ".concat(l)), t.createElement("button", {
            id: n,
            ref: e,
            "data-testid": n,
            className: T,
            disabled: r,
            onClick: a,
            title: N,
            "aria-selected": i
          }, c)
        }));
      u.displayName = "AnotherButton", u.propTypes = {
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
  }, e = {};

  function n(t) {
    if (e[t]) return e[t].exports;
    var c = e[t] = { exports: {} };
    return o[t](c, c.exports, n), c.exports
  }

  return n.d = (o, e) => {
    for (var t in e) n.o(e, t) && !n.o(o, t) && Object.defineProperty(o, t, { enumerable: !0, get: e[t] })
  }, n.o = (o, e) => Object.prototype.hasOwnProperty.call(o, e), n.r = o => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(o, "__esModule", { value: !0 })
  }, n(513)
})();
