export declare const messageApi: {
    signMessage(params: {
        message: string;
    }): Promise<{}>;
    login(params: {
        message: string;
        type: string;
        dappName: string;
        dappIcon: string;
        expired: number;
        callback: string;
    }): Promise<{}>;
};
