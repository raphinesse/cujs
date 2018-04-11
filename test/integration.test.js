import { join } from 'path'
import { execFileSync } from 'child_process'
import { existsSync } from 'fs'
import test from 'ava'
import fixtures from './helpers/fixtures'

test('integration', async t => {
  await fixtures().asTmpDir(tmpDir => {
    process.chdir(tmpDir)

    // Running the cli function will cause a spurious error in conjunction
    // with AVA. Not sure what's happening, but it works as a subprocess
    execFileSync(join(__dirname, '../index.js'))

    t.true(existsSync('foo.min.js'))
    t.true(existsSync('foo.min.js.map'))
  })
})
