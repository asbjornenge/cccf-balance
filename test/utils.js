var assert = require('assert')
var utils  = require('../utils')

it('can pick the least busy host base off number of containers on that host', function() {
    var hosts = [{id:'host1'},{id:'host2'}]
    var containers = [{id:'c1', host : hosts[0]},{id:'c2', host : hosts[0]}, {id:'c2', host : hosts[1]}]
    var host  = utils.leastBusyHost(hosts, containers)
    assert(host.id == 'host2')
})
