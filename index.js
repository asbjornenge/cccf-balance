var cdiff   = require('cccf-diff')
var balance = require('./balance')
var utils   = require('./utils')

module.exports = function(hosts, containers, opts) {
    opts = opts || {}
    var unified_containers = utils.unifyContainers(containers, opts.ignore)
    return balance(hosts, [], { add : unified_containers, remove : [], keep : [] }, opts.balancer).add
}

module.exports.diff = function(hosts, current_containers, wanted_containers, opts) {
    opts = opts || {}
    var unified_current_containers = utils.unifyContainers(current_containers, opts.ignore)
    var unified_wanted_containers  = utils.unifyContainers(wanted_containers, opts.ignore)
    return balance(hosts, current_containers, cdiff(unified_current_containers, unified_wanted_containers), opts.balancer)
}
