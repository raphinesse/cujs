'use strict'

const which = require('npm-which')(process.cwd())
const { quote } = require('shell-quote')
const debug = require('./debug')

module.exports = function(args) {
  const uglifyBinPath = which.sync('uglifyjs')
  debug(`Using uglifyjs binary at ${uglifyBinPath}`)
  process.argv = [process.argv[0], uglifyBinPath, ...args]
  debug(`Calling \`${quote(['uglifyjs', ...args])}\``)
  return require(uglifyBinPath)
}
