### Example

If you are too busy to log in to the web interface every day and check alarms, you can retrieve the alarms from the last x hours. If there are any security alarms, you can choose to receive an email or have them sent to Discord, allowing you to review the alarms at your convenience.


### Quick Start
Assume you've already cloned `https://github.com/firewalla/msp-api-examples.git` and `cd msp-api-examples`

```bash
cd send-alarms-to-discord
npm install
domain="<YOUR-MSP-DOMAIN>" token="<YOUR-MSP-TOKEN>" discordWebhook="<DISCORD-WEBHOOK>" node ./index.js

```

### Dependencies
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/package/npm), [pnpm](https://pnpm.io/installation), or the package manager you prefer
- [Discord Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
