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

// This is an example on how to query last 24 hours flows on a given box

import axios from 'axios';
import fs from 'fs';

// Change these three configurations to what you need
const msp_domain = process.env.msp_domain || "qici-dev2.dd.firewalla.net";
const token = process.env.token || fs.readFileSync('./.token').toString();
const begin = process.env.begin || Date.now() / 1000 - 24 * 3600;
let end = process.env.end || Date.now() / 1000;

console.log(begin, end)


async function main() {

  const httpClient = axios.create({
    baseURL: `https://${msp_domain}/v2`,
  })
  httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
  httpClient.defaults.headers.common['Content-Type'] = 'application/json'

  const bucket = {}

  do {
    const resp = await httpClient({
      method: 'get',
      url: `/flows`,
      params: {
        begin,
        end,
        limit: 500,
      },
    }).then(r => r.data)

    end = resp.next

    for (const flow of resp.results) {
      if (!bucket[flow.device.id]) {
        bucket[flow.device.id] = Object.assign({}, flow.device)
        bucket[flow.device.id].flows = []
      }
      bucket[flow.device.id].flows.push(flow)
    }

  } while(end)


  for (const deviceId in bucket) {
    const device = bucket[deviceId]
    console.log(`${device.name}: ${device.flows.length} flows`)
  }
}


main().catch(err => {
  console.error('Failed to get hourly flows', err);
  process.exit(1)
})
