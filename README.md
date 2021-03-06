# cujs [![Build Status](https://travis-ci.org/raphinesse/cujs.svg?branch=master)](https://travis-ci.org/raphinesse/cujs)

> [siː juː ʤeɪ ɛs] – Cosmic UglifyJS

A CLI wrapper around `uglifyjs`. Configurable with sensible defaults.\
Make uglification ~~great~~ sane again!

It turns this
```json
{
  "name": "awesome-lib",
  "version": "0.42.0",
  "scripts": {
    "minify": "uglifyjs dist/awesome-lib.js -mco dist/awesome-lib.min.js --comments /^!/ --source-map \"content='dist/awesome-lib.js.map',url='awesome-lib.min.js.map'\""
  }
}
```

into this
```json
{
  "name": "awesome-lib",
  "version": "0.42.0",
  "scripts": {
    "minify": "cujs dist/awesome-lib.js"
  }
}
```

## Install

```
$ npm i -D cujs uglify-es
```

Instead of `uglify-es`, you can install any other package that provides a binary named `uglifyjs` with a compatible interface.


## Usage

`cujs` uses [cosmiconfig] to collect configuration before calling `uglifyjs`. That means, `cujs` will look for configuration (all the way up the directory tree until it hits the home directory) in the following places:

- `cujs` property in `package.json`
- `.cujsrc` file in JSON or YAML format
- `cujs.config.js` file exporting a JS object

You can use camelCase variants of all [options supported by `uglifyjs`][options] in your configuration. In addition to that, you can also configure input files with the `input` key instead of passing them as arguments. Consider this example `cujs.config.js`:

```js
module.exports = {
  input: ['foo.js', 'bar.js'],
  output: 'foo.min.js',
  compress: false,
  sourceMap: { url: "foo.min.js.map" },
}
```

This corresponds to the following `uglifyjs` arguments:
```shell
foo.js bar.js --output foo.min.js --no-compress --source-map url="foo.min.js.map"
```

### Defaults

`cujs` applies the following defaults that differ from those of `uglifyjs`:
```js
{
  mangle: true,
  compress: true,
  sourceMap: true,
  comments: /@preserve|@license|@cc_on|^!/i,
}
```
Furthermore, `cujs` tries to be smart about some things. For example, when sourcemaps are enabled, it infers `sourceMap.url` and looks for a input source map to use as `sourceMap.content`. However, if you explicitly set any of those keys, `cujs` won't touch them.

If in doubt, run as `DEBUG=cujs cujs` to see what's going on.


## License

MIT © Raphael von der Grün


[cosmiconfig]: https://github.com/davidtheclark/cosmiconfig#cosmiconfig
[options]: https://github.com/mishoo/UglifyJS2#command-line-options
