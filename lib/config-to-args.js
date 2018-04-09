'use strict'

const { flatMap, get, kebabCase, map, pickBy } = require('lodash')
const { isRegExp, isBoolean, isNil, isPlainObject } = require('lodash')

function configToArgs(config) {
  const inputFilesKey = 'input'
  const inputFiles = get(config, inputFilesKey, [])
  config = pickBy(config, (_, k) => k !== inputFilesKey)
  const options = flatMap(config, configPairToArgs)
  return [...inputFiles, ...options]
}

function configPairToArgs(val, key) {
  return isBoolean(val) || isNil(val)
    ? keyToOption(key, val ? '' : 'no-')
    : [keyToOption(key), encodeOptionValue(val)]
}

function encodeOptionValue(val) {
  return (isPlainObject(val) ? encodeOptionObject(val) : val).toString()
}

function encodeOptionObject(o) {
  return map(o, (v, k) => `${k}=${encode(v)}`)
}

function encode(val) {
  return isRegExp(val) ? val : JSON.stringify(val)
}

function keyToOption(key, prefix = '') {
  return '--' + prefix + kebabCase(key)
}

module.exports = configToArgs
