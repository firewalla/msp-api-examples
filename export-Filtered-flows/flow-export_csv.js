const axios = require('axios');
// Output is CSV to console 

// Change these three configurations to what you need
// set to your MSP domain 
const msp_domain = process.env.msp_domain || "my_msp.firewalla.net";

// replace with your MSP token
const token = process.env.token || "your_token";

// block: 1 means blocked flows 0 = unblocked flows
const block = process.env.block || "0";

// default to within the last 24 hours
const begin = process.env.begin || Date.now() / 1000 - 24 * 3600;

// You could also do within the last hour
// const begin = process.env.begin || Math.floor(Date.now() / 1000) - 3600;
// end as of "now"
const end = process.env.end || Date.now() / 1000;

// this sets max responses 
const limit = process.env.limit || 100;

// replace with the GID of a particular firewalla.
const gid = process.env.gid || "GID";


// In this example, we are going to get up to 10 unblocked flows within the last 24 hours from a specific box: 
// and output the 
// * date stamp 
// * remote IP 
// * and remote Domain 

axios({
  method: 'get',
  url: `https://${msp_domain}/v2/flows?begin=${begin}&end=${end}&block=${block}&limit=${limit}&gid=${gid}`,
  headers: {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  let data = res.data;
  if (data.results && data.results.length > 0) {
    const result = data.results[0];
    const ts = result.ts;
    const deviceName = result.device.name;
    const remoteIP = result.remote.ip;
    const remoteDomain = result.remote.domain || "";

    const csvData = `${ts},${deviceName},${remoteIP},${remoteDomain}`;
    console.log(csvData);
  } else {
    console.log("No data found.");
  }
}).catch((err) => {
  console.error("Error fetching data:", err.message);
});

// sample output
// % node ./flow-export_csv.js
// 1693266677.467,Pigpen / Synology NAS 🗄,192.241.187.136,api.openweathermap.org
