var assert  = require('assert')
var balance = require('../index')
var utils   = require('../utils')

var hosts = [
    { host : '127.0.0.1', port : 4243 },
    { host : '127.0.0.2', port : 4243 }
]
var current_containers = [        
    { id : 'api',         image : 'my-api:1.3.0',        host : hosts[0] },
    { id : 'api-scale-1', image : 'my-api:1.3.0',        host : hosts[1] },
    { id : 'es',          image : 'elasticsearch:1.4.0', host : hosts[1] }
]
var wanted_containers = [
    { id : 'api', image : 'my-api:1.3.0', scale : 3 },
    { id : 'es',  image : 'elasticsearch:1.4.2' },
    { id : 'pg',  image : 'postgresql:3.0.0' }
]

function ids(container) { return container.id  }
function contains(list) { return function(x) { return list.indexOf(x) >= 0 } }

// MISSING: Can apply

it('can diff', function() {
    var diff = balance.diff(hosts, current_containers, wanted_containers)
    assert(diff.add.length == 3)
    assert(diff.add.map(ids).filter(contains(['api-scale-2','es','pg'])).length == 3)
    assert(diff.keep.length == 2)
    assert(diff.keep.map(ids).filter(contains(['api','api-scale-1'])).length == 2)
    assert(diff.remove.length == 1)
    assert(diff.remove.map(ids).filter(contains(['es'])).length == 1)
})


