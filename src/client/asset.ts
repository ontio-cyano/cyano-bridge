import { call, version } from './proxy';

export const assetApi = {
    getAccount(params?: { dappName: string, dappIcon: string }) {
        const req = {
            action: 'getAccount',
            version,
            params,
            needTimeout: true
        };
        return call(req);
    }
};
