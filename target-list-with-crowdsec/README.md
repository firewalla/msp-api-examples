### Story

While Firewalla support confirmed it should not be done via modifying Iptables, It was able to get it to work with your system by using the \<my-domain\>.firewalla.net API and CrowdSec's local API. Essentially all you need to do is poll the CrowdSec API for Decisions (bans) and then use the Update List (PATCH) endpoint to replace the contents of a blocklist once per hour.

### Dependencies
- [jq](https://jqlang.github.io/jq/tutorial/)
- [CrowdSec](https://github.com/crowdsecurity/crowdsec), v1.5.2.


Contributors: [@CozMedic](https://github.com/CozMedic)