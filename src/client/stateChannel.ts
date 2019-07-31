import { call, version } from './proxy';

export const stateChannelApi = {
    login() {
        const params = {};
        const req = {
            action: 'stateChannelLogin',
            version,
            params,
            needTimeout: false
        };
        return call(req);
    }
};
