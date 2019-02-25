import { call, version } from './proxy';
import { scApi } from './smartcontract';
// const subactions = ['getRegistryOntidTx', 'faceRecognition', 'submit',
//     'requestAuthorization', 'getAuthorizationInfo', 'decryptClaim', 'deleteOntid', 'exportOntid];

export const identityApi = {
    getIdentity(params?: { dappName: string, dappIcon: string }) {
        const req = {
            action: 'getIdentity',
            version,
            params,
            needTimeout: true
        };
        return call(req);
    },
    authentication(
        params: {
            subaction: string
        }) {
        // if (!params || !params.subaction) {
        //     throw new Error('Invalid params. "subaction" missing.');
        // }
        // if (subactions.findIndex((item) => item === params.subaction) < 0) {
        //     throw new Error('Invalid params. Wrong "subaction" ' + params.subaction);
        // }
        const req = {
            action: 'authentication',
            version,
            params
        };
        return call(req);
    },

    authorization(
        params: {
            subaction: string
            // seqno: string,
            // user_ontid: string,
            // app_ontid: string,
            // to_ontid: string,
            // callback: string,
            // auth_template: string
        }
    ) {
        const req = {
            action: 'authorization',
            version,
            params
        };
        // if (!params || !params.subaction) {
        //     throw new Error('Invalid params. "subaction" missing.');
        // }
        // if (subactions.findIndex((item) => item === params.subaction) < 0) {
        //     throw new Error('Invalid params. Wrong "subaction" ' + params.subaction);
        // }
        return call(req);
    },

    registerOntId({ontid, publicKey, payer, gasPrice, gasLimit}:
         {ontid: string, publicKey: string, payer: string, gasPrice?: number, gasLimit?: number}) {
        const ONTID_CONTRACT = '0300000000000000000000000000000000000000';
        const params = {
            scriptHash: ONTID_CONTRACT,
            operation: 'regIDWithPublicKey',
            args: [
                {
                    name: 'ontid',
                    type: 'String',
                    value: ontid
                },
                {
                    name: 'pk',
                    type: 'ByteArray',
                    value: publicKey
                }
            ],
            gasPrice: gasPrice = 500,
            gasLimit: gasLimit = 20000,
            payer
        };
        return scApi.invoke(params);
    },

    getDDO(ontid: string) {
        const ONTID_CONTRACT = '0300000000000000000000000000000000000000';
        const params = {
            scriptHash: ONTID_CONTRACT,
            operation: 'getDDO',
            args: [
                {
                    name: 'ontid',
                    type: 'String',
                    value:  ontid
                }
            ],
            gasPrice: 500,
            gasLimit: 20000
        };
        return scApi.invokeRead(params);
    }
};
