# CyanoBridge

A tool to help mobile dApps communicate with related provider. It wraps the dapi for mobile dapps and send request to 

the provider(native client).

> Notice: Those dapps are opened in the webview of native app, for example ONTO.

## How to use

CyanoBridge can be used as CommonJS/ES6 module or directly referencing in html.

### Install CommonJS/ES module

```
npm install cyanobridge
```

### Import CommonJS

```
var client = require('cyanobridge').client
client.registerClient();
```

### Import ES6 module

```
import { client } from 'cyanobridge'
client.registerClient();
```

### Web require

The file to be referenced is under the `./lib` folder.

```
<script src="./lib/browser.js"></script>

var client = CyanoMobile.client;
client.registerClient();
```


## Usage

Here is a [demo app](https://github.com/ontio-cyano/mobile-dapp-demo).

# Documentation

## 1. Initialisation

```
import { client } from 'cyanobridge'
client.registerClient();
```



## 2. getAccount

Requst the account from cyano provider.

### Example:

```
import { client } from 'cyanobridge'

const params = {
​    dappName: 'My dapp',
​    dappIcon: '' // some url points to the dapp icon
}

try {
​    const res = await client.api.asset.getAccount(params);
​    console.log(res)
} catch(err) {
​    console.log(err)
}

```

## 2. getIdentity

Request the identity from the cyano provider.

#### Example:

```
const params = {
​    dappName: 'My dapp',
​    dappIcon: '' // some url points to the dapp icon
}
try {
​    const res = await client.api.identity.getIdentity(params);
​    console.log(res)
} catch(err) {
​    console.log(err)
}
```



## 3. login

Request to sign a message and get the signature from cyano provider.

Parameter is  a JSON object. It contains:

`type` Define use account or identity to sign message

`dappName` dApp's name

`dappIcon` A url that points to the dApp's icon.

`message` Message to sign.

`expired` Timestamp for expire date.

`callback` Callback url for dapp.

#### Example:

```
const params = {
​    type: 'account',// account or identity that will sign the message
​    dappName: 'My dapp', // dapp's name
​    dappIcon: 'http://mydapp.com/icon.png', // some url that points to the dapp's icon
​    message: 'test message', // message sent from dapp that will be signed by native client
​    expired: new Date('2019-01-01').getTime(), // expired date of login
​    callback: '' // callback url of dapp
}
let res;
try {
​    res = await client.api.message.login(params);
​    console.log(res)
}catch(err) {
​    console.log(err)
}
// verify signature here

```



## 4. Invoke smart contract

Request to inovke some smart contract methods with cyano provider.

Parameter are as below:

`scriptHash` Script hash of smart contract

`operation` Method to invoke

`args` Array of parameters. Each parameter should contain `type` and `value`

> The `type` includes: `String`, `ByteArray`,  `Long`(use string for long value), `Integer`, `Address`(use base58 format address value), `Array`, `Map`.

`gasPrice` Gas price

`gasLimit` Gas limit

`payer` base58 format address of the payer.

`config` Optional config.

> `config` can contains 
>
> {	
>
> ​	login: bool // define if user logined
>
> ​	message:  string // some message to show in cyano provider
>
> ​	url: string // callback url for dapp
>
> }

### Example:

```
const scriptHash = 'cd948340ffcf11d4f5494140c93885583110f3e9';
const operation = 'test'
const args = [
​    {
​        type: 'String',
​        value: 'helloworld'
​    }
]
const gasPrice = 500;
const gasLimit = 20000;
const payer = 'AecaeSEBkt5GcBCxwz1F41TvdjX3dnKBkJ'
const config = {
​    "login": true,
​    "message": "invoke smart contract test",
​    "url": ""  
}
const params = {
          scriptHash,
          operation,
          args,
          gasPrice,
          gasLimit,
          payer,
          config
        }
try {
   const res = await client.api.smartContract.invoke(params);
   } catch(err) {
​    console.log(err)
}

```

## 5. InvokeRead smart contract

Request to pre-exe some smart contract methods with cyano provider.The parameters are similar with invoke smart contract.

### Example:

```
const scriptHash = 'b5a1f2cd4e27b7453111a2f5eb737714ead8fded';
      const operation = 'balanceOf';
      const args = [{
          "name": "account",
          "type" : 'Address',
          "value": "AQf4Mzu1YJrhz9f3aRkkwSm9n3qhXGSh4p"
        }]
        const gasPrice = 500;
        const gasLimit = 20000;
        const config = {
          "login": true,
          "message": "invoke read smart contract test",
          "url": ""
        }
        const params = {
          scriptHash,
          operation,
          args,
          gasPrice,
          gasLimit,
          config
        }
        try{
          const res = await client.api.smartContract.invokeRead(params);
          console.log('dapp receive: ' + JSON.stringify(res));
          this.invokeReadRes = JSON.stringify(res);
        }catch(err) {
          console.log(err);
        }
```


# Build

## Required Tools and Dependencies

* Node
* Npm

## Install

```
npm install cyanobridge --save
```

## Development build

```
npm run build:dev
```

The packaged result will be in `/lib`

## Production build

```
npm run build:prod
```

The packaged result will be in `/lib`

