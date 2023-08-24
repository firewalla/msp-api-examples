### Story

Get topk bandwidth usage devices in last 24 hours on your msp or specific box. If the bandwidth usage is reach the limit you config,
can send a message to Discord also, do the same thing as [Send alarms to Discord](../send-alarms-to-discord/README.md).


### Quick Start

Assume you've already cloned `https://github.com/firewalla/msp-api-examples.git` and `cd msp-api-examples`
```bash
cd get-topk-bandwidth-usage-devices
npm install
domain="<YOUR-MSP-DOMAIN>" token="<YOUR-MSP-TOKEN>" node ./index.js

```

### Dependencies
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/package/npm), [pnpm](https://pnpm.io/installation), or the package manager you prefer