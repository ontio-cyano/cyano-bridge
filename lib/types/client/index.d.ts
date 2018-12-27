import { registerClient } from './proxy';
declare const api: {
    asset: {
        getAccount(params?: {
            dappName: string;
            dappIcon: string;
        } | undefined): Promise<{}>;
    };
    identity: {
        getIdentity(params?: {
            dappName: string;
            dappIcon: string;
        } | undefined): Promise<{}>;
    };
    message: {
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
    smartContract: {
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
    };
};
export { registerClient, api };
