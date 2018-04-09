'use strict'

const { inspect } = require('util')
const cosmiconfig = require('cosmiconfig')
const debug = require('./debug')

module.exports = function() {
  return cosmiconfig('cujs')
    .load()
    .then(result => {
      if (!result) return {}
      const { filepath, config } = result
      debug(`loaded config from ${filepath}:\n${inspect(config)}`)
      return config
    })
}
