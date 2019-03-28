'use strict'

const { inspect } = require('util')
const cosmiconfig = require('cosmiconfig')
const debug = require('./debug')

module.exports = function() {
  return cosmiconfig('cujs')
    .search()
    .then(getConfig)
}

function getConfig(result) {
  if (!result) return {}
  const { filepath, config } = result
  debug(`loaded config from ${filepath}:\n${inspect(config)}`)
  return config
}

module.exports.getConfig = getConfig
