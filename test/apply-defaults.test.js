import { join } from 'path'
import test from 'ava'
import applyDefaults from '../lib/apply-defaults'

test('defaults for reading from stdin', t => {
  t.deepEqual(applyDefaults({}), {
    mangle: true,
    compress: true,
    comments: /@preserve|@license|@cc_on|^!/i,
  })
})

test('defaults for malformed stdin config', t => {
  t.deepEqual(applyDefaults({ input: [] }), {
    input: [],
    mangle: true,
    compress: true,
    comments: /@preserve|@license|@cc_on|^!/i,
  })
})

test('defaults for reading from file', t => {
  const input = 'foo.js'
  const output = 'foo.min.js'
  process.chdir(join(__dirname, 'fixtures'))
  t.deepEqual(applyDefaults({ input }), {
    input: [input],
    output,
    sourceMap: {
      url: output + '.map',
      content: input + '.map',
    },
    mangle: true,
    compress: true,
    comments: /@preserve|@license|@cc_on|^!/i,
  })
})
