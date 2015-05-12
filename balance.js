var _     = require('lodash')
var clone = require('clone')
var scale = require('cccf-scale')
var utils = require('./utils')

module.exports = function(hosts, current_containers, diff, balancer) {
    balancer = balancer || utils.leastBusyHost
    var keepWithHosts = diff.keep.map(function(keep) { 
        keep.host = utils.pickContainerById(keep.id, current_containers).host
        return keep
    })

    var postRunWithHosts = clone(keepWithHosts)
    var addWithHosts = diff.add.map(function(container) {
        container.host = balancer(hosts, postRunWithHosts, container) // <- Balancing
        postRunWithHosts = postRunWithHosts.concat(container)
        return container
    })

    var removeWithHosts = diff.remove.map(function(container) { 
        container.host = utils.pickContainerById(container.id, current_containers).host
        return container
    })

    return {
        add    : addWithHosts,
        keep   : keepWithHosts, 
        remove : removeWithHosts
    }
}
