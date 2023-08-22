#!/bin/bash

API_TOKEN="<My API Token>"
FILE_PATH="<CF Real IP Conf Path>"  # /path/to/cf_real-ip.conf 

# Read IP addresses from cf_real-ip.conf excluding my Docker subnet
ip_addresses=$(grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}(/[0-9]{1,2})?' $FILE_PATH | \
  grep -Ev '^172\.18\.')


# Construct the JSON payload
json_payload='{
  "name": "A Simple Target List with CloudFlare",
  "notes":"This is a Simple Target List with CloudFlare",
  "targets": ['

# Loop through each IP address and add it to the JSON payload
first_ip=true
for ip in $ip_addresses; do
  if [ "$first_ip" = true ]; then
    json_payload+='
    "'"$ip"'"'
    first_ip=false
  else
    json_payload+=',
    "'"$ip"'"'
  fi
done

json_payload+='
  ]
}'

# Make the API call
curl --request POST \
--url "https://<Firewalla Domain>.firewalla.net/v2/target-lists" \
--header "Authorization: Token $API_TOKEN" \
--header "Content-Type: application/json" \
--data "$json_payload"
