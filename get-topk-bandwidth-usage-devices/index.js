/*    Copyright 2023 Firewalla Inc.
 *  
 *    MIT License

 *    Permission is hereby granted, free of charge, to any person obtaining
 *    a copy of this software and associated documentation files (the
 *    "Software"), to deal in the Software without restriction, including
 *    without limitation the rights to use, copy, modify, merge, publish,
 *    distribute, sublicense, and/or sell copies of the Software, and to
 *    permit persons to whom the Software is furnished to do so, subject to
 *    the following conditions:

 *    The above copyright notice and this permission notice shall be
 *    included in all copies or substantial portions of the Software.

 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import axios from 'axios';
import fs from 'fs';

// Create .token and .domain file or use environment variables to setup your MSP domain and credential
const msp_domain = process.env.domain || fs.readFileSync('./.domain').toString();
const token = process.env.token || fs.readFileSync('./.token').toString();

const begin = process.env.begin || Date.now() / 1000 - 30 * 24 * 3600; // last 30 days
let end = process.env.end || Date.now() / 1000;


// Related API Document
// https://docs.firewalla.net/api-reference/flow/


async function main() {

    const httpClient = axios.create({
        // aggr function is only supported on v1 version, will add it to v2 and update the API Doc recently
        baseURL: `https://${msp_domain}/v1`,
    })
    httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
    httpClient.defaults.headers.common['Content-Type'] = 'application/json'

    // pagination, keep fetching until next returned as null
    const resp = await httpClient({
        method: 'post',
        url: `/flows/query?format=v2`,
        data: {
            start: begin,
            end,
            limit: 50,
            sortBy: [{ name: "total", order: "desc" }],
            groupBy: ['device']
        },
    }).then(r => r.data)

    const results = resp.flows.map(f => { return { deviceName: f.device.name, total: f.total, download: f.download, upload: f.upload } });
    console.table(results, ["deviceName", "download", "upload", "total"])
}


main().catch(err => {
    console.error('Failed to get flows', err);
    process.exit(1)
})
