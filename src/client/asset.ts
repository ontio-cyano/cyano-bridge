import { call, version } from './proxy';
import { scApi } from './smartcontract';

export type Asset = 'ONT' | 'ONG' | string;

export const assetApi = {
    getAccount(params?: { dappName: string, dappIcon: string, needTimeout: boolean }) {
        const req = {
            action: 'getAccount',
            version,
            params,
            needTimeout: params ? params.needTimeout : false
        };
        return call(req);
    },

    transfer({ from, to, asset, amount, gasPrice, gasLimit }:
        { from: string, to: string; asset: Asset; amount: number | string, gasPrice?: number, gasLimit?: number }) {
        const ONT_CONTRACT = '0100000000000000000000000000000000000000';
        const ONG_CONTRACT = '0200000000000000000000000000000000000000';
        const params = {
            scriptHash: asset === 'ONT' ? ONT_CONTRACT : ONG_CONTRACT,
            operation: 'transfer',
            args: [
                {
                    name: 'from',
                    type: 'Address',
                    value: from
                },
                {
                    name: 'to',
                    type: 'Address',
                    value: to
                },
                {
                    name: 'amount',
                    type: 'Long',
                    value: amount // Handler for number and string is the same
                }
            ],
            gasPrice: gasPrice = 500,
            gasLimit: gasLimit = 20000,
            payer: from
        };
        return scApi.invoke(params);
    }

};
