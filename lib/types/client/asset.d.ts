export declare type Asset = 'ONT' | 'ONG' | string;
export declare const assetApi: {
    getAccount(params?: {
        dappName: string;
        dappIcon: string;
        needTimeout: boolean;
    } | undefined): Promise<{}>;
    transfer({ from, to, asset, amount, gasPrice, gasLimit }: {
        from: string;
        to: string;
        asset: string;
        amount: string | number;
        gasPrice?: number | undefined;
        gasLimit?: number | undefined;
    }): Promise<{}>;
    transferV2({ from, to, asset, amount, gasPrice, gasLimit }: {
        from: string;
        to: string;
        asset: string;
        amount: string | number;
        gasPrice?: number | undefined;
        gasLimit?: number | undefined;
    }): Promise<{}>;
};
