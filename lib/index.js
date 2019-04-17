module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CyanoBridge.ts":
/*!****************************!*\
  !*** ./src/CyanoBridge.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

class CyanoBridge {
    constructor(timeout) {
        this.timeout = 3000;
        this.version = 'v1.0.0';
        this.handlers = {};
        if (timeout) {
            this.timeout = timeout;
        }
        this.injected = false;
        this.pendingMsgs = [];
    }
    call(req) {
        const id = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomId"])();
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
        // provider will inject originalPostMessage method in js
        // detect this method to decide when to send msssage
        if (this.injected) {
            window.postMessage(msg, '*');
            return;
        }
        if (this.checkInterval) {
            this.pendingMsgs.push(msg);
            return;
        }
        this.checkInterval = window.setInterval(() => {
            if (window.originalPostMessage) {
                window.postMessage(msg, '*');
                this.injected = true;
                this.pendingMsgs.forEach(m => {
                    window.postMessage(m, '*');
                });
                window.clearInterval(this.checkInterval);
            }
        }, 100);
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
/* harmony import */ var _smartcontract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smartcontract */ "./src/client/smartcontract.ts");


const assetApi = {
    getAccount(params) {
        const req = {
            action: 'getAccount',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params,
            needTimeout: true
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    },
    transfer({ from, to, asset, amount, gasPrice, gasLimit }) {
        const ONT_CONTRACT = '0100000000000000000000000000000000000000';
        const ONG_CONTRACT = '0200000000000000000000000000000000000000';
        const params = {
            scriptHash: asset === 'ONT' ? ONT_CONTRACT : ONG_CONTRACT,
            operation: 'transfer',
            args: [{
                name: 'from',
                type: 'Address',
                value: from
            }, {
                name: 'to',
                type: 'Address',
                value: to
            }, {
                name: 'amount',
                type: 'Long',
                value: amount // Handler for number and string is the same
            }],
            gasPrice: gasPrice = 500,
            gasLimit: gasLimit = 20000,
            payer: from
        };
        return _smartcontract__WEBPACK_IMPORTED_MODULE_1__["scApi"].invoke(params);
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
/* harmony import */ var _smartcontract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smartcontract */ "./src/client/smartcontract.ts");


// const subactions = ['getRegistryOntidTx', 'faceRecognition', 'submit',
//     'requestAuthorization', 'getAuthorizationInfo', 'decryptClaim', 'deleteOntid', 'exportOntid];
const identityApi = {
    getIdentity(params) {
        const req = {
            action: 'getIdentity',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params,
            needTimeout: true
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    },
    authentication(params) {
        // if (!params || !params.subaction) {
        //     throw new Error('Invalid params. "subaction" missing.');
        // }
        // if (subactions.findIndex((item) => item === params.subaction) < 0) {
        //     throw new Error('Invalid params. Wrong "subaction" ' + params.subaction);
        // }
        const req = {
            action: 'authentication',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    },
    authorization(params) {
        const req = {
            action: 'authorization',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            params
        };
        // if (!params || !params.subaction) {
        //     throw new Error('Invalid params. "subaction" missing.');
        // }
        // if (subactions.findIndex((item) => item === params.subaction) < 0) {
        //     throw new Error('Invalid params. Wrong "subaction" ' + params.subaction);
        // }
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_0__["call"])(req);
    },
    registerOntId({ ontid, publicKey, payer, gasPrice, gasLimit }) {
        const ONTID_CONTRACT = '0300000000000000000000000000000000000000';
        const params = {
            scriptHash: ONTID_CONTRACT,
            operation: 'regIDWithPublicKey',
            args: [{
                name: 'ontid',
                type: 'String',
                value: ontid
            }, {
                name: 'pk',
                type: 'ByteArray',
                value: publicKey
            }],
            gasPrice: gasPrice = 500,
            gasLimit: gasLimit = 20000,
            payer
        };
        return _smartcontract__WEBPACK_IMPORTED_MODULE_1__["scApi"].invoke(params);
    },
    getDDO(ontid) {
        const ONTID_CONTRACT = '0300000000000000000000000000000000000000';
        const params = {
            scriptHash: ONTID_CONTRACT,
            operation: 'getDDO',
            args: [{
                name: 'ontid',
                type: 'String',
                value: ontid
            }],
            gasPrice: 500,
            gasLimit: 20000
        };
        return _smartcontract__WEBPACK_IMPORTED_MODULE_1__["scApi"].invokeRead(params);
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
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./provider */ "./src/client/provider.ts");
/* harmony import */ var _qrcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./qrcode */ "./src/client/qrcode.ts");
/* harmony import */ var _smartcontract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./smartcontract */ "./src/client/smartcontract.ts");
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerClient", function() { return _proxy__WEBPACK_IMPORTED_MODULE_6__["registerClient"]; });








const api = {
    asset: _asset__WEBPACK_IMPORTED_MODULE_0__["assetApi"],
    identity: _identity__WEBPACK_IMPORTED_MODULE_1__["identityApi"],
    message: _message__WEBPACK_IMPORTED_MODULE_2__["messageApi"],
    smartContract: _smartcontract__WEBPACK_IMPORTED_MODULE_5__["scApi"],
    qrcode: _qrcode__WEBPACK_IMPORTED_MODULE_4__["qrcodeApi"],
    provider: _provider__WEBPACK_IMPORTED_MODULE_3__["providerApi"]
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
            action: 'signMessage',
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

/***/ "./src/client/provider.ts":
/*!********************************!*\
  !*** ./src/client/provider.ts ***!
  \********************************/
/*! exports provided: providerApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "providerApi", function() { return providerApi; });
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");

const providerApi = {
    getProvider() {
        const req = {
            action: 'getProvider',
            version: _proxy__WEBPACK_IMPORTED_MODULE_0__["version"],
            needTimeout: true
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

/***/ "./src/client/qrcode.ts":
/*!******************************!*\
  !*** ./src/client/qrcode.ts ***!
  \******************************/
/*! exports provided: qrcodeApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qrcodeApi", function() { return qrcodeApi; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proxy */ "./src/client/proxy.ts");


const qrcodeApi = {
    login(params) {
        if (params.type !== 'ontid' && params.type !== 'account') {
            throw new Error('Invalid parameter type ' + params.type);
        }
        const req = {
            action: 'login',
            version: _proxy__WEBPACK_IMPORTED_MODULE_1__["version"],
            id: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomId"])(),
            params
        };
        return JSON.stringify(req);
    },
    invoke(params) {
        const req = {
            action: 'invoke',
            version: _proxy__WEBPACK_IMPORTED_MODULE_1__["version"],
            id: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomId"])(),
            params
        };
        return JSON.stringify(req);
    }
};

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
        if (!params.scriptHash || !params.operation || !params.args) {
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
                    gasPrice: params.gasPrice ? params.gasPrice : 500,
                    gasLimit: params.gasLimit ? params.gasLimit : 20000
                }
            }
        };
        return Object(_proxy__WEBPACK_IMPORTED_MODULE_1__["call"])(req);
    },
    invokeRead(params) {
        if (!params.scriptHash || !params.operation || !params.args) {
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
                    gasPrice: params.gasPrice ? params.gasPrice : 500,
                    gasLimit: params.gasLimit ? params.gasLimit : 20000
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
                    gasPrice: params.gasPrice ? params.gasPrice : 500,
                    gasLimit: params.gasLimit ? params.gasLimit : 20000
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
/*! exports provided: formatArgItem, makeInvokeFunction, randomId, ready */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatArgItem", function() { return formatArgItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeInvokeFunction", function() { return makeInvokeFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomId", function() { return randomId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ready", function() { return ready; });
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
function randomId() {
    return Math.random().toString(36).substring(2, 10);
}
function ready(callback) {
    if (typeof document === 'undefined') {
        throw new Error('document-ready only runs in the browser');
    }
    const state = document.readyState;
    if (state === 'complete' || state === 'interactive') {
        return setTimeout(callback, 0);
    }
    document.addEventListener('DOMContentLoaded', function onLoad() {
        callback();
    });
}

/***/ })

/******/ });
//# sourceMappingURL=index.js.map