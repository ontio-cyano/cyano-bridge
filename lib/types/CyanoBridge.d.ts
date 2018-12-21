declare class CyanoBridge {
    version: string;
    listener: (e: any) => any;
    constructor();
    /**
     * Return the uri to get account from provider
     * @params {object} params
     * {
         "dappName": string, // dApp name
         "dappIcon": string // url that points to the icon of the dapp
        }
     */
    getAccount(params?: {
        dappName: string;
        dappIcon: string;
    }): void;
    /**
     * Return the uri to get identity from provider
     * @params {object} params
     * {
         "dappName": string, // dApp name
         "dappIcon": string // url that points to the icon of the dapp
        }
     */
    getIdentity(params?: {
        dappName: string;
        dappIcon: string;
    }): void;
    /**
     * We define the login process is: dapp will send a message to native client,
     * native client will sign the message with
     * user's private key and send back,dapp will verify the signature to decide if login or not.
     * @params params
     * params: {
         type: 'account',// account or identity that will sign the message
         dappName: 'My dapp', // dapp's name
         dappIcon: 'http://mydapp.com/icon.png', // some url that points to the dapp's icon
         message: 'test message', // message sent from dapp that will be signed by native client
         expired: new Date('2019-01-01').getTime(), // expired date of login
         callback: '' // callback url of dapp
     }
     */
    login(params: {
        message: string;
        type: string;
        dappName: string;
        dappIcon: string;
        expired: number;
        callback: string;
    }): void;
    /**
     * Invoke smart contract that needs wallet signature.
     * @param {string} scriptHash Scripthash of smart contract
     * @param {string} operation  Method to invoke
     * @param {[Parameter]} args
     * @param {number} gasPrice
     * @param {number} gasLimit
     * @param {JSON object} config optional configs
     * config: {
     *  login: bool // logined or not
     *  message: string // message to show in native client,
     *  url: string // callback url to get signed transaction
     * }
     */
    invoke(scriptHash: string, operation: string, args: any[], gasPrice: number | undefined, gasLimit: number | undefined, payer: string, config?: {
        login: boolean;
        message: string;
        url: string;
    }): void;
    invokeRead(): void;
    parseMessage(msg: string): any;
    onMessage(handler: (res: any) => {}): void;
    offMessage(): void;
    private sendMessage;
}
export default CyanoBridge;
