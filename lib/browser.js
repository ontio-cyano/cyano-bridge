var CyanoMobile =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/CyanoBridge.ts":
/*!****************************!*\
  !*** ./src/CyanoBridge.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);

class CyanoBridge {
    constructor(timeout) {
        this.timeout = 3000;
        this.version = 'v1.0.0';
        this.handlers = {};
        if (timeout) {
            this.timeout = timeout;
        }
    }
    call(req) {
        const id = uuid__WEBPACK_IMPORTED_MODULE_0__();
        req.id = id;
        return new Promise((resolve, reject) => {
            const msg = btoa(encodeURIComponent(JSON.stringify(req)));
            const uri = 'ontprovider://ont.io?params=' + msg;
            this.sendMessage(uri);
            this.handleMessageEvent(id, resolve, reject, req.action, req.needTimeout);
        });
    }
    invokeRead() {
        throw new Error('invokeRead not supported yet.');
    }
    parseMessage(msg) {
        return JSON.parse(decodeURIComponent(atob(msg)));
    }
    onMessage(handler) {
        if (this.listener) {
            this.offMessage();
        }
        const listener = e => {
            const res = this.parseMessage(e.data);
            handler(res);
        };
        window.document.addEventListener('message', listener);
        this.listener = listener;
    }
    offMessage() {
        window.document.removeEventListener('message', this.listener);
    }
    sendMessage(msg) {
        window.postMessage(msg, '*');
    }
    handleMessageEvent(id, resolve, reject, action, needTimeout = false) {
        const that = this;
        // tslint:disable-next-line:only-arrow-functions
        const handler = function (event) {
            const message = event.data;
            if (!message) {
                reject(event);
            }
            const res = that.parseMessage(message);
            if (!res.id) {
                reject('No message id');
            }
            if (!that.handlers[res.id]) {
                reject('No message handler');
            }
            if (res.id !== handler.id) {
                return;
            }
            document.removeEventListener('message', that.handlers[res.id]);
            delete that.handlers[res.id];
            if (res.action === action) {
                resolve(res);
            } else {
                reject(res);
            }
        };
        handler.id = id;
        this.handlers[id] = handler;
        document.addEventListener('message', this.handlers[id]);
        if (needTimeout) {
            setTimeout(() => {
                reject('Time out');
            }, this.timeout);
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (CyanoBridge);

/***/ }),

/***/ "./src/client/asset.ts":
/*!*****************************!*\
  !*** ./src/client/asset.ts ***!
  \*****************************/
/*! exports provided: assetApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assetApi", function() { return assetApi; });
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");

const assetApi = {
    getAccount(params) {
        const req = {
            action: 'getAccount',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params,
            needTimeout: true
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    }
};

/***/ }),

/***/ "./src/client/identity.ts":
/*!********************************!*\
  !*** ./src/client/identity.ts ***!
  \********************************/
/*! exports provided: identityApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identityApi", function() { return identityApi; });
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");

const identityApi = {
    getIdentity(params) {
        const req = {
            action: 'getIdentity',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params,
            needTimeout: true
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    }
};

/***/ }),

/***/ "./src/client/index.ts":
/*!*****************************!*\
  !*** ./src/client/index.ts ***!
  \*****************************/
/*! exports provided: registerClient, api */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return api; });
/* harmony import */ var _asset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset */ "./src/client/asset.ts");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identity */ "./src/client/identity.ts");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message */ "./src/client/message.ts");
/* harmony import */ var _smartcontract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./smartcontract */ "./src/client/smartcontract.ts");
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerClient", function() { return _proxy__WEBPACK_IMPORTED_MODULE_4__["registerClient"]; });






const api = {
    asset: _asset__WEBPACK_IMPORTED_MODULE_0__["assetApi"],
    identity: _identity__WEBPACK_IMPORTED_MODULE_1__["identityApi"],
    message: _message__WEBPACK_IMPORTED_MODULE_2__["messageApi"],
    smartContract: _smartcontract__WEBPACK_IMPORTED_MODULE_3__["scApi"]
};


/***/ }),

/***/ "./src/client/message.ts":
/*!*******************************!*\
  !*** ./src/client/message.ts ***!
  \*******************************/
/*! exports provided: messageApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageApi", function() { return messageApi; });
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");

const messageApi = {
    signMessage(params) {
        const req = {
            action: 'login',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params,
            needTimeout: false
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    },
    login(params) {
        if (!params.message || typeof params.message !== 'string') {
            throw new Error('Parameter for login must contain a message.');
        }
        if (!params.type) {
            params.type = 'account';
        }
        const req = {
            action: 'login',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params,
            needTimeout: false
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    }
};

/***/ }),

/***/ "./src/client/proxy.ts":
/*!*****************************!*\
  !*** ./src/client/proxy.ts ***!
  \*****************************/
