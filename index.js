var cdiff   = require('cccf-diff')
var mapper  = require('./mapper')
var utils   = require('./utils')

module.exports = function(hosts, containers) {

}

module.exports.diff = function(hosts, current_containers, wanted_containers, opts) {
    opts = opts || {}
    var unified_current_containers = mapper.unifyContainers(current_containers, opts.ignore)
    var unified_wanted_containers  = mapper.unifyContainers(wanted_containers, opts.ignore)
    return mapper.assignHosts(hosts, current_containers, cdiff(unified_current_containers, unified_wanted_containers))
}
