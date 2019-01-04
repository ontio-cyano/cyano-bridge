import { randomId } from './utils';

class CyanoBridge {

    version: string;
    listener: (e: any) => any;
    timeout: number = 3000;
    handlers: any;
    constructor(timeout?: number) {
        this.version = 'v1.0.0';
        this.handlers = {};
        if (timeout) {
            this.timeout = timeout;
        }
    }

    call(req: any) {
        const id = randomId();
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

    private handleMessageEvent(
        id: string,
        resolve: any,
        reject: any,
        action: string,
        needTimeout:
        boolean = false
        ) {
        const that = this;
        // tslint:disable-next-line:only-arrow-functions
        const handler = function(event: any) {
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
        } as any;
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

export default CyanoBridge;
