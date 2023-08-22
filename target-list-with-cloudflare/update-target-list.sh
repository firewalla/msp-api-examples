#!/bin/bash

API_TOKEN="<My API Token>"
TARGET_LIST_ID="<Target List ID>"   # TL-00000000-0000-0000-0000-000000000000
FILE_PATH="<CF Real IP Conf Path>"  # /path/to/cf_real-ip.conf 

# Read IP addresses from cf_real-ip.conf excluding my Docker subnet
ip_addresses=$(grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}(/[0-9]{1,2})?' $FILE_PATH | \
  grep -Ev '^172\.18\.')

# Function to check if IP list has changed
ip_list_has_changed() {
  local new_ip_list="$1"
  local previous_ip_list="$2"

  if [ "$new_ip_list" != "$previous_ip_list" ]; then
    return 0 # IP list has changed
  else
    return 1 # IP list has not changed
  fi
}

# Create or read the previously stored IP list
if [ -f previous_ip_list.txt ]; then
  previous_ip_list=$(cat previous_ip_list.txt)
else
  touch previous_ip_list.txt
  previous_ip_list=""
fi

# Check if IP list has changed
if ip_list_has_changed "$ip_addresses" "$previous_ip_list"; then
  echo "$ip_addresses" > previous_ip_list.txt

  targets=$(echo -n $ip_addresses | jq -cRs 'split(" ")')
  # Construct the JSON payload
  json_payload="{
    \"targets\": $targets
  }"

  # Make the API call
  http_code=$(curl -s -w %{http_code} -o /dev/null --request PATCH \
  --url "https://<Firewalla Domain>.firewalla.net/v2/target-lists/$TARGET_LIST_ID" \
  --header "Authorization: Token $API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "$json_payload")

  if [[ "$http_code" == '200' ]]; then
    echo "Update target list successfully"
  else
    echo "Update target list failed"
  fi
else
  echo "IP list has not changed. No API call needed."
fi