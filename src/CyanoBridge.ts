
import { makeInvokeFunction } from './utils';

class CyanoBridge {

    version: string;
    listener: (e: any) => any;
    timeout: number = 3000;
    constructor(timeout?: number) {
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

    getAccount(params?: {dappName: string, dappIcon: string}) {
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
    getIdentity(params?: { dappName: string, dappIcon: string}) {
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
    login(params: {
        message: string,
        type: string,
        dappName: string,
        dappIcon: string,
        expired: number,
        callback: string
    }) {
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
    invoke(scriptHash: string,
           operation: string,
           args: any[],
           gasPrice = 500,
           gasLimit = 200000,
           payer: string,
           config = {
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
            const functionParams = makeInvokeFunction(operation, args);
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

    call(req: any) {
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

    parseMessage(msg: string): any {
        return JSON.parse(decodeURIComponent(atob(msg)));
    }

    onMessage(handler: (res: any) => {}) {
        if (this.listener) {
            this.offMessage();
        }
        const listener = (e: any) => {
            const res = this.parseMessage(e.data);
            handler(res);
        };
        window.document.addEventListener('message', listener);
        this.listener = listener;
    }

    offMessage() {
        window.document.removeEventListener('message', this.listener);
    }

    private sendMessage(msg: string) {
        window.postMessage(msg, '*');
    }

    private handleMessageEvent(resolve: any, reject: any, action: string, needTimeout: boolean = true) {
        const handler = (event: any) => {
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

export default CyanoBridge;
