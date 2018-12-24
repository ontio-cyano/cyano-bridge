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
var CyanoBridge = require('cyanobridge')
const cyanoBridge = new CyanoBridge()
```

### Import Es6 module

```
import CyanoBridge from 'cyanobridge'
const cyanoBridge = new CyanoBridge()
```

### Web require

The file to be referenced is under the `./lib` folder.

```
<script src="./lib/browser.js"></script>
```


## Usage

Here is a [demo app](https://github.com/ontio-cyano/cyano-dapi-mobile).

# Documentation

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
