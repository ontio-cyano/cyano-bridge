import { call, version } from './proxy';
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
    }
};
