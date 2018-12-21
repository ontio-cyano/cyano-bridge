# Cyano-dpai-mobile

A tool to help mobile dApps communicate with related provider.

> Notice: This dapps are opened in the webview of native app, for example ONTO.

# How does it work?

The dapp use `window.prompt` to send message to the native. The native will intercept the message and handle it.

The dapp will register some event with listeners. The native will trigger the event to send message back to the dapp.

## Login

The login is very simple.

When the dapp is opend, it will send 