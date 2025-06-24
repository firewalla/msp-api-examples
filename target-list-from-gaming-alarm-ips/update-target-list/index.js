import axios from 'axios';
import fs from 'fs';

// Create .token and .domain file or use environment variables to setup your MSP domain and credential
const msp_domain = process.env.domain || "[Your MSP Domain]";
const token = process.env.token || "[Your MSP Token]";
const box = process.env.box || "[Your box GID]";
const id = process.env.id || "[Your Target List ID]";

async function main() {

    const httpClient = axios.create({
        baseURL: `https://${msp_domain}/v2`,
    })
    httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
    httpClient.defaults.headers.common['Content-Type'] = 'application/json'

    const params = {
        query: `status:active box:${box} type:9`, // get gaming activity alarms
        cursor: null,
        limit: 10
    }
    const alarms = [];
    const existingList = await httpClient.get(`https://${msp_domain}/v2/target-lists/${id}`).then(r => r.data);
    const currentIPs = new Set(existingList.targets || []);
    while (1) {
        const { results, next_cursor } = await httpClient({
            method: 'get',
            url: `/alarms`,
            params: params
        }).then(r => r.data);
        alarms.push(...results);

        results.forEach(r => {
            if (r.remote?.ip) {
                currentIPs.add(r.remote.ip);
            }
        });
        if (!next_cursor) break;
        params.cursor = next_cursor;
    }

    const targetList = {
        "name": existingList.name,
        "targets": [...currentIPs]
    }
    
    axios({
        method: "patch",
        url: `https://${msp_domain}/v2/target-lists/${id}`,
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        data: targetList
    }).then(res => {
        console.log(res.data);
        console.log("Updated Target List Successfully.");
    })
    
}


main().catch(err => {
    console.error('Failed to update Target List', err);
    process.exit(1)
})