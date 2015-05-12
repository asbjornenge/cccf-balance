var assert  = require('assert')
var clone   = require('clone')
var balance = require('../index')
var utils   = require('../utils')

var hosts = [
    { id : 'a', host : '127.0.0.1', port : 4243 },
    { id : 'b', host : '127.0.0.2', port : 4243 }
]
var current_containers = [        
    { id : 'api',         image : 'my-api:1.3.0',        host : hosts[0] },
    { id : 'api-scale-1', image : 'my-api:1.3.0',        host : hosts[0] },
    { id : 'api-scale-2', image : 'my-api:1.3.0',        host : hosts[1] },
    { id : 'es',          image : 'elasticsearch:1.4.0', host : hosts[1] }
]
var wanted_containers = [
    { id : 'api', image : 'my-api:1.3.0', scale : 4 },
    { id : 'es',  image : 'elasticsearch:1.4.2' },
    { id : 'pg',  image : 'postgresql:3.0.0' }
]

function ids(container)      { return container.id  }
function contains(list)      { return function(x) { return list.indexOf(x) >= 0 } }
function hostmap(containers) { return containers.reduce(function(map, container) {
    map[container.host.id] += 1
    return map
}, hosts.reduce(function(map, host) { map[host.id] = 0; return map },{}))  }

it('can apply', function() {
    var balanced = balance(hosts, wanted_containers)
    assert(balanced.length == 6)
    balanced.forEach(function(c) {
        assert(c.host)
    })
    var _hostmap = hostmap(balanced)
    assert(_hostmap.a == _hostmap.b)
})

it('can diff', function() {
    var diff = balance.diff(hosts, current_containers, wanted_containers)
    assert(diff.add.length == 3)
    assert(diff.add.map(ids).filter(contains(['api-scale-3','es','pg'])).length == 3)
    assert(diff.keep.length == 3)
    assert(diff.keep.map(ids).filter(contains(['api','api-scale-1','api-scale-2'])).length == 3)
    assert(diff.remove.length == 1)
    assert(diff.remove.map(ids).filter(contains(['es'])).length == 1)
    var _hostmap = hostmap(diff.add.concat(diff.keep))
    assert(_hostmap.a == _hostmap.b)
})

it('can take a custom balancer', function() {
    var balancer = function(hosts, balanced, current) {
        return hosts[0]
    }
    var balanced = balance(hosts, wanted_containers, { balancer : balancer })
    assert(balanced.length == 6)
    balanced.forEach(function(c) {
        assert(c.host == hosts[0])
    })
})

it('can ignore containers', function() {
    var balanced = balance(hosts, wanted_containers, { ignore : ['api'] })
    assert(balanced.length == 2) 
})

it('can omit properties', function() {
    var wanted = clone(wanted_containers).map(function(c) { c.mem = '1g'; return c })
    var balanced = balance(hosts, wanted)
    balanced.forEach(function(c) { assert(c.mem) })
    var balanced_omit = balance(hosts, wanted, { omit : ['mem'] })
    balanced_omit.forEach(function(c) { assert(!c.mem) })
})
