import axios from 'axios';
import fs from 'fs';

// Create .token and .domain file or use environment variables to setup your MSP domain and credential
const msp_domain = process.env.domain || "[Your MSP Domain]";
const token = process.env.token || "[Your MSP Token]";
const box = process.env.box || "[Your box GID]";

async function main() {

    const httpClient = axios.create({
        baseURL: `https://${msp_domain}/v2`,
    })
    httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
    httpClient.defaults.headers.common['Content-Type'] = 'application/json'

    const params = {
        query: `status:active box:${box} type:9`,
        cursor: null,
        limit: 10
    }
    const alarms = [];
    const remoteIPs = new Set();
    while (1) {
        const { results, next_cursor } = await httpClient({
            method: 'get',
            url: `/alarms`,
            params: params
        }).then(r => r.data);
        alarms.push(...results);

        results.forEach(r => {
            if (r.remote?.ip) remoteIPs.add(r.remote.ip);
        });
        if (!next_cursor) break;
        params.cursor = next_cursor;
    }
    const targets = [...remoteIPs];
    
    const targetList = {
        "name": "Gaming IP Addresses",
        "targets": targets
    }
    
    axios({
        method: "post",
        url: `https://${msp_domain}/v2/target-lists`,
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        data: targetList
    }).then(res => {
        console.log("Target List ID = ", res.data.id);
    })
    
}


main().catch(err => {
    console.error('Failed to create Target Lis', err);
    process.exit(1)
})