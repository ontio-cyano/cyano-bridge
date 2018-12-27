import { call, version } from './proxy';

export const messageApi = {
    signMessage(params: {message: string}) {
        const req = {
            action: 'login',
            version,
            params,
            needTimeout: true
        };
        return call(req);
    },

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
        const req = {
            action: 'login',
            version,
            params,
            needTimeout: false
        };
        return call(req);
    }
};
