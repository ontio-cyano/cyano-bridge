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
var CyanoBridge = require('cyanobridge').CyanoBridge
const cyanoBridge = new CyanoBridge()
```

### Import ES6 module

```
import { CyanoBridge } from 'cyanobridge'
const cyanoBridge = new CyanoBridge()
```

### Web require

The file to be referenced is under the `./lib` folder.

```
<script src="./lib/browser.js"></script>

var cyanoBridge = new CyanoMobile.CyanoBridge();
```


## Usage

Here is a [demo app](https://github.com/ontio-cyano/cyano-dapi-mobile).

# Documentation

## 1. Initialisation

```
import { CyanoBridge } from 'cyanobridge'
const cyanoBridge = new CyanoBridge();
```



## 2. getAccount

Requst the account from cyano provider.

### Example:

```
const params = {
    dappName: 'My dapp',
    dappIcon: '' // some url points to the dapp icon
}

try {
    const res = cyanoBridge.getAccount(params)
    console.log(res)
} catch(err) {
    console.log(err)
}

```

## 2. getIdentity

Request the identity from the cyano provider.

#### Example:

```
const params = {
    dappName: 'My dapp',
    dappIcon: '' // some url points to the dapp icon
}
try {
    const res = cyanoBridge.getIdentity(params)
    console.log(res)
} catch(err) {
    console.log(err)
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
    type: 'account',// account or identity that will sign the message
    dappName: 'My dapp', // dapp's name
    dappIcon: 'http://mydapp.com/icon.png', // some url that points to the dapp's icon
    message: 'test message', // message sent from dapp that will be signed by native client
    expired: new Date('2019-01-01').getTime(), // expired date of login
    callback: '' // callback url of dapp
}
let res;
try {
    res = cyanoBridge.login(params)
    console.log(res)
}catch(err) {
    console.log(err)
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
    {
        type: 'String',
        value: 'helloworld'
    }
]
const gasPrice = 500;
const gasLimit = 20000;
const payer = 'AecaeSEBkt5GcBCxwz1F41TvdjX3dnKBkJ'
const config = {
    "login": true,
    "message": "invoke smart contract test",
    "url": ""  
}
try {
   const res = cyanoBridge.invoke(scriptHash, operation, args, gasPrice, gasLimit, payer, config) 
} catch(err) {
    console.log(err)
}

```



# Build

## Required Tools and Dependencies

* Node
* Npm

## Install

```
npm install
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
