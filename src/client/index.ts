import { assetApi as asset } from './asset';
import { governanceApi as governance } from './governance';
import { identityApi as identity } from './identity';
import { messageApi as message } from './message';
import { mobileApi as mobile } from './mobile';
import { providerApi as provider } from './provider';
import { qrcodeApi as qrcode } from './qrcode';
import { scApi as smartContract } from './smartcontract';
import { stateChannelApi as stateChannel } from './stateChannel';

import { registerClient } from './proxy';

const api = {
    asset,
    identity,
    message,
    mobile,
    smartContract,
    qrcode,
    provider,
    stateChannel,
    governance
};

export { registerClient, api};
