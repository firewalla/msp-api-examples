# Firewalla Managed Security Portal (MSP) API Examples

This repository contains code examples that demonstrate how to use [Firewalla MSP API](https://docs.firewalla.net/) to interact with [Firewalla MSP](https://firewalla.net/).

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/package/npm), [pnpm](https://pnpm.io/installation), or the package manager you prefer
- A Firewalla MSP account and a valid [plan](https://firewalla.net/plans)
- Access token from your MSP account, check the [document](https://docs.firewalla.net/quick_start/) for details

## Quick Start

You could use either file or environment variable to setup your MSP domain and credential, check each example for details

```bash
git clone https://github.com/firewalla/msp-api-examples.git
npm install
domain="<YOUR-MSP-DOMAIN>" token="<YOUR-MSP-TOKEN>" node ./flow-pagination/index.js

```

## Disclaimer

As Firewalla MSP API operates directly on your data without prompt. Be very careful writing your own appliance. Dry runs are recommended before any write request.

# Contributing

Pull requests are welcome. Lastest development happens on `main` branch

You might also want to check our user community on [firewalla.com](https://help.firewalla.com/hc/en-us/community/topics) and [reddit](https://www.reddit.com/r/firewalla/)
