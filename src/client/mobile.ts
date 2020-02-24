import { call, version } from './proxy';

export interface GET_DATA_PARAMS  {
    dataType: string;
}

export interface DO_ACTION_PARAMS {
    actionType: string;
    data: any;
}

export interface GOTO_WEBVIEW_PARAMS {
    url: string;
    data: any;
}

export const mobileApi = {
    getData(params: GET_DATA_PARAMS) {
        const req = {
            action: 'getData',
            version,
            params,
            needTimeout: false
        };
        return call(req);
    },
    doAction(params: DO_ACTION_PARAMS) {
        const req = {
            action: 'doAction',
            version,
            params,
            needTimeout: false
        };
        return call(req);
    },
    gotoWebview(params: GOTO_WEBVIEW_PARAMS) {
        const req = {
            action: 'gotoWebview',
            version,
            params,
            needTimeout: false
        };
        return call(req);
    },
    switchIdentity() {
        const req = {
            action: 'switch_ontid',
            version,
            needTimeout: false
        };
        return call(req);
    },
    switchDeviceCode() {
        const req = {
            action: 'switch_device_code',
            version,
            needTimeout: false
        };
        return call(req);
    }
};
