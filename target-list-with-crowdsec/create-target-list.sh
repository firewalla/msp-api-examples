#!/bin/bash

CROWDSEC_API_URL="http://<CrowdSec IP>:8080/v1/alerts"
CROWDSEC_API_TOKEN="Your-CrowdSec-Token"

MSP_DOMAIN="<Your Firewalla Domain>"
API_TOKEN="<My API Token>"

banned_ips=$(curl --request GET \
  --url "$CROWDSEC_API_URL" \
  --header "Authorization: Bearer $CROWDSEC_API_TOKEN" \
  | jq -r '.[] | .ip')

json_payload='{
  "name": "Target List with crowdsec",
  "notes":"This is a Simple Target List with crowdsec",
  "targets": ['
json_payload+=$(echo "$banned_ips" | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/","/g')
json_payload+=']
}'

http_code=$(curl -s -w %{http_code} -o /dev/null --request POST \
  --url "https://$MSP_DOMAIN.firewalla.net/v2/target-lists" \
  --header "Authorization: Token $API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "$json_payload")

if [[ "$http_code" == '200' ]]; then
    echo "Create target list successfully"
else
    echo "Create target list failed"
fi