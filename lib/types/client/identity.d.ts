export declare const identityApi: {
    getIdentity(params?: {
        dappName: string;
        dappIcon: string;
    } | undefined): Promise<{}>;
    authentication(params: {
        subaction: string;
    }): Promise<{}>;
    authorization(params: {
        subaction: string;
    }): Promise<{}>;
};
