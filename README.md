# Firewalla Managed Security Portal (MSP) API Examples

This repository contains code examples that demonstrate how to use [Firewalla MSP API](https://docs.firewalla.net/) to interact with [Firewalla MSP](https://firewalla.net/). You can read, play with or adapt from these examples to create your own appliance.

## Prerequisites

- A Firewalla MSP account and a valid [plan](https://firewalla.net/plans)
- Access token from your MSP account, check the [document](https://docs.firewalla.net/quick_start/) for details

## Quick Start

You could use either file or environment variable to setup your MSP domain and credential, check each example for details

```bash
git clone https://github.com/firewalla/msp-api-examples.git
cd msp-api-examples/flow-pagination
npm install
domain="<YOUR-MSP-DOMAIN>" token="<YOUR-MSP-TOKEN>" node ./flow-pagination/index.js

```

## Samples

| Sample | Firewalla MSP API Document | Contributors|
| ------ | ----- | ----- | 
| [Flow Pagination](./flow-pagination/index.js) | [Flow](https://docs.firewalla.net/api-reference/flow/) | |
| [Send alarms to Discord](./send-alarms-to-discord/README.md) | [Alarm](https://docs.firewalla.net/api-reference/alarm/) | |
| [Get Topk Bandwidth Usage Devices](./get-topk-bandwidth-usage-devices/README.md) | [Device](https://docs.firewalla.net/api-reference/device/) | |
| [Target list with CloudFlare](./target-list-with-cloudflare/README.md) | [Target List](https://docs.firewalla.net/api-reference/target-lists/) | [@CozMedic](https://github.com/CozMedic) |
| [Target list with CrowdSec](./target-list-with-crowdsec/README.md) | [Target List](https://docs.firewalla.net/api-reference/target-lists/) | [@CozMedic](https://github.com/CozMedic) |

## Disclaimer

As Firewalla MSP API operates directly on your data without prompt. Be very careful writing your own appliance. Dry runs are recommended before any write request.

# Contributing

Pull requests are welcome. Lastest development happens on `main` branch

You might also want to check our user community on [firewalla.com](https://help.firewalla.com/hc/en-us/community/topics) and [reddit](https://www.reddit.com/r/firewalla/)
