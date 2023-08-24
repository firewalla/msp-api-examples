# Firewalla Managed Security Portal (MSP) API Examples

This repository contains code examples that demonstrate how to use [Firewalla MSP API](https://docs.firewalla.net/) to interact with [Firewalla MSP](https://firewalla.net/). You can read, play with or adapt from these examples to create your own appliance.

## Prerequisites

- A Firewalla MSP account and a valid [plan](https://firewalla.net/plans)
- Access token from your MSP account, check the [document](https://docs.firewalla.net/quick_start/) for details

## Quick Start


### Node Examples
You could use either file or environment variable to setup your MSP domain and credential, check each example for details

```bash
git clone https://github.com/firewalla/msp-api-examples.git
cd msp-api-examples/node-examples
npm install
domain="<YOUR-MSP-DOMAIN>" token="<YOUR-MSP-TOKEN>" node ./flows/flow-pagination.js

```

### Shell Examples
Similar as Node Examples, install required tools and modify the configurations, then run the examples.

## Samples

| Sample | Firewalla MSP API Document | Contributors|
| ------ | ----- | ----- | 
| [Flow Pagination](./node-examples/README.md#get-pagination-flows) | [Flow](https://docs.firewalla.net/api-reference/flow/) |  |
| [Target list with CloudFlare](./shell-examples/README.md#target-list-with-cloudflare) | [Target List](https://docs.firewalla.net/api-reference/target-lists/) | [@CozMedic](https://github.com/CozMedic) |
| [Target list with CrowdSec](./shell-examples/README.md#target-list-with-crowdsec) | [Target List](https://docs.firewalla.net/api-reference/target-lists/) | [@CozMedic](https://github.com/CozMedic) |
| [Get Security alarms and send to Discord](./node-examples/README.md#get-security-alarms) | [Alarm](https://docs.firewalla.net/api-reference/alarm/) |  |
| [Get Box Devices](./node-examples/README.md#get-box-devices) | [Device](https://docs.firewalla.net/api-reference/device/) |  |

## Disclaimer

As Firewalla MSP API operates directly on your data without prompt. Be very careful writing your own appliance. Dry runs are recommended before any write request.

# Contributing

Pull requests are welcome. Lastest development happens on `main` branch

You might also want to check our user community on [firewalla.com](https://help.firewalla.com/hc/en-us/community/topics) and [reddit](https://www.reddit.com/r/firewalla/)
