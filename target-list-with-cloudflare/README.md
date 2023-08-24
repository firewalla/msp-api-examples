### Story

Managed to lock down access to your NGINX reverse proxy to CloudFlare's IPs by doing essentially the same thing as [target-list-with-crowdsec](../target-list-with-crowdsec). Assume you have an auto-updating list of CloudFlare IPs, and once per day it checks for a change and if it changed, it updates the list that is on your Port Forward to your server. This way (hopefully) no one can just go around CloudFlare.


### Dependencies
- [jq](https://jqlang.github.io/jq/tutorial/)


Contributors: [@CozMedic](https://github.com/CozMedic)