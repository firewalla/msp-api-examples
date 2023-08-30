### Example
Get top bandwidth usage devices within a custom period on your MSP. If the bandwidth usage reaches the configured limit,
it will be able to send a message to Discord. It functions the same as [Send alarms to Discord](../send-alarms-to-discord/README.md).

***Reminder: It is only supported on MSP 2.1.0 or later.***


### Quick Start

Assume you've already cloned `https://github.com/firewalla/msp-api-examples.git` and `cd msp-api-examples`

```bash
cd get-top-bandwidth-usage-devices
npm install
domain="<YOUR-MSP-DOMAIN>" token="<YOUR-MSP-TOKEN>" node ./index.js

```

### Dependencies
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/package/npm), [pnpm](https://pnpm.io/installation), or the package manager you prefer
