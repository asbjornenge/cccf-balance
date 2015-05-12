# cccf-balance

Balance containers ([cccf](https://github.com/asbjornenge/cccf) format) across hosts.

## Install

```sh
npm install --save cccf-balance
```

## Use

```js
var balance = require('cccf-balance')

/*** Basic
* hosts      - list of hosts
* containers - list of cccf container without hosts
*/
balance(hosts, containers)
// => [..containers w/host..] evenly distributed leastBusyHost 

/*** Diff
* hosts         - list of hosts
* current_state - list of running containers with host property
* wanted_state  - list of wanted containers
**/
balance.diff(hosts, current_state, wanted_state)
// => { add : [], keep : [], remove : [] } evenly distributed via leastBusyHost

/*** Custom balancer */
balance(hosts, containers, {
    balancer : function() {
        // magic
    }
})
// => [..containers w/host..] distributed to your liking 
```

Passing a custom balancer works with both Basic and Diff. 
I plan to add more balancer functions in the future.

### Options

```js
{
    balancer : function() {},   // Custom balancer function [OPTIONAL]
    ignore   : []               // List of containers to ignore
}
```

## Changelog

### 1.0.0

* Initial release :rocket:

enjoy.
