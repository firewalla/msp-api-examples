/*    Copyright 2024 Firewalla Inc.
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


// Related API Document
// https://docs.firewalla.net/api-reference/rule/#pause-a-rule
async function main() {


    // get rule list, this API(v1/rule/list) will be deprecated
    // the data model of the rule will be changed in the future release
    // just an example about how to get the rule id from the list
    const httpClient = axios.create({
        baseURL: `https://${msp_domain}/v1`,
    })
    httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
    httpClient.defaults.headers.common['Content-Type'] = 'application/json'

    const rules = await httpClient({
        method: 'get',
        url: `/rule/list`,
    }).then(r => r.data);

    const pick_a_rule = rules[0]; // pick the first one as an example
    if (!pick_a_rule) return; // should have a rule at least

    // console.log('the rule', pick_a_rule);
    // how to pause a rule
    const httpClient1 = axios.create({
        baseURL: `https://${msp_domain}/v2`,
    })
    httpClient1.defaults.headers.common['Authorization'] = 'Token ' + token;
    httpClient1.defaults.headers.common['Content-Type'] = 'application/json'
    const result = await httpClient1({
        method: 'post',
        url: `/rules/${pick_a_rule.id}/pause`,
    }).then(r => r.data);
    console.log('Paused the rule.', result);
}


main().catch(err => {
    console.error('Failed to pause the rule', err);
    process.exit(1)
})