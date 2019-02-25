import { registerClient } from './proxy';
declare const api: {
    asset: {
        getAccount(params?: {
            dappName: string;
            dappIcon: string;
        } | undefined): Promise<{}>;
        transfer({ from, to, asset, amount, gasPrice, gasLimit }: {
            from: string;
            to: string;
            asset: string;
            amount: string | number;
            gasPrice?: number | undefined;
            gasLimit?: number | undefined;
        }): Promise<{}>;
    };
    identity: {
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
        registerOntId({ ontid, publicKey, payer, gasPrice, gasLimit }: {
            ontid: string;
            publicKey: string;
            payer: string;
            gasPrice?: number | undefined;
            gasLimit?: number | undefined;
        }): Promise<{}>;
        getDDO(ontid: string): Promise<{}>;
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
            config?: {
                login: boolean;
                message: string;
                url: string;
            } | undefined;
        }): Promise<{}>;
        invokeRead(params: {
            scriptHash: string;
            operation: string;
            args: any[];
            gasPrice: number;
            gasLimit: number;
            payer?: string | undefined;
            config?: {
                login: boolean;
                message: string;
                url: string;
            } | undefined;
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
    qrcode: {
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
    provider: {
        getProvider(): Promise<{}>;
    };
};
export { registerClient, api };
