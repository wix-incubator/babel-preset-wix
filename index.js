const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const basePresets = ['react', 'stage-2'];
const envPreset = env === 'test' ? ['env', {targets: {node: 'current'}}] : 'env';
const presets = [envPreset].concat(basePresets);
module.exports = {presets};
