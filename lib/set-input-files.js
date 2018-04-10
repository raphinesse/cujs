'use strict'

const { assign, cloneDeep, identity, isEmpty } = require('lodash')
const { some, startsWith } = require('lodash/fp')

const containsOptions = some(startsWith('-'))

module.exports = function(inputFiles) {
  if (isEmpty(inputFiles)) return identity
  if (containsOptions(inputFiles))
    throw new Error(`cujs only accepts files as arguments, no options`)
  return config => assign(cloneDeep(config), { input: inputFiles })
}