/*! exports provided: registerClient, call, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerClient", function() { return registerClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return call; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony import */ var _CyanoBridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CyanoBridge */ "./src/CyanoBridge.ts");

let cb;
function registerClient(timeout = 3000) {
    cb = new _CyanoBridge__WEBPACK_IMPORTED_MODULE_0__["default"](timeout);
}
async function call(request) {
    return cb.call(request);
}
const version = '1.0.0';

/***/ }),

/***/ "./src/client/smartcontract.ts":
/*!*************************************!*\
  !*** ./src/client/smartcontract.ts ***!
  \*************************************/
/*! exports provided: scApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scApi", function() { return scApi; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");


// tslint:disable-next-line:one-variable-per-declaration
const scApi = {
    invoke(params) {
        if (!params.scriptHash || !params.operation || !params.args || params.args.length === 0) {
            throw new Error('Invalid params.');
        }
        if (!params.payer) {
            throw new Error('No payer.');
        }
        if (!params.config) {
            params.config = {
                login: true,
                message: '',
                url: ''
            };
        }
        const functionParams = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeInvokeFunction"])(params.operation, params.args);
        const req = {
            action: 'invoke',
            version: _proxy__WEBPACK_IMPORTED_MODULE_1__["version"],
            params: {
                login: params.config.login,
                url: params.config.url,
                message: params.config.message,
                invokeConfig: {
                    contractHash: params.scriptHash,
                    functions: [functionParams],
                    payer: params.payer,
                    gasPrice: params.gasLimit = 500,
                    gasLimit: params.gasPrice = 200000
                }
            }
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_1__["call"])(req);
    },
    invokeRead(params) {
        if (!params.scriptHash || !params.operation || !params.args || params.args.length === 0) {
            throw new Error('Invalid params.');
        }
        if (!params.config) {
            params.config = {
                login: true,
                message: '',
                url: ''
            };
        }
        const functionParams = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeInvokeFunction"])(params.operation, params.args);
        const req = {
            action: 'invokeRead',
            version: _proxy__WEBPACK_IMPORTED_MODULE_1__["version"],
            params: {
                login: params.config.login,
                url: params.config.url,
                message: params.config.message,
                invokeConfig: {
                    contractHash: params.scriptHash,
                    functions: [functionParams],
                    payer: params.payer,
                    gasPrice: params.gasLimit = 500,
                    gasLimit: params.gasPrice = 200000
                }
            }
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_1__["call"])(req);
    },
    invokePasswordFree(params) {
        if (!params.scriptHash || !params.operation || !params.args || params.args.length === 0) {
            throw new Error('Invalid params.');
        }
        if (!params.payer) {
            throw new Error('No payer.');
        }
        if (!params.config) {
            params.config = {
                login: true,
                message: '',
                url: ''
            };
        }
        const functionParams = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeInvokeFunction"])(params.operation, params.args);
        const req = {
            action: 'invokePasswordFree',
            version: _proxy__WEBPACK_IMPORTED_MODULE_1__["version"],
            params: {
                login: params.config.login,
                url: params.config.url,
                message: params.config.message,
                invokeConfig: {
                    contractHash: params.scriptHash,
                    functions: [functionParams],
                    payer: params.payer,
                    gasPrice: params.gasLimit = 500,
                    gasLimit: params.gasPrice = 200000
                }
            }
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_1__["call"])(req);
    }
};

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/client/index.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "client", function() { return _client__WEBPACK_IMPORTED_MODULE_0__; });
// import CyanoBridge from './CyanoBridge';

// export { CyanoBridge };


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: formatArgItem, makeInvokeFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatArgItem", function() { return formatArgItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeInvokeFunction", function() { return makeInvokeFunction; });
function formatArgItem(p) {
    if (p.type === 'Boolean' || p.type === 'Integer') {
        return {
            name: p.name,
            value: p.value
        };
    } else if (p.type === 'String' || p.type === 'ByteArray' || p.type === 'Long' || p.type === 'Address') {
        return {
            name: p.name,
            value: p.type + ':' + p.value
        };
    } else if (p.type === 'Array') {
        return {
            name: p.name,
            value: p.value.map(v => formatArgItem(v))
        };
    } else if (p.type === 'Map') {
        const val = {};
        for (const k of Object.keys(p.value)) {
            val[k] = formatArgItem(p.value[k]);
        }
        return {
            name: p.name,
            value: val
        };
    } else {
        throw new Error('Invalid parmeter type: ' + JSON.stringify(p));
    }
}
function makeInvokeFunction(operation, args) {
    const params = [];
    for (const p of args) {
        params.push(formatArgItem(p));
    }
    const obj = {
        operation,
        args: params
    };
    return obj;
}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.ts */"./src/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=browser.js.map