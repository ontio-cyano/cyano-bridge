import { call, version } from './proxy';

export const governanceApi = {
    stakePeers(params: {
        peerPubKeys: string[],
        amounts: string[],
        gasPrice?: string,
        gasLimit?: string
    }) {
        const req = {
            action: 'stakePeers',
            version,
            params
        };
        return call(req);
    },

    redeemPeers(params: {
        peerPubKeys: string[],
        amounts: string[],
        gasPrice?: string,
        gasLimit?: string
    }) {
        const req = {
            action: 'redeemPeers',
            version,
            params
        };
        return call(req);
    },

    withdrawFeeReward(params: {gasPrice?: string, gasLimit?: string}) {
        const req = {
            action: 'withdrawFeeReward',
            version,
            params
        };
        return call(req);
    },

    withdrawUnfrozenOnt(params: {
        peerPubKeys: string[],
        amounts: string[],
        gasPrice?: string,
        gasLimit?: string
    }) {
        const req = {
            action: 'withdrawUnfrozenOnt',
            version,
            params
        };
        return call(req);
    },

    withdrawPeerUnboundOng(params: {gasPrice?: string, gasLimit?: string}) {
        const req = {
            action: 'withdrawPeerUnboundOng',
            version,
            params
        };
        return call(req);
    },

    getAllPeerPool() {
        const req = {
            action: 'getAllPeerPool',
            version
        };
        return call(req);
    },

    getAttributes(params: {peerPubKey: string}) {
        const req = {
            action: 'getAttributes',
            version,
            params
        };
        return call(req);
    },

    getStakeInfo(params: {peerPubKey: string}) {
        const req = {
            action: 'getStakeInfo',
            version,
            params
        };
        return call(req);
    },

    getRewardFeeAmount() {
        const req = {
            action: 'getRewardFeeAmount',
            version
        };
        return call(req);
    }
};
