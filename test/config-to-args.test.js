import test from 'ava'
import { escapeRegExp } from 'lodash'
import configToArgs from '../lib/config-to-args'
import config from './fixtures/cujs.config'

test('handles `input` key correctly', t => {
  const { input } = config
  const args = configToArgs(config)
  t.deepEqual(args.slice(0, input.length), input)
  t.false(args.includes('--input'))
})

function containsArgs(t, expected) {
  const argsString = configToArgs(config).join(' ')
  t.regex(argsString, new RegExp(` ${escapeRegExp(expected)}( --|$)`))
}

containsArgs.title = (_, expected) => `args contain ${expected}`

test(containsArgs, '--output foo.min.js')
test(containsArgs, '--mangle')
test(containsArgs, '--no-compress')
test(containsArgs, '--mangle-props regex=/foo/,reserved=["asd","qwe"]')
test(containsArgs, '--source-map includeSources=false,url="foo.min.js.map"')
