/*    Copyright 2023 Firewalla Inc.
 *
 *    This program is free software: you can redistribute it and/or  modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios';
import fs from 'fs';

// Create .token and .domain file or use environment variables to setup your MSP domain and credential
const msp_domain = process.env.domain || fs.readFileSync('./.domain').toString();
const token = process.env.token || fs.readFileSync('./.token').toString();

const box = process.env.box;
const topk = process.env.topk || 10;


// Related API Document
// https://docs.firewalla.net/api-reference/device/
async function main() {

    const httpClient = axios.create({
        baseURL: `https://${msp_domain}/v2`,
    })
    httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
    httpClient.defaults.headers.common['Content-Type'] = 'application/json'

    let devices = await httpClient({
        method: 'get',
        url: `/devices`,
        params: {
            box: box, // gets devices under a specific Firewalla box
        },
    }).then(r => r.data);
    devices = devices.map(t => {
        t.total = (t.totalDownload + t.totalUpload) || 0;
        return t;
    })
    const result = devices.sort((a, b) => b.total - a.total);
    console.table(result.splice(0, topk), ['name', 'totalDownload', 'totalUpload', 'total']);
}


main().catch(err => {
    console.error('Failed to get flows', err);
    process.exit(1)
})