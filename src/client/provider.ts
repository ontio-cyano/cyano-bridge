import { call, version } from './proxy';

export const providerApi = {
    getProvider() {
        const req = {
            action: 'getProvider',
            version,
            needTimeout: true
        };
        return call(req);
    }
};
