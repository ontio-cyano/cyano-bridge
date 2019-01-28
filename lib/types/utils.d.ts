/// <reference types="node" />
export declare function formatArgItem(p: any): {
    name: any;
    value: any;
};
export declare function makeInvokeFunction(operation: string, args: any[]): {
    operation: string;
    args: {
        name: any;
        value: any;
    }[];
};
export declare function randomId(): string;
export declare function ready(callback: () => void): NodeJS.Timeout | undefined;
