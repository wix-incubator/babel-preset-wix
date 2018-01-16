const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const basePresets = ['react', 'stage-2'];
const basePlugins = ['syntax-dynamic-import'];
const testPlugins = env === 'test' ? ['transform-dynamic-import'] : [];
const envPreset = env === 'test' ? ['env', {targets: {node: 'current'}}] : 'env';
const presets = [envPreset].concat(basePresets);
const plugins = basePlugins.concat(testPlugins);
module.exports = {presets, plugins};
