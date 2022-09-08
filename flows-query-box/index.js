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

// This is an example on how to query last 24 hours flows on a given box

const axios = require('axios');

const baseUrl = "https://test.firewalla.net";
const token = "__PERSONAL_ACCESS_TOKEN_FROM_MSP__";
const boxName = "Firewalla Gold";

axios({
    method: 'post',
    url: `${baseUrl}/v1/flows/query`,
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
        limit: 1000
    }
}).then((res) => {
    let data = res.data;
    console.log(data);
})
