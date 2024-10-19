import { computed as et, useCssVars as Oo, inject as ze, ref as je, openBlock as ee, createElementBlock as oe, unref as we, createElementVNode as tt, normalizeClass as sn, Fragment as li, renderList as ci, toDisplayString as Bn, createCommentVNode as Yo, onMounted as _i, watch as vi, defineComponent as xr, createBlock as Un, resolveDynamicComponent as Bo, resolveComponent as Uo, getCurrentScope as Fo, onScopeDispose as jo, getCurrentInstance as ko, provide as Ue, nextTick as Go, createVNode as kt, renderSlot as an, mergeProps as Ho } from "vue";
const A_ = {
  install(e) {
    console.log("VueMarzipano installed"), e.component("MarzipanoViewer", M_);
  }
};
var fi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Wo(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function i() {
      return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var n = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(r, i, n.get ? n : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), r;
}
function It() {
}
It.prototype.addEventListener = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e] = r[e] || [];
  i.indexOf(t) < 0 && i.push(t);
};
It.prototype.removeEventListener = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e];
  if (i) {
    var n = i.indexOf(t);
    n >= 0 && i.splice(n, 1);
  }
};
It.prototype.emit = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e], n = Array.prototype.slice.call(arguments, 1);
  if (i)
    for (var s = 0; s < i.length; s++) {
      var a = i[s];
      a.apply(this, n);
    }
};
function Zo(e) {
  for (var t in It.prototype)
    It.prototype.hasOwnProperty(t) && (e.prototype[t] = It.prototype[t]);
}
var Q = Zo;
function Xo() {
  return typeof performance < "u" && performance.now ? function() {
    return performance.now();
  } : function() {
    return Date.now();
  };
}
var pt = Xo(), Fn = pt;
function Qo(e, t) {
  this.fn = e, this.cb = t, this.cfn = null;
}
function Ve(e) {
  this._queue = [], this._delay = e && e.delay || 0, this._paused = e && !!e.paused || !1, this._currentTask = null, this._lastFinished = null;
}
Ve.prototype.length = function() {
  return this._queue.length;
};
Ve.prototype.push = function(e, t) {
  var r = new Qo(e, t), i = this._cancel.bind(this, r);
  return this._queue.push(r), this._next(), i;
};
Ve.prototype.pause = function() {
  this._paused || (this._paused = !0);
};
Ve.prototype.resume = function() {
  this._paused && (this._paused = !1, this._next());
};
Ve.prototype._start = function(e) {
  if (this._currentTask)
    throw new Error("WorkQueue: called start while running task");
  this._currentTask = e;
  var t = this._finish.bind(this, e);
  if (e.cfn = e.fn(t), typeof e.cfn != "function")
    throw new Error("WorkQueue: function is not cancellable");
};
Ve.prototype._finish = function(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask !== e)
    throw new Error("WorkQueue: called finish on wrong task");
  e.cb.apply(null, t), this._currentTask = null, this._lastFinished = Fn(), this._next();
};
Ve.prototype._cancel = function(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask === e)
    e.cfn.apply(null, t);
  else {
    var r = this._queue.indexOf(e);
    r >= 0 && (this._queue.splice(r, 1), e.cb.apply(null, t));
  }
};
Ve.prototype._next = function() {
  if (!this._paused && this._queue.length && !this._currentTask) {
    if (this._lastFinished != null) {
      var e = Fn() - this._lastFinished, t = this._delay - e;
      if (t > 0) {
        setTimeout(this._next.bind(this), t);
        return;
      }
    }
    var r = this._queue.shift();
    this._start(r);
  }
};
var jn = Ve;
function Jo(e, t, r, i) {
  i = i || {};
  var n;
  r != null && r.absoluteWidth != null ? n = r.absoluteWidth / e : r != null && r.relativeWidth != null ? n = r.relativeWidth : n = 1;
  var s;
  r && r.absoluteHeight != null ? s = r.absoluteHeight / t : r != null && r.relativeHeight != null ? s = r.relativeHeight : s = 1;
  var a;
  r != null && r.absoluteX != null ? a = r.absoluteX / e : r != null && r.relativeX != null ? a = r.relativeX : a = 0;
  var o;
  return r != null && r.absoluteY != null ? o = r.absoluteY / t : r != null && r.relativeY != null ? o = r.relativeY : o = 0, i.x = a, i.y = o, i.width = n, i.height = s, i;
}
var kn = Jo;
function qo(e) {
  return function(r) {
    var i, n;
    try {
      n = e();
    } catch (s) {
      i = s;
    } finally {
      i ? r(i) : r(null, n);
    }
  };
}
var Gn = qo;
function Ko(e) {
  var t = !1, r;
  return function() {
    return t || (t = !0, r = e.apply(null, arguments)), r;
  };
}
var gi = Ko, $o = gi;
function eh(e) {
  return function() {
    if (!arguments.length)
      throw new Error("cancelized: expected at least one argument");
    var r = Array.prototype.slice.call(arguments, 0), i = r[r.length - 1] = $o(r[r.length - 1]);
    function n() {
      i.apply(null, arguments);
    }
    return e.apply(null, r), n;
  };
}
var Hn = eh;
function th(e) {
  for (var t in e)
    e.hasOwnProperty(t) && (e[t] = void 0);
}
var X = th;
function wi() {
  this._renderers = {};
}
wi.prototype.set = function(e, t, r) {
  this._renderers[e] || (this._renderers[e] = {}), this._renderers[e][t] = r;
};
wi.prototype.get = function(e, t) {
  var r = this._renderers[e] && this._renderers[e][t];
  return r || null;
};
var rh = wi, ih = Q, nh = jn, sh = kn, ah = Gn, oh = Hn, hh = X, lh = rh;
function ch(e, t) {
  return e.cmp(t);
}
function vh(e, t) {
  return -e.cmp(t);
}
function V(e) {
  this._progressive = !!(e && e.progressive), this._layers = [], this._renderers = [], this._tilesToLoad = [], this._tilesToRender = [], this._tmpVisible = [], this._tmpChildren = [], this._width = 0, this._height = 0, this._tmpRect = {}, this._tmpSize = {}, this._createTextureWorkQueue = new nh(), this._emitRenderInvalid = this._emitRenderInvalid.bind(this), this._rendererRegistry = new lh();
}
ih(V);
V.prototype.destroy = function() {
  this.removeAllLayers(), hh(this);
};
V.prototype.registerRenderer = function(e, t, r) {
  return this._rendererRegistry.set(e, t, r);
};
V.prototype.domElement = function() {
  throw new Error("Stage implementation must override domElement");
};
V.prototype.width = function() {
  return this._width;
};
V.prototype.height = function() {
  return this._height;
};
V.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
V.prototype.setSize = function(e) {
  this._width = e.width, this._height = e.height, this.setSizeForType(), this.emit("resize"), this._emitRenderInvalid();
};
V.prototype.setSizeForType = function(e) {
  throw new Error("Stage implementation must override setSizeForType");
};
V.prototype.loadImage = function() {
  throw new Error("Stage implementation must override loadImage");
};
V.prototype._emitRenderInvalid = function() {
  this.emit("renderInvalid");
};
V.prototype.validateLayer = function(e) {
  throw new Error("Stage implementation must override validateLayer");
};
V.prototype.listLayers = function() {
  return [].concat(this._layers);
};
V.prototype.hasLayer = function(e) {
  return this._layers.indexOf(e) >= 0;
};
V.prototype.addLayer = function(e, t) {
  if (this._layers.indexOf(e) >= 0)
    throw new Error("Layer already in stage");
  if (t == null && (t = this._layers.length), t < 0 || t > this._layers.length)
    throw new Error("Invalid layer position");
  this.validateLayer(e);
  var r = e.geometry().type, i = e.view().type, n = this._rendererRegistry.get(r, i);
  if (!n)
    throw new Error("No " + this.type + " renderer avaiable for " + r + " geometry and " + i + " view");
  var s = this.createRenderer(n);
  this._layers.splice(t, 0, e), this._renderers.splice(t, 0, s), e.addEventListener("viewChange", this._emitRenderInvalid), e.addEventListener("effectsChange", this._emitRenderInvalid), e.addEventListener("fixedLevelChange", this._emitRenderInvalid), e.addEventListener("textureStoreChange", this._emitRenderInvalid), this._emitRenderInvalid();
};
V.prototype.moveLayer = function(e, t) {
  var r = this._layers.indexOf(e);
  if (r < 0)
    throw new Error("No such layer in stage");
  if (t < 0 || t >= this._layers.length)
    throw new Error("Invalid layer position");
  e = this._layers.splice(r, 1)[0];
  var i = this._renderers.splice(r, 1)[0];
  this._layers.splice(t, 0, e), this._renderers.splice(t, 0, i), this._emitRenderInvalid();
};
V.prototype.removeLayer = function(e) {
  var t = this._layers.indexOf(e);
  if (t < 0)
    throw new Error("No such layer in stage");
  var r = this._layers.splice(t, 1)[0], i = this._renderers.splice(t, 1)[0];
  this.destroyRenderer(i), r.removeEventListener("viewChange", this._emitRenderInvalid), r.removeEventListener("effectsChange", this._emitRenderInvalid), r.removeEventListener("fixedLevelChange", this._emitRenderInvalid), r.removeEventListener("textureStoreChange", this._emitRenderInvalid), this._emitRenderInvalid();
};
V.prototype.removeAllLayers = function() {
  for (; this._layers.length > 0; )
    this.removeLayer(this._layers[0]);
};
V.prototype.startFrame = function() {
  throw new Error("Stage implementation must override startFrame");
};
V.prototype.endFrame = function() {
  throw new Error("Stage implementation must override endFrame");
};
V.prototype.render = function() {
  var e, t, r = this._tilesToLoad, i = this._tilesToRender, n = !0, s, a = this._width, o = this._height, h = this._tmpRect, l = this._tmpSize;
  if (!(a <= 0 || o <= 0)) {
    for (this.startFrame(), e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().startFrame();
    for (e = 0; e < this._layers.length; e++) {
      var c = this._layers[e], f = c.effects(), u = c.view(), p = c.textureStore(), m = this._renderers[e], g = this._layers.length - e, y, M;
      if (sh(a, o, f && f.rect, h), !(h.width <= 0 || h.height <= 0)) {
        for (l.width = h.width * this._width, l.height = h.height * this._height, u.setSize(l), m.startLayer(c, h), s = this._collectTiles(c, p), t = 0; t < r.length; t++)
          y = r[t], p.markTile(y);
        for (t = 0; t < i.length; t++)
          y = i[t], M = p.texture(y), m.renderTile(y, M, c, g);
        c.emit("renderComplete", s), s || (n = !1), m.endLayer(c, h);
      }
    }
    for (e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().endFrame();
    this.endFrame(), this.emit("renderComplete", n);
  }
};
V.prototype._collectTiles = function(e, t) {
  var r = this._tilesToLoad, i = this._tilesToRender, n = this._tmpVisible;
  r.length = 0, i.length = 0, n.length = 0, e.visibleTiles(n);
  for (var s = !0, a = 0; a < n.length; a++) {
    var o = n[a], h;
    this._collectTileToLoad(o), t.texture(o) ? (h = !1, this._collectTileToRender(o)) : (h = this._collectChildren(o, t), s = !1), this._collectParents(o, t, h);
  }
  return r.sort(ch), i.sort(vh), s;
};
V.prototype._collectChildren = function(e, t) {
  var r = this._tmpChildren, i = !0;
  do {
    if (r.length = 0, !e.children(r))
      break;
    i = !1;
    for (var n = 0; n < r.length; n++)
      e = r[n], t.texture(e) ? (this._collectTileToLoad(e), this._collectTileToRender(e)) : i = !0;
  } while (i && r.length === 1);
  return i;
};
V.prototype._collectParents = function(e, t, r) {
  for (var i = this._progressive; (i || r) && (e = e.parent()) != null; ) {
    if (r) {
      if (t.texture(e))
        this._collectTileToRender(e), r = !1;
      else if (!this._progressive)
        continue;
    }
    this._collectTileToLoad(e) || (i = !1);
  }
  return r;
};
V.prototype._collectTileToLoad = function(e) {
  return this._collectTileIntoList(e, this._tilesToLoad);
};
V.prototype._collectTileToRender = function(e) {
  return this._collectTileIntoList(e, this._tilesToRender);
};
V.prototype._collectTileIntoList = function(e, t) {
  for (var r = !1, i = 0; i < t.length; i++)
    if (e.equals(t[i])) {
      r = !0;
      break;
    }
  return r || t.push(e), !r;
};
V.prototype.createTexture = function(e, t, r) {
  var i = this;
  function n() {
    return new i.TextureClass(i, e, t);
  }
  var s = oh(ah(n));
  return this._createTextureWorkQueue.push(s, function(a, o) {
    r(a, e, t, o);
  });
};
var fh = V, uh = function() {
  return typeof window < "u" ? window : typeof self < "u" ? self : typeof fi < "u" ? fi : null;
}(), Vn = uh, on = Vn, dh = Q, ph = X, Xr = {
  HTMLImageElement: ["naturalWidth", "naturalHeight"],
  HTMLCanvasElement: ["width", "height"],
  ImageBitmap: ["width", "height"]
};
function it(e) {
  var t = !1;
  for (var r in Xr)
    if (on[r] && e instanceof on[r]) {
      t = !0, this._widthProp = Xr[r][0], this._heightProp = Xr[r][1];
      break;
    }
  if (!t)
    throw new Error("Unsupported pixel source");
  this._element = e;
}
dh(it);
it.prototype.destroy = function() {
  ph(this);
};
it.prototype.element = function() {
  return this._element;
};
it.prototype.width = function() {
  return this._element[this._widthProp];
};
it.prototype.height = function() {
  return this._element[this._heightProp];
};
it.prototype.timestamp = function() {
  return 0;
};
it.prototype.isDynamic = function() {
  return !1;
};
var Mi = it;
function mh(e, t) {
  e.super_ = t;
  var r = function() {
  };
  r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
}
var Le = mh, yh = Le;
function Wn(e) {
  this.constructor.super_.apply(this, arguments), this.message = e;
}
yh(Wn, Error);
var Zn = Wn, Xn = { exports: {} };
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
(function(e) {
  (function(t, r, i) {
    e.exports ? e.exports = i() : t[r] = i();
  })(fi, "bowser", function() {
    var t = !0;
    function r(l) {
      function c(be) {
        var ue = l.match(be);
        return ue && ue.length > 1 && ue[1] || "";
      }
      function f(be) {
        var ue = l.match(be);
        return ue && ue.length > 1 && ue[2] || "";
      }
      var u = c(/(ipod|iphone|ipad)/i).toLowerCase(), p = /like android/i.test(l), m = !p && /android/i.test(l), g = /nexus\s*[0-6]\s*/i.test(l), y = !g && /nexus\s*[0-9]+/i.test(l), M = /CrOS/.test(l), T = /silk/i.test(l), b = /sailfish/i.test(l), S = /tizen/i.test(l), R = /(web|hpw)(o|0)s/i.test(l), x = /windows phone/i.test(l), O = !x && /windows/i.test(l), B = !u && !T && /macintosh/i.test(l), z = !m && !b && !S && !R && /linux/i.test(l), P = f(/edg([ea]|ios)\/(\d+(\.\d+)?)/i), I = c(/version\/(\d+(\.\d+)?)/i), U = /tablet/i.test(l) && !/tablet pc/i.test(l), k = !U && /[^-]mobi/i.test(l), L = /xbox/i.test(l), w;
      /opera/i.test(l) ? w = {
        name: "Opera",
        opera: t,
        version: I || c(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      } : /opr\/|opios/i.test(l) ? w = {
        name: "Opera",
        opera: t,
        version: c(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || I
      } : /SamsungBrowser/i.test(l) ? w = {
        name: "Samsung Internet for Android",
        samsungBrowser: t,
        version: I || c(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /Whale/i.test(l) ? w = {
        name: "NAVER Whale browser",
        whale: t,
        version: c(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
      } : /MZBrowser/i.test(l) ? w = {
        name: "MZ Browser",
        mzbrowser: t,
        version: c(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /coast/i.test(l) ? w = {
        name: "Opera Coast",
        coast: t,
        version: I || c(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      } : /focus/i.test(l) ? w = {
        name: "Focus",
        focus: t,
        version: c(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
      } : /yabrowser/i.test(l) ? w = {
        name: "Yandex Browser",
        yandexbrowser: t,
        version: I || c(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /ucbrowser/i.test(l) ? w = {
        name: "UC Browser",
        ucbrowser: t,
        version: c(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /mxios/i.test(l) ? w = {
        name: "Maxthon",
        maxthon: t,
        version: c(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      } : /epiphany/i.test(l) ? w = {
        name: "Epiphany",
        epiphany: t,
        version: c(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      } : /puffin/i.test(l) ? w = {
        name: "Puffin",
        puffin: t,
        version: c(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      } : /sleipnir/i.test(l) ? w = {
        name: "Sleipnir",
        sleipnir: t,
        version: c(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      } : /k-meleon/i.test(l) ? w = {
        name: "K-Meleon",
        kMeleon: t,
        version: c(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      } : x ? (w = {
        name: "Windows Phone",
        osname: "Windows Phone",
        windowsphone: t
      }, P ? (w.msedge = t, w.version = P) : (w.msie = t, w.version = c(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(l) ? w = {
        name: "Internet Explorer",
        msie: t,
        version: c(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      } : M ? w = {
        name: "Chrome",
        osname: "Chrome OS",
        chromeos: t,
        chromeBook: t,
        chrome: t,
        version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : /edg([ea]|ios)/i.test(l) ? w = {
        name: "Microsoft Edge",
        msedge: t,
        version: P
      } : /vivaldi/i.test(l) ? w = {
        name: "Vivaldi",
        vivaldi: t,
        version: c(/vivaldi\/(\d+(\.\d+)?)/i) || I
      } : b ? w = {
        name: "Sailfish",
        osname: "Sailfish OS",
        sailfish: t,
        version: c(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      } : /seamonkey\//i.test(l) ? w = {
        name: "SeaMonkey",
        seamonkey: t,
        version: c(/seamonkey\/(\d+(\.\d+)?)/i)
      } : /firefox|iceweasel|fxios/i.test(l) ? (w = {
        name: "Firefox",
        firefox: t,
        version: c(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(l) && (w.firefoxos = t, w.osname = "Firefox OS")) : T ? w = {
        name: "Amazon Silk",
        silk: t,
        version: c(/silk\/(\d+(\.\d+)?)/i)
      } : /phantom/i.test(l) ? w = {
        name: "PhantomJS",
        phantom: t,
        version: c(/phantomjs\/(\d+(\.\d+)?)/i)
      } : /slimerjs/i.test(l) ? w = {
        name: "SlimerJS",
        slimer: t,
        version: c(/slimerjs\/(\d+(\.\d+)?)/i)
      } : /blackberry|\bbb\d+/i.test(l) || /rim\stablet/i.test(l) ? w = {
        name: "BlackBerry",
        osname: "BlackBerry OS",
        blackberry: t,
        version: I || c(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      } : R ? (w = {
        name: "WebOS",
        osname: "WebOS",
        webos: t,
        version: I || c(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      }, /touchpad\//i.test(l) && (w.touchpad = t)) : /bada/i.test(l) ? w = {
        name: "Bada",
        osname: "Bada",
        bada: t,
        version: c(/dolfin\/(\d+(\.\d+)?)/i)
      } : S ? w = {
        name: "Tizen",
        osname: "Tizen",
        tizen: t,
        version: c(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || I
      } : /qupzilla/i.test(l) ? w = {
        name: "QupZilla",
        qupzilla: t,
        version: c(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || I
      } : /chromium/i.test(l) ? w = {
        name: "Chromium",
        chromium: t,
        version: c(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || I
      } : /chrome|crios|crmo/i.test(l) ? w = {
        name: "Chrome",
        chrome: t,
        version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : m ? w = {
        name: "Android",
        version: I
      } : /safari|applewebkit/i.test(l) ? (w = {
        name: "Safari",
        safari: t
      }, I && (w.version = I)) : u ? (w = {
        name: u == "iphone" ? "iPhone" : u == "ipad" ? "iPad" : "iPod"
      }, I && (w.version = I)) : /googlebot/i.test(l) ? w = {
        name: "Googlebot",
        googlebot: t,
        version: c(/googlebot\/(\d+(\.\d+))/i) || I
      } : w = {
        name: c(/^(.*)\/(.*) /),
        version: f(/^(.*)\/(.*) /)
      }, !w.msedge && /(apple)?webkit/i.test(l) ? (/(apple)?webkit\/537\.36/i.test(l) ? (w.name = w.name || "Blink", w.blink = t) : (w.name = w.name || "Webkit", w.webkit = t), !w.version && I && (w.version = I)) : !w.opera && /gecko\//i.test(l) && (w.name = w.name || "Gecko", w.gecko = t, w.version = w.version || c(/gecko\/(\d+(\.\d+)?)/i)), !w.windowsphone && (m || w.silk) ? (w.android = t, w.osname = "Android") : !w.windowsphone && u ? (w[u] = t, w.ios = t, w.osname = "iOS") : B ? (w.mac = t, w.osname = "macOS") : L ? (w.xbox = t, w.osname = "Xbox") : O ? (w.windows = t, w.osname = "Windows") : z && (w.linux = t, w.osname = "Linux");
      function me(be) {
        switch (be) {
          case "NT":
            return "NT";
          case "XP":
            return "XP";
          case "NT 5.0":
            return "2000";
          case "NT 5.1":
            return "XP";
          case "NT 5.2":
            return "2003";
          case "NT 6.0":
            return "Vista";
          case "NT 6.1":
            return "7";
          case "NT 6.2":
            return "8";
          case "NT 6.3":
            return "8.1";
          case "NT 10.0":
            return "10";
          default:
            return;
        }
      }
      var Z = "";
      w.windows ? Z = me(c(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : w.windowsphone ? Z = c(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : w.mac ? (Z = c(/Mac OS X (\d+([_\.\s]\d+)*)/i), Z = Z.replace(/[_\s]/g, ".")) : u ? (Z = c(/os (\d+([_\s]\d+)*) like mac os x/i), Z = Z.replace(/[_\s]/g, ".")) : m ? Z = c(/android[ \/-](\d+(\.\d+)*)/i) : w.webos ? Z = c(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : w.blackberry ? Z = c(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : w.bada ? Z = c(/bada\/(\d+(\.\d+)*)/i) : w.tizen && (Z = c(/tizen[\/\s](\d+(\.\d+)*)/i)), Z && (w.osversion = Z);
      var Ee = !w.windows && Z.split(".")[0];
      return U || y || u == "ipad" || m && (Ee == 3 || Ee >= 4 && !k) || w.silk ? w.tablet = t : (k || u == "iphone" || u == "ipod" || m || g || w.blackberry || w.webos || w.bada) && (w.mobile = t), w.msedge || w.msie && w.version >= 10 || w.yandexbrowser && w.version >= 15 || w.vivaldi && w.version >= 1 || w.chrome && w.version >= 20 || w.samsungBrowser && w.version >= 4 || w.whale && a([w.version, "1.0"]) === 1 || w.mzbrowser && a([w.version, "6.0"]) === 1 || w.focus && a([w.version, "1.0"]) === 1 || w.firefox && w.version >= 20 || w.safari && w.version >= 6 || w.opera && w.version >= 10 || w.ios && w.osversion && w.osversion.split(".")[0] >= 6 || w.blackberry && w.version >= 10.1 || w.chromium && w.version >= 20 ? w.a = t : w.msie && w.version < 10 || w.chrome && w.version < 20 || w.firefox && w.version < 20 || w.safari && w.version < 6 || w.opera && w.version < 10 || w.ios && w.osversion && w.osversion.split(".")[0] < 6 || w.chromium && w.version < 20 ? w.c = t : w.x = t, w;
    }
    var i = r(typeof navigator < "u" && navigator.userAgent || "");
    i.test = function(l) {
      for (var c = 0; c < l.length; ++c) {
        var f = l[c];
        if (typeof f == "string" && f in i)
          return !0;
      }
      return !1;
    };
    function n(l) {
      return l.split(".").length;
    }
    function s(l, c) {
      var f = [], u;
      if (Array.prototype.map)
        return Array.prototype.map.call(l, c);
      for (u = 0; u < l.length; u++)
        f.push(c(l[u]));
      return f;
    }
    function a(l) {
      for (var c = Math.max(n(l[0]), n(l[1])), f = s(l, function(u) {
        var p = c - n(u);
        return u = u + new Array(p + 1).join(".0"), s(u.split("."), function(m) {
          return new Array(20 - m.length).join("0") + m;
        }).reverse();
      }); --c >= 0; ) {
        if (f[0][c] > f[1][c])
          return 1;
        if (f[0][c] === f[1][c]) {
          if (c === 0)
            return 0;
        } else
          return -1;
      }
    }
    function o(l, c, f) {
      var u = i;
      typeof c == "string" && (f = c, c = void 0), c === void 0 && (c = !1), f && (u = r(f));
      var p = "" + u.version;
      for (var m in l)
        if (l.hasOwnProperty(m) && u[m]) {
          if (typeof l[m] != "string")
            throw new Error("Browser version in the minVersion map should be a string: " + m + ": " + String(l));
          return a([p, l[m]]) < 0;
        }
      return c;
    }
    function h(l, c, f) {
      return !o(l, c, f);
    }
    return i.isUnsupportedBrowser = o, i.compareVersions = a, i.check = h, i._detect = r, i.detect = r, i;
  });
})(Xn);
var Ei = Xn.exports, Qr = Mi, _h = Zn, gh = Ei, Qn = Vn, wh = gi, Mh = !!Qn.createImageBitmap && !gh.firefox, Eh = {
  imageOrientation: "flipY",
  premultiplyAlpha: "premultiply"
};
function Tr(e) {
  this._stage = e;
}
Tr.prototype.loadImage = function(e, t, r) {
  var i = this, n = new Image();
  n.crossOrigin = "anonymous";
  var s = t && t.x || 0, a = t && t.y || 0, o = t && t.width || 1, h = t && t.height || 1;
  r = wh(r), n.onload = function() {
    i._handleLoad(n, s, a, o, h, r);
  }, n.onerror = function() {
    i._handleError(e, r);
  }, n.src = e;
  function l() {
    n.onload = n.onerror = null, n.src = "", r.apply(null, arguments);
  }
  return l;
};
Tr.prototype._handleLoad = function(e, t, r, i, n, s) {
  if (t === 0 && r === 0 && i === 1 && n === 1) {
    s(null, new Qr(e));
    return;
  }
  if (t *= e.naturalWidth, r *= e.naturalHeight, i *= e.naturalWidth, n *= e.naturalHeight, Mh)
    Qn.createImageBitmap(e, t, r, i, n, Eh).then(function(h) {
      s(null, new Qr(h));
    });
  else {
    var a = document.createElement("canvas");
    a.width = i, a.height = n;
    var o = a.getContext("2d");
    o.drawImage(e, t, r, i, n, 0, 0, i, n), s(null, new Qr(a));
  }
};
Tr.prototype._handleError = function(e, t) {
  t(new _h("Network error: " + e));
};
var Ah = Tr, xh = 1;
function Th() {
  if (typeof window < "u") {
    if (window.devicePixelRatio)
      return window.devicePixelRatio;
    var e = window.screen;
    if (e && e.deviceXDPI && e.logicalXDPI)
      return e.deviceXDPI / e.logicalXDPI;
    if (e && e.systemXDPI && e.logicalXDPI)
      return e.systemXDPI / e.logicalXDPI;
  }
  return xh;
}
var br = Th;
function bh(e) {
  return (e & e - 1) == 0;
}
var Sh = bh;
function Ai(e) {
  for (var t = document.documentElement.style, r = ["Moz", "Webkit", "Khtml", "O", "ms"], i = 0; i < r.length; i++) {
    var n = r[i], s = e[0].toUpperCase() + e.slice(1), a = n + s;
    if (a in t)
      return a;
  }
  return e;
}
function Ih(e) {
  var t = Ai(e);
  return function(i) {
    return i.style[t];
  };
}
function xi(e) {
  var t = Ai(e);
  return function(i, n) {
    return i.style[t] = n;
  };
}
var Jn = xi("transform"), qn = xi("transformOrigin");
function Rh(e) {
  Jn(e, "translateZ(0)");
}
function Ch(e) {
  qn(e, "0 0 0");
}
function zh(e) {
  e.style.position = "absolute";
}
function Lh(e, t, r) {
  e.style.left = t + "px", e.style.top = r + "px";
}
function Dh(e, t, r) {
  e.style.width = t + "px", e.style.height = r + "px";
}
function Nh(e) {
  e.style.width = e.style.height = 0;
}
function Ph(e) {
  e.style.width = e.style.height = "100%";
}
function Oh(e) {
  e.style.overflow = "hidden";
}
function Yh(e) {
  e.style.overflow = "visible";
}
function Bh(e) {
  e.style.pointerEvents = "none";
}
var fe = {
  prefixProperty: Ai,
  getWithVendorPrefix: Ih,
  setWithVendorPrefix: xi,
  setTransform: Jn,
  setTransformOrigin: qn,
  setNullTransform: Rh,
  setNullTransformOrigin: Ch,
  setAbsolute: zh,
  setPixelPosition: Lh,
  setPixelSize: Dh,
  setNullSize: Nh,
  setFullSize: Ph,
  setOverflowHidden: Oh,
  setOverflowVisible: Yh,
  setNoPointerEvents: Bh
}, Uh = fh, Fh = Ah, jh = Ei, kh = Le, Gh = br, hn = Sh, Hh = fe.setAbsolute, Vh = fe.setFullSize, Wh = X, Zh = {
  // Whether to use texImage2D instead of texSubImage2D when repainting an
  // existing texture from a video element. On most browsers texSubImage2D is
  // faster, but on Chrome the performance degrades significantly. See:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=612542
  videoUseTexImage2D: jh.chrome
};
function Xh(e, t) {
  var r = {
    alpha: !0,
    premultipliedAlpha: !0,
    antialias: !!(t && t.antialias),
    preserveDrawingBuffer: !!(t && t.preserveDrawingBuffer)
  }, i = e.getContext && (e.getContext("webgl", r) || e.getContext("experimental-webgl", r));
  if (!i)
    throw new Error("Could not get WebGL context");
  return t.wrapContext && (i = t.wrapContext(i)), i;
}
function te(e) {
  e = e || {};
  var t = this;
  this.constructor.super_.call(this, e), this._generateMipmaps = e.generateMipmaps != null ? e.generateMipmaps : !1, this._loader = new Fh(this), this._domElement = document.createElement("canvas"), Hh(this._domElement), Vh(this._domElement), this._gl = Xh(this._domElement, e), this._handleContextLoss = function() {
    t.emit("webglcontextlost"), t._gl = null;
  }, this._domElement.addEventListener("webglcontextlost", this._handleContextLoss), this._rendererInstances = [];
}
kh(te, Uh);
te.prototype.destroy = function() {
  this._domElement.removeEventListener("webglcontextlost", this._handleContextLoss), this.constructor.super_.prototype.destroy.call(this);
};
te.prototype.domElement = function() {
  return this._domElement;
};
te.prototype.webGlContext = function() {
  return this._gl;
};
te.prototype.setSizeForType = function() {
  var e = Gh();
  this._domElement.width = e * this._width, this._domElement.height = e * this._height;
};
te.prototype.loadImage = function(e, t, r) {
  return this._loader.loadImage(e, t, r);
};
te.prototype.maxTextureSize = function() {
  return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
};
te.prototype.validateLayer = function(e) {
  var t = e.geometry().maxTileSize(), r = this.maxTextureSize();
  if (t > r)
    throw new Error("Layer has level with tile size larger than maximum texture size (" + t + " vs. " + r + ")");
};
te.prototype.createRenderer = function(e) {
  for (var t = this._rendererInstances, r = 0; r < t.length; r++)
    if (t[r] instanceof e)
      return t[r];
  var i = new e(this._gl);
  return t.push(i), i;
};
te.prototype.destroyRenderer = function(e) {
  var t = this._rendererInstances;
  if (this._renderers.indexOf(e) < 0) {
    e.destroy();
    var r = t.indexOf(e);
    r >= 0 && t.splice(r, 1);
  }
};
te.prototype.startFrame = function() {
  var e = this._gl;
  if (!e)
    throw new Error("Bad WebGL context - maybe context was lost?");
  e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), e.enable(e.DEPTH_TEST), e.enable(e.BLEND), e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA);
};
te.prototype.endFrame = function() {
};
te.prototype.takeSnapshot = function(e) {
  (typeof e != "object" || e == null) && (e = {});
  var t = e.quality;
  if (typeof t > "u" && (t = 75), typeof t != "number" || t < 0 || t > 100)
    throw new Error("WebGLStage: Snapshot quality needs to be a number between 0 and 100");
  return this.render(), this._domElement.toDataURL("image/jpeg", t / 100);
};
te.type = te.prototype.type = "webgl";
function Ti(e, t, r) {
  this._stage = e, this._gl = e._gl, this._texture = null, this._timestamp = null, this._width = this._height = null, this.refresh(t, r);
}
Ti.prototype.refresh = function(e, t) {
  var r = this._gl, i = this._stage, n, s = t.timestamp();
  if (s !== this._timestamp) {
    var a = t.element(), o = t.width(), h = t.height();
    if (o !== this._width || h !== this._height) {
      var l = i.maxTextureSize();
      if (o > l)
        throw new Error("Texture width larger than max size (" + o + " vs. " + l + ")");
      if (h > l)
        throw new Error("Texture height larger than max size (" + h + " vs. " + l + ")");
      this._texture && r.deleteTexture(n), n = this._texture = r.createTexture(), r.bindTexture(r.TEXTURE_2D, n), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, a);
    } else
      n = this._texture, r.bindTexture(r.TEXTURE_2D, n), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), a instanceof HTMLVideoElement && Zh.videoUseTexImage2D ? r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, a) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, a);
    i._generateMipmaps && hn(o) && hn(h) ? (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_LINEAR), r.generateMipmap(r.TEXTURE_2D)) : (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR)), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), this._timestamp = s, this._width = o, this._height = h;
  }
};
Ti.prototype.destroy = function() {
  this._texture && this._gl.deleteTexture(this._texture), Wh(this);
};
te.TextureClass = te.prototype.TextureClass = Ti;
var Kn = te, C = 1e-6, Y = typeof Float32Array < "u" ? Float32Array : Array, xe = Math.random;
function Qh(e) {
  Y = e;
}
var Jh = Math.PI / 180;
function qh(e) {
  return e * Jh;
}
function Kh(e, t) {
  return Math.abs(e - t) <= C * Math.max(1, Math.abs(e), Math.abs(t));
}
Math.hypot || (Math.hypot = function() {
  for (var e = 0, t = arguments.length; t--; )
    e += arguments[t] * arguments[t];
  return Math.sqrt(e);
});
const $h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ARRAY_TYPE() {
    return Y;
  },
  EPSILON: C,
  RANDOM: xe,
  equals: Kh,
  setMatrixArrayType: Qh,
  toRadian: qh
}, Symbol.toStringTag, { value: "Module" }));
function el() {
  var e = new Y(4);
  return Y != Float32Array && (e[1] = 0, e[2] = 0), e[0] = 1, e[3] = 1, e;
}
function tl(e) {
  var t = new Y(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
}
function rl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
function il(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function nl(e, t, r, i) {
  var n = new Y(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n;
}
function sl(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function al(e, t) {
  if (e === t) {
    var r = t[1];
    e[1] = t[2], e[2] = r;
  } else
    e[0] = t[0], e[1] = t[2], e[2] = t[1], e[3] = t[3];
  return e;
}
function ol(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = r * s - n * i;
  return a ? (a = 1 / a, e[0] = s * a, e[1] = -i * a, e[2] = -n * a, e[3] = r * a, e) : null;
}
function hl(e, t) {
  var r = t[0];
  return e[0] = t[3], e[1] = -t[1], e[2] = -t[2], e[3] = r, e;
}
function ll(e) {
  return e[0] * e[3] - e[2] * e[1];
}
function $n(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * o + s * h, e[1] = n * o + a * h, e[2] = i * l + s * c, e[3] = n * l + a * c, e;
}
function cl(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + s * o, e[1] = n * h + a * o, e[2] = i * -o + s * h, e[3] = n * -o + a * h, e;
}
function vl(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = r[0], h = r[1];
  return e[0] = i * o, e[1] = n * o, e[2] = s * h, e[3] = a * h, e;
}
function fl(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e;
}
function ul(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e;
}
function dl(e) {
  return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function pl(e) {
  return Math.hypot(e[0], e[1], e[2], e[3]);
}
function ml(e, t, r, i) {
  return e[2] = i[2] / i[0], r[0] = i[0], r[1] = i[1], r[3] = i[3] - e[2] * r[1], [e, t, r];
}
function yl(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e;
}
function es(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e;
}
function _l(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function gl(e, t) {
  var r = e[0], i = e[1], n = e[2], s = e[3], a = t[0], o = t[1], h = t[2], l = t[3];
  return Math.abs(r - a) <= C * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(i - o) <= C * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(n - h) <= C * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(s - l) <= C * Math.max(1, Math.abs(s), Math.abs(l));
}
function wl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e;
}
function Ml(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e;
}
var El = $n, Al = es;
const xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: ml,
  add: yl,
  adjoint: hl,
  clone: tl,
  copy: rl,
  create: el,
  determinant: ll,
  equals: gl,
  exactEquals: _l,
  frob: pl,
  fromRotation: fl,
  fromScaling: ul,
  fromValues: nl,
  identity: il,
  invert: ol,
  mul: El,
  multiply: $n,
  multiplyScalar: wl,
  multiplyScalarAndAdd: Ml,
  rotate: cl,
  scale: vl,
  set: sl,
  str: dl,
  sub: Al,
  subtract: es,
  transpose: al
}, Symbol.toStringTag, { value: "Module" }));
function Tl() {
  var e = new Y(6);
  return Y != Float32Array && (e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0), e[0] = 1, e[3] = 1, e;
}
function bl(e) {
  var t = new Y(6);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
}
function Sl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function Il(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function Rl(e, t, r, i, n, s) {
  var a = new Y(6);
  return a[0] = e, a[1] = t, a[2] = r, a[3] = i, a[4] = n, a[5] = s, a;
}
function Cl(e, t, r, i, n, s, a) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = a, e;
}
function zl(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = t[4], o = t[5], h = r * s - i * n;
  return h ? (h = 1 / h, e[0] = s * h, e[1] = -i * h, e[2] = -n * h, e[3] = r * h, e[4] = (n * o - s * a) * h, e[5] = (i * a - r * o) * h, e) : null;
}
function Ll(e) {
  return e[0] * e[3] - e[1] * e[2];
}
function ts(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = r[0], c = r[1], f = r[2], u = r[3], p = r[4], m = r[5];
  return e[0] = i * l + s * c, e[1] = n * l + a * c, e[2] = i * f + s * u, e[3] = n * f + a * u, e[4] = i * p + s * m + o, e[5] = n * p + a * m + h, e;
}
function Dl(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = Math.sin(r), c = Math.cos(r);
  return e[0] = i * c + s * l, e[1] = n * c + a * l, e[2] = i * -l + s * c, e[3] = n * -l + a * c, e[4] = o, e[5] = h, e;
}
function Nl(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = r[0], c = r[1];
  return e[0] = i * l, e[1] = n * l, e[2] = s * c, e[3] = a * c, e[4] = o, e[5] = h, e;
}
function Pl(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = r[0], c = r[1];
  return e[0] = i, e[1] = n, e[2] = s, e[3] = a, e[4] = i * l + s * c + o, e[5] = n * l + a * c + h, e;
}
function Ol(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e[4] = 0, e[5] = 0, e;
}
function Yl(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e[4] = 0, e[5] = 0, e;
}
function Bl(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0], e[5] = t[1], e;
}
function Ul(e) {
  return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")";
}
function Fl(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1);
}
function jl(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e;
}
function rs(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e;
}
function kl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e;
}
function Gl(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e;
}
function Hl(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5];
}
function Vl(e, t) {
  var r = e[0], i = e[1], n = e[2], s = e[3], a = e[4], o = e[5], h = t[0], l = t[1], c = t[2], f = t[3], u = t[4], p = t[5];
  return Math.abs(r - h) <= C * Math.max(1, Math.abs(r), Math.abs(h)) && Math.abs(i - l) <= C * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(n - c) <= C * Math.max(1, Math.abs(n), Math.abs(c)) && Math.abs(s - f) <= C * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(a - u) <= C * Math.max(1, Math.abs(a), Math.abs(u)) && Math.abs(o - p) <= C * Math.max(1, Math.abs(o), Math.abs(p));
}
var Wl = ts, Zl = rs;
const Xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: jl,
  clone: bl,
  copy: Sl,
  create: Tl,
  determinant: Ll,
  equals: Vl,
  exactEquals: Hl,
  frob: Fl,
  fromRotation: Ol,
  fromScaling: Yl,
  fromTranslation: Bl,
  fromValues: Rl,
  identity: Il,
  invert: zl,
  mul: Wl,
  multiply: ts,
  multiplyScalar: kl,
  multiplyScalarAndAdd: Gl,
  rotate: Dl,
  scale: Nl,
  set: Cl,
  str: Ul,
  sub: Zl,
  subtract: rs,
  translate: Pl
}, Symbol.toStringTag, { value: "Module" }));
function is() {
  var e = new Y(9);
  return Y != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function Ql(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e;
}
function Jl(e) {
  var t = new Y(9);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t;
}
function ql(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function Kl(e, t, r, i, n, s, a, o, h) {
  var l = new Y(9);
  return l[0] = e, l[1] = t, l[2] = r, l[3] = i, l[4] = n, l[5] = s, l[6] = a, l[7] = o, l[8] = h, l;
}
function $l(e, t, r, i, n, s, a, o, h, l) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = a, e[6] = o, e[7] = h, e[8] = l, e;
}
function ec(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function tc(e, t) {
  if (e === t) {
    var r = t[1], i = t[2], n = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = r, e[5] = t[7], e[6] = i, e[7] = n;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function rc(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = c * a - o * l, u = -c * s + o * h, p = l * s - a * h, m = r * f + i * u + n * p;
  return m ? (m = 1 / m, e[0] = f * m, e[1] = (-c * i + n * l) * m, e[2] = (o * i - n * a) * m, e[3] = u * m, e[4] = (c * r - n * h) * m, e[5] = (-o * r + n * s) * m, e[6] = p * m, e[7] = (-l * r + i * h) * m, e[8] = (a * r - i * s) * m, e) : null;
}
function ic(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = t[4], o = t[5], h = t[6], l = t[7], c = t[8];
  return e[0] = a * c - o * l, e[1] = n * l - i * c, e[2] = i * o - n * a, e[3] = o * h - s * c, e[4] = r * c - n * h, e[5] = n * s - r * o, e[6] = s * l - a * h, e[7] = i * h - r * l, e[8] = r * a - i * s, e;
}
function nc(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3], s = e[4], a = e[5], o = e[6], h = e[7], l = e[8];
  return t * (l * s - a * h) + r * (-l * n + a * o) + i * (h * n - s * o);
}
function ns(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = r[0], p = r[1], m = r[2], g = r[3], y = r[4], M = r[5], T = r[6], b = r[7], S = r[8];
  return e[0] = u * i + p * a + m * l, e[1] = u * n + p * o + m * c, e[2] = u * s + p * h + m * f, e[3] = g * i + y * a + M * l, e[4] = g * n + y * o + M * c, e[5] = g * s + y * h + M * f, e[6] = T * i + b * a + S * l, e[7] = T * n + b * o + S * c, e[8] = T * s + b * h + S * f, e;
}
function sc(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = r[0], p = r[1];
  return e[0] = i, e[1] = n, e[2] = s, e[3] = a, e[4] = o, e[5] = h, e[6] = u * i + p * a + l, e[7] = u * n + p * o + c, e[8] = u * s + p * h + f, e;
}
function ac(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = Math.sin(r), p = Math.cos(r);
  return e[0] = p * i + u * a, e[1] = p * n + u * o, e[2] = p * s + u * h, e[3] = p * a - u * i, e[4] = p * o - u * n, e[5] = p * h - u * s, e[6] = l, e[7] = c, e[8] = f, e;
}
function oc(e, t, r) {
  var i = r[0], n = r[1];
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = n * t[3], e[4] = n * t[4], e[5] = n * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function hc(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = t[0], e[7] = t[1], e[8] = 1, e;
}
function lc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = -r, e[4] = i, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function cc(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = t[1], e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function vc(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = 0, e[3] = t[2], e[4] = t[3], e[5] = 0, e[6] = t[4], e[7] = t[5], e[8] = 1, e;
}
function fc(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = r + r, o = i + i, h = n + n, l = r * a, c = i * a, f = i * o, u = n * a, p = n * o, m = n * h, g = s * a, y = s * o, M = s * h;
  return e[0] = 1 - f - m, e[3] = c - M, e[6] = u + y, e[1] = c + M, e[4] = 1 - l - m, e[7] = p - g, e[2] = u - y, e[5] = p + g, e[8] = 1 - l - f, e;
}
function uc(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], m = t[12], g = t[13], y = t[14], M = t[15], T = r * o - i * a, b = r * h - n * a, S = r * l - s * a, R = i * h - n * o, x = i * l - s * o, O = n * l - s * h, B = c * g - f * m, z = c * y - u * m, P = c * M - p * m, I = f * y - u * g, U = f * M - p * g, k = u * M - p * y, L = T * k - b * U + S * I + R * P - x * z + O * B;
  return L ? (L = 1 / L, e[0] = (o * k - h * U + l * I) * L, e[1] = (h * P - a * k - l * z) * L, e[2] = (a * U - o * P + l * B) * L, e[3] = (n * U - i * k - s * I) * L, e[4] = (r * k - n * P + s * z) * L, e[5] = (i * P - r * U - s * B) * L, e[6] = (g * O - y * x + M * R) * L, e[7] = (y * S - m * O - M * b) * L, e[8] = (m * x - g * S + M * T) * L, e) : null;
}
function dc(e, t, r) {
  return e[0] = 2 / t, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = -2 / r, e[5] = 0, e[6] = -1, e[7] = 1, e[8] = 1, e;
}
function pc(e) {
  return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")";
}
function mc(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
}
function yc(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e;
}
function ss(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e;
}
function _c(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e;
}
function gc(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e;
}
function wc(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
}
function Mc(e, t) {
  var r = e[0], i = e[1], n = e[2], s = e[3], a = e[4], o = e[5], h = e[6], l = e[7], c = e[8], f = t[0], u = t[1], p = t[2], m = t[3], g = t[4], y = t[5], M = t[6], T = t[7], b = t[8];
  return Math.abs(r - f) <= C * Math.max(1, Math.abs(r), Math.abs(f)) && Math.abs(i - u) <= C * Math.max(1, Math.abs(i), Math.abs(u)) && Math.abs(n - p) <= C * Math.max(1, Math.abs(n), Math.abs(p)) && Math.abs(s - m) <= C * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(a - g) <= C * Math.max(1, Math.abs(a), Math.abs(g)) && Math.abs(o - y) <= C * Math.max(1, Math.abs(o), Math.abs(y)) && Math.abs(h - M) <= C * Math.max(1, Math.abs(h), Math.abs(M)) && Math.abs(l - T) <= C * Math.max(1, Math.abs(l), Math.abs(T)) && Math.abs(c - b) <= C * Math.max(1, Math.abs(c), Math.abs(b));
}
var Ec = ns, Ac = ss;
const xc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: yc,
  adjoint: ic,
  clone: Jl,
  copy: ql,
  create: is,
  determinant: nc,
  equals: Mc,
  exactEquals: wc,
  frob: mc,
  fromMat2d: vc,
  fromMat4: Ql,
  fromQuat: fc,
  fromRotation: lc,
  fromScaling: cc,
  fromTranslation: hc,
  fromValues: Kl,
  identity: ec,
  invert: rc,
  mul: Ec,
  multiply: ns,
  multiplyScalar: _c,
  multiplyScalarAndAdd: gc,
  normalFromMat4: uc,
  projection: dc,
  rotate: ac,
  scale: oc,
  set: $l,
  str: pc,
  sub: Ac,
  subtract: ss,
  translate: sc,
  transpose: tc
}, Symbol.toStringTag, { value: "Module" }));
function Tc() {
  var e = new Y(16);
  return Y != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e;
}
function bc(e) {
  var t = new Y(16);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t;
}
function Sc(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function Ic(e, t, r, i, n, s, a, o, h, l, c, f, u, p, m, g) {
  var y = new Y(16);
  return y[0] = e, y[1] = t, y[2] = r, y[3] = i, y[4] = n, y[5] = s, y[6] = a, y[7] = o, y[8] = h, y[9] = l, y[10] = c, y[11] = f, y[12] = u, y[13] = p, y[14] = m, y[15] = g, y;
}
function Rc(e, t, r, i, n, s, a, o, h, l, c, f, u, p, m, g, y) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = a, e[6] = o, e[7] = h, e[8] = l, e[9] = c, e[10] = f, e[11] = u, e[12] = p, e[13] = m, e[14] = g, e[15] = y, e;
}
function as(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Cc(e, t) {
  if (e === t) {
    var r = t[1], i = t[2], n = t[3], s = t[6], a = t[7], o = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = r, e[6] = t[9], e[7] = t[13], e[8] = i, e[9] = s, e[11] = t[14], e[12] = n, e[13] = a, e[14] = o;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function zc(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], m = t[12], g = t[13], y = t[14], M = t[15], T = r * o - i * a, b = r * h - n * a, S = r * l - s * a, R = i * h - n * o, x = i * l - s * o, O = n * l - s * h, B = c * g - f * m, z = c * y - u * m, P = c * M - p * m, I = f * y - u * g, U = f * M - p * g, k = u * M - p * y, L = T * k - b * U + S * I + R * P - x * z + O * B;
  return L ? (L = 1 / L, e[0] = (o * k - h * U + l * I) * L, e[1] = (n * U - i * k - s * I) * L, e[2] = (g * O - y * x + M * R) * L, e[3] = (u * x - f * O - p * R) * L, e[4] = (h * P - a * k - l * z) * L, e[5] = (r * k - n * P + s * z) * L, e[6] = (y * S - m * O - M * b) * L, e[7] = (c * O - u * S + p * b) * L, e[8] = (a * U - o * P + l * B) * L, e[9] = (i * P - r * U - s * B) * L, e[10] = (m * x - g * S + M * T) * L, e[11] = (f * S - c * x - p * T) * L, e[12] = (o * z - a * I - h * B) * L, e[13] = (r * I - i * z + n * B) * L, e[14] = (g * b - m * R - y * T) * L, e[15] = (c * R - f * b + u * T) * L, e) : null;
}
function Lc(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], m = t[12], g = t[13], y = t[14], M = t[15];
  return e[0] = o * (u * M - p * y) - f * (h * M - l * y) + g * (h * p - l * u), e[1] = -(i * (u * M - p * y) - f * (n * M - s * y) + g * (n * p - s * u)), e[2] = i * (h * M - l * y) - o * (n * M - s * y) + g * (n * l - s * h), e[3] = -(i * (h * p - l * u) - o * (n * p - s * u) + f * (n * l - s * h)), e[4] = -(a * (u * M - p * y) - c * (h * M - l * y) + m * (h * p - l * u)), e[5] = r * (u * M - p * y) - c * (n * M - s * y) + m * (n * p - s * u), e[6] = -(r * (h * M - l * y) - a * (n * M - s * y) + m * (n * l - s * h)), e[7] = r * (h * p - l * u) - a * (n * p - s * u) + c * (n * l - s * h), e[8] = a * (f * M - p * g) - c * (o * M - l * g) + m * (o * p - l * f), e[9] = -(r * (f * M - p * g) - c * (i * M - s * g) + m * (i * p - s * f)), e[10] = r * (o * M - l * g) - a * (i * M - s * g) + m * (i * l - s * o), e[11] = -(r * (o * p - l * f) - a * (i * p - s * f) + c * (i * l - s * o)), e[12] = -(a * (f * y - u * g) - c * (o * y - h * g) + m * (o * u - h * f)), e[13] = r * (f * y - u * g) - c * (i * y - n * g) + m * (i * u - n * f), e[14] = -(r * (o * y - h * g) - a * (i * y - n * g) + m * (i * h - n * o)), e[15] = r * (o * u - h * f) - a * (i * u - n * f) + c * (i * h - n * o), e;
}
function Dc(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3], s = e[4], a = e[5], o = e[6], h = e[7], l = e[8], c = e[9], f = e[10], u = e[11], p = e[12], m = e[13], g = e[14], y = e[15], M = t * a - r * s, T = t * o - i * s, b = t * h - n * s, S = r * o - i * a, R = r * h - n * a, x = i * h - n * o, O = l * m - c * p, B = l * g - f * p, z = l * y - u * p, P = c * g - f * m, I = c * y - u * m, U = f * y - u * g;
  return M * U - T * I + b * P + S * z - R * B + x * O;
}
function os(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = t[9], p = t[10], m = t[11], g = t[12], y = t[13], M = t[14], T = t[15], b = r[0], S = r[1], R = r[2], x = r[3];
  return e[0] = b * i + S * o + R * f + x * g, e[1] = b * n + S * h + R * u + x * y, e[2] = b * s + S * l + R * p + x * M, e[3] = b * a + S * c + R * m + x * T, b = r[4], S = r[5], R = r[6], x = r[7], e[4] = b * i + S * o + R * f + x * g, e[5] = b * n + S * h + R * u + x * y, e[6] = b * s + S * l + R * p + x * M, e[7] = b * a + S * c + R * m + x * T, b = r[8], S = r[9], R = r[10], x = r[11], e[8] = b * i + S * o + R * f + x * g, e[9] = b * n + S * h + R * u + x * y, e[10] = b * s + S * l + R * p + x * M, e[11] = b * a + S * c + R * m + x * T, b = r[12], S = r[13], R = r[14], x = r[15], e[12] = b * i + S * o + R * f + x * g, e[13] = b * n + S * h + R * u + x * y, e[14] = b * s + S * l + R * p + x * M, e[15] = b * a + S * c + R * m + x * T, e;
}
function Nc(e, t, r) {
  var i = r[0], n = r[1], s = r[2], a, o, h, l, c, f, u, p, m, g, y, M;
  return t === e ? (e[12] = t[0] * i + t[4] * n + t[8] * s + t[12], e[13] = t[1] * i + t[5] * n + t[9] * s + t[13], e[14] = t[2] * i + t[6] * n + t[10] * s + t[14], e[15] = t[3] * i + t[7] * n + t[11] * s + t[15]) : (a = t[0], o = t[1], h = t[2], l = t[3], c = t[4], f = t[5], u = t[6], p = t[7], m = t[8], g = t[9], y = t[10], M = t[11], e[0] = a, e[1] = o, e[2] = h, e[3] = l, e[4] = c, e[5] = f, e[6] = u, e[7] = p, e[8] = m, e[9] = g, e[10] = y, e[11] = M, e[12] = a * i + c * n + m * s + t[12], e[13] = o * i + f * n + g * s + t[13], e[14] = h * i + u * n + y * s + t[14], e[15] = l * i + p * n + M * s + t[15]), e;
}
function Pc(e, t, r) {
  var i = r[0], n = r[1], s = r[2];
  return e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e[3] = t[3] * i, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * s, e[9] = t[9] * s, e[10] = t[10] * s, e[11] = t[11] * s, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function Oc(e, t, r, i) {
  var n = i[0], s = i[1], a = i[2], o = Math.hypot(n, s, a), h, l, c, f, u, p, m, g, y, M, T, b, S, R, x, O, B, z, P, I, U, k, L, w;
  return o < C ? null : (o = 1 / o, n *= o, s *= o, a *= o, h = Math.sin(r), l = Math.cos(r), c = 1 - l, f = t[0], u = t[1], p = t[2], m = t[3], g = t[4], y = t[5], M = t[6], T = t[7], b = t[8], S = t[9], R = t[10], x = t[11], O = n * n * c + l, B = s * n * c + a * h, z = a * n * c - s * h, P = n * s * c - a * h, I = s * s * c + l, U = a * s * c + n * h, k = n * a * c + s * h, L = s * a * c - n * h, w = a * a * c + l, e[0] = f * O + g * B + b * z, e[1] = u * O + y * B + S * z, e[2] = p * O + M * B + R * z, e[3] = m * O + T * B + x * z, e[4] = f * P + g * I + b * U, e[5] = u * P + y * I + S * U, e[6] = p * P + M * I + R * U, e[7] = m * P + T * I + x * U, e[8] = f * k + g * L + b * w, e[9] = u * k + y * L + S * w, e[10] = p * k + M * L + R * w, e[11] = m * k + T * L + x * w, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function Yc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), s = t[4], a = t[5], o = t[6], h = t[7], l = t[8], c = t[9], f = t[10], u = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = s * n + l * i, e[5] = a * n + c * i, e[6] = o * n + f * i, e[7] = h * n + u * i, e[8] = l * n - s * i, e[9] = c * n - a * i, e[10] = f * n - o * i, e[11] = u * n - h * i, e;
}
function Bc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), s = t[0], a = t[1], o = t[2], h = t[3], l = t[8], c = t[9], f = t[10], u = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = s * n - l * i, e[1] = a * n - c * i, e[2] = o * n - f * i, e[3] = h * n - u * i, e[8] = s * i + l * n, e[9] = a * i + c * n, e[10] = o * i + f * n, e[11] = h * i + u * n, e;
}
function Uc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), s = t[0], a = t[1], o = t[2], h = t[3], l = t[4], c = t[5], f = t[6], u = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = s * n + l * i, e[1] = a * n + c * i, e[2] = o * n + f * i, e[3] = h * n + u * i, e[4] = l * n - s * i, e[5] = c * n - a * i, e[6] = f * n - o * i, e[7] = u * n - h * i, e;
}
function Fc(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e;
}
function jc(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t[1], e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t[2], e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function kc(e, t, r) {
  var i = r[0], n = r[1], s = r[2], a = Math.hypot(i, n, s), o, h, l;
  return a < C ? null : (a = 1 / a, i *= a, n *= a, s *= a, o = Math.sin(t), h = Math.cos(t), l = 1 - h, e[0] = i * i * l + h, e[1] = n * i * l + s * o, e[2] = s * i * l - n * o, e[3] = 0, e[4] = i * n * l - s * o, e[5] = n * n * l + h, e[6] = s * n * l + i * o, e[7] = 0, e[8] = i * s * l + n * o, e[9] = n * s * l - i * o, e[10] = s * s * l + h, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e);
}
function Gc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = r, e[7] = 0, e[8] = 0, e[9] = -r, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Hc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = 0, e[2] = -r, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = r, e[9] = 0, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Vc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = 0, e[4] = -r, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function hs(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = i + i, h = n + n, l = s + s, c = i * o, f = i * h, u = i * l, p = n * h, m = n * l, g = s * l, y = a * o, M = a * h, T = a * l;
  return e[0] = 1 - (p + g), e[1] = f + T, e[2] = u - M, e[3] = 0, e[4] = f - T, e[5] = 1 - (c + g), e[6] = m + y, e[7] = 0, e[8] = u + M, e[9] = m - y, e[10] = 1 - (c + p), e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e;
}
function Wc(e, t) {
  var r = new Y(3), i = -t[0], n = -t[1], s = -t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = i * i + n * n + s * s + a * a;
  return f > 0 ? (r[0] = (o * a + c * i + h * s - l * n) * 2 / f, r[1] = (h * a + c * n + l * i - o * s) * 2 / f, r[2] = (l * a + c * s + o * n - h * i) * 2 / f) : (r[0] = (o * a + c * i + h * s - l * n) * 2, r[1] = (h * a + c * n + l * i - o * s) * 2, r[2] = (l * a + c * s + o * n - h * i) * 2), hs(e, t, r), e;
}
function ls(e, t) {
  return e[0] = t[12], e[1] = t[13], e[2] = t[14], e;
}
function cs(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[4], a = t[5], o = t[6], h = t[8], l = t[9], c = t[10];
  return e[0] = Math.hypot(r, i, n), e[1] = Math.hypot(s, a, o), e[2] = Math.hypot(h, l, c), e;
}
function vs(e, t) {
  var r = new Y(3);
  cs(r, t);
  var i = 1 / r[0], n = 1 / r[1], s = 1 / r[2], a = t[0] * i, o = t[1] * n, h = t[2] * s, l = t[4] * i, c = t[5] * n, f = t[6] * s, u = t[8] * i, p = t[9] * n, m = t[10] * s, g = a + c + m, y = 0;
  return g > 0 ? (y = Math.sqrt(g + 1) * 2, e[3] = 0.25 * y, e[0] = (f - p) / y, e[1] = (u - h) / y, e[2] = (o - l) / y) : a > c && a > m ? (y = Math.sqrt(1 + a - c - m) * 2, e[3] = (f - p) / y, e[0] = 0.25 * y, e[1] = (o + l) / y, e[2] = (u + h) / y) : c > m ? (y = Math.sqrt(1 + c - a - m) * 2, e[3] = (u - h) / y, e[0] = (o + l) / y, e[1] = 0.25 * y, e[2] = (f + p) / y) : (y = Math.sqrt(1 + m - a - c) * 2, e[3] = (o - l) / y, e[0] = (u + h) / y, e[1] = (f + p) / y, e[2] = 0.25 * y), e;
}
function Zc(e, t, r, i) {
  var n = t[0], s = t[1], a = t[2], o = t[3], h = n + n, l = s + s, c = a + a, f = n * h, u = n * l, p = n * c, m = s * l, g = s * c, y = a * c, M = o * h, T = o * l, b = o * c, S = i[0], R = i[1], x = i[2];
  return e[0] = (1 - (m + y)) * S, e[1] = (u + b) * S, e[2] = (p - T) * S, e[3] = 0, e[4] = (u - b) * R, e[5] = (1 - (f + y)) * R, e[6] = (g + M) * R, e[7] = 0, e[8] = (p + T) * x, e[9] = (g - M) * x, e[10] = (1 - (f + m)) * x, e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e;
}
function Xc(e, t, r, i, n) {
  var s = t[0], a = t[1], o = t[2], h = t[3], l = s + s, c = a + a, f = o + o, u = s * l, p = s * c, m = s * f, g = a * c, y = a * f, M = o * f, T = h * l, b = h * c, S = h * f, R = i[0], x = i[1], O = i[2], B = n[0], z = n[1], P = n[2], I = (1 - (g + M)) * R, U = (p + S) * R, k = (m - b) * R, L = (p - S) * x, w = (1 - (u + M)) * x, me = (y + T) * x, Z = (m + b) * O, Ee = (y - T) * O, be = (1 - (u + g)) * O;
  return e[0] = I, e[1] = U, e[2] = k, e[3] = 0, e[4] = L, e[5] = w, e[6] = me, e[7] = 0, e[8] = Z, e[9] = Ee, e[10] = be, e[11] = 0, e[12] = r[0] + B - (I * B + L * z + Z * P), e[13] = r[1] + z - (U * B + w * z + Ee * P), e[14] = r[2] + P - (k * B + me * z + be * P), e[15] = 1, e;
}
function Qc(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = r + r, o = i + i, h = n + n, l = r * a, c = i * a, f = i * o, u = n * a, p = n * o, m = n * h, g = s * a, y = s * o, M = s * h;
  return e[0] = 1 - f - m, e[1] = c + M, e[2] = u - y, e[3] = 0, e[4] = c - M, e[5] = 1 - l - m, e[6] = p + g, e[7] = 0, e[8] = u + y, e[9] = p - g, e[10] = 1 - l - f, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Jc(e, t, r, i, n, s, a) {
  var o = 1 / (r - t), h = 1 / (n - i), l = 1 / (s - a);
  return e[0] = s * 2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s * 2 * h, e[6] = 0, e[7] = 0, e[8] = (r + t) * o, e[9] = (n + i) * h, e[10] = (a + s) * l, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = a * s * 2 * l, e[15] = 0, e;
}
function qc(e, t, r, i, n) {
  var s = 1 / Math.tan(t / 2), a;
  return e[0] = s / r, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, n != null && n !== 1 / 0 ? (a = 1 / (i - n), e[10] = (n + i) * a, e[14] = 2 * n * i * a) : (e[10] = -1, e[14] = -2 * i), e;
}
function Kc(e, t, r, i) {
  var n = Math.tan(t.upDegrees * Math.PI / 180), s = Math.tan(t.downDegrees * Math.PI / 180), a = Math.tan(t.leftDegrees * Math.PI / 180), o = Math.tan(t.rightDegrees * Math.PI / 180), h = 2 / (a + o), l = 2 / (n + s);
  return e[0] = h, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = l, e[6] = 0, e[7] = 0, e[8] = -((a - o) * h * 0.5), e[9] = (n - s) * l * 0.5, e[10] = i / (r - i), e[11] = -1, e[12] = 0, e[13] = 0, e[14] = i * r / (r - i), e[15] = 0, e;
}
function $c(e, t, r, i, n, s, a) {
  var o = 1 / (t - r), h = 1 / (i - n), l = 1 / (s - a);
  return e[0] = -2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * h, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * l, e[11] = 0, e[12] = (t + r) * o, e[13] = (n + i) * h, e[14] = (a + s) * l, e[15] = 1, e;
}
function ev(e, t, r, i) {
  var n, s, a, o, h, l, c, f, u, p, m = t[0], g = t[1], y = t[2], M = i[0], T = i[1], b = i[2], S = r[0], R = r[1], x = r[2];
  return Math.abs(m - S) < C && Math.abs(g - R) < C && Math.abs(y - x) < C ? as(e) : (c = m - S, f = g - R, u = y - x, p = 1 / Math.hypot(c, f, u), c *= p, f *= p, u *= p, n = T * u - b * f, s = b * c - M * u, a = M * f - T * c, p = Math.hypot(n, s, a), p ? (p = 1 / p, n *= p, s *= p, a *= p) : (n = 0, s = 0, a = 0), o = f * a - u * s, h = u * n - c * a, l = c * s - f * n, p = Math.hypot(o, h, l), p ? (p = 1 / p, o *= p, h *= p, l *= p) : (o = 0, h = 0, l = 0), e[0] = n, e[1] = o, e[2] = c, e[3] = 0, e[4] = s, e[5] = h, e[6] = f, e[7] = 0, e[8] = a, e[9] = l, e[10] = u, e[11] = 0, e[12] = -(n * m + s * g + a * y), e[13] = -(o * m + h * g + l * y), e[14] = -(c * m + f * g + u * y), e[15] = 1, e);
}
function tv(e, t, r, i) {
  var n = t[0], s = t[1], a = t[2], o = i[0], h = i[1], l = i[2], c = n - r[0], f = s - r[1], u = a - r[2], p = c * c + f * f + u * u;
  p > 0 && (p = 1 / Math.sqrt(p), c *= p, f *= p, u *= p);
  var m = h * u - l * f, g = l * c - o * u, y = o * f - h * c;
  return p = m * m + g * g + y * y, p > 0 && (p = 1 / Math.sqrt(p), m *= p, g *= p, y *= p), e[0] = m, e[1] = g, e[2] = y, e[3] = 0, e[4] = f * y - u * g, e[5] = u * m - c * y, e[6] = c * g - f * m, e[7] = 0, e[8] = c, e[9] = f, e[10] = u, e[11] = 0, e[12] = n, e[13] = s, e[14] = a, e[15] = 1, e;
}
function rv(e) {
  return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")";
}
function iv(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
}
function nv(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e[9] = t[9] + r[9], e[10] = t[10] + r[10], e[11] = t[11] + r[11], e[12] = t[12] + r[12], e[13] = t[13] + r[13], e[14] = t[14] + r[14], e[15] = t[15] + r[15], e;
}
function fs(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e[9] = t[9] - r[9], e[10] = t[10] - r[10], e[11] = t[11] - r[11], e[12] = t[12] - r[12], e[13] = t[13] - r[13], e[14] = t[14] - r[14], e[15] = t[15] - r[15], e;
}
function sv(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e[9] = t[9] * r, e[10] = t[10] * r, e[11] = t[11] * r, e[12] = t[12] * r, e[13] = t[13] * r, e[14] = t[14] * r, e[15] = t[15] * r, e;
}
function av(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e[9] = t[9] + r[9] * i, e[10] = t[10] + r[10] * i, e[11] = t[11] + r[11] * i, e[12] = t[12] + r[12] * i, e[13] = t[13] + r[13] * i, e[14] = t[14] + r[14] * i, e[15] = t[15] + r[15] * i, e;
}
function ov(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15];
}
function hv(e, t) {
  var r = e[0], i = e[1], n = e[2], s = e[3], a = e[4], o = e[5], h = e[6], l = e[7], c = e[8], f = e[9], u = e[10], p = e[11], m = e[12], g = e[13], y = e[14], M = e[15], T = t[0], b = t[1], S = t[2], R = t[3], x = t[4], O = t[5], B = t[6], z = t[7], P = t[8], I = t[9], U = t[10], k = t[11], L = t[12], w = t[13], me = t[14], Z = t[15];
  return Math.abs(r - T) <= C * Math.max(1, Math.abs(r), Math.abs(T)) && Math.abs(i - b) <= C * Math.max(1, Math.abs(i), Math.abs(b)) && Math.abs(n - S) <= C * Math.max(1, Math.abs(n), Math.abs(S)) && Math.abs(s - R) <= C * Math.max(1, Math.abs(s), Math.abs(R)) && Math.abs(a - x) <= C * Math.max(1, Math.abs(a), Math.abs(x)) && Math.abs(o - O) <= C * Math.max(1, Math.abs(o), Math.abs(O)) && Math.abs(h - B) <= C * Math.max(1, Math.abs(h), Math.abs(B)) && Math.abs(l - z) <= C * Math.max(1, Math.abs(l), Math.abs(z)) && Math.abs(c - P) <= C * Math.max(1, Math.abs(c), Math.abs(P)) && Math.abs(f - I) <= C * Math.max(1, Math.abs(f), Math.abs(I)) && Math.abs(u - U) <= C * Math.max(1, Math.abs(u), Math.abs(U)) && Math.abs(p - k) <= C * Math.max(1, Math.abs(p), Math.abs(k)) && Math.abs(m - L) <= C * Math.max(1, Math.abs(m), Math.abs(L)) && Math.abs(g - w) <= C * Math.max(1, Math.abs(g), Math.abs(w)) && Math.abs(y - me) <= C * Math.max(1, Math.abs(y), Math.abs(me)) && Math.abs(M - Z) <= C * Math.max(1, Math.abs(M), Math.abs(Z));
}
var lv = os, cv = fs;
const vv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: nv,
  adjoint: Lc,
  clone: bc,
  copy: Sc,
  create: Tc,
  determinant: Dc,
  equals: hv,
  exactEquals: ov,
  frob: iv,
  fromQuat: Qc,
  fromQuat2: Wc,
  fromRotation: kc,
  fromRotationTranslation: hs,
  fromRotationTranslationScale: Zc,
  fromRotationTranslationScaleOrigin: Xc,
  fromScaling: jc,
  fromTranslation: Fc,
  fromValues: Ic,
  fromXRotation: Gc,
  fromYRotation: Hc,
  fromZRotation: Vc,
  frustum: Jc,
  getRotation: vs,
  getScaling: cs,
  getTranslation: ls,
  identity: as,
  invert: zc,
  lookAt: ev,
  mul: lv,
  multiply: os,
  multiplyScalar: sv,
  multiplyScalarAndAdd: av,
  ortho: $c,
  perspective: qc,
  perspectiveFromFieldOfView: Kc,
  rotate: Oc,
  rotateX: Yc,
  rotateY: Bc,
  rotateZ: Uc,
  scale: Pc,
  set: Rc,
  str: rv,
  sub: cv,
  subtract: fs,
  targetTo: tv,
  translate: Nc,
  transpose: Cc
}, Symbol.toStringTag, { value: "Module" }));
function bi() {
  var e = new Y(3);
  return Y != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function fv(e) {
  var t = new Y(3);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t;
}
function us(e) {
  var t = e[0], r = e[1], i = e[2];
  return Math.hypot(t, r, i);
}
function ui(e, t, r) {
  var i = new Y(3);
  return i[0] = e, i[1] = t, i[2] = r, i;
}
function uv(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e;
}
function dv(e, t, r, i) {
  return e[0] = t, e[1] = r, e[2] = i, e;
}
function pv(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e;
}
function ds(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e;
}
function ps(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e;
}
function ms(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e;
}
function mv(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e;
}
function yv(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e;
}
function _v(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e;
}
function gv(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e;
}
function wv(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e;
}
function Mv(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e;
}
function Ev(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e;
}
function ys(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2];
  return Math.hypot(r, i, n);
}
function _s(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2];
  return r * r + i * i + n * n;
}
function gs(e) {
  var t = e[0], r = e[1], i = e[2];
  return t * t + r * r + i * i;
}
function Av(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e;
}
function xv(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e;
}
function ws(e, t) {
  var r = t[0], i = t[1], n = t[2], s = r * r + i * i + n * n;
  return s > 0 && (s = 1 / Math.sqrt(s)), e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e;
}
function Si(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function yr(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = r[0], o = r[1], h = r[2];
  return e[0] = n * h - s * o, e[1] = s * a - i * h, e[2] = i * o - n * a, e;
}
function Tv(e, t, r, i) {
  var n = t[0], s = t[1], a = t[2];
  return e[0] = n + i * (r[0] - n), e[1] = s + i * (r[1] - s), e[2] = a + i * (r[2] - a), e;
}
function bv(e, t, r, i, n, s) {
  var a = s * s, o = a * (2 * s - 3) + 1, h = a * (s - 2) + s, l = a * (s - 1), c = a * (3 - 2 * s);
  return e[0] = t[0] * o + r[0] * h + i[0] * l + n[0] * c, e[1] = t[1] * o + r[1] * h + i[1] * l + n[1] * c, e[2] = t[2] * o + r[2] * h + i[2] * l + n[2] * c, e;
}
function Sv(e, t, r, i, n, s) {
  var a = 1 - s, o = a * a, h = s * s, l = o * a, c = 3 * s * o, f = 3 * h * a, u = h * s;
  return e[0] = t[0] * l + r[0] * c + i[0] * f + n[0] * u, e[1] = t[1] * l + r[1] * c + i[1] * f + n[1] * u, e[2] = t[2] * l + r[2] * c + i[2] * f + n[2] * u, e;
}
function Iv(e, t) {
  t = t || 1;
  var r = xe() * 2 * Math.PI, i = xe() * 2 - 1, n = Math.sqrt(1 - i * i) * t;
  return e[0] = Math.cos(r) * n, e[1] = Math.sin(r) * n, e[2] = i * t, e;
}
function Rv(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = r[3] * i + r[7] * n + r[11] * s + r[15];
  return a = a || 1, e[0] = (r[0] * i + r[4] * n + r[8] * s + r[12]) / a, e[1] = (r[1] * i + r[5] * n + r[9] * s + r[13]) / a, e[2] = (r[2] * i + r[6] * n + r[10] * s + r[14]) / a, e;
}
function Cv(e, t, r) {
  var i = t[0], n = t[1], s = t[2];
  return e[0] = i * r[0] + n * r[3] + s * r[6], e[1] = i * r[1] + n * r[4] + s * r[7], e[2] = i * r[2] + n * r[5] + s * r[8], e;
}
function zv(e, t, r) {
  var i = r[0], n = r[1], s = r[2], a = r[3], o = t[0], h = t[1], l = t[2], c = n * l - s * h, f = s * o - i * l, u = i * h - n * o, p = n * u - s * f, m = s * c - i * u, g = i * f - n * c, y = a * 2;
  return c *= y, f *= y, u *= y, p *= 2, m *= 2, g *= 2, e[0] = o + c + p, e[1] = h + f + m, e[2] = l + u + g, e;
}
function Lv(e, t, r, i) {
  var n = [], s = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], s[0] = n[0], s[1] = n[1] * Math.cos(i) - n[2] * Math.sin(i), s[2] = n[1] * Math.sin(i) + n[2] * Math.cos(i), e[0] = s[0] + r[0], e[1] = s[1] + r[1], e[2] = s[2] + r[2], e;
}
function Dv(e, t, r, i) {
  var n = [], s = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], s[0] = n[2] * Math.sin(i) + n[0] * Math.cos(i), s[1] = n[1], s[2] = n[2] * Math.cos(i) - n[0] * Math.sin(i), e[0] = s[0] + r[0], e[1] = s[1] + r[1], e[2] = s[2] + r[2], e;
}
function Nv(e, t, r, i) {
  var n = [], s = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], s[0] = n[0] * Math.cos(i) - n[1] * Math.sin(i), s[1] = n[0] * Math.sin(i) + n[1] * Math.cos(i), s[2] = n[2], e[0] = s[0] + r[0], e[1] = s[1] + r[1], e[2] = s[2] + r[2], e;
}
function Pv(e, t) {
  var r = e[0], i = e[1], n = e[2], s = t[0], a = t[1], o = t[2], h = Math.sqrt(r * r + i * i + n * n), l = Math.sqrt(s * s + a * a + o * o), c = h * l, f = c && Si(e, t) / c;
  return Math.acos(Math.min(Math.max(f, -1), 1));
}
function Ov(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e;
}
function Yv(e) {
  return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
}
function Bv(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
}
function Uv(e, t) {
  var r = e[0], i = e[1], n = e[2], s = t[0], a = t[1], o = t[2];
  return Math.abs(r - s) <= C * Math.max(1, Math.abs(r), Math.abs(s)) && Math.abs(i - a) <= C * Math.max(1, Math.abs(i), Math.abs(a)) && Math.abs(n - o) <= C * Math.max(1, Math.abs(n), Math.abs(o));
}
var Fv = ds, jv = ps, kv = ms, Gv = ys, Hv = _s, Ms = us, Vv = gs, Wv = function() {
  var e = bi();
  return function(t, r, i, n, s, a) {
    var o, h;
    for (r || (r = 3), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], e[2] = t[o + 2], s(e, e, a), t[o] = e[0], t[o + 1] = e[1], t[o + 2] = e[2];
    return t;
  };
}();
const Zv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: pv,
  angle: Pv,
  bezier: Sv,
  ceil: mv,
  clone: fv,
  copy: uv,
  create: bi,
  cross: yr,
  dist: Gv,
  distance: ys,
  div: kv,
  divide: ms,
  dot: Si,
  equals: Uv,
  exactEquals: Bv,
  floor: yv,
  forEach: Wv,
  fromValues: ui,
  hermite: bv,
  inverse: xv,
  len: Ms,
  length: us,
  lerp: Tv,
  max: gv,
  min: _v,
  mul: jv,
  multiply: ps,
  negate: Av,
  normalize: ws,
  random: Iv,
  rotateX: Lv,
  rotateY: Dv,
  rotateZ: Nv,
  round: wv,
  scale: Mv,
  scaleAndAdd: Ev,
  set: dv,
  sqrDist: Hv,
  sqrLen: Vv,
  squaredDistance: _s,
  squaredLength: gs,
  str: Yv,
  sub: Fv,
  subtract: ds,
  transformMat3: Cv,
  transformMat4: Rv,
  transformQuat: zv,
  zero: Ov
}, Symbol.toStringTag, { value: "Module" }));
function Es() {
  var e = new Y(4);
  return Y != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function As(e) {
  var t = new Y(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
}
function xs(e, t, r, i) {
  var n = new Y(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n;
}
function Ts(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
function bs(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function Ss(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e;
}
function Is(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e;
}
function Rs(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e[3] = t[3] * r[3], e;
}
function Cs(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e[3] = t[3] / r[3], e;
}
function Xv(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e[3] = Math.ceil(t[3]), e;
}
function Qv(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e[3] = Math.floor(t[3]), e;
}
function Jv(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e[3] = Math.min(t[3], r[3]), e;
}
function qv(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e[3] = Math.max(t[3], r[3]), e;
}
function Kv(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e[3] = Math.round(t[3]), e;
}
function zs(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e;
}
function $v(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e;
}
function Ls(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2], s = t[3] - e[3];
  return Math.hypot(r, i, n, s);
}
function Ds(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2], s = t[3] - e[3];
  return r * r + i * i + n * n + s * s;
}
function Ii(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3];
  return Math.hypot(t, r, i, n);
}
function Ri(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3];
  return t * t + r * r + i * i + n * n;
}
function ef(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e;
}
function tf(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e[3] = 1 / t[3], e;
}
function Ns(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = r * r + i * i + n * n + s * s;
  return a > 0 && (a = 1 / Math.sqrt(a)), e[0] = r * a, e[1] = i * a, e[2] = n * a, e[3] = s * a, e;
}
function Ps(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function rf(e, t, r, i) {
  var n = r[0] * i[1] - r[1] * i[0], s = r[0] * i[2] - r[2] * i[0], a = r[0] * i[3] - r[3] * i[0], o = r[1] * i[2] - r[2] * i[1], h = r[1] * i[3] - r[3] * i[1], l = r[2] * i[3] - r[3] * i[2], c = t[0], f = t[1], u = t[2], p = t[3];
  return e[0] = f * l - u * h + p * o, e[1] = -(c * l) + u * a - p * s, e[2] = c * h - f * a + p * n, e[3] = -(c * o) + f * s - u * n, e;
}
function Os(e, t, r, i) {
  var n = t[0], s = t[1], a = t[2], o = t[3];
  return e[0] = n + i * (r[0] - n), e[1] = s + i * (r[1] - s), e[2] = a + i * (r[2] - a), e[3] = o + i * (r[3] - o), e;
}
function nf(e, t) {
  t = t || 1;
  var r, i, n, s, a, o;
  do
    r = xe() * 2 - 1, i = xe() * 2 - 1, a = r * r + i * i;
  while (a >= 1);
  do
    n = xe() * 2 - 1, s = xe() * 2 - 1, o = n * n + s * s;
  while (o >= 1);
  var h = Math.sqrt((1 - a) / o);
  return e[0] = t * r, e[1] = t * i, e[2] = t * n * h, e[3] = t * s * h, e;
}
function sf(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3];
  return e[0] = r[0] * i + r[4] * n + r[8] * s + r[12] * a, e[1] = r[1] * i + r[5] * n + r[9] * s + r[13] * a, e[2] = r[2] * i + r[6] * n + r[10] * s + r[14] * a, e[3] = r[3] * i + r[7] * n + r[11] * s + r[15] * a, e;
}
function af(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = r[0], o = r[1], h = r[2], l = r[3], c = l * i + o * s - h * n, f = l * n + h * i - a * s, u = l * s + a * n - o * i, p = -a * i - o * n - h * s;
  return e[0] = c * l + p * -a + f * -h - u * -o, e[1] = f * l + p * -o + u * -a - c * -h, e[2] = u * l + p * -h + c * -o - f * -a, e[3] = t[3], e;
}
function of(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e;
}
function hf(e) {
  return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function Ys(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function Bs(e, t) {
  var r = e[0], i = e[1], n = e[2], s = e[3], a = t[0], o = t[1], h = t[2], l = t[3];
  return Math.abs(r - a) <= C * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(i - o) <= C * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(n - h) <= C * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(s - l) <= C * Math.max(1, Math.abs(s), Math.abs(l));
}
var lf = Is, cf = Rs, vf = Cs, ff = Ls, uf = Ds, df = Ii, pf = Ri, mf = function() {
  var e = Es();
  return function(t, r, i, n, s, a) {
    var o, h;
    for (r || (r = 4), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], e[2] = t[o + 2], e[3] = t[o + 3], s(e, e, a), t[o] = e[0], t[o + 1] = e[1], t[o + 2] = e[2], t[o + 3] = e[3];
    return t;
  };
}();
const yf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ss,
  ceil: Xv,
  clone: As,
  copy: Ts,
  create: Es,
  cross: rf,
  dist: ff,
  distance: Ls,
  div: vf,
  divide: Cs,
  dot: Ps,
  equals: Bs,
  exactEquals: Ys,
  floor: Qv,
  forEach: mf,
  fromValues: xs,
  inverse: tf,
  len: df,
  length: Ii,
  lerp: Os,
  max: qv,
  min: Jv,
  mul: cf,
  multiply: Rs,
  negate: ef,
  normalize: Ns,
  random: nf,
  round: Kv,
  scale: zs,
  scaleAndAdd: $v,
  set: bs,
  sqrDist: uf,
  sqrLen: pf,
  squaredDistance: Ds,
  squaredLength: Ri,
  str: hf,
  sub: lf,
  subtract: Is,
  transformMat4: sf,
  transformQuat: af,
  zero: of
}, Symbol.toStringTag, { value: "Module" }));
function gr() {
  var e = new Y(4);
  return Y != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function _f(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function Us(e, t, r) {
  r = r * 0.5;
  var i = Math.sin(r);
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = Math.cos(r), e;
}
function gf(e, t) {
  var r = Math.acos(t[3]) * 2, i = Math.sin(r / 2);
  return i > C ? (e[0] = t[0] / i, e[1] = t[1] / i, e[2] = t[2] / i) : (e[0] = 1, e[1] = 0, e[2] = 0), r;
}
function wf(e, t) {
  var r = zi(e, t);
  return Math.acos(2 * r * r - 1);
}
function Fs(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * c + a * o + n * l - s * h, e[1] = n * c + a * h + s * o - i * l, e[2] = s * c + a * l + i * h - n * o, e[3] = a * c - i * o - n * h - s * l, e;
}
function js(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], s = t[2], a = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + a * o, e[1] = n * h + s * o, e[2] = s * h - n * o, e[3] = a * h - i * o, e;
}
function ks(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], s = t[2], a = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h - s * o, e[1] = n * h + a * o, e[2] = s * h + i * o, e[3] = a * h - n * o, e;
}
function Gs(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], s = t[2], a = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + n * o, e[1] = n * h - i * o, e[2] = s * h + a * o, e[3] = a * h - s * o, e;
}
function Mf(e, t) {
  var r = t[0], i = t[1], n = t[2];
  return e[0] = r, e[1] = i, e[2] = n, e[3] = Math.sqrt(Math.abs(1 - r * r - i * i - n * n)), e;
}
function Hs(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = Math.sqrt(r * r + i * i + n * n), o = Math.exp(s), h = a > 0 ? o * Math.sin(a) / a : 0;
  return e[0] = r * h, e[1] = i * h, e[2] = n * h, e[3] = o * Math.cos(a), e;
}
function Vs(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = Math.sqrt(r * r + i * i + n * n), o = a > 0 ? Math.atan2(a, s) / a : 0;
  return e[0] = r * o, e[1] = i * o, e[2] = n * o, e[3] = 0.5 * Math.log(r * r + i * i + n * n + s * s), e;
}
function Ef(e, t, r) {
  return Vs(e, t), Zs(e, e, r), Hs(e, e), e;
}
function _r(e, t, r, i) {
  var n = t[0], s = t[1], a = t[2], o = t[3], h = r[0], l = r[1], c = r[2], f = r[3], u, p, m, g, y;
  return p = n * h + s * l + a * c + o * f, p < 0 && (p = -p, h = -h, l = -l, c = -c, f = -f), 1 - p > C ? (u = Math.acos(p), m = Math.sin(u), g = Math.sin((1 - i) * u) / m, y = Math.sin(i * u) / m) : (g = 1 - i, y = i), e[0] = g * n + y * h, e[1] = g * s + y * l, e[2] = g * a + y * c, e[3] = g * o + y * f, e;
}
function Af(e) {
  var t = xe(), r = xe(), i = xe(), n = Math.sqrt(1 - t), s = Math.sqrt(t);
  return e[0] = n * Math.sin(2 * Math.PI * r), e[1] = n * Math.cos(2 * Math.PI * r), e[2] = s * Math.sin(2 * Math.PI * i), e[3] = s * Math.cos(2 * Math.PI * i), e;
}
function xf(e, t) {
  var r = t[0], i = t[1], n = t[2], s = t[3], a = r * r + i * i + n * n + s * s, o = a ? 1 / a : 0;
  return e[0] = -r * o, e[1] = -i * o, e[2] = -n * o, e[3] = s * o, e;
}
function Tf(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function Ws(e, t) {
  var r = t[0] + t[4] + t[8], i;
  if (r > 0)
    i = Math.sqrt(r + 1), e[3] = 0.5 * i, i = 0.5 / i, e[0] = (t[5] - t[7]) * i, e[1] = (t[6] - t[2]) * i, e[2] = (t[1] - t[3]) * i;
  else {
    var n = 0;
    t[4] > t[0] && (n = 1), t[8] > t[n * 3 + n] && (n = 2);
    var s = (n + 1) % 3, a = (n + 2) % 3;
    i = Math.sqrt(t[n * 3 + n] - t[s * 3 + s] - t[a * 3 + a] + 1), e[n] = 0.5 * i, i = 0.5 / i, e[3] = (t[s * 3 + a] - t[a * 3 + s]) * i, e[s] = (t[s * 3 + n] + t[n * 3 + s]) * i, e[a] = (t[a * 3 + n] + t[n * 3 + a]) * i;
  }
  return e;
}
function bf(e, t, r, i) {
  var n = 0.5 * Math.PI / 180;
  t *= n, r *= n, i *= n;
  var s = Math.sin(t), a = Math.cos(t), o = Math.sin(r), h = Math.cos(r), l = Math.sin(i), c = Math.cos(i);
  return e[0] = s * h * c - a * o * l, e[1] = a * o * c + s * h * l, e[2] = a * h * l - s * o * c, e[3] = a * h * c + s * o * l, e;
}
function Sf(e) {
  return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
var If = As, Rf = xs, Ci = Ts, Cf = bs, zf = Ss, Lf = Fs, Zs = zs, zi = Ps, Df = Os, Li = Ii, Nf = Li, Di = Ri, Pf = Di, Ni = Ns, Of = Ys, Yf = Bs, Bf = function() {
  var e = bi(), t = ui(1, 0, 0), r = ui(0, 1, 0);
  return function(i, n, s) {
    var a = Si(n, s);
    return a < -0.999999 ? (yr(e, t, n), Ms(e) < 1e-6 && yr(e, r, n), ws(e, e), Us(i, e, Math.PI), i) : a > 0.999999 ? (i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1, i) : (yr(e, n, s), i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = 1 + a, Ni(i, i));
  };
}(), Uf = function() {
  var e = gr(), t = gr();
  return function(r, i, n, s, a, o) {
    return _r(e, i, a, o), _r(t, n, s, o), _r(r, e, t, 2 * o * (1 - o)), r;
  };
}(), Ff = function() {
  var e = is();
  return function(t, r, i, n) {
    return e[0] = i[0], e[3] = i[1], e[6] = i[2], e[1] = n[0], e[4] = n[1], e[7] = n[2], e[2] = -r[0], e[5] = -r[1], e[8] = -r[2], Ni(t, Ws(t, e));
  };
}();
const jf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: zf,
  calculateW: Mf,
  clone: If,
  conjugate: Tf,
  copy: Ci,
  create: gr,
  dot: zi,
  equals: Yf,
  exactEquals: Of,
  exp: Hs,
  fromEuler: bf,
  fromMat3: Ws,
  fromValues: Rf,
  getAngle: wf,
  getAxisAngle: gf,
  identity: _f,
  invert: xf,
  len: Nf,
  length: Li,
  lerp: Df,
  ln: Vs,
  mul: Lf,
  multiply: Fs,
  normalize: Ni,
  pow: Ef,
  random: Af,
  rotateX: js,
  rotateY: ks,
  rotateZ: Gs,
  rotationTo: Bf,
  scale: Zs,
  set: Cf,
  setAxes: Ff,
  setAxisAngle: Us,
  slerp: _r,
  sqlerp: Uf,
  sqrLen: Pf,
  squaredLength: Di,
  str: Sf
}, Symbol.toStringTag, { value: "Module" }));
function kf() {
  var e = new Y(8);
  return Y != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[3] = 1, e;
}
function Gf(e) {
  var t = new Y(8);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t;
}
function Hf(e, t, r, i, n, s, a, o) {
  var h = new Y(8);
  return h[0] = e, h[1] = t, h[2] = r, h[3] = i, h[4] = n, h[5] = s, h[6] = a, h[7] = o, h;
}
function Vf(e, t, r, i, n, s, a) {
  var o = new Y(8);
  o[0] = e, o[1] = t, o[2] = r, o[3] = i;
  var h = n * 0.5, l = s * 0.5, c = a * 0.5;
  return o[4] = h * i + l * r - c * t, o[5] = l * i + c * e - h * r, o[6] = c * i + h * t - l * e, o[7] = -h * e - l * t - c * r, o;
}
function Xs(e, t, r) {
  var i = r[0] * 0.5, n = r[1] * 0.5, s = r[2] * 0.5, a = t[0], o = t[1], h = t[2], l = t[3];
  return e[0] = a, e[1] = o, e[2] = h, e[3] = l, e[4] = i * l + n * h - s * o, e[5] = n * l + s * a - i * h, e[6] = s * l + i * o - n * a, e[7] = -i * a - n * o - s * h, e;
}
function Wf(e, t) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0] * 0.5, e[5] = t[1] * 0.5, e[6] = t[2] * 0.5, e[7] = 0, e;
}
function Zf(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e;
}
function Xf(e, t) {
  var r = gr();
  vs(r, t);
  var i = new Y(3);
  return ls(i, t), Xs(e, r, i), e;
}
function Qs(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e;
}
function Qf(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e;
}
function Jf(e, t, r, i, n, s, a, o, h) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = a, e[6] = o, e[7] = h, e;
}
var qf = Ci;
function Kf(e, t) {
  return e[0] = t[4], e[1] = t[5], e[2] = t[6], e[3] = t[7], e;
}
var $f = Ci;
function eu(e, t) {
  return e[4] = t[0], e[5] = t[1], e[6] = t[2], e[7] = t[3], e;
}
function tu(e, t) {
  var r = t[4], i = t[5], n = t[6], s = t[7], a = -t[0], o = -t[1], h = -t[2], l = t[3];
  return e[0] = (r * l + s * a + i * h - n * o) * 2, e[1] = (i * l + s * o + n * a - r * h) * 2, e[2] = (n * l + s * h + r * o - i * a) * 2, e;
}
function ru(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = r[0] * 0.5, h = r[1] * 0.5, l = r[2] * 0.5, c = t[4], f = t[5], u = t[6], p = t[7];
  return e[0] = i, e[1] = n, e[2] = s, e[3] = a, e[4] = a * o + n * l - s * h + c, e[5] = a * h + s * o - i * l + f, e[6] = a * l + i * h - n * o + u, e[7] = -i * o - n * h - s * l + p, e;
}
function iu(e, t, r) {
  var i = -t[0], n = -t[1], s = -t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * a + c * i + h * s - l * n, u = h * a + c * n + l * i - o * s, p = l * a + c * s + o * n - h * i, m = c * a - o * i - h * n - l * s;
  return js(e, t, r), i = e[0], n = e[1], s = e[2], a = e[3], e[4] = f * a + m * i + u * s - p * n, e[5] = u * a + m * n + p * i - f * s, e[6] = p * a + m * s + f * n - u * i, e[7] = m * a - f * i - u * n - p * s, e;
}
function nu(e, t, r) {
  var i = -t[0], n = -t[1], s = -t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * a + c * i + h * s - l * n, u = h * a + c * n + l * i - o * s, p = l * a + c * s + o * n - h * i, m = c * a - o * i - h * n - l * s;
  return ks(e, t, r), i = e[0], n = e[1], s = e[2], a = e[3], e[4] = f * a + m * i + u * s - p * n, e[5] = u * a + m * n + p * i - f * s, e[6] = p * a + m * s + f * n - u * i, e[7] = m * a - f * i - u * n - p * s, e;
}
function su(e, t, r) {
  var i = -t[0], n = -t[1], s = -t[2], a = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * a + c * i + h * s - l * n, u = h * a + c * n + l * i - o * s, p = l * a + c * s + o * n - h * i, m = c * a - o * i - h * n - l * s;
  return Gs(e, t, r), i = e[0], n = e[1], s = e[2], a = e[3], e[4] = f * a + m * i + u * s - p * n, e[5] = u * a + m * n + p * i - f * s, e[6] = p * a + m * s + f * n - u * i, e[7] = m * a - f * i - u * n - p * s, e;
}
function au(e, t, r) {
  var i = r[0], n = r[1], s = r[2], a = r[3], o = t[0], h = t[1], l = t[2], c = t[3];
  return e[0] = o * a + c * i + h * s - l * n, e[1] = h * a + c * n + l * i - o * s, e[2] = l * a + c * s + o * n - h * i, e[3] = c * a - o * i - h * n - l * s, o = t[4], h = t[5], l = t[6], c = t[7], e[4] = o * a + c * i + h * s - l * n, e[5] = h * a + c * n + l * i - o * s, e[6] = l * a + c * s + o * n - h * i, e[7] = c * a - o * i - h * n - l * s, e;
}
function ou(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * c + a * o + n * l - s * h, e[1] = n * c + a * h + s * o - i * l, e[2] = s * c + a * l + i * h - n * o, e[3] = a * c - i * o - n * h - s * l, o = r[4], h = r[5], l = r[6], c = r[7], e[4] = i * c + a * o + n * l - s * h, e[5] = n * c + a * h + s * o - i * l, e[6] = s * c + a * l + i * h - n * o, e[7] = a * c - i * o - n * h - s * l, e;
}
function hu(e, t, r, i) {
  if (Math.abs(i) < C)
    return Qs(e, t);
  var n = Math.hypot(r[0], r[1], r[2]);
  i = i * 0.5;
  var s = Math.sin(i), a = s * r[0] / n, o = s * r[1] / n, h = s * r[2] / n, l = Math.cos(i), c = t[0], f = t[1], u = t[2], p = t[3];
  e[0] = c * l + p * a + f * h - u * o, e[1] = f * l + p * o + u * a - c * h, e[2] = u * l + p * h + c * o - f * a, e[3] = p * l - c * a - f * o - u * h;
  var m = t[4], g = t[5], y = t[6], M = t[7];
  return e[4] = m * l + M * a + g * h - y * o, e[5] = g * l + M * o + y * a - m * h, e[6] = y * l + M * h + m * o - g * a, e[7] = M * l - m * a - g * o - y * h, e;
}
function lu(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e;
}
function Js(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3], o = r[4], h = r[5], l = r[6], c = r[7], f = t[4], u = t[5], p = t[6], m = t[7], g = r[0], y = r[1], M = r[2], T = r[3];
  return e[0] = i * T + a * g + n * M - s * y, e[1] = n * T + a * y + s * g - i * M, e[2] = s * T + a * M + i * y - n * g, e[3] = a * T - i * g - n * y - s * M, e[4] = i * c + a * o + n * l - s * h + f * T + m * g + u * M - p * y, e[5] = n * c + a * h + s * o - i * l + u * T + m * y + p * g - f * M, e[6] = s * c + a * l + i * h - n * o + p * T + m * M + f * y - u * g, e[7] = a * c - i * o - n * h - s * l + m * T - f * g - u * y - p * M, e;
}
var cu = Js;
function vu(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e;
}
var qs = zi;
function fu(e, t, r, i) {
  var n = 1 - i;
  return qs(t, r) < 0 && (i = -i), e[0] = t[0] * n + r[0] * i, e[1] = t[1] * n + r[1] * i, e[2] = t[2] * n + r[2] * i, e[3] = t[3] * n + r[3] * i, e[4] = t[4] * n + r[4] * i, e[5] = t[5] * n + r[5] * i, e[6] = t[6] * n + r[6] * i, e[7] = t[7] * n + r[7] * i, e;
}
function uu(e, t) {
  var r = Sr(t);
  return e[0] = -t[0] / r, e[1] = -t[1] / r, e[2] = -t[2] / r, e[3] = t[3] / r, e[4] = -t[4] / r, e[5] = -t[5] / r, e[6] = -t[6] / r, e[7] = t[7] / r, e;
}
function du(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e[4] = -t[4], e[5] = -t[5], e[6] = -t[6], e[7] = t[7], e;
}
var Ks = Li, pu = Ks, Sr = Di, mu = Sr;
function yu(e, t) {
  var r = Sr(t);
  if (r > 0) {
    r = Math.sqrt(r);
    var i = t[0] / r, n = t[1] / r, s = t[2] / r, a = t[3] / r, o = t[4], h = t[5], l = t[6], c = t[7], f = i * o + n * h + s * l + a * c;
    e[0] = i, e[1] = n, e[2] = s, e[3] = a, e[4] = (o - i * f) / r, e[5] = (h - n * f) / r, e[6] = (l - s * f) / r, e[7] = (c - a * f) / r;
  }
  return e;
}
function _u(e) {
  return "quat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ")";
}
function gu(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7];
}
function wu(e, t) {
  var r = e[0], i = e[1], n = e[2], s = e[3], a = e[4], o = e[5], h = e[6], l = e[7], c = t[0], f = t[1], u = t[2], p = t[3], m = t[4], g = t[5], y = t[6], M = t[7];
  return Math.abs(r - c) <= C * Math.max(1, Math.abs(r), Math.abs(c)) && Math.abs(i - f) <= C * Math.max(1, Math.abs(i), Math.abs(f)) && Math.abs(n - u) <= C * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(s - p) <= C * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(a - m) <= C * Math.max(1, Math.abs(a), Math.abs(m)) && Math.abs(o - g) <= C * Math.max(1, Math.abs(o), Math.abs(g)) && Math.abs(h - y) <= C * Math.max(1, Math.abs(h), Math.abs(y)) && Math.abs(l - M) <= C * Math.max(1, Math.abs(l), Math.abs(M));
}
const Mu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: lu,
  clone: Gf,
  conjugate: du,
  copy: Qs,
  create: kf,
  dot: qs,
  equals: wu,
  exactEquals: gu,
  fromMat4: Xf,
  fromRotation: Zf,
  fromRotationTranslation: Xs,
  fromRotationTranslationValues: Vf,
  fromTranslation: Wf,
  fromValues: Hf,
  getDual: Kf,
  getReal: qf,
  getTranslation: tu,
  identity: Qf,
  invert: uu,
  len: pu,
  length: Ks,
  lerp: fu,
  mul: cu,
  multiply: Js,
  normalize: yu,
  rotateAroundAxis: hu,
  rotateByQuatAppend: au,
  rotateByQuatPrepend: ou,
  rotateX: iu,
  rotateY: nu,
  rotateZ: su,
  scale: vu,
  set: Jf,
  setDual: eu,
  setReal: $f,
  sqrLen: mu,
  squaredLength: Sr,
  str: _u,
  translate: ru
}, Symbol.toStringTag, { value: "Module" }));
function $s() {
  var e = new Y(2);
  return Y != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function Eu(e) {
  var t = new Y(2);
  return t[0] = e[0], t[1] = e[1], t;
}
function Au(e, t) {
  var r = new Y(2);
  return r[0] = e, r[1] = t, r;
}
function xu(e, t) {
  return e[0] = t[0], e[1] = t[1], e;
}
function Tu(e, t, r) {
  return e[0] = t, e[1] = r, e;
}
function bu(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function ea(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function ta(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e;
}
function ra(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e;
}
function Su(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e;
}
function Iu(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e;
}
function Ru(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function Cu(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
function zu(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e;
}
function Lu(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function Du(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e;
}
function ia(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1];
  return Math.hypot(r, i);
}
function na(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1];
  return r * r + i * i;
}
function sa(e) {
  var t = e[0], r = e[1];
  return Math.hypot(t, r);
}
function aa(e) {
  var t = e[0], r = e[1];
  return t * t + r * r;
}
function Nu(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e;
}
function Pu(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e;
}
function Ou(e, t) {
  var r = t[0], i = t[1], n = r * r + i * i;
  return n > 0 && (n = 1 / Math.sqrt(n)), e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function Yu(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function Bu(e, t, r) {
  var i = t[0] * r[1] - t[1] * r[0];
  return e[0] = e[1] = 0, e[2] = i, e;
}
function Uu(e, t, r, i) {
  var n = t[0], s = t[1];
  return e[0] = n + i * (r[0] - n), e[1] = s + i * (r[1] - s), e;
}
function Fu(e, t) {
  t = t || 1;
  var r = xe() * 2 * Math.PI;
  return e[0] = Math.cos(r) * t, e[1] = Math.sin(r) * t, e;
}
function ju(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n, e[1] = r[1] * i + r[3] * n, e;
}
function ku(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e;
}
function Gu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[3] * n + r[6], e[1] = r[1] * i + r[4] * n + r[7], e;
}
function Hu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[4] * n + r[12], e[1] = r[1] * i + r[5] * n + r[13], e;
}
function Vu(e, t, r, i) {
  var n = t[0] - r[0], s = t[1] - r[1], a = Math.sin(i), o = Math.cos(i);
  return e[0] = n * o - s * a + r[0], e[1] = n * a + s * o + r[1], e;
}
function Wu(e, t) {
  var r = e[0], i = e[1], n = t[0], s = t[1], a = Math.sqrt(r * r + i * i) * Math.sqrt(n * n + s * s), o = a && (r * n + i * s) / a;
  return Math.acos(Math.min(Math.max(o, -1), 1));
}
function Zu(e) {
  return e[0] = 0, e[1] = 0, e;
}
function Xu(e) {
  return "vec2(" + e[0] + ", " + e[1] + ")";
}
function Qu(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function Ju(e, t) {
  var r = e[0], i = e[1], n = t[0], s = t[1];
  return Math.abs(r - n) <= C * Math.max(1, Math.abs(r), Math.abs(n)) && Math.abs(i - s) <= C * Math.max(1, Math.abs(i), Math.abs(s));
}
var qu = sa, Ku = ea, $u = ta, ed = ra, td = ia, rd = na, id = aa, nd = function() {
  var e = $s();
  return function(t, r, i, n, s, a) {
    var o, h;
    for (r || (r = 2), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], s(e, e, a), t[o] = e[0], t[o + 1] = e[1];
    return t;
  };
}();
const sd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: bu,
  angle: Wu,
  ceil: Su,
  clone: Eu,
  copy: xu,
  create: $s,
  cross: Bu,
  dist: td,
  distance: ia,
  div: ed,
  divide: ra,
  dot: Yu,
  equals: Ju,
  exactEquals: Qu,
  floor: Iu,
  forEach: nd,
  fromValues: Au,
  inverse: Pu,
  len: qu,
  length: sa,
  lerp: Uu,
  max: Cu,
  min: Ru,
  mul: $u,
  multiply: ta,
  negate: Nu,
  normalize: Ou,
  random: Fu,
  rotate: Vu,
  round: zu,
  scale: Lu,
  scaleAndAdd: Du,
  set: Tu,
  sqrDist: rd,
  sqrLen: id,
  squaredDistance: na,
  squaredLength: aa,
  str: Xu,
  sub: Ku,
  subtract: ea,
  transformMat2: ju,
  transformMat2d: ku,
  transformMat3: Gu,
  transformMat4: Hu,
  zero: Zu
}, Symbol.toStringTag, { value: "Module" })), ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: $h,
  mat2: xl,
  mat2d: Xl,
  mat3: xc,
  mat4: vv,
  quat: jf,
  quat2: Mu,
  vec2: sd,
  vec3: Zv,
  vec4: yf
}, Symbol.toStringTag, { value: "Module" })), se = /* @__PURE__ */ Wo(ad);
function od(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
var Rt = od, hd = 256, ln = 256, dr = Rt, ld = se.vec4, wr = se.vec3, St = se.mat4;
function cn(e, t, r) {
  var i = e.createShader(t);
  if (e.shaderSource(i, r), e.compileShader(i), !e.getShaderParameter(i, e.COMPILE_STATUS))
    throw e.getShaderInfoLog(i);
  return i;
}
function cd(e, t, r, i, n) {
  var s = cn(e, e.VERTEX_SHADER, t), a = cn(e, e.FRAGMENT_SHADER, r), o = e.createProgram();
  if (e.attachShader(o, s), e.attachShader(o, a), e.linkProgram(o), !e.getProgramParameter(o, e.LINK_STATUS))
    throw e.getProgramInfoLog(o);
  for (var h = 0; h < i.length; h++) {
    var l = i[h];
    if (o[l] = e.getAttribLocation(o, l), o[l] === -1)
      throw new Error("Shader program has no " + l + " attribute");
  }
  for (var c = 0; c < n.length; c++) {
    var f = n[c];
    if (o[f] = e.getUniformLocation(o, f), o[f] === -1)
      throw new Error("Shader program has no " + f + " uniform");
  }
  return o;
}
function vd(e, t) {
  for (var r = e.getAttachedShaders(t), i = 0; i < r.length; i++) {
    var n = r[i];
    e.detachShader(t, n), e.deleteShader(n);
  }
  e.deleteProgram(t);
}
function Jr(e, t, r, i) {
  var n = e.createBuffer();
  return e.bindBuffer(t, n), e.bufferData(t, i, r), n;
}
function fd(e, t, r, i) {
  return {
    vertexIndices: Jr(e, e.ELEMENT_ARRAY_BUFFER, e.STATIC_DRAW, new Uint16Array(t)),
    vertexPositions: Jr(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(r)),
    textureCoords: Jr(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(i))
  };
}
function ud(e, t) {
  e.deleteBuffer(t.vertexIndices), e.deleteBuffer(t.vertexPositions), e.deleteBuffer(t.textureCoords);
}
function dd(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.enableVertexAttribArray(i);
}
function pd(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.disableVertexAttribArray(i);
}
function md(e, t, r) {
  e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, r._texture), e.uniform1i(t.uSampler, 0);
}
function yd(e, t, r, i) {
  var n = ((r + 1) * ln - i) / (ln * hd);
  e.uniform1f(t.uDepth, n);
}
var _d = 1, gd = ld.create(), oa = St.create();
St.identity(oa);
function wd(e, t, r) {
  var i = _d;
  t && t.opacity != null && (i = t.opacity), e.uniform1f(r.opacity, i);
  var n = gd;
  t && t.colorOffset && (n = t.colorOffset), e.uniform4fv(r.colorOffset, n);
  var s = oa;
  t && t.colorMatrix && (s = t.colorMatrix), e.uniformMatrix4fv(r.colorMatrix, !1, s);
}
var vn = wr.create(), fn = wr.create();
function Md(e, t, r, i) {
  if (r.x === 0 && r.width === 1 && r.y === 0 && r.height === 1) {
    e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), St.identity(i);
    return;
  }
  var n = r.x, s = dr(n, 0, 1), a = s - n, o = 1 - s, h = dr(r.width - a, 0, o), l = r.width - h, c = 1 - r.height - r.y, f = dr(c, 0, 1), u = f - c, p = 1 - f, m = dr(r.height - u, 0, p), g = r.height - m;
  wr.set(
    fn,
    r.width / h,
    r.height / m,
    1
  ), wr.set(
    vn,
    (l - a) / h,
    (g - u) / m,
    0
  ), St.identity(i), St.translate(i, i, vn), St.scale(i, i, fn), e.viewport(
    e.drawingBufferWidth * s,
    e.drawingBufferHeight * f,
    e.drawingBufferWidth * h,
    e.drawingBufferHeight * m
  );
}
var ha = {
  createShaderProgram: cd,
  destroyShaderProgram: vd,
  createConstantBuffers: fd,
  destroyConstantBuffers: ud,
  enableAttributes: dd,
  disableAttributes: pd,
  setTexture: md,
  setDepth: yd,
  setViewport: Md,
  setupPixelEffectUniforms: wd
}, Ed = [
  "attribute vec3 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "uniform float uDepth;",
  "uniform mat4 uViewportMatrix;",
  "uniform mat4 uProjMatrix;",
  "varying vec2 vTextureCoord;",
  "void main(void) {",
  "  gl_Position = uViewportMatrix * uProjMatrix * vec4(aVertexPosition.xy, 0.0, 1.0);",
  "  gl_Position.z = uDepth * gl_Position.w;",
  "  vTextureCoord = aTextureCoord;",
  "}"
].join(`
`), Ad = [
  "#ifdef GL_FRAGMENT_PRECISION_HIGH",
  "precision highp float;",
  "#else",
  "precision mediump float;",
  "#endif",
  "uniform sampler2D uSampler;",
  "uniform float uOpacity;",
  "uniform vec4 uColorOffset;",
  "uniform mat4 uColorMatrix;",
  "varying vec2 vTextureCoord;",
  "void main(void) {",
  "  vec4 color = texture2D(uSampler, vTextureCoord) * uColorMatrix + uColorOffset;",
  "  gl_FragColor = vec4(color.rgba * uOpacity);",
  "}"
].join(`
`), ft = se.mat4, un = se.vec3, xd = X, De = ha, Td = De.createConstantBuffers, bd = De.destroyConstantBuffers, Sd = De.createShaderProgram, Id = De.destroyShaderProgram, Rd = De.enableAttributes, Cd = De.disableAttributes, zd = De.setViewport, Ld = De.setupPixelEffectUniforms, Dd = De.setDepth, Nd = De.setTexture, Pd = Ed, Od = Ad, la = [0, 1, 2, 0, 2, 3], Yd = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], Bd = [0, 0, 1, 0, 1, 1, 0, 1], Ud = ["aVertexPosition", "aTextureCoord"], Fd = [
  "uDepth",
  "uOpacity",
  "uSampler",
  "uProjMatrix",
  "uViewportMatrix",
  "uColorOffset",
  "uColorMatrix"
];
function Xt(e) {
  this.gl = e, this.projMatrix = ft.create(), this.viewportMatrix = ft.create(), this.translateVector = un.create(), this.scaleVector = un.create(), this.constantBuffers = Td(e, la, Yd, Bd), this.shaderProgram = Sd(e, Pd, Od, Ud, Fd);
}
Xt.prototype.destroy = function() {
  bd(this.gl, this.constantBuffers), Id(this.gl, this.shaderProgram), xd(this);
};
Xt.prototype.startLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram, n = this.constantBuffers, s = this.viewportMatrix;
  r.useProgram(i), Rd(r, i), zd(r, e, t, s), r.uniformMatrix4fv(i.uViewportMatrix, !1, s), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), r.vertexAttribPointer(i.aTextureCoord, 2, r.FLOAT, r.FALSE, 0, 0), Ld(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  });
};
Xt.prototype.endLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram;
  Cd(r, i);
};
Xt.prototype.renderTile = function(e, t, r, i) {
  var n = this.gl, s = this.shaderProgram, a = this.constantBuffers, o = this.projMatrix, h = this.translateVector, l = this.scaleVector;
  h[0] = e.centerX(), h[1] = e.centerY(), h[2] = -0.5, l[0] = e.scaleX(), l[1] = e.scaleY(), l[2] = 1, ft.copy(o, r.view().projection()), ft.rotateX(o, o, e.rotX()), ft.rotateY(o, o, e.rotY()), ft.translate(o, o, h), ft.scale(o, o, l), n.uniformMatrix4fv(s.uProjMatrix, !1, o), Dd(n, s, i, e.z), Nd(n, s, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, a.vertexIndices), n.drawElements(n.TRIANGLES, la.length, n.UNSIGNED_SHORT, 0);
};
var ca = Xt, jd = ca, kd = Le;
function va() {
  this.constructor.super_.apply(this, arguments);
}
kd(va, jd);
var fa = va, Gd = ca, Hd = Le;
function ua() {
  this.constructor.super_.apply(this, arguments);
}
Hd(ua, Gd);
var da = ua, Vd = [
  "attribute vec3 aVertexPosition;",
  "uniform float uDepth;",
  "uniform mat4 uViewportMatrix;",
  "uniform mat4 uInvProjMatrix;",
  "varying vec4 vRay;",
  "void main(void) {",
  "  vRay = uInvProjMatrix * vec4(aVertexPosition.xy, 1.0, 1.0);",
  "  gl_Position = uViewportMatrix * vec4(aVertexPosition.xy, uDepth, 1.0);",
  "}"
].join(`
`), Wd = [
  "#ifdef GL_FRAGMENT_PRECISION_HIGH",
  "precision highp float;",
  "#else",
  "precision mediump float",
  "#endif",
  "uniform sampler2D uSampler;",
  "uniform float uOpacity;",
  "uniform float uTextureX;",
  "uniform float uTextureY;",
  "uniform float uTextureWidth;",
  "uniform float uTextureHeight;",
  "uniform vec4 uColorOffset;",
  "uniform mat4 uColorMatrix;",
  "varying vec4 vRay;",
  "const float PI = 3.14159265358979323846264;",
  "void main(void) {",
  "  float r = inversesqrt(vRay.x * vRay.x + vRay.y * vRay.y + vRay.z * vRay.z);",
  "  float phi  = acos(vRay.y * r);",
  "  float theta = atan(vRay.x, -1.0*vRay.z);",
  "  float s = 0.5 + 0.5 * theta / PI;",
  "  float t = 1.0 - phi / PI;",
  "  s = s * uTextureWidth + uTextureX;",
  "  t = t * uTextureHeight + uTextureY;",
  "  vec4 color = texture2D(uSampler, vec2(s, t)) * uColorMatrix + uColorOffset;",
  "  gl_FragColor = vec4(color.rgba * uOpacity);",
  "}"
].join(`
`), Mr = se.mat4, Zd = X, Ne = ha, Xd = Ne.createConstantBuffers, Qd = Ne.destroyConstantBuffers, Jd = Ne.createShaderProgram, qd = Ne.destroyShaderProgram, Kd = Ne.enableAttributes, $d = Ne.disableAttributes, ep = Ne.setViewport, tp = Ne.setupPixelEffectUniforms, rp = Ne.setDepth, ip = Ne.setTexture, np = Vd, sp = Wd, pa = [0, 1, 2, 0, 2, 3], ap = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], op = [0, 0, 1, 0, 1, 1, 0, 1], hp = ["aVertexPosition"], lp = [
  "uDepth",
  "uOpacity",
  "uSampler",
  "uInvProjMatrix",
  "uViewportMatrix",
  "uColorOffset",
  "uColorMatrix",
  "uTextureX",
  "uTextureY",
  "uTextureWidth",
  "uTextureHeight"
];
function Qt(e) {
  this.gl = e, this.invProjMatrix = Mr.create(), this.viewportMatrix = Mr.create(), this.constantBuffers = Xd(e, pa, ap, op), this.shaderProgram = Jd(e, np, sp, hp, lp);
}
Qt.prototype.destroy = function() {
  Qd(this.gl, this.constantBuffers), qd(this.gl, this.shaderProgram), Zd(this);
};
Qt.prototype.startLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram, n = this.constantBuffers, s = this.invProjMatrix, a = this.viewportMatrix;
  r.useProgram(i), Kd(r, i), ep(r, e, t, a), r.uniformMatrix4fv(i.uViewportMatrix, !1, a), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), Mr.copy(s, e.view().projection()), Mr.invert(s, s), r.uniformMatrix4fv(i.uInvProjMatrix, !1, s);
  var o = e.effects().textureCrop || {}, h = o.x != null ? o.x : 0, l = o.y != null ? o.y : 0, c = o.width != null ? o.width : 1, f = o.height != null ? o.height : 1;
  r.uniform1f(i.uTextureX, h), r.uniform1f(i.uTextureY, l), r.uniform1f(i.uTextureWidth, c), r.uniform1f(i.uTextureHeight, f), tp(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  });
};
Qt.prototype.endLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram;
  $d(r, i);
};
Qt.prototype.renderTile = function(e, t, r, i) {
  var n = this.gl, s = this.shaderProgram, a = this.constantBuffers;
  rp(n, s, i, e.z), ip(n, s, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, a.vertexIndices), n.drawElements(n.TRIANGLES, pa.length, n.UNSIGNED_SHORT, 0);
};
var ma = Qt, cp = fa, vp = da, fp = ma;
function up(e) {
  switch (e.type) {
    case "webgl":
      e.registerRenderer("flat", "flat", vp), e.registerRenderer("cube", "rectilinear", cp), e.registerRenderer("equirect", "rectilinear", fp);
      break;
    default:
      throw new Error("Unknown stage type: " + e.type);
  }
}
var ya = up;
function dp() {
  for (var e = 0, t = 0; t < arguments.length; t++) {
    var r = arguments[t];
    e += r, e += r << 10, e ^= r >> 6;
  }
  return e += e << 3, e ^= e >> 11, e += e << 15, e >= 0 ? e : -e;
}
var Ir = dp;
function pp(e, t) {
  return (+e % (t = +t) + t) % t;
}
var nt = pp, Pi = nt, mp = 64;
function mt(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Set: invalid capacity");
  this._capacity = this._capacity || mp, this._buckets = [];
  for (var t = 0; t < this._capacity; t++)
    this._buckets.push([]);
  this._size = 0;
}
mt.prototype.add = function(e) {
  for (var t = Pi(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return r[i] = e, n;
  }
  return r.push(e), this._size++, null;
};
mt.prototype.remove = function(e) {
  for (var t = Pi(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      for (var s = i; s < r.length - 1; s++)
        r[s] = r[s + 1];
      return r.length = r.length - 1, this._size--, n;
    }
  }
  return null;
};
mt.prototype.has = function(e) {
  for (var t = Pi(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return !0;
  }
  return !1;
};
mt.prototype.size = function() {
  return this._size;
};
mt.prototype.clear = function() {
  for (var e = 0; e < this._capacity; e++)
    this._buckets[e].length = 0;
  this._size = 0;
};
mt.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._buckets[r], n = 0; n < i.length; n++)
      e(i[n]), t += 1;
  return t;
};
var _a = mt, yp = _a;
function Oi() {
  this._stack = [], this._visited = new yp(), this._vertices = null;
}
Oi.prototype.search = function(e, t, r) {
  var i = this._stack, n = this._visited, s = this._vertices, a = 0;
  for (this._clear(), i.push(t); i.length > 0; ) {
    var o = i.pop();
    if (!n.has(o) && e.intersects(o.vertices(s))) {
      n.add(o);
      for (var h = o.neighbors(), l = 0; l < h.length; l++)
        i.push(h[l]);
      r.push(o), a++;
    }
  }
  return this._vertices = s, this._clear(), a;
};
Oi.prototype._clear = function() {
  this._stack.length = 0, this._visited.clear();
};
var ga = Oi, _p = nt;
function We(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruMap: invalid capacity");
  this._capacity = e, this._keys = new Array(this._capacity), this._values = new Array(this._capacity), this._start = 0, this._size = 0;
}
We.prototype._index = function(e) {
  return _p(this._start + e, this._capacity);
};
We.prototype.get = function(e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._keys[this._index(t)];
    if (e.equals(r))
      return this._values[this._index(t)];
  }
  return null;
};
We.prototype.set = function(e, t) {
  if (this._capacity === 0)
    return e;
  this.del(e);
  var r = this._size === this._capacity ? this._keys[this._index(0)] : null;
  return this._keys[this._index(this._size)] = e, this._values[this._index(this._size)] = t, this._size < this._capacity ? this._size++ : this._start = this._index(1), r;
};
We.prototype.del = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)])) {
      for (var r = this._values[this._index(t)], i = t; i < this._size - 1; i++)
        this._keys[this._index(i)] = this._keys[this._index(i + 1)], this._values[this._index(i)] = this._values[this._index(i + 1)];
      return this._size--, r;
    }
  return null;
};
We.prototype.has = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)]))
      return !0;
  return !1;
};
We.prototype.size = function() {
  return this._size;
};
We.prototype.clear = function() {
  this._keys.length = 0, this._values.length = 0, this._start = 0, this._size = 0;
};
We.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._keys[this._index(r)], this._values[this._index(r)]), t += 1;
  return t;
};
var wa = We;
function Rr(e) {
  this._fallbackOnly = !!e.fallbackOnly;
}
Rr.prototype.numHorizontalTiles = function() {
  return Math.ceil(this.width() / this.tileWidth());
};
Rr.prototype.numVerticalTiles = function() {
  return Math.ceil(this.height() / this.tileHeight());
};
Rr.prototype.fallbackOnly = function() {
  return this._fallbackOnly;
};
var Yi = Rr;
function gp(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
var Jt = gp, wp = Jt;
function Mp(e, t) {
  for (var r = [], i = 0; i < e.length; i++)
    r.push(new t(e[i]));
  return r.sort(function(n, s) {
    return wp(n.width(), s.width());
  }), r;
}
function Ep(e) {
  for (var t = [], r = 0; r < e.length; r++)
    e[r]._fallbackOnly || t.push(e[r]);
  if (!t.length)
    throw new Error("No selectable levels in list");
  return t;
}
var qt = {
  makeLevelList: Mp,
  makeSelectableLevelList: Ep
};
function Ap(e) {
  var t = typeof e;
  if (t === "object") {
    if (e === null)
      return "null";
    if (Object.prototype.toString.call(e) === "[object Array]")
      return "array";
    if (Object.prototype.toString.call(e) === "[object RegExp]")
      return "regexp";
  }
  return t;
}
var Kt = Ap, xp = Le, Tp = Ir, bp = ga, Sp = wa, Ip = Yi, Rp = qt.makeLevelList, Cp = qt.makeSelectableLevelList, Er = Rt, pr = Jt, zp = Kt, le = se.vec3, di = se.vec4, Lp = 64, ut = "fudlrb", dt = {
  f: { x: 0, y: 0 },
  b: { x: 0, y: Math.PI },
  l: { x: 0, y: Math.PI / 2 },
  r: { x: 0, y: -Math.PI / 2 },
  u: { x: Math.PI / 2, y: 0 },
  d: { x: -Math.PI / 2, y: 0 }
}, qr = le.create();
function Ht(e, t, r, i) {
  t && le.rotateZ(e, e, qr, t), r && le.rotateX(e, e, qr, r), i && le.rotateY(e, e, qr, i);
}
var pi = {};
for (var Kr = 0; Kr < ut.length; Kr++) {
  var dn = ut[Kr], pn = dt[dn], mn = le.fromValues(0, 0, -1);
  Ht(mn, 0, pn.x, pn.y), pi[dn] = mn;
}
var mr = {
  f: ["l", "r", "u", "d"],
  b: ["r", "l", "u", "d"],
  l: ["b", "f", "u", "d"],
  r: ["f", "b", "u", "d"],
  u: ["l", "r", "b", "f"],
  d: ["l", "r", "f", "b"]
}, $r = [
  [0, 1],
  // top
  [1, 0],
  // right
  [0, -1],
  // bottom
  [-1, 0]
  // left
];
function J(e, t, r, i, n) {
  this.face = e, this.x = t, this.y = r, this.z = i, this._geometry = n, this._level = n.levelList[i];
}
J.prototype.rotX = function() {
  return dt[this.face].x;
};
J.prototype.rotY = function() {
  return dt[this.face].y;
};
J.prototype.centerX = function() {
  return (this.x + 0.5) / this._level.numHorizontalTiles() - 0.5;
};
J.prototype.centerY = function() {
  return 0.5 - (this.y + 0.5) / this._level.numVerticalTiles();
};
J.prototype.scaleX = function() {
  return 1 / this._level.numHorizontalTiles();
};
J.prototype.scaleY = function() {
  return 1 / this._level.numVerticalTiles();
};
J.prototype.vertices = function(e) {
  e || (e = [le.create(), le.create(), le.create(), le.create()]);
  var t = dt[this.face];
  function r(o, h, l) {
    le.set(o, h, l, -0.5), Ht(o, 0, t.x, t.y);
  }
  var i = this.centerX() - this.scaleX() / 2, n = this.centerX() + this.scaleX() / 2, s = this.centerY() - this.scaleY() / 2, a = this.centerY() + this.scaleY() / 2;
  return r(e[0], i, a), r(e[1], n, a), r(e[2], n, s), r(e[3], i, s), e;
};
J.prototype.parent = function() {
  if (this.z === 0)
    return null;
  var e = this.face, t = this.z, r = this.x, i = this.y, n = this._geometry, s = n.levelList[t], a = n.levelList[t - 1], o = Math.floor(r / s.numHorizontalTiles() * a.numHorizontalTiles()), h = Math.floor(i / s.numVerticalTiles() * a.numVerticalTiles()), l = t - 1;
  return new J(e, o, h, l, n);
};
J.prototype.children = function(e) {
  if (this.z === this._geometry.levelList.length - 1)
    return null;
  var t = this.face, r = this.z, i = this.x, n = this.y, s = this._geometry, a = s.levelList[r], o = s.levelList[r + 1], h = o.numHorizontalTiles() / a.numHorizontalTiles(), l = o.numVerticalTiles() / a.numVerticalTiles();
  e = e || [];
  for (var c = 0; c < h; c++)
    for (var f = 0; f < l; f++) {
      var u = h * i + c, p = l * n + f, m = r + 1;
      e.push(new J(t, u, p, m, s));
    }
  return e;
};
J.prototype.neighbors = function() {
  var e = this._geometry, t = e._neighborsCache, r = t.get(this);
  if (r)
    return r;
  for (var i = e._vec, n = this.face, s = this.x, a = this.y, o = this.z, h = this._level, l = h.numHorizontalTiles(), c = h.numVerticalTiles(), f = [], u = 0; u < $r.length; u++) {
    var p = $r[u][0], m = $r[u][1], g = s + p, y = a + m, M = o, T = n;
    if (g < 0 || g >= l || y < 0 || y >= c) {
      var b = this.centerX(), S = this.centerY();
      g < 0 ? (le.set(i, -0.5, S, -0.5), T = mr[n][0]) : g >= l ? (le.set(i, 0.5, S, -0.5), T = mr[n][1]) : y < 0 ? (le.set(i, b, 0.5, -0.5), T = mr[n][2]) : y >= c && (le.set(i, b, -0.5, -0.5), T = mr[n][3]);
      var R;
      R = dt[n], Ht(i, 0, R.x, R.y), R = dt[T], Ht(i, 0, -R.x, -R.y), g = Er(Math.floor((0.5 + i[0]) * l), 0, l - 1), y = Er(Math.floor((0.5 - i[1]) * c), 0, c - 1);
    }
    f.push(new J(T, g, y, M, e));
  }
  return t.set(this, f), f;
};
J.prototype.hash = function() {
  return Tp(ut.indexOf(this.face), this.z, this.y, this.x);
};
J.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.face === e.face && this.z === e.z && this.y === e.y && this.x === e.x;
};
J.prototype.cmp = function(e) {
  return pr(this.z, e.z) || pr(ut.indexOf(this.face), ut.indexOf(e.face)) || pr(this.y, e.y) || pr(this.x, e.x);
};
J.prototype.str = function() {
  return "CubeTile(" + tile.face + ", " + tile.x + ", " + tile.y + ", " + tile.z + ")";
};
function yt(e) {
  if (this.constructor.super_.call(this, e), this._size = e.size, this._tileSize = e.tileSize, this._size % this._tileSize !== 0)
    throw new Error("Level size is not multiple of tile size: " + this._size + " " + this._tileSize);
}
xp(yt, Ip);
yt.prototype.width = function() {
  return this._size;
};
yt.prototype.height = function() {
  return this._size;
};
yt.prototype.tileWidth = function() {
  return this._tileSize;
};
yt.prototype.tileHeight = function() {
  return this._tileSize;
};
yt.prototype._validateWithParentLevel = function(e) {
  var t = this.width(), r = this.height(), i = this.tileWidth(), n = this.tileHeight(), s = this.numHorizontalTiles(), a = this.numVerticalTiles(), o = e.width(), h = e.height(), l = e.tileWidth(), c = e.tileHeight(), f = e.numHorizontalTiles(), u = e.numVerticalTiles();
  if (t % o !== 0)
    throw new Error("Level width must be multiple of parent level: " + t + " vs. " + o);
  if (r % h !== 0)
    throw new Error("Level height must be multiple of parent level: " + r + " vs. " + h);
  if (s % f !== 0)
    throw new Error("Number of horizontal tiles must be multiple of parent level: " + s + " (" + t + "/" + i + ") vs. " + f + " (" + o + "/" + l + ")");
  if (a % u !== 0)
    throw new Error("Number of vertical tiles must be multiple of parent level: " + a + " (" + r + "/" + n + ") vs. " + u + " (" + h + "/" + c + ")");
};
function ke(e) {
  if (zp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = Rp(e, yt), this.selectableLevelList = Cp(this.levelList);
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new bp(), this._neighborsCache = new Sp(Lp), this._vec = di.create(), this._viewSize = {};
}
ke.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
ke.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e), i = e.numHorizontalTiles() - 1, n = e.numVerticalTiles() - 1;
  t = t || [];
  for (var s = 0; s < ut.length; s++)
    for (var a = ut[s], o = 0; o <= i; o++)
      for (var h = 0; h <= n; h++)
        t.push(new J(a, o, h, r, this));
  return t;
};
ke.prototype._closestTile = function(e, t) {
  var r = this._vec;
  di.set(r, 0, 0, 1, 1), di.transformMat4(r, r, e.inverseProjection());
  var i = 1 / 0, n = null;
  for (var s in pi) {
    var a = pi[s], o = 1 - le.dot(a, r);
    o < i && (i = o, n = s);
  }
  for (var h = Math.max(Math.abs(r[0]), Math.abs(r[1]), Math.abs(r[2])) / 0.5, l = 0; l < 3; l++)
    r[l] = r[l] / h;
  var c = dt[n];
  Ht(r, 0, -c.x, -c.y);
  var f = this.levelList.indexOf(t), u = t.numHorizontalTiles(), p = t.numVerticalTiles(), m = Er(Math.floor((0.5 + r[0]) * u), 0, u - 1), g = Er(Math.floor((0.5 - r[1]) * p), 0, p - 1);
  return new J(n, m, g, f, this);
};
ke.prototype.visibleTiles = function(e, t, r) {
  var i = this._viewSize, n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0)
    return r;
  var s = this._closestTile(e, t), a = n.search(e, s, r);
  if (!a)
    throw new Error("Starting tile is not visible");
  return r;
};
ke.Tile = ke.prototype.Tile = J;
ke.type = ke.prototype.type = "cube";
J.type = J.prototype.type = "cube";
var Dp = ke, Np = Le, Pp = Ir, Op = ga, Yp = wa, Bp = Yi, Up = qt.makeLevelList, Fp = qt.makeSelectableLevelList, yn = Rt, Ma = nt, ei = Jt, jp = Kt, qe = se.vec2, mi = se.vec4, kp = 64, ti = [
  [0, 1],
  // top
  [1, 0],
  // right
  [0, -1],
  // bottom
  [-1, 0]
  // left
];
function H(e, t, r, i) {
  this.x = e, this.y = t, this.z = r, this._geometry = i, this._level = i.levelList[r];
}
H.prototype.rotX = function() {
  return 0;
};
H.prototype.rotY = function() {
  return 0;
};
H.prototype.centerX = function() {
  var e = this._level.width(), t = this._level.tileWidth();
  return (this.x * t + 0.5 * this.width()) / e - 0.5;
};
H.prototype.centerY = function() {
  var e = this._level.height(), t = this._level.tileHeight();
  return 0.5 - (this.y * t + 0.5 * this.height()) / e;
};
H.prototype.scaleX = function() {
  var e = this._level.width();
  return this.width() / e;
};
H.prototype.scaleY = function() {
  var e = this._level.height();
  return this.height() / e;
};
H.prototype.width = function() {
  var e = this._level.width(), t = this._level.tileWidth();
  if (this.x === this._level.numHorizontalTiles() - 1) {
    var r = Ma(e, t);
    return r || t;
  } else
    return t;
};
H.prototype.height = function() {
  var e = this._level.height(), t = this._level.tileHeight();
  if (this.y === this._level.numVerticalTiles() - 1) {
    var r = Ma(e, t);
    return r || t;
  } else
    return t;
};
H.prototype.levelWidth = function() {
  return this._level.width();
};
H.prototype.levelHeight = function() {
  return this._level.height();
};
H.prototype.vertices = function(e) {
  e || (e = [qe.create(), qe.create(), qe.create(), qe.create()]);
  var t = this.centerX() - this.scaleX() / 2, r = this.centerX() + this.scaleX() / 2, i = this.centerY() - this.scaleY() / 2, n = this.centerY() + this.scaleY() / 2;
  return qe.set(e[0], t, n), qe.set(e[1], r, n), qe.set(e[2], r, i), qe.set(e[3], t, i), e;
};
H.prototype.parent = function() {
  if (this.z === 0)
    return null;
  var e = this._geometry, t = this.z - 1, r = Math.floor(this.x / 2), i = Math.floor(this.y / 2);
  return new H(r, i, t, e);
};
H.prototype.children = function(e) {
  if (this.z === this._geometry.levelList.length - 1)
    return null;
  var t = this._geometry, r = this.z + 1;
  return e = e || [], e.push(new H(2 * this.x, 2 * this.y, r, t)), e.push(new H(2 * this.x, 2 * this.y + 1, r, t)), e.push(new H(2 * this.x + 1, 2 * this.y, r, t)), e.push(new H(2 * this.x + 1, 2 * this.y + 1, r, t)), e;
};
H.prototype.neighbors = function() {
  var e = this._geometry, t = e._neighborsCache, r = t.get(this);
  if (r)
    return r;
  for (var i = this.x, n = this.y, s = this.z, a = this._level, o = a.numHorizontalTiles() - 1, h = a.numVerticalTiles() - 1, l = [], c = 0; c < ti.length; c++) {
    var f = ti[c][0], u = ti[c][1], p = i + f, m = n + u, g = s;
    0 <= p && p <= o && 0 <= m && m <= h && l.push(new H(p, m, g, e));
  }
  return t.set(this, l), l;
};
H.prototype.hash = function() {
  return Pp(this.z, this.y, this.x);
};
H.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.z === e.z && this.y === e.y && this.x === e.x;
};
H.prototype.cmp = function(e) {
  return ei(this.z, e.z) || ei(this.y, e.y) || ei(this.x, e.x);
};
H.prototype.str = function() {
  return "FlatTile(" + tile.x + ", " + tile.y + ", " + tile.z + ")";
};
function _t(e) {
  this.constructor.super_.call(this, e), this._width = e.width, this._height = e.height, this._tileWidth = e.tileWidth, this._tileHeight = e.tileHeight;
}
Np(_t, Bp);
_t.prototype.width = function() {
  return this._width;
};
_t.prototype.height = function() {
  return this._height;
};
_t.prototype.tileWidth = function() {
  return this._tileWidth;
};
_t.prototype.tileHeight = function() {
  return this._tileHeight;
};
_t.prototype._validateWithParentLevel = function(e) {
  var t = this.width(), r = this.height(), i = this.tileWidth(), n = this.tileHeight(), s = e.width(), a = e.height(), o = e.tileWidth(), h = e.tileHeight();
  if (t % s !== 0)
    return new Error("Level width must be multiple of parent level: " + t + " vs. " + s);
  if (r % a !== 0)
    return new Error("Level height must be multiple of parent level: " + r + " vs. " + a);
  if (i % o !== 0)
    return new Error("Level tile width must be multiple of parent level: " + i + " vs. " + o);
  if (n % h !== 0)
    return new Error("Level tile height must be multiple of parent level: " + n + " vs. " + h);
};
function Ge(e) {
  if (jp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = Up(e, _t), this.selectableLevelList = Fp(this.levelList);
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new Op(), this._neighborsCache = new Yp(kp), this._vec = mi.create(), this._viewSize = {};
}
Ge.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
Ge.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e), i = e.numHorizontalTiles() - 1, n = e.numVerticalTiles() - 1;
  t || (t = []);
  for (var s = 0; s <= i; s++)
    for (var a = 0; a <= n; a++)
      t.push(new H(s, a, r, this));
  return t;
};
Ge.prototype._closestTile = function(e, t) {
  var r = this._vec;
  mi.set(r, 0, 0, 1, 1), mi.transformMat4(r, r, e.inverseProjection());
  var i = 0.5 + r[0], n = 0.5 - r[1], s = this.levelList.indexOf(t), a = t.width(), o = t.height(), h = t.tileWidth(), l = t.tileHeight(), c = t.numHorizontalTiles(), f = t.numVerticalTiles(), u = yn(Math.floor(i * a / h), 0, c - 1), p = yn(Math.floor(n * o / l), 0, f - 1);
  return new H(u, p, s, this);
};
Ge.prototype.visibleTiles = function(e, t, r) {
  var i = this._viewSize, n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0)
    return r;
  var s = this._closestTile(e, t), a = n.search(e, s, r);
  if (!a)
    throw new Error("Starting tile is not visible");
  return r;
};
Ge.Tile = Ge.prototype.Tile = H;
Ge.type = Ge.prototype.type = "flat";
H.type = H.prototype.type = "flat";
var Gp = Ge, Hp = Le, Vp = Ir, Wp = Jt, _n = qt, Zp = Yi, Xp = Kt;
function K(e, t) {
  this.z = e, this._geometry = t, this._level = t.levelList[e];
}
K.prototype.rotX = function() {
  return 0;
};
K.prototype.rotY = function() {
  return 0;
};
K.prototype.centerX = function() {
  return 0.5;
};
K.prototype.centerY = function() {
  return 0.5;
};
K.prototype.scaleX = function() {
  return 1;
};
K.prototype.scaleY = function() {
  return 1;
};
K.prototype.parent = function() {
  return this.z === 0 ? null : new K(this.z - 1, this._geometry);
};
K.prototype.children = function(e) {
  return this.z === this._geometry.levelList.length - 1 ? null : (e = e || [], e.push(new K(this.z + 1, this._geometry)), e);
};
K.prototype.neighbors = function() {
  return [];
};
K.prototype.hash = function() {
  return Vp(this.z);
};
K.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.z === e.z;
};
K.prototype.cmp = function(e) {
  return Wp(this.z, e.z);
};
K.prototype.str = function() {
  return "EquirectTile(" + tile.z + ")";
};
function Ct(e) {
  this.constructor.super_.call(this, e), this._width = e.width;
}
Hp(Ct, Zp);
Ct.prototype.width = function() {
  return this._width;
};
Ct.prototype.height = function() {
  return this._width / 2;
};
Ct.prototype.tileWidth = function() {
  return this._width;
};
Ct.prototype.tileHeight = function() {
  return this._width / 2;
};
function rt(e) {
  if (Xp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = _n.makeLevelList(e, Ct), this.selectableLevelList = _n.makeSelectableLevelList(this.levelList);
}
rt.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
rt.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e);
  return t = t || [], t.push(new K(r, this)), t;
};
rt.prototype.visibleTiles = function(e, t, r) {
  var i = new K(this.levelList.indexOf(t), this);
  r = r || [], r.length = 0, r.push(i);
};
rt.Tile = rt.prototype.Tile = K;
rt.type = rt.prototype.type = "equirect";
K.type = K.prototype.type = "equirect";
var Qp = rt;
function gt(e, t, r) {
  return 2 * Math.atan(r * Math.tan(e / 2) / t);
}
function Jp(e, t, r) {
  return gt(e, t, r);
}
function qp(e, t, r) {
  return gt(e, t, Math.sqrt(t * t + r * r));
}
function Kp(e, t, r) {
  return gt(e, r, t);
}
function $p(e, t, r) {
  return gt(e, r, Math.sqrt(t * t + r * r));
}
function e0(e, t, r) {
  return gt(e, Math.sqrt(t * t + r * r), t);
}
function t0(e, t, r) {
  return gt(e, Math.sqrt(t * t + r * r), r);
}
var Ea = {
  convert: gt,
  htov: Jp,
  htod: qp,
  vtoh: Kp,
  vtod: $p,
  dtoh: e0,
  dtov: t0
};
function r0(e) {
  return typeof e == "number" && isFinite(e);
}
var Bi = r0;
function i0(e) {
  return e.toPrecision(15);
}
var Ui = i0;
function n0() {
  var e = arguments;
  return function(r) {
    for (var i = r, n = 0; n < e.length; n++) {
      var s = e[n];
      i = s.call(null, i);
    }
    return i;
  };
}
var Aa = n0, s0 = Q, $e = se.mat4, ne = se.vec4, xa = br, Vt = Ea, ri = nt, Ke = Bi, vt = Rt, Ce = Ui, a0 = Aa, o0 = X, h0 = 0, l0 = 0, c0 = 0, v0 = 0, f0 = 0, u0 = Math.PI / 4, d0 = 0, p0 = 0, gn = 1e-6;
function D(e, t) {
  this._yaw = e && e.yaw != null ? e.yaw : c0, this._pitch = e && e.pitch != null ? e.pitch : v0, this._roll = e && e.roll != null ? e.roll : f0, this._fov = e && e.fov != null ? e.fov : u0, this._width = e && e.width != null ? e.width : h0, this._height = e && e.height != null ? e.height : l0, this._projectionCenterX = e && e.projectionCenterX != null ? e.projectionCenterX : d0, this._projectionCenterY = e && e.projectionCenterY != null ? e.projectionCenterY : p0, this._limiter = t || null, this._projMatrix = $e.create(), this._invProjMatrix = $e.create(), this._frustum = [
    ne.create(),
    // left
    ne.create(),
    // right
    ne.create(),
    // bottom
    ne.create(),
    // top
    ne.create()
    // camera
  ], this._projectionChanged = !0, this._params = {}, this._fovs = {}, this._tmpVec = ne.create(), this._update();
}
s0(D);
D.prototype.destroy = function() {
  o0(this);
};
D.prototype.yaw = function() {
  return this._yaw;
};
D.prototype.pitch = function() {
  return this._pitch;
};
D.prototype.roll = function() {
  return this._roll;
};
D.prototype.projectionCenterX = function() {
  return this._projectionCenterX;
};
D.prototype.projectionCenterY = function() {
  return this._projectionCenterY;
};
D.prototype.fov = function() {
  return this._fov;
};
D.prototype.width = function() {
  return this._width;
};
D.prototype.height = function() {
  return this._height;
};
D.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
D.prototype.parameters = function(e) {
  return e = e || {}, e.yaw = this._yaw, e.pitch = this._pitch, e.roll = this._roll, e.fov = this._fov, e;
};
D.prototype.limiter = function() {
  return this._limiter;
};
D.prototype.setYaw = function(e) {
  this._resetParams(), this._params.yaw = e, this._update(this._params);
};
D.prototype.setPitch = function(e) {
  this._resetParams(), this._params.pitch = e, this._update(this._params);
};
D.prototype.setRoll = function(e) {
  this._resetParams(), this._params.roll = e, this._update(this._params);
};
D.prototype.setFov = function(e) {
  this._resetParams(), this._params.fov = e, this._update(this._params);
};
D.prototype.setProjectionCenterX = function(e) {
  this._resetParams(), this._params.projectionCenterX = e, this._update(this._params);
};
D.prototype.setProjectionCenterY = function(e) {
  this._resetParams(), this._params.projectionCenterY = e, this._update(this._params);
};
D.prototype.offsetYaw = function(e) {
  this.setYaw(this._yaw + e);
};
D.prototype.offsetPitch = function(e) {
  this.setPitch(this._pitch + e);
};
D.prototype.offsetRoll = function(e) {
  this.setRoll(this._roll + e);
};
D.prototype.offsetFov = function(e) {
  this.setFov(this._fov + e);
};
D.prototype.setSize = function(e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params);
};
D.prototype.setParameters = function(e) {
  this._resetParams(), this._params.yaw = e.yaw, this._params.pitch = e.pitch, this._params.roll = e.roll, this._params.fov = e.fov, this._params.projectionCenterX = e.projectionCenterX, this._params.projectionCenterY = e.projectionCenterY, this._update(this._params);
};
D.prototype.setLimiter = function(e) {
  this._limiter = e || null, this._update();
};
D.prototype._resetParams = function() {
  var e = this._params;
  e.yaw = null, e.pitch = null, e.roll = null, e.fov = null, e.width = null, e.height = null;
};
D.prototype._update = function(e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._yaw, r = this._pitch, i = this._roll, n = this._fov, s = this._projectionCenterX, a = this._projectionCenterY, o = this._width, h = this._height;
  if (e.yaw = e.yaw != null ? e.yaw : t, e.pitch = e.pitch != null ? e.pitch : r, e.roll = e.roll != null ? e.roll : i, e.fov = e.fov != null ? e.fov : n, e.width = e.width != null ? e.width : o, e.height = e.height != null ? e.height : h, e.projectionCenterX = e.projectionCenterX != null ? e.projectionCenterX : s, e.projectionCenterY = e.projectionCenterY != null ? e.projectionCenterY : a, this._limiter && (e = this._limiter(e), !e))
    throw new Error("Bad view limiter");
  e = this._normalize(e);
  var l = e.yaw, c = e.pitch, f = e.roll, u = e.fov, p = e.width, m = e.height, g = e.projectionCenterX, y = e.projectionCenterY;
  if (!Ke(l) || !Ke(c) || !Ke(f) || !Ke(u) || !Ke(p) || !Ke(m) || !Ke(g) || !Ke(y))
    throw new Error("Bad view - suspect a broken limiter");
  this._yaw = l, this._pitch = c, this._roll = f, this._fov = u, this._width = p, this._height = m, this._projectionCenterX = g, this._projectionCenterY = y, (l !== t || c !== r || f !== i || u !== n || p !== o || m !== h || g !== s || y !== a) && (this._projectionChanged = !0, this.emit("change")), (p !== o || m !== h) && this.emit("resize");
};
D.prototype._normalize = function(e) {
  this._normalizeCoordinates(e);
  var t = Vt.htov(Math.PI, e.width, e.height), r = isNaN(t) ? Math.PI : Math.min(Math.PI, t);
  return e.fov = vt(e.fov, gn, r - gn), e;
};
D.prototype._normalizeCoordinates = function(e) {
  return "yaw" in e && (e.yaw = ri(e.yaw - Math.PI, -2 * Math.PI) + Math.PI), "pitch" in e && (e.pitch = ri(e.pitch - Math.PI, -2 * Math.PI) + Math.PI), "roll" in e && (e.roll = ri(e.roll - Math.PI, -2 * Math.PI) + Math.PI), e;
};
D.prototype.normalizeToClosest = function(e, t) {
  var r = this._yaw, i = this._pitch, n = e.yaw, s = e.pitch, a = n - 2 * Math.PI, o = n + 2 * Math.PI;
  Math.abs(a - r) < Math.abs(n - r) ? n = a : Math.abs(o - r) < Math.abs(n - r) && (n = o);
  var h = s - 2 * Math.PI, l = s + 2 * Math.PI;
  return Math.abs(h - i) < Math.abs(s - i) ? s = h : Math.abs(h - i) < Math.abs(s - i) && (s = l), t = t || {}, t.yaw = n, t.pitch = s, t;
};
D.prototype.updateWithControlParameters = function(e) {
  var t = this._fov, r = Vt.vtoh(t, this._width, this._height);
  isNaN(r) && (r = t), this.offsetYaw(e.axisScaledX * r + e.x * 2 * r + e.yaw), this.offsetPitch(e.axisScaledY * t + e.y * 2 * r + e.pitch), this.offsetRoll(-e.roll), this.offsetFov(e.zoom * t);
};
D.prototype._updateProjection = function() {
  var e = this._projMatrix, t = this._invProjMatrix, r = this._frustum;
  if (this._projectionChanged) {
    var i = this._width, n = this._height, s = this._fov, a = Vt.vtoh(s, i, n), o = i / n, h = this._projectionCenterX, l = this._projectionCenterY;
    if (h !== 0 || l !== 0) {
      var c = Math.atan(h * 2 * Math.tan(a / 2)), f = Math.atan(l * 2 * Math.tan(s / 2)), u = this._fovs;
      u.leftDegrees = (a / 2 + c) * 180 / Math.PI, u.rightDegrees = (a / 2 - c) * 180 / Math.PI, u.upDegrees = (s / 2 + f) * 180 / Math.PI, u.downDegrees = (s / 2 - f) * 180 / Math.PI, $e.perspectiveFromFieldOfView(e, u, -1, 1);
    } else
      $e.perspective(e, s, o, -1, 1);
    $e.rotateZ(e, e, this._roll), $e.rotateX(e, e, this._pitch), $e.rotateY(e, e, this._yaw), $e.invert(t, e), this._matrixToFrustum(e, r), this._projectionChanged = !1;
  }
};
D.prototype._matrixToFrustum = function(e, t) {
  ne.set(t[0], e[3] + e[0], e[7] + e[4], e[11] + e[8], 0), ne.set(t[1], e[3] - e[0], e[7] - e[4], e[11] - e[8], 0), ne.set(t[2], e[3] + e[1], e[7] + e[5], e[11] + e[9], 0), ne.set(t[3], e[3] - e[1], e[7] - e[5], e[11] - e[9], 0), ne.set(t[4], e[3] + e[2], e[7] + e[6], e[11] + e[10], 0);
};
D.prototype.projection = function() {
  return this._updateProjection(), this._projMatrix;
};
D.prototype.inverseProjection = function() {
  return this._updateProjection(), this._invProjMatrix;
};
D.prototype.intersects = function(e) {
  this._updateProjection();
  for (var t = this._frustum, r = this._tmpVec, i = 0; i < t.length; i++) {
    for (var n = t[i], s = !1, a = 0; a < e.length; a++) {
      var o = e[a];
      ne.set(r, o[0], o[1], o[2], 0), ne.dot(n, r) >= 0 && (s = !0);
    }
    if (!s)
      return !1;
  }
  return !0;
};
D.prototype.selectLevel = function(e) {
  for (var t = xa() * this._height, r = Math.tan(0.5 * this._fov), i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.height() >= t)
      return n;
  }
  return e[e.length - 1];
};
D.prototype.coordinatesToScreen = function(e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width, n = this._height;
  if (i <= 0 || n <= 0)
    return t.x = null, t.y = null, null;
  var s = e.yaw, a = e.pitch, o = Math.sin(s) * Math.cos(a), h = -Math.sin(a), l = -Math.cos(s) * Math.cos(a);
  if (ne.set(r, o, h, l, 1), ne.transformMat4(r, r, this.projection()), r[3] >= 0)
    t.x = i * (r[0] / r[3] + 1) / 2, t.y = n * (1 - r[1] / r[3]) / 2;
  else
    return t.x = null, t.y = null, null;
  return t;
};
D.prototype.screenToCoordinates = function(e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width, n = this._height, s = 2 * e.x / i - 1, a = 1 - 2 * e.y / n;
  ne.set(r, s, a, 1, 1), ne.transformMat4(r, r, this.inverseProjection());
  var o = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
  return t.yaw = Math.atan2(r[0], -r[2]), t.pitch = Math.acos(r[1] / o) - Math.PI / 2, this._normalizeCoordinates(t), t;
};
D.prototype.coordinatesToPerspectiveTransform = function(e, t, r) {
  r = r || "";
  var i = this._height, n = this._width, s = this._fov, a = 0.5 * i / Math.tan(s / 2), o = "";
  return o += "translateX(" + Ce(n / 2) + "px) ", o += "translateY(" + Ce(i / 2) + "px) ", o += "translateX(-50%) translateY(-50%) ", o += "perspective(" + Ce(a) + "px) ", o += "translateZ(" + Ce(a) + "px) ", o += "rotateZ(" + Ce(-this._roll) + "rad) ", o += "rotateX(" + Ce(-this._pitch) + "rad) ", o += "rotateY(" + Ce(this._yaw) + "rad) ", o += "rotateY(" + Ce(-e.yaw) + "rad) ", o += "rotateX(" + Ce(e.pitch) + "rad) ", o += "translateZ(" + Ce(-t) + "px) ", o += r + " ", o;
};
D.limit = {
  /**
   * Returns a view limiter that constrains the yaw angle.
   * @param {number} min The minimum yaw value.
   * @param {number} max The maximum yaw value.
   * @return {RectilinearViewLimiter}
   */
  yaw: function(e, t) {
    return function(i) {
      return i.yaw = vt(i.yaw, e, t), i;
    };
  },
  /**
   * Returns a view limiter that constrains the pitch angle.
   * @param {number} min The minimum pitch value.
   * @param {number} max The maximum pitch value.
   * @return {RectilinearViewLimiter}
   */
  pitch: function(e, t) {
    return function(i) {
      return i.pitch = vt(i.pitch, e, t), i;
    };
  },
  /**
   * Returns a view limiter that constrains the roll angle.
   * @param {number} min The minimum roll value.
   * @param {number} max The maximum roll value.
   * @return {RectilinearViewLimiter}
   */
  roll: function(e, t) {
    return function(i) {
      return i.roll = vt(i.roll, e, t), i;
    };
  },
  /**
   * Returns a view limiter that constrains the horizontal field of view.
   * @param {number} min The minimum horizontal field of view.
   * @param {number} max The maximum horizontal field of view.
   * @return {RectilinearViewLimiter}
   */
  hfov: function(e, t) {
    return function(i) {
      var n = i.width, s = i.height;
      if (n > 0 && s > 0) {
        var a = Vt.htov(e, n, s), o = Vt.htov(t, n, s);
        i.fov = vt(i.fov, a, o);
      }
      return i;
    };
  },
  /**
   * Returns a view limiter that constrains the vertical field of view.
   * @param {number} min The minimum vertical field of view.
   * @param {number} max The maximum vertical field of view.
   * @return {RectilinearViewLimiter}
   */
  vfov: function(e, t) {
    return function(i) {
      return i.fov = vt(i.fov, e, t), i;
    };
  },
  /**
   * Returns a view limiter that prevents zooming in beyond the given
   * resolution.
   * @param {number} size The cube face width in pixels or, equivalently, one
   *     fourth of the equirectangular width in pixels.
   * @return {RectilinearViewLimiter}
   */
  resolution: function(e) {
    return function(r) {
      var i = r.height;
      if (i) {
        var n = xa() * i, s = 2 * Math.atan(n / e);
        r.fov = vt(r.fov, s, 1 / 0);
      }
      return r;
    };
  },
  /**
   * Returns a view limiter that limits the horizontal and vertical field of
   * view, prevents zooming in past the image resolution, and limits the pitch
   * range to prevent the camera wrapping around at the poles. These are the
   * most common view constraints for a 360° panorama.
   * @param {number} maxResolution The cube face width in pixels or,
   *     equivalently, one fourth of the equirectangular width in pixels.
   * @param {number} maxVFov The maximum vertical field of view.
   * @param {number} [maxHFov=maxVFov] The maximum horizontal field of view.
   * @return {RectilinearViewLimiter}
   */
  traditional: function(e, t, r) {
    return r = r ?? t, a0(
      D.limit.resolution(e),
      D.limit.vfov(0, t),
      D.limit.hfov(0, r),
      D.limit.pitch(-Math.PI / 2, Math.PI / 2)
    );
  }
};
D.type = D.prototype.type = "rectilinear";
var m0 = D, y0 = Q, Ar = se.mat4, Wt = se.vec4, Ta = br, xt = Bi, Fe = Rt, _0 = X, g0 = 0, w0 = 0, ba = 0.5, Sa = 0.5, M0 = 1, E0 = [
  1,
  // top
  0,
  // right
  1,
  // bottom
  0
  // left
], A0 = [
  -1,
  // top
  -1,
  // right
  1,
  // bottom
  1
  // left
], x0 = 1e-6;
function F(e, t) {
  if (!(e && e.mediaAspectRatio != null))
    throw new Error("mediaAspectRatio must be defined");
  this._x = e && e.x != null ? e.x : ba, this._y = e && e.y != null ? e.y : Sa, this._zoom = e && e.zoom != null ? e.zoom : M0, this._mediaAspectRatio = e.mediaAspectRatio, this._width = e && e.width != null ? e.width : g0, this._height = e && e.height != null ? e.height : w0, this._limiter = t || null, this._projMatrix = Ar.create(), this._invProjMatrix = Ar.create(), this._frustum = [
    0,
    // top
    0,
    // right
    0,
    // bottom
    0
    // left
  ], this._projectionChanged = !0, this._params = {}, this._vec = Wt.create(), this._update();
}
y0(F);
F.prototype.destroy = function() {
  _0(this);
};
F.prototype.x = function() {
  return this._x;
};
F.prototype.y = function() {
  return this._y;
};
F.prototype.zoom = function() {
  return this._zoom;
};
F.prototype.mediaAspectRatio = function() {
  return this._mediaAspectRatio;
};
F.prototype.width = function() {
  return this._width;
};
F.prototype.height = function() {
  return this._height;
};
F.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
F.prototype.parameters = function(e) {
  return e = e || {}, e.x = this._x, e.y = this._y, e.zoom = this._zoom, e.mediaAspectRatio = this._mediaAspectRatio, e;
};
F.prototype.limiter = function() {
  return this._limiter;
};
F.prototype.setX = function(e) {
  this._resetParams(), this._params.x = e, this._update(this._params);
};
F.prototype.setY = function(e) {
  this._resetParams(), this._params.y = e, this._update(this._params);
};
F.prototype.setZoom = function(e) {
  this._resetParams(), this._params.zoom = e, this._update(this._params);
};
F.prototype.offsetX = function(e) {
  this.setX(this._x + e);
};
F.prototype.offsetY = function(e) {
  this.setY(this._y + e);
};
F.prototype.offsetZoom = function(e) {
  this.setZoom(this._zoom + e);
};
F.prototype.setMediaAspectRatio = function(e) {
  this._resetParams(), this._params.mediaAspectRatio = e, this._update(this._params);
};
F.prototype.setSize = function(e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params);
};
F.prototype.setParameters = function(e) {
  this._resetParams(), this._params.x = e.x, this._params.y = e.y, this._params.zoom = e.zoom, this._params.mediaAspectRatio = e.mediaAspectRatio, this._update(this._params);
};
F.prototype.setLimiter = function(e) {
  this._limiter = e || null, this._update();
};
F.prototype._resetParams = function() {
  var e = this._params;
  e.x = null, e.y = null, e.zoom = null, e.mediaAspectRatio = null, e.width = null, e.height = null;
};
F.prototype._update = function(e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._x, r = this._y, i = this._zoom, n = this._mediaAspectRatio, s = this._width, a = this._height;
  if (e.x = e.x != null ? e.x : t, e.y = e.y != null ? e.y : r, e.zoom = e.zoom != null ? e.zoom : i, e.mediaAspectRatio = e.mediaAspectRatio != null ? e.mediaAspectRatio : n, e.width = e.width != null ? e.width : s, e.height = e.height != null ? e.height : a, this._limiter && (e = this._limiter(e), !e))
    throw new Error("Bad view limiter");
  var o = e.x, h = e.y, l = e.zoom, c = e.mediaAspectRatio, f = e.width, u = e.height;
  if (!xt(o) || !xt(h) || !xt(l) || !xt(c) || !xt(f) || !xt(u))
    throw new Error("Bad view - suspect a broken limiter");
  l = Fe(l, x0, 1 / 0), this._x = o, this._y = h, this._zoom = l, this._mediaAspectRatio = c, this._width = f, this._height = u, (o !== t || h !== r || l !== i || c !== n || f !== s || u !== a) && (this._projectionChanged = !0, this.emit("change")), (f !== s || u !== a) && this.emit("resize");
};
F.prototype._zoomX = function() {
  return this._zoom;
};
F.prototype._zoomY = function() {
  var e = this._mediaAspectRatio, t = this._width / this._height, r = this._zoom, i = r * e / t;
  return isNaN(i) && (i = r), i;
};
F.prototype.updateWithControlParameters = function(e) {
  var t = this.zoom(), r = this._zoomX(), i = this._zoomY();
  this.offsetX(e.axisScaledX * r + e.x * t), this.offsetY(e.axisScaledY * i + e.y * t), this.offsetZoom(e.zoom * t);
};
F.prototype._updateProjection = function() {
  var e = this._projMatrix, t = this._invProjMatrix, r = this._frustum;
  if (this._projectionChanged) {
    var i = this._x, n = this._y, s = this._zoomX(), a = this._zoomY(), o = r[0] = 0.5 - n + 0.5 * a, h = r[1] = i - 0.5 + 0.5 * s, l = r[2] = 0.5 - n - 0.5 * a, c = r[3] = i - 0.5 - 0.5 * s;
    Ar.ortho(e, c, h, l, o, -1, 1), Ar.invert(t, e), this._projectionChanged = !1;
  }
};
F.prototype.projection = function() {
  return this._updateProjection(), this._projMatrix;
};
F.prototype.inverseProjection = function() {
  return this._updateProjection(), this._invProjMatrix;
};
F.prototype.intersects = function(e) {
  this._updateProjection();
  for (var t = this._frustum, r = 0; r < t.length; r++) {
    for (var i = t[r], n = E0[r], s = A0[r], a = !1, o = 0; o < e.length; o++) {
      var h = e[o];
      if (s < 0 && h[n] < i || s > 0 && h[n] > i) {
        a = !0;
        break;
      }
    }
    if (!a)
      return !1;
  }
  return !0;
};
F.prototype.selectLevel = function(e) {
  for (var t = Ta() * this.width(), r = this._zoom, i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.width() >= t)
      return n;
  }
  return e[e.length - 1];
};
F.prototype.coordinatesToScreen = function(e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width, n = this._height;
  if (i <= 0 || n <= 0)
    return t.x = null, t.y = null, null;
  var s = e && e.x != null ? e.x : ba, a = e && e.y != null ? e.y : Sa;
  Wt.set(r, s - 0.5, 0.5 - a, -1, 1), Wt.transformMat4(r, r, this.projection());
  for (var o = 0; o < 3; o++)
    r[o] /= r[3];
  return t.x = i * (r[0] + 1) / 2, t.y = n * (1 - r[1]) / 2, t;
};
F.prototype.screenToCoordinates = function(e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width, n = this._height, s = 2 * e.x / i - 1, a = 1 - 2 * e.y / n;
  return Wt.set(r, s, a, 1, 1), Wt.transformMat4(r, r, this.inverseProjection()), t.x = 0.5 + r[0], t.y = 0.5 - r[1], t;
};
F.limit = {
  /**
   * Returns a view limiter that constrains the x parameter.
   * @param {number} min The minimum x value.
   * @param {number} max The maximum y value.
   * @return {FlatViewLimiter}
   */
  x: function(e, t) {
    return function(i) {
      return i.x = Fe(i.x, e, t), i;
    };
  },
  /**
   * Return a view limiter that constrains the y parameter.
   * @param {number} min The minimum y value.
   * @param {number} max The maximum y value.
   * @return {FlatViewLimiter}
   */
  y: function(e, t) {
    return function(i) {
      return i.y = Fe(i.y, e, t), i;
    };
  },
  /**
   * Returns a view limiter than constrains the zoom parameter.
   * @param {number} min The minimum zoom value.
   * @param {number} max The maximum zoom value.
   * @return {FlatViewLimiter}
   */
  zoom: function(e, t) {
    return function(i) {
      return i.zoom = Fe(i.zoom, e, t), i;
    };
  },
  /**
   * Returns a view limiter that prevents zooming in beyond the given
   * resolution.
   * @param {number} size The image width in pixels.
   * @return {FlatViewLimiter}
   */
  resolution: function(e) {
    return function(r) {
      if (r.width <= 0 || r.height <= 0)
        return r;
      var i = r.width, n = Ta() * i / e;
      return r.zoom = Fe(r.zoom, n, 1 / 0), r;
    };
  },
  /**
   * Returns a view limiter that constrains the values of the x parameter that
   * are inside the viewport.
   * @param {number} min The minimum x value.
   * @param {number} max The maximum x value.
   * @return {FlatViewLimiter}
   */
  visibleX: function(e, t) {
    return function(i) {
      var n = t - e;
      i.zoom > n && (i.zoom = n);
      var s = e + 0.5 * i.zoom, a = t - 0.5 * i.zoom;
      return i.x = Fe(i.x, s, a), i;
    };
  },
  /**
   * Returns a view limiter that constrains the values of the y parameter that
   * are inside the viewport.
   * @param {number} min The minimum y value.
   * @param {number} max The maximum y value.
   * @return {FlatViewLimiter}
   */
  visibleY: function(e, t) {
    return function(i) {
      if (i.width <= 0 || i.height <= 0)
        return i;
      var n = i.width / i.height, s = n / i.mediaAspectRatio, a = (t - e) * s;
      i.zoom > a && (i.zoom = a);
      var o = e + 0.5 * i.zoom / s, h = t - 0.5 * i.zoom / s;
      return i.y = Fe(i.y, o, h), i;
    };
  },
  /**
   * Returns a view limiter that constrains the zoom parameter such that
   * zooming out is prevented beyond the point at which the image is fully
   * visible. Unless the image and the viewport have the same aspect ratio,
   * this will cause bands to appear around the image.
   * @return {FlatViewLimiter}
   */
  letterbox: function() {
    return function(t) {
      if (t.width <= 0 || t.height <= 0)
        return t;
      var r = t.width / t.height, i = 1, n = r / t.mediaAspectRatio;
      t.mediaAspectRatio >= r && (t.zoom = Math.min(t.zoom, i)), t.mediaAspectRatio <= r && (t.zoom = Math.min(t.zoom, n));
      var s, a;
      t.zoom > i ? s = a = 0.5 : (s = 0 + 0.5 * t.zoom / i, a = 1 - 0.5 * t.zoom / i);
      var o, h;
      return t.zoom > n ? o = h = 0.5 : (o = 0 + 0.5 * t.zoom / n, h = 1 - 0.5 * t.zoom / n), t.x = Fe(t.x, s, a), t.y = Fe(t.y, o, h), t;
    };
  }
};
F.type = F.prototype.type = "flat";
var T0 = F, b0 = jn, S0 = nt;
function $t(e) {
  this._concurrency = e && e.concurrency || 1, this._paused = e && !!e.paused || !1, this._pool = [];
  for (var t = 0; t < this._concurrency; t++)
    this._pool.push(new b0(e));
  this._next = 0;
}
$t.prototype.length = function() {
  for (var e = 0, t = 0; t < this._pool.length; t++)
    e += this._pool[t].length();
  return e;
};
$t.prototype.push = function(e, t) {
  var r = this._next, i = this._pool[r].push(e, t);
  return this._next = S0(this._next + 1, this._concurrency), i;
};
$t.prototype.pause = function() {
  if (!this._paused) {
    this._paused = !0;
    for (var e = 0; e < this._concurrency; e++)
      this._pool[e].pause();
  }
};
$t.prototype.resume = function() {
  if (this._paused) {
    this._paused = !1;
    for (var e = 0; e < this._concurrency; e++)
      this._pool[e].resume();
  }
};
var I0 = $t;
function R0() {
}
var er = R0, C0 = er;
function z0() {
  var e = Array.prototype.slice.call(arguments, 0);
  return function() {
    var r = e.slice(0), i = null, n = null, s = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [], a = arguments.length ? arguments[arguments.length - 1] : C0;
    function o() {
      var l = arguments[0];
      if (l) {
        i = n = null, a.apply(null, arguments);
        return;
      }
      if (!r.length) {
        i = n = null, a.apply(null, arguments);
        return;
      }
      i = r.shift();
      var c = i, f = Array.prototype.slice.call(arguments, 1);
      f.push(o);
      var u = i.apply(null, f);
      if (c === i) {
        if (typeof u != "function")
          throw new Error("chain: chaining on non-cancellable function");
        n = u;
      }
    }
    function h() {
      n && n.apply(null, arguments);
    }
    return s.unshift(null), o.apply(null, s), h;
  };
}
var Fi = z0;
function L0(e, t) {
  var r = null;
  function i() {
    r != null && (r = null, t(null));
  }
  function n() {
    r != null && (clearTimeout(r), r = null, t.apply(null, arguments));
  }
  return r = setTimeout(i, e), n;
}
var Ia = L0, D0 = Q, N0 = Zn, P0 = I0, O0 = Fi, Y0 = Ia, wn = pt, Mn = {
  x: "x",
  y: "y",
  z: "z",
  f: "face"
}, B0 = "bdflru", U0 = 4, F0 = 1e4;
function Zt(e, t) {
  t = t || {}, this._loadPool = new P0({
    concurrency: t.concurrency || U0
  }), this._retryDelay = t.retryDelay || F0, this._retryMap = {}, this._sourceFromTile = e;
}
D0(Zt);
Zt.prototype.loadAsset = function(e, t, r) {
  var i = this, n = this._retryDelay, s = this._retryMap, a = this._sourceFromTile(t), o = a.url, h = a.rect, l = e.loadImage.bind(e, o, h), c = function(y) {
    return i._loadPool.push(l, function(M, T) {
      M ? (M instanceof N0 && (s[o] = wn(), i.emit("networkError", M, t)), y(M, t)) : (delete s[o], y(null, t, T));
    });
  }, f, u = s[o];
  if (u != null) {
    var p = wn(), m = p - u;
    m < n ? f = n - m : (f = 0, delete s[o]);
  }
  var g = Y0.bind(null, f);
  return O0(g, c)(r);
};
Zt.fromString = function(e, t) {
  t = t || {};
  var r = t && t.cubeMapPreviewFaceOrder || B0, i = t.cubeMapPreviewUrl ? s : n;
  return new Zt(i, t);
  function n(o) {
    var h = e;
    for (var l in Mn) {
      var c = Mn[l], f = j0(l), u = o.hasOwnProperty(c) ? o[c] : "";
      h = h.replace(f, u);
    }
    return { url: h };
  }
  function s(o) {
    return o.z === 0 ? a(o) : n(o);
  }
  function a(o) {
    var h = r.indexOf(o.face) / 6;
    return {
      url: t.cubeMapPreviewUrl,
      rect: { x: 0, y: h, width: 1, height: 1 / 6 }
    };
  }
};
function j0(e) {
  var t = "\\{(" + e + ")\\}";
  return new RegExp(t, "g");
}
var k0 = Zt;
function ji(e) {
  this._asset = e;
}
ji.prototype.asset = function() {
  return this._asset;
};
ji.prototype.loadAsset = function(e, t, r) {
  var i = this, n = setTimeout(function() {
    r(null, t, i._asset);
  }, 0);
  function s() {
    clearTimeout(n), r.apply(null, arguments);
  }
  return s;
};
var G0 = ji, H0 = Mi, V0 = Le, W0 = Q, Z0 = X;
function wt(e) {
  this.constructor.super_.call(this, e), this._timestamp = 0;
}
V0(wt, H0);
W0(wt);
wt.prototype.destroy = function() {
  Z0(this);
};
wt.prototype.timestamp = function() {
  return this._timestamp;
};
wt.prototype.isDynamic = function() {
  return !0;
};
wt.prototype.markDirty = function() {
  this._timestamp++, this.emit("change");
};
var X0 = wt, Cr = nt, Q0 = 64;
function st(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Map: invalid capacity");
  this._capacity = e || Q0, this._keyBuckets = [], this._valBuckets = [];
  for (var t = 0; t < this._capacity; t++)
    this._keyBuckets.push([]), this._valBuckets.push([]);
  this._size = 0;
}
st.prototype.get = function(e) {
  for (var t = Cr(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      var s = this._valBuckets[t], a = s[i];
      return a;
    }
  }
  return null;
};
st.prototype.set = function(e, t) {
  for (var r = Cr(e.hash(), this._capacity), i = this._keyBuckets[r], n = this._valBuckets[r], s = 0; s < i.length; s++) {
    var a = i[s];
    if (e.equals(a)) {
      var o = n[s];
      return i[s] = e, n[s] = t, o;
    }
  }
  return i.push(e), n.push(t), this._size++, null;
};
st.prototype.del = function(e) {
  for (var t = Cr(e.hash(), this._capacity), r = this._keyBuckets[t], i = this._valBuckets[t], n = 0; n < r.length; n++) {
    var s = r[n];
    if (e.equals(s)) {
      for (var a = i[n], o = n; o < r.length - 1; o++)
        r[o] = r[o + 1], i[o] = i[o + 1];
      return r.length = r.length - 1, i.length = i.length - 1, this._size--, a;
    }
  }
  return null;
};
st.prototype.has = function(e) {
  for (var t = Cr(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return !0;
  }
  return !1;
};
st.prototype.size = function() {
  return this._size;
};
st.prototype.clear = function() {
  for (var e = 0; e < this._capacity; e++)
    this._keyBuckets[e].length = 0, this._valBuckets[e].length = 0;
  this._size = 0;
};
st.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._keyBuckets[r], n = this._valBuckets[r], s = 0; s < i.length; s++)
      e(i[s], n[s]), t += 1;
  return t;
};
var J0 = st, q0 = nt;
function at(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruSet: invalid capacity");
  this._capacity = e, this._elements = new Array(this._capacity), this._start = 0, this._size = 0;
}
at.prototype._index = function(e) {
  return q0(this._start + e, this._capacity);
};
at.prototype.add = function(e) {
  if (this._capacity === 0)
    return e;
  this.remove(e);
  var t = this._size === this._capacity ? this._elements[this._index(0)] : null;
  return this._elements[this._index(this._size)] = e, this._size < this._capacity ? this._size++ : this._start = this._index(1), t;
};
at.prototype.remove = function(e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._elements[this._index(t)];
    if (e.equals(r)) {
      for (var i = t; i < this._size - 1; i++)
        this._elements[this._index(i)] = this._elements[this._index(i + 1)];
      return this._size--, r;
    }
  }
  return null;
};
at.prototype.has = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._elements[this._index(t)]))
      return !0;
  return !1;
};
at.prototype.size = function() {
  return this._size;
};
at.prototype.clear = function() {
  this._elements.length = 0, this._start = 0, this._size = 0;
};
at.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._elements[this._index(r)]), t += 1;
  return t;
};
var K0 = at;
function $0(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}
var Pe = $0, e1 = er;
function t1(e) {
  return function() {
    var r = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [], i = arguments.length ? arguments[arguments.length - 1] : e1, n = null, s = !1;
    function a() {
      var o = arguments[0];
      !o || s ? i.apply(null, arguments) : n = e.apply(null, r);
    }
    return r.push(a), a(!0), function() {
      s = !0, n.apply(null, arguments);
    };
  };
}
var Ra = t1, En = J0, An = _a, r1 = K0, Ca = Q, i1 = Pe, n1 = Ra, s1 = Fi, a1 = Le, za = X, Gt = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.textureStore, Me = {
  IDLE: 0,
  START: 1,
  MARK: 2,
  END: 3
}, o1 = {
  // Maximum number of cached textures for previously visible tiles.
  previouslyVisibleCacheSize: 512
}, h1 = 0;
function ki() {
}
a1(ki, Error);
function tr(e, t) {
  var r = this, i = h1++;
  r._id = i, r._store = e, r._tile = t, r._asset = null, r._texture = null, r._changeHandler = function() {
    e.emit("textureInvalid", t);
  };
  var n = e.source(), s = e.stage(), a = n.loadAsset.bind(n), o = s.createTexture.bind(s), h = s1(n1(a), o);
  e.emit("textureStartLoad", t), Gt && console.log("loading", i, t), r._cancel = h(s, t, function(l, c, f, u) {
    if (r._cancel = null, l) {
      f && f.destroy(), u && u.destroy(), l instanceof ki ? (e.emit("textureCancel", t), Gt && console.log("cancel", i, t)) : (e.emit("textureError", t, l), Gt && console.log("error", i, t));
      return;
    }
    r._texture = u, f.isDynamic() ? (r._asset = f, f.addEventListener("change", r._changeHandler)) : f.destroy(), e.emit("textureLoad", t), Gt && console.log("load", i, t);
  });
}
tr.prototype.asset = function() {
  return this._asset;
};
tr.prototype.texture = function() {
  return this._texture;
};
tr.prototype.destroy = function() {
  var e = this._id, t = this._store, r = this._tile, i = this._asset, n = this._texture, s = this._cancel;
  if (s) {
    s(new ki());
    return;
  }
  i && (i.removeEventListener("change", this._changeHandler), i.destroy()), n && n.destroy(), t.emit("textureUnload", r), Gt && console.log("unload", e, r), za(this);
};
Ca(tr);
function re(e, t, r) {
  r = i1(r || {}, o1), this._source = e, this._stage = t, this._state = Me.IDLE, this._delimCount = 0, this._itemMap = new En(), this._visible = new An(), this._previouslyVisible = new r1(r.previouslyVisibleCacheSize), this._pinMap = new En(), this._newVisible = new An(), this._noLongerVisible = [], this._visibleAgain = [], this._evicted = [];
}
Ca(re);
re.prototype.destroy = function() {
  this.clear(), za(this);
};
re.prototype.stage = function() {
  return this._stage;
};
re.prototype.source = function() {
  return this._source;
};
re.prototype.clear = function() {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function(t) {
    e._evicted.push(t);
  }), e._evicted.forEach(function(t) {
    e._unloadTile(t);
  }), e._itemMap.clear(), e._visible.clear(), e._previouslyVisible.clear(), e._pinMap.clear(), e._newVisible.clear(), e._noLongerVisible.length = 0, e._visibleAgain.length = 0, e._evicted.length = 0;
};
re.prototype.clearNotPinned = function() {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function(t) {
    e._pinMap.has(t) || e._evicted.push(t);
  }), e._evicted.forEach(function(t) {
    e._unloadTile(t);
  }), e._visible.clear(), e._previouslyVisible.clear(), e._evicted.length = 0;
};
re.prototype.startFrame = function() {
  if (this._state !== Me.IDLE && this._state !== Me.START)
    throw new Error("TextureStore: startFrame called out of sequence");
  this._state = Me.START, this._delimCount++;
};
re.prototype.markTile = function(e) {
  if (this._state !== Me.START && this._state !== Me.MARK)
    throw new Error("TextureStore: markTile called out of sequence");
  this._state = Me.MARK;
  var t = this._itemMap.get(e), r = t && t.texture(), i = t && t.asset();
  r && i && r.refresh(e, i), this._newVisible.add(e);
};
re.prototype.endFrame = function() {
  if (this._state !== Me.START && this._state !== Me.MARK && this._state !== Me.END)
    throw new Error("TextureStore: endFrame called out of sequence");
  this._state = Me.END, this._delimCount--, this._delimCount || (this._update(), this._state = Me.IDLE);
};
re.prototype._update = function() {
  var e = this;
  e._noLongerVisible.length = 0, e._visible.forEach(function(r) {
    e._newVisible.has(r) || e._noLongerVisible.push(r);
  }), e._visibleAgain.length = 0, e._newVisible.forEach(function(r) {
    e._previouslyVisible.has(r) && e._visibleAgain.push(r);
  }), e._visibleAgain.forEach(function(r) {
    e._previouslyVisible.remove(r);
  }), e._evicted.length = 0, e._noLongerVisible.forEach(function(r) {
    var i = e._itemMap.get(r), n = i && i.texture();
    if (n) {
      var s = e._previouslyVisible.add(r);
      s != null && e._evicted.push(s);
    } else
      i && e._unloadTile(r);
  }), e._evicted.forEach(function(r) {
    e._pinMap.has(r) || e._unloadTile(r);
  }), e._newVisible.forEach(function(r) {
    var i = e._itemMap.get(r);
    i || e._loadTile(r);
  });
  var t = e._visible;
  e._visible = e._newVisible, e._newVisible = t, e._newVisible.clear(), e._noLongerVisible.length = 0, e._visibleAgain.length = 0, e._evicted.length = 0;
};
re.prototype._loadTile = function(e) {
  if (this._itemMap.has(e))
    throw new Error("TextureStore: loading texture already in cache");
  var t = new tr(this, e);
  this._itemMap.set(e, t);
};
re.prototype._unloadTile = function(e) {
  var t = this._itemMap.del(e);
  if (!t)
    throw new Error("TextureStore: unloading texture not in cache");
  t.destroy();
};
re.prototype.asset = function(e) {
  var t = this._itemMap.get(e);
  return t ? t.asset() : null;
};
re.prototype.texture = function(e) {
  var t = this._itemMap.get(e);
  return t ? t.texture() : null;
};
re.prototype.pin = function(e) {
  var t = (this._pinMap.get(e) || 0) + 1;
  return this._pinMap.set(e, t), this._itemMap.has(e) || this._loadTile(e), t;
};
re.prototype.unpin = function(e) {
  var t = this._pinMap.get(e);
  if (t)
    t--, t > 0 ? this._pinMap.set(e, t) : (this._pinMap.del(e), !this._visible.has(e) && !this._previouslyVisible.has(e) && this._unloadTile(e));
  else
    throw new Error("TextureStore: unpin when not pinned");
  return t;
};
re.prototype.query = function(e) {
  var t = this._itemMap.get(e), r = this._pinMap.get(e) || 0;
  return {
    visible: this._visible.has(e),
    previouslyVisible: this._previouslyVisible.has(e),
    hasAsset: t != null && t.asset() != null,
    hasTexture: t != null && t.texture() != null,
    pinned: r !== 0,
    pinCount: r
  };
};
var La = re;
function l1(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}
var Da = l1, c1 = Q, v1 = Da, f1 = X;
function ie(e, t, r, i, n) {
  n = n || {};
  var s = this;
  this._source = e, this._geometry = t, this._view = r, this._textureStore = i, this._effects = n.effects || {}, this._fixedLevelIndex = null, this._viewChangeHandler = function() {
    s.emit("viewChange", s.view());
  }, this._view.addEventListener("change", this._viewChangeHandler), this._textureStoreChangeHandler = function() {
    s.emit("textureStoreChange", s.textureStore());
  }, this._textureStore.addEventListener(
    "textureLoad",
    this._textureStoreChangeHandler
  ), this._textureStore.addEventListener(
    "textureError",
    this._textureStoreChangeHandler
  ), this._textureStore.addEventListener(
    "textureInvalid",
    this._textureStoreChangeHandler
  );
}
c1(ie);
ie.prototype.destroy = function() {
  this._view.removeEventListener("change", this._viewChangeHandler), this._textureStore.removeEventListener(
    "textureLoad",
    this._textureStoreChangeHandler
  ), this._textureStore.removeEventListener(
    "textureError",
    this._textureStoreChangeHandler
  ), this._textureStore.removeEventListener(
    "textureInvalid",
    this._textureStoreChangeHandler
  ), f1(this);
};
ie.prototype.source = function() {
  return this._source;
};
ie.prototype.geometry = function() {
  return this._geometry;
};
ie.prototype.view = function() {
  return this._view;
};
ie.prototype.textureStore = function() {
  return this._textureStore;
};
ie.prototype.effects = function() {
  return this._effects;
};
ie.prototype.setEffects = function(e) {
  this._effects = e, this.emit("effectsChange", this._effects);
};
ie.prototype.mergeEffects = function(e) {
  v1(this._effects, e), this.emit("effectsChange", this._effects);
};
ie.prototype.fixedLevel = function() {
  return this._fixedLevelIndex;
};
ie.prototype.setFixedLevel = function(e) {
  if (e !== this._fixedLevelIndex) {
    if (e != null && (e >= this._geometry.levelList.length || e < 0))
      throw new Error("Level index out of range: " + e);
    this._fixedLevelIndex = e, this.emit("fixedLevelChange", this._fixedLevelIndex);
  }
};
ie.prototype._selectLevel = function() {
  var e;
  return this._fixedLevelIndex != null ? e = this._geometry.levelList[this._fixedLevelIndex] : e = this._view.selectLevel(this._geometry.selectableLevelList), e;
};
ie.prototype.visibleTiles = function(e) {
  var t = this._selectLevel();
  return this._geometry.visibleTiles(this._view, t, e);
};
ie.prototype.pinLevel = function(e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++)
    this._textureStore.pin(r[i]);
};
ie.prototype.unpinLevel = function(e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++)
    this._textureStore.unpin(r[i]);
};
ie.prototype.pinFirstLevel = function() {
  return this.pinLevel(0);
};
ie.prototype.unpinFirstLevel = function() {
  return this.unpinLevel(0);
};
var Na = ie, u1 = Q, d1 = X;
function ot(e) {
  var t = this;
  this._stage = e, this._running = !1, this._rendering = !1, this._requestHandle = null, this._boundLoop = this._loop.bind(this), this._renderInvalidHandler = function() {
    t._rendering || t.renderOnNextFrame();
  }, this._stage.addEventListener("renderInvalid", this._renderInvalidHandler);
}
u1(ot);
ot.prototype.destroy = function() {
  this.stop(), this._stage.removeEventListener("renderInvalid", this._renderInvalidHandler), d1(this);
};
ot.prototype.stage = function() {
  return this._stage;
};
ot.prototype.start = function() {
  this._running = !0, this.renderOnNextFrame();
};
ot.prototype.stop = function() {
  this._requestHandle && (window.cancelAnimationFrame(this._requestHandle), this._requestHandle = null), this._running = !1;
};
ot.prototype.renderOnNextFrame = function() {
  this._running && !this._requestHandle && (this._requestHandle = window.requestAnimationFrame(this._boundLoop));
};
ot.prototype._loop = function() {
  if (!this._running)
    throw new Error("Render loop running while in stopped state");
  this._requestHandle = null, this._rendering = !0, this.emit("beforeRender"), this._rendering = !1, this._stage.render(), this.emit("afterRender");
};
var Pa = ot;
function He() {
  this.velocity = null, this.friction = null, this.offset = null;
}
He.equals = function(e, t) {
  return e.velocity === t.velocity && e.friction === t.friction && e.offset === t.offset;
};
He.prototype.equals = function(e) {
  return He.equals(this, e);
};
He.prototype.update = function(e, t) {
  e.offset && (this.offset = this.offset || 0, this.offset += e.offset);
  var r = this.offsetFromVelocity(t);
  r && (this.offset = this.offset || 0, this.offset += r), this.velocity = e.velocity, this.friction = e.friction;
};
He.prototype.reset = function() {
  this.velocity = null, this.friction = null, this.offset = null;
};
He.prototype.velocityAfter = function(e) {
  return this.velocity ? this.friction ? p1(this.velocity, this.friction * e) : this.velocity : null;
};
He.prototype.offsetFromVelocity = function(e) {
  e = Math.min(e, this.nullVelocityTime());
  var t = this.velocityAfter(e), r = (this.velocity + t) / 2;
  return r * e;
};
He.prototype.nullVelocityTime = function() {
  return this.velocity == null ? 0 : this.velocity && !this.friction ? 1 / 0 : Math.abs(this.velocity / this.friction);
};
function p1(e, t) {
  return e < 0 ? Math.min(0, e + t) : e > 0 ? Math.max(0, e - t) : 0;
}
var Ze = He, m1 = Q, y1 = Ze, _1 = X;
function zt(e, t, r, i, n) {
  if (!e)
    throw new Error("KeyControlMethod: keyCode must be defined");
  if (!t)
    throw new Error("KeyControlMethod: parameter must be defined");
  if (!r)
    throw new Error("KeyControlMethod: velocity must be defined");
  if (!i)
    throw new Error("KeyControlMethod: friction must be defined");
  n = n || document, this._keyCode = e, this._parameter = t, this._velocity = r, this._friction = i, this._element = n, this._keydownHandler = this._handlePress.bind(this), this._keyupHandler = this._handleRelease.bind(this), this._blurHandler = this._handleBlur.bind(this), this._element.addEventListener("keydown", this._keydownHandler), this._element.addEventListener("keyup", this._keyupHandler), window.addEventListener("blur", this._blurHandler), this._dynamics = new y1(), this._pressing = !1;
}
m1(zt);
zt.prototype.destroy = function() {
  this._element.removeEventListener("keydown", this._keydownHandler), this._element.removeEventListener("keyup", this._keyupHandler), window.removeEventListener("blur", this._blurHandler), _1(this);
};
zt.prototype._handlePress = function(e) {
  e.keyCode === this._keyCode && (this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active"));
};
zt.prototype._handleRelease = function(e) {
  e.keyCode === this._keyCode && (this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1);
};
zt.prototype._handleBlur = function() {
  this._dynamics.velocity = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive"), this._pressing = !1;
};
var Oa = zt, Ya = { exports: {} };
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
(function(e) {
  (function(t, r, i, n) {
    var s = ["", "webkit", "moz", "MS", "ms", "o"], a = r.createElement("div"), o = "function", h = Math.round, l = Math.abs, c = Date.now;
    function f(v, d, _) {
      return setTimeout(M(v, _), d);
    }
    function u(v, d, _) {
      return Array.isArray(v) ? (p(v, _[d], _), !0) : !1;
    }
    function p(v, d, _) {
      var E;
      if (v)
        if (v.forEach)
          v.forEach(d, _);
        else if (v.length !== n)
          for (E = 0; E < v.length; )
            d.call(_, v[E], E, v), E++;
        else
          for (E in v)
            v.hasOwnProperty(E) && d.call(_, v[E], E, v);
    }
    function m(v, d, _) {
      for (var E = Object.keys(d), A = 0; A < E.length; )
        (!_ || _ && v[E[A]] === n) && (v[E[A]] = d[E[A]]), A++;
      return v;
    }
    function g(v, d) {
      return m(v, d, !0);
    }
    function y(v, d, _) {
      var E = d.prototype, A;
      A = v.prototype = Object.create(E), A.constructor = v, A._super = E, _ && m(A, _);
    }
    function M(v, d) {
      return function() {
        return v.apply(d, arguments);
      };
    }
    function T(v, d) {
      return typeof v == o ? v.apply(d && d[0] || n, d) : v;
    }
    function b(v, d) {
      return v === n ? d : v;
    }
    function S(v, d, _) {
      p(B(d), function(E) {
        v.addEventListener(E, _, !1);
      });
    }
    function R(v, d, _) {
      p(B(d), function(E) {
        v.removeEventListener(E, _, !1);
      });
    }
    function x(v, d) {
      for (; v; ) {
        if (v == d)
          return !0;
        v = v.parentNode;
      }
      return !1;
    }
    function O(v, d) {
      return v.indexOf(d) > -1;
    }
    function B(v) {
      return v.trim().split(/\s+/g);
    }
    function z(v, d, _) {
      if (v.indexOf && !_)
        return v.indexOf(d);
      for (var E = 0; E < v.length; ) {
        if (_ && v[E][_] == d || !_ && v[E] === d)
          return E;
        E++;
      }
      return -1;
    }
    function P(v) {
      return Array.prototype.slice.call(v, 0);
    }
    function I(v, d, _) {
      for (var E = [], A = [], N = 0; N < v.length; ) {
        var j = d ? v[N][d] : v[N];
        z(A, j) < 0 && E.push(v[N]), A[N] = j, N++;
      }
      return _ && (d ? E = E.sort(function(he, Re) {
        return he[d] > Re[d];
      }) : E = E.sort()), E;
    }
    function U(v, d) {
      for (var _, E, A = d[0].toUpperCase() + d.slice(1), N = 0; N < s.length; ) {
        if (_ = s[N], E = _ ? _ + A : d, E in v)
          return E;
        N++;
      }
      return n;
    }
    var k = 1;
    function L() {
      return k++;
    }
    function w(v) {
      var d = v.ownerDocument;
      return d.defaultView || d.parentWindow;
    }
    var me = /mobile|tablet|ip(ad|hone|od)|android/i, Z = "ontouchstart" in t, Ee = U(t, "PointerEvent") !== n, be = Z && me.test(navigator.userAgent), ue = "touch", ho = "pen", Yr = "mouse", lo = "kinect", co = 25, ce = 1, ht = 2, q = 4, ve = 8, sr = 1, Nt = 2, Pt = 4, Ot = 8, Yt = 16, Se = Nt | Pt, lt = Ot | Yt, Gi = Se | lt, Hi = ["x", "y"], ar = ["clientX", "clientY"];
    function ye(v, d) {
      var _ = this;
      this.manager = v, this.callback = d, this.element = v.element, this.target = v.options.inputTarget, this.domHandler = function(E) {
        T(v.options.enable, [v]) && _.handler(E);
      }, this.init();
    }
    ye.prototype = {
      /**
       * should handle the inputEvent data and trigger the callback
       * @virtual
       */
      handler: function() {
      },
      /**
       * bind the events
       */
      init: function() {
        this.evEl && S(this.element, this.evEl, this.domHandler), this.evTarget && S(this.target, this.evTarget, this.domHandler), this.evWin && S(w(this.element), this.evWin, this.domHandler);
      },
      /**
       * unbind the events
       */
      destroy: function() {
        this.evEl && R(this.element, this.evEl, this.domHandler), this.evTarget && R(this.target, this.evTarget, this.domHandler), this.evWin && R(w(this.element), this.evWin, this.domHandler);
      }
    };
    function vo(v) {
      var d, _ = v.options.inputClass;
      return _ ? d = _ : Ee ? d = Ur : be ? d = lr : Z ? d = Fr : d = hr, new d(v, fo);
    }
    function fo(v, d, _) {
      var E = _.pointers.length, A = _.changedPointers.length, N = d & ce && E - A === 0, j = d & (q | ve) && E - A === 0;
      _.isFirst = !!N, _.isFinal = !!j, N && (v.session = {}), _.eventType = d, uo(v, _), v.emit("hammer.input", _), v.recognize(_), v.session.prevInput = _;
    }
    function uo(v, d) {
      var _ = v.session, E = d.pointers, A = E.length;
      _.firstInput || (_.firstInput = Vi(d)), A > 1 && !_.firstMultiple ? _.firstMultiple = Vi(d) : A === 1 && (_.firstMultiple = !1);
      var N = _.firstInput, j = _.firstMultiple, ae = j ? j.center : N.center, he = d.center = Wi(E);
      d.timeStamp = c(), d.deltaTime = d.timeStamp - N.timeStamp, d.angle = Br(ae, he), d.distance = or(ae, he), po(_, d), d.offsetDirection = Zi(d.deltaX, d.deltaY), d.scale = j ? go(j.pointers, E) : 1, d.rotation = j ? _o(j.pointers, E) : 0, mo(_, d);
      var Re = v.element;
      x(d.srcEvent.target, Re) && (Re = d.srcEvent.target), d.target = Re;
    }
    function po(v, d) {
      var _ = d.center, E = v.offsetDelta || {}, A = v.prevDelta || {}, N = v.prevInput || {};
      (d.eventType === ce || N.eventType === q) && (A = v.prevDelta = {
        x: N.deltaX || 0,
        y: N.deltaY || 0
      }, E = v.offsetDelta = {
        x: _.x,
        y: _.y
      }), d.deltaX = A.x + (_.x - E.x), d.deltaY = A.y + (_.y - E.y);
    }
    function mo(v, d) {
      var _ = v.lastInterval || d, E = d.timeStamp - _.timeStamp, A, N, j, ae;
      if (d.eventType != ve && (E > co || _.velocity === n)) {
        var he = _.deltaX - d.deltaX, Re = _.deltaY - d.deltaY, At = yo(E, he, Re);
        N = At.x, j = At.y, A = l(At.x) > l(At.y) ? At.x : At.y, ae = Zi(he, Re), v.lastInterval = d;
      } else
        A = _.velocity, N = _.velocityX, j = _.velocityY, ae = _.direction;
      d.velocity = A, d.velocityX = N, d.velocityY = j, d.direction = ae;
    }
    function Vi(v) {
      for (var d = [], _ = 0; _ < v.pointers.length; )
        d[_] = {
          clientX: h(v.pointers[_].clientX),
          clientY: h(v.pointers[_].clientY)
        }, _++;
      return {
        timeStamp: c(),
        pointers: d,
        center: Wi(d),
        deltaX: v.deltaX,
        deltaY: v.deltaY
      };
    }
    function Wi(v) {
      var d = v.length;
      if (d === 1)
        return {
          x: h(v[0].clientX),
          y: h(v[0].clientY)
        };
      for (var _ = 0, E = 0, A = 0; A < d; )
        _ += v[A].clientX, E += v[A].clientY, A++;
      return {
        x: h(_ / d),
        y: h(E / d)
      };
    }
    function yo(v, d, _) {
      return {
        x: d / v || 0,
        y: _ / v || 0
      };
    }
    function Zi(v, d) {
      return v === d ? sr : l(v) >= l(d) ? v > 0 ? Nt : Pt : d > 0 ? Ot : Yt;
    }
    function or(v, d, _) {
      _ || (_ = Hi);
      var E = d[_[0]] - v[_[0]], A = d[_[1]] - v[_[1]];
      return Math.sqrt(E * E + A * A);
    }
    function Br(v, d, _) {
      _ || (_ = Hi);
      var E = d[_[0]] - v[_[0]], A = d[_[1]] - v[_[1]];
      return Math.atan2(A, E) * 180 / Math.PI;
    }
    function _o(v, d) {
      return Br(d[1], d[0], ar) - Br(v[1], v[0], ar);
    }
    function go(v, d) {
      return or(d[0], d[1], ar) / or(v[0], v[1], ar);
    }
    var wo = {
      mousedown: ce,
      mousemove: ht,
      mouseup: q
    }, Mo = "mousedown", Eo = "mousemove mouseup";
    function hr() {
      this.evEl = Mo, this.evWin = Eo, this.allow = !0, this.pressed = !1, ye.apply(this, arguments);
    }
    y(hr, ye, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(d) {
        var _ = wo[d.type];
        _ & ce && d.button === 0 && (this.pressed = !0), _ & ht && d.which !== 1 && (_ = q), !(!this.pressed || !this.allow) && (_ & q && (this.pressed = !1), this.callback(this.manager, _, {
          pointers: [d],
          changedPointers: [d],
          pointerType: Yr,
          srcEvent: d
        }));
      }
    });
    var Ao = {
      pointerdown: ce,
      pointermove: ht,
      pointerup: q,
      pointercancel: ve,
      pointerout: ve
    }, xo = {
      2: ue,
      3: ho,
      4: Yr,
      5: lo
      // see https://twitter.com/jacobrossi/status/480596438489890816
    }, Xi = "pointerdown", Qi = "pointermove pointerup pointercancel";
    t.MSPointerEvent && (Xi = "MSPointerDown", Qi = "MSPointerMove MSPointerUp MSPointerCancel");
    function Ur() {
      this.evEl = Xi, this.evWin = Qi, ye.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    y(Ur, ye, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(d) {
        var _ = this.store, E = !1, A = d.type.toLowerCase().replace("ms", ""), N = Ao[A], j = xo[d.pointerType] || d.pointerType, ae = j == ue, he = z(_, d.pointerId, "pointerId");
        N & ce && (d.button === 0 || ae) ? he < 0 && (_.push(d), he = _.length - 1) : N & (q | ve) && (E = !0), !(he < 0) && (_[he] = d, this.callback(this.manager, N, {
          pointers: _,
          changedPointers: [d],
          pointerType: j,
          srcEvent: d
        }), E && _.splice(he, 1));
      }
    });
    var To = {
      touchstart: ce,
      touchmove: ht,
      touchend: q,
      touchcancel: ve
    }, bo = "touchstart", So = "touchstart touchmove touchend touchcancel";
    function Ji() {
      this.evTarget = bo, this.evWin = So, this.started = !1, ye.apply(this, arguments);
    }
    y(Ji, ye, {
      handler: function(d) {
        var _ = To[d.type];
        if (_ === ce && (this.started = !0), !!this.started) {
          var E = Io.call(this, d, _);
          _ & (q | ve) && E[0].length - E[1].length === 0 && (this.started = !1), this.callback(this.manager, _, {
            pointers: E[0],
            changedPointers: E[1],
            pointerType: ue,
            srcEvent: d
          });
        }
      }
    });
    function Io(v, d) {
      var _ = P(v.touches), E = P(v.changedTouches);
      return d & (q | ve) && (_ = I(_.concat(E), "identifier", !0)), [_, E];
    }
    var Ro = {
      touchstart: ce,
      touchmove: ht,
      touchend: q,
      touchcancel: ve
    }, Co = "touchstart touchmove touchend touchcancel";
    function lr() {
      this.evTarget = Co, this.targetIds = {}, ye.apply(this, arguments);
    }
    y(lr, ye, {
      handler: function(d) {
        var _ = Ro[d.type], E = zo.call(this, d, _);
        E && this.callback(this.manager, _, {
          pointers: E[0],
          changedPointers: E[1],
          pointerType: ue,
          srcEvent: d
        });
      }
    });
    function zo(v, d) {
      var _ = P(v.touches), E = this.targetIds;
      if (d & (ce | ht) && _.length === 1)
        return E[_[0].identifier] = !0, [_, _];
      var A, N, j = P(v.changedTouches), ae = [], he = this.target;
      if (N = _.filter(function(Re) {
        return x(Re.target, he);
      }), d === ce)
        for (A = 0; A < N.length; )
          E[N[A].identifier] = !0, A++;
      for (A = 0; A < j.length; )
        E[j[A].identifier] && ae.push(j[A]), d & (q | ve) && delete E[j[A].identifier], A++;
      if (ae.length)
        return [
          // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
          I(N.concat(ae), "identifier", !0),
          ae
        ];
    }
    function Fr() {
      ye.apply(this, arguments);
      var v = M(this.handler, this);
      this.touch = new lr(this.manager, v), this.mouse = new hr(this.manager, v);
    }
    y(Fr, ye, {
      /**
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */
      handler: function(d, _, E) {
        var A = E.pointerType == ue, N = E.pointerType == Yr;
        if (A)
          this.mouse.allow = !1;
        else if (N && !this.mouse.allow)
          return;
        _ & (q | ve) && (this.mouse.allow = !0), this.callback(d, _, E);
      },
      /**
       * remove the event listeners
       */
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    var qi = U(a.style, "touchAction"), Ki = qi !== n, $i = "compute", en = "auto", jr = "manipulation", Bt = "none", Ut = "pan-x", Ft = "pan-y";
    function kr(v, d) {
      this.manager = v, this.set(d);
    }
    kr.prototype = {
      /**
       * set the touchAction value on the element or enable the polyfill
       * @param {String} value
       */
      set: function(v) {
        v == $i && (v = this.compute()), Ki && (this.manager.element.style[qi] = v), this.actions = v.toLowerCase().trim();
      },
      /**
       * just re-set the touchAction value
       */
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      /**
       * compute the value for the touchAction property based on the recognizer's settings
       * @returns {String} value
       */
      compute: function() {
        var v = [];
        return p(this.manager.recognizers, function(d) {
          T(d.options.enable, [d]) && (v = v.concat(d.getTouchAction()));
        }), Lo(v.join(" "));
      },
      /**
       * this method is called on each input cycle and provides the preventing of the browser behavior
       * @param {Object} input
       */
      preventDefaults: function(v) {
        if (!Ki) {
          var d = v.srcEvent, _ = v.offsetDirection;
          if (this.manager.session.prevented) {
            d.preventDefault();
            return;
          }
          var E = this.actions, A = O(E, Bt), N = O(E, Ft), j = O(E, Ut);
          if (A || N && _ & Se || j && _ & lt)
            return this.preventSrc(d);
        }
      },
      /**
       * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
       * @param {Object} srcEvent
       */
      preventSrc: function(v) {
        this.manager.session.prevented = !0, v.preventDefault();
      }
    };
    function Lo(v) {
      if (O(v, Bt))
        return Bt;
      var d = O(v, Ut), _ = O(v, Ft);
      return d && _ ? Ut + " " + Ft : d || _ ? d ? Ut : Ft : O(v, jr) ? jr : en;
    }
    var cr = 1, _e = 2, Et = 4, Qe = 8, Ye = Qe, jt = 16, Ie = 32;
    function Be(v) {
      this.id = L(), this.manager = null, this.options = g(v || {}, this.defaults), this.options.enable = b(this.options.enable, !0), this.state = cr, this.simultaneous = {}, this.requireFail = [];
    }
    Be.prototype = {
      /**
       * @virtual
       * @type {Object}
       */
      defaults: {},
      /**
       * set options
       * @param {Object} options
       * @return {Recognizer}
       */
      set: function(v) {
        return m(this.options, v), this.manager && this.manager.touchAction.update(), this;
      },
      /**
       * recognize simultaneous with an other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      recognizeWith: function(v) {
        if (u(v, "recognizeWith", this))
          return this;
        var d = this.simultaneous;
        return v = vr(v, this), d[v.id] || (d[v.id] = v, v.recognizeWith(this)), this;
      },
      /**
       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRecognizeWith: function(v) {
        return u(v, "dropRecognizeWith", this) ? this : (v = vr(v, this), delete this.simultaneous[v.id], this);
      },
      /**
       * recognizer can only run when an other is failing
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      requireFailure: function(v) {
        if (u(v, "requireFailure", this))
          return this;
        var d = this.requireFail;
        return v = vr(v, this), z(d, v) === -1 && (d.push(v), v.requireFailure(this)), this;
      },
      /**
       * drop the requireFailure link. it does not remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRequireFailure: function(v) {
        if (u(v, "dropRequireFailure", this))
          return this;
        v = vr(v, this);
        var d = z(this.requireFail, v);
        return d > -1 && this.requireFail.splice(d, 1), this;
      },
      /**
       * has require failures boolean
       * @returns {boolean}
       */
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      /**
       * if the recognizer can recognize simultaneous with an other recognizer
       * @param {Recognizer} otherRecognizer
       * @returns {Boolean}
       */
      canRecognizeWith: function(v) {
        return !!this.simultaneous[v.id];
      },
      /**
       * You should use `tryEmit` instead of `emit` directly to check
       * that all the needed recognizers has failed before emitting.
       * @param {Object} input
       */
      emit: function(v) {
        var d = this, _ = this.state;
        function E(A) {
          d.manager.emit(d.options.event + (A ? Do(_) : ""), v);
        }
        _ < Qe && E(!0), E(), _ >= Qe && E(!0);
      },
      /**
       * Check that all the require failure recognizers has failed,
       * if true, it emits a gesture event,
       * otherwise, setup the state to FAILED.
       * @param {Object} input
       */
      tryEmit: function(v) {
        if (this.canEmit())
          return this.emit(v);
        this.state = Ie;
      },
      /**
       * can we emit?
       * @returns {boolean}
       */
      canEmit: function() {
        for (var v = 0; v < this.requireFail.length; ) {
          if (!(this.requireFail[v].state & (Ie | cr)))
            return !1;
          v++;
        }
        return !0;
      },
      /**
       * update the recognizer
       * @param {Object} inputData
       */
      recognize: function(v) {
        var d = m({}, v);
        if (!T(this.options.enable, [this, d])) {
          this.reset(), this.state = Ie;
          return;
        }
        this.state & (Ye | jt | Ie) && (this.state = cr), this.state = this.process(d), this.state & (_e | Et | Qe | jt) && this.tryEmit(d);
      },
      /**
       * return the state of the recognizer
       * the actual recognizing happens in this method
       * @virtual
       * @param {Object} inputData
       * @returns {Const} STATE
       */
      process: function(v) {
      },
      // jshint ignore:line
      /**
       * return the preferred touch-action
       * @virtual
       * @returns {Array}
       */
      getTouchAction: function() {
      },
      /**
       * called when the gesture isn't allowed to recognize
       * like when another is being recognized or it is disabled
       * @virtual
       */
      reset: function() {
      }
    };
    function Do(v) {
      return v & jt ? "cancel" : v & Qe ? "end" : v & Et ? "move" : v & _e ? "start" : "";
    }
    function tn(v) {
      return v == Yt ? "down" : v == Ot ? "up" : v == Nt ? "left" : v == Pt ? "right" : "";
    }
    function vr(v, d) {
      var _ = d.manager;
      return _ ? _.get(v) : v;
    }
    function Ae() {
      Be.apply(this, arguments);
    }
    y(Ae, Be, {
      /**
       * @namespace
       * @memberof AttrRecognizer
       */
      defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
      },
      /**
       * Used to check if it the recognizer receives valid input, like input.distance > 10.
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {Boolean} recognized
       */
      attrTest: function(v) {
        var d = this.options.pointers;
        return d === 0 || v.pointers.length === d;
      },
      /**
       * Process the input and return the state for the recognizer
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {*} State
       */
      process: function(v) {
        var d = this.state, _ = v.eventType, E = d & (_e | Et), A = this.attrTest(v);
        return E && (_ & ve || !A) ? d | jt : E || A ? _ & q ? d | Qe : d & _e ? d | Et : _e : Ie;
      }
    });
    function fr() {
      Ae.apply(this, arguments), this.pX = null, this.pY = null;
    }
    y(fr, Ae, {
      /**
       * @namespace
       * @memberof PanRecognizer
       */
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Gi
      },
      getTouchAction: function() {
        var v = this.options.direction, d = [];
        return v & Se && d.push(Ft), v & lt && d.push(Ut), d;
      },
      directionTest: function(v) {
        var d = this.options, _ = !0, E = v.distance, A = v.direction, N = v.deltaX, j = v.deltaY;
        return A & d.direction || (d.direction & Se ? (A = N === 0 ? sr : N < 0 ? Nt : Pt, _ = N != this.pX, E = Math.abs(v.deltaX)) : (A = j === 0 ? sr : j < 0 ? Ot : Yt, _ = j != this.pY, E = Math.abs(v.deltaY))), v.direction = A, _ && E > d.threshold && A & d.direction;
      },
      attrTest: function(v) {
        return Ae.prototype.attrTest.call(this, v) && (this.state & _e || !(this.state & _e) && this.directionTest(v));
      },
      emit: function(v) {
        this.pX = v.deltaX, this.pY = v.deltaY;
        var d = tn(v.direction);
        d && this.manager.emit(this.options.event + d, v), this._super.emit.call(this, v);
      }
    });
    function Gr() {
      Ae.apply(this, arguments);
    }
    y(Gr, Ae, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Bt];
      },
      attrTest: function(v) {
        return this._super.attrTest.call(this, v) && (Math.abs(v.scale - 1) > this.options.threshold || this.state & _e);
      },
      emit: function(v) {
        if (this._super.emit.call(this, v), v.scale !== 1) {
          var d = v.scale < 1 ? "in" : "out";
          this.manager.emit(this.options.event + d, v);
        }
      }
    });
    function Hr() {
      Be.apply(this, arguments), this._timer = null, this._input = null;
    }
    y(Hr, Be, {
      /**
       * @namespace
       * @memberof PressRecognizer
       */
      defaults: {
        event: "press",
        pointers: 1,
        time: 500,
        // minimal time of the pointer to be pressed
        threshold: 5
        // a minimal movement is ok, but keep it low
      },
      getTouchAction: function() {
        return [en];
      },
      process: function(v) {
        var d = this.options, _ = v.pointers.length === d.pointers, E = v.distance < d.threshold, A = v.deltaTime > d.time;
        if (this._input = v, !E || !_ || v.eventType & (q | ve) && !A)
          this.reset();
        else if (v.eventType & ce)
          this.reset(), this._timer = f(function() {
            this.state = Ye, this.tryEmit();
          }, d.time, this);
        else if (v.eventType & q)
          return Ye;
        return Ie;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(v) {
        this.state === Ye && (v && v.eventType & q ? this.manager.emit(this.options.event + "up", v) : (this._input.timeStamp = c(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Vr() {
      Ae.apply(this, arguments);
    }
    y(Vr, Ae, {
      /**
       * @namespace
       * @memberof RotateRecognizer
       */
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Bt];
      },
      attrTest: function(v) {
        return this._super.attrTest.call(this, v) && (Math.abs(v.rotation) > this.options.threshold || this.state & _e);
      }
    });
    function Wr() {
      Ae.apply(this, arguments);
    }
    y(Wr, Ae, {
      /**
       * @namespace
       * @memberof SwipeRecognizer
       */
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.65,
        direction: Se | lt,
        pointers: 1
      },
      getTouchAction: function() {
        return fr.prototype.getTouchAction.call(this);
      },
      attrTest: function(v) {
        var d = this.options.direction, _;
        return d & (Se | lt) ? _ = v.velocity : d & Se ? _ = v.velocityX : d & lt && (_ = v.velocityY), this._super.attrTest.call(this, v) && d & v.direction && v.distance > this.options.threshold && l(_) > this.options.velocity && v.eventType & q;
      },
      emit: function(v) {
        var d = tn(v.direction);
        d && this.manager.emit(this.options.event + d, v), this.manager.emit(this.options.event, v);
      }
    });
    function ur() {
      Be.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    y(ur, Be, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        // max time between the multi-tap taps
        time: 250,
        // max time of the pointer to be down (like finger on the screen)
        threshold: 2,
        // a minimal movement is ok, but keep it low
        posThreshold: 10
        // a multi-tap can be a bit off the initial position
      },
      getTouchAction: function() {
        return [jr];
      },
      process: function(v) {
        var d = this.options, _ = v.pointers.length === d.pointers, E = v.distance < d.threshold, A = v.deltaTime < d.time;
        if (this.reset(), v.eventType & ce && this.count === 0)
          return this.failTimeout();
        if (E && A && _) {
          if (v.eventType != q)
            return this.failTimeout();
          var N = this.pTime ? v.timeStamp - this.pTime < d.interval : !0, j = !this.pCenter || or(this.pCenter, v.center) < d.posThreshold;
          this.pTime = v.timeStamp, this.pCenter = v.center, !j || !N ? this.count = 1 : this.count += 1, this._input = v;
          var ae = this.count % d.taps;
          if (ae === 0)
            return this.hasRequireFailures() ? (this._timer = f(function() {
              this.state = Ye, this.tryEmit();
            }, d.interval, this), _e) : Ye;
        }
        return Ie;
      },
      failTimeout: function() {
        return this._timer = f(function() {
          this.state = Ie;
        }, this.options.interval, this), Ie;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Ye && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Je(v, d) {
      return d = d || {}, d.recognizers = b(d.recognizers, Je.defaults.preset), new Zr(v, d);
    }
    Je.VERSION = "2.0.4", Je.defaults = {
      /**
       * set if DOM events are being triggered.
       * But this is slower and unused by simple implementations, so disabled by default.
       * @type {Boolean}
       * @default false
       */
      domEvents: !1,
      /**
       * The value for the touchAction property/fallback.
       * When set to `compute` it will magically set the correct value based on the added recognizers.
       * @type {String}
       * @default compute
       */
      touchAction: $i,
      /**
       * @type {Boolean}
       * @default true
       */
      enable: !0,
      /**
       * EXPERIMENTAL FEATURE -- can be removed/changed
       * Change the parent input target element.
       * If Null, then it is being set the to main element.
       * @type {Null|EventTarget}
       * @default null
       */
      inputTarget: null,
      /**
       * force an input class
       * @type {Null|Function}
       * @default null
       */
      inputClass: null,
      /**
       * Default recognizer setup when calling `Hammer()`
       * When creating a new Manager these will be skipped.
       * @type {Array}
       */
      preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [Vr, { enable: !1 }],
        [Gr, { enable: !1 }, ["rotate"]],
        [Wr, { direction: Se }],
        [fr, { direction: Se }, ["swipe"]],
        [ur],
        [ur, { event: "doubletap", taps: 2 }, ["tap"]],
        [Hr]
      ],
      /**
       * Some CSS properties can be used to improve the working of Hammer.
       * Add them to this method and they will be set when creating a new Manager.
       * @namespace
       */
      cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: "none",
        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: "none",
        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: "none",
        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: "none",
        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: "none",
        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var No = 1, rn = 2;
    function Zr(v, d) {
      d = d || {}, this.options = g(d, Je.defaults), this.options.inputTarget = this.options.inputTarget || v, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = v, this.input = vo(this), this.touchAction = new kr(this, this.options.touchAction), nn(this, !0), p(d.recognizers, function(_) {
        var E = this.add(new _[0](_[1]));
        _[2] && E.recognizeWith(_[2]), _[3] && E.requireFailure(_[3]);
      }, this);
    }
    Zr.prototype = {
      /**
       * set options
       * @param {Object} options
       * @returns {Manager}
       */
      set: function(v) {
        return m(this.options, v), v.touchAction && this.touchAction.update(), v.inputTarget && (this.input.destroy(), this.input.target = v.inputTarget, this.input.init()), this;
      },
      /**
       * stop recognizing for this session.
       * This session will be discarded, when a new [input]start event is fired.
       * When forced, the recognizer cycle is stopped immediately.
       * @param {Boolean} [force]
       */
      stop: function(v) {
        this.session.stopped = v ? rn : No;
      },
      /**
       * run the recognizers!
       * called by the inputHandler function on every movement of the pointers (touches)
       * it walks through all the recognizers and tries to detect the gesture that is being made
       * @param {Object} inputData
       */
      recognize: function(v) {
        var d = this.session;
        if (!d.stopped) {
          this.touchAction.preventDefaults(v);
          var _, E = this.recognizers, A = d.curRecognizer;
          (!A || A && A.state & Ye) && (A = d.curRecognizer = null);
          for (var N = 0; N < E.length; )
            _ = E[N], d.stopped !== rn && // 1
            (!A || _ == A || // 2
            _.canRecognizeWith(A)) ? _.recognize(v) : _.reset(), !A && _.state & (_e | Et | Qe) && (A = d.curRecognizer = _), N++;
        }
      },
      /**
       * get a recognizer by its event name.
       * @param {Recognizer|String} recognizer
       * @returns {Recognizer|Null}
       */
      get: function(v) {
        if (v instanceof Be)
          return v;
        for (var d = this.recognizers, _ = 0; _ < d.length; _++)
          if (d[_].options.event == v)
            return d[_];
        return null;
      },
      /**
       * add a recognizer to the manager
       * existing recognizers with the same event name will be removed
       * @param {Recognizer} recognizer
       * @returns {Recognizer|Manager}
       */
      add: function(v) {
        if (u(v, "add", this))
          return this;
        var d = this.get(v.options.event);
        return d && this.remove(d), this.recognizers.push(v), v.manager = this, this.touchAction.update(), v;
      },
      /**
       * remove a recognizer by name or instance
       * @param {Recognizer|String} recognizer
       * @returns {Manager}
       */
      remove: function(v) {
        if (u(v, "remove", this))
          return this;
        var d = this.recognizers;
        return v = this.get(v), d.splice(z(d, v), 1), this.touchAction.update(), this;
      },
      /**
       * bind event
       * @param {String} events
       * @param {Function} handler
       * @returns {EventEmitter} this
       */
      on: function(v, d) {
        var _ = this.handlers;
        return p(B(v), function(E) {
          _[E] = _[E] || [], _[E].push(d);
        }), this;
      },
      /**
       * unbind event, leave emit blank to remove all handlers
       * @param {String} events
       * @param {Function} [handler]
       * @returns {EventEmitter} this
       */
      off: function(v, d) {
        var _ = this.handlers;
        return p(B(v), function(E) {
          d ? _[E].splice(z(_[E], d), 1) : delete _[E];
        }), this;
      },
      /**
       * emit event to the listeners
       * @param {String} event
       * @param {Object} data
       */
      emit: function(v, d) {
        this.options.domEvents && Po(v, d);
        var _ = this.handlers[v] && this.handlers[v].slice();
        if (!(!_ || !_.length)) {
          d.type = v, d.preventDefault = function() {
            d.srcEvent.preventDefault();
          };
          for (var E = 0; E < _.length; )
            _[E](d), E++;
        }
      },
      /**
       * destroy the manager and unbinds all events
       * it doesn't unbind dom events, that is the user own responsibility
       */
      destroy: function() {
        this.element && nn(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function nn(v, d) {
      var _ = v.element;
      p(v.options.cssProps, function(E, A) {
        _.style[U(_.style, A)] = d ? E : "";
      });
    }
    function Po(v, d) {
      var _ = r.createEvent("Event");
      _.initEvent(v, !0, !0), _.gesture = d, d.target.dispatchEvent(_);
    }
    m(Je, {
      INPUT_START: ce,
      INPUT_MOVE: ht,
      INPUT_END: q,
      INPUT_CANCEL: ve,
      STATE_POSSIBLE: cr,
      STATE_BEGAN: _e,
      STATE_CHANGED: Et,
      STATE_ENDED: Qe,
      STATE_RECOGNIZED: Ye,
      STATE_CANCELLED: jt,
      STATE_FAILED: Ie,
      DIRECTION_NONE: sr,
      DIRECTION_LEFT: Nt,
      DIRECTION_RIGHT: Pt,
      DIRECTION_UP: Ot,
      DIRECTION_DOWN: Yt,
      DIRECTION_HORIZONTAL: Se,
      DIRECTION_VERTICAL: lt,
      DIRECTION_ALL: Gi,
      Manager: Zr,
      Input: ye,
      TouchAction: kr,
      TouchInput: lr,
      MouseInput: hr,
      PointerEventInput: Ur,
      TouchMouseInput: Fr,
      SingleTouchInput: Ji,
      Recognizer: Be,
      AttrRecognizer: Ae,
      Tap: ur,
      Pan: fr,
      Swipe: Wr,
      Pinch: Gr,
      Rotate: Vr,
      Press: Hr,
      on: S,
      off: R,
      each: p,
      merge: g,
      extend: m,
      inherit: y,
      bindFn: M,
      prefixed: U
    }), typeof n == o && n.amd ? n(function() {
      return Je;
    }) : e.exports ? e.exports = Je : t[i] = Je;
  })(window, document, "Hammer");
})(Ya);
var Ba = Ya.exports, Tt = Ba, g1 = 1, ii = "MarzipanoHammerElementId";
function Ua(e, t) {
  return e[ii] || (e[ii] = g1++), t + e[ii];
}
function zr() {
  this._managers = {}, this._refCount = {};
}
zr.prototype.get = function(e, t) {
  var r = Ua(e, t);
  return this._managers[r] || (this._managers[r] = this._createManager(e, t), this._refCount[r] = 0), this._refCount[r]++, new Lr(this, this._managers[r], e, t);
};
zr.prototype._createManager = function(e, t) {
  var r = new Tt.Manager(e);
  return t === "mouse" ? r.add(new Tt.Pan({ direction: Tt.DIRECTION_ALL, threshold: 0 })) : (t === "touch" || t === "pen" || t === "kinect") && (r.add(new Tt.Pan({ direction: Tt.DIRECTION_ALL, threshold: 20, pointers: 1 })), r.add(new Tt.Pinch())), r;
};
zr.prototype._releaseHandle = function(e, t) {
  var r = Ua(e, t);
  this._refCount[r] && (this._refCount[r]--, this._refCount[r] || (this._managers[r].destroy(), delete this._managers[r], delete this._refCount[r]));
};
function Lr(e, t, r, i) {
  this._manager = t, this._element = r, this._type = i, this._hammerGestures = e, this._eventHandlers = [];
}
Lr.prototype.on = function(e, t) {
  var r = this._type, i = function(n) {
    r === n.pointerType && t(n);
  };
  this._eventHandlers.push({ events: e, handler: i }), this._manager.on(e, i);
};
Lr.prototype.release = function() {
  for (var e = 0; e < this._eventHandlers.length; e++) {
    var t = this._eventHandlers[e];
    this._manager.off(t.events, t.handler);
  }
  this._hammerGestures._releaseHandle(this._element, this._type), this._manager = null, this._element = null, this._type = null, this._hammerGestures = null;
};
Lr.prototype.manager = function() {
  return this._manager;
};
var Dr = new zr();
function w1(e, t, r, i, n) {
  var s = Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2));
  e = Math.max(e, s / i), Fa(t, r, e, n), n[0] = Math.abs(n[0]), n[1] = Math.abs(n[1]);
}
function Fa(e, t, r, i) {
  var n = Math.atan(t / e);
  i[0] = r * Math.cos(n), i[1] = r * Math.sin(n);
}
var ja = {
  maxFriction: w1,
  changeVectorNorm: Fa
}, M1 = Q, xn = Ze, E1 = Dr, A1 = Pe, x1 = ja.maxFriction, T1 = X, b1 = {
  friction: 6,
  maxFrictionTime: 0.3,
  hammerEvent: "pan"
}, Tn = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;
function Xe(e, t, r) {
  if (this._element = e, this._opts = A1(r || {}, b1), this._startEvent = null, this._lastEvent = null, this._active = !1, this._dynamics = {
    x: new xn(),
    y: new xn()
  }, this._hammer = E1.get(e, t), this._hammer.on("hammer.input", this._handleHammerEvent.bind(this)), this._opts.hammerEvent != "pan" && this._opts.hammerEvent != "pinch")
    throw new Error(this._opts.hammerEvent + " is not a hammerEvent managed in DragControlMethod");
  this._hammer.on(this._opts.hammerEvent + "start", this._handleStart.bind(this)), this._hammer.on(this._opts.hammerEvent + "move", this._handleMove.bind(this)), this._hammer.on(this._opts.hammerEvent + "end", this._handleEnd.bind(this)), this._hammer.on(this._opts.hammerEvent + "cancel", this._handleEnd.bind(this));
}
M1(Xe);
Xe.prototype.destroy = function() {
  this._hammer.release(), T1(this);
};
Xe.prototype._handleHammerEvent = function(e) {
  if (e.isFirst) {
    if (Tn && this._active)
      throw new Error("DragControlMethod active detected when already active");
    this._active = !0, this.emit("active");
  }
  if (e.isFinal) {
    if (Tn && !this._active)
      throw new Error("DragControlMethod inactive detected when already inactive");
    this._active = !1, this.emit("inactive");
  }
};
Xe.prototype._handleStart = function(e) {
  e.preventDefault(), this._startEvent = e;
};
Xe.prototype._handleMove = function(e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsMove(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y));
};
Xe.prototype._handleEnd = function(e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsRelease(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y)), this._startEvent = !1, this._lastEvent = !1;
};
Xe.prototype._updateDynamicsMove = function(e) {
  var t = e.deltaX, r = e.deltaY, i = this._lastEvent || this._startEvent;
  i && (t -= i.deltaX, r -= i.deltaY);
  var n = this._element.getBoundingClientRect(), s = n.right - n.left, a = n.bottom - n.top;
  t /= s, r /= a, this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.offset = -t, this._dynamics.y.offset = -r, this._lastEvent = e;
};
var ni = [null, null];
Xe.prototype._updateDynamicsRelease = function(e) {
  var t = this._element.getBoundingClientRect(), r = t.right - t.left, i = t.bottom - t.top, n = 1e3 * e.velocityX / r, s = 1e3 * e.velocityY / i;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = n, this._dynamics.y.velocity = s, x1(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, ni), this._dynamics.x.friction = ni[0], this._dynamics.y.friction = ni[1];
};
var ka = Xe, S1 = Q, bn = Ze, I1 = Dr, R1 = Pe, C1 = ja.maxFriction, z1 = X, L1 = {
  speed: 8,
  friction: 6,
  maxFrictionTime: 0.3
};
function Mt(e, t, r) {
  this._element = e, this._opts = R1(r || {}, L1), this._active = !1, this._hammer = I1.get(e, t), this._dynamics = {
    x: new bn(),
    y: new bn()
  }, this._hammer.on("panstart", this._handleStart.bind(this)), this._hammer.on("panmove", this._handleMove.bind(this)), this._hammer.on("panend", this._handleRelease.bind(this)), this._hammer.on("pancancel", this._handleRelease.bind(this));
}
S1(Mt);
Mt.prototype.destroy = function() {
  this._hammer.release(), z1(this);
};
Mt.prototype._handleStart = function(e) {
  e.preventDefault(), this._active || (this._active = !0, this.emit("active"));
};
Mt.prototype._handleMove = function(e) {
  e.preventDefault(), this._updateDynamics(e, !1);
};
Mt.prototype._handleRelease = function(e) {
  e.preventDefault(), this._updateDynamics(e, !0), this._active && (this._active = !1, this.emit("inactive"));
};
var si = [null, null];
Mt.prototype._updateDynamics = function(e, t) {
  var r = this._element.getBoundingClientRect(), i = r.right - r.left, n = r.bottom - r.top, s = Math.max(i, n), a = e.deltaX / s * this._opts.speed, o = e.deltaY / s * this._opts.speed;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = a, this._dynamics.y.velocity = o, t && (C1(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, si), this._dynamics.x.friction = si[0], this._dynamics.y.friction = si[1]), this.emit("parameterDynamics", "x", this._dynamics.x), this.emit("parameterDynamics", "y", this._dynamics.y);
};
var Ga = Mt, D1 = Q, N1 = Ze, P1 = Pe, O1 = X, Y1 = {
  frictionTime: 0.2,
  zoomDelta: 1e-3
};
function rr(e, t) {
  this._element = e, this._opts = P1(t || {}, Y1), this._dynamics = new N1(), this._eventList = [];
  var r = this._opts.frictionTime ? this.withSmoothing : this.withoutSmoothing;
  this._wheelListener = r.bind(this), e.addEventListener("wheel", this._wheelListener);
}
D1(rr);
rr.prototype.destroy = function() {
  this._element.removeEventListener("wheel", this._wheelListener), O1(this);
};
rr.prototype.withoutSmoothing = function(e) {
  this._dynamics.offset = Ha(e) * this._opts.zoomDelta, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive");
};
rr.prototype.withSmoothing = function(e) {
  var t = e.timeStamp;
  for (this._eventList.push(e); this._eventList[0].timeStamp < t - this._opts.frictionTime * 1e3; )
    this._eventList.shift(0);
  for (var r = 0, i = 0; i < this._eventList.length; i++) {
    var n = Ha(this._eventList[i]) * this._opts.zoomDelta;
    r += n / this._opts.frictionTime;
  }
  this._dynamics.velocity = r, this._dynamics.friction = Math.abs(r) / this._opts.frictionTime, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive");
};
function Ha(e) {
  var t = e.deltaMode == 1 ? 20 : 1;
  return e.deltaY * t;
}
var Va = rr, B1 = Q, U1 = Ze, F1 = Dr, j1 = X;
function Lt(e, t, r) {
  this._hammer = F1.get(e, t), this._lastEvent = null, this._active = !1, this._dynamics = new U1(), this._hammer.on("pinchstart", this._handleStart.bind(this)), this._hammer.on("pinch", this._handleEvent.bind(this)), this._hammer.on("pinchend", this._handleEnd.bind(this)), this._hammer.on("pinchcancel", this._handleEnd.bind(this));
}
B1(Lt);
Lt.prototype.destroy = function() {
  this._hammer.release(), j1(this);
};
Lt.prototype._handleStart = function() {
  this._active || (this._active = !0, this.emit("active"));
};
Lt.prototype._handleEnd = function() {
  this._lastEvent = null, this._active && (this._active = !1, this.emit("inactive"));
};
Lt.prototype._handleEvent = function(e) {
  var t = e.scale;
  this._lastEvent && (t /= this._lastEvent.scale), this._dynamics.offset = (t - 1) * -1, this.emit("parameterDynamics", "zoom", this._dynamics), this._lastEvent = e;
};
var Wa = Lt, k1 = Q, G1 = Ze, H1 = X;
function ir(e) {
  if (!e)
    throw new Error("VelocityControlMethod: parameter must be defined");
  this._parameter = e, this._dynamics = new G1();
}
k1(ir);
ir.prototype.destroy = function() {
  H1(this);
};
ir.prototype.setVelocity = function(e) {
  this._dynamics.velocity = e, this.emit("parameterDynamics", this._parameter, this._dynamics);
};
ir.prototype.setFriction = function(e) {
  this._dynamics.friction = e, this.emit("parameterDynamics", this._parameter, this._dynamics);
};
var V1 = ir, W1 = Q, Z1 = Ze, X1 = X;
function nr(e, t, r, i) {
  if (!e)
    throw new Error("ElementPressControlMethod: element must be defined");
  if (!t)
    throw new Error("ElementPressControlMethod: parameter must be defined");
  if (!r)
    throw new Error("ElementPressControlMethod: velocity must be defined");
  if (!i)
    throw new Error("ElementPressControlMethod: friction must be defined");
  this._element = e, this._pressHandler = this._handlePress.bind(this), this._releaseHandler = this._handleRelease.bind(this), e.addEventListener("mousedown", this._pressHandler), e.addEventListener("mouseup", this._releaseHandler), e.addEventListener("mouseleave", this._releaseHandler), e.addEventListener("touchstart", this._pressHandler), e.addEventListener("touchmove", this._releaseHandler), e.addEventListener("touchend", this._releaseHandler), this._parameter = t, this._velocity = r, this._friction = i, this._dynamics = new Z1(), this._pressing = !1;
}
W1(nr);
nr.prototype.destroy = function() {
  this._element.removeEventListener("mousedown", this._pressHandler), this._element.removeEventListener("mouseup", this._releaseHandler), this._element.removeEventListener("mouseleave", this._releaseHandler), this._element.removeEventListener("touchstart", this._pressHandler), this._element.removeEventListener("touchmove", this._releaseHandler), this._element.removeEventListener("touchend", this._releaseHandler), X1(this);
};
nr.prototype._handlePress = function() {
  this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active");
};
nr.prototype._handleRelease = function() {
  this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1;
};
var Q1 = nr, J1 = Q, q1 = Ze, K1 = pt, $1 = X;
function Te(e) {
  e = e || {}, this._methods = [], this._parameters = ["x", "y", "axisScaledX", "axisScaledY", "zoom", "yaw", "pitch", "roll"], this._now = e.nowForTesting || K1, this._composedOffsets = {}, this._composeReturn = { offsets: this._composedOffsets, changing: null };
}
J1(Te);
Te.prototype.add = function(e) {
  if (!this.has(e)) {
    var t = {};
    this._parameters.forEach(function(n) {
      t[n] = {
        dynamics: new q1(),
        time: null
      };
    });
    var r = this._updateDynamics.bind(this, t), i = {
      instance: e,
      dynamics: t,
      parameterDynamicsHandler: r
    };
    e.addEventListener("parameterDynamics", r), this._methods.push(i);
  }
};
Te.prototype.remove = function(e) {
  var t = this._indexOfInstance(e);
  if (t >= 0) {
    var r = this._methods.splice(t, 1)[0];
    r.instance.removeEventListener("parameterDynamics", r.parameterDynamicsHandler);
  }
};
Te.prototype.has = function(e) {
  return this._indexOfInstance(e) >= 0;
};
Te.prototype._indexOfInstance = function(e) {
  for (var t = 0; t < this._methods.length; t++)
    if (this._methods[t].instance === e)
      return t;
  return -1;
};
Te.prototype.list = function() {
  for (var e = [], t = 0; t < this._methods.length; t++)
    e.push(this._methods[t].instance);
  return e;
};
Te.prototype._updateDynamics = function(e, t, r) {
  var i = e[t];
  if (!i)
    throw new Error("Unknown control parameter " + t);
  var n = this._now();
  i.dynamics.update(r, (n - i.time) / 1e3), i.time = n, this.emit("change");
};
Te.prototype._resetComposedOffsets = function() {
  for (var e = 0; e < this._parameters.length; e++)
    this._composedOffsets[this._parameters[e]] = 0;
};
Te.prototype.offsets = function() {
  var e, t = !1, r = this._now();
  this._resetComposedOffsets();
  for (var i = 0; i < this._methods.length; i++)
    for (var n = this._methods[i].dynamics, s = 0; s < this._parameters.length; s++) {
      e = this._parameters[s];
      var a = n[e], o = a.dynamics;
      o.offset != null && (this._composedOffsets[e] += o.offset, o.offset = null);
      var h = (r - a.time) / 1e3, l = o.offsetFromVelocity(h);
      l && (this._composedOffsets[e] += l);
      var c = o.velocityAfter(h);
      o.velocity = c, c && (t = !0), a.time = r;
    }
  return this._composeReturn.changing = t, this._composeReturn;
};
Te.prototype.destroy = function() {
  for (var e = this.list(), t = 0; t < e.length; t++)
    this.remove(e[t]);
  $1(this);
};
var em = Te, tm = Q, rm = em, im = X, Za = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;
function W(e) {
  e = e || {}, this._methods = {}, this._methodGroups = {}, this._composer = new rm(), this._enabled = e && e.enabled ? !!e.enabled : !0, this._activeCount = 0, this.updatedViews_ = [], this._attachedRenderLoop = null;
}
tm(W);
W.prototype.destroy = function() {
  this.detach(), this._composer.destroy(), im(this);
};
W.prototype.methods = function() {
  var e = {};
  for (var t in this._methods)
    e[t] = this._methods[t];
  return e;
};
W.prototype.method = function(e) {
  return this._methods[e];
};
W.prototype.registerMethod = function(e, t, r) {
  if (this._methods[e])
    throw new Error("Control method already registered with id " + e);
  this._methods[e] = {
    instance: t,
    enabled: !1,
    active: !1,
    activeHandler: this._handleActive.bind(this, e),
    inactiveHandler: this._handleInactive.bind(this, e)
  }, r && this.enableMethod(e, t);
};
W.prototype.unregisterMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled && this.disableMethod(e), delete this._methods[e];
};
W.prototype.enableMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled || (t.enabled = !0, t.active && this._incrementActiveCount(), this._listen(e), this._updateComposer(), this.emit("methodEnabled", e));
};
W.prototype.disableMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled && (t.enabled = !1, t.active && this._decrementActiveCount(), this._unlisten(e), this._updateComposer(), this.emit("methodDisabled", e));
};
W.prototype.addMethodGroup = function(e, t) {
  this._methodGroups[e] = t;
};
W.prototype.removeMethodGroup = function(e) {
  delete this._methodGroups[e];
};
W.prototype.methodGroups = function() {
  var e = {};
  for (var t in this._methodGroups)
    e[t] = this._methodGroups[t];
  return e;
};
W.prototype.enableMethodGroup = function(e) {
  var t = this;
  t._methodGroups[e].forEach(function(r) {
    t.enableMethod(r);
  });
};
W.prototype.disableMethodGroup = function(e) {
  var t = this;
  t._methodGroups[e].forEach(function(r) {
    t.disableMethod(r);
  });
};
W.prototype.enabled = function() {
  return this._enabled;
};
W.prototype.enable = function() {
  this._enabled || (this._enabled = !0, this._activeCount > 0 && this.emit("active"), this.emit("enabled"), this._updateComposer());
};
W.prototype.disable = function() {
  this._enabled && (this._enabled = !1, this._activeCount > 0 && this.emit("inactive"), this.emit("disabled"), this._updateComposer());
};
W.prototype.attach = function(e) {
  this._attachedRenderLoop && this.detach(), this._attachedRenderLoop = e, this._beforeRenderHandler = this._updateViewsWithControls.bind(this), this._changeHandler = e.renderOnNextFrame.bind(e), this._attachedRenderLoop.addEventListener("beforeRender", this._beforeRenderHandler), this._composer.addEventListener("change", this._changeHandler);
};
W.prototype.detach = function() {
  this._attachedRenderLoop && (this._attachedRenderLoop.removeEventListener("beforeRender", this._beforeRenderHandler), this._composer.removeEventListener("change", this._changeHandler), this._beforeRenderHandler = null, this._changeHandler = null, this._attachedRenderLoop = null);
};
W.prototype.attached = function() {
  return this._attachedRenderLoop != null;
};
W.prototype._listen = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  t.instance.addEventListener("active", t.activeHandler), t.instance.addEventListener("inactive", t.inactiveHandler);
};
W.prototype._unlisten = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  t.instance.removeEventListener("active", t.activeHandler), t.instance.removeEventListener("inactive", t.inactiveHandler);
};
W.prototype._handleActive = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active || (t.active = !0, this._incrementActiveCount());
};
W.prototype._handleInactive = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active && (t.active = !1, this._decrementActiveCount());
};
W.prototype._incrementActiveCount = function() {
  this._activeCount++, Za && this._checkActiveCount(), this._enabled && this._activeCount === 1 && this.emit("active");
};
W.prototype._decrementActiveCount = function() {
  this._activeCount--, Za && this._checkActiveCount(), this._enabled && this._activeCount === 0 && this.emit("inactive");
};
W.prototype._checkActiveCount = function() {
  var e = 0;
  for (var t in this._methods) {
    var r = this._methods[t];
    r.enabled && r.active && e++;
  }
  if (e != this._activeCount)
    throw new Error("Bad control state");
};
W.prototype._updateComposer = function() {
  var e = this._composer;
  for (var t in this._methods) {
    var r = this._methods[t], i = this._enabled && r.enabled;
    i && !e.has(r.instance) && e.add(r.instance), !i && e.has(r.instance) && e.remove(r.instance);
  }
};
W.prototype._updateViewsWithControls = function() {
  var e = this._composer.offsets();
  e.changing && this._attachedRenderLoop.renderOnNextFrame(), this.updatedViews_.length = 0;
  for (var t = this._attachedRenderLoop.stage().listLayers(), r = 0; r < t.length; r++) {
    var i = t[r].view();
    this.updatedViews_.indexOf(i) < 0 && (t[r].view().updateWithControlParameters(e.offsets), this.updatedViews_.push(i));
  }
};
var Xa = W, nm = fe.setTransform, Sn = Ui;
function sm(e, t, r, i) {
  i = i || "";
  var n = "translateX(" + Sn(t) + "px) translateY(" + Sn(r) + "px) translateZ(0) " + i;
  nm(e, n);
}
var Qa = sm, am = Q, om = Qa, hm = fe.setTransform, lm = X;
function de(e, t, r, i, n) {
  n = n || {}, n.perspective = n.perspective || {}, n.perspective.extraTransforms = n.perspective.extraTransforms != null ? n.perspective.extraTransforms : "", this._domElement = e, this._parentDomElement = t, this._view = r, this._coords = {}, this._perspective = {}, this.setPosition(i), this._parentDomElement.appendChild(this._domElement), this.setPerspective(n.perspective), this._visible = !0, this._position = { x: 0, y: 0 };
}
am(de);
de.prototype.destroy = function() {
  this._parentDomElement.removeChild(this._domElement), lm(this);
};
de.prototype.domElement = function() {
  return this._domElement;
};
de.prototype.position = function() {
  return this._coords;
};
de.prototype.setPosition = function(e) {
  for (var t in e)
    this._coords[t] = e[t];
  this._update();
};
de.prototype.perspective = function() {
  return this._perspective;
};
de.prototype.setPerspective = function(e) {
  for (var t in e)
    this._perspective[t] = e[t];
  this._update();
};
de.prototype.show = function() {
  this._visible || (this._visible = !0, this._update());
};
de.prototype.hide = function() {
  this._visible && (this._visible = !1, this._update());
};
de.prototype._update = function() {
  var e = this._domElement, t = this._coords, r = this._position, i, n, s = !1;
  if (this._visible) {
    var a = this._view;
    this._perspective.radius ? (s = !0, this._setEmbeddedPosition(a, t)) : (a.coordinatesToScreen(t, r), i = r.x, n = r.y, i != null && n != null && (s = !0, this._setPosition(i, n)));
  }
  s ? (e.style.display = "block", e.style.position = "absolute") : (e.style.display = "none", e.style.position = "");
};
de.prototype._setEmbeddedPosition = function(e, t) {
  var r = e.coordinatesToPerspectiveTransform(
    t,
    this._perspective.radius,
    this._perspective.extraTransforms
  );
  hm(this._domElement, r);
};
de.prototype._setPosition = function(e, t) {
  om(this._domElement, e, t, this._perspective.extraTransforms);
};
var Ja = de, cm = Q, vm = Ja, fm = kn, In = Qa, Rn = fe.setAbsolute, um = fe.setOverflowHidden, dm = fe.setOverflowVisible, pm = fe.setNullSize, mm = fe.setPixelSize, Cn = fe.setWithVendorPrefix("pointer-events"), ym = X;
function pe(e, t, r, i, n) {
  n = n || {}, this._parentDomElement = e, this._stage = t, this._view = r, this._renderLoop = i, this._hotspots = [], this._visible = !0, this._rect = n.rect, this._visibilityOrRectChanged = !0, this._stageWidth = null, this._stageHeight = null, this._tmpRect = {}, this._hotspotContainerWrapper = document.createElement("div"), Rn(this._hotspotContainerWrapper), Cn(this._hotspotContainerWrapper, "none"), this._parentDomElement.appendChild(this._hotspotContainerWrapper), this._hotspotContainer = document.createElement("div"), Rn(this._hotspotContainer), Cn(this._hotspotContainer, "all"), this._hotspotContainerWrapper.appendChild(this._hotspotContainer), this._updateHandler = this._update.bind(this), this._renderLoop.addEventListener("afterRender", this._updateHandler);
}
cm(pe);
pe.prototype.destroy = function() {
  for (; this._hotspots.length; )
    this.destroyHotspot(this._hotspots[0]);
  this._parentDomElement.removeChild(this._hotspotContainerWrapper), this._renderLoop.removeEventListener("afterRender", this._updateHandler), ym(this);
};
pe.prototype.domElement = function() {
  return this._hotspotContainer;
};
pe.prototype.setRect = function(e) {
  this._rect = e, this._visibilityOrRectChanged = !0;
};
pe.prototype.rect = function() {
  return this._rect;
};
pe.prototype.createHotspot = function(e, t, r) {
  t = t || {};
  var i = new vm(
    e,
    this._hotspotContainer,
    this._view,
    t,
    r
  );
  return this._hotspots.push(i), i._update(), this.emit("hotspotsChange"), i;
};
pe.prototype.hasHotspot = function(e) {
  return this._hotspots.indexOf(e) >= 0;
};
pe.prototype.listHotspots = function() {
  return [].concat(this._hotspots);
};
pe.prototype.destroyHotspot = function(e) {
  var t = this._hotspots.indexOf(e);
  if (t < 0)
    throw new Error("No such hotspot");
  this._hotspots.splice(t, 1), e.destroy(), this.emit("hotspotsChange");
};
pe.prototype.hide = function() {
  this._visible && (this._visible = !1, this._visibilityOrRectChanged = !0, this._update());
};
pe.prototype.show = function() {
  this._visible || (this._visible = !0, this._visibilityOrRectChanged = !0, this._update());
};
pe.prototype._update = function() {
  var e = this._hotspotContainerWrapper, t = this._stage.width(), r = this._stage.height(), i = this._tmpRect;
  if (this._visibilityOrRectChanged || this._rect && (t !== this._stageWidth || r !== this._stageHeight)) {
    var n = this._visible;
    e.style.display = n ? "block" : "none", n && (this._rect ? (fm(t, r, this._rect, i), In(e, t * i.x, r * i.y), mm(e, t * i.width, r * i.height), um(e)) : (In(e, 0, 0), pm(e), dm(e))), this._stageWidth = t, this._stageHeight = r, this._visibilityOrRectChanged = !1;
  }
  for (var s = 0; s < this._hotspots.length; s++)
    this._hotspots[s]._update();
};
var qa = pe, _m = Na, gm = La, wm = qa, Mm = Q, Ka = pt, Em = er, Am = Kt, zn = Pe, xm = X;
function $(e, t) {
  this._viewer = e, this._view = t, this._layers = [], this._hotspotContainer = new wm(
    e._controlContainer,
    e.stage(),
    this._view,
    e.renderLoop()
  ), this._movement = null, this._movementStartTime = null, this._movementStep = null, this._movementParams = null, this._movementCallback = null, this._updateMovementHandler = this._updateMovement.bind(this), this._updateHotspotContainerHandler = this._updateHotspotContainer.bind(this), this._viewer.addEventListener("sceneChange", this._updateHotspotContainerHandler), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._view.addEventListener("change", this._viewChangeHandler), this._updateHotspotContainer();
}
Mm($);
$.prototype.destroy = function() {
  this._view.removeEventListener("change", this._viewChangeHandler), this._viewer.removeEventListener("sceneChange", this._updateHotspotContainerHandler), this._movement && this.stopMovement(), this._hotspotContainer.destroy(), this.destroyAllLayers(), xm(this);
};
$.prototype.hotspotContainer = function() {
  return this._hotspotContainer;
};
$.prototype.layer = function() {
  return this._layers[0];
};
$.prototype.listLayers = function() {
  return [].concat(this._layers);
};
$.prototype.view = function() {
  return this._view;
};
$.prototype.viewer = function() {
  return this._viewer;
};
$.prototype.visible = function() {
  return this._viewer.scene() === this;
};
$.prototype.createLayer = function(e) {
  e = e || {};
  var t = e.textureStoreOpts || {}, r = e.layerOpts || {}, i = e.source, n = e.geometry, s = this._view, a = this._viewer.stage(), o = new gm(i, a, t), h = new _m(i, n, s, o, r);
  return this._layers.push(h), e.pinFirstLevel && h.pinFirstLevel(), this.emit("layerChange"), h;
};
$.prototype.destroyLayer = function(e) {
  var t = this._layers.indexOf(e);
  if (t < 0)
    throw new Error("No such layer in scene");
  this._layers.splice(t, 1), this.emit("layerChange"), e.textureStore().destroy(), e.destroy();
};
$.prototype.destroyAllLayers = function() {
  for (; this._layers.length > 0; )
    this.destroyLayer(this._layers[0]);
};
$.prototype.switchTo = function(e, t) {
  return this._viewer.switchScene(this, e, t);
};
$.prototype.lookTo = function(e, t, r) {
  var i = this;
  if (t = t || {}, r = r || Em, Am(e) !== "object")
    throw new Error("Target view parameters must be an object");
  var n = function(m) {
    return (m *= 2) < 1 ? 0.5 * m * m : -0.5 * (--m * (m - 2) - 1);
  }, s = t.ease != null ? t.ease : n, a = t.controlsInterrupt != null ? t.controlsInterrupt : !1, o = t.transitionDuration != null ? t.transitionDuration : 1e3, h = t.shortest != null ? t.shortest : !0, l = this._view, c = l.parameters(), f = {};
  zn(f, e), zn(f, c), h && l.normalizeToClosest && l.normalizeToClosest(f, f);
  var u = function() {
    var m = !1;
    return function(g, y) {
      if (y >= o && m)
        return null;
      var M = Math.min(y / o, 1);
      for (var T in g) {
        var b = c[T], S = f[T];
        g[T] = b + s(M) * (S - b);
      }
      return m = y >= o, g;
    };
  }, p = this._viewer.controls().enabled();
  a || this._viewer.controls().disable(), this.startMovement(u, function() {
    p && i._viewer.controls().enable(), r();
  });
};
$.prototype.startMovement = function(e, t) {
  var r = this._viewer.renderLoop();
  this._movement && this.stopMovement();
  var i = e();
  if (typeof i != "function")
    throw new Error("Bad movement");
  this._movement = e, this._movementStep = i, this._movementStartTime = Ka(), this._movementParams = {}, this._movementCallback = t, r.addEventListener("beforeRender", this._updateMovementHandler), r.renderOnNextFrame();
};
$.prototype.stopMovement = function() {
  var e = this._movementCallback, t = this._viewer.renderLoop();
  this._movement && (this._movement = null, this._movementStep = null, this._movementStartTime = null, this._movementParams = null, this._movementCallback = null, t.removeEventListener("beforeRender", this._updateMovementHandler), e && e());
};
$.prototype.movement = function() {
  return this._movement;
};
$.prototype._updateMovement = function() {
  if (!this._movement)
    throw new Error("Should not call update");
  var e = this._viewer.renderLoop(), t = this._view, r = Ka() - this._movementStartTime, i = this._movementStep, n = this._movementParams;
  n = t.parameters(n), n = i(n, r), n == null ? this.stopMovement() : (t.setParameters(n), e.renderOnNextFrame());
};
$.prototype._updateHotspotContainer = function() {
  this.visible() ? this._hotspotContainer.show() : this._hotspotContainer.hide();
};
var $a = $, Tm = Q, bm = Pe, eo = pt, Sm = {
  duration: 1 / 0
};
function Oe(e) {
  e = bm(e || {}, Sm), this._duration = e.duration, this._startTime = null, this._handle = null, this._check = this._check.bind(this);
}
Tm(Oe);
Oe.prototype.start = function() {
  this._startTime = eo(), this._handle == null && this._duration < 1 / 0 && this._setup(this._duration);
};
Oe.prototype.started = function() {
  return this._startTime != null;
};
Oe.prototype.stop = function() {
  this._startTime = null, this._handle != null && (clearTimeout(this._handle), this._handle = null);
};
Oe.prototype._setup = function(e) {
  this._handle = setTimeout(this._check, e);
};
Oe.prototype._teardown = function() {
  clearTimeout(this._handle), this._handle = null;
};
Oe.prototype._check = function() {
  var e = eo(), t = e - this._startTime, r = this._duration - t;
  this._teardown(), r <= 0 ? (this.emit("timeout"), this._startTime = null) : r < 1 / 0 && this._setup(r);
};
Oe.prototype.duration = function() {
  return this._duration;
};
Oe.prototype.setDuration = function(e) {
  this._duration = e, this._startTime != null && this._check();
};
var Im = Oe, Rm = Pe, Cm = X, zm = {
  active: "move",
  inactive: "default",
  disabled: "default"
};
function Dt(e, t, r, i) {
  i = Rm(i || {}, zm), this._element = r, this._controls = e, this._id = t, this._attached = !1, this._setActiveCursor = this._setCursor.bind(this, i.active), this._setInactiveCursor = this._setCursor.bind(this, i.inactive), this._setDisabledCursor = this._setCursor.bind(this, i.disabled), this._setOriginalCursor = this._setCursor.bind(this, this._element.style.cursor), this._updateAttachmentHandler = this._updateAttachment.bind(this), e.addEventListener("methodEnabled", this._updateAttachmentHandler), e.addEventListener("methodDisabled", this._updateAttachmentHandler), e.addEventListener("enabled", this._updateAttachmentHandler), e.addEventListener("disabled", this._updateAttachmentHandler), this._updateAttachment();
}
Dt.prototype.destroy = function() {
  this._detachFromControlMethod(this._controls.method(this._id)), this._setOriginalCursor(), this._controls.removeEventListener(
    "methodEnabled",
    this._updateAttachmentHandler
  ), this._controls.removeEventListener(
    "methodDisabled",
    this._updateAttachmentHandler
  ), this._controls.removeEventListener(
    "enabled",
    this._updateAttachmentHandler
  ), this._controls.removeEventListener(
    "disabled",
    this._updateAttachmentHandler
  ), Cm(this);
};
Dt.prototype._updateAttachment = function() {
  var e = this._controls, t = this._id;
  e.enabled() && e.method(t).enabled ? this._attachToControlMethod(e.method(t)) : this._detachFromControlMethod(e.method(t));
};
Dt.prototype._attachToControlMethod = function(e) {
  this._attached || (e.instance.addEventListener("active", this._setActiveCursor), e.instance.addEventListener("inactive", this._setInactiveCursor), e.active ? this._setActiveCursor() : this._setInactiveCursor(), this._attached = !0);
};
Dt.prototype._detachFromControlMethod = function(e) {
  this._attached && (e.instance.removeEventListener("active", this._setActiveCursor), e.instance.removeEventListener("inactive", this._setInactiveCursor), this._setDisabledCursor(), this._attached = !1);
};
Dt.prototype._setCursor = function(e) {
  this._element.style.cursor = e;
};
var Lm = Dt, Dm = Pe, ai = ka, Nm = Ga, Pm = Va, Om = Wa, ge = Oa, Ym = {
  mouseViewMode: "drag",
  dragMode: "pan"
};
function Bm(e, t, r) {
  r = Dm(r || {}, Ym);
  var i = {
    mouseViewDrag: new ai(t, "mouse"),
    mouseViewQtvr: new Nm(t, "mouse"),
    leftArrowKey: new ge(37, "x", -0.7, 3),
    rightArrowKey: new ge(39, "x", 0.7, 3),
    upArrowKey: new ge(38, "y", -0.7, 3),
    downArrowKey: new ge(40, "y", 0.7, 3),
    plusKey: new ge(107, "zoom", -0.7, 3),
    minusKey: new ge(109, "zoom", 0.7, 3),
    wKey: new ge(87, "y", -0.7, 3),
    aKey: new ge(65, "x", -0.7, 3),
    sKey: new ge(83, "y", 0.7, 3),
    dKey: new ge(68, "x", 0.7, 3),
    qKey: new ge(81, "roll", 0.7, 3),
    eKey: new ge(69, "roll", -0.7, 3)
  }, n = ["scrollZoom", "touchView", "pinch"];
  r.scrollZoom !== !1 && (i.scrollZoom = new Pm(t));
  var s = {
    arrowKeys: ["leftArrowKey", "rightArrowKey", "upArrowKey", "downArrowKey"],
    plusMinusKeys: ["plusKey", "minusKey"],
    wasdKeys: ["wKey", "aKey", "sKey", "dKey"],
    qeKeys: ["qKey", "eKey"]
  };
  switch (r.dragMode) {
    case "pinch":
      i.pinch = new ai(t, "touch", { hammerEvent: "pinch" });
      break;
    case "pan":
      i.touchView = new ai(t, "touch"), i.pinch = new Om(t, "touch");
      break;
    default:
      throw new Error("Unknown drag mode: " + r.dragMode);
  }
  switch (r.mouseViewMode) {
    case "drag":
      n.push("mouseViewDrag");
      break;
    case "qtvr":
      n.push("mouseViewQtvr");
      break;
    default:
      throw new Error("Unknown mouse view mode: " + r.mouseViewMode);
  }
  for (var a in i) {
    var o = i[a];
    e.registerMethod(a, o), n.indexOf(a) >= 0 && e.enableMethod(a);
  }
  for (var h in s) {
    var l = s[h];
    e.addMethodGroup(h, l);
  }
  return i;
}
var to = Bm, Ln = pt;
function Um(e, t, r) {
  var i = !1, n = Ln();
  function s() {
    if (!i) {
      var a = (Ln() - n) / e;
      a < 1 ? (t(a), requestAnimationFrame(s)) : (t(1), r());
    }
  }
  return t(0), requestAnimationFrame(s), function() {
    i = !0, r.apply(null, arguments);
  };
}
var ro = Um, Fm = Q, jm = Pa, km = Xa, Gm = $a, Hm = Im, Vm = Kn, Wm = Lm, Dn = Dr, Zm = to, Xm = ya, Qm = fe.setOverflowHidden, Jm = fe.setAbsolute, qm = fe.setFullSize, Km = ro, $m = er, ey = X;
function G(e, t) {
  t = t || {}, this._domElement = e, Qm(e), this._stage = new Vm(t.stage), Xm(this._stage), this._domElement.appendChild(this._stage.domElement()), this._controlContainer = document.createElement("div"), Jm(this._controlContainer), qm(this._controlContainer), e.appendChild(this._controlContainer), this._size = {}, this.updateSize(), this._updateSizeListener = this.updateSize.bind(this), window.addEventListener("resize", this._updateSizeListener), this._renderLoop = new jm(this._stage), this._controls = new km(), this._controlMethods = Zm(this._controls, this._controlContainer, t.controls), this._controls.attach(this._renderLoop), this._hammerManagerTouch = Dn.get(this._controlContainer, "touch"), this._hammerManagerMouse = Dn.get(this._controlContainer, "mouse"), this._dragCursor = new Wm(this._controls, "mouseViewDrag", e, t.cursors && t.cursors.drag || {}), this._renderLoop.start(), this._scenes = [], this._currentScene = null, this._replacedScene = null, this._cancelCurrentTween = null, this._layerChangeHandler = this._updateSceneLayers.bind(this), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._idleTimer = new Hm(), this._idleTimer.start(), this._resetIdleTimerHandler = this._resetIdleTimer.bind(this), this.addEventListener("viewChange", this._resetIdleTimerHandler), this._triggerIdleTimerHandler = this._triggerIdleTimer.bind(this), this._idleTimer.addEventListener("timeout", this._triggerIdleTimerHandler), this._stopMovementHandler = this.stopMovement.bind(this), this._controls.addEventListener("active", this._stopMovementHandler), this.addEventListener("sceneChange", this._stopMovementHandler), this._idleMovement = null;
}
Fm(G);
G.prototype.destroy = function() {
  window.removeEventListener("resize", this._updateSizeListener), this._currentScene && this._removeSceneEventListeners(this._currentScene), this._replacedScene && this._removeSceneEventListeners(this._replacedScene), this._dragCursor.destroy();
  for (var e in this._controlMethods)
    this._controlMethods[e].destroy();
  for (; this._scenes.length; )
    this.destroyScene(this._scenes[0]);
  this._domElement.removeChild(this._stage.domElement()), this._stage.destroy(), this._renderLoop.destroy(), this._controls.destroy(), this._controls = null, this._cancelCurrentTween && this._cancelCurrentTween(), ey(this);
};
G.prototype.updateSize = function() {
  var e = this._size;
  e.width = this._domElement.clientWidth, e.height = this._domElement.clientHeight, this._stage.setSize(e);
};
G.prototype.stage = function() {
  return this._stage;
};
G.prototype.renderLoop = function() {
  return this._renderLoop;
};
G.prototype.controls = function() {
  return this._controls;
};
G.prototype.domElement = function() {
  return this._domElement;
};
G.prototype.createScene = function(e) {
  e = e || {};
  var t = this.createEmptyScene({ view: e.view });
  return t.createLayer({
    source: e.source,
    geometry: e.geometry,
    pinFirstLevel: e.pinFirstLevel,
    textureStoreOpts: e.textureStoreOpts,
    layerOpts: e.layerOpts
  }), t;
};
G.prototype.createEmptyScene = function(e) {
  e = e || {};
  var t = new Gm(this, e.view);
  return this._scenes.push(t), t;
};
G.prototype._updateSceneLayers = function() {
  var e, t, r = this._stage, i = this._currentScene, n = this._replacedScene, s = r.listLayers(), a = [];
  if (n && (a = a.concat(n.listLayers())), i && (a = a.concat(i.listLayers())), Math.abs(s.length - a.length) !== 1)
    throw new Error("Stage and scene out of sync");
  if (a.length < s.length) {
    for (e = 0; e < s.length; e++)
      if (t = s[e], a.indexOf(t) < 0) {
        this._removeLayerFromStage(t);
        break;
      }
  }
  if (a.length > s.length)
    for (e = 0; e < a.length; e++)
      t = a[e], s.indexOf(t) < 0 && this._addLayerToStage(t, e);
};
G.prototype._addLayerToStage = function(e, t) {
  e.pinFirstLevel(), this._stage.addLayer(e, t);
};
G.prototype._removeLayerFromStage = function(e) {
  this._stage.removeLayer(e), e.unpinFirstLevel(), e.textureStore().clearNotPinned();
};
G.prototype._addSceneEventListeners = function(e) {
  e.addEventListener("layerChange", this._layerChangeHandler), e.addEventListener("viewChange", this._viewChangeHandler);
};
G.prototype._removeSceneEventListeners = function(e) {
  e.removeEventListener("layerChange", this._layerChangeHandler), e.removeEventListener("viewChange", this._viewChangeHandler);
};
G.prototype.destroyScene = function(e) {
  var t = this._scenes.indexOf(e);
  if (t < 0)
    throw new Error("No such scene in viewer");
  var r, i;
  if (this._currentScene === e) {
    for (this._removeSceneEventListeners(e), i = e.listLayers(), r = 0; r < i.length; r++)
      this._removeLayerFromStage(i[r]);
    this._cancelCurrentTween && (this._cancelCurrentTween(), this._cancelCurrentTween = null), this._currentScene = null, this.emit("sceneChange");
  }
  if (this._replacedScene === e) {
    for (this._removeSceneEventListeners(e), i = e.listLayers(), r = 0; r < i.length; r++)
      this._removeLayerFromStage(i[r]);
    this._replacedScene = null;
  }
  this._scenes.splice(t, 1), e.destroy();
};
G.prototype.destroyAllScenes = function() {
  for (; this._scenes.length > 0; )
    this.destroyScene(this._scenes[0]);
};
G.prototype.hasScene = function(e) {
  return this._scenes.indexOf(e) >= 0;
};
G.prototype.listScenes = function() {
  return [].concat(this._scenes);
};
G.prototype.scene = function() {
  return this._currentScene;
};
G.prototype.view = function() {
  var e = this._currentScene;
  return e ? e.view() : null;
};
G.prototype.lookTo = function(e, t, r) {
  var i = this._currentScene;
  i && i.lookTo(e, t, r);
};
G.prototype.startMovement = function(e, t) {
  var r = this._currentScene;
  r && r.startMovement(e, t);
};
G.prototype.stopMovement = function() {
  var e = this._currentScene;
  e && e.stopMovement();
};
G.prototype.movement = function() {
  var e = this._currentScene;
  if (e)
    return e.movement();
};
G.prototype.setIdleMovement = function(e, t) {
  this._idleTimer.setDuration(e), this._idleMovement = t;
};
G.prototype.breakIdleMovement = function() {
  this.stopMovement(), this._resetIdleTimer();
};
G.prototype._resetIdleTimer = function() {
  this._idleTimer.start();
};
G.prototype._triggerIdleTimer = function() {
  var e = this._idleMovement;
  e && this.startMovement(e);
};
var ty = 1e3;
function ry(e, t, r) {
  var i = t.listLayers();
  i.forEach(function(n) {
    n.mergeEffects({ opacity: e });
  }), t._hotspotContainer.domElement().style.opacity = e;
}
G.prototype.switchScene = function(e, t, r) {
  var i = this;
  t = t || {}, r = r || $m;
  var n = this._stage, s = this._currentScene;
  if (s === e) {
    r();
    return;
  }
  if (this._scenes.indexOf(e) < 0)
    throw new Error("No such scene in viewer");
  this._cancelCurrentTween && (this._cancelCurrentTween(), this._cancelCurrentTween = null);
  var a = s ? s.listLayers() : [], o = e.listLayers(), h = n.listLayers();
  if (s && (h.length !== a.length || h.length > 1 && h[0] != a[0]))
    throw new Error("Stage not in sync with viewer");
  for (var l = t.transitionDuration != null ? t.transitionDuration : ty, c = t.transitionUpdate != null ? t.transitionUpdate : ry, f = 0; f < o.length; f++)
    this._addLayerToStage(o[f]);
  function u(m) {
    c(m, e, s);
  }
  function p() {
    if (i._replacedScene) {
      i._removeSceneEventListeners(i._replacedScene), a = i._replacedScene.listLayers();
      for (var m = 0; m < a.length; m++)
        i._removeLayerFromStage(a[m]);
      i._replacedScene = null;
    }
    i._cancelCurrentTween = null, r();
  }
  this._cancelCurrentTween = Km(l, u, p), this._currentScene = e, this._replacedScene = s, this.emit("sceneChange"), this.emit("viewChange"), this._addSceneEventListeners(e);
};
var iy = G, Nr = se.vec4, ny = se.mat4;
function sy(e) {
  var t = e || {};
  return t.colorOffset = t.colorOffset || Nr.create(), t.colorMatrix = t.colorMatrix || ny.create(), t;
}
function io(e, t, r) {
  ay(r, e, t.colorMatrix), Nr.add(r, r, t.colorOffset);
}
function ay(e, t, r) {
  var i = t[0], n = t[1], s = t[2], a = t[3];
  return e[0] = r[0] * i + r[1] * n + r[2] * s + r[3] * a, e[1] = r[4] * i + r[5] * n + r[6] * s + r[7] * a, e[2] = r[8] * i + r[9] * n + r[10] * s + r[11] * a, e[3] = r[12] * i + r[13] * n + r[14] * s + r[15] * a, e;
}
var ct = Nr.create();
function oy(e, t) {
  for (var r = e.width, i = e.height, n = e.data, s = 0; s < r * i; s++)
    Nr.set(ct, n[s * 4 + 0] / 255, n[s * 4 + 1] / 255, n[s * 4 + 2] / 255, n[s * 4 + 3] / 255), io(ct, t, ct), n[s * 4 + 0] = ct[0] * 255, n[s * 4 + 1] = ct[1] * 255, n[s * 4 + 2] = ct[2] * 255, n[s * 4 + 3] = ct[3] * 255;
}
var hy = {
  identity: sy,
  applyToPixel: io,
  applyToImageData: oy
}, ly = Pe, oi = 0.1, hi = 0.01, cy = {
  yawSpeed: oi,
  pitchSpeed: oi,
  fovSpeed: oi,
  yawAccel: hi,
  pitchAccel: hi,
  fovAccel: hi,
  targetPitch: 0,
  targetFov: null
};
function vy(e) {
  e = ly(e || {}, cy);
  var t = e.yawSpeed, r = e.pitchSpeed, i = e.fovSpeed, n = e.yawAccel, s = e.pitchAccel, a = e.fovAccel, o = e.targetPitch, h = e.targetFov;
  return function() {
    var c = 0, f = 0, u = 0, p = 0, m = 0, g = 0, y = 0, M, T, b, S;
    return function(x, O) {
      if (M = (O - c) / 1e3, m = Math.min(f + M * n, t), T = m * M, x.yaw = x.yaw + T, o != null && x.pitch !== o) {
        var B = 0.5 * u * u / s;
        Math.abs(o - x.pitch) > B ? g = Math.min(u + M * s, r) : g = Math.max(u - M * s, 0), b = g * M, o < x.pitch && (x.pitch = Math.max(o, x.pitch - b)), o > x.pitch && (x.pitch = Math.min(o, x.pitch + b));
      }
      if (h != null && x.fov !== o) {
        var z = 0.5 * p * p / a;
        Math.abs(h - x.fov) > z ? y = Math.min(p + M * a, i) : y = Math.max(p - M * a, 0), S = y * M, h < x.fov && (x.fov = Math.max(h, x.fov - S)), h > x.fov && (x.fov = Math.min(h, x.fov + S));
      }
      return c = O, f = m, u = g, p = y, x;
    };
  };
}
var fy = vy;
function uy(e, t) {
  function r() {
    t && t.length > 0 ? e.apply(null, t) : e();
  }
  setTimeout(r, 0);
}
var dy = uy;
function py(e) {
  return e * Math.PI / 180;
}
var my = py;
function yy(e) {
  return e * 180 / Math.PI;
}
var _y = yy, gy = {
  // Stages.
  WebGlStage: Kn,
  // Renderers.
  WebGlCubeRenderer: fa,
  WebGlFlatRenderer: da,
  WebGlEquirectRenderer: ma,
  registerDefaultRenderers: ya,
  // Geometries.
  CubeGeometry: Dp,
  FlatGeometry: Gp,
  EquirectGeometry: Qp,
  // Views.
  RectilinearView: m0,
  FlatView: T0,
  // Sources.
  ImageUrlSource: k0,
  SingleAssetSource: G0,
  // Assets.
  StaticAsset: Mi,
  DynamicAsset: X0,
  // Texture store.
  TextureStore: La,
  // Layer.
  Layer: Na,
  // Render loop.
  RenderLoop: Pa,
  // Controls.
  KeyControlMethod: Oa,
  DragControlMethod: ka,
  QtvrControlMethod: Ga,
  ScrollZoomControlMethod: Va,
  PinchZoomControlMethod: Wa,
  VelocityControlMethod: V1,
  ElementPressControlMethod: Q1,
  Controls: Xa,
  Dynamics: Ze,
  // High-level API.
  Viewer: iy,
  Scene: $a,
  // Hotspots.
  Hotspot: Ja,
  HotspotContainer: qa,
  // Effects.
  colorEffects: hy,
  // Miscellaneous functions.
  registerDefaultControls: to,
  autorotate: fy,
  // Utility functions.
  util: {
    async: Gn,
    cancelize: Hn,
    chain: Fi,
    clamp: Rt,
    clearOwnProperties: X,
    cmp: Jt,
    compose: Aa,
    convertFov: Ea,
    decimal: Ui,
    defaults: Pe,
    defer: dy,
    degToRad: my,
    delay: Ia,
    dom: fe,
    extend: Da,
    hash: Ir,
    inherits: Le,
    mod: nt,
    noop: er,
    now: pt,
    once: gi,
    pixelRatio: br,
    radToDeg: _y,
    real: Bi,
    retry: Ra,
    tween: ro,
    type: Kt
  },
  // Expose dependencies for clients to use.
  dependencies: {
    bowser: Ei,
    glMatrix: se,
    eventEmitter: Q,
    hammerjs: Ba
  }
};
const bt = /* @__PURE__ */ Vo(gy), wy = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJleWUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1leWUgZmEtdy0xOCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMjg4IDE0NGExMTAuOTQgMTEwLjk0IDAgMCAwLTMxLjI0IDUgNTUuNCA1NS40IDAgMCAxIDcuMjQgMjcgNTYgNTYgMCAwIDEtNTYgNTYgNTUuNCA1NS40IDAgMCAxLTI3LTcuMjRBMTExLjcxIDExMS43MSAwIDEgMCAyODggMTQ0em0yODQuNTIgOTcuNEM1MTguMjkgMTM1LjU5IDQxMC45MyA2NCAyODggNjRTNTcuNjggMTM1LjY0IDMuNDggMjQxLjQxYTMyLjM1IDMyLjM1IDAgMCAwIDAgMjkuMTlDNTcuNzEgMzc2LjQxIDE2NS4wNyA0NDggMjg4IDQ0OHMyMzAuMzItNzEuNjQgMjg0LjUyLTE3Ny40MWEzMi4zNSAzMi4zNSAwIDAgMCAwLTI5LjE5ek0yODggNDAwYy05OC42NSAwLTE4OS4wOS01NS0yMzcuOTMtMTQ0Qzk4LjkxIDE2NyAxODkuMzQgMTEyIDI4OCAxMTJzMTg5LjA5IDU1IDIzNy45MyAxNDRDNDc3LjEgMzQ1IDM4Ni42NiA0MDAgMjg4IDQwMHoiPjwvcGF0aD48L3N2Zz4=", My = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wy
}, Symbol.toStringTag, { value: "Module" })), Ey = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2N0FGNzU5MEVEQTgxMUU0OTQzNEQxQTUyOEE3RjAxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2N0FGNzU5MUVEQTgxMUU0OTQzNEQxQTUyOEE3RjAxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QUY3NThFRURBODExRTQ5NDM0RDFBNTI4QTdGMDE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY3QUY3NThGRURBODExRTQ5NDM0RDFBNTI4QTdGMDE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KcBSuAAAAq5JREFUeNrsmltLVFEUx/cY3awopD5FfYIIouvniCB8EMKEIqEQhKJA0CgoumAUPfgQPURJFJpdpKtIRDftipU6iFAPYUSn/4Y1INPx7P85Z58zM7o2/F7m7L3W+s3MGubsfQpBEJiFNOrMAhsqrMIqrMIqrMIqrMIqrMIqrMKphHeCR2AGjIJ9oFDlHgfBB/BLat8cOtPeD5exA/wJ/h8XQCFkfqVZBK6E1PsbbCqfHxZgMJh7nK8yaSt7KaLeu4zwTBA9zlSJdB3odtQ6Xb4urIfHHf3SCE5WuKdt7nNgl2PeJPOj1U0kbAJdFZK2Oc+C3cTci8yP1mJwI+BGZ85fY9tKp8narkqPO3vYshT0koE7cpQ9RdZ0DSwJixOVYBm4RSY4noNsF1nL9blkXcKWenCbTHQ0Q+FOsoabUbKMcEm6j0zYnoFsB5m7V1rRpBUuSQ+Qids8yh4jc9rWW87EjJN8BbhHFnDYg+wRMtcd+UCMb2HLKvCALKQ1hWw7maM/jmwSYctqx//t2eNAgvhtZOyBuLJJhUvSj8nCWmLEPUTGvA9WJqk9TY9Z6adkgc1EvFYy1kNpLZO3sGUNeE4U+RfsjYizn5QdlDfaVErY0gCGSOmmkPUtpOyTtLK+hC1rwTAp3ThrXTMp+8yHrKXg8ZGHdaAPbHDMswn3gHpwgrjFHALbwbSXe0vPz3hY6X6wnpA2hOywyE5V6zZtEWwDr4mbeJfsC9k9nfJZYBb70hNgK3ibIsZL+WSLtbIRPy7SIwnWvpJvSTGLwrI8efgm0qMx1ryRNZO1etQyBrbIiYBrvBPZiVo/WypJf4yYMyKy3+fLYdoXEfoccu29XPs6304PP4GNoAf8BD/AZXltLLdNbX24VIVVWIVVWIVVWIVVWIVVWIVVWIWN+SfAANaCeA8HTVeDAAAAAElFTkSuQmCC", Ay = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ey
}, Symbol.toStringTag, { value: "Module" })), xy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDE3REQ2N0VEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDE3REQ2OEVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwMTdERDY1RURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIwMTdERDY2RURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GRRKIQAAAzJJREFUeNrsm+9rjlEYx8+zLTFC2EZWXoh3isgL+TFCk/zYHyAi0tI0YeRHyjabmRYSUnghShkRQvZC8mb5VSPKEskLIopMcftePddd68nz3JfnnPs+97mfXfV5s109z/3Zuc+v65ylPM9ThRRFqsBiQHhA2F4Ug13gDfgFukG17oemYjpoDQIXQU3Gz/+AZeBGkoRJ9hJYnuX3T8HUpAiT7GWwNEeOx697Xg9eEiPZwaBT0E8/5Csbp0FrCLgiHJSOuz5olbLsIkHuBbAK/M73y0piIHsNLBDkngerdWRtv9JDeXqRyJ4zIWtTeBi4CeYJcs+AdSZkbQkPZ9k5gtzTJmVtCI9g2dmC3FNgg84UZFuYZG+BWcKpZ6Np2ShH6ZHgDpghyD0G6sKQjaqFR4G7QtmOMGWjEB7NstMFue2gPkzZsIXHsOw0Qe5BsNXlAkAZuCfcxrWABpcrHuWgC0wR5DaCnZFOjLR5MMhY8NyTxT7D3y3C5IeNAy+EsrttyBKm5uHx3GcnC3KpMNdsa8diQriSZScJcht4RLYWugUAGo0fgomC3G3gkO1qg24Ltwtk6S+6hVdR1kO3hb/wOjmX7GZwNCa1M+15uFiQ06diFLrC14PeIHAC1MZFWPeVpunoAZgg6Md1vPVzuoXfgyqVPvAKaukj3J+dFlYsS8W4XoF0B4/YTgtTvOWWfi2cyra7Lkzxjlv6lSC3FexwXdjv0/PBS0HuAV5XRxsh7Ur+Z5u419XtYSYVoEcovT8JwkQ5eCaUbkqCMFEGngilW8N+nijq0h/BQvBYkEvTVZurZdr+8YmlHwlyqVx7mBcqzgpTfGbpbkFuPa/KjEvbuPJAh2q3wUxBLh2qbVIGTyNsnA9/BYu5NBQUtSydclnYl67mrWVQ0LHpSVPSNu94fANLwH1B7nqVvg1Q5GIfzgz/cstcQe5ZsFY5fjHtO7d0lyB3jdI8ZYzTXUu6s3WVp66gHVllEoR96U4exYOqJ86+0v3jB1ih0pdfskWPq6N0tvgJVqr09aZ/VT/3JE2Yoo9buok3H37L1vArr5LSh3P1WSMP6sp/tTi9lrYaBSf8V4ABALMjGKvmlNMaAAAAAElFTkSuQmCC", Ty = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xy
}, Symbol.toStringTag, { value: "Module" })), by = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOTNCRjdGOEVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozOTNCRjdGOUVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5M0JGN0Y2RURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM5M0JGN0Y3RURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4u/n+wAAANdJREFUeNrs2rEKglAUh3GvNEhuDW0NvlA0BQ69RFNPVLRE4ANFewQtKTTc/g4NhdzbUuDxO/AtOv04Vxd13vtkSJMmAxvAgAEDBgwYMGDAgAEDBgwYMGDAgAEDBgz4nzMK3CvUpMe2qzp9Ax6rnZobWOhRlaoJHemNEWw7C7WOPcNLY4/tm8d1fD2sVWYIfFd5aMONsQ0/Ykd6bwx8iB3pdv1bIy+uSq3ULQR+zUxNe4y9qPPnRccvD4ABAwYMGDBgwIABAwYMGDBgwIABAwYMGPDv5inAAN6rIOeG8MDyAAAAAElFTkSuQmCC", Sy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: by
}, Symbol.toStringTag, { value: "Module" })), Iy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRDQ5MTM2OUI5RUUxMUU0QTkwNjlDM0MyNkFBOUM1MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRDQ5MTM2QUI5RUUxMUU0QTkwNjlDM0MyNkFBOUM1MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNENDkxMzY3QjlFRTExRTRBOTA2OUMzQzI2QUE5QzUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNENDkxMzY4QjlFRTExRTRBOTA2OUMzQzI2QUE5QzUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+L8/kHwAACDVJREFUeNrsm3ls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", Ry = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Iy
}, Symbol.toStringTag, { value: "Module" })), Cy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDE3REQ2M0VEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDE3REQ2NEVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwMTdERDYxRURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIwMTdERDYyRURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9iCsJAAAAtZJREFUeNrsmltLVFEUx+eUIkjQg5fSnvIz6EMQgYJZGYh9gyJERAYrKQmRLDQ0DBERUXrpoW9QUgmJUmh5Q7SLl1TSF4MuRpo+OP43rRfD6azh7H32xdnwe3EWzvxmn9l77bWXF4vFIgdpeEnhpLBb45CE/3EeTADxza2BepDq6gyXgGf7fHEvQDnYcE34HciP81o/KDNNOqjwH5D2n9dfgYsmSQcVXgB5PjGD4AL47cKi1cGIOQP6wBEXZtgD3aCCEfuaZnrd9n1YSHeBSkbsG5L+aXvi4dHjXc2IHQbndEnLzLSEdDuIMrezs+CH7amlkG4D1xixY6AYfHchl34Aahlx4yT9LTRjIayIlhhvTIBMhZ9jD6rfoJkpPQmyXBAW3GNKT4UhHQnpUbrDlJ4Bx1wQFtQzpd+D4y4IC24zpT+AHBeEBbeY0p/ACdnvr6umVUt7td+YA0VgxYUi3nXKyjhn7kLwxYWqZZTyb88nbpGkl10o01bTSctPeomkl1yoS1eBToa0mOHTgX7TGlbpeFSAHcbq/cTGVTreuAp6fGZalIiO6rx5kDnSGDE7ph4PEyXKfKQfu/BI14CHjEVL7MmnwFebV2lu1jVPWVegBES38E3QwoibJdlVk0s8ftQxDxEfQa7Np6VEz8Y5th8PG3RWP8KWvcuUnQbZthcAmkyoYIYle9+UGnUYsq1M2XGQofrzqN6H26iyYcw9kyphj1LFGkbsKMmGcpOoQjiRu+KRyN/Wp9DuilVcl3ZSBcPIbgDZF+Lc1gdt/R4yWx56qGLhN4ZAKfil47QiQ1hUTXrBFUas9p4tGW1Lj8BlRuwAzazerryAG/kNZlLxEqSbUEoKOsOfwUmfGKM6a1U3lz4n2U1TyqJBhd+Cgjiv9ZHslkl14KDCorlMNIgf/ufvT8ElsB0xbUhYCIrBMNgGK6ARpBhU7zb6qsXKw0NSOCmscewKMAACZCX86tctkgAAAABJRU5ErkJggg==", zy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cy
}, Symbol.toStringTag, { value: "Module" })), no = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RTQ2MTQzOEU3NDYxMUU0QTU3Mjk4OUYzQUY1MjE2OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RTQ2MTQzOUU3NDYxMUU0QTU3Mjk4OUYzQUY1MjE2OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlFNDYxNDM2RTc0NjExRTRBNTcyOTg5RjNBRjUyMTY4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlFNDYxNDM3RTc0NjExRTRBNTcyOTg5RjNBRjUyMTY4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8SI5tAAAPjRJREFUeNrsnQdY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", Ly = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: no
}, Symbol.toStringTag, { value: "Module" })), Dy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRDQ5MTM2NUI5RUUxMUU0QTkwNjlDM0MyNkFBOUM1MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRDQ5MTM2NkI5RUUxMUU0QTkwNjlDM0MyNkFBOUM1MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUyNzJGRjc4QjlFQzExRTRBOTA2OUMzQzI2QUE5QzUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNENDkxMzY0QjlFRTExRTRBOTA2OUMzQzI2QUE5QzUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+N7C/KwAAB/5JREFUeNrsm3ls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", Ny = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dy
}, Symbol.toStringTag, { value: "Module" })), Py = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOTNCRjdGNEVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozOTNCRjdGNUVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5M0JGN0YyRURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM5M0JGN0YzRURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rYMfuQAAAVdJREFUeNrsm79KQzEUh3PFwX9DcRAXK4Lg6t5HEMSpIOLmEzj1MTrpoLPiIkpfwbXg6h8Qq5siutRKh+svVBdpE5VwKaffgW/JGZKPnIRwLjfL89yNUoy5EQuEEU4bJVEXt6IjHsW+mClqAVnBl9aFqPQZPxcb1oSXxU0gvyhalkp6PpIvc2khjDDCCCOMMMIII4wwwggjjDDCCP8nxgO5JTGbcK6VX+TfE873Iu5+DvZr4k2JY7FuYEPPxKbrtYQHlnTNiKwP3/rdjZ3hqrFjW42VtD9HE4aE22I6tMMdYzvcjZX0iTHh01hJ++0/MnJxNcS2eAsJf8eCmEs4+ao4DOR3xGXC+Z7F/V8eHg9fpIrJSP5KNHlaIowwwggjjDDCCCOMMMIII4wwwggPs/BTJN+yJnztBvesGhaFfXt0Tey53le9D/EqDsRWUYvI+FELYVvxKcAAQGtDbaxJ+qoAAAAASUVORK5CYII=", Oy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Py
}, Symbol.toStringTag, { value: "Module" })), Yy = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzdHJlZXQtdmlldyIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLXN0cmVldC12aWV3IGZhLXctMTYiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTM2Ny45IDMyOS43NmMtNC42MiA1LjMtOS43OCAxMC4xLTE1LjkgMTMuNjV2MjIuOTRjNjYuNTIgOS4zNCAxMTIgMjguMDUgMTEyIDQ5LjY1IDAgMzAuOTMtOTMuMTIgNTYtMjA4IDU2UzQ4IDQ0Ni45MyA0OCA0MTZjMC0yMS42IDQ1LjQ4LTQwLjMgMTEyLTQ5LjY1di0yMi45NGMtNi4xMi0zLjU1LTExLjI4LTguMzUtMTUuOS0xMy42NUM1OC44NyAzNDUuMzQgMCAzNzguMDUgMCA0MTZjMCA1My4wMiAxMTQuNjIgOTYgMjU2IDk2czI1Ni00Mi45OCAyNTYtOTZjMC0zNy45NS01OC44Ny03MC42Ni0xNDQuMS04Ni4yNHpNMjU2IDEyOGMzNS4zNSAwIDY0LTI4LjY1IDY0LTY0UzI5MS4zNSAwIDI1NiAwcy02NCAyOC42NS02NCA2NCAyOC42NSA2NCA2NCA2NHptLTY0IDE5MnY5NmMwIDE3LjY3IDE0LjMzIDMyIDMyIDMyaDY0YzE3LjY3IDAgMzItMTQuMzMgMzItMzJ2LTk2YzE3LjY3IDAgMzItMTQuMzMgMzItMzJ2LTk2YzAtMjYuNTEtMjEuNDktNDgtNDgtNDhoLTExLjhjLTExLjA3IDUuMDMtMjMuMjYgOC0zNi4yIDhzLTI1LjEzLTIuOTctMzYuMi04SDIwOGMtMjYuNTEgMC00OCAyMS40OS00OCA0OHY5NmMwIDE3LjY3IDE0LjMzIDMyIDMyIDMyeiI+PC9wYXRoPjwvc3ZnPg==", By = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yy
}, Symbol.toStringTag, { value: "Module" })), Uy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDE3REQ1RkVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDE3REQ2MEVEQTkxMUU0OTQzNEQxQTUyOEE3RjAxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QUY3NTkyRURBODExRTQ5NDM0RDFBNTI4QTdGMDE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIwMTdERDVFRURBOTExRTQ5NDM0RDFBNTI4QTdGMDE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+U/jw4AAAAndJREFUeNrsmctLFVEcx++9Qg8zw/KBjywssUSkP6Fdmxb6X0QQeIlIECxRKAwshIJCEhR0F7jQyjTtpaBFBbo2N4U7W7qo8XvgN3CRYeZ7x3Nn5urvwGdzOb/H554580w7jpM6TCOTOmRDhVVYhVVYhVVYhVVYhVVYhVU4kcLVYAxsg79gAtRF2UA6wufhBrAILuz5fRNcBb8O0grXg/cesmacAwug8aAI14J50Owz57xIny124RpZ2RZibpPMbShW4WoRuJRHzEWJqS824So5jFtDxDZLbG2xCBvZOdC2jxwtIl2TdOEzYBa0B8xzBL9xWQ7vqqQKV4B34AohmwU3COlW69LmxsMCp8BXhxvZnLib4D8R8xNU2ujVluwKKXvbI/4WKf0dnI5b2Mguk7J3ffJ0kTm+gYq4hMvBF7LRHiJflsy1Kn90pMJl4BPZYG8eee+QOVfCSoeRLQUfycbuh8jfTeZeCiMdRnaRbKh/H9ulh6zxGZwslLCRnScbeWDh7H+PrGW21gnbwsfBLNnAoKVru6GPrPlBFsSK8DHwhiw8ZFHWZYCsvcBIBxU7AmbIgo8LIOvykOxhLkg6SHaaLDQM0gUUNjwie3krWzAvYSM7RRZ4GoGsyxDZ02twlBUuAa/IxM8jlHV5QvY2IwsXKMxeA0dikE1JzeGw9wJeCTeIRC9jks2Vfkb0ucUI7wQkGZXDPhUzRvoFIZ0JEvZ7kB9PiGyu9IhPv2vMCl8D/zyCJxMm65KRLbZ3mJcKnexl6Tr4IYF/5ESWRNnclTYvGH5Lz+ugw2tulB/T9PuwCquwCquwCquwCquwCquwCqtwYseuAAMAvEKgT89Egv8AAAAASUVORK5CYII=", Fy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Uy
}, Symbol.toStringTag, { value: "Module" })), jy = /(^|[/\\])([^/\\]+?)(?=(\.[^.]+)?$)/;
function Nn(e) {
  var t;
  return (t = e.match(jy)) == null ? void 0 : t[2];
}
function Pr() {
  const e = et(() => Object.fromEntries(
    Object.entries(/* @__PURE__ */ Object.assign({ "../assets/eye-regular.svg": My, "../assets/icons/down.png": Ay, "../assets/icons/left.png": Ty, "../assets/icons/minus.png": Sy, "../assets/icons/play.png": Ry, "../assets/icons/right.png": zy, "../assets/link.png": Ly, "../assets/pause.png": Ny, "../assets/plus.png": Oy, "../assets/street-view-solid.svg": By, "../assets/up.png": Fy })).map(([i, n]) => [Nn(i), n.default])
  ));
  return { getImageSrc: (r) => e.value[Nn(r)] };
}
const Or = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [i, n] of t)
    r[i] = n;
  return r;
}, ky = ["src"], Gy = ["src"], Hy = ["data-id", "onClick"], Vy = { class: "text pe-5" }, Wy = ["src"], Zy = {
  __name: "SceneList",
  emits: ["select-scene"],
  setup(e, { emit: t }) {
    Oo((c) => ({
      "5f141938": l.value
    }));
    const { getImageSrc: r } = Pr(), i = t, n = ze("currentScene"), s = ze("data"), a = je(!1), o = (c) => {
      i("select-scene", c);
    };
    function h() {
      a.value = !a.value;
    }
    const l = et(() => {
      const c = document.querySelector(".sceneList");
      var f = window.getComputedStyle(document.querySelector(".sceneListToggle"));
      return `calc(-${c.offsetWidth}px - ${f.getPropertyValue("left")})`;
    });
    return (c, f) => (ee(), oe("div", {
      class: "sceneListToggle cursor-pointer p-2",
      onClick: h
    }, [
      a.value ? (ee(), oe("img", {
        key: 0,
        src: we(r)("street-view-solid.svg")
      }, null, 8, ky)) : (ee(), oe("img", {
        key: 1,
        src: we(r)("street-view-solid.svg")
      }, null, 8, Gy)),
      tt("ul", {
        class: sn(["sceneList p-0 m-0", { open: a.value }])
      }, [
        (ee(!0), oe(li, null, ci(we(s).scenes, (u) => {
          var p, m;
          return ee(), oe("li", {
            key: u.id,
            class: sn(["scene p-3 cursor-pointer d-flex align-content-center", { current: ((p = we(n)) == null ? void 0 : p.data.id) === u.id }]),
            "data-id": u.id,
            onClick: (g) => o(u)
          }, [
            tt("div", Vy, Bn(u.name), 1),
            ((m = we(n)) == null ? void 0 : m.data.id) === u.id ? (ee(), oe("img", {
              key: 0,
              class: "align-self-center",
              style: { height: "20px" },
              src: we(r)("eye-regular.svg")
            }, null, 8, Wy)) : Yo("", !0)
          ], 10, Hy);
        }), 128))
      ], 2)
    ]));
  }
}, Xy = /* @__PURE__ */ Or(Zy, [["__scopeId", "data-v-7c249fc2"]]);
const Qy = { class: "titleBar d-flex justify-content-center align-items-center" }, Jy = { class: "sceneName m-0 font-gamechanger" }, qy = {
  __name: "TitleBar",
  props: {
    currentScene: Object
  },
  setup(e) {
    function t(r) {
      return r == null ? void 0 : r.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
    return (r, i) => {
      var n;
      return ee(), oe("div", Qy, [
        tt("h1", Jy, Bn(t((n = e.currentScene) == null ? void 0 : n.data.name)), 1)
      ]);
    };
  }
};
const Ky = ["src"], $y = ["src"], e_ = {
  __name: "AutoRotateButton",
  props: {
    currentScene: Object
  },
  setup(e) {
    const t = e, { getImageSrc: r } = Pr(), i = ze("viewer"), n = ze("enableAutoRotate"), s = ze("autorotateSettings");
    _i(() => {
      a(n);
    });
    function a(c) {
      n.value = c, n.value ? h() : l();
    }
    function o() {
      n.value = !n.value, n.value ? h() : l();
    }
    vi(() => n.value, (c, f) => {
      a(n.value);
    }), vi(() => t.currentScene, (c, f) => {
      l(), h();
    });
    function h() {
      var c, f;
      n.value && ((c = i.value) == null || c.startMovement(s), (f = i.value) == null || f.setIdleMovement(3e3, s));
    }
    function l() {
      var c, f;
      (c = i.value) == null || c.stopMovement(), (f = i.value) == null || f.setIdleMovement(1 / 0);
    }
    return (c, f) => (ee(), oe("a", {
      class: "autorotateToggle cursor-pointer",
      onClick: o
    }, [
      we(n) ? (ee(), oe("img", {
        key: 1,
        src: we(r)("pause.png")
      }, null, 8, $y)) : (ee(), oe("img", {
        key: 0,
        src: we(r)("play.png")
      }, null, 8, Ky))
    ]));
  }
}, t_ = /* @__PURE__ */ xr({
  __name: "NavigationHotspot",
  props: ["hotspot"],
  setup(e) {
    const t = ze("scenes"), r = ze("marzipanoViewFunctions");
    function i() {
      r.switchScene(n(e.hotspot.target));
    }
    function n() {
      for (let s = 0; s < t.value.length; s++)
        if (t.value[s].data.id === e.hotspot.target)
          return t.value[s];
      return null;
    }
    return (s, a) => (ee(), oe("div", {
      class: "hotspot",
      onClick: i
    }, a[0] || (a[0] = [
      tt("img", {
        class: "w-100 h-100 cursor-pointer",
        src: no
      }, null, -1)
    ])));
  }
});
const r_ = /* @__PURE__ */ Or(t_, [["__scopeId", "data-v-aadf7f35"]]), i_ = /* @__PURE__ */ xr({
  __name: "Hotspot",
  props: ["hotspot"],
  setup(e) {
    function t(r) {
      return r.type ? Uo(r.type) : r_;
    }
    return (r, i) => (ee(), Un(Bo(t(e.hotspot)), {
      id: e.hotspot.id,
      hotspot: e.hotspot
    }, null, 8, ["id", "hotspot"]));
  }
}), n_ = ["src"], s_ = /* @__PURE__ */ xr({
  __name: "NavigateButton",
  props: {
    imageName: {
      type: String
    },
    xFactor: {
      default: 0,
      type: Number
    },
    yFactor: {
      default: 0,
      type: Number
    },
    zoomFactor: {
      default: 1,
      type: Number
    }
  },
  setup(e) {
    const t = e, r = ze("enableAutoRotate"), i = ze("currentScene");
    function n() {
      const o = i.value.view.pitch() * 180 / Math.PI, h = i.value.view.yaw() * 180 / Math.PI, l = i.value.view.fov(), c = o + t.yFactor, f = h + t.xFactor;
      i.value.view.setPitch(c * Math.PI / 180), i.value.view.setYaw(f * Math.PI / 180), i.value.view.setFov(l * t.zoomFactor), r.value = !1;
    }
    const { getImageSrc: s } = Pr(), a = et(() => s(t.imageName));
    return (o, h) => (ee(), oe("div", {
      class: "navigationButton cursor-pointer",
      onClick: h[0] || (h[0] = (l) => n())
    }, [
      tt("img", {
        src: a.value,
        class: "button-image"
      }, null, 8, n_)
    ]));
  }
});
const a_ = /* @__PURE__ */ Or(s_, [["__scopeId", "data-v-d2ccd512"]]);
function so(e) {
  return Fo() ? (jo(e), !0) : !1;
}
function ao(e) {
  return typeof e == "function" ? e() : we(e);
}
const oo = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const o_ = Object.prototype.toString, h_ = (e) => o_.call(e) === "[object Object]", l_ = () => {
};
function yi(e) {
  var t;
  const r = ao(e);
  return (t = r == null ? void 0 : r.$el) != null ? t : r;
}
const c_ = oo ? window : void 0, v_ = oo ? window.document : void 0;
function Pn(...e) {
  let t, r, i, n;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([r, i, n] = e, t = c_) : [t, r, i, n] = e, !t)
    return l_;
  Array.isArray(r) || (r = [r]), Array.isArray(i) || (i = [i]);
  const s = [], a = () => {
    s.forEach((c) => c()), s.length = 0;
  }, o = (c, f, u, p) => (c.addEventListener(f, u, p), () => c.removeEventListener(f, u, p)), h = vi(
    () => [yi(t), ao(n)],
    ([c, f]) => {
      if (a(), !c)
        return;
      const u = h_(f) ? { ...f } : f;
      s.push(
        ...r.flatMap((p) => i.map((m) => o(c, p, m, u)))
      );
    },
    { immediate: !0, flush: "post" }
  ), l = () => {
    h(), a();
  };
  return so(l), l;
}
function f_() {
  const e = je(!1);
  return ko() && _i(() => {
    e.value = !0;
  }), e;
}
function u_(e) {
  const t = f_();
  return et(() => (t.value, !!e()));
}
const On = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "webkitendfullscreen",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
function d_(e, t = {}) {
  const {
    document: r = v_,
    autoExit: i = !1
  } = t, n = et(() => {
    var M;
    return (M = yi(e)) != null ? M : r == null ? void 0 : r.querySelector("html");
  }), s = je(!1), a = et(() => [
    "requestFullscreen",
    "webkitRequestFullscreen",
    "webkitEnterFullscreen",
    "webkitEnterFullScreen",
    "webkitRequestFullScreen",
    "mozRequestFullScreen",
    "msRequestFullscreen"
  ].find((M) => r && M in r || n.value && M in n.value)), o = et(() => [
    "exitFullscreen",
    "webkitExitFullscreen",
    "webkitExitFullScreen",
    "webkitCancelFullScreen",
    "mozCancelFullScreen",
    "msExitFullscreen"
  ].find((M) => r && M in r || n.value && M in n.value)), h = et(() => [
    "fullScreen",
    "webkitIsFullScreen",
    "webkitDisplayingFullscreen",
    "mozFullScreen",
    "msFullscreenElement"
  ].find((M) => r && M in r || n.value && M in n.value)), l = [
    "fullscreenElement",
    "webkitFullscreenElement",
    "mozFullScreenElement",
    "msFullscreenElement"
  ].find((M) => r && M in r), c = u_(() => n.value && r && a.value !== void 0 && o.value !== void 0 && h.value !== void 0), f = () => l ? (r == null ? void 0 : r[l]) === n.value : !1, u = () => {
    if (h.value) {
      if (r && r[h.value] != null)
        return r[h.value];
      {
        const M = n.value;
        if ((M == null ? void 0 : M[h.value]) != null)
          return !!M[h.value];
      }
    }
    return !1;
  };
  async function p() {
    if (!(!c.value || !s.value)) {
      if (o.value)
        if ((r == null ? void 0 : r[o.value]) != null)
          await r[o.value]();
        else {
          const M = n.value;
          (M == null ? void 0 : M[o.value]) != null && await M[o.value]();
        }
      s.value = !1;
    }
  }
  async function m() {
    if (!c.value || s.value)
      return;
    u() && await p();
    const M = n.value;
    a.value && (M == null ? void 0 : M[a.value]) != null && (await M[a.value](), s.value = !0);
  }
  async function g() {
    await (s.value ? p() : m());
  }
  const y = () => {
    const M = u();
    (!M || M && f()) && (s.value = M);
  };
  return Pn(r, On, y, !1), Pn(() => yi(n), On, y, !1), i && so(p), {
    isSupported: c,
    isFullscreen: s,
    enter: m,
    exit: p,
    toggle: g
  };
}
const p_ = ["src"], m_ = /* @__PURE__ */ xr({
  __name: "FullscreenButton",
  setup(e) {
    const t = ze("panoElement"), { toggle: r } = d_(t), { getImageSrc: i } = Pr();
    return (n, s) => (ee(), oe("div", {
      class: "navigationButton cursor-pointer",
      onClick: s[0] || (s[0] = (a) => we(r)())
    }, [
      tt("img", {
        src: we(i)("fullscreen.png")
      }, null, 8, p_)
    ]));
  }
});
const y_ = /* @__PURE__ */ Or(m_, [["__scopeId", "data-v-309b3d5b"]]);
function __() {
  return "xxxx-xxxx-4xxx-yxxx-xxxx".replace(/[xy]/g, function(e) {
    var t = Math.random() * 16 | 0, r = e === "x" ? t : t & 3 | 8;
    return r.toString(16);
  });
}
const Yn = (e) => e.map((t) => ({
  ...t,
  id: (t == null ? void 0 : t.id) || __()
}));
const g_ = { class: "control-buttons w-100 d-flex justify-content-center align-content-center" }, w_ = {
  class: "button-layout d-flex justify-content-center align-content-center",
  style: { gap: "1rem" }
}, M_ = {
  __name: "MarzipanoViewer",
  props: { data: Object },
  setup(e, { expose: t }) {
    var p, m, g, y, M, T, b, S, R, x, O, B;
    const r = je(), i = je(e.data.settings.autorotateEnabled), n = bt.autorotate({ yawSpeed: 0.03, targetPitch: 0, targetFov: Math.PI / 2 }), s = je(), a = je([]), o = je(), h = je([]);
    Ue("data", e.data), Ue("scenes", a), Ue("viewer", s), Ue("data", e.data), Ue("currentScene", o), Ue("panoElement", r), Ue("enableAutoRotate", i), Ue("autorotateSettings", n), Ue("marzipanoViewFunctions", { switchScene: l }), t({ enableAutoRotate: i, switchScene: l, findSceneById: c, findSceneDataById: f }), _i(() => {
      const z = { controls: { mouseViewMode: e.data.settings.mouseViewMode, scrollZoom: !0 } }, P = new bt.Viewer(r.value, z);
      a.value = e.data.scenes.map((I) => {
        const U = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString(), k = bt.ImageUrlSource.fromString(`${U}/${I.id}/{z}/{f}/{y}/{x}.jpg`, { cubeMapPreviewUrl: `${U}/${I.id}/preview.jpg` }), L = new bt.CubeGeometry(I.levels), w = bt.RectilinearView.limit.traditional(Math.min(I.faceSize * 8, 4096), 100 * Math.PI / 180, 120 * Math.PI / 180), me = new bt.RectilinearView(I.initialViewParameters, w), Z = P.createScene({ source: k, geometry: L, view: me, pinFirstLevel: !0 });
        return I.linkHotspots = Yn(I.linkHotspots), I.infoHotspots = Yn(I.infoHotspots), h.value.push(...I.linkHotspots, ...I.infoHotspots), Go(() => {
          [...I.linkHotspots, ...I.infoHotspots].forEach((Ee) => {
            Z.hotspotContainer().createHotspot(document.getElementById(Ee.id), { yaw: Ee.yaw, pitch: Ee.pitch });
          });
        }), { data: I, scene: Z, view: me };
      }), s.value = P, l(a.value[0]);
    });
    function l(z) {
      z && (z.view.setParameters(z.data.initialViewParameters), z.scene.switchTo(), o.value = z);
    }
    function c(z) {
      return a.value.find((P) => P.data.id === z) || null;
    }
    function f(z) {
      return e.data.scenes.find((P) => P.id === z) || null;
    }
    const u = [
      { zoomFactor: ((m = (p = e.data.settings) == null ? void 0 : p.controlOptions) == null ? void 0 : m.zoomInJump) || 0.8, imageName: "plus.png" },
      { zoomFactor: ((y = (g = e.data.settings) == null ? void 0 : g.controlOptions) == null ? void 0 : y.zoomOutJump) || 1.2, imageName: "minus.png" },
      { xFactor: -((T = (M = e.data.settings) == null ? void 0 : M.controlOptions) == null ? void 0 : T.xJump) || -10, imageName: "left.png" },
      { xFactor: ((S = (b = e.data.settings) == null ? void 0 : b.controlOptions) == null ? void 0 : S.xJump) || 10, imageName: "right.png" },
      { yFactor: ((x = (R = e.data.settings) == null ? void 0 : R.controlOptions) == null ? void 0 : x.yJump) || 10, imageName: "up.png" },
      { yFactor: -((B = (O = e.data.settings) == null ? void 0 : O.controlOptions) == null ? void 0 : B.yJump) || -10, imageName: "down.png" }
    ];
    return (z, P) => (ee(), oe("div", {
      ref_key: "panoElement",
      ref: r,
      class: "pano"
    }, [
      kt(qy, { "current-scene": o.value }, null, 8, ["current-scene"]),
      (ee(!0), oe(li, null, ci(h.value, (I) => (ee(), Un(i_, {
        key: I.id,
        id: I.id,
        hotspot: I,
        onClick: (U) => l(c(I.target))
      }, null, 8, ["id", "hotspot", "onClick"]))), 128)),
      an(z.$slots, "content-buttons", {}, () => [
        tt("div", g_, [
          tt("div", w_, [
            (ee(), oe(li, null, ci(u, (I) => kt(a_, Ho({
              key: I.imageName,
              class: "p-2",
              ref_for: !0
            }, I), null, 16)), 64)),
            kt(e_, {
              class: "p-2",
              "current-scene": o.value
            }, null, 8, ["current-scene"]),
            kt(y_, { class: "p-2" })
          ])
        ])
      ]),
      an(z.$slots, "scenes", {}, () => [
        kt(Xy, {
          "current-scene": o.value,
          onSelectScene: P[0] || (P[0] = (I) => l(c(I.id)))
        }, null, 8, ["current-scene"])
      ])
    ], 512));
  }
};
export {
  M_ as MarzipanoViewer,
  A_ as default
};
