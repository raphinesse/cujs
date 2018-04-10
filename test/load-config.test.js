import test from 'ava'
import { getConfig } from '../lib/load-config'

test('handles missing config', t => {
  t.deepEqual(getConfig(null), {})
})

test('extracts config', t => {
  const config = { foo: 42 }
  t.is(getConfig({ config }), config)
})
