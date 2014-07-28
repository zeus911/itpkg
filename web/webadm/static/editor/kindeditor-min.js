/* KindEditor 4.0 beta (2011-08-17), Copyright (C) kindsoft.net, Licence: http://www.kindsoft.net/license.php */
(function(A, m) {
    function ca(a) {
        if (!a)return!1;
        return Object.prototype.toString.call(a) === "[object Array]"
    }

    function Ua(a) {
        if (!a)return!1;
        return Object.prototype.toString.call(a) === "[object Function]"
    }

    function I(a, b) {
        for (var c = 0,d = b.length; c < d; c++)if (a === b[c])return c;
        return-1
    }

    function k(a, b) {
        if (ca(a))for (var c = 0,d = a.length; c < d; c++) {
            if (b.call(a[c], c, a[c]) === !1)break
        } else for (c in a)if (a.hasOwnProperty(c) && b.call(a[c], c, a[c]) === !1)break
    }

    function B(a) {
        return a.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,
            "")
    }

    function la(a, b, c) {
        c = c === m ? "," : c;
        return(c + b + c).indexOf(c + a + c) >= 0
    }

    function s(a) {
        return a && /^\d+$/.test(a) ? a + "px" : a
    }

    function w(a) {
        var b;
        return a && (b = /(\d+)/.exec(a)) ? parseInt(b[1], 10) : 0
    }

    function Va(a) {
        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }

    function da(a) {
        var b = a.split("-"),a = "";
        k(b, function(b, d) {
            a += b > 0 ? d.charAt(0).toUpperCase() + d.substr(1) : d
        });
        return a
    }

    function ma(a) {
        function b(a) {
            a = parseInt(a, 10).toString(16).toUpperCase();
            return a.length >
                1 ? a : "0" + a
        }

        return a.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/ig, function(a, d, e, g) {
            return"#" + b(d) + b(e) + b(g)
        })
    }

    function v(a, b) {
        var b = b === m ? "," : b,c = {},d = ca(a) ? a : a.split(b),e;
        k(d, function(a, b) {
            if (e = /^(\d+)\.\.(\d+)$/.exec(b))for (var d = parseInt(e[1], 10); d <= parseInt(e[2], 10); d++)c[d.toString()] = !0; else c[b] = !0
        });
        return c
    }

    function Aa(a, b) {
        return Array.prototype.slice.call(a, b || 0)
    }

    function o(a, b) {
        return a === m ? b : a
    }

    function C(a, b, c) {
        c || (c = b,b = null);
        var d;
        if (b) {
            var e = function() {
            };
            e.prototype = b.prototype;
            d = new e;
            k(c, function(a, b) {
                d[a] = b
            })
        } else d = c;
        d.constructor = a;
        a.prototype = d;
        a.parent = b ? b.prototype : null
    }

    function Wa(a) {
        var b;
        if (b = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(a))a = b[0];
        b = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        b.lastIndex = 0;
        b.test(a) && (a = a.replace(b, function(a) {
            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return eval("(" + a + ")");
        throw"JSON parse error";
    }

    function Hb(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, Xa) : a.attachEvent && a.attachEvent("on" + b, c)
    }

    function na(a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, Xa) : a.detachEvent && a.detachEvent("on" + b, c)
    }

    function Ya(a, b) {
        this.init(a, b)
    }

    function Za(a) {
        try {
            delete a[W]
        } catch(b) {
            a.removeAttribute && a.removeAttribute(W)
        }
    }

    function X(a, b, c) {
        if (b.indexOf(",") >= 0)k(b.split(","), function() {
            X(a, this, c)
        }); else {
            var d =
                a[W] || null;
            d || (a[W] = ++$a,d = $a);
            t[d] === m && (t[d] = {});
            var e = t[d][b];
            e && e.length > 0 ? na(a, b, e[0]) : (t[d][b] = [],t[d].el = a);
            e = t[d][b];
            e.length === 0 && (e[0] = function(b) {
                var c = b ? new Ya(a, b) : m;
                k(e, function(b, d) {
                    b > 0 && d && d.call(a, c)
                })
            });
            I(c, e) < 0 && e.push(c);
            Hb(a, b, e[0])
        }
    }

    function M(a, b, c) {
        if (b && b.indexOf(",") >= 0)k(b.split(","), function() {
            M(a, this, c)
        }); else {
            var d = a[W] || null;
            if (d)if (b === m)d in t && (k(t[d], function(b, c) {
                b != "el" && c.length > 0 && na(a, b, c[0])
            }),delete t[d],Za(a)); else if (t[d]) {
                var e = t[d][b];
                if (e && e.length >
                    0) {
                    c === m ? (na(a, b, e[0]),delete t[d][b]) : (k(e, function(a, b) {
                        a > 0 && b === c && e.splice(a, 1)
                    }),e.length == 1 && (na(a, b, e[0]),delete t[d][b]));
                    var g = 0;
                    k(t[d], function() {
                        g++
                    });
                    g < 2 && (delete t[d],Za(a))
                }
            }
        }
    }

    function ab(a, b) {
        if (b.indexOf(",") >= 0)k(b.split(","), function() {
            ab(a, this)
        }); else {
            var c = a[W] || null;
            if (c) {
                var d = t[c][b];
                if (t[c] && d && d.length > 0)d[0]()
            }
        }
    }

    function Ba(a, b, c) {
        b = /^\d{2,}$/.test(b) ? b : b.toUpperCase().charCodeAt(0);
        X(a, "keydown", function(d) {
            d.ctrlKey && d.which == b && !d.shiftKey && !d.altKey && (c.call(a),d.stop())
        })
    }

    function oa(a) {
        for (var b = {},c = /\s*([\w\-]+)\s*:([^;]*)(;|$)/g,d; d = c.exec(a);) {
            var e = B(d[1].toLowerCase());
            d = B(ma(d[2]));
            b[e] = d
        }
        return b
    }

    function N(a) {
        for (var b = {},c = /\s+(?:([\w\-:]+)|(?:([\w\-:]+)=([^\s"'<>]+))|(?:([\w\-:"]+)="([^"]*)")|(?:([\w\-:"]+)='([^']*)'))(?=(?:\s|\/|>)+)/g,d; d = c.exec(a);) {
            var e = (d[1] || d[2] || d[4] || d[6]).toLowerCase();
            b[e] = (d[2] ? d[3] : d[4] ? d[5] : d[7]) || ""
        }
        return b
    }

    function Ib(a, b) {
        return a = /\s+class\s*=/.test(a) ? a.replace(/(\s+class=["']?)([^"']*)(["']?[\s>])/, function(a, d, e, g) {
            return(" " + e + " ").indexOf(" " + b + " ") < 0 ? e === "" ? d + b + g : d + e + " " + b + g : a
        }) : a.substr(0, a.length - 1) + ' class="' + b + '">'
    }

    function Jb(a) {
        var b = "";
        k(oa(a), function(a, d) {
            b += a + ":" + d + ";"
        });
        return b
    }

    function bb(a, b, c, d) {
        function e(a) {
            for (var a = a.split("/"),b = [],c = 0,d = a.length; c < d; c++) {
                var e = a[c];
                e == ".." ? b.length > 0 && b.pop() : e !== "" && e != "." && b.push(e)
            }
            return"/" + b.join("/")
        }

        function g(b, c) {
            if (a.substr(0, b.length) === b) {
                for (var e = [],f = 0; f < c; f++)e.push("..");
                f = ".";
                e.length > 0 && (f += "/" + e.join("/"));
                d == "/" && (f += "/");
                return f +
                    a.substr(b.length)
            } else if (h = /^(.*)\//.exec(b))return g(h[1], ++c)
        }

        b = o(b, "").toLowerCase();
        if (I(b, ["absolute","relative","domain"]) < 0)return a;
        c = c || location.protocol + "//" + location.host;
        if (d === m)var f = location.pathname.match(/^(\/.*)\//),d = f ? f[1] : "";
        var h;
        if (h = /^(\w+:\/\/[^\/]*)/.exec(a)) {
            if (h[1] !== c)return a
        } else if (/^\w+:/.test(a))return a;
        /^\//.test(a) ? a = c + e(a.substr(1)) : /^\w+:\/\//.test(a) || (a = c + e(d + "/" + a));
        b === "relative" ? a = g(c + d, 0).substr(2) : b === "absolute" && a.substr(0, c.length) === c && (a = a.substr(c.length));
        return a
    }

    function Y(a, b, c, d, e) {
        var c = c || "",d = o(d, !1),e = o(e, "\t"),f = "xx-small,x-small,small,medium,large,x-large,xx-large".split(","),a = a.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function(a, b, c, d) {
            return b + c.replace(/<(?:br|br\s[^>]*)>/ig, "\n") + d
        }),a = a.replace(/<(?:br|br\s[^>]*)\s*\/?>\s*<\/p>/ig, "</p>"),a = a.replace(/(<(?:p|p\s[^>]*)>)\s*(<\/p>)/ig, function(a, b, c) {
            return b + "&nbsp;" + c
        }),a = a.replace(/\u200B/g, ""),i = {};
        b && k(b, function(a, b) {
            for (var c = a.split(","),d = 0,e = c.length; d < e; d++)i[c[d]] =
                v(b)
        });
        var h = [],a = a.replace(/(\s*)<(\/)?([\w\-:]+)((?:\s+|(?:\s+[\w\-:]+)|(?:\s+[\w\-:]+=[^\s"'<>]+)|(?:\s+[\w\-:"]+="[^"]*")|(?:\s+[\w\-:"]+='[^']*'))*)(\/)?>(\s*)/g, function(a, l, p, q, J, m, D) {
            var l = l || "",p = p || "",r = q.toLowerCase(),n = J || "",q = m ? " " + m : "",D = D || "";
            if (b && !i[r])return"";
            q === "" && cb[r] && (q = " /");
            db[r] && (l && (l = " "),D && (D = " "));
            Ca[r] && (p ? D = "\n" : l = "\n");
            d && r == "br" && (D = "\n");
            if (eb[r] && !Ca[r])if (d) {
                p && h.length > 0 && h[h.length - 1] === r ? h.pop() : h.push(r);
                D = l = "\n";
                J = 0;
                for (m = p ? h.length : h.length - 1; J < m; J++)l +=
                    e,p || (D += e);
                q ? h.pop() : p || (D += e)
            } else l = D = "";
            if (n !== "") {
                var u = N(a);
                if (r === "font") {
                    var K = {},E = "";
                    k(u, function(a, b) {
                        if (a === "color")K.color = b,delete u[a];
                        a === "size" && (K["font-size"] = f[parseInt(b, 10) - 1] || "",delete u[a]);
                        a === "face" && (K["font-family"] = b,delete u[a]);
                        a === "style" && (E = b)
                    });
                    E && !/;$/.test(E) && (E += ";");
                    k(K, function(a, b) {
                        b !== "" && (/\s/.test(b) && (b = "'" + b + "'"),E += a + ":" + b + ";")
                    });
                    u.style = E
                }
                k(u, function(a, d) {
                    Kb[a] && (u[a] = a);
                    I(a, ["src","href"]) >= 0 && (u[a] = bb(d, c));
                    (b && a !== "style" && !i[r]["*"] && !i[r][a] ||
                        r === "body" && a === "contenteditable" || /^kindeditor_\d+$/.test(a)) && delete u[a];
                    if (a === "style" && d !== "") {
                        var e = oa(d);
                        k(e, function(a) {
                            b && !i[r].style && !i[r]["." + a] && delete e[a]
                        });
                        var f = "";
                        k(e, function(a, b) {
                            f += a + ":" + b + ";"
                        });
                        u.style = f
                    }
                });
                n = "";
                k(u, function(a, b) {
                    a === "style" && b === "" || (n += " " + a + '="' + b + '"')
                })
            }
            r === "font" && (r = "span");
            return l + "<" + p + r + n + q + ">" + D
        }),a = a.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function(a, b, c, d) {
            return b + c.replace(/\n/g, '<span id="__kindeditor_pre_newline__">\n') + d
        }),a = a.replace(/\n\s*\n/g,
            "\n"),a = a.replace(/<span id="__kindeditor_pre_newline__">\n/g, "\n");
        return B(a)
    }

    function fb(a) {
        if (/\.(rm|rmvb)(\?|$)/i.test(a))return"audio/x-pn-realaudio-plugin";
        if (/\.(swf|flv)(\?|$)/i.test(a))return"application/x-shockwave-flash";
        return"video/x-ms-asf-plugin"
    }

    function gb(a) {
        return N(unescape(a))
    }

    function Da(a) {
        var b = "<embed ";
        k(a, function(a, d) {
            b += a + '="' + d + '" '
        });
        b += "/>";
        return b
    }

    function hb(a, b) {
        var c = b.width,d = b.height,e = b.type || fb(b.src),f = Da(b),i = "";
        c > 0 && (i += "width:" + c + "px;");
        d > 0 && (i += "height:" +
            d + "px;");
        c = /realaudio/i.test(e) ? "ke-rm" : /flash/i.test(e) ? "ke-flash" : "ke-media";
        c = '<img class="' + c + '" src="' + a + '" ';
        i !== "" && (c += 'style="' + i + '" ');
        c += 'data-ke-tag="' + escape(f) + '" alt="" />';
        return c
    }

    function pa(a, b) {
        if (a.nodeType == 9 && b.nodeType != 9)return!0;
        for (; b = b.parentNode;)if (b == a)return!0;
        return!1
    }

    function qa(a, b) {
        var b = b.toLowerCase(),c = null;
        if (n && F < 8) {
            var d = a.ownerDocument.createElement("div");
            d.appendChild(a.cloneNode(!1));
            d = N(d.innerHTML.toLowerCase());
            b in d && (c = d[b])
        } else c = a.getAttribute(b,
            2);
        b === "style" && c !== null && (c = Jb(c));
        return c
    }

    function ra(a, b) {
        function c(a) {
            if (typeof a != "string")return a;
            return a.replace(/([^\w\-])/g, "\\$1")
        }

        function d(a, b) {
            return a === "*" || a.toLowerCase() === c(b.toLowerCase())
        }

        function e(a, b, c) {
            var e = [];
            (a = (c.ownerDocument || c).getElementById(a.replace(/\\/g, ""))) && d(b, a.nodeName) && pa(c, a) && e.push(a);
            return e
        }

        function f(a, b, c) {
            var e = c.ownerDocument || c,h = [],g,j,i;
            if (c.getElementsByClassName) {
                e = c.getElementsByClassName(a.replace(/\\/g, ""));
                g = 0;
                for (j = e.length; g < j; g++)i =
                    e[g],d(b, i.nodeName) && h.push(i)
            } else if (e.querySelectorAll) {
                e = e.querySelectorAll((c.nodeName !== "#document" ? c.nodeName + " " : "") + b + "." + a);
                g = 0;
                for (j = e.length; g < j; g++)i = e[g],pa(c, i) && h.push(i)
            } else {
                e = c.getElementsByTagName(b);
                a = " " + a + " ";
                g = 0;
                for (j = e.length; g < j; g++)if (i = e[g],i.nodeType == 1)(b = i.className) && (" " + b + " ").indexOf(a) > -1 && h.push(i)
            }
            return h
        }

        function i(a, b, d, e) {
            for (var f = [],d = e.getElementsByTagName(d),g = 0,h = d.length; g < h; g++)e = d[g],e.nodeType == 1 && (b === null ? qa(e, a) !== null && f.push(e) : b === c(qa(e, a)) &&
                f.push(e));
            return f
        }

        function h(a, b) {
            var c = [],h,j = (h = /^((?:\\.|[^.#\s\[<>])+)/.exec(a)) ? h[1] : "*";
            if (h = /#((?:[\w\-]|\\.)+)$/.exec(a))c = e(h[1], j, b); else if (h = /\.((?:[\w\-]|\\.)+)$/.exec(a))c = f(h[1], j, b); else if (h = /\[((?:[\w\-]|\\.)+)\]/.exec(a))c = i(h[1].toLowerCase(), null, j, b); else if (h = /\[((?:[\w\-]|\\.)+)\s*=\s*['"]?((?:\\.|[^'"]+)+)['"]?\]/.exec(a)) {
                c = h[1].toLowerCase();
                h = h[2];
                if (c === "id")j = e(h, j, b); else if (c === "class")j = f(h, j, b); else if (c === "name") {
                    c = [];
                    h = (b.ownerDocument || b).getElementsByName(h.replace(/\\/g,
                        ""));
                    for (var l,q = 0,p = h.length; q < p; q++)l = h[q],d(j, l.nodeName) && pa(b, l) && l.getAttributeNode("name") && c.push(l);
                    j = c
                } else j = i(c, h, j, b);
                c = j
            } else {
                j = b.getElementsByTagName(j);
                l = 0;
                for (q = j.length; l < q; l++)h = j[l],h.nodeType == 1 && c.push(h)
            }
            return c
        }

        var j = a.split(",");
        if (j.length > 1) {
            var l = [];
            k(j, function() {
                k(ra(this, b), function() {
                    I(this, l) < 0 && l.push(this)
                })
            });
            return l
        }
        for (var b = b || document,j = [],p,q = /((?:\\.|[^\s>])+|[\s>])/g; p = q.exec(a);)p[1] !== " " && j.push(p[1]);
        p = [];
        if (j.length == 1)return h(j[0], b);
        var q = !1,J,
            m,n,r,o,u,K,E,s,t;
        u = 0;
        for (lenth = j.length; u < lenth; u++)if (J = j[u],J === ">")q = !0; else {
            if (u > 0) {
                m = [];
                K = 0;
                for (s = p.length; K < s; K++) {
                    r = p[K];
                    n = h(J, r);
                    E = 0;
                    for (t = n.length; E < t; E++)o = n[E],q ? r === o.parentNode && m.push(o) : m.push(o)
                }
                p = m
            } else p = h(J, b);
            if (p.length === 0)return[]
        }
        return p
    }

    function ea(a) {
        if (!a)return document;
        return a.ownerDocument || a.document || a
    }

    function R(a) {
        if (!a)return A;
        a = ea(a);
        return a.parentWindow || a.defaultView
    }

    function Ea(a, b, c) {
        n && F < 8 && b.toLowerCase() == "class" && (b = "className");
        a.setAttribute(b, "" +
            c)
    }

    function Fa(a) {
        if (!a || !a.nodeName)return"";
        return a.nodeName.toLowerCase()
    }

    function Lb(a, b) {
        var c = R(a),d = da(b),e = "";
        c.getComputedStyle ? (c = c.getComputedStyle(a, null),e = c[d] || c.getPropertyValue(b) || a.style[d]) : a.currentStyle && (e = a.currentStyle[d] || a.style[d]);
        return e
    }

    function G(a) {
        a = a || document;
        return Z ? a.body : a.documentElement
    }

    function fa(a) {
        var a = a || document,b;
        n || Ga ? (b = G(a).scrollLeft,a = G(a).scrollTop) : (b = R(a).scrollX,a = R(a).scrollY);
        return{x:b,y:a}
    }

    function H(a) {
        this.init(a)
    }

    function ib(a) {
        a.collapsed =
            a.startContainer === a.endContainer && a.startOffset === a.endOffset;
        return a
    }

    function Ha(a, b, c) {
        function d(d, e, f) {
            var j = d.nodeValue.length,g;
            b && (g = d.cloneNode(!0),g = e > 0 ? g.splitText(e) : g,f < j && g.splitText(f - e));
            if (c) {
                var i = d;
                e > 0 && (i = d.splitText(e),a.setStart(d, e));
                f < j && (d = i.splitText(f - e),a.setEnd(d, 0));
                h.push(i)
            }
            return g
        }

        function e() {
            c && a.up().collapse(!0);
            for (var b = 0,d = h.length; b < d; b++) {
                var e = h[b];
                e.parentNode && e.parentNode.removeChild(e)
            }
        }

        function f(e, m) {
            for (var n = e.firstChild,o; n;) {
                o = (new S(i)).selectNode(n);
                l <= 0 && (l = o.compareBoundaryPoints(ga, a));
                l >= 0 && p <= 0 && (p = o.compareBoundaryPoints(ha, a));
                p >= 0 && q <= 0 && (q = o.compareBoundaryPoints($, a));
                q >= 0 && k <= 0 && (k = o.compareBoundaryPoints(ia, a));
                if (k >= 0)return!1;
                o = n.nextSibling;
                if (l > 0)if (n.nodeType == 1)if (p >= 0 && q <= 0)b && m.appendChild(n.cloneNode(!0)),c && h.push(n); else {
                    var r;
                    b && (r = n.cloneNode(!1),m.appendChild(r));
                    if (f(n, r) === !1)return!1
                } else if (n.nodeType == 3 && (n = n == j.startContainer ? d(n, j.startOffset, n.nodeValue.length) : n == j.endContainer ? d(n, 0, j.endOffset) : d(n, 0, n.nodeValue.length),
                    b))try {
                    m.appendChild(n)
                } catch(D) {
                }
                n = o
            }
        }

        var i = a.doc,h = [],j = a.cloneRange().down(),l = -1,p = -1,q = -1,k = -1,m = a.commonAncestor(),n = i.createDocumentFragment();
        if (m.nodeType == 3)return m = d(m, a.startOffset, a.endOffset),b && n.appendChild(m),e(),b ? n : a;
        f(m, n);
        c && a.up().collapse(!0);
        for (var m = 0,r = h.length; m < r; m++) {
            var o = h[m];
            o.parentNode && o.parentNode.removeChild(o)
        }
        return b ? n : a
    }

    function ja(a, b) {
        for (var c = b; c;) {
            var d = f(c);
            if (d.name == "marquee" || d.name == "select")return;
            c = c.parentNode
        }
        try {
            a.moveToElementText(b)
        } catch(e) {
        }
    }

    function jb(a, b) {
        var c = a.parentElement().ownerDocument,d = a.duplicate();
        d.collapse(b);
        var e = d.parentElement(),g = e.childNodes;
        if (g.length === 0)return{node:e.parentNode,offset:f(e).index()};
        var i = c,h = 0,j = -1,l = a.duplicate();
        ja(l, e);
        for (var p = 0,q = g.length; p < q; p++) {
            var k = g[p],j = l.compareEndPoints("StartToStart", d);
            if (j === 0)return{node:k.parentNode,offset:p};
            if (k.nodeType == 1) {
                var n = a.duplicate(),m,o = f(k);
                o.isControl() && (m = c.createElement("span"),o.after(m),k = m,h += o.text().replace(/\r\n|\n|\r/g, "").length);
                ja(n, k);
                l.setEndPoint("StartToEnd", n);
                j > 0 ? h += n.text.replace(/\r\n|\n|\r/g, "").length : h = 0;
                m && f(m).remove()
            } else k.nodeType == 3 && (l.moveStart("character", k.nodeValue.length),h += k.nodeValue.length);
            j < 0 && (i = k)
        }
        if (j < 0 && i.nodeType == 1)return{node:e,offset:f(e.lastChild).index() + 1};
        if (j > 0)for (; i.nodeType == 1;)i = i.nextSibling;
        l = a.duplicate();
        ja(l, e);
        l.setEndPoint("StartToEnd", d);
        h -= l.text.replace(/\r\n|\n|\r/g, "").length;
        return{node:i,offset:h}
    }

    function kb(a, b) {
        var c = a.ownerDocument || a,d = c.body.createTextRange();
        if (c == a)return d.collapse(!0),d;
        if (a.nodeType == 1 && a.childNodes.length > 0) {
            var e = a.childNodes,g;
            b === 0 ? (g = e[0],e = !0) : (g = e[b - 1],e = !1);
            if (!g)return d;
            if (f(g).name === "head")return b === 1 && (e = !0),b === 2 && (e = !1),d.collapse(e),d;
            if (g.nodeType == 1) {
                var i = f(g),h;
                i.isControl() && (h = c.createElement("span"),e ? i.before(h) : i.after(h),g = h);
                ja(d, g);
                d.collapse(e);
                h && f(h).remove();
                return d
            }
            a = g;
            b = e ? 0 : g.nodeValue.length
        }
        c = c.createElement("span");
        f(a).before(c);
        ja(d, c);
        d.moveStart("character", b);
        f(c).remove();
        return d
    }

    function Mb(a) {
        function b(a) {
            if (f(a.node).name ==
                "tr")a.node = a.node.cells[a.offset],a.offset = 0
        }

        var c;
        if (n) {
            if (a.item)return c = ea(a.item(0)),c = new S(c),c.selectNode(a.item(0)),c;
            c = a.parentElement().ownerDocument;
            var d = jb(a, !0),a = jb(a, !1);
            b(d);
            b(a);
            c = new S(c);
            c.setStart(d.node, d.offset);
            c.setEnd(a.node, a.offset);
            return c
        }
        d = a.startContainer;
        c = d.ownerDocument || d;
        c = new S(c);
        c.setStart(d, a.startOffset);
        c.setEnd(a.endContainer, a.endOffset);
        return c
    }

    function S(a) {
        this.init(a)
    }

    function Ia(a) {
        if (!a.nodeName)return a.get ? a : Mb(a);
        return new S(a)
    }

    function T(a, b, c) {
        try {
            a.execCommand(b, !1, c)
        } catch(d) {
        }
    }

    function lb(a, b) {
        var c = "";
        try {
            c = a.queryCommandValue(b)
        } catch(d) {
        }
        typeof c !== "string" && (c = "");
        return c
    }

    function Ja(a) {
        var b = R(a);
        return a.selection || b.getSelection()
    }

    function mb(a) {
        var b = {},c,d;
        k(a, function(a, f) {
            c = a.split(",");
            for (var i = 0,h = c.length; i < h; i++)d = c[i],b[d] = f
        });
        return b
    }

    function sa(a, b) {
        return nb(a, b, "*") || nb(a, b)
    }

    function nb(a, b, c) {
        c = c || a.name;
        if (a.type !== 1)return!1;
        b = mb(b);
        if (!b[c])return!1;
        for (var c = b[c].split(","),b = 0,d = c.length; b < d; b++) {
            var e =
                c[b];
            if (e === "*")return!0;
            var f = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(e),i = f[1] ? "css" : "attr",e = f[2],f = f[3] || "";
            if (f === "" && a[i](e) !== "")return!0;
            if (f !== "" && a[i](e) === f)return!0
        }
        return!1
    }

    function Ka(a, b) {
        ob(a, b, "*");
        ob(a, b)
    }

    function ob(a, b, c) {
        c = c || a.name;
        if (a.type === 1 && (b = mb(b),b[c])) {
            for (var c = b[c].split(","),b = !1,d = 0,e = c.length; d < e; d++) {
                var f = c[d];
                if (f === "*") {
                    b = !0;
                    break
                }
                var i = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(f),f = i[2];
                i[1] ? (f = da(f),a[0].style[f] && (a[0].style[f] = "")) : a.removeAttr(f)
            }
            b && a.remove(!0)
        }
    }

    function aa(a) {
        for (; a.first();)a = a.first();
        return a
    }

    function Nb(a, b, c) {
        k(b, function(b, c) {
            b !== "style" && a.attr(b, c)
        });
        k(c, function(b, c) {
            a.css(b, c)
        })
    }

    function pb(a) {
        for (; a && a.name != "body";) {
            if (Ca[a.name] || a.name == "div" && a.hasClass("ke-script"))return!0;
            a = a.parent()
        }
        return!1
    }

    function ta(a) {
        this.init(a)
    }

    function qb(a) {
        a.nodeName && (a = ea(a),a = Ia(a).selectNodeContents(a.body).collapse(!1));
        return new ta(a)
    }

    function La(a) {
        var b = a.moveEl,c = a.moveFn,d = a.clickEl || b,e = a.beforeDrag,g = [document],i = [
            {x:0,y:0}
        ],h =
            [];
        (a.iframeFix === m || a.iframeFix) && f("iframe").each(function() {
            try {
                g.push(Ma(this))
            } catch(a) {
            }
            i.push(f(this).pos())
        });
        d.mousedown(function(a) {
            var l = d.get(),p = w(b.css("left")),q = w(b.css("top")),m = b.width(),n = b.height(),o = a.pageX,r = a.pageY,s = !0;
            e && e();
            k(g, function(a, b) {
                function e(b) {
                    if (s) {
                        var f = O(i[a].x + b.pageX - o),h = O(i[a].y + b.pageY - r);
                        c.call(d, p, q, m, n, f, h)
                    }
                    b.stop()
                }

                function j(a) {
                    a.stop()
                }

                function g(a) {
                    s = !1;
                    l.releaseCapture && l.releaseCapture();
                    k(h, function() {
                        f(this.doc).unbind("mousemove", this.move).unbind("mouseup",
                            this.up).unbind("selectstart", this.select)
                    });
                    a.stop()
                }

                f(b).mousemove(e).mouseup(g).bind("selectstart", j);
                h.push({doc:b,move:e,up:g,select:j})
            });
            l.setCapture && l.setCapture();
            a.stop()
        })
    }

    function U(a) {
        this.init(a)
    }

    function Na(a) {
        return new U(a)
    }

    function Ma(a) {
        a = f(a)[0];
        return a.contentDocument || a.contentWindow.document
    }

    function Ob(a, b, c, d) {
        var e = ['<html><head><meta charset="utf-8" /><title>KindEditor</title>',"<style>","html {margin:0;padding:0;}","body {margin:0;padding:5px;}",'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}',
            "body, p, div {word-wrap: break-word;}","p {margin:5px 0;}","table {border-collapse:collapse;}",".ke-zeroborder td {border:1px dotted #AAAAAA;}",".ke-flash {","\tborder:1px solid #AAAAAA;","\tbackground-image:url(" + a + "common/flash.gif);","\tbackground-position:center center;","\tbackground-repeat:no-repeat;","\twidth:100px;","\theight:100px;","}",".ke-rm {","\tborder:1px solid #AAAAAA;","\tbackground-image:url(" + a + "common/rm.gif);","\tbackground-position:center center;","\tbackground-repeat:no-repeat;",
            "\twidth:100px;","\theight:100px;","}",".ke-media {","\tborder:1px solid #AAAAAA;","\tbackground-image:url(" + a + "common/media.gif);","\tbackground-position:center center;","\tbackground-repeat:no-repeat;","\twidth:100px;","\theight:100px;","}",".ke-script {","\tdisplay:none;","\tfont-size:0;","\twidth:0;","\theight:0;","}",".ke-pagebreak {","\tborder:1px dotted #AAAAAA;","\tfont-size:0;","\theight:2px;","}","</style>"];
        ca(c) || (c = [c]);
        k(c, function(a, b) {
            b && e.push('<link href="' + b + '" rel="stylesheet" />')
        });
        d && e.push("<style>" + d + "</style>");
        e.push("</head><body " + (b ? 'class="' + b + '"' : "") + "></body></html>");
        return e.join("\n")
    }

    function ba(a, b) {
        return a.hasVal() ? a.val(b) : a.html(b)
    }

    function ua(a) {
        this.init(a)
    }

    function rb(a) {
        return new ua(a)
    }

    function sb(a, b) {
        var c = this.get(a);
        c && !c.hasClass("ke-disabled") && b(c)
    }

    function Oa(a) {
        this.init(a)
    }

    function tb(a) {
        return new Oa(a)
    }

    function va(a) {
        this.init(a)
    }

    function Pa(a) {
        return new va(a)
    }

    function wa(a) {
        this.init(a)
    }

    function ub(a) {
        return new wa(a)
    }

    function vb(a) {
        this.init(a)
    }

    function xa(a) {
        this.init(a)
    }

    function wb(a) {
        return new xa(a)
    }

    function Qa(a, b) {
        var c = document.getElementsByTagName("head")[0] || (Z ? document.body : document.documentElement),d = document.createElement("script");
        c.appendChild(d);
        d.src = a;
        d.charset = "utf-8";
        d.onload = d.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded")b && b(),d.onload = d.onreadystatechange = null,c.removeChild(d)
        }
    }

    function xb(a, b) {
        ka[a] = b
    }

    function yb(a) {
        var b,c = "core";
        if (b = /^(\w+)\.(\w+)$/.exec(a))c = b[1],a = b[2];
        return{ns:c,
            key:a}
    }

    function zb(a, b) {
        b = b === m ? P.langType : b;
        if (typeof a === "string") {
            if (!L[b])return"no language";
            var c = a.length - 1;
            if (a.substr(c) === ".")return L[b][a.substr(0, c)];
            c = yb(a);
            return L[b][c.ns][c.key]
        }
        k(a, function(a, c) {
            var f = yb(a);
            L[b] || (L[b] = {});
            L[b][f.ns] || (L[b][f.ns] = {});
            L[b][f.ns][f.key] = c
        })
    }

    function Pb() {
        var a = this;
        f(a.edit.doc).contextmenu(function(b) {
            a.menu && a.hideMenu();
            if (a.useContextmenu) {
                if (a._contextmenus.length !== 0) {
                    var c = 0,d = [];
                    for (k(a._contextmenus, function() {
                        if (this.title == "-")d.push(this);
                        else if (this.cond && this.cond() && (d.push(this),this.width && this.width > c))c = this.width
                    }); d.length > 0 && d[0].title == "-";)d.shift();
                    for (; d.length > 0 && d[d.length - 1].title == "-";)d.pop();
                    var e = null;
                    k(d, function(a) {
                        this.title == "-" && e.title == "-" && delete d[a];
                        e = this
                    });
                    if (d.length > 0) {
                        b.preventDefault();
                        var g = f(a.edit.iframe).pos(),i = Pa({x:g.x + b.clientX,y:g.y + b.clientY,width:c,css:{visibility:"hidden"}});
                        k(d, function() {
                            this.title && i.addItem(this)
                        });
                        var g = G(i.doc),h = i.div.height();
                        b.clientY + h >= g.clientHeight - 100 &&
                        i.pos(i.x, w(i.y) - h);
                        i.div.css("visibility", "visible");
                        a.menu = i
                    }
                }
            } else b.preventDefault()
        })
    }

    function Qb() {
        var a = this,b = a.edit.doc,c = a.newlineTag;
        if (!(n && c !== "br") && (!Ra || !(F < 3 && c !== "p")))Ga || f(b).keydown(function(d) {
            if (!(d.which != 13 || d.shiftKey || d.ctrlKey || d.altKey)) {
                a.cmd.selection();
                var e = f(a.cmd.range.commonAncestor());
                e.type == 3 && (e = e.parent());
                e = e.name;
                e == "marquee" || e == "select" || (c === "br" && I(e, "h1,h2,h3,h4,h5,h6,pre,li".split(",")) < 0 ? (d.preventDefault(),a.insertHtml("<br />")) : I(e, "p,h1,h2,h3,h4,h5,h6,pre,div,li,blockquote".split(",")) <
                    0 && T(b, "formatblock", "<P>"))
            }
        })
    }

    function Rb() {
        var a = this;
        f(a.edit.doc).keydown(function(b) {
            b.which == 9 && (b.preventDefault(),a.afterTab ? a.afterTab.call(a, b) : a.insertHtml("&nbsp;&nbsp;&nbsp;&nbsp;"))
        })
    }

    function Sb() {
        var a = this;
        f(a.edit.textarea[0], a.edit.win).focus(
            function(b) {
                a.afterFocus && a.afterFocus.call(a, b)
            }).blur(function(b) {
                a.afterBlur && a.afterBlur.call(a, b)
            })
    }

    function V(a) {
        return B(a.replace(/<span [^>]*id="__kindeditor_bookmark_\w+_\d+__"[^>]*><\/span>/i, ""))
    }

    function Ab(a, b) {
        if (a.length ===
            0)a.push(b); else {
            var c = a[a.length - 1];
            V(b.html) !== V(c.html) && a.push(b)
        }
    }

    function Bb(a, b) {
        var c = this.edit,d,e;
        if (a.length === 0)return this;
        c.designMode ? (d = this.cmd.range,e = d.createBookmark(!0),e.html = c.html()) : e = {html:c.html()};
        Ab(b, e);
        var f = a.pop();
        V(e.html) === V(f.html) && a.length > 0 && (f = a.pop());
        c.designMode ? (c.html(f.html),f.start && (d.moveToBookmark(f),this.select())) : c.html(V(f.html));
        return this
    }

    function Sa(a) {
        function b(a, b) {
            Sa.prototype[a] === m && (c[a] = b);
            c.options[a] = b
        }

        var c = this;
        c.options = {};
        k(a,
            function(c) {
                b(c, a[c]);
                c === "basePath" && (b("themesPath", a[c] + "themes/"),b("langPath", a[c] + "lang/"),b("pluginsPath", a[c] + "plugins/"))
            });
        k(P, function(a, d) {
            c[a] === m && b(a, d)
        });
        var d = f(c.srcElement);
        c.width || b("width", d.width() || c.minWidth);
        c.height || b("height", d.height() || c.minHeight);
        b("width", s(c.width));
        b("height", s(c.height));
        if (Cb)c.designMode = !1;
        c.srcElement = d;
        c.initContent = ba(d);
        c.plugin = {};
        c.isCreated = !1;
        c._handlers = {};
        c._contextmenus = [];
        c._undoStack = [];
        c._redoStack = [];
        c._calledPlugins = {};
        c._firstAddBookmark =
            !0
    }

    if (!A.KindEditor) {
        var z = navigator.userAgent.toLowerCase(),n = z.indexOf("msie") > -1 && z.indexOf("opera") == -1,Ra = z.indexOf("gecko") > -1 && z.indexOf("khtml") == -1,Q = z.indexOf("applewebkit") > -1,Ga = z.indexOf("opera") > -1,Cb = z.indexOf("mobile") > -1,Z = document.compatMode != "CSS1Compat",F = (z = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(z)) ? z[1] : "0",ya = (new Date).getTime(),O = Math.round,f = {DEBUG:!1,VERSION:"4.0 beta (2011-08-17)",IE:n,GECKO:Ra,WEBKIT:Q,OPERA:Ga,V:F,TIME:ya,each:k,isArray:ca,isFunction:Ua,inArray:I,
            inString:la,trim:B,addUnit:s,removeUnit:w,escape:Va,unescape:function(a) {
                return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
            },toCamel:da,toHex:ma,toMap:v,toArray:Aa,undef:o,extend:C,json:Wa},db = v("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),eb = v("address,applet,blockquote,body,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul"),
            cb = v("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),Db = v("b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u"),Tb = v("img,table,input,textarea,button"),Ca = v("pre,style,script"),za = v("html,head,body,td,tr,table,ol,ul,li");
        v("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
        var Kb = v("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),Eb = v("input,button,textarea,select"),P = {designMode:!0,fullscreenMode:!1,
            filterMode:!1,wellFormatMode:!0,shadowMode:!0,basePath:function() {
                for (var a = document.getElementsByTagName("script"),b,c = 0,d = a.length; c < d; c++)if (b = a[c].src || "",/kindeditor[\w\-\.]*\.js/.test(b))return b.substring(0, b.lastIndexOf("/") + 1);
                return""
            }(),themeType:"default",langType:"zh_CN",urlType:"",newlineTag:"p",resizeType:2,syncType:"form",pasteType:2,dialogAlignType:"page",useContextmenu:!0,bodyClass:"ke-content",indentChar:"\t",cssPath:"",cssData:"",minWidth:650,minHeight:100,minChangeSize:5,items:["source",
                "|","undo","redo","|","preview","print","template","cut","copy","paste","plainpaste","wordpaste","|","justifyleft","justifycenter","justifyright","justifyfull","insertorderedlist","insertunorderedlist","indent","outdent","subscript","superscript","clearhtml","quickformat","selectall","|","fullscreen","/","formatblock","fontname","fontsize","|","forecolor","hilitecolor","bold","italic","underline","strikethrough","lineheight","removeformat","|","image","flash","media","insertfile","table","hr","emoticons",
                "map","code","pagebreak","link","unlink","|","about"],noDisableItems:["source","fullscreen"],colorTable:[
                ["#E53333","#E56600","#FF9900","#64451D","#DFC5A4","#FFE500"],
                ["#009900","#006600","#99BB00","#B8D100","#60D978","#00D5FF"],
                ["#337FE5","#003399","#4C33E5","#9933E5","#CC33E5","#EE33EE"],
                ["#FFFFFF","#CCCCCC","#999999","#666666","#333333","#000000"]
            ],fontSizeTable:["9px","10px","12px","14px","16px","18px","24px","32px"],htmlTags:{font:["color","size","face",".background-color"],span:[".color",".background-color",
                ".font-size",".font-family",".background",".font-weight",".font-style",".text-decoration",".vertical-align",".line-height"],div:["align",".border",".margin",".padding",".text-align",".color",".background-color",".font-size",".font-family",".font-weight",".background",".font-style",".text-decoration",".vertical-align",".margin-left"],table:["border","cellspacing","cellpadding","width","height","align","bordercolor",".padding",".margin",".border","bgcolor",".text-align",".color",".background-color",
                ".font-size",".font-family",".font-weight",".font-style",".text-decoration",".background",".width",".height"],"td,th":["align","valign","width","height","colspan","rowspan","bgcolor",".text-align",".color",".background-color",".font-size",".font-family",".font-weight",".font-style",".text-decoration",".vertical-align",".background"],a:["href","target","name"],embed:["src","width","height","type","loop","autostart","quality",".width",".height","align","allowscriptaccess"],img:["src","width","height",
                "border","alt","title",".width",".height"],"p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6":["align",".text-align",".color",".background-color",".font-size",".font-family",".background",".font-weight",".font-style",".text-decoration",".vertical-align",".text-indent",".margin-left"],pre:["class"],"hr,br,tbody,tr,strong,b,sub,sup,em,i,u,strike":[]},layout:'<div class="container"><div class="toolbar"></div><div class="edit"></div><div class="statusbar"></div></div>'};
        P.themesPath = P.basePath + "themes/";
        P.langPath =
            P.basePath + "lang/";
        P.pluginsPath = P.basePath + "plugins/";
        var Xa = !1,Fb = v("8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222"),z = v("33..40"),Ta = {};
        k(Fb, function(a, b) {
            Ta[a] = b
        });
        k(z, function(a, b) {
            Ta[a] = b
        });
        var Ub = "altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,data,detail,eventPhase,fromElement,handler,keyCode,layerX,layerY,metaKey,newValue,offsetX,offsetY,originalTarget,pageX,pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which".split(",");
        C(Ya, {init:function(a, b) {
            var c = this,d = a.ownerDocument || a.document || a;
            c.event = b;
            k(Ub, function(a, d) {
                c[d] = b[d]
            });
            if (!c.target)c.target = c.srcElement || d;
            if (c.target.nodeType === 3)c.target = c.target.parentNode;
            if (!c.relatedTarget && c.fromElement)c.relatedTarget = c.fromElement === c.target ? c.toElement : c.fromElement;
            if (c.pageX == null && c.clientX != null) {
                var e = d.documentElement,d = d.body;
                c.pageX = c.clientX + (e && e.scrollLeft || d && d.scrollLeft || 0) - (e && e.clientLeft || d && d.clientLeft || 0);
                c.pageY = c.clientY + (e && e.scrollTop ||
                    d && d.scrollTop || 0) - (e && e.clientTop || d && d.clientTop || 0)
            }
            if (!c.which && (c.charCode || c.charCode === 0 ? c.charCode : c.keyCode))c.which = c.charCode || c.keyCode;
            if (!c.metaKey && c.ctrlKey)c.metaKey = c.ctrlKey;
            if (!c.which && c.button !== m)c.which = c.button & 1 ? 1 : c.button & 2 ? 3 : c.button & 4 ? 2 : 0;
            switch (c.which) {
                case 186:
                    c.which = 59;
                    break;
                case 187:
                case 107:
                case 43:
                    c.which = 61;
                    break;
                case 189:
                case 45:
                    c.which = 109;
                    break;
                case 42:
                    c.which = 106;
                    break;
                case 47:
                    c.which = 111;
                    break;
                case 78:
                    c.which = 110
            }
            c.which >= 96 && c.which <= 105 && (c.which -= 48)
        },
            preventDefault:function() {
                var a = this.event;
                a.preventDefault && a.preventDefault();
                a.returnValue = !1
            },stopPropagation:function() {
                var a = this.event;
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = !0
            },stop:function() {
                this.preventDefault();
                this.stopPropagation()
            }});
        var W = "kindeditor_" + ya,$a = 0,t = {};
        n && A.attachEvent("onunload", function() {
            k(t, function(a, b) {
                b.el && M(b.el)
            })
        });
        f.ctrl = Ba;
        f.ready = function(a) {
            function b() {
                e || (e = !0,a(KindEditor),document.addEventListener ? M(document, "DOMContentLoaded", b) : document.attachEvent &&
                    M(document, "readystatechange", d),M(A, "load", b))
            }

            function c() {
                if (!e) {
                    try {
                        document.documentElement.doScroll("left")
                    } catch(a) {
                        setTimeout(c, 0);
                        return
                    }
                    b()
                }
            }

            function d() {
                document.readyState === "complete" && b()
            }

            var e = !1;
            document.addEventListener ? X(document, "DOMContentLoaded", b) : document.attachEvent && (X(document, "readystatechange", d),document.documentElement.doScroll && A.frameElement === m && c());
            X(A, "load", b)
        };
        f.formatUrl = bb;
        f.formatHtml = Y;
        f.getCssList = oa;
        f.getAttrList = N;
        f.mediaType = fb;
        f.mediaAttrs = gb;
        f.mediaEmbed =
            Da;
        f.mediaImg = hb;
        f.query = function(a, b) {
            var c = ra(a, b);
            return c.length > 0 ? c[0] : null
        };
        f.queryAll = ra;
        C(H, {init:function(a) {
            for (var b = 0,c = a.length; b < c; b++)this[b] = a[b].get ? a[b][0] : a[b];
            this.length = a.length;
            this.doc = ea(this[0]);
            this.name = Fa(this[0]);
            this.type = this.length > 0 ? this[0].nodeType : null;
            this.win = R(this[0]);
            this._data = {}
        },each:function(a) {
            for (var b = 0; b < this.length; b++)if (a.call(this[b], b, this[b]) === !1)break;
            return this
        },bind:function(a, b) {
            this.each(function() {
                X(this, a, b)
            });
            return this
        },unbind:function(a, b) {
            this.each(function() {
                M(this, a, b)
            });
            return this
        },fire:function(a) {
            if (this.length < 1)return this;
            ab(this[0], a);
            return this
        },hasAttr:function(a) {
            if (this.length < 1)return!1;
            return!!qa(this[0], a)
        },attr:function(a, b) {
            var c = this;
            if (a === m)return N(c.outer());
            if (typeof a === "object")return k(a, function(a, b) {
                c.attr(a, b)
            }),c;
            if (b === m)return b = c.length < 1 ? null : qa(c[0], a),b === null ? "" : b;
            c.each(function() {
                Ea(this, a, b)
            });
            return c
        },removeAttr:function(a) {
            this.each(function() {
                var b = a;
                n && F < 8 && b.toLowerCase() == "class" &&
                (b = "className");
                Ea(this, b, "");
                this.removeAttribute(b)
            });
            return this
        },get:function(a) {
            if (this.length < 1)return null;
            return this[a || 0]
        },hasClass:function(a) {
            if (this.length < 1)return!1;
            return la(a, this[0].className, " ")
        },addClass:function(a) {
            this.each(function() {
                if (!la(a, this.className, " "))this.className = B(this.className + " " + a)
            });
            return this
        },removeClass:function(a) {
            this.each(function() {
                if (la(a, this.className, " "))this.className = B(this.className.replace(RegExp("(^|\\s)" + a + "(\\s|$)"), " "))
            });
            return this
        },
            html:function(a) {
                if (a === m) {
                    if (this.length < 1)return"";
                    return Y(this[0].innerHTML)
                }
                this.each(function() {
                    if (this.nodeType == 1)this.innerHTML = a
                });
                return this
            },text:function() {
                if (this.length < 1)return"";
                return n ? this[0].innerText : this[0].textContent
            },hasVal:function() {
                if (this.length < 1)return!1;
                return!!Eb[Fa(this[0])]
            },val:function(a) {
                if (a === m) {
                    if (this.length < 1)return"";
                    return this.hasVal() ? this[0].value : this.attr("value")
                } else return this.each(function() {
                    Eb[Fa(this)] ? this.value = a : Ea(this, "value", a)
                }),this
            },
            css:function(a, b) {
                var c = this;
                if (a === m)return oa(c.attr("style"));
                if (typeof a === "object")return k(a, function(a, b) {
                    c.css(a, b)
                }),c;
                if (b === m) {
                    if (c.length < 1)return"";
                    return c[0].style[da(a)] || Lb(c[0], a) || ""
                }
                c.each(function() {
                    this.style[da(a)] = b
                });
                return c
            },width:function(a) {
                if (a === m) {
                    if (this.length < 1)return 0;
                    return this[0].offsetWidth
                }
                return this.css("width", s(a))
            },height:function(a) {
                if (a === m) {
                    if (this.length < 1)return 0;
                    return this[0].offsetHeight
                }
                return this.css("height", s(a))
            },opacity:function(a) {
                this.each(function() {
                    this.style.opacity ===
                        m ? this.style.filter = a == 1 ? "" : "alpha(opacity=" + a * 100 + ")" : this.style.opacity = a == 1 ? "" : a
                });
                return this
            },data:function(a, b) {
                if (b === m)return this._data[a];
                this._data[a] = b;
                return this
            },pos:function() {
                var a = this[0],b = 0,c = 0;
                if (a)if (a.getBoundingClientRect)a = a.getBoundingClientRect(),c = fa(this.doc),b = a.left + c.x,c = a.top + c.y; else for (; a;)b += a.offsetLeft,c += a.offsetTop,a = a.offsetParent;
                return{x:O(b),y:O(c)}
            },clone:function(a) {
                if (this.length < 1)return new H([]);
                return new H([this[0].cloneNode(a)])
            },append:function(a) {
                this.each(function() {
                    this.appendChild &&
                    this.appendChild(f(a)[0])
                });
                return this
            },before:function(a) {
                this.each(function() {
                    this.parentNode.insertBefore(f(a)[0], this)
                });
                return this
            },after:function(a) {
                this.each(function() {
                    this.nextSibling ? this.parentNode.insertBefore(f(a)[0], this.nextSibling) : this.parentNode.appendChild(f(a)[0])
                });
                return this
            },replaceWith:function(a) {
                var b = [];
                this.each(function(c, d) {
                    M(d);
                    var e = f(a)[0];
                    d.parentNode.replaceChild(e, d);
                    b.push(e)
                });
                return f(b)
            },remove:function(a) {
                var b = this;
                b.each(function(c, d) {
                    d.parentNode && (M(d),
                        a && (new H(d.childNodes)).each(function() {
                            (new H([d])).after(this)
                        }),d.parentNode.removeChild(d),delete b[c])
                });
                b.length = 0;
                b._data = {};
                return b
            },show:function(a) {
                return this.css("display", a === m ? "block" : a)
            },hide:function() {
                return this.css("display", "none")
            },outer:function() {
                if (this.length < 1)return"";
                var a = this.doc.createElement("div");
                a.appendChild(this[0].cloneNode(!0));
                return Y(a.innerHTML)
            },isSingle:function() {
                return!!cb[this.name]
            },isInline:function() {
                return!!db[this.name]
            },isBlock:function() {
                return!!eb[this.name]
            },
            isStyle:function() {
                return!!Db[this.name]
            },isControl:function() {
                return!!Tb[this.name]
            },contains:function(a) {
                if (this.length < 1)return!1;
                return pa(this[0], f(a)[0])
            },parent:function() {
                if (this.length < 1)return null;
                var a = this[0].parentNode;
                return a ? new H([a]) : null
            },children:function() {
                if (this.length < 1)return[];
                for (var a = [],b = this[0].firstChild; b;)(b.nodeType != 3 || B(b.nodeValue) !== "") && a.push(new H([b])),b = b.nextSibling;
                return a
            },first:function() {
                var a = this.children();
                return a.length > 0 ? a[0] : null
            },last:function() {
                var a =
                    this.children();
                return a.length > 0 ? a[a.length - 1] : null
            },index:function() {
                if (this.length < 1)return-1;
                for (var a = -1,b = this[0]; b;)a++,b = b.previousSibling;
                return a
            },prev:function() {
                if (this.length < 1)return null;
                var a = this[0].previousSibling;
                return a ? new H([a]) : null
            },next:function() {
                if (this.length < 1)return null;
                var a = this[0].nextSibling;
                return a ? new H([a]) : null
            },scan:function(a, b) {
                function c(d) {
                    for (d = b ? d.firstChild : d.lastChild; d;) {
                        var e = b ? d.nextSibling : d.previousSibling;
                        if (a(d) === !1)return!1;
                        if (c(d) === !1)return!1;
                        d = e
                    }
                }

                if (!(this.length < 1))return b = b === m ? !0 : b,c(this[0]),this
            }});
        k("blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error,contextmenu".split(","), function(a, b) {
            H.prototype[b] = function(a) {
                return a ? this.bind(b, a) : this.fire(b)
            }
        });
        z = f;
        f = function(a, b) {
            function c(a) {
                a[0] || (a = []);
                return new H(a)
            }

            if (!(a === m || a === null)) {
                if (typeof a === "string") {
                    b && (b = f(b)[0]);
                    var d = a.length;
                    a.charAt(0) ===
                        "@" && (a = a.substr(1));
                    if (a.length !== d || /<.+>/.test(a)) {
                        var d = (b ? b.ownerDocument || b : document).createElement("div"),e = [];
                        if (d.nodeType == 1)d.innerHTML = a;
                        for (var g = 0,i = d.childNodes.length; g < i; g++)e.push(d.childNodes[g]);
                        return c(e)
                    }
                    return c(ra(a, b))
                }
                if (a && a.get)return a;
                if (ca(a))return c(a);
                return c(Aa(arguments))
            }
        };
        k(z, function(a, b) {
            f[a] = b
        });
        A.KindEditor = f;
        var ha = 0,ga = 1,$ = 2,ia = 3,Gb = 0;
        C(S, {init:function(a) {
            this.startContainer = a;
            this.startOffset = 0;
            this.endContainer = a;
            this.endOffset = 0;
            this.collapsed = !0;
            this.doc = a
        },commonAncestor:function() {
            function a(a) {
                for (var b = []; a;)b.push(a),a = a.parentNode;
                return b
            }

            for (var b = a(this.startContainer),c = a(this.endContainer),d = 0,e = b.length,f = c.length,i,h; ++d;)if (i = b[e - d],h = c[f - d],!i || !h || i !== h)break;
            return b[e - d + 1]
        },setStart:function(a, b) {
            var c = this.doc;
            this.startContainer = a;
            this.startOffset = b;
            if (this.endContainer === c)this.endContainer = a,this.endOffset = b;
            return ib(this)
        },setEnd:function(a, b) {
            var c = this.doc;
            this.endContainer = a;
            this.endOffset = b;
            if (this.startContainer ===
                c)this.startContainer = a,this.startOffset = b;
            return ib(this)
        },setStartBefore:function(a) {
            return this.setStart(a.parentNode || this.doc, f(a).index())
        },setStartAfter:function(a) {
            return this.setStart(a.parentNode || this.doc, f(a).index() + 1)
        },setEndBefore:function(a) {
            return this.setEnd(a.parentNode || this.doc, f(a).index())
        },setEndAfter:function(a) {
            return this.setEnd(a.parentNode || this.doc, f(a).index() + 1)
        },selectNode:function(a) {
            return this.setStartBefore(a).setEndAfter(a)
        },selectNodeContents:function(a) {
            var b =
                f(a);
            if (b.type == 3 || b.isSingle())return this.selectNode(a);
            b = b.children();
            if (b.length > 0)return this.setStartBefore(b[0][0]).setEndAfter(b[b.length - 1][0]);
            return this.setStart(a, 0).setEnd(a, 0)
        },collapse:function(a) {
            if (a)return this.setEnd(this.startContainer, this.startOffset);
            return this.setStart(this.endContainer, this.endOffset)
        },compareBoundaryPoints:function(a, b) {
            var c = this.get(),d = b.get();
            if (n) {
                var e = {};
                e[ha] = "StartToStart";
                e[ga] = "EndToStart";
                e[$] = "EndToEnd";
                e[ia] = "StartToEnd";
                c = c.compareEndPoints(e[a],
                    d);
                if (c !== 0)return c;
                var g,i,h,j;
                if (a === ha || a === ia)g = this.startContainer,h = this.startOffset;
                if (a === ga || a === $)g = this.endContainer,h = this.endOffset;
                if (a === ha || a === ga)i = b.startContainer,j = b.startOffset;
                if (a === $ || a === ia)i = b.endContainer,j = b.endOffset;
                if (g === i)return g = h - j,g > 0 ? 1 : g < 0 ? -1 : 0;
                for (c = i; c && c.parentNode !== g;)c = c.parentNode;
                if (c)return f(c).index() >= h ? -1 : 1;
                for (c = g; c && c.parentNode !== i;)c = c.parentNode;
                if (c)return f(c).index() >= j ? 1 : -1;
                if ((c = f(i).next()) && c.contains(g))return 1;
                if ((c = f(g).next()) &&
                    c.contains(i))return-1
            } else return c.compareBoundaryPoints(a, d)
        },cloneRange:function() {
            return(new S(this.doc)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset)
        },toString:function() {
            var a = this.get();
            return(n ? a.text : a.toString()).replace(/\r\n|\n|\r/g, "")
        },cloneContents:function() {
            return Ha(this, !0, !1)
        },deleteContents:function() {
            return Ha(this, !1, !0)
        },extractContents:function() {
            return Ha(this, !0, !0)
        },insertNode:function(a) {
            var b = this.startContainer,c = this.startOffset,
                d = this.endContainer,e = this.endOffset,f,i,h,j = 1;
            if (a.nodeName.toLowerCase() === "#document-fragment")f = a.firstChild,i = a.lastChild,j = a.childNodes.length;
            b.nodeType == 1 ? (h = b.childNodes[c]) ? (b.insertBefore(a, h),b === d && (e += j)) : b.appendChild(a) : b.nodeType == 3 && (c === 0 ? (b.parentNode.insertBefore(a, b),b.parentNode === d && (e += j)) : c >= b.nodeValue.length ? b.nextSibling ? b.parentNode.insertBefore(a, b.nextSibling) : b.parentNode.appendChild(a) : (h = c > 0 ? b.splitText(c) : b,b.parentNode.insertBefore(a, h),b === d && (d = h,e -= c)));
            f ? this.setStartBefore(f).setEndAfter(i) :
                this.selectNode(a);
            if (this.compareBoundaryPoints($, this.cloneRange().setEnd(d, e)) >= 1)return this;
            return this.setEnd(d, e)
        },surroundContents:function(a) {
            a.appendChild(this.extractContents());
            return this.insertNode(a).selectNode(a)
        },isControl:function() {
            var a = this.startContainer,b = this.startOffset,c = this.endContainer,d = this.endOffset;
            return a.nodeType == 1 && a === c && b + 1 === d && f(a.childNodes[b]).isControl()
        },get:function(a) {
            var b = this.doc;
            if (!n) {
                b = b.createRange();
                try {
                    b.setStart(this.startContainer, this.startOffset),
                        b.setEnd(this.endContainer, this.endOffset)
                } catch(c) {
                }
                return b
            }
            if (a && this.isControl())return b = b.body.createControlRange(),b.addElement(this.startContainer.childNodes[this.startOffset]),b;
            a = this.cloneRange().down();
            b = b.body.createTextRange();
            b.setEndPoint("StartToStart", kb(a.startContainer, a.startOffset));
            b.setEndPoint("EndToStart", kb(a.endContainer, a.endOffset));
            return b
        },html:function() {
            return f(this.cloneContents()).outer()
        },down:function() {
            function a(a, d, e) {
                if (a.nodeType == 1 && (a = f(a).children(),
                    a.length !== 0)) {
                    var g,i,h,j;
                    d > 0 && (g = a[d - 1]);
                    d < a.length && (i = a[d]);
                    if (g && g.type == 3)h = g[0],j = h.nodeValue.length;
                    i && i.type == 3 && (h = i[0],j = 0);
                    h && (e ? b.setStart(h, j) : b.setEnd(h, j))
                }
            }

            var b = this;
            a(b.startContainer, b.startOffset, !0);
            a(b.endContainer, b.endOffset, !1);
            return b
        },up:function() {
            function a(a, d, e) {
                a.nodeType == 3 && (d === 0 ? e ? b.setStartBefore(a) : b.setEndBefore(a) : d == a.nodeValue.length && (e ? b.setStartAfter(a) : b.setEndAfter(a)))
            }

            var b = this;
            a(b.startContainer, b.startOffset, !0);
            a(b.endContainer, b.endOffset, !1);
            return b
        },enlarge:function(a) {
            function b(b, e, g) {
                b = f(b);
                if (!(b.type == 3 || za[b.name] || !a && b.isBlock()))if (e === 0) {
                    for (; !b.prev();) {
                        e = b.parent();
                        if (!e || za[e.name] || !a && e.isBlock())break;
                        b = e
                    }
                    g ? c.setStartBefore(b[0]) : c.setEndBefore(b[0])
                } else if (e == b.children().length) {
                    for (; !b.next();) {
                        e = b.parent();
                        if (!e || za[e.name] || !a && e.isBlock())break;
                        b = e
                    }
                    g ? c.setStartAfter(b[0]) : c.setEndAfter(b[0])
                }
            }

            var c = this;
            c.up();
            b(c.startContainer, c.startOffset, !0);
            b(c.endContainer, c.endOffset, !1);
            return c
        },createBookmark:function(a) {
            var b,
                c = f('<span style="display:none;"></span>', this.doc)[0];
            c.id = "__kindeditor_bookmark_start_" + Gb++ + "__";
            if (!this.collapsed)b = c.cloneNode(!0),b.id = "__kindeditor_bookmark_end_" + Gb++ + "__";
            b && this.cloneRange().collapse(!1).insertNode(b).setEndBefore(b);
            this.insertNode(c).setStartAfter(c);
            return{start:a ? "#" + c.id : c,end:b ? a ? "#" + b.id : b : null}
        },moveToBookmark:function(a) {
            var b = this.doc,c = f(a.start, b),a = a.end ? f(a.end, b) : null;
            if (!c || c.length < 1)return this;
            this.setStartBefore(c[0]);
            c.remove();
            a ? (this.setEndBefore(a[0]),
                a.remove()) : this.collapse(!0);
            return this
        }});
        f.range = Ia;
        f.START_TO_START = ha;
        f.START_TO_END = ga;
        f.END_TO_END = $;
        f.END_TO_START = ia;
        C(ta, {init:function(a) {
            var b = a.doc;
            this.doc = b;
            this.win = R(b);
            this.sel = Ja(b);
            this.range = a
        },selection:function(a) {
            var b = this.doc,c;
            c = Ja(b);
            var d;
            try {
                d = c.rangeCount > 0 ? c.getRangeAt(0) : c.createRange()
            } catch(e) {
            }
            c = n && (!d || !d.item && d.parentElement().ownerDocument !== b) ? null : d;
            this.sel = Ja(b);
            if (c)return this.range = Ia(c),f(this.range.startContainer).name == "html" && this.range.selectNodeContents(b.body).collapse(!1),
                this;
            a && this.range.selectNodeContents(b.body).collapse(!1);
            return this
        },select:function() {
            var a = this.sel,b = this.range.cloneRange(),c = b.startContainer,d = ea(c),e = this.win;
            if (c.nodeType == 1 && b.collapsed) {
                if (n)return a = f("<span>&nbsp;</span>", d),b.insertNode(a[0]),b = d.body.createTextRange(),b.moveToElementText(a[0]),b.collapse(!1),b.select(),a.remove(),e.focus(),this;
                Q && b.insertNode(d.createTextNode("\u200b"))
            }
            b = b.get(!0);
            if (n)try {
                b.select()
            } catch(g) {
            } else a.removeAllRanges(),a.addRange(b);
            e.focus();
            return this
        },
            wrap:function(a) {
                var b = this.range,c;
                c = f(a, this.doc);
                if (b.collapsed)return b.insertNode(c[0]).selectNodeContents(c[0]),this;
                if (c.isBlock()) {
                    for (var d = a = c.clone(!0); d.first();)d = d.first();
                    d.append(b.extractContents());
                    b.insertNode(a[0]).selectNode(a[0]);
                    return this
                }
                b.enlarge();
                var e = b.createBookmark(),a = b.commonAncestor(),g = !1;
                f(a).scan(function(a) {
                    if (!g && a == e.start)g = !0; else if (g) {
                        if (a == e.end)return!1;
                        var b = f(a);
                        if (!pb(b) && b.type == 3 && B(a.nodeValue).length > 0) {
                            for (var d; (d = b.parent()) && d.isStyle() &&
                                d.children().length == 1;)b = d;
                            d = c;
                            d = d.clone(!0);
                            if (b.type == 3)aa(d).append(b.clone(!1)),b.replaceWith(d); else {
                                for (var a = b,l; (l = b.first()) && l.children().length == 1;)b = l;
                                l = b.first();
                                for (b = b.doc.createDocumentFragment(); l;)b.appendChild(l[0]),l = l.next();
                                l = a.clone(!0);
                                for (var p = aa(l),q = l,k = !1; d;) {
                                    for (; q;)q.name === d.name && (Nb(q, d.attr(), d.css()),k = !0),q = q.first();
                                    k || p.append(d.clone(!1));
                                    k = !1;
                                    d = d.first()
                                }
                                d = l;
                                b.firstChild && aa(d).append(b);
                                a.replaceWith(d)
                            }
                        }
                    }
                });
                b.moveToBookmark(e);
                return this
            },split:function(a, b) {
                for (var c = this.range,d = c.doc,e = c.cloneRange().collapse(a),g = e.startContainer,i = e.startOffset,h = g.nodeType == 3 ? g.parentNode : g,j = !1,l; h && h.parentNode;) {
                    l = f(h);
                    if (b) {
                        if (!l.isStyle())break;
                        if (!sa(l, b))break
                    } else if (za[l.name])break;
                    j = !0;
                    h = h.parentNode
                }
                if (j)d = d.createElement("span"),c.cloneRange().collapse(!a).insertNode(d),a ? e.setStartBefore(h.firstChild).setEnd(g, i) : e.setStart(g, i).setEndAfter(h.lastChild),g = e.extractContents(),i = g.firstChild,j = g.lastChild,a ? (e.insertNode(g),c.setStartAfter(j).setEndBefore(d)) :
                    (h.appendChild(g),c.setStartBefore(d).setEndBefore(i)),e = d.parentNode,e == c.endContainer && (h = f(d).prev(),g = f(d).next(),h && g && h.type == 3 && g.type == 3 ? c.setEnd(h[0], h[0].nodeValue.length) : a || c.setEnd(c.endContainer, c.endOffset - 1)),e.removeChild(d);
                return this
            },remove:function(a) {
                var b = this.doc,c = this.range;
                if (c.collapsed)return this.split(!0, a),c.collapse(!0),this;
                if (c.startOffset === 0) {
                    for (var d = f(c.startContainer),e; (e = d.parent()) && e.isStyle() && e.children().length == 1;)d = e;
                    c.setStart(d[0], 0);
                    d = f(c.startContainer);
                    d.isBlock() && Ka(d, a);
                    (d = d.parent()) && d.isBlock() && Ka(d, a)
                }
                this.split(!0, a);
                this.split(!1, a);
                var g = b.createElement("span"),i = b.createElement("span");
                c.cloneRange().collapse(!1).insertNode(i);
                c.cloneRange().collapse(!0).insertNode(g);
                var h = [],j = !1;
                f(c.commonAncestor()).scan(function(a) {
                    if (!j && a == g)j = !0; else {
                        if (a == i)return!1;
                        j && h.push(a)
                    }
                });
                f(g).remove();
                f(i).remove();
                var b = c.startContainer,l = c.startOffset,d = c.endContainer;
                e = c.endOffset;
                if (l > 0) {
                    var p = f(b.childNodes[l - 1]);
                    p && aa(p).isStyle() && (p.remove(),
                        c.setStart(b, l - 1),b == d && c.setEnd(d, e - 1));
                    if ((l = f(b.childNodes[l])) && aa(l).isStyle())l.remove(),b == d && c.setEnd(d, e - 1)
                }
                (c = f(d.childNodes[c.endOffset])) && aa(c).isStyle() && c.remove();
                k(h, function(b, c) {
                    var d = f(c);
                    Ka(d, a)
                });
                return this
            },commonNode:function(a) {
                for (var b = this.range,c = b.endContainer,b = b.endOffset,d = c.nodeType == 3 || b === 0 ? c : c.childNodes[b - 1],e = d,g = d; g;) {
                    if (sa(f(g), a))return f(g);
                    g = g.parentNode
                }
                for (; e && (e = e.firstChild) && e.childNodes.length == 1;)if (sa(f(e), a))return f(e);
                if (d.nodeType == 1 || c.nodeType ==
                    3 && b === 0)if ((c = f(d).prev()) && sa(c, a))return c;
                return null
            },commonAncestor:function(a) {
                function b(b) {
                    for (; b;) {
                        if (b.nodeType == 1 && b.tagName.toLowerCase() === a)return b;
                        b = b.parentNode
                    }
                    return null
                }

                var c = this.range,d = c.startContainer,e = c.startOffset,g = c.endContainer,c = c.endOffset,g = g.nodeType == 3 || c === 0 ? g : g.childNodes[c - 1],d = b(d.nodeType == 3 || e === 0 ? d : d.childNodes[e - 1]),e = b(g);
                if (d && e && d === e)return f(d);
                return null
            },state:function(a) {
                var b = this.doc,c = !1;
                try {
                    c = b.queryCommandState(a)
                } catch(d) {
                }
                return c
            },val:function(a) {
                var b =
                    this.doc,a = a.toLowerCase(),c = "";
                if (a === "fontfamily" || a === "fontname")return c = lb(b, "fontname"),c = c.replace(/['"]/g, ""),c.toLowerCase();
                if (a === "formatblock") {
                    c = lb(b, a);
                    if (c === "" && (a = this.commonNode({"h1,h2,h3,h4,h5,h6,p,div,pre,address":"*"})))c = a.name;
                    c === "Normal" && (c = "p");
                    return c.toLowerCase()
                }
                if (a === "fontsize")return(a = this.commonNode({"*":".font-size"})) && (c = a.css("font-size")),c.toLowerCase();
                if (a === "forecolor")return(a = this.commonNode({"*":".color"})) && (c = a.css("color")),c = ma(c),c === "" && (c = "default"),
                    c.toLowerCase();
                if (a === "hilitecolor")return(a = this.commonNode({"*":".background-color"})) && (c = a.css("background-color")),c = ma(c),c === "" && (c = "default"),c.toLowerCase();
                return c
            },toggle:function(a, b) {
                this.commonNode(b) ? this.remove(b) : this.wrap(a);
                return this.select()
            },bold:function() {
                return this.toggle("<strong></strong>", {span:".font-weight=bold",strong:"*",b:"*"})
            },italic:function() {
                return this.toggle("<em></em>", {span:".font-style=italic",em:"*",i:"*"})
            },underline:function() {
                return this.toggle("<u></u>",
                    {span:".text-decoration=underline",u:"*"})
            },strikethrough:function() {
                return this.toggle("<s></s>", {span:".text-decoration=line-through",s:"*"})
            },forecolor:function(a) {
                return this.toggle('<span style="color:' + a + ';"></span>', {span:".color=" + a,font:"color"})
            },hilitecolor:function(a) {
                return this.toggle('<span style="background-color:' + a + ';"></span>', {span:".background-color=" + a})
            },fontsize:function(a) {
                return this.toggle('<span style="font-size:' + a + ';"></span>', {span:".font-size=" + a,font:"size"})
            },fontname:function(a) {
                return this.fontfamily(a)
            },
            fontfamily:function(a) {
                return this.toggle('<span style="font-family:' + a + ';"></span>', {span:".font-family=" + a,font:"face"})
            },removeformat:function() {
                var a = {"*":".font-weight,.font-style,.text-decoration,.color,.background-color,.font-size,.font-family"};
                k(Db, function(b) {
                    a[b] = "*"
                });
                this.remove(a);
                return this.select()
            },inserthtml:function(a) {
                var b = this.doc,c = this.range;
                if (a === "")return this;
                if (pb(f(c.startContainer)))return this;
                var d = b.createDocumentFragment();
                f("@" + a, b).each(function() {
                    d.appendChild(this)
                });
                c.deleteContents();
                c.insertNode(d);
                c.collapse(!1);
                return this.select()
            },hr:function() {
                return this.inserthtml("<hr />")
            },print:function() {
                this.win.print();
                return this
            },insertimage:function(a, b, c, d, e, f) {
                b = o(b, "");
                o(e, 0);
                a = '<img src="' + a + '" data-ke-src="' + a + '" ';
                c && (a += 'width="' + c + '" ');
                d && (a += 'height="' + d + '" ');
                b && (a += 'title="' + b + '" ');
                f && (a += 'align="' + f + '" ');
                a += 'alt="' + b + '" ';
                a += "/>";
                return this.inserthtml(a)
            },createlink:function(a, b) {
                var c = this.doc,d = this.range;
                this.select();
                var e = this.commonNode({a:"*"});
                e && !d.isControl() && (d.selectNode(e.get()),this.select());
                d.collapsed ? (c = '<a href="' + a + '" data-ke-src="' + a + '" ',b && (c += ' target="' + b + '"'),c += ">" + a + "</a>",this.inserthtml(c)) : (T(c, "createlink", "__kindeditor_temp_url__"),e = this.commonNode({a:"*"}),f('a[href="__kindeditor_temp_url__"]', e ? e.parent() : c).each(function() {
                    f(this).attr("href", a).attr("data-ke-src", a);
                    b ? f(this).attr("target", b) : f(this).removeAttr("target")
                }));
                return this
            },unlink:function() {
                var a = this.doc,b = this.range;
                this.select();
                if (b.collapsed) {
                    var c =
                        this.commonNode({a:"*"});
                    c && (b.selectNode(c.get()),this.select());
                    T(a, "unlink", null);
                    Q && f(b.startContainer).name === "img" && (a = f(b.startContainer).parent(),a.name === "a" && a.remove(!0))
                } else T(a, "unlink", null);
                return this
            }});
        k("formatblock,selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript".split(","), function(a, b) {
            ta.prototype[b] = function(a) {
                if (n) {
                    rng = this.range.get(!0);
                    try {
                        rng.select()
                    } catch(d) {
                    }
                }
                T(this.doc, b, a);
                (!n ||
                    I(b, "formatblock,selectall,insertorderedlist,insertunorderedlist".split(",")) >= 0) && this.selection();
                return this
            }
        });
        k("cut,copy,paste".split(","), function(a, b) {
            ta.prototype[b] = function() {
                if (!this.doc.queryCommandSupported(b))throw"not supported";
                T(this.doc, b, null);
                return this
            }
        });
        f.cmd = qb;
        C(U, {init:function(a) {
            var b = this;
            b.name = a.name || "";
            b.doc = a.doc || document;
            b.win = R(b.doc);
            b.x = s(a.x);
            b.y = s(a.y);
            b.z = a.z;
            b.width = s(a.width);
            b.height = s(a.height);
            b.div = f('<div style="display:block;"></div>');
            b.options =
                a;
            b._alignEl = a.alignEl;
            b.width && b.div.css("width", b.width);
            b.height && b.div.css("height", b.height);
            b.z && b.div.css({position:"absolute",left:b.x,top:b.y,"z-index":b.z});
            b.z && (b.x === m || b.y === m) && b.autoPos(b.width, b.height);
            a.cls && b.div.addClass(a.cls);
            a.css && b.div.css(a.css);
            a.src ? f(a.src).hide().after(b.div) : f(b.doc.body).append(b.div);
            a.html && b.div.html(a.html);
            if (a.autoScroll)if (n && F < 7 || Z) {
                var c = fa();
                f(b.win).bind("scroll", function() {
                    var a = fa(),e = a.x - c.x,a = a.y - c.y;
                    b.pos(w(b.x) + e, w(b.y) + a, !1)
                })
            } else b.div.css("position",
                "fixed")
        },pos:function(a, b, c) {
            c = o(c, !0);
            if (a !== null && (a = a < 0 ? 0 : s(a),this.div.css("left", a),c))this.x = a;
            if (b !== null && (b = b < 0 ? 0 : s(b),this.div.css("top", b),c))this.y = b;
            return this
        },autoPos:function(a, b) {
            var c = w(a) || 0,d = w(b) || 0,e = fa();
            if (this._alignEl) {
                var g = f(this._alignEl),i = g.pos(),c = O(g[0].clientWidth / 2 - c / 2),d = O(g[0].clientHeight / 2 - d / 2);
                x = c < 0 ? i.x : i.x + c;
                y = d < 0 ? i.y : i.y + d
            } else i = G(this.doc),x = O(e.x + (i.clientWidth - c) / 2),y = O(e.y + (i.clientHeight - d) / 2);
            n && F < 7 || Z || (x -= e.x,y -= e.y);
            return this.pos(x, y)
        },remove:function() {
            var a =
                this;
            n && F < 7 && f(a.win).unbind("scroll");
            a.div.remove();
            k(a, function(b) {
                a[b] = null
            });
            return this
        },show:function() {
            this.div.show();
            return this
        },hide:function() {
            this.div.hide();
            return this
        },draggable:function(a) {
            var b = this,a = a || {};
            a.moveEl = b.div;
            a.moveFn = function(a, d, e, f, i, h) {
                if ((a += i) < 0)a = 0;
                if ((d += h) < 0)d = 0;
                b.pos(a, d)
            };
            La(a);
            return b
        }});
        f.widget = Na;
        C(ua, U, {init:function(a) {
            function b() {
                var b = Ma(c.iframe);
                b.open();
                if (h)b.domain = document.domain;
                b.write(Ob(d, e, g, i));
                b.close();
                c.win = c.iframe[0].contentWindow;
                c.doc = b;
                var j = qb(b);
                c.afterChange(function() {
                    j.selection()
                });
                Q && f(b).click(function(a) {
                    f(a.target).name === "img" && (j.selection(!0),j.range.selectNode(a.target),j.select())
                });
                n && f(b).keydown(function(a) {
                    if (a.which == 8) {
                        j.selection();
                        var b = j.range;
                        b.isControl() && (b.collapse(!0),f(b.startContainer.childNodes[b.startOffset]).remove(),a.preventDefault())
                    }
                });
                c.cmd = j;
                c.html(ba(c.srcElement));
                n ? (b.body.disabled = !0,b.body.contentEditable = !0,b.body.removeAttribute("disabled")) : b.designMode = "on";
                a.afterCreate &&
                a.afterCreate.call(c)
            }

            var c = this;
            ua.parent.init.call(c, a);
            c.srcElement = f(a.srcElement);
            c.div.addClass("ke-edit");
            c.designMode = o(a.designMode, !0);
            c.beforeGetHtml = a.beforeGetHtml;
            c.beforeSetHtml = a.beforeSetHtml;
            c.afterSetHtml = a.afterSetHtml;
            var d = o(a.themesPath, ""),e = a.bodyClass,g = a.cssPath,i = a.cssData,h = location.host.replace(/:\d+/, "") !== document.domain,j = "document.open();" + (h ? 'document.domain="' + document.domain + '";' : "") + "document.close();",j = n ? ' src="javascript:void(function(){' + encodeURIComponent(j) +
                '}())"' : "";
            c.iframe = f('<iframe class="ke-edit-iframe" hidefocus="true" frameborder="0"' + j + "></iframe>").css("width", "100%");
            c.textarea = f('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css("width", "100%");
            c.width && c.setWidth(c.width);
            c.height && c.setHeight(c.height);
            c.designMode ? c.textarea.hide() : c.iframe.hide();
            h && c.iframe.bind("load", function() {
                c.iframe.unbind("load");
                n ? b() : setTimeout(b, 0)
            });
            c.div.append(c.iframe);
            c.div.append(c.textarea);
            c.srcElement.hide();
            !h && b()
        },setWidth:function(a) {
            this.div.css("width",
                s(a));
            return this
        },setHeight:function(a) {
            a = s(a);
            this.div.css("height", a);
            this.iframe.css("height", a);
            if (n && F < 8 || Z)a = s(w(a) - 2);
            this.textarea.css("height", a);
            return this
        },remove:function() {
            var a = this.doc;
            f(a.body).unbind();
            f(a).unbind();
            f(this.win).unbind();
            ba(this.srcElement, this.html());
            this.srcElement.show();
            a.write("");
            this.iframe.unbind();
            this.textarea.unbind();
            ua.parent.remove.call(this)
        },html:function(a, b) {
            var c = this.doc;
            if (this.designMode) {
                var d = c.body;
                if (a === m)return a = b ? "<!doctype html><html>" +
                    d.parentNode.innerHTML + "</html>" : d.innerHTML,this.beforeGetHtml && (a = this.beforeGetHtml(a)),Ra && a == "<br />" && (a = ""),a;
                this.beforeSetHtml && (a = this.beforeSetHtml(a));
                n ? (d.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" />' + a,(c = f("#__kindeditor_temp_tag__", c)) && c.remove()) : d.innerHTML = a;
                this.afterSetHtml && this.afterSetHtml();
                return this
            }
            if (a === m)return this.textarea.val();
            this.textarea.val(a);
            return this
        },design:function(a) {
            if (a === m ? !this.designMode : a) {
                if (!this.designMode)a = this.html(),
                    this.designMode = !0,this.html(a),this.textarea.hide(),this.iframe.show()
            } else if (this.designMode)a = this.html(),this.designMode = !1,this.html(a),this.iframe.hide(),this.textarea.show();
            return this.focus()
        },focus:function() {
            this.designMode ? this.win.focus() : this.textarea[0].focus();
            return this
        },blur:function() {
            if (n) {
                var a = f('<input type="text" style="float:left;width:0;height:0;padding:0;margin:0;border:0;" value="" />', this.div);
                this.div.append(a);
                a[0].focus();
                a.remove()
            } else this.designMode ? this.win.blur() :
                this.textarea[0].blur();
            return this
        },afterChange:function(a) {
            function b(b) {
                setTimeout(function() {
                    a(b)
                }, 1)
            }

            var c = this.doc,d = c.body;
            f(c).keyup(function(b) {
                !b.ctrlKey && !b.altKey && Ta[b.which] && a(b)
            });
            f(c).mouseup(a).contextmenu(a);
            f(this.win).blur(a);
            f(d).bind("paste", b);
            f(d).bind("cut", b);
            return this
        }});
        f.edit = rb;
        f.iframeDoc = Ma;
        C(Oa, U, {init:function(a) {
            function b(a) {
                a = f(a);
                if (a.hasClass("ke-outline"))return a;
                if (a.hasClass("ke-toolbar-icon"))return a.parent()
            }

            function c(a, c) {
                var d = b(a.target);
                if (d &&
                    !d.hasClass("ke-disabled") && !d.hasClass("ke-selected"))d[c]("ke-on")
            }

            var d = this;
            Oa.parent.init.call(d, a);
            d.disableMode = o(a.disableMode, !1);
            d.noDisableItemMap = v(o(a.noDisableItems, []));
            d._itemMap = {};
            d.div.addClass("ke-toolbar").bind("contextmenu,mousedown,mousemove", function(a) {
                a.preventDefault()
            });
            d.div.mouseover(
                function(a) {
                    c(a, "addClass")
                }).mouseout(
                function(a) {
                    c(a, "removeClass")
                }).click(function(a) {
                    var c = b(a.target);
                    c && !c.hasClass("ke-disabled") && d.options.click.call(this, a, c.attr("data-name"))
                })
        },
            get:function(a) {
                if (this._itemMap[a])return this._itemMap[a];
                return this._itemMap[a] = f("span.ke-icon-" + a, this.div).parent()
            },select:function(a) {
                sb.call(this, a, function(a) {
                    a.addClass("ke-selected")
                });
                return self
            },unselect:function(a) {
                sb.call(this, a, function(a) {
                    a.removeClass("ke-selected").removeClass("ke-on")
                });
                return self
            },enable:function(a) {
                if (a = a.get ? a : this.get(a))a.removeClass("ke-disabled"),a.opacity(1);
                return this
            },disable:function(a) {
                if (a = a.get ? a : this.get(a))a.removeClass("ke-selected").addClass("ke-disabled"),
                    a.opacity(0.5);
                return this
            },disableAll:function(a, b) {
                var c = this,d = c.noDisableItemMap;
                b && (d = v(b));
                (a === m ? !c.disableMode : a) ? (f("span.ke-outline", c.div).each(function() {
                    var a = f(this);
                    name = a[0].getAttribute("data-name", 2);
                    d[name] || c.disable(a)
                }),c.disableMode = !0) : (f("span.ke-outline", c.div).each(function() {
                    var a = f(this);
                    name = a[0].getAttribute("data-name", 2);
                    d[name] || c.enable(a)
                }),c.disableMode = !1);
                return c
            }});
        f.toolbar = tb;
        C(va, U, {init:function(a) {
            a.z = a.z || 811213;
            va.parent.init.call(this, a);
            this.centerLineMode =
                o(a.centerLineMode, !0);
            this.div.addClass("ke-menu").bind("click,mousedown", function(a) {
                a.stopPropagation()
            })
        },addItem:function(a) {
            if (a.title === "-")this.div.append(f('<div class="ke-menu-separator"></div>')); else {
                var b = f('<div class="ke-menu-item"></div>'),c = f('<div class="ke-inline-block ke-menu-item-left"></div>'),d = f('<div class="ke-inline-block ke-menu-item-right"></div>'),e = s(a.height),g = a.iconClass;
                this.div.append(b);
                e && (b.css("height", e),d.css("line-height", e));
                var i;
                this.centerLineMode && (i =
                    f('<div class="ke-inline-block ke-menu-item-center"></div>'),e && i.css("height", e));
                b.mouseover(
                    function() {
                        f(this).addClass("ke-menu-item-on");
                        i && i.addClass("ke-menu-item-center-on")
                    }).mouseout(
                    function() {
                        f(this).removeClass("ke-menu-item-on");
                        i && i.removeClass("ke-menu-item-center-on")
                    }).click(
                    function(b) {
                        a.click.call(f(this));
                        b.stopPropagation()
                    }).append(c);
                i && b.append(i);
                b.append(d);
                a.checked && (g = "ke-icon-checked");
                c.html('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ' + g + '"></span>');
                d.html(a.title);
                return this
            }
        },remove:function() {
            this.options.beforeRemove && this.options.beforeRemove.call(this);
            f(".ke-menu-item", this.div[0]).unbind();
            va.parent.remove.call(this);
            return this
        }});
        f.menu = Pa;
        C(wa, U, {init:function(a) {
            a.z = a.z || 811213;
            wa.parent.init.call(this, a);
            var b = a.colors || [
                ["#E53333","#E56600","#FF9900","#64451D","#DFC5A4","#FFE500"],
                ["#009900","#006600","#99BB00","#B8D100","#60D978","#00D5FF"],
                ["#337FE5","#003399","#4C33E5","#9933E5","#CC33E5","#EE33EE"],
                ["#FFFFFF","#CCCCCC","#999999",
                    "#666666","#333333","#000000"]
            ];
            this.selectedColor = (a.selectedColor || "").toLowerCase();
            this._cells = [];
            this.div.addClass("ke-colorpicker").bind("click,mousedown", function(a) {
                a.stopPropagation()
            });
            a = this.doc.createElement("table");
            this.div.append(a);
            a.className = "ke-colorpicker-table";
            a.cellPadding = 0;
            a.cellSpacing = 0;
            a.border = 0;
            var c = a.insertRow(0),d = c.insertCell(0);
            d.colSpan = b[0].length;
            this._addAttr(d, "", "ke-colorpicker-cell-top");
            for (var e = 0; e < b.length; e++)for (var c = a.insertRow(e + 1),f = 0; f < b[e].length; f++)d =
                c.insertCell(f),this._addAttr(d, b[e][f], "ke-colorpicker-cell")
        },_addAttr:function(a, b, c) {
            var d = this,a = f(a).addClass(c);
            d.selectedColor === b.toLowerCase() && a.addClass("ke-colorpicker-cell-selected");
            a.attr("title", b || d.options.noColor);
            a.mouseover(function() {
                f(this).addClass("ke-colorpicker-cell-on")
            });
            a.mouseout(function() {
                f(this).removeClass("ke-colorpicker-cell-on")
            });
            a.click(function(a) {
                a.stop();
                d.options.click.call(f(this), b)
            });
            b ? a.append(f('<div class="ke-colorpicker-cell-color"></div>').css("background-color",
                b)) : a.html(d.options.noColor);
            d._cells.push(a)
        },remove:function() {
            k(this._cells, function() {
                this.unbind()
            });
            wa.parent.remove.call(this);
            return this
        }});
        f.colorpicker = ub;
        C(vb, {init:function(a) {
            var b = f(a.button),c = a.fieldName || "file",d = a.url || "",e = b.val(),g = b[0].className || "",i = "kindeditor_upload_iframe_" + (new Date).getTime(),c = ['<div class="ke-inline-block ' + g + '">','<iframe name="' + i + '" style="display:none;"></iframe>','<form class="ke-inline-block ke-form" method="post" enctype="multipart/form-data" target="' +
                i + '" action="' + d + '">','<span class="ke-inline-block ke-upload-area"><span class="ke-button-common ke-button-outer">','<input type="button" class="ke-button-common ke-button" value="' + e + '" />',"</span>",'<input type="file" class="ke-upload-file" name="' + c + '" tabindex="-1" />',"</span></form></div>"].join(""),c = f(c, b.doc);
            b.hide();
            b.before(c);
            this.div = c;
            this.button = b;
            this.iframe = f("iframe", c);
            this.form = f("form", c);
            this.fileBox = f(".ke-upload-file", c).width(f(".ke-button-outer").width());
            this.options =
                a
        },submit:function() {
            var a = this,b = a.iframe;
            b.bind("load", function() {
                b.unbind();
                var c,d = f.iframeDoc(b).body.innerHTML;
                try {
                    c = f.json(d)
                } catch(e) {
                    alert(f.DEBUG ? d : a.lang("invalidJson"))
                }
                c && a.options.afterUpload.call(a, c)
            });
            a.form[0].submit();
            return a
        },remove:function() {
            this.fileBox && this.fileBox.unbind();
            this.div.remove();
            this.button.show();
            return this
        }});
        f.uploadbutton = function(a) {
            return new vb(a)
        };
        C(xa, U, {init:function(a) {
            a.z = a.z || 811213;
            xa.parent.init.call(this, a);
            var b = a.title,c = f(a.body, this.doc),
                d = a.previewBtn,e = a.yesBtn,g = a.noBtn,i = a.closeBtn,h = o(a.shadowMode, !0),j = o(a.showMask, !0);
            this.div.addClass("ke-dialog").bind("click,mousedown",
                function(a) {
                    a.stopPropagation()
                }).addClass("ke-dialog-" + (h ? "" : "no-") + "shadow");
            h = f('<div class="ke-dialog-header"></div>');
            this.div.append(h);
            h.html(b);
            this.closeIcon = f('<span class="ke-dialog-icon-close" title="' + i.name + '"></span>').click(i.click);
            h.append(this.closeIcon);
            this.draggable({clickEl:h,beforeDrag:a.beforeDrag});
            a = f('<div class="ke-dialog-body"></div>');
            this.div.append(a);
            a.append(c);
            var l = f('<div class="ke-dialog-footer"></div>');
            (d || e || g) && this.div.append(l);
            k([
                {btn:d,name:"preview"},
                {btn:e,name:"yes"},
                {btn:g,name:"no"}
            ], function() {
                if (this.btn) {
                    var a = this.btn,a = a || {},b = a.name || "",c = f('<span class="ke-button-common ke-button-outer" title="' + b + '"></span>'),b = f('<input class="ke-button-common ke-button" type="button" value="' + b + '" />');
                    a.click && b.click(a.click);
                    c.append(b);
                    c.addClass("ke-dialog-" + this.name);
                    l.append(c)
                }
            });
            this.height && a.height(w(this.height) -
                h.height() - l.height());
            this.mask = null;
            if (j)c = G(this.doc),this.mask = Na({x:0,y:0,z:this.z - 1,cls:"ke-dialog-mask",width:Math.max(c.scrollWidth, c.clientWidth),height:Math.max(c.scrollHeight, c.clientHeight)});
            this.autoPos(this.div.width(), this.div.height());
            this.footerDiv = l;
            this.bodyDiv = a;
            this.headerDiv = h
        },remove:function() {
            this.options.beforeRemove && this.options.beforeRemove.call(this);
            this.mask && this.mask.remove();
            this.closeIcon.unbind();
            f("input", this.div).unbind();
            this.footerDiv.unbind();
            this.bodyDiv.unbind();
            this.headerDiv.unbind();
            xa.parent.remove.call(this);
            return this
        }});
        f.dialog = wb;
        f.tabs = function(a) {
            var b = Na(a),c = b.remove,d = a.afterSelect,a = b.div,e = [];
            a.addClass("ke-tabs").bind("contextmenu,mousedown,mousemove", function(a) {
                a.preventDefault()
            });
            var g = f('<ul class="ke-tabs-ul ke-clearfix"></ul>');
            a.append(g);
            b.add = function(a) {
                var b = f('<li class="ke-tabs-li">' + a.title + "</li>");
                b.data("tab", a);
                e.push(b);
                g.append(b)
            };
            b.selectedIndex = 0;
            b.select = function(a) {
                b.selectedIndex = a;
                k(e, function(c, d) {
                    d.unbind();
                    c === a ? (d.addClass("ke-tabs-li-selected"),f(d.data("tab").panel).show("")) : (d.removeClass("ke-tabs-li-selected").removeClass("ke-tabs-li-on").mouseover(
                        function() {
                            f(this).addClass("ke-tabs-li-on")
                        }).mouseout(
                        function() {
                            f(this).removeClass("ke-tabs-li-on")
                        }).click(function() {
                            b.select(c)
                        }),f(d.data("tab").panel).hide())
                });
                d && d.call(b, a)
            };
            b.remove = function() {
                k(e, function() {
                    this.remove()
                });
                g.remove();
                c.call(b)
            };
            return b
        };
        f.loadScript = Qa;
        f.ajax = function(a, b, c, d) {
            var c = c || "GET",e = A.XMLHttpRequest ? new A.XMLHttpRequest :
                new ActiveXObject("Microsoft.XMLHTTP");
            e.open(c, a, !0);
            e.onreadystatechange = function() {
                e.readyState == 4 && e.status == 200 && b && (d = Wa(B(e.responseText)),b(d))
            };
            if (c == "POST") {
                var f = [];
                k(d, function(a, b) {
                    f.push(encodeURIComponent(a) + "=" + encodeURIComponent(b))
                });
                try {
                    e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                } catch(i) {
                }
                e.send(f.join("&"))
            } else e.send(null)
        };
        var ka = {},L = {};
        Sa.prototype = {lang:function(a) {
            return zb(a, this.langType)
        },loadPlugin:function(a, b) {
            var c = this;
            if (ka[a]) {
                if (c._calledPlugins[a])return b &&
                    b.call(c),c;
                ka[a].call(c, KindEditor);
                b && b.call(c);
                c._calledPlugins[a] = !0;
                return c
            }
            Qa(c.pluginsPath + a + "/" + a + ".js?ver=" + encodeURIComponent(f.DEBUG ? ya : "4.0 beta (2011-08-17)"), function() {
                ka[a] && c.loadPlugin(a, b)
            });
            return c
        },handler:function(a, b) {
            var c = this;
            c._handlers[a] || (c._handlers[a] = []);
            if (Ua(b))return c._handlers[a].push(b),c;
            k(c._handlers[a], function() {
                b = this.call(c, b)
            });
            return b
        },clickToolbar:function(a, b) {
            var c = this,d = "clickToolbar" + a;
            if (b === m) {
                if (c._handlers[d])return c.handler(d);
                c.loadPlugin(a,
                    function() {
                        c.handler(d)
                    });
                return c
            }
            return c.handler(d, b)
        },updateState:function() {
            var a = this;
            k("justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,subscript,superscript,bold,italic,underline,strikethrough".split(","), function(b, c) {
                a.cmd.state(c) ? a.toolbar.select(c) : a.toolbar.unselect(c)
            });
            return a
        },addContextmenu:function(a) {
            this._contextmenus.push(a);
            return this
        },afterCreate:function(a) {
            return this.handler("afterCreate", a)
        },beforeRemove:function(a) {
            return this.handler("beforeRemove",
                a)
        },beforeGetHtml:function(a) {
            return this.handler("beforeGetHtml", a)
        },beforeSetHtml:function(a) {
            return this.handler("beforeSetHtml", a)
        },afterSetHtml:function(a) {
            return this.handler("afterSetHtml", a)
        },create:function() {
            function a(a, c, d) {
                d = o(d, !0);
                if (a && a >= b.minWidth && (b.resize(a, null),d))b.width = s(a);
                if (c && c >= b.minHeight && (b.resize(null, c),d))b.height = s(c)
            }

            var b = this,c = b.fullscreenMode;
            if (b.isCreated)return b;
            c ? G().style.overflow = "hidden" : G().style.overflow = "";
            var d = c ? G().clientWidth + "px" : b.width,
                e = c ? G().clientHeight + "px" : b.height;
            if (n && F < 8 || Z)e = s(w(e) + 2);
            var g = b.container = f(b.layout);
            c ? f(document.body).append(g) : b.srcElement.before(g);
            var i = f(".toolbar", g),h = f(".edit", g),j = b.statusbar = f(".statusbar", g);
            g.removeClass("container").addClass("ke-container ke-container-" + b.themeType).css("width", d);
            c ? (g.css({position:"absolute",left:0,top:0,"z-index":811211}),b._scrollPos = fa(),A.scrollTo(0, 0),f(document.body).css({height:"1px",overflow:"hidden"}),f(document.body.parentNode).css("overflow", "hidden")) :
                b._scrollPos && (f(document.body).css({height:"",overflow:""}),f(document.body.parentNode).css("overflow", ""),A.scrollTo(b._scrollPos.x, b._scrollPos.y));
            var l = [];
            f.each(b.items, function(a, c) {
                c == "|" ? l.push('<span class="ke-inline-block ke-separator"></span>') : c == "/" ? l.push("<br />") : (l.push('<span class="ke-inline-block ke-outline" data-name="' + c + '" title="' + b.lang(c) + '">'),l.push('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + c + '"></span></span>'))
            });
            var i = b.toolbar = tb({src:i,
                html:l.join(""),noDisableItems:b.noDisableItems,click:function(a, c) {
                    a.stop();
                    if (b.menu) {
                        var d = b.menu.name;
                        b.hideMenu();
                        if (d === c)return
                    }
                    b.clickToolbar(c)
                }}),k = b.edit = rb({height:w(e) - i.div.height(),src:h,srcElement:b.srcElement,designMode:b.designMode,themesPath:b.themesPath,bodyClass:b.bodyClass,cssPath:b.cssPath,cssData:b.cssData,beforeGetHtml:function(a) {
                a = b.beforeGetHtml(a);
                return Y(a, b.filterMode ? b.htmlTags : null, b.urlType, b.wellFormatMode, b.indentChar)
            },beforeSetHtml:function(a) {
                a = b.beforeSetHtml(a);
                return Y(a, b.filterMode ? b.htmlTags : null, "", !1)
            },afterSetHtml:function() {
                b.afterSetHtml()
            },afterCreate:function() {
                b.edit = k = this;
                b.cmd = k.cmd;
                b._docMousedownFn = function() {
                    b.menu && b.hideMenu()
                };
                f(k.doc, document).mousedown(b._docMousedownFn);
                Pb.call(b);
                Qb.call(b);
                Rb.call(b);
                Sb.call(b);
                k.afterChange(function() {
                    k.designMode && (b.updateState(),b.addBookmark(),b.options.afterChange && b.options.afterChange.call(b))
                });
                k.textarea.keyup(function(a) {
                    !a.ctrlKey && !a.altKey && Fb[a.which] && b.options.afterChange && b.options.afterChange.call(b)
                });
                b.readonlyMode && b.readonly();
                b.isCreated = !0;
                b.afterCreate();
                b.options.afterCreate && b.options.afterCreate.call(b)
            }});
            j.removeClass("statusbar").addClass("ke-statusbar").append('<span class="ke-inline-block ke-statusbar-center-icon"></span>').append('<span class="ke-inline-block ke-statusbar-right-icon"></span>');
            b.menu = b.contextmenu = null;
            b.dialogs = [];
            f(A).unbind("resize");
            b.resize(d, e);
            c ? (f(A).bind("resize", function() {
                b.isCreated && a(G().clientWidth, G().clientHeight, !1)
            }),i.select("fullscreen"),j.first().css("visibility",
                "hidden"),j.last().css("visibility", "hidden")) : (b.resizeType > 0 ? La({moveEl:g,clickEl:j,moveFn:function(b, c, d, e, f, h) {
                e += h;
                a(null, e)
            }}) : j.first().css("visibility", "hidden"),b.resizeType === 2 ? La({moveEl:g,clickEl:j.last(),moveFn:function(b, c, d, e, f, h) {
                d += f;
                e += h;
                a(d, e)
            }}) : j.last().css("visibility", "hidden"));
            return b
        },remove:function() {
            var a = this;
            if (!a.isCreated)return a;
            a.beforeRemove();
            a.menu && a.hideMenu();
            k(a.dialogs, function() {
                a.hideDialog()
            });
            f(document).unbind("mousedown", a._docMousedownFn);
            a.toolbar.remove();
            a.edit.remove();
            a.statusbar.last().unbind();
            a.statusbar.unbind();
            a.container.remove();
            a.container = a.toolbar = a.edit = a.menu = null;
            a.dialogs = [];
            a.isCreated = !1;
            return a
        },resize:function(a, b) {
            a !== null && this.container.css("width", s(a));
            b !== null && (b = w(b) - this.toolbar.div.height() - this.statusbar.height(),b > 0 && this.edit.setHeight(b));
            return this
        },select:function() {
            this.isCreated && this.cmd.select();
            return this
        },html:function(a) {
            if (a === m)return this.isCreated ? this.edit.html() : ba(this.srcElement);
            this.isCreated ?
                this.edit.html(a) : ba(this.srcElement, a);
            return this
        },fullHtml:function() {
            return this.isCreated ? this.edit.html(m, !0) : ""
        },text:function(a) {
            return a === m ? B(this.html().replace(/<(?!img|embed).*?>/ig, "").replace(/&nbsp;/ig, " ")) : this.html(Va(a))
        },isEmpty:function() {
            return B(this.text().replace(/\r\n|\n|\r/, "")) === ""
        },selectedHtml:function() {
            return this.isCreated ? this.cmd.range.html() : ""
        },count:function(a) {
            a = (a || "html").toLowerCase();
            if (a === "html")return V(this.html()).length;
            if (a === "text")return this.text().replace(/<(?:img|embed).*?>/ig,
                "K").replace(/\r\n|\n|\r/g, "").length;
            return 0
        },exec:function(a) {
            var a = a.toLowerCase(),b = this.cmd,c = I(a, "selectall,copy,paste,print".split(",")) < 0;
            c && this.addBookmark(!1);
            b[a].apply(b, Aa(arguments, 1));
            c && (this.updateState(),this.addBookmark(!1),this.options.afterChange && this.options.afterChange.call(this));
            return this
        },insertHtml:function(a) {
            if (!this.isCreated)return this;
            a = this.beforeSetHtml(a);
            this.exec("inserthtml", a);
            return this
        },appendHtml:function(a) {
            this.html(this.html() + a);
            if (this.isCreated)a =
                this.cmd,a.range.selectNodeContents(a.doc.body).collapse(!1),a.select();
            return this
        },sync:function() {
            ba(this.srcElement, this.html());
            return this
        },focus:function() {
            this.isCreated ? this.edit.focus() : this.srcElement[0].focus();
            return this
        },blur:function() {
            this.isCreated ? this.edit.blur() : this.srcElement[0].blur();
            return this
        },addBookmark:function(a) {
            var a = o(a, !0),b = this.edit,c = b.html();
            if (a && this._undoStack.length > 0 && Math.abs(c.length - V(this._undoStack[this._undoStack.length - 1].html).length) < this.minChangeSize)return this;
            b.designMode && !this._firstAddBookmark ? (c = this.cmd.range,a = c.createBookmark(!0),a.html = b.html(),c.moveToBookmark(a)) : a = {html:b.html()};
            this._firstAddBookmark = !1;
            Ab(this._undoStack, a);
            return this
        },undo:function() {
            return Bb.call(this, this._undoStack, this._redoStack)
        },redo:function() {
            return Bb.call(this, this._redoStack, this._undoStack)
        },fullscreen:function(a) {
            this.fullscreenMode = a === m ? !this.fullscreenMode : a;
            return this.remove().create()
        },readonly:function(a) {
            var a = o(a, !0),b = this,c = b.edit,d = c.doc;
            b.designMode ?
                b.toolbar.disableAll(a, []) : k(b.noDisableItems, function() {
                b.toolbar[a ? "disable" : "enable"](this)
            });
            n ? d.body.contentEditable = !a : d.designMode = a ? "off" : "on";
            c.textarea[0].disabled = a
        },createMenu:function(a) {
            var b = this.toolbar.get(a.name),c = b.pos();
            a.x = c.x;
            a.y = c.y + b.height();
            a.selectedColor !== m ? (a.cls = "ke-colorpicker-" + this.themeType,a.noColor = this.lang("noColor"),this.menu = ub(a)) : (a.cls = "ke-menu-" + this.themeType,a.centerLineMode = !1,this.menu = Pa(a));
            return this.menu
        },hideMenu:function() {
            this.menu.remove();
            this.menu = null;
            return this
        },hideContextmenu:function() {
            this.contextmenu.remove();
            this.contextmenu = null;
            return this
        },createDialog:function(a) {
            var b = this;
            a.autoScroll = o(a.autoScroll, !0);
            a.shadowMode = o(a.shadowMode, b.shadowMode);
            a.closeBtn = o(a.closeBtn, {name:b.lang("close"),click:function() {
                b.hideDialog().focus()
            }});
            a.noBtn = o(a.noBtn, {name:b.lang(a.yesBtn ? "no" : "close"),click:function() {
                b.hideDialog().focus()
            }});
            if (b.dialogAlignType != "page")a.alignEl = b.container;
            a.cls = "ke-dialog-" + b.themeType;
            if (b.dialogs.length >
                0) {
                var c = b.dialogs[b.dialogs.length - 1];
                b.dialogs[0].mask.div.css("z-index", c.z + 1);
                a.z = c.z + 2;
                a.showMask = !1
            }
            a = wb(a);
            b.dialogs.push(a);
            return a
        },hideDialog:function() {
            this.dialogs.length > 0 && this.dialogs.pop().remove();
            this.dialogs.length > 0 && this.dialogs[0].mask.div.css("z-index", this.dialogs[this.dialogs.length - 1].z - 1);
            return this
        }};
        n && F < 7 && T(document, "BackgroundImageCache", !0);
        xb("core", function(a) {
            var b = this,c = {undo:"Z",redo:"Y",bold:"B",italic:"I",underline:"U",print:"P",selectall:"A"};
            b.afterSetHtml(function() {
                b.options.afterChange &&
                b.options.afterChange.call(b)
            });
            if (b.syncType == "form") {
                for (var d = a(b.srcElement),e = !1; d = d.parent();)if (d.name == "form") {
                    e = !0;
                    break
                }
                if (e) {
                    d.bind("submit", function() {
                        b.sync()
                    });
                    var f = a('[type="reset"]', d);
                    f.click(function() {
                        b.html(b.initContent)
                    });
                    b.beforeRemove(function() {
                        d.unbind();
                        f.unbind()
                    })
                }
            }
            b.clickToolbar("source", function() {
                if (!Cb)b.edit.designMode ? (b.toolbar.disableAll(!0),b.edit.design(!1),b.toolbar.select("source")) : (b.toolbar.disableAll(!1),b.edit.design(!0),b.toolbar.unselect("source")),
                    b.designMode = b.edit.designMode
            });
            b.afterCreate(function() {
                b.designMode || b.toolbar.disableAll(!0).select("source")
            });
            b.clickToolbar("fullscreen", function() {
                b.fullscreen()
            });
            var i = !1;
            b.afterCreate(function() {
                a(b.edit.doc, b.edit.textarea).keyup(function(a) {
                    a.which == 27 && setTimeout(function() {
                        b.fullscreen()
                    }, 0)
                });
                if (i) {
                    if (n && !b.designMode)return;
                    b.focus()
                }
                i || (i = !0)
            });
            k("undo,redo".split(","), function(a, d) {
                c[d] && b.afterCreate(function() {
                    Ba(this.edit.doc, c[d], function() {
                        b.clickToolbar(d)
                    })
                });
                b.clickToolbar(d,
                    function() {
                        b[d]()
                    })
            });
            b.clickToolbar("formatblock", function() {
                var a = b.lang("formatblock.formatBlock"),c = {h1:28,h2:24,h3:18,H4:14,p:12},d = b.cmd.val("formatblock"),e = b.createMenu({name:"formatblock",width:b.langType == "en" ? 200 : 150});
                k(a, function(a, f) {
                    var h = "font-size:" + c[a] + "px;";
                    a.charAt(0) === "h" && (h += "font-weight:bold;");
                    e.addItem({title:'<span style="' + h + '">' + f + "</span>",height:c[a] + 12,checked:d === a || d === f,click:function() {
                        b.select().exec("formatblock", "<" + a.toUpperCase() + ">").hideMenu()
                    }})
                })
            });
            b.clickToolbar("fontname",
                function() {
                    var a = b.cmd.val("fontname"),c = b.createMenu({name:"fontname",width:150});
                    k(b.lang("fontname.fontName"), function(d, e) {
                        c.addItem({title:'<span style="font-family: ' + d + ';">' + e + "</span>",checked:a === d.toLowerCase() || a === e.toLowerCase(),click:function() {
                            b.exec("fontname", d).hideMenu()
                        }})
                    })
                });
            b.clickToolbar("fontsize", function() {
                var a = b.cmd.val("fontsize");
                menu = b.createMenu({name:"fontsize",width:150});
                k(b.fontSizeTable, function(c, d) {
                    menu.addItem({title:'<span style="font-size:' + d + ';">' + d + "</span>",
                        height:w(d) + 12,checked:a === d,click:function() {
                            b.exec("fontsize", d).hideMenu()
                        }})
                })
            });
            k("forecolor,hilitecolor".split(","), function(a, c) {
                b.clickToolbar(c, function() {
                    b.createMenu({name:c,selectedColor:b.cmd.val(c) || "default",colors:b.colorTable,click:function(a) {
                        b.exec(c, a).hideMenu()
                    }})
                })
            });
            k("cut,copy,paste".split(","), function(a, c) {
                b.clickToolbar(c, function() {
                    b.focus();
                    try {
                        b.exec(c, null)
                    } catch(a) {
                        alert(b.lang(c + "Error"))
                    }
                })
            });
            b.clickToolbar("about", function() {
                b.createDialog({name:"about",width:300,
                    title:b.lang("about"),body:'<div style="margin:20px;"><div>KindEditor 4.0 beta (2011-08-17)</div><div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div></div>'})
            });
            b.plugin.getSelectedLink = function() {
                return b.cmd.commonAncestor("a")
            };
            b.plugin.getSelectedImage = function() {
                var c = b.edit.cmd.range,d = c.startContainer,e = c.startOffset;
                if (!Q && !c.isControl())return null;
                c = a(d.childNodes[e]);
                if (!c || c.name !== "img" || /^ke-\w+$/i.test(c[0].className))return null;
                return c
            };
            b.plugin.getSelectedFlash = function() {
                var c = b.edit.cmd.range,d = c.startContainer,e = c.startOffset;
                if (!Q && !c.isControl())return null;
                c = a(d.childNodes[e]);
                if (!c || c.name !== "img" || c[0].className !== "ke-flash")return null;
                return c
            };
            b.plugin.getSelectedMedia = function() {
                var c = b.edit.cmd.range,d = c.startContainer,e = c.startOffset;
                if (!Q && !c.isControl())return null;
                c = a(d.childNodes[e]);
                if (!c || c.name !== "img" || !/^ke-\w+$/.test(c[0].className))return null;
                if (c[0].className == "ke-flash")return null;
                return c
            };
            k("link,image,flash,media".split(","), function(a, c) {
                var d = c.charAt(0).toUpperCase() + c.substr(1);
                k("edit,delete".split(","), function(a, e) {
                    b.addContextmenu({title:b.lang(e + d),click:function() {
                        b.loadPlugin(c, function() {
                            b.plugin[c][e]();
                            b.hideMenu()
                        })
                    },cond:b.plugin["getSelected" + d],width:150,iconClass:e == "edit" ? "ke-icon-" + c : m})
                });
                b.addContextmenu({title:"-"})
            });
            b.beforeGetHtml(function(a) {
                return a.replace(/<img[^>]*class="?ke-\w+"?[^>]*>/ig, function(a) {
                    a = N(a);
                    a = gb(a["data-ke-tag"]);
                    return Da(a)
                })
            });
            b.beforeSetHtml(function(a) {
                return a.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function(a) {
                    a = N(a);
                    a.src = o(a.src, "");
                    a.width = o(a.width, 0);
                    a.height = o(a.height, 0);
                    return hb(b.themesPath + "common/blank.gif", a)
                })
            });
            b.plugin.getSelectedTable = function() {
                return b.cmd.commonAncestor("table")
            };
            b.plugin.getSelectedRow = function() {
                return b.cmd.commonAncestor("tr")
            };
            b.plugin.getSelectedCell = function() {
                return b.cmd.commonAncestor("td")
            };
            k("prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,rowsplit,colsplit,coldelete,rowdelete,insert,delete".split(","),
                function(a, c) {
                    var d = I(c, ["prop","delete"]) < 0 ? b.plugin.getSelectedCell : b.plugin.getSelectedTable;
                    b.addContextmenu({title:b.lang("table" + c),click:function() {
                        b.loadPlugin("table", function() {
                            b.plugin.table[c]();
                            b.hideMenu()
                        })
                    },cond:d,width:170,iconClass:"ke-icon-table" + c})
                });
            b.addContextmenu({title:"-"});
            k("selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript,hr,print,bold,italic,underline,strikethrough,removeformat,unlink".split(","),
                function(a, d) {
                    c[d] && b.afterCreate(function() {
                        Ba(this.edit.doc, c[d], function() {
                            b.cmd.selection();
                            b.clickToolbar(d)
                        })
                    });
                    b.clickToolbar(d, function() {
                        b.focus().exec(d, null)
                    })
                });
            b.afterCreate(function() {
                var c = b.edit.doc;
                a(c.body).bind("paste", function(a) {
                    b.pasteType === 0 && a.stop()
                });
                a(c.body).bind(n ? "beforepaste" : "paste", function() {
                    if (!(b.pasteType === 0 || a("div.__kindeditor_paste__", c).length > 0)) {
                        var d = b.cmd.selection(),e = d.range.createBookmark(),f = a('<div class="__kindeditor_paste__"></div>', c).css({position:"absolute",
                            width:"1px",height:"1px",overflow:"hidden",left:"-1981px",top:a(e.start).pos().y + "px","white-space":"nowrap"});
                        a(c.body).append(f);
                        d.range.selectNodeContents(f[0]);
                        d.select();
                        setTimeout(function() {
                            d.range.moveToBookmark(e);
                            d.select();
                            Q && (a("div.__kindeditor_paste__", f).each(function() {
                                a(this).after("<br />").remove(!0)
                            }),a("span.Apple-style-span", f).remove(!0),a("meta", f).remove());
                            var c = f.html();
                            f.remove();
                            c !== "" && (b.pasteType === 2 && (c = b.beforeSetHtml(c),c = Y(c, b.filterMode ? b.htmlTags : null)),b.pasteType ===
                                1 && (c = c.replace(/<br[^>]*>/ig, "\n"),c = c.replace(/<\/p><p[^>]*>/ig, "\n"),c = c.replace(/<[^>]+/g, ""),c = c.replace(/&nbsp;/ig, " "),c = c.replace(/\n\s*\n/g, "\n"),c = b.newlineTag == "p" ? c.replace(/^/, "<p>").replace(/$/, "</p>").replace(/\n/g, "</p><p>") : c.replace(/\n/g, "<br />$&")),b.insertHtml(c))
                        }, 0)
                    }
                })
            });
            b.beforeGetHtml(function(a) {
                return a.replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig,
                    function(a, b, c) {
                        return"<script" + unescape(b) + ">" + c + "<\/script>"
                    }).replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/ig,
                    function(a, b, c) {
                        a = a.replace(/(\s+(?:href|src)=")[^"]*(")/i, "$1" + c + "$2");
                        return a = a.replace(/\s+data-ke-src="[^"]*"/i, "")
                    }).replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/ig, function(a, b, c) {
                        return b + c
                    })
            });
            b.beforeSetHtml(function(a) {
                return a.replace(/<script([^>]*)>([\s\S]*?)<\/script>/ig,
                    function(a, b, c) {
                        return'<div class="ke-script" data-ke-script-attr="' + escape(b) + '">' + c + "</div>"
                    }).replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/ig,
                    function(a, b, c, d, e) {
                        if (a.match(/\sdata-ke-src="[^"]*"/i))return a;
                        return b + c + '="' + d + '" data-ke-src="' + d + '"' + e
                    }).replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/ig,
                    function(a, b, c) {
                        return b + "data-ke-" + c
                    }).replace(/<table([^>]*)>/ig, function(a) {
                        if (a.indexOf("ke-zeroborder") >= 0)return a;
                        var b = N(a);
                        if (b.border === m || b.border === "" || b.border === "0")return Ib(a, "ke-zeroborder");
                        return a
                    })
            })
        });
        f.create = function(a, b) {
            function c(a) {
                k(ka, function(b, c) {
                    c.call(a, KindEditor)
                });
                return a.create()
            }

            var b = b || {},d = f(a);
            if (d) {
                b.srcElement = d[0];
                if (!b.width)b.width = d.width();
                if (!b.height)b.height =
                    d.height();
                var e = new Sa(b);
                if (L[e.langType])return c(e);
                Qa(e.langPath + e.langType + ".js?ver=" + encodeURIComponent(f.DEBUG ? ya : "4.0 beta (2011-08-17)"), function() {
                    return c(e)
                });
                return e
            }
        };
        f.plugin = xb;
        f.lang = zb
    }
})(window);
