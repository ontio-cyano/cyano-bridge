declare class CyanoBridge {
    version: string;
    listener: (e: any) => any;
    timeout: number;
    handlers: any;
    constructor(timeout?: number);
    call(req: any): Promise<{}>;
    invokeRead(): void;
    parseMessage(msg: string): any;
    onMessage(handler: (res: any) => {}): void;
    offMessage(): void;
    private sendMessage;
    private handleMessageEvent;
}
export default CyanoBridge;
