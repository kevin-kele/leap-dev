// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoords = getCoords;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getCoords(leapPoint, frame, canvas) {
  var _frame$interactionBox = frame.interactionBox.normalizePoint(leapPoint),
      _frame$interactionBox2 = _slicedToArray(_frame$interactionBox, 2),
      x = _frame$interactionBox2[0],
      y = _frame$interactionBox2[1];

  return {
    x: canvas.width * x,
    y: canvas.height * (1 - y)
  };
}
},{}],"canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = exports.canvas = void 0;
// Canvas
var canvas = document.createElement('canvas');
exports.canvas = canvas;
var ctx = canvas.getContext('2d');
exports.ctx = ctx;
canvas.style.position = 'absolute';
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.bottom = 0;
canvas.style.right = 0;
canvas.style.zIndex = 100;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = 0;
document.body.appendChild(canvas);
},{}],"script.js":[function(require,module,exports) {
document.addEventListener('keydown', function (_event) {
  var li = document.querySelector('[data-key=' + _event.key + ']');

  if (li === null) {
    return;
  }

  li.classList.remove('tile-active');
  setTimeout(function () {
    return li.classList.add('tile-active');
  }, 0);
});
/* document.addEventListener('transitionend', _event => {
    console.log(_event)
    const li = _event.target;
    li.classList.remove('tile-active');
}); */

/*
    // A utiliser éventuellement plus tard pour dessiner le leap sur un canvas
    const loop = () => {
        requestAnimationFrame(loop);

    }
    loop();
*/
},{}],"leap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leap = void 0;

var _app = require("./app.js");

var _canvas = require("./canvas.js");

require("./script.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Pizzicato.context.resume();

var NOTES = _defineProperty({
  do: new Pizzicato.Sound('./audio/do.wav'),
  re: new Pizzicato.Sound('./audio/re.wav'),
  mi: new Pizzicato.Sound('./audio/mi.wav'),
  fa: new Pizzicato.Sound('./audio/fa.wav'),
  sol: new Pizzicato.Sound('./audio/sol.wav'),
  la: new Pizzicato.Sound('./audio/la.wav'),
  si: new Pizzicato.Sound('./audio/si.wav')
}, "do", new Pizzicato.Sound('./audio/do.wav')); // Leap hover


var LeapHover =
/*#__PURE__*/
function () {
  function LeapHover() {
    var _this = this;

    _classCallCheck(this, LeapHover);

    this.currentElement = null;
    this.leapHoverElements = [];
    document.querySelectorAll('[leap-hover]').forEach(function (element) {
      _this.leapHoverElements.push(element);
    });
  }

  _createClass(LeapHover, [{
    key: "verify",
    value: function verify(x, y, callback) {
      var _this2 = this;

      this.leapHoverElements.forEach(function (element) {
        var rect = element.getBoundingClientRect();
        element.classList.remove('leap-hover');
        var sc = window.scrollY;

        if (x > rect.left && x < rect.right && y > rect.top + sc && y < rect.bottom + sc) {
          if (_this2.currentElement !== element) {
            element.classList.add('leap-hover'); // document.elementFromPoint(x, y).click();

            _this2.currentElement = element;
            callback(element);
          }
        }
      });
    }
  }]);

  return LeapHover;
}();

var leapHover = new LeapHover();
var controller = new Leap.Controller();
controller.connect();
controller.on('frame', function (frame) {
  _canvas.ctx.clearRect(0, 0, _canvas.canvas.width, _canvas.canvas.height);

  frame.hands.forEach(function (hand) {
    // if (hand.pinchStrength >= 0.95) {
    //     ctx.fillStyle = '#f00';
    // } else {
    //     ctx.fillStyle = '#000';
    // }
    // Debug leapHoverElements

    /* leapHover.leapHoverElements.forEach(element => {
        let rect = element.getBoundingClientRect();
         ctx.strokeStyle = 'red';
        let sc = window.scrollY;
        ctx.strokeRect(rect.x, rect.y + sc, rect.width, rect.height);
    }); */
    // Dessin de la paume
    var palmPos = (0, _app.getCoords)(hand.palmPosition, frame, _canvas.canvas);

    _canvas.ctx.fillRect(palmPos.x, palmPos.y, 25, 25); // Leap Hover plugin


    leapHover.verify(palmPos.x, palmPos.y, function (el) {
      el.classList.remove('tile-active');
      setTimeout(function () {
        return el.classList.add('tile-active');
      }, 0);
      var soundId = el.dataset.note;
      if (!soundId || !NOTES[soundId]) return; // if (NOTES[soundId].playing == false) {

      NOTES[soundId].stop();
      NOTES[soundId].play(); // }
    });
    /* //dessin de poignet
    ctx.fillStyle = 'black';
    let nextJoint = getCoords(hand.arm.nextJoint, frame, canvas);
    ctx.fillRect(nextJoint.x, nextJoint.y, 25, 25); */

    /* // Dessin des doigts
    const carps = [];
    const mcps = [];
    hand.fingers.forEach((finger) => {
        // Pour chaque doigt, dessin des différentes phalanges …
        const tip = getCoords(finger.tipPosition, frame, canvas);
        const dip = getCoords(finger.dipPosition, frame, canvas);
        const pip = getCoords(finger.pipPosition, frame, canvas);
        const mcp = getCoords(finger.mcpPosition, frame, canvas);
        const carp = getCoords(finger.carpPosition, frame, canvas);
         ctx.fillStyle = 'red';
        const pos = [tip, dip, pip, mcp, carp, ]
        for (let i = 0; i < pos.length - 1; i++) {
            ctx.fillRect(pos[i].x, pos[i].y, 10, 10);
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[i + 1].x, pos[i + 1].y);
            ctx.closePath();
             ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[i + 1].x, pos[i + 1].y);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.fillRect(carp.x, carp.y, 10, 10);
         carps.push(carp);
        mcps.push(mcp);
    }) */
  });
});
var leap;
exports.leap = leap;
},{"./app.js":"app.js","./canvas.js":"canvas.js","./script.js":"script.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49241" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","leap.js"], null)
//# sourceMappingURL=/leap.5b9bcb24.js.map