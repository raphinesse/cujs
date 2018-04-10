import test from 'ava'
import setInputFiles from '../lib/set-input-files'

const config = Object.freeze({ foo: 42 })

test('handles empty input files', t => {
  t.is(setInputFiles([])(config), config)
})

test('throws on options', t => {
  t.throws(_ => setInputFiles(['-f']), /\boptions\b/i)
  t.throws(_ => setInputFiles(['--foo']), /\boptions\b/i)
})

test('assigns valid input files to config', t => {
  const input = ['foo.js', 'bar.js']
  const expected = Object.assign({}, config, { input })
  t.deepEqual(setInputFiles(input)(config), expected)
})
