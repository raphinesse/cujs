#! /usr/bin/env node

'use strict'

const loadConfig = require('./lib/load-config')
const applyDefaults = require('./lib/apply-defaults')
const configToArgs = require('./lib/config-to-args')
const runUglify = require('./lib/run-uglify')

function cli() {
  return loadConfig()
    .then(applyDefaults)
    .then(configToArgs)
    .then(runUglify)
    .catch(err => {
      console.error(err)
      process.exitCode = process.exitCode || 128
    })
}

module.exports = cli
if (require.main === module) cli()
