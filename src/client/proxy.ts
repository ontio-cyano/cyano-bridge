import CyanoBridge from '../CyanoBridge';

let cb: CyanoBridge;

export function registerClient(timeout: number = 3000) {
    cb = new CyanoBridge(timeout);
}

export async function call(request: any) {
    return cb.call(request);
}

export const version = '1.0.0';
