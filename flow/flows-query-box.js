/*    Copyright 2022 Firewalla Inc.
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

// This is an example on how to query flows on a given timerange

const axios = require('axios');

// Change these three configurations to what you need
const mspDomain = process.env.msp_domain || "mydomain.firewalla.net";
const token = process.env.token || "__PERSONAL_ACCESS_TOKEN_FROM_MSP__";
const boxName = process.env.boxName || "Firewalla Gold"; // Box Name


axios({
    method: 'post',
    url: `https://${mspDomain}/v1/flows/query`,
    headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json"
    },
    data: {
        start: new Date() / 1000 - 24 * 3600,
        end: new Date() / 1000,
        filters: [{
            key: "box",
            values: [boxName]
        }],
        limit: 1000 // default value 200, max value 10000
    }
}).then((res) => {
    let data = res.data;
    console.log(data);
})
