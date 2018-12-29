export declare const scApi: {
    invoke(params: {
        scriptHash: string;
        operation: string;
        args: any[];
        gasPrice: number;
        gasLimit: number;
        payer: string;
        config: {
            login: boolean;
            message: string;
            url: string;
        };
    }): Promise<{}>;
    invokeRead(params: {
        scriptHash: string;
        operation: string;
        args: any[];
        gasPrice: number;
        gasLimit: number;
        payer?: string | undefined;
        config: {
            login: boolean;
            message: string;
            url: string;
        };
    }): Promise<{}>;
    invokePasswordFree(params: {
        scriptHash: string;
        operation: string;
        args: any[];
        gasPrice: number;
        gasLimit: number;
        payer: string;
        config: {
            login: boolean;
            message: string;
            url: string;
        };
    }): Promise<{}>;
};
