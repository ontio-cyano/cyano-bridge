import { assetApi as asset } from './asset';
import { identityApi as identity } from './identity';
import { messageApi as message } from './message';
import { providerApi as provider } from './provider';
import { qrcodeApi as qrcode } from './qrcode';
import { scApi as smartContract } from './smartcontract';

import { registerClient } from './proxy';

const api = {
    asset,
    identity,
    message,
    smartContract,
    qrcode,
    provider
};

export { registerClient, api};
