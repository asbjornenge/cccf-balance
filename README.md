# cccf-balance

Balance containers ([cccf](https://github.com/asbjornenge/cccf) format) across hosts.

## Install

```sh
npm install --save cccf-balance
```

## Use

By default this module will evenly distribute containers with no regard to host capabilities or container requirements.

```js
var balance = require('cccf-balance')

balance(hosts, containers)
// => [..containers w/host..] evenly distributed leastBusyHost 

balance.diff(hosts, current_container_with_host, wanted_containers)
// => { add : [], keep : [], remove : [] } evenly distributed via leastBusyHost

balance(hosts, containers, {
    balancer : function(hosts, allocated_containers, current_container) {
        // magic
        return selected_host
    }
})
// => [..containers w/host..] distributed to your liking 
```

### Custom Balancer

If you need a more sophisticated balancer, you can pass a custom balancer function.
The balancer function will be called once for each unbalanced container, and should return the **host** to be used for **current_container**. 
Passing a custom balancer works with both Basic and Diff.

### Options

```js
{
    balancer : function(...) {}, // Custom balancer function (see above) [OPTIONAL]
    ignore   : []                // List of containers to ignore         [OPTIONAL]
}
```

## Changelog

### 1.0.0

* Initial release :rocket:

enjoy.
