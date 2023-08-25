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
    }).then(r => r.data);
    devices = devices.filter(r => !r.online).map(r => {
        return { name: r.name, lastSeen: r.lastSeen ? new Date(r.lastSeen * 1000).toLocaleString() : '-' }
    })
    console.table(devices, ['name', 'lastSeen']);
}


main().catch(err => {
    console.error('Failed to get flows', err);
    process.exit(1)
})