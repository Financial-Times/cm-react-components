module.exports["cm-react-components"] = (() => {
  "use strict";
  var o = {
    829: () => {
      const o = require("react"), e = require("prop-types");
      var c = "o-buttons", t = "".concat(c, "--"), n = "".concat(c, "-icon"), r = "".concat(n, "--"),
        a = (0, o.forwardRef)((function (e, a) {
          var i = e.id, s = e.children, l = e.disabled, d = e.onClick, b = e.selected, p = e.className, u = e.primary,
            m = e.secondary, y = e.inverse, f = e.big, g = e.mono, v = e.b2c, x = e.icon, N = e.title, k = c;
          return u && (k += " ".concat(t, "primary")), m && (k += " ".concat(t, "secondary")), y && (k += " ".concat(t, "inverse")), f && (k += " ".concat(t, "big")), g && (k += " ".concat(t, "mono")), v && (k += " ".concat(t, "b2c")), x && (k += " ".concat(n, " ").concat(r).concat(x, " "), s || (k += " ".concat(r, "icon-only"))), p && (k += " ".concat(p)), o.createElement("button", {
            id: i,
            ref: a,
            "data-testid": i,
            className: k,
            disabled: l,
            onClick: d,
            title: N,
            "aria-selected": b
          }, s)
        }));
      a.displayName = "Button", a.propTypes = {
        id: e.oneOfType([e.number, e.string]),
        children: e.node,
        disabled: e.bool,
        onClick: e.func,
        selected: e.bool,
        className: e.string,
        primary: e.bool,
        secondary: e.bool,
        inverse: e.bool,
        big: e.bool,
        mono: e.bool,
        b2c: e.bool,
        icon: e.string,
        title: e.string
      }
    }
  }, e = {};
  return function c(t) {
    if (e[t]) return e[t].exports;
    var n = e[t] = { exports: {} };
    return o[t](n, n.exports, c), n.exports
  }(829)
})().default;
