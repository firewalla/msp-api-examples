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

// How to get discord webhook https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
const discordWebhook = process.env.discordWebhook || fs.readFileSync('./.discordWebhook').toString();
const begin = process.env.begin || Date.now() / 1000 - 24 * 3600;
let end = process.env.end || Date.now() / 1000;


// Related API Document
// https://docs.firewalla.net/api-reference/alarm/


async function main() {
    const httpClient = axios.create({
        baseURL: `https://${msp_domain}/v2`,
    })
    httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
    httpClient.defaults.headers.common['Content-Type'] = 'application/json'

    const alarms = [];

    // pagination, keep fetching until next returned as null
    do {
        const resp = await httpClient({
            method: 'get',
            url: `/alarms`,
            params: {
                type: 1, // 1 means Security Alarm, https://docs.firewalla.net/data-models/alarm/#alarmtype
                begin,
                end,
                limit: 500,
            },
        }).then(r => r.data)
        end = resp.next
        alarms.push(...resp.results);
    } while (end)

    console.log(`${alarms.length} security alarms fetched`)

    if (alarms.length > 0) {
        // send the alarms to discord channel
        const webHookClient = axios.create({ baseURL: discordWebhook });
        let count = 0;
        for (const alarm of alarms) {
            try {
                await webHookClient({
                    method: 'POST',
                    data: {
                        "embeds": [{
                            title: "Security Alarm",
                            description: alarm.message,
                            url: `https://${msp_domain}/alarms?gid=${alarm.gid}&aid=${alarm.aid}`
                        }]
                    }
                })
                count++;
            } catch (e) {
                console.error(e);
            }
        }
        console.log(`${count} security alarms sent to Discord`)
    }
}


main().catch(err => {
    console.error('Failed to get flows', err);
    process.exit(1)
})