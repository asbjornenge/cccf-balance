# cccf-balance

Balance containers ([cccf](https://github.com/asbjornenge/cccf) format) across hosts.

## Install

```sh
npm install --save cccf-balance
```

## Use

```js
var balance = require('cccf-balance')

balance(hosts, containers)
// => [..containers w/host..] evenly distributed leastBusyHost 

balance.diff(hosts, current_container_with_host, wanted_containers)
// => { add : [], keep : [], remove : [] } evenly distributed via leastBusyHost

balance(hosts, containers, {
    balancer : function(hosts, containers) {
        // magic
    }
})
// => [..containers w/host..] distributed to your liking 
```

Passing a custom balancer works with both Basic and Diff. I plan to add more balancer functions in the future.

### Options

```js
{
    balancer : function(hosts, containers) {}, // Custom balancer function [OPTIONAL]
    ignore   : []                              // List of containers to ignore
}
```

## Changelog

### 1.0.0

* Initial release :rocket:

enjoy.
