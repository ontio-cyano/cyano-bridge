export interface GET_DATA_PARAMS {
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
export interface GOTO_NATIVE_PARAMS {
    page: string;
    data: any;
}
export declare const mobileApi: {
    getData(params: GET_DATA_PARAMS): Promise<{}>;
    doAction(params: DO_ACTION_PARAMS): Promise<{}>;
    gotoWebview(params: GOTO_WEBVIEW_PARAMS): Promise<{}>;
    gotoNative(params: GOTO_NATIVE_PARAMS): Promise<{}>;
    switchIdentity(): Promise<{}>;
    switchDeviceCode(): Promise<{}>;
};
