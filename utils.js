var _     = require('lodash')
var clone = require('clone')
var cccf  = require('cccf')
var scale = require('cccf-scale')
var utils = require('./utils')

var utils = {

    validateContainer : function(container) {
        try      { cccf.validate(container); return true }
        catch(e) { process.stderr.write(e); return false }
    },

    pickContainerById : function(id, current_containers) {
        return current_containers.filter(function(c) {
            return c.id == id
        })[0]
    },

    unifyContainers : function(containers, containers_ignore, properties_omit) { 
        if (containers_ignore)
            containers = containers.filter(function(c) { return containers_ignore.indexOf(c.id) })
        containers = containers.filter(utils.validateContainer)
        containers = scale.up(containers)
        containers = containers.map(function(container) {
            var c = _.omit(container, ['host','scale'].concat(properties_omit || []))
            if (c.image.indexOf(':') < 0) c.image = c.image+':latest'
            return c
        })
        return containers
    },

    uniqifyObject : function(obj) {
        return JSON.stringify(obj).split('').sort().join('')
    },

    leastBusyHost : function(hosts, balanced) {
        var weights = balanced.reduce(function(map, container) {
            if (!map[container.host.id]) map[container.host.id] = 1
            else map[container.host.id] += 1
            return map
        },{})
        return hosts.reduce(function(curr, next) {
            var curr_weight = weights[curr.id] || 0
            var next_weight = weights[next.id] || 0
            return (next_weight > curr_weight) ? curr : next
        }, hosts[0])
    }

}

module.exports = utils 
