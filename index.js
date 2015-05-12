var cdiff   = require('cccf-diff')
var mapper  = require('./mapper')
var utils   = require('./utils')

module.exports = function(hosts, containers, opts) {
    opts = opts || {}
}

module.exports.diff = function(hosts, current_containers, wanted_containers, opts) {
    opts = opts || {}
    var unified_current_containers = utils.unifyContainers(current_containers, opts.ignore)
    var unified_wanted_containers  = utils.unifyContainers(wanted_containers, opts.ignore)
    return mapper.assignHosts(hosts, current_containers, cdiff(unified_current_containers, unified_wanted_containers))
}
