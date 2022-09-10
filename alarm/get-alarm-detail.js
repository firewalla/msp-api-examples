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

// This is an example on how to query alarm detail

const axios = require('axios');

// Change these three configurations to what you need
const mspDomain = process.env.msp_domain || "mydomain.firewalla.net";
const token = process.env.token || "__PERSONAL_ACCESS_TOKEN_FROM_MSP__";
const gid = process.env.gid || "box_gid"; // box gid
const alarmId = process.env.alarmId || "alarm_id"; // alarm id

axios({
    method: 'get',
    url: `https://${mspDomain}/v1/alarm/${gid}/${alarmId}`,
    headers: {
        Authorization: `Token ${token}`
    }
}).then((res) => {
    let data = res.data;
    console.log(data);
})
