# msp-api-examples

## prepare
``` bash
yarn
```

## examples

### get all boxes of msp
```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] node box/list-all-boxes.js
```

### get all devices of msp
```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] node device/list-all-devices.js
```

### get all devices on a given box

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] gid=[box_gid] node device/list-box-devices.js
```

### get device detail

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] gid=[box_gid] mac=[device_mac_address] node device/get-device-detail.js
```

### get top 50 active alarms for each msp box

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] node alarm/list-alarms.js
```

### get top 50 active alarms on a given box

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] gid=[box_gid] node alarm/list-box-alarms.js
```

### get alarm detail

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] gid=[box_gid] alarmId=2687 node alarm/get-alarm-detail.js
```

### archive alarm

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] gid=[box_gid] alarmId=2687 node alarm/archive-alarm.js
```

### delete alarm

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] gid=[box_gid] alarmId=2687 node alarm/delete-alarm.js
```

### query flows on a given timerange

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] start=1662804679.14 end=1662804687.142 node flow/flows-query-timerange.js
```

### query flows on a given box

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] boxName=navy node flow/flows-query-box.js
```

### query flows with multiple condition

```
msp_domain=[msp_domain] token=[personal_access_token_from_msp] boxName=navy destination=icloud start=1662718559.346 end=1662804959.346 node flow/flows-query-advance.js
```