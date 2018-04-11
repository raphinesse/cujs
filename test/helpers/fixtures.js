const pify = require('pify')
const fixtures = require('test-fixture')
const { remove } = require('fs-extra')

const copy = pify(fixtures.Fixtures.prototype.copy)

module.exports = function(...args) {
  const fx = fixtures(...args)

  let copied = false

  fx.copy = (...args) =>
    copy.apply(fx, args).then(dir => {
      copied = true
      return dir
    })

  fx.cleanup = _ => copied && remove(fx.path)

  fx.asTmpDir = async fn => {
    const tmpDir = await fx.copy()
    try {
      await fn(tmpDir)
    } finally {
      await fx.cleanup()
    }
  }

  return fx
}
