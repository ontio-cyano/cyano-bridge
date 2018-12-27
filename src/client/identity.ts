import { call, version } from './proxy';

export const identityApi = {
    getIdentity(params?: { dappName: string, dappIcon: string }) {
        const req = {
            action: 'getIdentity',
            version,
            params,
            needTimeout: true
        };
        return call(req);
    }
};
