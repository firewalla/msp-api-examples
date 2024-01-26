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
const begin = process.env.begin || Date.now() / 1000 - 10 * 60;
let end = process.env.end || Date.now() / 1000;


// Related API Document
// https://docs.firewalla.net/api-reference/flow/ FYI: doc is out of date now, will update in recent


async function main() {

  const httpClient = axios.create({
    baseURL: `https://${msp_domain}/v2`,
  })
  httpClient.defaults.headers.common['Authorization'] = 'Token ' + token;
  httpClient.defaults.headers.common['Content-Type'] = 'application/json'

  const params = {
    query: `ts:${begin}-${end}`,
    cursor: null,
    limit: 100 // defaults to 200 if it is unset
  }

  const flows = [];
  while (1) {
    const { results, next_cursor } = await httpClient({
      method: 'get',
      url: `/flows`,
      params: params
    }).then(r => r.data);
    flows.push(...results);
    if (!next_cursor) break;
    console.log(next_cursor)
    params.cursor = next_cursor;
  }
  console.log('count: %d', flows.length)
}


main().catch(err => {
  console.error('Failed to get flows', err);
  process.exit(1)
})
