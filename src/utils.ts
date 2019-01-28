export function formatArgItem(p: any) {
    if (p.type === 'Boolean' || p.type === 'Integer') {
        return {
            name: p.name,
            value: p.value
        };
    } else if (p.type === 'String' || p.type === 'ByteArray' || p.type === 'Long' || p.type === 'Address') {
        return {
            name: p.name,
            value: p.type + ':' + p.value
        };
    } else if (p.type === 'Array') {
        return {
            name: p.name,
            value: p.value.map((v: any) => formatArgItem(v))
        };
    } else if (p.type === 'Map') {
        const val: any = {};
        for (const k of Object.keys(p.value)) {
            val[k] = formatArgItem(p.value[k]);
        }
        return {
            name: p.name,
            value: val
        };
    } else {
        throw new Error('Invalid parmeter type: ' + JSON.stringify(p));
    }
}

export function makeInvokeFunction(operation: string, args: any[]) {
    const params = [];
    for (const p of args) {
        params.push(formatArgItem(p));
    }
    const obj = {
        operation,
        args: params
    };
    return obj;
}

export function randomId() {
    return Math.random().toString(36).substring(2, 10);
}

export function ready(callback: () => void) {
    if (typeof document === 'undefined') {
        throw new Error('document-ready only runs in the browser');
    }
    const state = document.readyState;
    if (state === 'complete' || state === 'interactive') {
        return setTimeout(callback, 0);
    }

    document.addEventListener('DOMContentLoaded', function onLoad() {
        callback();
    });
}