import { makeInvokeFunction } from '../utils';
import { call, version } from './proxy';

// tslint:disable-next-line:one-variable-per-declaration
export const scApi = {
    invoke(params: {
        scriptHash: string,
        operation: string,
        args: any[],
        gasPrice: number,
        gasLimit: number,
        payer: string,
        config?: {
            login: boolean,
            message: string,
            url: string
        }
    }) {
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
        const functionParams = makeInvokeFunction(params.operation, params.args);
        const req: any = {
            action: 'invoke',
            version,
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
        return call(req);
    },
    invokeRead(params: {
        scriptHash: string,
        operation: string,
        args: any[],
        gasPrice: number,
        gasLimit: number,
        payer?: string,
        config?: {
            login: boolean,
            message: string,
            url: string
        }
    }) {
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
        const functionParams = makeInvokeFunction(params.operation, params.args);
        const req: any = {
            action: 'invokeRead',
            version,
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
        return call(req);
    },
    invokePasswordFree(params: {
        scriptHash: string,
        operation: string,
        args: any[],
        gasPrice: number,
        gasLimit: number,
        payer: string,
        config: {
            login: boolean,
            message: string,
            url: string
        }
    }) {
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
        const functionParams = makeInvokeFunction(params.operation, params.args);
        const req: any = {
            action: 'invokePasswordFree',
            version,
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
        return call(req);
    }
};
