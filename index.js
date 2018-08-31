const path = require('path');
const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const basePresets = ['react', 'stage-2'];
const basePlugins = ['transform-decorators-legacy', 'syntax-dynamic-import'];
const testPlugins = env === 'test' ? ['dynamic-import-node'] : [];
const pkg = require(path.resolve('package.json'));

function buildPreset(context, opts = {}) {
  const envPresetOptions = {};
  envPresetOptions.modules = process.env.IN_WEBPACK === 'true' || pkg.module ? false : 'commonjs';
  if (typeof opts.loose !== 'undefined') {
    envPresetOptions.loose = opts.loose;
  }
  if (typeof opts.useBuiltIns !== 'undefined') {
    envPresetOptions.useBuiltIns = opts.useBuiltIns;
  }
  const envPreset = env === 'test' ?
    ['env', Object.assign({targets: {node: 'current'}}, envPresetOptions)] :
    ['env', envPresetOptions];
  const presets = [envPreset].concat(basePresets);
  const plugins = basePlugins.concat(testPlugins);
  return {presets, plugins};
}

module.exports = buildPreset({});

Object.defineProperty(module.exports, 'buildPreset', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: buildPreset
});
