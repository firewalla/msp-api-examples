# Examples

## [Target list with CloudFlare](./target-list-with-cloudflare)

### Story

Managed to lock down access to your NGINX reverse proxy to CloudFlare's IPs by doing essentially the same thing as [target-list-with-crowdsec](./target-list-with-crowdsec). Assume you have an auto-updating list of CloudFlare IPs, and once per day it checks for a change and if it changed, it updates the list that is on your Port Forward to your server. This way (hopefully) no one can just go around CloudFlare.

### Dependencies
- [jq](https://jqlang.github.io/jq/tutorial/)


## [Target list with Crowdsec](./target-list-with-crowdsec)

### Story

While Firewalla support confirmed it should not be done via modifying Iptables, It was able to get it to work with your system by using the \<my-domain\>.firewalla.net API and CrowdSec's local API. Essentially all you need to do is poll the CrowdSec API for Decisions (bans) and then use the Update List (PATCH) endpoint to replace the contents of a blocklist once per hour.

### Dependencies
- [jq](https://jqlang.github.io/jq/tutorial/)
- [CrowdSec](https://github.com/crowdsecurity/crowdsec), v1.5.2.
