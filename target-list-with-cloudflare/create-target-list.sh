#!/bin/bash

API_TOKEN="<My API Token>"
FILE_PATH="<CF Real IP Conf Path>"  # /path/to/cf_real-ip.conf 

# Read IP addresses from cf_real-ip.conf excluding my Docker subnet
ip_addresses=$(grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}(/[0-9]{1,2})?' $FILE_PATH | \
  grep -Ev '^172\.18\.')

targets=$(echo -n $ip_addresses | jq -cRs 'split(" ")')

# Construct the JSON payload
json_payload="{
  \"name\": \"Target List with CloudFlare\",
  \"notes\":\"This is a Simple Target List with CloudFlare\",
  \"targets\": $targets
}"

# Make the API call
http_code=$(curl -s -w %{http_code} -o /dev/null --request POST \
--url "https://<Firewalla Domain>.firewalla.net/v2/target-lists" \
--header "Authorization: Token $API_TOKEN" \
--header "Content-Type: application/json" \
--data "$json_payload")

if [[ "$http_code" == '200' ]]; then
    echo "Create target list successfully"
else
    echo "Create target list failed"
fi
