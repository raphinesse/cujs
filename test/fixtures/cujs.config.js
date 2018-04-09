module.exports = {
  input: ['foo.js', 'bar.js'],
  output: 'foo.min.js',
  mangle: true,
  compress: false,
  mangleProps: {
    regex: /foo/,
    reserved: ['asd', 'qwe'],
  },
  sourceMap: {
    includeSources: false,
    url: 'foo.min.js.map',
  },
}
