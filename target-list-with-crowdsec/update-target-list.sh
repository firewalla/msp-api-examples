#!/bin/bash

CROWDSEC_API_URL="http://<CrowdSec IP>:8080/v1/alerts"
CROWDSEC_API_TOKEN="Your-CrowdSec-Token"

MSP_DOMAIN="<Your Firewalla Domain>"
TARGET_LIST_ID="<Target List ID>" # TL-00000000-0000-0000-0000-000000000000
API_TOKEN="<My API Token>"

banned_ips=$(curl --request GET \
  --url "$CROWDSEC_API_URL" \
  --header "Authorization: Bearer $CROWDSEC_API_TOKEN" \
  | jq -r '.[].decisions[].value//empty')

targets=$(echo -n $banned_ips | jq -cRs 'split(" ")[:2000]') # max 2000 targets

json_payload="{
  \"targets\": $targets
}"

http_code=$(curl -s -w %{http_code} -o /dev/null --request PATCH \
  --url "https://$MSP_DOMAIN/v2/target-lists/$TARGET_LIST_ID" \
  --header "Authorization: Token $API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "$json_payload")

if [[ "$http_code" == '200' ]]; then
    echo "Create target list successfully"
else
    echo "Create target list failed"
fi