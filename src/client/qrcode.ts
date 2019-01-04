import { randomId } from '../utils';
import { version } from './proxy';

export const qrcodeApi = {
    login(params: {
        type: string,
        dappName: string,
        dappIcon: string,
        message: string,
        expire: number,
        callback: string
    }): string {
        if (params.type !== 'ontid' && params.type !== 'account') {
            throw new Error('Invalid parameter type ' + params.type);
        }
        const req = {
            action: 'login',
            version,
            id: randomId(),
            params
        };
        return JSON.stringify(req);
    },

    invoke(params: {
        login: boolean,
        callback: string,
        qrcodeUrl: string
    }): string {
        const req = {
            action: 'invoke',
            version,
            id: randomId(),
            params
        };
        return JSON.stringify(req);
    }
};
