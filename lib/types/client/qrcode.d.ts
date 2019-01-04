export declare const qrcodeApi: {
    login(params: {
        type: string;
        dappName: string;
        dappIcon: string;
        message: string;
        expire: number;
        callback: string;
    }): string;
    invoke(params: {
        login: boolean;
        callback: string;
        qrcodeUrl: string;
    }): string;
};
