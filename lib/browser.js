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
        if (timeout) {
            this.timeout = timeout;
        }
    }
    // tslint:disable:jsdoc-format
    /**
     * Return the uri to get account from provider
     * @params {object} params
     * {
         "dappName": string, // dApp name
         "dappIcon": string // url that points to the icon of the dapp
        }
     */
    getAccount(params) {
        return new Promise((resolve, reject) => {
            const req = {
                action: 'getAccount',
                version: this.version,
                params
            };
            const msg = btoa(encodeURIComponent(JSON.stringify(req)));
            const uri = 'ontprovider://ont.io?params=' + msg;
            this.sendMessage(uri);
            this.handleMessageEvent(resolve, reject, 'getAccount', true);
        });
    }
    /**
     * Return the uri to get identity from provider
     * @params {object} params
     * {
         "dappName": string, // dApp name
         "dappIcon": string // url that points to the icon of the dapp
        }
     */
    getIdentity(params) {
        return new Promise((resolve, reject) => {
            const req = {
                action: 'getIdentity',
                version: this.version,
                params
            };
            const msg = btoa(encodeURIComponent(JSON.stringify(req)));
            const uri = 'ontprovider://ont.io?params=' + msg;
            this.sendMessage(uri);
            this.handleMessageEvent(resolve, reject, 'getIdentity', true);
        });
    }
    /**
     * We define the login process is: dapp will send a message to native client,
     * native client will sign the message with
     * user's private key and send back,dapp will verify the signature to decide if login or not.
     * @params params
     * params: {
         type: 'account',// account or identity that will sign the message
         dappName: 'My dapp', // dapp's name
         dappIcon: 'http://mydapp.com/icon.png', // some url that points to the dapp's icon
         message: 'test message', // message sent from dapp that will be signed by native client
         expired: new Date('2019-01-01').getTime(), // expired date of login
         callback: '' // callback url of dapp
     }
     */
    login(params) {
        if (!params.message || typeof params.message !== 'string') {
            throw new Error('Parameter for login must contain a message.');
        }
        if (!params.type) {
            params.type = 'account';
        }
        return new Promise((resolve, reject) => {
            const req = {
                action: 'login',
                version: this.version,
                params
            };
            const msg = btoa(encodeURIComponent(JSON.stringify(req)));
            const uri = 'ontprovider://ont.io?params=' + msg;
            this.sendMessage(uri);
            this.handleMessageEvent(resolve, reject, 'login', false);
        });
    }
    /**
     * Invoke smart contract that needs wallet signature.
     * @param {string} scriptHash Scripthash of smart contract
     * @param {string} operation  Method to invoke
     * @param {[Parameter]} args
     * @param {number} gasPrice
     * @param {number} gasLimit
     * @param {JSON object} config optional configs
     * config: {
     *  login: bool // logined or not
     *  message: string // message to show in native client,
     *  url: string // callback url to get signed transaction
     * }
     */
    invoke(scriptHash, operation, args, gasPrice = 500, gasLimit = 200000, payer, config = {
        login: true,
        message: '',
        url: ''
    }) {
        if (!scriptHash || !operation || !args || args.length === 0) {
            throw new Error('Invalid params.');
        }
        if (!payer) {
            throw new Error('No payer.');
        }
        return new Promise((resolve, reject) => {
            const functionParams = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeInvokeFunction"])(operation, args);
            const req = {
                action: 'invoke',
                version: this.version,
                params: {
                    login: config.login,
                    url: config.url,
                    message: config.message,
                    invokeConfig: {
                        contractHash: scriptHash,
                        functions: [functionParams],
                        payer,
                        gasLimit,
                        gasPrice
                    }
                }
            };
            const msg = btoa(encodeURIComponent(JSON.stringify(req)));
            const uri = 'ontprovider://ont.io?params=' + msg;
            this.sendMessage(uri);
            this.handleMessageEvent(resolve, reject, 'invoke', false);
        });
    }
    call(req) {
        return new Promise((resolve, reject) => {
            const msg = btoa(encodeURIComponent(JSON.stringify(req)));
            const uri = 'ontprovider://ont.io?params=' + msg;
            this.sendMessage(uri);
            this.handleMessageEvent(resolve, reject, req.action, req.needTimeout);
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
    handleMessageEvent(resolve, reject, action, needTimeout = false) {
        const handler = event => {
            const message = event.data;
            if (!message) {
                reject(message);
            }
            document.removeEventListener('message', handler);
            const res = this.parseMessage(message);
            if (res.action === action) {
                resolve(res);
            } else {
                reject(res);
            }
        };
        document.addEventListener('message', handler);
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