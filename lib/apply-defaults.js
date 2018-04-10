'use strict'

const { inspect } = require('util')
const { existsSync } = require('fs')
const { dirname, join, parse, relative } = require('path')
const { castArray, cloneDeep, defaults, get } = require('lodash')
const debug = require('./debug')

module.exports = function(userConfig) {
  const config = cloneDeep(userConfig)
  defaults(config, {
    mangle: true,
    compress: true,
    comments: /@preserve|@license|@cc_on|^!/i,
  })

  if (config.input) {
    config.input = castArray(config.input)
    inferOutput(config)
  }

  if (config.sourceMap) {
    // Coerce to object
    config.sourceMap = defaults({}, config.sourceMap)

    inferSourceMapUrl(config)
    detectInputSourceMap(config)
  }

  debug(`Configuration after applying defaults:\n${inspect(config)}`)
  return config
}

function inferOutput(config) {
  const { sourceMap } = config
  if (config.output || !sourceMap || sourceMap.url === 'inline') return

  // In this case, uglifyjs would just throw an error
  // So we might as well try and do something useful
  const { dir, name, ext } = parse(config.input[0])
  config.output = join(dir, name + '.min' + ext)
  debug(`Inferred output destination to ${config.output}`)
}

function inferSourceMapUrl(config) {
  const { sourceMap } = config
  if (sourceMap.url) return
  const sourceMapFile = sourceMap.filename || config.output + '.map'
  debug(`Inferred source map destination to ${sourceMapFile}`)
  sourceMap.url = relative(dirname(config.output), sourceMapFile)
  debug(`Inferred source map url for ${config.output} to ${sourceMap.url}`)
}

function detectInputSourceMap(config) {
  if (config.sourceMap.content || get(config, 'input.length', 0) !== 1) return
  const inputSourceMap = config.input[0] + '.map'
  debug(`Looking for input source map at ${inputSourceMap}`)
  if (existsSync(inputSourceMap)) {
    config.sourceMap.content = inputSourceMap
  }
}
