import { assetApi as asset } from './asset';
import { identityApi as identity } from './identity';
import { messageApi as message } from './message';
import { qrcodeApi as qrcode } from './qrcode';
import { scApi as smartContract } from './smartcontract';

import { registerClient } from './proxy';

const api = {
    asset,
    identity,
    message,
    smartContract,
    qrcode
};

export { registerClient, api};
