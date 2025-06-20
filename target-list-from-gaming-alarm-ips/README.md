### Example

If you'd like to create a Target List of all the destination IP addresses of a certain type of Alarm, you can get all the destination IPs from the past x Alarms, create a new Target List, and update the Target List periodically with these alarms.


### Quick Start
Assume you've already cloned `https://github.com/firewalla/msp-api-examples.git` and `cd msp-api-examples`

**Create a new Target List from Gaming Alarms**
Update your MSP domain, token, and box in the files.
```bash
cd target-list-from-gaming-alarm-ips/create-target-list
npm install
node ./index.js
```
**Create a new Target List from Gaming Alarms**
Update your MSP domain, token, box, and target list IDs in the files.
```bash
cd target-list-from-gaming-alarm-ips/update-target-list
npm install
node ./index.js
```

### Dependencies
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/package/npm), [pnpm](https://pnpm.io/installation), or the package manager you prefer
