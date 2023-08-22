#!/bin/bash

CROWDSEC_API_URL="http://<CrowdSec IP>:8080/v1/alerts"
CROWDSEC_API_TOKEN="Your-CrowdSec-Token"

TARGET_LIST_ID="<Target List ID>" # TL-00000000-0000-0000-0000-000000000000
API_TOKEN="<My API Token>"

banned_ips=$(curl --request GET \
  --url "$CROWDSEC_API_URL" \
  --header "Authorization: Bearer $CROWDSEC_API_TOKEN" \
  | jq -r '.[] | .ip')

json_payload='{
  "targets": ['
json_payload+=$(echo "$banned_ips" | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/","/g')
json_payload+=']
}'

curl --request PATCH \
  --url "https://<your-firewalla-domain>.firewalla.net/v2/target-lists/$TARGET_LIST_ID" \
  --header "Authorization: Token $API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "$json_payload"