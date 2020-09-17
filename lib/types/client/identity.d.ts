export declare const identityApi: {
    getIdentity(params?: {
        dappName: string;
        dappIcon: string;
        needTimeout: boolean;
    } | undefined): Promise<{}>;
    authentication(params: {
        subaction: string;
    }): Promise<{}>;
    authorization(params: {
        subaction: string;
    }): Promise<{}>;
    registerOntId({ ontid, publicKey, payer, gasPrice, gasLimit }: {
        ontid: string;
        publicKey: string;
        payer: string;
        gasPrice?: number | undefined;
        gasLimit?: number | undefined;
    }): Promise<{}>;
    getDDO(ontid: string): Promise<{}>;
};
