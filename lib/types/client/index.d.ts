import { registerClient } from './proxy';
declare const api: {
    asset: {
        getAccount(params?: {
            dappName: string;
            dappIcon: string;
        } | undefined): Promise<{}>;
    };
};
export { registerClient, api };
