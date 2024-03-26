const axios = require('axios');

// Change these three configurations to what you need
const msp_domain = process.env.msp_domain || "my_mnsp.firewalla.net";
const token = process.env.token || "my_token";
const block = process.env.block || "1";
const limit = process.env.limit || "10";
const begin = process.env.begin || Date.now() / 1000 - 24 * 3600
const end = process.env.end || Date.now() / 1000


axios({
    method: 'get',
    url: `https://${msp_domain}/v2/flows?begin=${begin}&end=${end}&block=${block}&limit=${limit}`,
    headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json"
    }
}).then((res) => {
    let data = res.data;
    console.log(data);
})
